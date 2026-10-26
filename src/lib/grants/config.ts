/**
 * Peyi Solutions Grants — every value Peyi may still change lives here, so the
 * pages never need rebuilding to swap a price, a link or a confirmed detail.
 *
 * Anything not yet confirmed is `null` or marked with `tbc`, and renders as a
 * visible "To confirm" marker (see <Tbc />) instead of an invented value.
 */

export const GRANTS_LAST_UPDATED = "2026-10-26";
export const GRANTS_LAST_UPDATED_LABEL = "October 26, 2026";

/** Links that must come from Peyi. Never invent these. */
export const GRANTS_LINKS = {
    /** The reviewed Org Vault intake form (Drive/Forms). Until it exists, the
        intake CTA opens the inquiry form with "Start my Org Vault intake" chosen. */
    intakeForm: null as string | null,
    /** Shown on the book-a-call page once confirmed. */
    contactEmail: null as string | null
};

export const INTAKE_HREF = GRANTS_LINKS.intakeForm ?? "/grants/book-a-call?intent=intake";
export const BOOK_HREF = "/grants/book-a-call";
export const READINESS_HREF = "/grants/readiness-check";

/** Turn off before launch to hide the "To confirm" markers' explanatory text. */
export const SHOW_TBC_MARKERS = true;

/* ------------------------------------------------------------------ */
/* Pricing — draft numbers published at the founder's request          */
/* (2026-10-26). Set PUBLISH_PRICES = false to switch the page to      */
/* "How pricing works" without touching any layout.                    */
/* ------------------------------------------------------------------ */

export const PUBLISH_PRICES = true;

export type Tier = {
    id: "blitz" | "core" | "pro" | "enablement";
    name: string;
    kind: string;
    forWho: string;
    price: string;
    priceAlt?: string;
    term: string;
    termTbc?: string;
    wow?: string;
    includes: string[];
    guardrail?: string;
    track: "done-for-you" | "enablement";
};

export const TIERS: Tier[] = [
    {
        id: "blitz",
        name: "Grant Blitz",
        kind: "Starter · one-time sprint, no retainer",
        forWho:
            "Solo operators, micro-businesses and early organizations — including people who didn't know grants existed for them.",
        price: "$1,495 one-time",
        priceAlt: "or $495/month for 3 months — the same total",
        term: "90-day sprint",
        wow: "Five tailored applications in 90 days, for less than one standard human-written proposal.",
        includes: [
            "Org Vault built, with a gap list",
            "Hundreds of opportunities scanned, top 25 ranked for fit",
            "First ranked list in 7 days; first draft in your approval queue in 14 days",
            "Up to 5 high-fit applications drafted, approved by you and submitted in 90 days — local, county and simple foundation programs",
            "Weekly batch approvals of about 30 minutes, so your total time stays around 2–3 hours",
            "Deadline and funder-email tracking for every submitted application until its decision, even past day 90",
            "Pipeline value and win/loss by funder type, tracked from day one"
        ],
        guardrail:
            "It's up to 5. If fewer truly fit, we don't pad the list with low-fit submissions — you get the full Opportunity Map, a second Scout sweep at day 60, and any unused draft capacity becomes credit toward Core.",
        track: "done-for-you"
    },
    {
        id: "core",
        name: "Core",
        kind: "Standard done-for-you retainer",
        forWho: "Nonprofits and small businesses that want the whole pipeline run for them.",
        price: "$1,500 setup + $1,250–$1,750/month",
        term: "6-month initial term, then month-to-month",
        includes: [
            "Org Vault build, plus a continuous Scout across local, county, state and foundation programs",
            "Up to 2 applications per month",
            "Tracker and funder-email watch, with drafted replies for your approval"
        ],
        track: "done-for-you"
    },
    {
        id: "pro",
        name: "Pro",
        kind: "Mature organizations · the consultant alternative",
        forWho:
            "Larger nonprofits, university departments, or any organization with federal ambition, several programs or several approvers.",
        price: "$2,500–$3,500 setup + $2,500–$4,500/month",
        term: "6-month initial term, then month-to-month",
        termTbc: "whether federal Pro engagements start at 12 months",
        includes: [
            "Everything in Core, plus federal applications",
            "3–4 applications per month across a multi-program pipeline",
            "Compliance and reporting support"
        ],
        track: "done-for-you"
    },
    {
        id: "enablement",
        name: "Enablement",
        kind: "Separate track · you run grants in-house",
        forWho: "Organizations with a person who will own grant work and wants their own AI setup.",
        price: "$3,500–$7,500 setup + training",
        priceAlt: "or consulting at $200/hour",
        term: "Setup and training, then advisory as needed",
        includes: [
            "Your own vault, Scout prompts, policy-gate checklist and tracker, configured for you",
            "Training for the person who will run it",
            "Peyi stays on as advisor; if you stop keeping up, your vault carries over to done-for-you"
        ],
        track: "enablement"
    }
];

/** Human grant-writer price anchors, from the two guides the founder approved. */
export const WRITER_COST_SOURCES = [
    { label: "Allied Grant Writers, “Grant writer cost” guide", href: "https://www.alliedgrantwriters.com/grant-writer-cost/" },
    { label: "Grantboost, “Grant writing fees” guide", href: "https://www.grantboost.io/blog/grant-writing-fees/" }
];
export const WRITER_COST_NOTE =
    "A standard program proposal written by a human grant writer typically costs $2,500–$6,000 (Allied Grant Writers; Grantboost, accessed October 2026).";

/** Items Peyi still has to confirm, rendered as markers where they appear. */
export const TBC = {
    monthlySummary: "monthly summary format and frequency",
    replySla: "exact reply turnaround in business days",
    hourEstimates: "hour ranges, set from Peyi's own measured applications",
    onboarding: "onboarding timeline, once the in-house build is measured",
    outsideArea: "whether other Florida organizations are accepted, waitlisted or referred",
    postAward: "post-award reporting in later versions",
    vaultSections: "Org Vault section names 02–06",
    proTerm: "whether federal Pro engagements start at 12 months"
} as const;
