/**
 * Grants copy shared across pages, taken from the Peyi Solutions Grants content
 * brief (2026-10-26). Wording follows the brief closely on purpose — change it
 * there first, then here.
 */

export const STEPS = [
    {
        n: "01",
        name: "Org Vault",
        body: "You answer the intake questions once and upload your core documents — legal identity, financials, story, past proposals, standard attachments. Peyi builds your vault and gives you a gap list: what is missing, what is expired, and what blocks a federal submission.",
        sees: "A single, organized vault of your documents and a gap list that names each missing or expired item, why it matters, and which kinds of applications it blocks.",
        does: "Answer the intake once and upload what you already have."
    },
    {
        n: "02",
        name: "Scout",
        body: "Peyi watches Grants.gov, state, county, and city portals, and foundation and corporate programs, and scores each opportunity against your vault: eligibility, geography, amount, deadline, and effort versus expected value.",
        sees: "A ranked opportunity list, scored for fit — not a raw dump of links — with the reason each one made the list.",
        does: "Glance at the ranked list and flag anything you'd rather skip."
    },
    {
        n: "03",
        name: "Policy and fit gate",
        body: "Before any drafting, Peyi checks the funder's own rules on AI assistance and disclosure, and confirms true eligibility. If you do not qualify, or the funder's rules cannot be honored, Peyi says so — no spray-and-pray applications.",
        sees: "A recorded policy check on every application: the funder's AI-use and disclosure rules, and a clear eligibility call before any time is spent drafting.",
        does: "Confirm any eligibility detail only you can answer."
    },
    {
        n: "04",
        name: "Drafter",
        body: "Peyi builds the application from vault material only: narrative sections, budget justification, and an attachments checklist. No invented statistics, citations, outcomes, or partners.",
        sees: "Narrative sections, a budget justification and an attachments checklist, with every fact traceable to a document in your vault or a verified source.",
        does: "Nothing yet — drafting happens on Peyi's side."
    },
    {
        n: "05",
        name: "Approval room",
        body: "You get the near-final application, section by section: approve, edit, or reject. Submission happens only after your explicit sign-off. Where a portal allows it, Peyi pre-fills and you click submit.",
        sees: "The near-final application, one section at a time, with approve, edit and reject on each.",
        does: "Approve, edit or reject each section, then give explicit sign-off."
    },
    {
        n: "06",
        name: "Tracker",
        body: "Deadlines, submission confirmations, status changes, and reporting obligations live on one pipeline board. Peyi watches your grant-related email for funder messages — clarifications, additional-info requests, decisions — and escalates each one with a drafted response for your approval.",
        sees: "One pipeline board with every deadline, confirmation, status and next action — and each funder email escalated to you with a drafted reply.",
        does: "Approve replies to funders when they come in."
    }
] as const;

export const STEPS_CLOSER = "You review and approve. Peyi does the finding, drafting, chasing, and tracking.";

export const DELIVERABLES = [
    { text: "One Org Vault, built from your documents, with a gap list" },
    { text: "A ranked opportunity list, scored for fit — not a raw dump of links" },
    { text: "Draft applications built only from vault material, with facts traceable to a document or verified source" },
    { text: "A funder AI-use policy check recorded before drafting, on every application" },
    { text: "An approval queue: approve, edit, or reject, section by section" },
    { text: "A pipeline board: deadlines, statuses, confirmations, and next actions" },
    { text: "Deadline alerts and funder-email watch, with drafted replies for approval" },
    { text: "A monthly summary of what was found, drafted, submitted, and is still pending", tbc: "monthlySummary" as const }
];

export const PROBLEM =
    "Most organizations do not lose grants because they are unworthy. They lose them because no one is watching the calendar, the eligibility rules are buried in a 40-page notice, and the last application was written from memory at midnight. DIY grant software hands you a search box and stops. A human grant writer is excellent and expensive. There was no middle option that ran the whole pipeline for you. That is what this service is.";

export const COMPARISON = {
    columns: ["Done-for-you Grant Agent", "Enablement"],
    rows: [
        ["Best for", "You want the pipeline run for you", "You want to run grants in-house, with AI"],
        ["Peyi does", "Finds, drafts, tracks, escalates", "Sets up your vault, prompts, policy checks, and tracker; trains your person"],
        ["You do", "Approve, edit, and submit", "Do the applications, with Peyi as advisor"],
        ["Ongoing", "Monthly retainer", "Setup + training, then advisory as needed"]
    ]
};

export const GUARDRAILS = [
    "No percentage-of-award pricing, ever.",
    "No application submitted without your explicit approval.",
    "No invented facts, statistics, citations, outcomes, or partners.",
    "A funder AI-use policy check before drafting, on every application.",
    "Your documents stay in your vault. They are not pooled, not sold, and not used to train public tools.",
    "If you do not qualify, Peyi says so — before drafting, not after."
];

export const NOT_FOR = [
    "Anyone who wants a guaranteed award, a success-fee deal, or an application submitted without review. Peyi does not do any of those.",
    "Anyone who wants Peyi to invent outcomes, partners, statistics, or citations. Every draft fact must trace to the client's vault or a verified source."
];

export const SEGMENTS = [
    {
        id: "nonprofits",
        name: "Nonprofits",
        short: "Nonprofits with programs to fund and no grant writer on staff.",
        wrong: "The pain is staff time and scattered documents, not ideas. Applications get written from memory at the last minute because the board minutes, budget and program numbers live in five different inboxes.",
        different: "Peyi builds the vault once — mission, programs, financials, bios, past proposals — so every foundation and corporate application starts from the same verified material, and the Tracker keeps the calendar so no one has to.",
        example: "Foundation program grants and capacity-building grants from community and corporate funders."
    },
    {
        id: "small-businesses",
        name: "Small businesses",
        short: "Small businesses chasing local and county programs, small-business development funds, and tech/AI programs they actually qualify for.",
        wrong: "The pain is district-by-district windows and eligibility rules that change by program. Miami-Dade's Mom and Pop program, for example, runs per commission district, each with its own window — so a single “is it open?” answer is usually wrong.",
        different: "The Scout filters by entity type, location and size, so you only see programs you could plausibly qualify for, and it watches each district and city window separately.",
        example: "Local micro-grants, county small-business programs and small-business development programs."
    },
    {
        id: "institutions",
        name: "Schools, healthcare and municipal-adjacent organizations",
        short: "Schools, healthcare, and municipal-adjacent organizations that need a repeatable pipeline, not a single rushed proposal.",
        wrong: "One heroic proposal a year doesn't survive staff turnover. Without a shared pipeline, reviewers sign off in email threads and no one can reconstruct who approved what.",
        different: "A repeatable, auditable pipeline: multiple reviewers in the approval room, every policy check recorded, and a correspondence trail for every funder message.",
        example: "Federal agency grants through Grants.gov and multi-year foundation program grants."
    }
] as const;

export const GRANTS_PAGES = [
    { href: "/grants", label: "Overview" },
    { href: "/grants/how-it-works", label: "How it works" },
    { href: "/grants/who-its-for", label: "Who it's for" },
    { href: "/grants/done-for-you-vs-enablement", label: "Done-for-you vs. enablement" },
    { href: "/grants/pricing", label: "Pricing" },
    { href: "/grants/readiness-check", label: "Readiness Check" },
    { href: "/grants/miami-grants", label: "Miami grants" },
    { href: "/grants/faq", label: "FAQ" }
] as const;
