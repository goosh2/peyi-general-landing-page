import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { hashIp, isDisposableEmail, MIN_FORM_FILL_MS } from "@/lib/booking";
import { getSupabaseAdmin } from "@/lib/supabase-server";
import { sendGrantsInquiryNotification } from "@/lib/email";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Grants inquiry intake (call requests, Org Vault intake starts, questions).
 *
 * Same spam guardrails as the audit booking flow: honeypot, minimum fill time,
 * disposable-email block, and per-email / per-IP limits. Bot-shaped requests
 * get the normal success response so they learn nothing. Raw IPs are never
 * stored, only a salted hash.
 */

const MAX_PER_EMAIL_24H = 3;
const MAX_PER_IP_24H = 10;
const WINDOW_MS = 24 * 60 * 60 * 1000;

const OK = { ok: true };

const optional = (max: number) => z.string().trim().max(max).optional().default("");

const bodySchema = z.object({
    intent: z.enum(["call", "intake", "question"]),
    name: z.string().trim().min(1).max(120),
    email: z.string().trim().toLowerCase().email().max(200),
    organization: z.string().trim().min(1).max(200),
    orgType: z.string().trim().min(1).max(60),
    location: optional(60),
    track: optional(60),
    deadline: optional(60),
    message: optional(2000),
    readinessScore: z.number().int().min(0).max(100).nullable().optional(),
    readinessBand: z.string().trim().max(60).nullable().optional(),
    website: z.string().max(200).optional().default(""),
    renderTimestamp: z.number().int().nonnegative()
});

function clientIp(req: NextRequest): string {
    const fwd = req.headers.get("x-forwarded-for");
    if (fwd) return fwd.split(",")[0]!.trim();
    return req.headers.get("x-real-ip")?.trim() || "0.0.0.0";
}

export async function POST(req: NextRequest) {
    let raw: unknown;
    try {
        raw = await req.json();
    } catch {
        return NextResponse.json({ ok: false, message: "Invalid request." }, { status: 400 });
    }

    const parsed = bodySchema.safeParse(raw);
    if (!parsed.success) {
        return NextResponse.json({ ok: false, message: "Please check the form and try again." }, { status: 400 });
    }
    const d = parsed.data;

    // Bot signals: accept silently, do nothing.
    if (d.website) return NextResponse.json(OK);
    if (Date.now() - d.renderTimestamp < MIN_FORM_FILL_MS) return NextResponse.json(OK);
    if (isDisposableEmail(d.email)) return NextResponse.json(OK);

    const salt = process.env.IP_HASH_SALT;
    if (!salt) {
        console.error("[api/grants/inquiry] Missing IP_HASH_SALT.");
        return NextResponse.json({ ok: false, message: "Something went wrong. Please try again later." }, { status: 500 });
    }
    const ipHash = hashIp(clientIp(req), salt);

    try {
        const db = getSupabaseAdmin();
        const since = new Date(Date.now() - WINDOW_MS).toISOString();
        const [byEmail, byIp] = await Promise.all([
            db.from("grants_inquiries").select("id", { count: "exact", head: true }).eq("email", d.email).gte("created_at", since),
            db.from("grants_inquiries").select("id", { count: "exact", head: true }).eq("ip_hash", ipHash).gte("created_at", since)
        ]);
        if (byEmail.error) throw byEmail.error;
        if (byIp.error) throw byIp.error;
        if ((byEmail.count ?? 0) >= MAX_PER_EMAIL_24H || (byIp.count ?? 0) >= MAX_PER_IP_24H) {
            return NextResponse.json(OK);
        }

        const readiness = d.readinessScore != null ? `${d.readinessScore}/100${d.readinessBand ? ` — ${d.readinessBand}` : ""}` : null;

        const { error } = await db.from("grants_inquiries").insert({
            intent: d.intent,
            email: d.email,
            name: d.name,
            organization: d.organization,
            org_type: d.orgType,
            location: d.location || null,
            track: d.track || null,
            deadline: d.deadline || null,
            message: d.message || null,
            readiness_score: d.readinessScore ?? null,
            readiness_band: d.readinessBand ?? null,
            ip_hash: ipHash
        });
        if (error) throw error;

        // The row is the record of truth; a failed notification shouldn't lose it.
        const to = process.env.GRANTS_NOTIFY_EMAIL;
        if (to) {
            try {
                await sendGrantsInquiryNotification({
                    to,
                    intent: d.intent,
                    name: d.name,
                    email: d.email,
                    organization: d.organization,
                    orgType: d.orgType,
                    location: d.location || null,
                    track: d.track || null,
                    deadline: d.deadline || null,
                    message: d.message || null,
                    readiness
                });
            } catch (err) {
                console.error("[api/grants/inquiry] Notification failed:", err);
            }
        }

        return NextResponse.json(OK);
    } catch (err) {
        console.error("[api/grants/inquiry] Unexpected error:", err);
        return NextResponse.json({ ok: false, message: "Something went wrong. Please try again later." }, { status: 500 });
    }
}
