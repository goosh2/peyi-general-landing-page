import "server-only";
import crypto from "node:crypto";
import { getSupabaseAdmin } from "@/lib/supabase-server";

/**
 * Booking helpers: token generation/hashing, HMAC ticket signing/verification,
 * and rate-limit + dedupe queries.
 *
 * Pure functions (token/hash/ticket) are kept free of side effects so they are
 * easy to reason about and test. The Supabase-backed helpers are grouped at the
 * bottom.
 */

const TABLE = "booking_requests";

export const TOKEN_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours
export const TICKET_TTL_MS = 10 * 60 * 1000; // 10 minutes
export const RATE_WINDOW_MS = 24 * 60 * 60 * 1000; // 24 hours
export const MAX_PER_EMAIL_24H = 3;
export const MAX_PER_IP_24H = 10;
export const MIN_FORM_FILL_MS = 3_000; // reject submissions faster than 3s

/* ------------------------------------------------------------------ */
/* Pure functions                                                      */
/* ------------------------------------------------------------------ */

/** Generate a 32-byte random token, returned as a URL-safe hex string. */
export function generateToken(): string {
    return crypto.randomBytes(32).toString("hex");
}

/** SHA-256 hash of a value, returned as hex. Used for tokens (at rest). */
export function sha256(value: string): string {
    return crypto.createHash("sha256").update(value).digest("hex");
}

/** Hash a raw token for storage / lookup. */
export function hashToken(token: string): string {
    return sha256(token);
}

/**
 * Hash an IP address with a server-side salt before storage, so raw IPs are
 * never persisted. Returns hex.
 */
export function hashIp(ip: string, salt: string): string {
    return sha256(`${salt}:${ip}`);
}

/** Timing-safe comparison of two hex strings. */
function safeEqual(a: string, b: string): boolean {
    const bufA = Buffer.from(a);
    const bufB = Buffer.from(b);
    if (bufA.length !== bufB.length) {
        return false;
    }
    return crypto.timingSafeEqual(bufA, bufB);
}

/**
 * Sign a short-lived ticket with HMAC-SHA256. The payload encodes the booking
 * request id and an expiry timestamp. Format: `${base64url(payload)}.${sig}`.
 */
export function signTicket(requestId: string, secret: string, ttlMs: number = TICKET_TTL_MS): string {
    const payload = JSON.stringify({ id: requestId, exp: Date.now() + ttlMs });
    const encoded = Buffer.from(payload).toString("base64url");
    const sig = crypto.createHmac("sha256", secret).update(encoded).digest("base64url");
    return `${encoded}.${sig}`;
}

/**
 * Verify a ticket's HMAC and expiry. Returns the request id when valid,
 * otherwise null. Never throws on malformed input.
 */
export function verifyTicket(ticket: string, secret: string): string | null {
    if (!ticket || typeof ticket !== "string") {
        return null;
    }

    const parts = ticket.split(".");
    if (parts.length !== 2) {
        return null;
    }

    const [encoded, sig] = parts;
    const expectedSig = crypto.createHmac("sha256", secret).update(encoded).digest("base64url");

    if (!safeEqual(sig, expectedSig)) {
        return null;
    }

    try {
        const payload = JSON.parse(Buffer.from(encoded, "base64url").toString("utf8")) as {
            id?: unknown;
            exp?: unknown;
        };
        if (typeof payload.id !== "string" || typeof payload.exp !== "number") {
            return null;
        }
        if (Date.now() > payload.exp) {
            return null;
        }
        return payload.id;
    } catch {
        return null;
    }
}

/* ------------------------------------------------------------------ */
/* Disposable email blocklist                                          */
/* ------------------------------------------------------------------ */

/**
 * ~30 known disposable / throwaway email domains. Matched case-insensitively.
 * Entries ending in `.*` match any TLD on that second-level label.
 */
export const DISPOSABLE_EMAIL_DOMAINS: readonly string[] = [
    "mailinator.com",
    "guerrillamail.com",
    "10minutemail.com",
    "tempmail.*",
    "temp-mail.org",
    "yopmail.com",
    "sharklasers.com",
    "guerrillamailblock.com",
    "grr.la",
    "spam4.me",
    "dispostable.com",
    "trashmail.com",
    "getnada.com",
    "maildrop.cc",
    "mailnesia.com",
    "fakeinbox.com",
    "throwawaymail.com",
    "mytemp.email",
    "mohmal.com",
    "tempinbox.com",
    "emailondeck.com",
    "burnermail.io",
    "moakt.com",
    "mailcatch.com",
    "inboxbear.com",
    "tempr.email",
    "discard.email",
    "spambox.us",
    "33mail.com",
    "anonbox.net",
    "mailsac.com",
];

/** Extract the lowercase domain from an email address. */
export function emailDomain(email: string): string {
    const at = email.lastIndexOf("@");
    return at === -1 ? "" : email.slice(at + 1).toLowerCase().trim();
}

/** True if the email's domain is on the disposable blocklist. */
export function isDisposableEmail(email: string): boolean {
    const domain = emailDomain(email);
    if (!domain) {
        return false;
    }
    return DISPOSABLE_EMAIL_DOMAINS.some((blocked) => {
        if (blocked.endsWith(".*")) {
            const label = blocked.slice(0, -2); // strip ".*"
            return domain === label || domain.startsWith(`${label}.`);
        }
        return domain === blocked;
    });
}

/* ------------------------------------------------------------------ */
/* Supabase-backed helpers                                             */
/* ------------------------------------------------------------------ */

export interface BookingRow {
    id: string;
    email: string;
    name: string | null;
    business: string | null;
    need: string | null;
    ip_hash: string | null;
    token_hash: string | null;
    token_expires_at: string | null;
    confirmed_at: string | null;
    booked_at: string | null;
    created_at: string;
}

/** Count requests for an email within the rate window. */
export async function countRecentByEmail(email: string): Promise<number> {
    const since = new Date(Date.now() - RATE_WINDOW_MS).toISOString();
    const { count, error } = await getSupabaseAdmin()
        .from(TABLE)
        .select("id", { count: "exact", head: true })
        .eq("email", email.toLowerCase())
        .gte("created_at", since);
    if (error) {
        throw error;
    }
    return count ?? 0;
}

/** Count requests for a hashed IP within the rate window. */
export async function countRecentByIpHash(ipHash: string): Promise<number> {
    const since = new Date(Date.now() - RATE_WINDOW_MS).toISOString();
    const { count, error } = await getSupabaseAdmin()
        .from(TABLE)
        .select("id", { count: "exact", head: true })
        .eq("ip_hash", ipHash)
        .gte("created_at", since);
    if (error) {
        throw error;
    }
    return count ?? 0;
}

export type DedupeStatus =
    | { kind: "none" }
    | { kind: "pending" } // unexpired, unconsumed token already exists
    | { kind: "completed" }; // already confirmed or booked

/**
 * Determine whether an email already has an outstanding or completed request,
 * so the caller can avoid re-sending a confirmation email or leaking state.
 */
export async function getDedupeStatus(email: string): Promise<DedupeStatus> {
    const nowIso = new Date().toISOString();
    const { data, error } = await getSupabaseAdmin()
        .from(TABLE)
        .select("id, token_expires_at, confirmed_at, booked_at")
        .eq("email", email.toLowerCase())
        .order("created_at", { ascending: false })
        .limit(20);
    if (error) {
        throw error;
    }
    const rows = (data ?? []) as Pick<
        BookingRow,
        "id" | "token_expires_at" | "confirmed_at" | "booked_at"
    >[];

    if (rows.some((r) => r.confirmed_at || r.booked_at)) {
        return { kind: "completed" };
    }

    const hasPending = rows.some(
        (r) => !r.confirmed_at && r.token_expires_at && r.token_expires_at > nowIso
    );
    if (hasPending) {
        return { kind: "pending" };
    }

    return { kind: "none" };
}

export interface CreateBookingInput {
    email: string;
    name: string | null;
    business: string | null;
    need: string | null;
    ipHash: string | null;
    tokenHash: string;
    tokenExpiresAt: Date;
}

/** Insert a new booking request row. Returns the created row id. */
export async function createBookingRequest(input: CreateBookingInput): Promise<string> {
    const { data, error } = await getSupabaseAdmin()
        .from(TABLE)
        .insert({
            email: input.email.toLowerCase(),
            name: input.name,
            business: input.business,
            need: input.need,
            ip_hash: input.ipHash,
            token_hash: input.tokenHash,
            token_expires_at: input.tokenExpiresAt.toISOString(),
        })
        .select("id")
        .single();
    if (error) {
        throw error;
    }
    return (data as { id: string }).id;
}

/**
 * Redeem a token: find an unexpired, unconsumed row by token hash and stamp
 * `confirmed_at`. Returns the row id on success, or null when the token is
 * invalid, expired, or already consumed.
 */
export async function redeemToken(tokenHash: string): Promise<string | null> {
    const supabase = getSupabaseAdmin();
    const nowIso = new Date().toISOString();

    const { data, error } = await supabase
        .from(TABLE)
        .select("id, token_expires_at, confirmed_at")
        .eq("token_hash", tokenHash)
        .maybeSingle();
    if (error) {
        throw error;
    }
    if (!data) {
        return null;
    }

    const row = data as Pick<BookingRow, "id" | "token_expires_at" | "confirmed_at">;

    if (row.confirmed_at) {
        return null; // already consumed
    }
    if (!row.token_expires_at || row.token_expires_at <= nowIso) {
        return null; // expired
    }

    // Conditional update guards against races/double-redeem: only stamp when
    // confirmed_at is still null.
    const { data: updated, error: updateError } = await supabase
        .from(TABLE)
        .update({ confirmed_at: nowIso })
        .eq("id", row.id)
        .is("confirmed_at", null)
        .select("id")
        .maybeSingle();
    if (updateError) {
        throw updateError;
    }
    if (!updated) {
        return null; // lost the race
    }
    return (updated as { id: string }).id;
}
