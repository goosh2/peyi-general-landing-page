import { X } from "lucide-react";
import { GrantsHeader } from "@/components/grants/GrantsHeader";
import { GrantsActions, GrantsCTA, LastUpdated } from "@/components/grants/bits";
import { ReadinessShort } from "@/components/grants/ReadinessCheck";
import { NOT_FOR, SEGMENTS } from "@/lib/grants/content";
import { grantsMeta } from "@/lib/grants/meta";

export const metadata = grantsMeta(
    "/grants/who-its-for",
    "Who Peyi Solutions Grants Is For: Nonprofits, Small Businesses, Schools & Healthcare with No Grant Staff",
    "Peyi Solutions Grants is for nonprofits and small businesses with no grant staff, and for schools, healthcare and municipal-adjacent organizations that need a repeatable pipeline."
);

export default function WhoItsFor() {
    return (
        <>
            <GrantsHeader
                title="Who Peyi Solutions Grants"
                accent="is for."
                lead="Peyi Solutions Grants is for three kinds of organizations: nonprofits with no dedicated grant staff, small businesses that qualify for local, county, state and small-business programs, and schools, healthcare and municipal-adjacent organizations that need a disciplined pipeline rather than a one-off proposal."
                crumbs={[
                    { label: "Grants", href: "/grants" },
                    { label: "Who it's for", href: "/grants/who-its-for" }
                ]}
            />

            <div className="container mx-auto px-6 lg:px-16 py-20 md:py-28 space-y-10">
                {SEGMENTS.map((s, i) => (
                    <section
                        key={s.id}
                        id={s.id}
                        className="scroll-mt-28 grid lg:grid-cols-[0.75fr_1.25fr] gap-8 lg:gap-14 rounded-[2rem] border border-gold-soft bg-paper p-7 md:p-12"
                    >
                        <div>
                            <span className="font-heading text-6xl font-extrabold text-coral/25">0{i + 1}</span>
                            <h2 className="mt-2 font-heading text-3xl md:text-4xl font-bold text-ink text-balance">{s.name}</h2>
                            <p className="mt-4 text-lg text-body leading-relaxed">{s.short}</p>
                        </div>
                        <div className="space-y-5">
                            <div>
                                <h3 className="font-label text-[11px] text-gold-deep">What usually goes wrong</h3>
                                <p className="mt-2 text-lg text-body leading-relaxed">{s.wrong}</p>
                            </div>
                            <div>
                                <h3 className="font-label text-[11px] text-gold-deep">What Peyi does differently</h3>
                                <p className="mt-2 text-lg text-body leading-relaxed">{s.different}</p>
                            </div>
                            <div className="rounded-2xl bg-cream/80 p-5">
                                <h3 className="font-label text-[11px] text-gold-deep">A grant type they commonly pursue</h3>
                                <p className="mt-2 text-ink font-heading text-lg">{s.example}</p>
                                <p className="mt-1 text-sm text-quiet">A type, not a specific live grant — eligibility is always confirmed against the funder&apos;s current notice.</p>
                            </div>
                            <div className="pt-2">
                                <GrantsActions />
                            </div>
                        </div>
                    </section>
                ))}
            </div>

            <section className="band py-24 md:py-28">
                <div className="container mx-auto px-6 lg:px-16 grid lg:grid-cols-[0.8fr_1.2fr] gap-10 items-start">
                    <div>
                        <p className="type-eyebrow mb-5">Not sure you fit?</p>
                        <h2 className="type-section text-balance">
                            Four questions <span className="accent-word">tell you.</span>
                        </h2>
                        <div className="mt-8 rounded-[1.5rem] border border-dashed border-coral/40 bg-paper/70 p-6">
                            <h3 className="font-heading text-xl font-bold text-ink">Who it is not for</h3>
                            <ul className="mt-4 space-y-3">
                                {NOT_FOR.map((n) => (
                                    <li key={n} className="flex gap-3 text-body leading-relaxed">
                                        <X className="mt-1 h-4 w-4 shrink-0 text-coral-deep" strokeWidth={3} />
                                        {n}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <ReadinessShort />
                </div>
                <div className="container mx-auto px-6 lg:px-16">
                    <LastUpdated className="mt-12" />
                </div>
            </section>

            <GrantsCTA />
        </>
    );
}
