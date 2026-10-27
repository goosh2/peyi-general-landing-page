import { Ban, CalendarClock, Handshake, ShieldCheck } from "lucide-react";
import { GrantsHeader } from "@/components/grants/GrantsHeader";
import { GrantsCTA, Guardrails, LastUpdated, SectionHead } from "@/components/grants/bits";
import { PricingTiers } from "@/components/grants/Pricing";
import { grantsMeta } from "@/lib/grants/meta";

export const metadata = grantsMeta(
    "/grants/pricing",
    "Grant Service Pricing: Grant Blitz, Core, Pro & Enablement | Peyi Solutions Grants",
    "Peyi Solutions Grants is priced by workload, with flat setup fees and monthly retainers — never a percentage of the award. The Grant Blitz delivers up to 5 tailored applications in 90 days."
);

const TIMELINE = [
    { at: "30 days", text: "Vault complete, gap list closed, first ranked list, first drafts in approval." },
    { at: "90 days", text: "Applications submitted, pipeline value tracked, funder replies handled." },
    {
        at: "6–12 months",
        text: "Decisions start landing — and only then can award-dollar ROI be measured. Local and foundation decisions are typically faster than federal ones, which commonly take 6–12 months."
    }
];

export default function Pricing() {
    return (
        <>
            <GrantsHeader
                title="Pricing, priced by"
                accent="workload."
                lead="Peyi Solutions Grants is priced by workload — how many applications a month, how complex the funders are, and how many programs, reviewers and reports are involved — with flat setup fees and retainers, never a percentage of the award. There are four options: the Grant Blitz, Core, Pro, and the separate Enablement track."
                crumbs={[
                    { label: "Grants", href: "/grants" },
                    { label: "Pricing", href: "/grants/pricing" }
                ]}
            />

            <section className="container mx-auto px-6 lg:px-16 py-20 md:py-28" id="tiers">
                <PricingTiers />
            </section>

            <section className="band py-24 md:py-28">
                <div className="container mx-auto px-6 lg:px-16">
                    <SectionHead eyebrow="What every tier says plainly" title="What you're paying for —" accent="and what you're not." />
                    <div className="grid gap-5 md:grid-cols-2">
                        <div className="rounded-[1.5rem] border border-gold-soft bg-paper p-7">
                            <Ban className="h-7 w-7 text-coral-deep" />
                            <h3 className="mt-4 font-heading text-2xl font-bold text-ink">No percentage of the award, ever</h3>
                            <p className="mt-3 text-body leading-relaxed">
                                No contingency pricing, and no money-back-if-not-awarded promise either — that&apos;s contingency in disguise. Grant-professional
                                ethics and many funder rules forbid it, and grant funds cannot legally pay for pre-award writing in the way a success fee implies.
                            </p>
                        </div>
                        <div className="rounded-[1.5rem] border border-gold-soft bg-paper p-7">
                            <ShieldCheck className="h-7 w-7 text-teal-deep" />
                            <h3 className="mt-4 font-heading text-2xl font-bold text-ink">No award guarantee — a process guarantee</h3>
                            <p className="mt-3 text-body leading-relaxed">
                                What Peyi guarantees is the process: the vault complete on a set timeline, the Scout list on a set cadence, draft turnaround per
                                application type, zero missed deadlines on Peyi&apos;s watch (if Peyi misses one, that month is free), and funder-email replies
                                drafted within 1 business day.
                            </p>
                        </div>
                        <div className="rounded-[1.5rem] border border-gold-soft bg-paper p-7">
                            <Handshake className="h-7 w-7 text-gold-deep" />
                            <h3 className="mt-4 font-heading text-2xl font-bold text-ink">You approve every submission</h3>
                            <p className="mt-3 text-body leading-relaxed">
                                The retainer covers the pipeline — finding, drafting, chasing and tracking. It does not buy an award, and nothing goes to a funder
                                without your sign-off.
                            </p>
                        </div>
                        <div className="rounded-[1.5rem] border border-gold-soft bg-paper p-7">
                            <CalendarClock className="h-7 w-7 text-coral-deep" />
                            <h3 className="mt-4 font-heading text-2xl font-bold text-ink">What costs extra</h3>
                            <p className="mt-3 text-body leading-relaxed">
                                Applications beyond your tier&apos;s monthly allowance are quoted separately. Post-award reporting management is out of scope today.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="container mx-auto px-6 lg:px-16 py-24 md:py-28">
                <SectionHead eyebrow="Results timeline" title="When to expect what —" accent="stated plainly." />
                <ol className="relative grid gap-5 md:grid-cols-3">
                    {TIMELINE.map((t) => (
                        <li key={t.at} className="rounded-[1.5rem] border border-gold-soft bg-paper p-7">
                            <span className="font-heading text-4xl font-extrabold text-coral-deep">{t.at}</span>
                            <p className="mt-3 text-body leading-relaxed">{t.text}</p>
                        </li>
                    ))}
                </ol>
                <p className="mt-6 text-body">
                    That&apos;s why Core and Pro start with a 6-month term: a 1- or 3-month retainer ends before most decisions arrive.
                </p>
                <Guardrails className="mt-14" />
                <LastUpdated className="mt-10" />
            </section>

            <GrantsCTA title="Not sure which tier fits? Start with the" />
        </>
    );
}
