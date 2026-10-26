/**
 * Grant Readiness Check — questions, the published rubric, and the scoring.
 *
 * Pure functions only: the check runs entirely in the visitor's browser and
 * nothing here is sent anywhere. The rubric below is printed on the page, so
 * what the page says and what the code does can never drift apart.
 *
 * Guardrails (brief §5.5): no win probability, never "you are eligible", no
 * EIN / bank / password fields, and no email needed to see the result.
 */

export type Opt = { value: string; label: string };

export type Question = {
    id: keyof Answers;
    label: string;
    hint?: string;
    multi?: boolean;
    options: Opt[];
    /** Only asked when this returns true (e.g. nonprofit-only documents). */
    when?: (a: Answers) => boolean;
};

export type Answers = {
    orgType?: string;
    location?: string;
    years?: string;
    employees?: string;
    revenue?: string;
    sam?: string;
    sunbiz?: string;
    docs?: string[];
    categories?: string[];
    awardSize?: string;
    hours?: string;
    deadline?: string;
    approver?: string;
    inbox?: string;
};

const isNonprofitLike = (a: Answers) => a.orgType === "nonprofit";

export const QUESTIONS: Question[] = [
    {
        id: "orgType",
        label: "What kind of organization are you?",
        options: [
            { value: "nonprofit", label: "Nonprofit" },
            { value: "business", label: "For-profit small business" },
            { value: "school", label: "School" },
            { value: "healthcare", label: "Healthcare" },
            { value: "municipal", label: "Municipal-adjacent" },
            { value: "other", label: "Other" }
        ]
    },
    {
        id: "location",
        label: "Where are you based?",
        options: [
            { value: "miami-dade", label: "Miami-Dade" },
            { value: "broward", label: "Broward" },
            { value: "florida", label: "Elsewhere in Florida" },
            { value: "us", label: "Elsewhere in the US" }
        ]
    },
    {
        id: "years",
        label: "How long have you been operating?",
        options: [
            { value: "lt1", label: "Under 1 year" },
            { value: "1-2", label: "1–2 years" },
            { value: "3-5", label: "3–5 years" },
            { value: "5plus", label: "5+ years" }
        ]
    },
    {
        id: "employees",
        label: "How many employees (full-time equivalent)?",
        options: [
            { value: "0", label: "0" },
            { value: "1-7", label: "1–7" },
            { value: "8-20", label: "8–20" },
            { value: "21plus", label: "21+" }
        ]
    },
    {
        id: "revenue",
        label: "Annual revenue range",
        options: [
            { value: "lt100k", label: "Under $100k" },
            { value: "100-500k", label: "$100k–$500k" },
            { value: "500k-1m", label: "$500k–$1M" },
            { value: "gt1m", label: "Over $1M" },
            { value: "na", label: "Prefer not to say" }
        ]
    },
    {
        id: "sam",
        label: "SAM.gov / UEI status",
        hint: "Needed for federal applications.",
        options: [
            { value: "active", label: "Active" },
            { value: "expired", label: "Expired" },
            { value: "never", label: "Never registered" },
            { value: "unsure", label: "Not sure" }
        ]
    },
    {
        id: "sunbiz",
        label: "Sunbiz / state registration",
        options: [
            { value: "active", label: "Active" },
            { value: "unsure", label: "Not sure" },
            { value: "none", label: "Not registered" }
        ]
    },
    {
        id: "docs",
        label: "Which of these do you have ready?",
        hint: "Tick all that apply. Don't upload anything here — this just builds your checklist.",
        multi: true,
        options: [
            { value: "ein", label: "EIN letter" },
            { value: "btr", label: "Current business tax receipts" },
            { value: "financials", label: "Tax return or financials from the last 18 months" },
            { value: "capability", label: "Capability statement or past proposals" },
            { value: "bios", label: "Leadership bios" },
            { value: "logo", label: "Logo and photos" },
            { value: "irs", label: "IRS 501(c)(3) determination letter" }
        ]
    },
    {
        id: "categories",
        label: "What do you want funding for?",
        multi: true,
        options: [
            { value: "operations", label: "Operations" },
            { value: "equipment", label: "Equipment" },
            { value: "program", label: "A specific program" },
            { value: "research", label: "Research or tech" },
            { value: "hiring", label: "Hiring or training" },
            { value: "other", label: "Other" }
        ]
    },
    {
        id: "awardSize",
        label: "What award size is worth pursuing?",
        options: [
            { value: "lt5k", label: "Under $5k" },
            { value: "5-25k", label: "$5k–$25k" },
            { value: "25-100k", label: "$25k–$100k" },
            { value: "gt100k", label: "Over $100k" }
        ]
    },
    {
        id: "hours",
        label: "Hours your team can give grant work each month",
        options: [
            { value: "lt2", label: "Under 2" },
            { value: "2-5", label: "2–5" },
            { value: "5-10", label: "5–10" },
            { value: "10plus", label: "10+" }
        ]
    },
    {
        id: "deadline",
        label: "Next deadline pressure",
        options: [
            { value: "none", label: "None yet" },
            { value: "30", label: "Within 30 days" },
            { value: "90", label: "Within 90 days" },
            { value: "exploring", label: "Just exploring" }
        ]
    },
    {
        id: "approver",
        label: "Is one person named to approve applications before they go out?",
        options: [
            { value: "yes", label: "Yes" },
            { value: "no", label: "Not yet" }
        ]
    },
    {
        id: "inbox",
        label: "Do you know which inbox funder emails will go to?",
        options: [
            { value: "yes", label: "Yes" },
            { value: "no", label: "Not yet" }
        ]
    }
];

/** The first four questions, used by the short embed on /grants and /grants/who-its-for. */
export const SHORT_IDS: (keyof Answers)[] = ["orgType", "location", "years", "employees"];

export function visibleOptions(q: Question, a: Answers): Opt[] {
    if (q.id === "docs" && !isNonprofitLike(a)) {
        return q.options.filter((o) => o.value !== "irs");
    }
    return q.options;
}

/* ------------------------------------------------------------------ */
/* Rubric — 25 points per area. Printed verbatim on the page.          */
/* ------------------------------------------------------------------ */

export const RUBRIC = [
    {
        area: "Identity",
        points: 25,
        rule: "Legal identity, registration and SAM/UEI status. A missing SAM/UEI doesn't zero the score — it flags federal applications as blocked until registration is fixed."
    },
    {
        area: "Financials",
        points: 25,
        rule: "Current financials, tax return and business tax receipts, plus operating history. Financials older than 18 months don't count and are flagged for refresh."
    },
    {
        area: "Narrative",
        points: 25,
        rule: "Story and programs, proof points, bios and past proposals. A missing capability statement is a gap, not a failure — Peyi can draft one from your story for your approval."
    },
    {
        area: "Operations",
        points: 25,
        rule: "A named approver, a known inbox for funder mail, the hours you can give, and how close your next deadline is."
    }
] as const;

export const VAULT_SECTIONS = [
    "01 Legal Identity",
    "02 Registrations & Certifications",
    "03 Financials",
    "04 Story & Programs",
    "05 People & Bios",
    "06 Past Proposals & Attachments",
    "07 Operations & Approvals"
] as const;

export type Blocks = "Local" | "County" | "State" | "Federal" | "Foundation";

export type Gap = {
    section: (typeof VAULT_SECTIONS)[number];
    missing: string;
    why: string;
    blocks: Blocks[] | "All" | "None — but it slows things down";
    firstStep: string;
    priority: 1 | 2 | 3 | 4;
};

export type SubScore = { area: string; score: number; max: 25; note: string };

export type GrantType = { name: string; why: string; watch: string };

export type Result = {
    total: number;
    band: { label: string; copy: string; tone: "ready" | "nearly" | "build" };
    subs: SubScore[];
    gaps: Gap[];
    federalBlocked: boolean;
    types: GrantType[];
    actions: string[];
    deadlineNote?: string;
};

const has = (a: Answers, doc: string) => (a.docs ?? []).includes(doc);
const pick = (v: string | undefined, table: Record<string, number>) => (v && v in table ? table[v] : 0);
const cap = (n: number) => Math.max(0, Math.min(25, Math.round(n)));

export function score(a: Answers): Result {
    const nonprofit = isNonprofitLike(a);

    /* Identity */
    const identity = nonprofit
        ? pick(a.sunbiz, { active: 8, unsure: 3 }) +
          (has(a, "ein") ? 6 : 0) +
          (has(a, "irs") ? 5 : 0) +
          pick(a.sam, { active: 6, expired: 2 })
        : pick(a.sunbiz, { active: 10, unsure: 4 }) + (has(a, "ein") ? 8 : 0) + pick(a.sam, { active: 7, expired: 3 });

    /* Financials */
    const financials =
        (has(a, "financials") ? 12 : 0) +
        (has(a, "btr") ? 8 : 0) +
        pick(a.years, { "1-2": 3, "3-5": 5, "5plus": 5 });

    /* Narrative */
    const narrative =
        (has(a, "capability") ? 10 : 0) +
        (has(a, "bios") ? 8 : 0) +
        (has(a, "logo") ? 4 : 0) +
        ((a.categories ?? []).length > 0 ? 3 : 0);

    /* Operations */
    const operations =
        pick(a.hours, { lt2: 2, "2-5": 6, "5-10": 9, "10plus": 10 }) +
        pick(a.deadline, { none: 5, exploring: 5, "90": 4, "30": 1 }) +
        (a.approver === "yes" ? 5 : 0) +
        (a.inbox === "yes" ? 5 : 0);

    const subsRaw = [
        ["Identity", cap(identity)],
        ["Financials", cap(financials)],
        ["Narrative", cap(narrative)],
        ["Operations", cap(operations)]
    ] as const;

    const NOTES: Record<string, [string, string, string]> = {
        Identity: [
            "Your legal identity and registrations are in order.",
            "Most of your identity is in place; one registration needs attention.",
            "Registration gaps here stop applications before anyone reads them."
        ],
        Financials: [
            "Your financial documents are current enough to submit.",
            "Some financial documents are missing or need a refresh.",
            "Without current financials, most funders can't review you."
        ],
        Narrative: [
            "You have the material Peyi drafts from — story, people and proof.",
            "The story is there; a few supporting pieces are missing.",
            "Drafting now would mean writing from memory. The vault fixes that."
        ],
        Operations: [
            "Approvals, inbox and time are accounted for.",
            "Your process mostly works; the operations gaps below close the rest.",
            "No one owns approvals or replies yet — that's where deadlines slip."
        ]
    };

    const subs: SubScore[] = subsRaw.map(([area, s]) => ({
        area,
        score: s,
        max: 25,
        note: NOTES[area][s >= 19 ? 0 : s >= 12 ? 1 : 2]
    }));

    const total = subs.reduce((n, s) => n + s.score, 0);

    const band =
        total >= 75
            ? { label: "Ready to apply", tone: "ready" as const, copy: "Your vault is in good shape. The next step is a ranked opportunity list, not more paperwork." }
            : total >= 50
              ? { label: "Nearly ready", tone: "nearly" as const, copy: "You have the core of a vault. Close the gaps below first — they are the ones that usually stall an application." }
              : { label: "Build the vault first", tone: "build" as const, copy: "Applying now would mean writing from memory and chasing documents under deadline. Build the vault, then apply. That order saves more time than it costs." };

    /* Gaps, mapped to the Org Vault */
    const gaps: Gap[] = [];
    if (!has(a, "ein"))
        gaps.push({
            section: "01 Legal Identity",
            missing: "EIN letter",
            why: "It's the document most applications ask for first to prove who you are.",
            blocks: "All",
            firstStep: "Find your IRS EIN confirmation letter (CP 575 or 147C) and add it to your Uploads folder.",
            priority: 1
        });
    if (a.sunbiz !== "active")
        gaps.push({
            section: "01 Legal Identity",
            missing: a.sunbiz === "none" ? "Florida state registration (Sunbiz)" : "Confirmed active Sunbiz status",
            why: "Local, county and state programs usually check your registration first — an inactive status ends the application.",
            blocks: ["Local", "County", "State", "Foundation"],
            firstStep: "Look up your entity on Sunbiz and confirm it shows as active.",
            priority: 1
        });
    if (nonprofit && !has(a, "irs"))
        gaps.push({
            section: "01 Legal Identity",
            missing: "IRS 501(c)(3) determination letter",
            why: "Most foundation and nonprofit programs require proof of tax-exempt status.",
            blocks: ["Foundation", "Federal"],
            firstStep: "Locate your IRS determination letter, or request a copy from the IRS.",
            priority: 1
        });
    if (!has(a, "financials"))
        gaps.push({
            section: "03 Financials",
            missing: "Tax return or financials from the last 18 months",
            why: "Funders use them to judge whether you can manage the award. Older than 18 months counts as missing.",
            blocks: ["County", "State", "Federal", "Foundation"],
            firstStep: "Export your most recent tax return or profit-and-loss statement.",
            priority: 1
        });
    if (a.approver !== "yes")
        gaps.push({
            section: "07 Operations & Approvals",
            missing: "A named approver",
            why: "Nothing is submitted without one person's explicit sign-off — so someone has to own it.",
            blocks: "All",
            firstStep: "Decide who will approve applications, section by section.",
            priority: 2
        });
    if (a.sam !== "active")
        gaps.push({
            section: "02 Registrations & Certifications",
            missing: a.sam === "expired" ? "SAM.gov registration renewal" : "SAM.gov registration and UEI",
            why: "Federal applications can't be submitted without an active registration, and it can take weeks to process.",
            blocks: ["Federal"],
            firstStep: a.sam === "expired" ? "Renew your registration at SAM.gov." : "Confirm your SAM.gov status, and start registration if you have none.",
            priority: 2
        });
    if (!has(a, "btr"))
        gaps.push({
            section: "02 Registrations & Certifications",
            missing: "Current business tax receipts",
            why: "City and county programs commonly require current local business tax receipts for the address you apply from.",
            blocks: ["Local", "County"],
            firstStep: "Download your current city and county business tax receipts.",
            priority: 2
        });
    if (!has(a, "capability"))
        gaps.push({
            section: "06 Past Proposals & Attachments",
            missing: "Capability statement or past proposals",
            why: "This is a gap, not a failure — Peyi can draft a capability statement from your story for your approval.",
            blocks: "None — but it slows things down",
            firstStep: "Gather any proposal, pitch deck or one-pager you've written before.",
            priority: 3
        });
    if (!has(a, "bios"))
        gaps.push({
            section: "05 People & Bios",
            missing: "Leadership bios",
            why: "Foundation and federal narratives ask who will run the work.",
            blocks: ["Foundation", "Federal"],
            firstStep: "Write a short bio for each person who leads the work.",
            priority: 3
        });
    if (a.inbox !== "yes")
        gaps.push({
            section: "07 Operations & Approvals",
            missing: "One inbox for funder mail",
            why: "Clarification requests often come with short reply windows — they can't land in a spam folder.",
            blocks: "None — but it slows things down",
            firstStep: "Pick one address for grant correspondence and use it on every application.",
            priority: 3
        });
    if (a.hours === "lt2")
        gaps.push({
            section: "07 Operations & Approvals",
            missing: "Time for review",
            why: "Under 2 hours a month leaves no room to review drafts. Done-for-you keeps your part to review minutes.",
            blocks: "None — but it slows things down",
            firstStep: "Block a recurring 30-minute slot for approvals.",
            priority: 3
        });
    if (!has(a, "logo"))
        gaps.push({
            section: "06 Past Proposals & Attachments",
            missing: "Logo and photos",
            why: "Some local programs and most foundation reports ask for them.",
            blocks: "None — but it slows things down",
            firstStep: "Put your logo and a few photos of your work in one folder.",
            priority: 4
        });
    gaps.sort((x, y) => x.priority - y.priority);

    const federalBlocked = a.sam !== "active";

    /* Grant types that fit — types only, never a promise of a live grant */
    const types: GrantType[] = [];
    const local = a.location === "miami-dade" || a.location === "broward";
    const inFlorida = local || a.location === "florida";
    const business = a.orgType === "business";
    const mission = ["nonprofit", "school", "healthcare", "municipal"].includes(a.orgType ?? "");

    if (business && local)
        types.push({
            name: "Local micro-grants",
            why: "City and commission-district programs aimed at small businesses with a physical location in the area.",
            watch: "Windows open district by district, and many are reimbursement-based — expenses must fall in the program's window."
        });
    if (business && local)
        types.push({
            name: "County small-business programs",
            why: "Miami-Dade and Broward run programs for small businesses in the county.",
            watch: "Location, active Sunbiz status, current business tax receipts and size limits are the usual blockers."
        });
    if (inFlorida)
        types.push({
            name: "State of Florida programs",
            why: "Statewide programs for Florida organizations, often targeted by industry or purpose.",
            watch: "Read eligibility closely — state programs are often narrower than their titles suggest."
        });
    if (business && (a.categories ?? []).includes("research"))
        types.push({
            name: "Federal small-business research and tech programs (SBIR/STTR)",
            why: "Federal programs that fund research and development at U.S. small businesses.",
            watch: "Requires an active SAM.gov registration, and complex federal applications are outside the Grant Blitz."
        });
    if (mission)
        types.push({
            name: "Foundation program and capacity grants",
            why: "Community, family and corporate foundations that fund programs and organizational capacity.",
            watch: "Fit with the foundation's stated priorities matters more than the size of the request."
        });
    if (a.orgType === "nonprofit" || a.orgType === "school")
        types.push({
            name: "Corporate giving programs",
            why: "Company-run giving and sponsorship programs, often tied to where their staff live and work.",
            watch: "Many have rolling deadlines and short applications — easy to miss without a tracker."
        });
    if (mission)
        types.push({
            name: "Federal grants via Grants.gov",
            why: "Federal agency programs for nonprofits, schools, healthcare and public-serving organizations.",
            watch: "Requires an active SAM.gov registration; decisions commonly take 6–12 months."
        });
    if (types.length === 0)
        types.push({
            name: "Foundation and local programs",
            why: "Your answers don't narrow the field yet — a Scout run against your vault will.",
            watch: "Tell us more on the intake form so the Scout can filter by entity type and geography."
        });

    /* Next 3 actions */
    const actions = gaps.slice(0, 2).map((g) => g.firstStep);
    actions.push("Answer the intake form so Scout can rank real opportunities.");
    while (actions.length < 3) actions.unshift("Gather your current documents in one Uploads folder.");

    const deadlineNote =
        a.deadline === "30" && total < 75
            ? "Your next deadline is inside 30 days and the vault has open gaps. Close the blockers above first; if they can't close in time, it's usually better to aim for the next cycle than to submit an incomplete application."
            : undefined;

    return { total, band, subs, gaps, federalBlocked, types, actions: actions.slice(0, 3), deadlineNote };
}

export function isComplete(a: Answers): boolean {
    return QUESTIONS.every((q) => (q.multi ? true : Boolean(a[q.id])));
}

/** Plain-text checklist for printing or saving. */
export function checklistText(r: Result): string {
    const lines = [
        "Peyi Solutions — Grant Readiness Checklist",
        `Readiness score: ${r.total}/100 — ${r.band.label}`,
        ...r.subs.map((s) => `  ${s.area}: ${s.score}/25 — ${s.note}`),
        "",
        "Gaps, in priority order:",
        ...r.gaps.map(
            (g, i) =>
                `${i + 1}. [${g.section}] ${g.missing}\n   Why: ${g.why}\n   Blocks: ${Array.isArray(g.blocks) ? g.blocks.join(", ") : g.blocks}\n   First step: ${g.firstStep}`
        ),
        "",
        "Next 3 actions:",
        ...r.actions.map((a, i) => `${i + 1}. ${a}`),
        "",
        "Grant types that fit your profile (eligibility must be confirmed against each funder's current notice):",
        ...r.types.map((t) => `- ${t.name}: ${t.why}`),
        "",
        "Live matches and current deadlines require a Scout run against your vault.",
        "https://www.peyiai.com/grants"
    ];
    return lines.join("\n");
}
