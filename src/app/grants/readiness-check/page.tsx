import { GrantsHeader } from "@/components/grants/GrantsHeader";
import { LastUpdated, SectionHead } from "@/components/grants/bits";
import { ReadinessCheck } from "@/components/grants/ReadinessCheck";
import { RUBRIC } from "@/lib/grants/readiness";
import { grantsMeta } from "@/lib/grants/meta";

export const metadata = grantsMeta(
    "/grants/readiness-check",
    "Grant Readiness Check: Free 5-Minute Score and Gap List | Peyi Solutions Grants",
    "The Grant Readiness Check scores how ready your organization is to apply for grants, out of 100, and gives you a prioritized gap list, grant types that fit and your next three actions. No email or account needed."
);

const BANDS = [
    { range: "75–100", label: "Ready to apply" },
    { range: "50–74", label: "Nearly ready" },
    { range: "Under 50", label: "Build the vault first" }
];

export default function ReadinessPage() {
    return (
        <>
            <GrantsHeader
                title="The Grant"
                accent="Readiness Check."
                lead="The Grant Readiness Check is a free, 5-minute tool from Peyi Solutions that scores how ready your organization is to apply for grants, out of 100, and gives you a prioritized gap list, the grant types that fit your profile and your next three actions. You don't need an account or an email address to see your result, and nothing you answer leaves your browser."
                crumbs={[
                    { label: "Grants", href: "/grants" },
                    { label: "Readiness Check", href: "/grants/readiness-check" }
                ]}
            />

            <section className="container mx-auto px-6 lg:px-16 py-20 md:py-24">
                <SectionHead
                    eyebrow="How the score works"
                    title="The rubric,"
                    accent="published."
                    lead="Four areas, 25 points each. No win probability — no honest tool can give you one."
                />
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {RUBRIC.map((r) => (
                        <div key={r.area} className="rounded-[1.5rem] border border-gold-soft bg-paper p-6">
                            <p className="flex items-baseline justify-between">
                                <span className="font-heading text-2xl font-bold text-ink">{r.area}</span>
                                <span className="font-heading font-bold text-coral-deep">{r.points} pts</span>
                            </p>
                            <p className="mt-3 text-[15px] text-body leading-relaxed">{r.rule}</p>
                        </div>
                    ))}
                </div>
                <ul className="mt-6 flex flex-wrap gap-3">
                    {BANDS.map((b) => (
                        <li key={b.range} className="rounded-full border border-gold-soft bg-paper px-4 py-2 text-[15px]">
                            <span className="font-heading font-bold text-ink">{b.range}</span> <span className="text-body">· {b.label}</span>
                        </li>
                    ))}
                </ul>
            </section>

            <section id="check" className="scroll-mt-24 band py-20 md:py-24">
                <div className="container mx-auto px-6 lg:px-16 max-w-4xl">
                    <ReadinessCheck />
                    <p className="mt-10 text-sm text-quiet leading-relaxed">
                        The check never asks for EIN numbers, bank details, passwords or financial statements — documents go to your Uploads folder after
                        intake, never into this tool. Grant types shown are types, not promises of specific live grants; eligibility must be confirmed against
                        each funder&apos;s current notice.
                    </p>
                    <LastUpdated className="mt-6" />
                </div>
            </section>
        </>
    );
}
