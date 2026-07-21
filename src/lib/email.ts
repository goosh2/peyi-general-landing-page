import "server-only";
import { Resend } from "resend";

/**
 * Resend wrapper. The client is created lazily inside the send function so the
 * build succeeds without RESEND_API_KEY set. Missing env at runtime logs to the
 * server console and throws a generic error.
 */

const FROM_ADDRESS = "Peyi Solutions <bookings@peyiai.com>";

let cached: Resend | null = null;

function getResend(): Resend {
    if (cached) {
        return cached;
    }
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
        console.error("[email] Missing RESEND_API_KEY environment variable.");
        throw new Error("Email service is not configured.");
    }
    cached = new Resend(apiKey);
    return cached;
}

export interface ConfirmationEmailArgs {
    to: string;
    name: string | null;
    confirmUrl: string;
}

/** Send the single-use confirmation email. */
export async function sendConfirmationEmail(args: ConfirmationEmailArgs): Promise<void> {
    const resend = getResend();
    const { error } = await resend.emails.send({
        from: FROM_ADDRESS,
        to: args.to,
        subject: "Confirm your AI audit request",
        html: confirmationEmailHtml(args),
    });
    if (error) {
        console.error("[email] Resend send error:", error);
        throw new Error("Failed to send confirmation email.");
    }
}

/**
 * Dark, simple, brand-styled confirmation email. Uses inline styles and a
 * system font stack (Space Grotesk / Inter fall back to system UI fonts, since
 * custom web fonts are unreliable across email clients).
 */
export function confirmationEmailHtml(args: ConfirmationEmailArgs): string {
    const greeting = args.name ? `Hi ${escapeHtml(args.name)},` : "Hi there,";
    const bg = "#0B0F19";
    const card = "#111624";
    const border = "#232a3d";
    const text = "#e6e9f2";
    const muted = "#9aa3b8";
    const gradient = "linear-gradient(135deg, #FA8938 0%, #EB477E 50%, #A65EED 100%)";
    const fontStack =
        "'Space Grotesk', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";

    return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Confirm your AI audit request</title>
</head>
<body style="margin:0;padding:0;background-color:${bg};">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${bg};padding:32px 0;">
<tr>
<td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;background-color:${card};border:1px solid ${border};border-radius:16px;overflow:hidden;">
<tr>
<td style="height:4px;background-image:${gradient};line-height:4px;font-size:0;">&nbsp;</td>
</tr>
<tr>
<td style="padding:40px 40px 32px 40px;font-family:${fontStack};">
<h1 style="margin:0 0 8px 0;font-size:22px;font-weight:700;color:${text};">Confirm your AI audit request</h1>
<p style="margin:0 0 24px 0;font-size:15px;line-height:1.6;color:${muted};">${greeting}</p>
<p style="margin:0 0 24px 0;font-size:15px;line-height:1.6;color:${text};">
Thanks for requesting an AI audit with Peyi Solutions. Click the button below to verify your email and unlock your booking link. This link is single-use and expires in 24 hours.
</p>
<table role="presentation" cellpadding="0" cellspacing="0" style="margin:8px 0 28px 0;">
<tr>
<td align="center" style="border-radius:10px;background-image:${gradient};">
<a href="${escapeHtml(args.confirmUrl)}" style="display:inline-block;padding:14px 32px;font-family:${fontStack};font-size:15px;font-weight:600;color:#ffffff;text-decoration:none;border-radius:10px;">Confirm &amp; book my audit</a>
</td>
</tr>
</table>
<p style="margin:0 0 8px 0;font-size:13px;line-height:1.6;color:${muted};">
If the button doesn't work, copy and paste this link into your browser:
</p>
<p style="margin:0 0 24px 0;font-size:13px;line-height:1.6;word-break:break-all;">
<a href="${escapeHtml(args.confirmUrl)}" style="color:#EB477E;text-decoration:underline;">${escapeHtml(args.confirmUrl)}</a>
</p>
<p style="margin:0;font-size:12px;line-height:1.6;color:${muted};">
If you didn't request this, you can safely ignore this email.
</p>
</td>
</tr>
<tr>
<td style="padding:20px 40px;border-top:1px solid ${border};font-family:${fontStack};">
<p style="margin:0;font-size:12px;color:${muted};">Peyi Solutions &middot; AI implementation for small businesses</p>
</td>
</tr>
</table>
</td>
</tr>
</table>
</body>
</html>`;
}

function escapeHtml(value: string): string {
    return value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}
