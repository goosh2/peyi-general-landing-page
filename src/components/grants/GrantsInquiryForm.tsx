"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * The Grants inquiry form — the "Book a call" step, and the Org Vault intake
 * entry point until the reviewed intake form is linked. It asks only for what
 * Peyi needs to reply; it never asks for EINs, bank details or documents.
 */

const INTENTS = [
    { value: "call", label: "Book a call" },
    { value: "intake", label: "Start my Org Vault intake" },
    { value: "question", label: "Ask a question first" },
];
const ORG_TYPES = ["Nonprofit", "For-profit small business", "School", "Healthcare", "Municipal-adjacent", "Other"];
const LOCATIONS = ["Miami-Dade", "Broward", "Elsewhere in Florida", "Elsewhere in the US"];
const TRACKS = ["Done-for-you", "Enablement", "Not sure yet"];
const DEADLINES = ["None yet", "Within 30 days", "Within 90 days", "Just exploring"];

type Status = "idle" | "submitting" | "success" | "error";

const field =
    "w-full rounded-2xl border border-[#E7D2CC] bg-[#FFFDFC] px-4 py-3 text-[16px] text-ink placeholder:text-quiet/70 transition-[border-color,box-shadow] duration-200 hover:border-gold focus:outline-none focus:border-coral focus:shadow-[0_0_0_4px_rgba(224,80,106,0.14)]";

function Pills({
    name,
    options,
    value,
    onChange,
}: {
    name: string;
    options: { value: string; label: string }[];
    value: string;
    onChange: (v: string) => void;
}) {
    return (
        <div className="flex flex-wrap gap-2" role="radiogroup">
            {options.map((o) => {
                const checked = value === o.value;
                return (
                    <label
                        key={o.value}
                        className={`relative inline-flex cursor-pointer items-center rounded-full border px-4 py-2 text-[15px] transition-colors active:scale-[0.97] ${
                            checked ? "border-coral bg-coral text-white" : "border-gold-soft bg-paper text-ink hover:border-gold"
                        }`}
                    >
                        <input
                            type="radio"
                            name={name}
                            value={o.value}
                            checked={checked}
                            onChange={() => onChange(o.value)}
                            className="peer sr-only"
                        />
                        {o.label}
                        <span
                            aria-hidden="true"
                            className="pointer-events-none absolute inset-0 rounded-full ring-coral/40 ring-offset-2 peer-focus-visible:ring-2"
                        />
                    </label>
                );
            })}
        </div>
    );
}

export function GrantsInquiryForm() {
    const [form, setForm] = useState({
        intent: "call",
        name: "",
        email: "",
        organization: "",
        orgType: "",
        location: "",
        track: "Not sure yet",
        deadline: "",
        message: "",
        website: "", // honeypot
    });
    const [readiness, setReadiness] = useState<{ total: number; band: string } | null>(null);
    const [status, setStatus] = useState<Status>("idle");
    const [error, setError] = useState("");
    const renderedAt = useRef(0);

    useEffect(() => {
        renderedAt.current = Date.now();
        // Prefill on the next frame rather than synchronously in the effect.
        const raf = requestAnimationFrame(() => {
            const p = new URLSearchParams(window.location.search);
            const intent = p.get("intent");
            if (intent && INTENTS.some((i) => i.value === intent)) setForm((f) => ({ ...f, intent }));
            try {
                const saved = sessionStorage.getItem("peyi-grants-readiness");
                if (saved) {
                    const r = JSON.parse(saved) as { total: number; band: string; orgType?: string; location?: string };
                    setReadiness({ total: r.total, band: r.band });
                    const ot = {
                        nonprofit: "Nonprofit",
                        business: "For-profit small business",
                        school: "School",
                        healthcare: "Healthcare",
                        municipal: "Municipal-adjacent",
                        other: "Other",
                    }[r.orgType ?? ""];
                    const loc = { "miami-dade": "Miami-Dade", broward: "Broward", florida: "Elsewhere in Florida", us: "Elsewhere in the US" }[
                        r.location ?? ""
                    ];
                    setForm((f) => ({ ...f, orgType: f.orgType || ot || "", location: f.location || loc || "" }));
                }
            } catch {
                /* no saved result */
            }
        });
        return () => cancelAnimationFrame(raf);
    }, []);

    const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
        setForm((f) => ({ ...f, [k]: e.target.value }));

    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError("");
        if (!form.name.trim() || !form.email.trim() || !form.organization.trim() || !form.orgType) {
            setStatus("error");
            setError("Please add your name, email, organization and organization type.");
            return;
        }
        setStatus("submitting");
        try {
            const res = await fetch("/api/grants/inquiry", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...form,
                    readinessScore: readiness?.total ?? null,
                    readinessBand: readiness?.band ?? null,
                    renderTimestamp: renderedAt.current,
                }),
            });
            if (!res.ok) {
                const data = (await res.json().catch(() => null)) as { message?: string } | null;
                setStatus("error");
                setError(data?.message || "Something went wrong. Please try again.");
                return;
            }
            setStatus("success");
        } catch {
            setStatus("error");
            setError("Network error. Please try again.");
        }
    }

    if (status === "success") {
        return (
            <div className="rise rounded-[1.75rem] border border-gold-soft bg-paper p-10 text-center shadow-[0_40px_70px_-50px_rgba(120,50,50,0.55)]">
                <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-teal-deep text-white shadow-[0_0_0_8px_rgba(29,188,160,0.15)]">
                    <Check className="h-8 w-8" strokeWidth={3} />
                </span>
                <h2 className="mt-6 font-heading text-3xl font-bold text-ink">Thanks, {form.name.trim().split(" ")[0]}.</h2>
                <p className="mt-3 text-body leading-relaxed max-w-md mx-auto">
                    Peyi has your details and will reply to <span className="text-ink">{form.email.trim()}</span>
                    {form.intent === "intake"
                        ? " with your Org Vault intake and the Uploads folder for your documents."
                        : " to set up a time to talk."}
                </p>
            </div>
        );
    }

    return (
        <form
            onSubmit={onSubmit}
            noValidate
            className="rounded-[1.75rem] border border-gold-soft bg-paper p-6 md:p-10 shadow-[0_40px_70px_-50px_rgba(120,50,50,0.55)] space-y-7"
        >
            <div>
                <p className="font-heading font-semibold text-ink text-lg mb-3">What would you like to do?</p>
                <Pills name="intent" options={INTENTS} value={form.intent} onChange={(v) => setForm((f) => ({ ...f, intent: v }))} />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
                <label className="block">
                    <span className="block font-heading font-semibold text-ink mb-2">Your name</span>
                    <input className={field} value={form.name} onChange={set("name")} autoComplete="name" required maxLength={120} />
                </label>
                <label className="block">
                    <span className="block font-heading font-semibold text-ink mb-2">Email</span>
                    <input className={field} type="email" value={form.email} onChange={set("email")} autoComplete="email" required maxLength={200} />
                </label>
                <label className="block sm:col-span-2">
                    <span className="block font-heading font-semibold text-ink mb-2">Organization</span>
                    <input
                        className={field}
                        value={form.organization}
                        onChange={set("organization")}
                        autoComplete="organization"
                        required
                        maxLength={200}
                    />
                </label>
                <label className="block">
                    <span className="block font-heading font-semibold text-ink mb-2">Organization type</span>
                    <select className={field} value={form.orgType} onChange={set("orgType")} required>
                        <option value="">Choose one</option>
                        {ORG_TYPES.map((o) => (
                            <option key={o}>{o}</option>
                        ))}
                    </select>
                </label>
                <label className="block">
                    <span className="block font-heading font-semibold text-ink mb-2">Where you&apos;re based</span>
                    <select className={field} value={form.location} onChange={set("location")}>
                        <option value="">Choose one</option>
                        {LOCATIONS.map((o) => (
                            <option key={o}>{o}</option>
                        ))}
                    </select>
                </label>
            </div>

            <div>
                <p className="font-heading font-semibold text-ink mb-3">Which track interests you?</p>
                <Pills
                    name="track"
                    options={TRACKS.map((t) => ({ value: t, label: t }))}
                    value={form.track}
                    onChange={(v) => setForm((f) => ({ ...f, track: v }))}
                />
            </div>

            <div>
                <p className="font-heading font-semibold text-ink mb-3">Next deadline pressure</p>
                <Pills
                    name="deadline"
                    options={DEADLINES.map((t) => ({ value: t, label: t }))}
                    value={form.deadline}
                    onChange={(v) => setForm((f) => ({ ...f, deadline: v }))}
                />
            </div>

            <label className="block">
                <span className="block font-heading font-semibold text-ink mb-1">Anything we should know?</span>
                <span className="block text-sm text-quiet mb-2">
                    Programs you&apos;re eyeing, a deadline, a question. Please don&apos;t include EINs, bank details or passwords.
                </span>
                <textarea className={`${field} min-h-[120px]`} value={form.message} onChange={set("message")} maxLength={2000} />
            </label>

            {readiness && (
                <p className="rounded-2xl bg-cream border border-gold-soft px-4 py-3 text-[15px] text-body">
                    We&apos;ll include your Readiness Check result:{" "}
                    <strong className="text-ink">
                        {readiness.total}/100 — {readiness.band}
                    </strong>
                    .
                </p>
            )}

            {/* Honeypot — hidden from people, irresistible to bots */}
            <div aria-hidden="true" className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden">
                <label>
                    Website
                    <input tabIndex={-1} autoComplete="off" value={form.website} onChange={set("website")} />
                </label>
            </div>

            {status === "error" && error && (
                <p role="alert" className="rounded-2xl border-l-4 border-coral-deep bg-coral/[0.07] px-4 py-3 text-[15px] text-coral-deep">
                    {error}
                </p>
            )}

            <Button type="submit" size="xl" variant="hero" className="group w-full sm:w-auto" disabled={status === "submitting"}>
                {status === "submitting"
                    ? "Sending…"
                    : form.intent === "intake"
                      ? "Start my intake"
                      : form.intent === "question"
                        ? "Send my question"
                        : "Request a call"}
                <ArrowRight className="ml-2.5 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
        </form>
    );
}
