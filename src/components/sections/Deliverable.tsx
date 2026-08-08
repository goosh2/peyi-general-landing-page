/**
 * Specificity is the honest substitute for a track record. Rather than claiming
 * the audit is valuable, this shows the actual artifact it produces — rendered
 * as real markup rather than a screenshot so it stays crisp and themeable.
 *
 * The sample rows are illustrative of the report's FORM, not results from a real
 * client. Nothing here should be presented as a case study.
 */
const sampleRows = [
    {
        rank: "01",
        workflow: "Missed-call follow-up",
        finding: "Calls after 5pm go to voicemail; most never get returned.",
        effort: "Low",
        effortTone: "text-emerald-400"
    },
    {
        rank: "02",
        workflow: "Quote turnaround",
        finding: "Quotes are rebuilt by hand each time from past job notes.",
        effort: "Medium",
        effortTone: "text-amber-400"
    },
    {
        rank: "03",
        workflow: "Invoice chasing",
        finding: "Overdue invoices are tracked manually in a spreadsheet.",
        effort: "Low",
        effortTone: "text-emerald-400"
    },
    {
        rank: "04",
        workflow: "Job scheduling",
        finding: "Dispatch depends on one person knowing the whole calendar.",
        effort: "High",
        effortTone: "text-rose-400"
    }
];

export function Deliverable() {
    return (
        <section id="deliverable" className="py-28 px-6 relative overflow-hidden">
            <div className="container mx-auto max-w-5xl">
                <div className="max-w-2xl mb-12">
                    <p className="type-eyebrow mb-4">What you actually get</p>
                    <h2 className="type-section font-heading text-white mb-5 text-balance">
                        A roadmap, not a <span className="accent-word">sales deck</span>.
                    </h2>
                    <p className="text-lg text-muted-foreground text-pretty">
                        The audit ends in a document that names the specific workflows worth
                        automating in your business, ordered by what pays off first. Here&apos;s the
                        shape of it.
                    </p>
                </div>

                {/* The artifact */}
                <div className="surface-floating rounded-3xl overflow-hidden">
                    {/* Report header */}
                    <div className="px-6 md:px-10 py-6 border-b border-white/[0.07] flex flex-wrap items-center justify-between gap-4">
                        <div>
                            <div className="font-heading font-bold text-white text-lg">
                                AI Opportunity Roadmap
                            </div>
                            <div className="text-sm text-muted-foreground">
                                Sample — a service business, 6 staff
                            </div>
                        </div>
                        <div className="text-xs px-3 py-1.5 rounded-full border border-white/10 text-muted-foreground">
                            Illustrative example
                        </div>
                    </div>

                    {/* Column labels */}
                    <div className="hidden md:grid grid-cols-[3rem_1fr_1.4fr_6rem] gap-4 px-10 py-3 text-xs uppercase tracking-widest text-muted-foreground/70 border-b border-white/[0.05]">
                        <div>#</div>
                        <div>Workflow</div>
                        <div>What we found</div>
                        <div>Build effort</div>
                    </div>

                    {/* Rows */}
                    <div className="divide-y divide-white/[0.05]">
                        {sampleRows.map((row) => (
                            <div
                                key={row.rank}
                                className="grid md:grid-cols-[3rem_1fr_1.4fr_6rem] gap-2 md:gap-4 px-6 md:px-10 py-5 items-baseline"
                            >
                                <div className="font-heading font-bold text-primary text-sm">
                                    {row.rank}
                                </div>
                                <div className="font-heading font-bold text-white">
                                    {row.workflow}
                                </div>
                                <div className="text-sm text-muted-foreground leading-relaxed text-pretty">
                                    {row.finding}
                                </div>
                                <div className={`text-sm font-medium ${row.effortTone}`}>
                                    {row.effort}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Footer note */}
                    <div className="px-6 md:px-10 py-5 border-t border-white/[0.07] text-sm text-muted-foreground">
                        Each item comes with the tools we&apos;d use, what it would cost to run, and
                        what it takes to build. The roadmap is yours to keep — whether we build it or
                        you take it somewhere else.
                    </div>
                </div>
            </div>
        </section>
    );
}
