import { Eye, Hand } from "lucide-react";
import { GrantsHeader } from "@/components/grants/GrantsHeader";
import { GrantsActions, GrantsCTA, Guardrails, LastUpdated, SectionHead } from "@/components/grants/bits";
import { STEPS, STEPS_CLOSER } from "@/lib/grants/content";
import { grantsMeta } from "@/lib/grants/meta";

export const metadata = grantsMeta(
    "/grants/how-it-works",
    "How Peyi Solutions Grants Works: Org Vault, Scout, Approval Room, Tracker",
    "Peyi Solutions Grants runs in six steps — Org Vault, Scout, a policy and fit gate, Drafter, approval room and Tracker — and nothing is submitted without your explicit approval."
);

const TIMELINE = [
    { when: "Week 1", what: "Vault", detail: "Intake and document handoff, then your gap list." },
    { when: "Once the vault passes its completeness check", what: "Scout", detail: "Opportunities are watched and ranked against your vault." },
    { when: "Top-ranked opportunities", what: "Drafting", detail: "Applications are drafted and sent to your approval room." },
    { when: "From then on, continuously", what: "Tracker", detail: "Deadlines, statuses and funder email, watched for you." }
];

export default function HowItWorks() {
    return (
        <>
            <GrantsHeader
                title="How Peyi Solutions Grants"
                accent="works."
                lead="Peyi Solutions Grants runs in six steps — Org Vault, Scout, a policy and fit gate, Drafter, approval room and Tracker. Peyi does the finding, drafting, chasing and tracking; you review, approve, and sign off before anything is submitted."
                crumbs={[
                    { label: "Grants", href: "/grants" },
                    { label: "How it works", href: "/grants/how-it-works" }
                ]}
            >
                <GrantsActions />
            </GrantsHeader>

            <section className="container mx-auto px-6 lg:px-16 py-24 md:py-32">
                <SectionHead eyebrow="The six steps" title="What happens, and" accent="what you do." />
                <ol className="relative space-y-6 before:absolute before:left-[27px] before:top-6 before:bottom-6 before:w-px before:bg-gradient-to-b before:from-gold before:via-coral/40 before:to-gold md:before:left-[35px]">
                    {STEPS.map((s) => (
                        <li key={s.n} className="relative grid grid-cols-[56px_1fr] md:grid-cols-[72px_1fr] gap-5">
                            <span className="relative z-10 flex h-14 w-14 md:h-[72px] md:w-[72px] items-center justify-center rounded-full border border-gold bg-paper font-heading text-xl md:text-2xl font-extrabold text-coral-deep shadow-[0_10px_24px_-14px_rgba(120,40,50,0.6)]">
                                {s.n}
                            </span>
                            <div className="rounded-[1.5rem] border border-gold-soft bg-paper p-6 md:p-8">
                                <h2 className="font-heading text-2xl md:text-3xl font-bold text-ink">{s.name}</h2>
                                <p className="mt-3 text-lg text-body leading-relaxed">{s.body}</p>
                                <div className="mt-5 grid gap-4 md:grid-cols-2">
                                    <p className="flex gap-3 rounded-2xl bg-cream/80 p-4 text-[15px] text-body leading-relaxed">
                                        <Eye className="mt-0.5 h-5 w-5 shrink-0 text-gold-deep" />
                                        <span>
                                            <strong className="block text-ink">What you see</strong>
                                            {s.sees}
                                        </span>
                                    </p>
                                    <p className="flex gap-3 rounded-2xl bg-coral/[0.06] p-4 text-[15px] text-body leading-relaxed">
                                        <Hand className="mt-0.5 h-5 w-5 shrink-0 text-coral-deep" />
                                        <span>
                                            <strong className="block text-ink">What you do</strong>
                                            {s.does}
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </li>
                    ))}
                </ol>
                <p className="mt-12 font-heading italic text-2xl md:text-3xl text-coral-deep text-center">{STEPS_CLOSER}</p>
            </section>

            <section className="band py-24 md:py-32">
                <div className="container mx-auto px-6 lg:px-16">
                    <SectionHead eyebrow="Timeline" title="From intake to" accent="a running pipeline." />
                    <ol className="grid gap-5 md:grid-cols-4">
                        {TIMELINE.map((t, i) => (
                            <li key={t.what} className="relative rounded-[1.5rem] border border-gold-soft bg-paper p-6">
                                <span className="font-label text-[10px] text-gold-deep">{t.when}</span>
                                <h3 className="mt-2 font-heading text-2xl font-bold text-ink">{t.what}</h3>
                                <p className="mt-2 text-body leading-relaxed">{t.detail}</p>
                                {i < TIMELINE.length - 1 && (
                                    <span aria-hidden="true" className="hidden md:block absolute -right-3 top-1/2 h-px w-6 bg-gold" />
                                )}
                            </li>
                        ))}
                    </ol>
                </div>
            </section>

            <section className="container mx-auto px-6 lg:px-16 py-24">
                <Guardrails />
                <LastUpdated className="mt-10" />
            </section>

            <GrantsCTA />
        </>
    );
}
