import Link from "next/link";
import { ArrowRight, Check, X } from "lucide-react";
import { GrantsHeader } from "@/components/grants/GrantsHeader";
import { GrantPipelineCard } from "@/components/grants/GrantPipelineCard";
import { GrantsActions, GrantsCTA, Guardrails, LastUpdated, SectionHead } from "@/components/grants/bits";
import { ReadinessShort } from "@/components/grants/ReadinessCheck";
import { COMPARISON, DELIVERABLES, NOT_FOR, PROBLEM, SEGMENTS, STEPS, STEPS_CLOSER } from "@/lib/grants/content";
import { grantsMeta } from "@/lib/grants/meta";

export const metadata = grantsMeta(
    "/grants",
    "Grant Help for Miami-Dade & Broward Nonprofits and Small Businesses | Peyi Solutions Grants",
    "Peyi Solutions Grants finds funding opportunities, drafts applications from your own documents, and tracks every deadline and funder reply — with a human approving every submission. No success fees."
);

export default function GrantsHub() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Service",
                        name: "Peyi Solutions Grants",
                        serviceType: "Grant research, application drafting and deadline tracking",
                        description:
                            "A done-for-you grant service, plus a separate enablement track: Peyi finds grants, drafts applications from the client's own documents, and tracks deadlines and funder replies, with the client approving every submission.",
                        provider: { "@type": "ProfessionalService", name: "Peyi Solutions", url: "https://www.peyiai.com" },
                        areaServed: [
                            { "@type": "AdministrativeArea", name: "Miami-Dade County, Florida" },
                            { "@type": "AdministrativeArea", name: "Broward County, Florida" }
                        ],
                        audience: [
                            { "@type": "Audience", audienceType: "Nonprofits" },
                            { "@type": "Audience", audienceType: "Small businesses" },
                            { "@type": "Audience", audienceType: "Schools, healthcare and municipal-adjacent organizations" }
                        ],
                        url: "https://www.peyiai.com/grants"
                    })
                }}
            />

            <GrantsHeader
                title="Find grants. Apply properly."
                accent="Never miss a deadline."
                lead="Peyi Solutions Grants finds funding for your organization, writes applications from your own documents, and tracks every deadline and funder reply. You approve each submission before it goes out."
                crumbs={[{ label: "Grants", href: "/grants" }]}
                aside={<GrantPipelineCard />}
            >
                <GrantsActions />
                <p className="mt-6 text-[15px] text-quiet leading-relaxed max-w-xl">
                    Built for nonprofits and small businesses.
                    <br />
                    No success fees. Nothing is submitted without your approval.
                </p>
            </GrantsHeader>

            {/* The problem */}
            <section className="container mx-auto px-6 lg:px-16 py-24 md:py-32">
                <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-10 lg:gap-16 items-start">
                    <div>
                        <p className="type-eyebrow mb-5">The problem</p>
                        <h2 className="type-section text-balance">
                            Grants get lost on the <span className="accent-word">calendar</span>, not on merit.
                        </h2>
                    </div>
                    <div className="font-heading text-ink/90">
                        <p className="text-xl md:text-2xl leading-snug">{PROBLEM.intro}</p>
                        <ul className="mt-4 space-y-3 text-xl md:text-2xl leading-snug">
                            {PROBLEM.causes.map((c) => (
                                <li key={c} className="flex gap-4">
                                    <span aria-hidden="true" className="mt-[0.7em] h-1.5 w-1.5 shrink-0 rotate-45 bg-coral" />
                                    {c}
                                </li>
                            ))}
                        </ul>
                        <p className="mt-8 text-xl md:text-2xl leading-snug">{PROBLEM.gapIntro}</p>
                        <ul className="mt-4 space-y-3 text-xl md:text-2xl leading-snug">
                            {PROBLEM.gaps.map((g) => (
                                <li key={g} className="flex gap-4">
                                    <span aria-hidden="true" className="mt-[0.7em] h-1.5 w-1.5 shrink-0 rotate-45 bg-gold" />
                                    {g}
                                </li>
                            ))}
                        </ul>
                        <p className="mt-8 text-2xl md:text-[1.7rem] leading-snug font-bold text-coral-deep">{PROBLEM.close}</p>
                    </div>
                </div>
            </section>

            {/* How it works */}
            <section className="band relative py-24 md:py-32" id="how-it-works">
                <div className="container mx-auto px-6 lg:px-16">
                    <SectionHead eyebrow="How it works" title="Six steps, and you approve" accent="every one that matters." />
                    <ol className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                        {STEPS.map((s) => (
                            <li key={s.n} className="group relative rounded-[1.5rem] border border-gold-soft bg-paper p-7 transition-transform duration-300 hover:-translate-y-1">
                                <span className="font-heading text-5xl font-extrabold text-coral/25 transition-colors group-hover:text-coral/45">{s.n}</span>
                                <h3 className="mt-2 font-heading text-2xl font-bold text-ink">{s.name}</h3>
                                <p className="mt-3 text-body leading-relaxed">{s.body}</p>
                            </li>
                        ))}
                    </ol>
                    <div className="mt-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <p className="font-heading italic text-2xl text-coral-deep">{STEPS_CLOSER}</p>
                        <Link href="/grants/how-it-works" className="inline-flex items-center gap-2 font-heading font-semibold text-ink hover:text-coral-deep">
                            See each step in detail <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* What you get */}
            <section className="container mx-auto px-6 lg:px-16 py-24 md:py-32">
                <SectionHead eyebrow="What you get" title="What you have in hand" accent="at the end." />
                <ul className="grid gap-4 md:grid-cols-2">
                    {DELIVERABLES.map((d) => (
                        <li key={d.text} className="flex gap-4 rounded-2xl border border-gold-soft/80 bg-paper px-5 py-4">
                            <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-teal-deep text-white">
                                <Check className="h-4 w-4" strokeWidth={3} />
                            </span>
                            <span className="text-[17px] text-ink leading-snug">
                                {d.text}
                            </span>
                        </li>
                    ))}
                </ul>
            </section>

            {/* Who it's for + who it's not for */}
            <section className="band py-24 md:py-32">
                <div className="container mx-auto px-6 lg:px-16">
                    <SectionHead eyebrow="Who it's for" title="Built for organizations with" accent="no grant staff." />
                    <div className="grid gap-5 md:grid-cols-3">
                        {SEGMENTS.map((s) => (
                            <Link
                                key={s.id}
                                href={`/grants/who-its-for#${s.id}`}
                                className="group rounded-[1.5rem] border border-gold-soft bg-paper p-7 transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_30px_60px_-40px_rgba(120,40,50,0.5)]"
                            >
                                <h3 className="font-heading text-2xl font-bold text-ink">{s.name}</h3>
                                <p className="mt-3 text-body leading-relaxed">{s.short}</p>
                                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-coral-deep">
                                    Read more <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </span>
                            </Link>
                        ))}
                    </div>
                    <div className="mt-10 rounded-[1.5rem] border border-dashed border-coral/40 bg-paper/70 p-7">
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
            </section>

            {/* Readiness Check, short */}
            <section className="container mx-auto px-6 lg:px-16 py-24 md:py-32">
                <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-10 items-start">
                    <div className="lg:sticky lg:top-28">
                        <p className="type-eyebrow mb-5">Grant Readiness Check</p>
                        <h2 className="type-section text-balance">
                            Know where you stand in <span className="accent-word">5 minutes.</span>
                        </h2>
                        <p className="mt-5 text-lg text-body leading-relaxed">
                            Answer a few questions about your organization and you get a readiness score, a prioritized gap list and your next three actions.
                            It&apos;s yours whether or not you ever hire Peyi.
                        </p>
                    </div>
                    <ReadinessShort />
                </div>
            </section>

            {/* Done-for-you vs enablement */}
            <section className="band py-24 md:py-32">
                <div className="container mx-auto px-6 lg:px-16">
                    <SectionHead eyebrow="Two tracks" title="Done-for-you, or" accent="run it yourself." />
                    <div className="overflow-x-auto rounded-[1.5rem] border border-gold-soft bg-paper">
                        <table className="w-full min-w-[640px] text-left">
                            <thead>
                                <tr className="border-b border-gold-soft">
                                    <th className="p-5" />
                                    {COMPARISON.columns.map((c) => (
                                        <th key={c} className="p-5 font-heading text-xl font-bold text-ink">
                                            {c}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gold-soft">
                                {COMPARISON.rows.map(([label, a, b]) => (
                                    <tr key={label}>
                                        <th scope="row" className="p-5 font-label text-[11px] text-gold-deep align-top">
                                            {label}
                                        </th>
                                        <td className="p-5 text-body">{a}</td>
                                        <td className="p-5 text-body">{b}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
                        <Link href="/grants/done-for-you-vs-enablement" className="inline-flex items-center gap-2 font-heading font-semibold text-ink hover:text-coral-deep">
                            How to choose <ArrowRight className="h-4 w-4" />
                        </Link>
                        <Link href="/grants/pricing" className="inline-flex items-center gap-2 font-heading font-semibold text-ink hover:text-coral-deep">
                            See pricing <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Trust, proof, honesty */}
            <section className="container mx-auto px-6 lg:px-16 py-24 md:py-32">
                <div className="max-w-3xl">
                    <p className="type-eyebrow mb-5">Proof</p>
                    <blockquote className="font-heading text-3xl md:text-4xl leading-tight text-ink text-balance">
                        This service is being built and tested on Peyi Solutions first.{" "}
                        <span className="accent-word">If the work holds up, that becomes the case study</span>: real applications, real deadlines, real
                        approvals.
                    </blockquote>
                    <p className="mt-6 text-body leading-relaxed">
                        That&apos;s why there are no client logos, win rates or award totals here. When there are results worth showing, they&apos;ll go up with
                        the client&apos;s permission. Peyi Solutions is an independent AI consulting agency that helps organizations apply. It is not a funder
                        and has no affiliation with Grants.gov or any county, city or foundation.
                    </p>
                </div>
                <Guardrails className="mt-14" />
                <LastUpdated className="mt-10" />
            </section>

            <GrantsCTA />
        </>
    );
}
