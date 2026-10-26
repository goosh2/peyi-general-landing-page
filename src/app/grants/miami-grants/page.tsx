import { AlertTriangle, ExternalLink, FileCheck2, MapPin } from "lucide-react";
import { GrantsHeader } from "@/components/grants/GrantsHeader";
import { GrantsActions, GrantsCTA, LastUpdated, SectionHead } from "@/components/grants/bits";
import { grantsMeta } from "@/lib/grants/meta";

export const metadata = grantsMeta(
    "/grants/miami-grants",
    "Miami Grants for Small Businesses and Nonprofits: Miami-Dade & Broward Program Types",
    "Why grant hunting in Miami-Dade and Broward is hard, and the program types local small businesses and nonprofits pursue — county, city, state, federal and foundation — with what usually blocks an application and what to have ready."
);

/** Date the funder links below were last opened and confirmed to resolve. */
const LINKS_CHECKED = "October 26, 2026";

const HARD = [
    {
        title: "County programs run district by district",
        body: "Miami-Dade's Mom and Pop Small Business Grant Program is run separately in each county commission district, each with its own window and rules — so a single “is it open?” answer is usually wrong."
    },
    {
        title: "City programs have their own rules",
        body: "City programs come with their own business-tax-receipt and location rules, and they appear and disappear with each year's funding."
    },
    {
        title: "Micro-grants are often reimbursements",
        body: "Many micro-grants reimburse expenses after the fact — they only work if the expense was paid inside the program's window, with receipts to prove it."
    }
];

type Program = {
    type: string;
    forWho: string;
    blocks: string;
    ready: string;
    links: { label: string; href: string }[];
};

const PROGRAMS: Program[] = [
    {
        type: "Miami-Dade County small-business programs",
        forWho:
            "Small businesses located in Miami-Dade County. The Mom and Pop Small Business Grant Program is offered by each county commission district — you apply in the district where your business is located.",
        blocks: "Location outside the district, inactive Sunbiz status, missing or out-of-date business tax receipts, and the program's limits on time in business, employees or revenue.",
        ready: "Proof of address in the district, active Sunbiz record, current county and city business tax receipts, recent tax return, and the district's own application.",
        links: [
            { label: "Miami-Dade Board of County Commissioners (find your district)", href: "https://www.miamidade.gov/global/government/commission/home.page" }
        ]
    },
    {
        type: "Broward County small-business micro-grants",
        forWho: "Small businesses located in Broward County, through the county's Office of Economic and Small Business Development.",
        blocks: "Location, funding running out (programs can move to a waitlist), prior-year awards, and expenses that aren't on the program's eligible list.",
        ready: "Active Sunbiz record, current business tax receipts, recent financials, and receipts for the expenses you'd ask to have covered.",
        links: [{ label: "Broward County Small Business Micro-Grant", href: "https://www.broward.org/econdev/SmallBusiness/SmallBusinessMicroGrant" }]
    },
    {
        type: "City small-business programs",
        forWho:
            "Businesses inside a specific city's limits. Cities such as Tamarac have run small-business grants before; whether one is open depends on that year's funding, so check the city's economic development office.",
        blocks: "Address outside city limits, no city business tax receipt, owner-income or employee-count caps, and reimbursement windows.",
        ready: "City business tax receipt, proof of address, recent financials and receipts.",
        links: [{ label: "City of Tamarac Economic Development", href: "https://www.tamarac.org/667/Economic-Development" }]
    },
    {
        type: "State of Florida programs",
        forWho: "Florida businesses and organizations. State programs are often targeted by industry or purpose, so they're narrower than their titles suggest.",
        blocks: "Industry or purpose restrictions, inactive state registration, and matching or job-creation requirements.",
        ready: "Active Sunbiz record, financials, and a clear description of the project and who it serves.",
        links: [
            { label: "FloridaCommerce", href: "https://www.floridajobs.org/" },
            { label: "Florida SBDC Network (free business help)", href: "https://floridasbdc.org/" }
        ]
    },
    {
        type: "Federal small-business and tech programs",
        forWho:
            "U.S. small businesses doing research and development (SBIR/STTR), and organizations applying to federal agency programs posted on Grants.gov — including forecasted opportunities, which give a head start before they open.",
        blocks: "No active SAM.gov registration and UEI (it can take weeks), size standards, and the complexity of federal applications.",
        ready: "Active SAM.gov registration and UEI, EIN, financials, capability statement and leadership bios.",
        links: [
            { label: "Grants.gov", href: "https://www.grants.gov/" },
            { label: "SBIR.gov", href: "https://www.sbir.gov/" },
            { label: "SAM.gov registration", href: "https://sam.gov/" }
        ]
    },
    {
        type: "Nonprofit grants from local foundations",
        forWho: "Miami-Dade and Broward nonprofits, through community foundations and corporate giving programs that fund programs and capacity.",
        blocks: "No IRS 501(c)(3) determination letter, a program that doesn't match the foundation's stated priorities, and scattered documents.",
        ready: "IRS determination letter, board list, current budget and financials, program description and outcomes you can document.",
        links: [
            { label: "The Miami Foundation", href: "https://www.miamifoundation.org/" },
            { label: "Community Foundation of Broward", href: "https://www.cfbroward.org/" }
        ]
    }
];

export default function MiamiGrants() {
    return (
        <>
            <GrantsHeader
                title="Miami grants for small businesses"
                accent="and nonprofits."
                lead="Grants in Miami-Dade and Broward come from county commission districts, cities, the State of Florida, federal agencies and local foundations — each with its own windows and rules. This page explains why that's hard to track, the program types local organizations pursue, what usually blocks an application, and what to have ready. Peyi Solutions Grants watches these sources for clients; it is not a funder and isn't affiliated with any of them."
                crumbs={[
                    { label: "Grants", href: "/grants" },
                    { label: "Miami grants", href: "/grants/miami-grants" }
                ]}
            />

            <section className="container mx-auto px-6 lg:px-16 py-20 md:py-24">
                <SectionHead eyebrow="Why it's hard" title="Miami grant hunting," accent="explained." />
                <div className="grid gap-5 md:grid-cols-3">
                    {HARD.map((h) => (
                        <div key={h.title} className="rounded-[1.5rem] border border-gold-soft bg-paper p-7">
                            <h3 className="font-heading text-2xl font-bold text-ink">{h.title}</h3>
                            <p className="mt-3 text-body leading-relaxed">{h.body}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="band py-20 md:py-24">
                <div className="container mx-auto px-6 lg:px-16">
                    <SectionHead
                        eyebrow="Program types"
                        title="What's out there —"
                        accent="by type, not by promise."
                        lead="These are program types with notes on who they're usually for. None is presented as open: always check eligibility and the current deadline on the funder's own page."
                    />
                    <p className="mb-8 flex gap-3 rounded-2xl border border-dashed border-gold bg-paper/80 p-4 text-[15px] text-body">
                        <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-gold-deep" />
                        <span>
                            <span className="tbc mr-2">To confirm</span>
                            Every entry below must be re-verified against the funder&apos;s own notice before this page is published. Links were last checked{" "}
                            {LINKS_CHECKED}.
                        </span>
                    </p>
                    <div className="grid gap-5 lg:grid-cols-2">
                        {PROGRAMS.map((p) => (
                            <article key={p.type} className="flex flex-col rounded-[1.75rem] border border-gold-soft bg-paper p-7 md:p-8">
                                <h3 className="font-heading text-2xl font-bold text-ink">{p.type}</h3>
                                <dl className="mt-4 space-y-4 text-[15px] leading-relaxed">
                                    <div>
                                        <dt className="font-label text-[10px] text-gold-deep">Usually for</dt>
                                        <dd className="mt-1 text-body">{p.forWho}</dd>
                                    </div>
                                    <div>
                                        <dt className="font-label text-[10px] text-gold-deep">What usually blocks an application</dt>
                                        <dd className="mt-1 text-body">{p.blocks}</dd>
                                    </div>
                                    <div>
                                        <dt className="flex items-center gap-1.5 font-label text-[10px] text-gold-deep">
                                            <FileCheck2 className="h-3.5 w-3.5" /> Have ready
                                        </dt>
                                        <dd className="mt-1 text-body">{p.ready}</dd>
                                    </div>
                                </dl>
                                <div className="mt-auto pt-6">
                                    <ul className="flex flex-wrap gap-2">
                                        {p.links.map((l) => (
                                            <li key={l.href}>
                                                <a
                                                    href={l.href}
                                                    target="_blank"
                                                    rel="noopener"
                                                    className="inline-flex items-center gap-1.5 rounded-full border border-gold-soft bg-cream px-3.5 py-1.5 text-sm text-ink hover:border-gold"
                                                >
                                                    {l.label} <ExternalLink className="h-3.5 w-3.5 text-quiet" />
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                    <p className="mt-3 text-xs text-quiet">
                                        Last checked {LINKS_CHECKED} · Check eligibility and the current deadline on the funder&apos;s page.
                                    </p>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section className="container mx-auto px-6 lg:px-16 py-20 md:py-24">
                <div className="flex flex-col lg:flex-row gap-8 lg:items-center justify-between rounded-[2rem] border border-gold/60 bg-paper p-8 md:p-12">
                    <div className="max-w-2xl">
                        <p className="flex items-center gap-2 font-label text-[11px] text-gold-deep">
                            <MapPin className="h-4 w-4" /> Service area
                        </p>
                        <h2 className="mt-3 font-heading text-3xl md:text-4xl font-bold text-ink">Built for Miami-Dade and Broward first.</h2>
                        <p className="mt-3 text-lg text-body leading-relaxed">
                            Peyi Solutions Grants is built for Miami-Dade and Broward organizations, where Peyi knows the local programs and district rules. Start
                            with the Readiness Check to see which program types fit you.
                        </p>
                    </div>
                    <GrantsActions />
                </div>
                <LastUpdated className="mt-10" />
            </section>

            <GrantsCTA />
        </>
    );
}
