import Link from "next/link";
import { ArrowRight, ClipboardCheck, FileText, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/art/Magnetic";
import { PalmCluster, SPRIG } from "@/components/art/Palms";
import { PointerField } from "@/components/art/PointerField";
import { GUARDRAILS } from "@/lib/grants/content";
import {
    BOOK_HREF,
    GRANTS_LAST_UPDATED,
    GRANTS_LAST_UPDATED_LABEL,
    INTAKE_HREF,
    READINESS_HREF
} from "@/lib/grants/config";

export function LastUpdated({ className = "" }: { className?: string }) {
    return (
        <p className={`font-label text-[11px] text-quiet ${className}`}>
            Last updated <time dateTime={GRANTS_LAST_UPDATED}>{GRANTS_LAST_UPDATED_LABEL}</time>
        </p>
    );
}

/** The two actions every Grants page ends on: check readiness, then intake. */
export function GrantsActions({ center = false, third = false }: { center?: boolean; third?: boolean }) {
    return (
        <div className={`flex flex-col sm:flex-row flex-wrap gap-3.5 ${center ? "items-center justify-center" : ""}`}>
            <Magnetic>
                <Button size="xl" variant="hero" className="group whitespace-nowrap" asChild>
                    <Link href={READINESS_HREF}>
                        <ClipboardCheck className="mr-2.5 w-5 h-5" />
                        Check your grant readiness
                        <ArrowRight className="ml-2.5 w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                </Button>
            </Magnetic>
            <Magnetic pull={0.18}>
                <Button size="xl" variant="heroOutline" className="whitespace-nowrap" asChild>
                    <Link href={INTAKE_HREF}>
                        <FileText className="mr-2.5 w-5 h-5" />
                        Tell us about your organization
                    </Link>
                </Button>
            </Magnetic>
            {third && (
                <Button size="xl" variant="ghost" className="whitespace-nowrap" asChild>
                    <Link href={BOOK_HREF}>Book a call</Link>
                </Button>
            )}
        </div>
    );
}

/** "How Peyi works, and how it does not." — brief §9, on hub, how-it-works and pricing. */
export function Guardrails({ className = "" }: { className?: string }) {
    return (
        <aside
            aria-labelledby="guardrails-title"
            className={`relative overflow-hidden rounded-[1.75rem] border border-gold/60 bg-paper p-8 md:p-10 shadow-[0_30px_60px_-40px_rgba(120,50,50,0.45)] ${className}`}
        >
            <div aria-hidden="true" className="absolute inset-[7px] rounded-[1.4rem] border border-gold/25 pointer-events-none" />
            <div className="relative flex items-center gap-3 mb-6">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[image:var(--gradient-ai)] text-white">
                    <ShieldCheck className="h-5 w-5" />
                </span>
                <h2 id="guardrails-title" className="font-heading text-2xl md:text-3xl font-bold text-ink">
                    How Peyi works, and how it does not.
                </h2>
            </div>
            <ul className="relative grid gap-3.5 md:grid-cols-2">
                {GUARDRAILS.map((g) => (
                    <li key={g} className="flex gap-3 text-body leading-relaxed">
                        <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rotate-45 bg-gold" />
                        {g}
                    </li>
                ))}
            </ul>
        </aside>
    );
}

/** Closing call to action, set like the homepage's Deco doorway. */
export function GrantsCTA({
    title = "Start with the",
    accent = "Readiness Check.",
    body = "It takes about 5 minutes, and you will leave with a gap list — whether or not you ever hire Peyi."
}: {
    title?: string;
    accent?: string;
    body?: string;
}) {
    return (
        <PointerField
            as="section"
            className="grain relative isolate overflow-hidden py-28 md:py-36 px-6"
            style={{ background: "linear-gradient(180deg, var(--color-cream) 0%, #FBE3DF 50%, #F6CBC8 100%)" }}
        >
            <div id="final-cta" className="absolute inset-0 pointer-events-none" aria-hidden="true" />
            <div aria-hidden="true" className="absolute left-1/2 bottom-0 -translate-x-1/2 -z-10 w-[min(92vw,720px)] h-[86%]">
                <div className="depth absolute inset-0 arch border border-gold/70" style={{ ["--d" as string]: "6px" }} />
                <div
                    className="depth absolute inset-[22px] arch border border-gold/40 bg-gradient-to-b from-[#FFF6F3]/80 to-[#FBDCD6]/40"
                    style={{ ["--d" as string]: "10px" }}
                />
            </div>
            <PalmCluster fronds={SPRIG} className="left-0 top-0 w-[360px] h-[520px] origin-top-left scale-[0.65] md:scale-100" depth={16} lean={3} pivot="0% 0%" />
            <PalmCluster fronds={SPRIG} className="hidden md:block right-0 top-0 w-[360px] h-[520px] origin-top scale-x-[-1]" depth={16} lean={-3} pivot="0% 0%" />

            <div className="relative max-w-2xl mx-auto text-center">
                <p className="type-eyebrow mb-6">Your next step</p>
                <h2 className="type-section text-balance mb-6">
                    {title} <span className="accent-word">{accent}</span>
                </h2>
                <p className="text-lg md:text-xl text-body mb-10 text-pretty">{body}</p>
                <GrantsActions center />
            </div>
        </PointerField>
    );
}

/** Section heading pattern used across Grants pages. */
export function SectionHead({ eyebrow, title, accent, lead }: { eyebrow: string; title: string; accent?: string; lead?: string }) {
    return (
        <div className="max-w-3xl mb-12">
            <p className="type-eyebrow mb-5">{eyebrow}</p>
            <h2 className="type-section text-balance">
                {title}
                {accent && (
                    <>
                        {" "}
                        <span className="accent-word">{accent}</span>
                    </>
                )}
            </h2>
            {lead && <p className="mt-5 text-lg text-body leading-relaxed text-pretty">{lead}</p>}
        </div>
    );
}
