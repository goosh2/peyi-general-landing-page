import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Server-only Supabase client using the service-role key.
 *
 * IMPORTANT: This module must NEVER be imported from a client component.
 * The `import "server-only"` guard above will throw a build-time error if it
 * is pulled into a client bundle. The service-role key bypasses RLS, so it is
 * strictly server-side.
 *
 * The client is lazily created inside `getSupabaseAdmin()` (not at module top
 * level) so the production build succeeds even when env vars are absent.
 */

let cached: SupabaseClient | null = null;

export function getSupabaseAdmin(): SupabaseClient {
    if (cached) {
        return cached;
    }

    const url = process.env.SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!url || !serviceRoleKey) {
        // Server console only — never leak which var is missing to the client.
        console.error(
            "[supabase-server] Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY environment variable."
        );
        throw new Error("Supabase server client is not configured.");
    }

    cached = createClient(url, serviceRoleKey, {
        auth: {
            persistSession: false,
            autoRefreshToken: false,
        },
    });

    return cached;
}
