import { X } from "lucide-react";

/**
 * The brand claims anti-hype everywhere and demonstrates it nowhere. Naming the
 * cases where we'd tell someone not to buy is the cheapest, most credible proof
 * available — and almost nobody in this market will say it out loud.
 */
const cases = [
    {
        title: "Your process only lives in your head",
        body: "If the way a job gets done changes every time and has never been written down, there's nothing consistent to automate yet. AI will just make the inconsistency faster."
    },
    {
        title: "The volume isn't there",
        body: "Automating something that happens twice a month rarely pays for itself. We'd rather tell you that than sell you a system you'll forget you're paying for."
    },
    {
        title: "The real problem is upstream",
        body: "Plenty of \"AI problems\" are actually pricing, staffing, or follow-up-discipline problems. A chatbot on top of those buys you nothing."
    },
    {
        title: "A cheaper tool already does it",
        body: "Sometimes the answer is a $20/month scheduling app and an afternoon of setup. If that's the fix, that's what we'll tell you — there's no audit upsell hiding behind it."
    }
];

export function NotTheAnswer() {
    return (
        <section className="band py-32 px-6 relative overflow-hidden">
            <div className="container mx-auto max-w-5xl">
                <div className="max-w-2xl mb-14">
                    <p className="type-eyebrow mb-4">Straight answers</p>
                    <h2 className="type-section font-heading text-white mb-5 text-balance">
                        When AI <span className="accent-word">isn&apos;t the answer</span>.
                    </h2>
                    <p className="text-lg text-muted-foreground text-pretty">
                        Most of this industry is paid to tell you AI fixes everything. It doesn&apos;t,
                        and pretending otherwise is how small businesses end up with expensive
                        software they never open. Here&apos;s when we&apos;ll say no.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                    {cases.map((item) => (
                        <div key={item.title} className="surface-raised rounded-2xl p-7">
                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-muted-foreground">
                                    <X className="w-4 h-4" />
                                </div>
                                <div>
                                    <h3 className="font-heading font-bold text-white mb-2">
                                        {item.title}
                                    </h3>
                                    <p className="text-muted-foreground leading-relaxed text-pretty">
                                        {item.body}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <p className="mt-10 text-muted-foreground max-w-2xl text-pretty">
                    The audit is how we find out which of these you&apos;re in. If it turns out AI
                    isn&apos;t worth it for your business right now, you&apos;ll leave knowing that —
                    which is worth more than a system you regret.
                </p>
            </div>
        </section>
    );
}
