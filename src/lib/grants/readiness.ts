/**
 * Grant Readiness Check — questions, the published rubric, and the scoring.
 *
 * Pure functions only: the check runs entirely in the visitor's browser and
 * nothing here is sent anywhere.
 *
 * Guardrails (brief §5.5): no win probability, never "you are eligible", no
 * EIN / bank / password fields, and no email needed to see the result.
 */

export type Opt = { value: string; label: string | ((a: Answers) => string) };

export type Question = {
    id: keyof Answers | "location";
    label: string | ((a: Answers) => string);
    hint?: string;
    multi?: boolean;
    options: Opt[];
    /** "location" renders the country / state / city block instead of pills. */
    kind?: "location";
    /** Only asked when this returns true (e.g. US-only registrations). */
    when?: (a: Answers) => boolean;
};

export type Answers = {
    orgType?: string;
    country?: string;
    countryOther?: string;
    usState?: string;
    region?: string;
    city?: string;
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

/* ------------------------------------------------------------------ */
/* Location: US by default, any country possible, no Florida assumed   */
/* ------------------------------------------------------------------ */

export const COUNTRIES = [
    { value: "US", label: "United States" },
    { value: "CO", label: "Colombia" },
    { value: "CA", label: "Canada" },
    { value: "MX", label: "Mexico" },
    { value: "GB", label: "United Kingdom" },
    { value: "other", label: "Other country" }
] as const;

export const US_STATES = [
    ["AL", "Alabama"], ["AK", "Alaska"], ["AZ", "Arizona"], ["AR", "Arkansas"], ["CA", "California"], ["CO", "Colorado"],
    ["CT", "Connecticut"], ["DE", "Delaware"], ["DC", "District of Columbia"], ["FL", "Florida"], ["GA", "Georgia"],
    ["HI", "Hawaii"], ["ID", "Idaho"], ["IL", "Illinois"], ["IN", "Indiana"], ["IA", "Iowa"], ["KS", "Kansas"],
    ["KY", "Kentucky"], ["LA", "Louisiana"], ["ME", "Maine"], ["MD", "Maryland"], ["MA", "Massachusetts"],
    ["MI", "Michigan"], ["MN", "Minnesota"], ["MS", "Mississippi"], ["MO", "Missouri"], ["MT", "Montana"],
    ["NE", "Nebraska"], ["NV", "Nevada"], ["NH", "New Hampshire"], ["NJ", "New Jersey"], ["NM", "New Mexico"],
    ["NY", "New York"], ["NC", "North Carolina"], ["ND", "North Dakota"], ["OH", "Ohio"], ["OK", "Oklahoma"],
    ["OR", "Oregon"], ["PA", "Pennsylvania"], ["RI", "Rhode Island"], ["SC", "South Carolina"], ["SD", "South Dakota"],
    ["TN", "Tennessee"], ["TX", "Texas"], ["UT", "Utah"], ["VT", "Vermont"], ["VA", "Virginia"], ["WA", "Washington"],
    ["WV", "West Virginia"], ["WI", "Wisconsin"], ["WY", "Wyoming"]
].map(([value, label]) => ({ value, label }));

const SOUTH_FLORIDA = /miami|dade|broward|lauderdale|hialeah|doral|homestead|coral gables|hollywood|pembroke|tamarac|sunrise|plantation|davie|weston|miramar|pompano|coral springs|deerfield/i;

export function placeOf(a: Answers) {
    const country = a.country ?? "US";
    const isUS = country === "US";
    const stateName = isUS ? US_STATES.find((s) => s.value === a.usState)?.label : undefined;
    const countryName =
        country === "other" ? a.countryOther?.trim() || "your country" : (COUNTRIES.find((c) => c.value === country)?.label ?? "your country");
    const city = a.city?.trim() ?? "";
    const florida = isUS && a.usState === "FL";
    return {
        country,
        isUS,
        stateName,
        countryName,
        city,
        /** Where programs are: the city they typed, else a plain "your area". */
        place: city || "your area",
        /** Their own state, or for international respondents their region, else country. */
        region: isUS ? (stateName ?? "your state") : a.region?.trim() || countryName,
        florida,
        /** Florida respondents in Miami-Dade or Broward keep the original local wording. */
        southFlorida: florida && SOUTH_FLORIDA.test(city)
    };
}

/** The business registry to name in the state-registration gap, by jurisdiction. */
export function registryOf(a: Answers) {
    const p = placeOf(a);
    if (p.florida)
        return { short: "Sunbiz", via: "Sunbiz (Florida Division of Corporations)", title: "Confirm active Sunbiz status", gate: "Sunbiz status" };
    if (p.isUS) {
        const code = a.usState;
        if (code === "GA")
            return { short: "Georgia Secretary of State", via: "the Georgia Secretary of State, Corporations Division", title: "Confirm active Georgia Secretary of State status", gate: "Georgia Secretary of State registration" };
        if (code === "DC")
            return { short: "DC DLCP", via: "the DC Department of Licensing and Consumer Protection (DLCP)", title: "Confirm active DC DLCP status", gate: "DC DLCP registration" };
        if (code === "WA")
            return { short: "Washington Secretary of State", via: "the Washington Secretary of State, Corporations Division", title: "Confirm active Washington Secretary of State status", gate: "Washington Secretary of State registration" };
        const st = p.stateName ?? "State";
        return { short: `${st} Secretary of State`, via: `the ${st} Secretary of State`, title: `Confirm active ${st} Secretary of State status`, gate: `${st} Secretary of State registration` };
    }
    if (p.country === "CO")
        return {
            short: "Cámara de Comercio",
            via: "the Cámara de Comercio (RUES — Registro Único Empresarial y Social)",
            title: "Confirm active Cámara de Comercio registration",
            gate: "Cámara de Comercio registration"
        };
    return { short: "your country's business registry", via: "your country's business registry", title: "Confirm active business registry status", gate: "business registration" };
}

/** The location block counts as one question; it is answered once a state is picked (US) or just a country (elsewhere). */
export function locationDone(a: Answers): boolean {
    const country = a.country ?? "US";
    return country === "US" ? Boolean(a.usState) : true;
}

/** Short place label carried to the inquiry form, e.g. "Atlanta, Georgia" or "Bogotá, Colombia". */
export function locationLabel(a: Answers): string {
    const p = placeOf(a);
    const tail = p.isUS ? p.stateName : p.countryName;
    return [p.city, tail].filter(Boolean).join(", ").slice(0, 60);
}

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
        kind: "location",
        label: "Where are you based?",
        options: []
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
        hint: "Needed for US federal applications.",
        when: (a) => (a.country ?? "US") === "US",
        options: [
            { value: "active", label: "Active" },
            { value: "expired", label: "Expired" },
            { value: "never", label: "Never registered" },
            { value: "unsure", label: "Not sure" }
        ]
    },
    {
        id: "sunbiz",
        label: (a) => {
            const p = placeOf(a);
            return p.florida ? "Sunbiz / state registration" : p.isUS && !a.usState ? "State business registration" : `Business registration (${registryOf(a).short})`;
        },
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
            { value: "ein", label: (a) => (placeOf(a).isUS ? "EIN letter" : "Government tax ID document") },
            { value: "btr", label: (a) => (placeOf(a).florida ? "Current business tax receipts" : "Current local business license / tax receipts") },
            { value: "financials", label: "Tax return or financials from the last 18 months" },
            { value: "capability", label: "Capability statement or past proposals" },
            { value: "bios", label: "Leadership bios" },
            { value: "logo", label: "Logo and photos" },
            { value: "irs", label: (a) => (placeOf(a).isUS ? "IRS 501(c)(3) determination letter" : "Nonprofit or tax-exempt status document") }
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
export const SHORT_IDS: (keyof Answers | "location")[] = ["orgType", "location", "years", "employees"];

export const labelOf = (v: string | ((a: Answers) => string), a: Answers) => (typeof v === "function" ? v(a) : v);

export function visibleQuestions(a: Answers): Question[] {
    return QUESTIONS.filter((q) => !q.when || q.when(a));
}

/** Options for one question, labels resolved for this respondent's jurisdiction. */
export function visibleOptions(q: Question, a: Answers): { value: string; label: string }[] {
    const opts = q.id === "docs" && !isNonprofitLike(a) ? q.options.filter((o) => o.value !== "irs") : q.options;
    return opts.map((o) => ({ value: o.value, label: labelOf(o.label, a) }));
}

export function isAnswered(q: Question, a: Answers): boolean {
    if (q.kind === "location") return locationDone(a);
    const v = a[q.id as keyof Answers];
    return q.multi ? ((v as string[] | undefined) ?? []).length > 0 : Boolean(v);
}

/* The score is 0–100: four areas (Identity, Financials, Narrative, Operations) of 25 points each. */

export const VAULT_SECTIONS = [
    "01 Legal Identity",
    "02 Certifications and Eligibility",
    "03 Financials",
    "04 Story and Narrative",
    "05 Grant Targets and Boundaries",
    "06 Standard Attachments",
    "07 Operations and Approvals"
] as const;

export type Blocks = "Local" | "County" | "State" | "Federal" | "Foundation";

export type Gap = {
    section: (typeof VAULT_SECTIONS)[number];
    missing: string;
    why: string;
    blocks: Blocks[] | "All" | "None — but it slows things down";
    firstStep: string;
    priority: 1 | 2 | 3 | 4;
    /** Set on gaps that stop a whole kind of application; the types it blocks come from `blocks`. */
    gate?: string;
};

export type SubScore = { area: string; score: number; max: 25; note: string };

export type GrantType = {
    name: string;
    why: string;
    watch: string;
    /** Which kind of application this is, matched against each gap's `blocks`. */
    kind?: "Local" | "County" | "State" | "Federal" | "Foundation";
    /** Why this type is blocked right now, if a readiness gap blocks it. */
    blocked?: string;
};

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
    const where = placeOf(a);
    const registry = registryOf(a);

    /* Identity. SAM.gov is a US-federal registration: outside the US it isn't asked,
       and its points are not applicable, so they count in full rather than as a gap. */
    const identity = nonprofit
        ? pick(a.sunbiz, { active: 8, unsure: 3 }) +
          (has(a, "ein") ? 6 : 0) +
          (has(a, "irs") ? 5 : 0) +
          (where.isUS ? pick(a.sam, { active: 6, expired: 2 }) : 6)
        : pick(a.sunbiz, { active: 10, unsure: 4 }) + (has(a, "ein") ? 8 : 0) + (where.isUS ? pick(a.sam, { active: 7, expired: 3 }) : 7);

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
        gaps.push(
            where.isUS
                ? {
                      section: "01 Legal Identity",
                      missing: "EIN letter",
                      why: "It's the document most applications ask for first to prove who you are.",
                      blocks: "All",
                      firstStep: "Find your IRS EIN confirmation letter (CP 575 or 147C) and add it to your Uploads folder.",
                      priority: 1
                  }
                : {
                      section: "01 Legal Identity",
                      missing: "Government tax ID document",
                      why: "It's the document most applications ask for first to prove who you are.",
                      blocks: "All",
                      firstStep: "Find the document that shows your organization's tax ID and add it to your Uploads folder.",
                      priority: 1
                  }
        );
    if (a.sunbiz !== "active") {
        const sunbizNone = a.sunbiz === "none";
        gaps.push({
            section: "01 Legal Identity",
            missing: where.florida
                ? sunbizNone
                    ? "Florida state registration (Sunbiz)"
                    : registry.title
                : sunbizNone
                  ? `Register with ${registry.via}`
                  : registry.title,
            why:
                (where.isUS
                    ? "Local, county and state programs usually check your registration first — an inactive status ends the application."
                    : "Local and regional programs usually check your registration first — an inactive status ends the application.") +
                (where.florida
                    ? " Many Florida-facing foundations also require active Sunbiz standing — check each funder's rules before applying."
                    : " Many foundations in your area also require active registration standing — check each funder's rules before applying."),
            blocks: ["Local", "County", "State"],
            firstStep: `Look up your entity on ${registry.via} and confirm it shows as active.`,
            priority: 1,
            gate: `Blocked until your ${sunbizNone && where.florida ? "Florida state registration" : registry.gate} is confirmed active.`
        });
    }
    if (nonprofit && !has(a, "irs"))
        gaps.push({
            section: "01 Legal Identity",
            missing: where.isUS ? "IRS 501(c)(3) determination letter" : "Nonprofit or tax-exempt status document",
            why: "Most foundation and nonprofit programs require proof of tax-exempt status.",
            blocks: ["Foundation", "Federal"],
            firstStep: where.isUS
                ? "Locate your IRS determination letter, or request a copy from the IRS."
                : "Locate the document that proves your nonprofit or tax-exempt status.",
            priority: 1,
            gate: where.isUS ? "Blocked until your IRS determination letter is on file." : "Blocked until your tax-exempt status document is on file."
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
            section: "07 Operations and Approvals",
            missing: "A named approver",
            why: "Nothing is submitted without one person's explicit sign-off — so someone has to own it.",
            blocks: "All",
            firstStep: "Decide who will approve applications, section by section.",
            priority: 2
        });
    if (where.isUS && a.sam !== "active")
        gaps.push({
            section: "02 Certifications and Eligibility",
            missing: a.sam === "expired" ? "SAM.gov registration renewal" : "SAM.gov registration and UEI",
            why: "Federal applications can't be submitted without an active registration, and it can take weeks to process.",
            blocks: ["Federal"],
            firstStep: a.sam === "expired" ? "Renew your registration at SAM.gov." : "Confirm your SAM.gov status, and start registration if you have none.",
            priority: 2,
            gate: "Blocked until your SAM.gov registration is active."
        });
    if (!has(a, "btr"))
        gaps.push(
            where.florida
                ? {
                      section: "02 Certifications and Eligibility",
                      missing: "Current business tax receipts",
                      why: "City and county programs commonly require current local business tax receipts for the address you apply from.",
                      blocks: ["Local", "County"],
                      firstStep: "Download your current city and county business tax receipts.",
                      priority: 2
                  }
                : {
                      section: "02 Certifications and Eligibility",
                      missing: "Current local business license / tax receipts for the address you apply from",
                      why: "City and county programs commonly require a current local business license or tax receipt for the address you apply from.",
                      blocks: ["Local", "County"],
                      firstStep: "Download your current local business license or tax receipt for that address.",
                      priority: 2
                  }
        );
    if (!has(a, "capability"))
        gaps.push({
            section: "06 Standard Attachments",
            missing: "Capability statement or past proposals",
            why: "This is a gap, not a failure — Peyi can draft a capability statement from your story for your approval.",
            blocks: "None — but it slows things down",
            firstStep: "Gather any proposal, pitch deck or one-pager you've written before.",
            priority: 3
        });
    if (!has(a, "bios"))
        gaps.push({
            section: "04 Story and Narrative",
            missing: "Leadership bios",
            why: "Foundation and federal narratives ask who will run the work.",
            blocks: ["Foundation", "Federal"],
            firstStep: "Write a short bio for each person who leads the work.",
            priority: 3
        });
    if (a.inbox !== "yes")
        gaps.push({
            section: "07 Operations and Approvals",
            missing: "One inbox for funder mail",
            why: "Clarification requests often come with short reply windows — they can't land in a spam folder.",
            blocks: "None — but it slows things down",
            firstStep: "Pick one address for grant correspondence and use it on every application.",
            priority: 3
        });
    if (a.hours === "lt2")
        gaps.push({
            section: "07 Operations and Approvals",
            missing: "Time for review",
            why: "Under 2 hours a month leaves no room to review drafts. Done-for-you keeps your part to review minutes.",
            blocks: "None — but it slows things down",
            firstStep: "Block a recurring 30-minute slot for approvals.",
            priority: 3
        });
    if (!has(a, "logo"))
        gaps.push({
            section: "06 Standard Attachments",
            missing: "Logo and photos",
            why: "Some local programs and most foundation reports ask for them.",
            blocks: "None — but it slows things down",
            firstStep: "Put your logo and a few photos of your work in one folder.",
            priority: 4
        });
    gaps.sort((x, y) => x.priority - y.priority);

    const federalBlocked = where.isUS && a.sam !== "active";

    /* Grant types that fit — types only, never a promise of a live grant.
       Every type that fits the organization's kind and place is listed. A
       readiness gap never removes one; it marks the type as blocked instead.
       Local and state types name the respondent's own city, state or region. */
    const types: GrantType[] = [];
    const business = a.orgType === "business";
    const mission = ["nonprofit", "school", "healthcare", "municipal"].includes(a.orgType ?? "");
    const regionName = where.region;

    if (where.southFlorida && business) {
        types.push({
            kind: "Local",
            name: "Local micro-grants",
            why: "City and commission-district programs aimed at small businesses with a physical location in the area.",
            watch: "Windows open district by district, and many are reimbursement-based — expenses must fall in the program's window."
        });
        types.push({
            kind: "County",
            name: "County small-business programs",
            why: "Miami-Dade and Broward run programs for small businesses in the county.",
            watch: "Location, active Sunbiz status, current business tax receipts and size limits are the usual blockers."
        });
    } else if (where.southFlorida) {
        types.push({
            kind: "Local",
            name: "Local and county community programs",
            why: "City and county programs that fund organizations serving residents in the area.",
            watch: "Eligibility often depends on the population served and the address you apply from. Windows and funding rules differ by program."
        });
    } else if (!where.isUS) {
        types.push({
            kind: "Local",
            name: `Local and regional programs in ${where.place}`,
            why: business
                ? `City and regional programs aimed at small businesses based in ${where.place}.`
                : `City and regional programs that fund organizations serving people in ${where.place}.`,
            watch: "Eligibility, language and registration rules differ by program. Read each notice closely."
        });
    } else if (business) {
        types.push({
            kind: "Local",
            name: `Local micro-grants in ${where.place}`,
            why: `City and neighborhood programs aimed at small businesses with a physical location in ${where.place}.`,
            watch: "Windows often open by district or neighborhood, and many are reimbursement-based — expenses must fall in the program's window."
        });
        types.push({
            kind: "County",
            name: `County and regional small-business programs near ${where.place}`,
            why: `Programs run by the county, region or economic-development agency that serves ${where.place}.`,
            watch: "Location, active business registration, current local business licenses and size limits are the usual blockers."
        });
    } else {
        types.push({
            kind: "Local",
            name: `Local and county community programs in ${where.place}`,
            why: `City and county programs that fund organizations serving residents of ${where.place}.`,
            watch: "Eligibility often depends on the population served and the address you apply from. Windows and funding rules differ by program."
        });
    }
    if (where.florida)
        types.push({
            kind: "State",
            name: "State of Florida programs",
            why: "Statewide programs for Florida organizations, often targeted by industry or purpose.",
            watch: "Read eligibility closely — state programs are often narrower than their titles suggest."
        });
    else if (where.isUS && where.stateName)
        types.push({
            kind: "State",
            name: a.usState === "DC" ? "District of Columbia government programs" : `State of ${where.stateName} programs`,
            why:
                a.usState === "DC"
                    ? "District-wide programs for DC organizations, often targeted by industry or purpose."
                    : `Statewide programs for ${where.stateName} organizations, often targeted by industry or purpose.`,
            watch: "Read eligibility closely — state programs are often narrower than their titles suggest."
        });
    else if (!where.isUS)
        types.push({
            kind: "State",
            name: `Government programs in ${regionName}`,
            why: `National and regional public-funding programs for organizations in ${regionName}.`,
            watch: "Eligibility, language and registration rules differ by program. Read each notice closely."
        });
    if (where.isUS && business && (a.categories ?? []).includes("research"))
        types.push({
            kind: "Federal",
            name: "Federal small-business research and tech programs (SBIR/STTR)",
            why: "Federal programs that fund research and development at U.S. small businesses.",
            watch: "Requires an active SAM.gov registration, and complex federal applications are outside the Grant Blitz."
        });
    if (mission)
        types.push({
            kind: "Foundation",
            name: "Foundation program and capacity grants",
            why: "Community, family and corporate foundations that fund programs and organizational capacity.",
            watch: "Fit with the foundation's stated priorities matters more than the size of the request."
        });
    if (a.orgType === "nonprofit" || a.orgType === "school")
        types.push({
            kind: "Foundation",
            name: "Corporate giving programs",
            why: "Company-run giving and sponsorship programs, often tied to where their staff live and work.",
            watch: "Many have rolling deadlines and short applications — easy to miss without a tracker."
        });
    if (mission)
        types.push({
            kind: "Federal",
            name: "Federal grants via Grants.gov",
            why: where.isUS
                ? "Federal agency programs for nonprofits, schools, healthcare and public-serving organizations."
                : "US federal agency programs, most of which are limited to US-based organizations.",
            watch: where.isUS
                ? "Requires an active SAM.gov registration; decisions commonly take 6–12 months."
                : "US federal eligibility and registration requirements must be confirmed per funder before you spend time on an application."
        });
    if (types.length === 0)
        types.push({
            name: "Foundation and local programs",
            why: "Your answers don't narrow the field yet — a Scout run against your vault will.",
            watch: "Tell us more on the intake form so the Scout can filter by entity type and geography."
        });
    for (const t of types) {
        const hit = gaps.filter((g) => g.gate && t.kind && Array.isArray(g.blocks) && g.blocks.includes(t.kind));
        if (hit.length) t.blocked = hit.map((g) => g.gate).join(" ");
    }
    // A missing registration blocks local, county and state types outright. Foundations set their
    // own rules, so for them it is a check to make, not a block.
    if (a.sunbiz !== "active")
        for (const t of types)
            if (t.kind === "Foundation")
                t.watch += where.florida ? " Verify your Sunbiz standing before applying." : " Verify your registration standing before applying.";

    /* Next 3 actions */
    const actions = gaps.slice(0, 2).map((g) => g.firstStep);
    actions.push("Answer the intake form so Scout can rank real opportunities.");
    for (const filler of ["Gather your current documents in one Uploads folder.", "Pick the one or two funding goals that matter most this year."]) {
        if (actions.length < 3) actions.unshift(filler);
    }

    const deadlineNote =
        a.deadline === "30" && total < 75
            ? "Your next deadline is inside 30 days and the vault has open gaps. Close the blockers above first; if they can't close in time, it's usually better to aim for the next cycle than to submit an incomplete application."
            : undefined;

    return { total, band, subs, gaps, federalBlocked, types, actions: actions.slice(0, 3), deadlineNote };
}

export function isComplete(a: Answers): boolean {
    return visibleQuestions(a).every((q) => (q.multi ? true : isAnswered(q, a)));
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
        ...r.types.map((t) => `- ${t.name}: ${t.why}${t.blocked ? ` ${t.blocked}` : ""}`),
        "",
        "Live matches and current deadlines require a Scout run against your vault.",
        "https://www.peyiai.com/grants"
    ];
    return lines.join("\n");
}
