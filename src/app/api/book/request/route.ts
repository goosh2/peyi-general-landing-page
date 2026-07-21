import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import {
    generateToken,
    hashToken,
    hashIp,
    isDisposableEmail,
    countRecentByEmail,
    countRecentByIpHash,
    getDedupeStatus,
    createBookingRequest,
    TOKEN_TTL_MS,
    MIN_FORM_FILL_MS,
    MAX_PER_EMAIL_24H,
    MAX_PER_IP_24H,
} from "@/lib/booking";
import { sendConfirmationEmail } from "@/lib/email";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Generic response so an attacker can't enumerate registered emails. */
const GENERIC_SUCCESS = {
    ok: true,
    message: "If everything checks out, we've sent a confirmation link. Check your inbox.",
};

const bodySchema = z.object({
    name: z.string().trim().min(1).max(120),
    email: z.string().trim().toLowerCase().email().max(200),
    business: z.string().trim().max(200).optional().default(""),
    need: z.string().trim().min(1).max(2000),
    // Honeypot: must be empty. Bots tend to fill every field.
    website: z.string().max(0).optional().default(""),
    // Millisecond epoch captured when the form rendered.
    renderTimestamp: z.number().int().nonnegative(),
});

function getClientIp(req: NextRequest): string {
    const forwarded = req.headers.get("x-forwarded-for");
    if (forwarded) {
        return forwarded.split(",")[0]!.trim();
    }
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
        // Honeypot / render-timestamp violations land here too via schema, but
        // we keep the client message generic.
        return NextResponse.json(
            { ok: false, message: "Please check the form and try again." },
            { status: 400 }
        );
    }

    const { name, email, business, need, website, renderTimestamp } = parsed.data;

    // Honeypot filled → silently accept without doing anything.
    if (website && website.length > 0) {
        return NextResponse.json(GENERIC_SUCCESS);
    }

    // Submitted too fast to be a human.
    if (Date.now() - renderTimestamp < MIN_FORM_FILL_MS) {
        return NextResponse.json(GENERIC_SUCCESS);
    }

    // Disposable email domains → generic success (no enumeration signal).
    if (isDisposableEmail(email)) {
        return NextResponse.json(GENERIC_SUCCESS);
    }

    const secret = process.env.BOOKING_TOKEN_SECRET;
    const ipSalt = process.env.IP_HASH_SALT;
    const siteUrl = process.env.SITE_URL;
    if (!secret || !ipSalt || !siteUrl) {
        // Server console only; client gets a generic 500.
        console.error(
            "[api/book/request] Missing one of BOOKING_TOKEN_SECRET / IP_HASH_SALT / SITE_URL."
        );
        return NextResponse.json(
            { ok: false, message: "Something went wrong. Please try again later." },
            { status: 500 }
        );
    }

    const ipHash = hashIp(getClientIp(req), ipSalt);

    try {
        // Rate limiting.
        const [emailCount, ipCount] = await Promise.all([
            countRecentByEmail(email),
            countRecentByIpHash(ipHash),
        ]);
        if (emailCount >= MAX_PER_EMAIL_24H || ipCount >= MAX_PER_IP_24H) {
            // Do not reveal which limit was hit.
            return NextResponse.json(GENERIC_SUCCESS);
        }

        // Dedupe.
        const dedupe = await getDedupeStatus(email);
        if (dedupe.kind === "pending") {
            // Outstanding link already exists — don't resend.
            return NextResponse.json(GENERIC_SUCCESS);
        }
        if (dedupe.kind === "completed") {
            // Already confirmed/booked — generic response.
            return NextResponse.json(GENERIC_SUCCESS);
        }

        // Create row + token.
        const token = generateToken();
        const tokenHash = hashToken(token);
        const tokenExpiresAt = new Date(Date.now() + TOKEN_TTL_MS);

        await createBookingRequest({
            email,
            name,
            business: business || null,
            need,
            ipHash,
            tokenHash,
            tokenExpiresAt,
        });

        const confirmUrl = `${siteUrl.replace(/\/$/, "")}/api/book/confirm?token=${token}`;
        await sendConfirmationEmail({ to: email, name, confirmUrl });

        return NextResponse.json(GENERIC_SUCCESS);
    } catch (err) {
        console.error("[api/book/request] Unexpected error:", err);
        return NextResponse.json(
            { ok: false, message: "Something went wrong. Please try again later." },
            { status: 500 }
        );
    }
}
