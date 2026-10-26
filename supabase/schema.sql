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

-- Grants inquiries from /grants/book-a-call (call requests, Org Vault intake
-- starts, and questions). Same access model as booking_requests: RLS on, no
-- policies, server-only access via the service-role key. Never stores EINs,
-- bank details or documents — the form doesn't ask for them.
create table if not exists public.grants_inquiries (
    id               uuid primary key default gen_random_uuid(),
    intent           text not null,
    email            text not null,
    name             text not null,
    organization     text not null,
    org_type         text not null,
    location         text,
    track            text,
    deadline         text,
    message          text,
    readiness_score  integer,
    readiness_band   text,
    ip_hash          text,
    created_at       timestamptz not null default now()
);

create index if not exists grants_inquiries_email_idx
    on public.grants_inquiries (email);
create index if not exists grants_inquiries_ip_hash_idx
    on public.grants_inquiries (ip_hash);

alter table public.grants_inquiries enable row level security;
