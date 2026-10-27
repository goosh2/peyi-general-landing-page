import { GrantsHeader } from "@/components/grants/GrantsHeader";
import { LastUpdated } from "@/components/grants/bits";
import { ReadinessCheck } from "@/components/grants/ReadinessCheck";
import { grantsMeta } from "@/lib/grants/meta";

export const metadata = grantsMeta(
    "/grants/readiness-check",
    "Grant Readiness Check: Free 5-Minute Score and Gap List | Peyi Solutions Grants",
    "The Grant Readiness Check scores how ready your organization is to apply for grants, out of 100, and gives you a prioritized gap list, grant types that fit and your next three actions. No email or account needed."
);

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
