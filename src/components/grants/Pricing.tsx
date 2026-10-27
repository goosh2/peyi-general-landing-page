import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TiltCard } from "@/components/art/TiltCard";
import {
    BOOK_HREF,
    PUBLISH_PRICES,
    SIMPLE_APPLICATION_COST_NOTE,
    SIMPLE_APPLICATION_COST_SOURCE,
    TIERS,
    WRITER_COST_NOTE,
    WRITER_COST_SOURCES,
    type Tier
} from "@/lib/grants/config";

/** The Grant Blitz's 90 days, drawn as a timeline. */
export function BlitzTimeline() {
    const marks = [
        { at: 0, day: "Day 0", text: "Intake; vault build starts" },
        { at: 7.8, day: "Day 7", text: "First ranked list" },
        { at: 15.5, day: "Day 14", text: "First draft in approval" },
        { at: 66.7, day: "Day 60", text: "Second Scout sweep" },
        { at: 100, day: "Day 90", text: "Up to 5 submitted; tracking continues" }
    ];
    return (
        <div className="mt-8" aria-label="Grant Blitz timeline">
            <div className="relative h-2 rounded-full bg-sand">
                <div className="absolute inset-y-0 left-0 w-full rounded-full bg-[image:var(--gradient-ai)] origin-left blitz-fill" />
                {/* weekly approval batches */}
                {Array.from({ length: 12 }).map((_, i) => (
                    <span
                        key={i}
                        aria-hidden="true"
                        className="absolute top-1/2 -translate-y-1/2 h-3.5 w-[2px] rounded bg-paper/90"
                        style={{ left: `${((i + 1) * 7 * 100) / 90}%` }}
                    />
                ))}
                {marks.map((m) => (
                    <span
                        key={m.day}
                        aria-hidden="true"
                        className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 h-4 w-4 rounded-full border-[3px] border-paper bg-coral-deep shadow"
                        style={{ left: `${m.at}%` }}
                    />
                ))}
            </div>
            <ol className="mt-5 grid grid-cols-2 sm:grid-cols-5 gap-x-4 gap-y-3 text-sm">
                {marks.map((m) => (
                    <li key={m.day}>
                        <span className="block font-heading font-bold text-ink">{m.day}</span>
                        <span className="text-quiet leading-snug">{m.text}</span>
                    </li>
                ))}
            </ol>
            <p className="mt-4 text-sm text-quiet">Thin marks are weekly approval batches — about 30 minutes each.</p>
        </div>
    );
}

function TierCard({ t, featured }: { t: Tier; featured?: boolean }) {
    return (
        <TiltCard strength={0.5} className={`h-full ${featured ? "lg:col-span-3" : ""}`}>
            <article
                id={t.id}
                className={`scroll-mt-28 relative h-full overflow-hidden rounded-[1.75rem] border bg-paper p-7 md:p-9 ${
                    featured ? "border-coral/50 shadow-[0_40px_80px_-50px_rgba(194,59,87,0.7)]" : "border-gold-soft shadow-[0_30px_60px_-45px_rgba(120,50,50,0.5)]"
                }`}
            >
                <p className="font-label text-[10px] text-gold-deep">{t.kind}</p>
                <h3 className="mt-2 font-heading text-3xl font-bold text-ink">{t.name}</h3>
                {t.wow && <p className="mt-3 font-heading italic text-xl md:text-2xl text-coral-deep leading-snug">{t.wow}</p>}
                <p className="mt-3 text-body leading-relaxed">{t.forWho}</p>

                <div className="mt-6 rounded-2xl bg-cream/80 border border-gold-soft/80 p-5">
                    {PUBLISH_PRICES ? (
                        <>
                            <p className="font-heading text-2xl font-bold text-ink">{t.price}</p>
                            {t.priceAlt && <p className="mt-1 text-body">{t.priceAlt}</p>}
                        </>
                    ) : (
                        <p className="font-heading text-xl font-bold text-ink">Pricing on application</p>
                    )}
                    <p className="mt-2 text-sm text-quiet">
                        {t.term}
                    </p>
                </div>

                <ul className={`mt-6 grid gap-3 ${featured ? "md:grid-cols-2 lg:grid-cols-3" : ""}`}>
                    {t.includes.map((i) => (
                        <li key={i} className="flex gap-3 text-[15px] text-body leading-relaxed">
                            <Check className="mt-1 h-4 w-4 shrink-0 text-teal-deep" strokeWidth={3} />
                            {i}
                        </li>
                    ))}
                </ul>

                {t.id === "blitz" && <BlitzTimeline />}

                {t.guardrail && (
                    <p className="mt-7 rounded-2xl border border-dashed border-gold p-4 text-[15px] text-body leading-relaxed">
                        <strong className="text-ink">If fewer than 5 fit: </strong>
                        {t.guardrail}
                    </p>
                )}
                {t.id === "blitz" && (
                    <p className="mt-4 text-sm text-quiet">
                        After the Blitz you can move to Core at its published price, shown here from day one. If every award you&apos;re targeting is local and
                        under $10,000, the Blitz is all you need — we won&apos;t sell you Core.
                    </p>
                )}
            </article>
        </TiltCard>
    );
}

export function PricingTiers() {
    const [blitz, ...rest] = TIERS;
    return (
        <div className="grid gap-6 lg:grid-cols-3">
            <TierCard t={blitz} featured />
            {rest.map((t) => (
                <TierCard key={t.id} t={t} />
            ))}
            <div className="lg:col-span-3 text-sm text-quiet leading-relaxed">
                <p>
                    {WRITER_COST_NOTE} Sources:{" "}
                    {WRITER_COST_SOURCES.map((s, i) => (
                        <span key={s.href}>
                            <a href={s.href} target="_blank" rel="noopener" className="underline decoration-gold underline-offset-2 hover:text-ink">
                                {s.label}
                            </a>
                            {i < WRITER_COST_SOURCES.length - 1 ? "; " : "."}
                        </span>
                    ))}
                </p>
                <p className="mt-2">
                    {SIMPLE_APPLICATION_COST_NOTE} Source:{" "}
                    <a href={SIMPLE_APPLICATION_COST_SOURCE} target="_blank" rel="noopener" className="underline decoration-gold underline-offset-2 hover:text-ink">
                        {SIMPLE_APPLICATION_COST_SOURCE}
                    </a>
                </p>
                <p className="mt-2">
                    Starting prices as of October 2026. Your scope and price are confirmed in writing before anything starts.{" "}
                    <Link href={BOOK_HREF} className="underline decoration-gold underline-offset-2 hover:text-ink">
                        Book a call
                    </Link>{" "}
                    to confirm which tier fits.
                </p>
            </div>
        </div>
    );
}

export function PricingCallout() {
    return (
        <Button size="lg" variant="hero" className="group" asChild>
            <Link href={BOOK_HREF}>
                Talk through which tier fits
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
        </Button>
    );
}
