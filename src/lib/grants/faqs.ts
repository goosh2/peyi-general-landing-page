/**
 * The Grants FAQ, answer-first: the first sentence of every answer answers the
 * question, for people and for answer engines alike. Inline [label](href)
 * links are rendered as real anchors by <FAQ />.
 */
export const grantsFaqs = [
    {
        question: "What is the Peyi Solutions Grant Agent?",
        answer: "It is a done-for-you grant service from Peyi Solutions: Peyi finds grants, drafts applications from your own documents, and tracks deadlines and funder replies, with you approving every submission. [→ How it works](/grants/how-it-works)"
    },
    {
        question: "What is the Grant Blitz?",
        answer: "The Grant Blitz is Peyi's one-time, 90-day starter sprint: your Org Vault is built, hundreds of opportunities are scanned and the top 25 ranked, and up to 5 high-fit applications are drafted, approved by you and submitted. It covers local, county and simple foundation programs, not complex federal ones. You approve in weekly batches of about 30 minutes, and every submitted application is tracked until its decision. If fewer than 5 truly fit, Peyi doesn't pad the list — unused draft capacity becomes credit toward Core. [→ See pricing](/grants/pricing)"
    },
    {
        question: "How is this different from grant software like Instrumentl or GrantWatch?",
        answer: "Those tools give you search and drafting software and leave the work to you. Peyi runs the pipeline: onboarding, scoring, drafting, approval, tracking, and funder-email escalation."
    },
    {
        question: "How is this different from hiring a human grant writer?",
        answer: "A human writer is the price anchor — typically $75–$200+ per hour, or $1,500–$3,000 per month on retainer and up to about $5,500 for agencies and larger organizations ([Allied Grant Writers](https://www.alliedgrantwriters.com/grant-writer-cost/); [Grantboost](https://www.grantboost.io/blog/grant-writing-fees/)). Peyi's agent-delivered service is priced to sit under a human writer while keeping the human approval step that funders require."
    },
    {
        question: "Do you guarantee that I will win a grant?",
        answer: "No. No honest grant service can guarantee an award. Peyi guarantees the pipeline: ranked opportunities, clean drafts from your own material, policy checks, approvals, and no missed deadlines on its watch."
    },
    {
        question: "Do you charge a percentage of the award?",
        answer: "No, never. Percentage-of-award pricing is unethical under grant-professional standards and forbidden by many funders. Peyi charges flat setup fees and monthly retainers only."
    },
    {
        question: "Who approves an application before it is submitted?",
        answer: "You do, section by section. Nothing is submitted without your explicit sign-off, and federal submissions stay human-clicked by design."
    },
    {
        question: "What is an Org Vault?",
        answer: "Your single truth document set: legal identity, certifications, financials, story, programs, bios, past proposals, and standard attachments, plus a gap list of what is missing or expired. Every draft is built from the vault, and nothing is invented."
    },
    {
        question: "What documents do I need to start?",
        answer: "At minimum: EIN letter, state registration, current business tax receipts, most recent tax return or financials, and any past proposals or capability statement you already have. The [Readiness Check](/grants/readiness-check) and intake form will give you a personal gap list."
    },
    {
        question: "What if I do not qualify for a grant you find?",
        answer: "Then Peyi tells you so, before drafting. Spray-and-pray applications burn funder relationships and waste your approval time. Eligibility honesty is part of the service."
    },
    {
        question: "How does Peyi handle funders' AI rules?",
        answer: "Before drafting, Peyi checks each funder's own AI-use and disclosure rules, and records the check on every application. The rules vary widely: NSF encourages proposers to disclose generative-AI use in the project description ([NSF notice](https://www.nsf.gov/policies/ai/merit-review)), while NIH will not treat applications substantially developed by AI as the applicant's original ideas, and can refer cases found after award to its Office of Research Integrity ([NIH notice NOT-OD-25-132](https://grants.nih.gov/grants/guide/notice-files/NOT-OD-25-132.html)). Your role must be substantive authorship and verification, not a rubber stamp."
    },
    {
        question: "Will AI write my whole application?",
        answer: "No. The agent is researcher, drafter, and compliance checker. You own and stand behind the final words, and you approve them section by section."
    },
    {
        question: "What happens after I submit?",
        answer: "The Tracker watches deadlines, status changes, and funder emails. Clarification and additional-info requests are escalated to you with a drafted response for approval. Post-award reporting management is not part of the service today."
    },
    {
        question: "How long does onboarding take?",
        answer: "Intake and document handoff take about an hour of your time in Week 1; after that, your job is review minutes, not grant administration."
    },
    {
        question: "Do you work with nonprofits, small businesses, or both?",
        answer: "Both, plus municipal-adjacent, school, and healthcare organizations in South Florida. The Scout filters by entity type, so a for-profit does not get a pile of nonprofit-only programs, and vice versa. [→ Who it's for](/grants/who-its-for)"
    },
    {
        question: "Do you serve organizations outside Miami-Dade and Broward?",
        answer: "The service is built for Miami-Dade and Broward first, where Peyi knows the local programs and district rules. If you're elsewhere in Florida, [ask on a call](/grants/book-a-call) and Peyi will tell you plainly whether it can help."
    },
    {
        question: "What is the enablement track?",
        answer: "Peyi sets up your own AI grant setup — vault, Scout prompts, policy-gate checklist, and tracker — trains your person, and stays on as advisor. You run the applications; Peyi does not run the pipeline for you. [→ Done-for-you vs. enablement](/grants/done-for-you-vs-enablement)"
    },
    {
        question: "Can I switch from enablement to done-for-you later?",
        answer: "Yes. That is the natural path: enablement clients who stop keeping up often convert to done-for-you, and their vault carries over."
    },
    {
        question: "What does Peyi do with my financials and narratives?",
        answer: "They stay in your vault. Client financials and narratives are not pooled across clients, not uploaded to public tools, and not used to train anything. Peyi uses API/enterprise tiers with no-training settings."
    }
];
