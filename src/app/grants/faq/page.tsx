import { GrantsHeader } from "@/components/grants/GrantsHeader";
import { GrantsActions, GrantsCTA, LastUpdated } from "@/components/grants/bits";
import { FAQ } from "@/components/sections/FAQ";
import { grantsFaqs } from "@/lib/grants/faqs";
import { grantsMeta } from "@/lib/grants/meta";

export const metadata = grantsMeta(
    "/grants/faq",
    "Grant Service FAQ: Pricing, AI Rules, Approvals & Org Vault | Peyi Solutions Grants",
    "Answers about Peyi Solutions Grants: how it differs from grant software and human grant writers, why there are no success fees, who approves submissions, and how funders' AI rules are handled."
);

export default function GrantsFaq() {
    return (
        <>
            <GrantsHeader
                title="Grants questions,"
                accent="answered first."
                lead="These are the questions people ask most about Peyi Solutions Grants — what it is, how it differs from grant software and human grant writers, what it costs and why there are no success fees, who approves submissions, and how funders' AI rules are handled. Each answer starts with the answer."
                crumbs={[
                    { label: "Grants", href: "/grants" },
                    { label: "FAQ", href: "/grants/faq" }
                ]}
            >
                <GrantsActions />
            </GrantsHeader>

            <FAQ items={grantsFaqs} title="Peyi Solutions Grants FAQ" description="Nineteen direct answers. If yours isn't here, ask it on a call."
                ask={{ body: "Ask it on a call — a straight answer is part of the service, whether or not you hire Peyi.", href: "/grants/book-a-call", label: "Book a call" }}
            />

            <div className="container mx-auto px-6 lg:px-16 pb-16">
                <LastUpdated />
            </div>

            <GrantsCTA />
        </>
    );
}
