-- Booking requests for the gated AI-audit flow.
--
-- Rows are written and read exclusively by the server using the Supabase
-- service-role key, which bypasses Row Level Security. RLS is ENABLED with NO
-- policies so that the anon/public (and any client-side) keys have zero access
-- to this table. Do not add public policies — all access must go through the
-- server-only client in src/lib/supabase-server.ts.

create extension if not exists "pgcrypto";

create table if not exists public.booking_requests (
    id                uuid primary key default gen_random_uuid(),
    email             text not null,
    name              text,
    business          text,
    need              text,
    ip_hash           text,
    token_hash        text unique,
    token_expires_at  timestamptz,
    confirmed_at      timestamptz,
    booked_at         timestamptz,
    created_at        timestamptz not null default now()
);

-- Lookups: rate limiting by email / ip_hash, and token redemption by token_hash.
create index if not exists booking_requests_email_idx
    on public.booking_requests (email);
create index if not exists booking_requests_ip_hash_idx
    on public.booking_requests (ip_hash);
create index if not exists booking_requests_token_hash_idx
    on public.booking_requests (token_hash);

-- Enable RLS with no policies => only the service role can touch this table.
alter table public.booking_requests enable row level security;
