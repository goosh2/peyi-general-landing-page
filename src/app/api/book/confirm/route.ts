import { NextResponse, type NextRequest } from "next/server";
import { hashToken, redeemToken, signTicket } from "@/lib/booking";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * GET /api/book/confirm?token=...
 *
 * Redeems the single-use token: looks it up by hash, verifies it is unexpired
 * and unconsumed, stamps `confirmed_at`, then redirects to the confirmed page
 * with a short-lived HMAC-signed ticket. Any failure redirects back to /book
 * with a generic `error=expired`.
 */
export async function GET(req: NextRequest) {
    const url = new URL(req.url);
    const bookBase = `${url.origin}/book`;
    const expired = () => NextResponse.redirect(`${bookBase}?error=expired`);

    const token = url.searchParams.get("token");
    if (!token) {
        return expired();
    }

    const secret = process.env.BOOKING_TOKEN_SECRET;
    if (!secret) {
        console.error("[api/book/confirm] Missing BOOKING_TOKEN_SECRET.");
        return expired();
    }

    try {
        const requestId = await redeemToken(hashToken(token));
        if (!requestId) {
            return expired();
        }

        const ticket = signTicket(requestId, secret);
        return NextResponse.redirect(
            `${url.origin}/book/confirmed?ticket=${encodeURIComponent(ticket)}`
        );
    } catch (err) {
        console.error("[api/book/confirm] Unexpected error:", err);
        return expired();
    }
}
