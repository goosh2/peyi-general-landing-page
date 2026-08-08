import Link from "next/link";
import { MessageSquare, Megaphone, Users, Briefcase, ArrowRight } from "lucide-react";

/**
 * Four offers are not four equal offers. The layout is a bento rather than a
 * uniform grid so the highest-intent solution reads as the headline and the
 * rest support it — a row of identical cards flattens them into a menu.
 */
const solutions = [
    {
        icon: Users,
        title: "AI CRM & Lead Gen",
        description:
            "Capture every lead, qualify it while it's still warm, and follow up until it books a meeting on your calendar — without you touching it.",
        href: "/ai-lead-generation-small-business",
        span: "lg:col-span-4",
        feature: true,
        points: ["Answers new leads in seconds", "Qualifies before it reaches you", "Books straight to your calendar"]
    },
    {
        icon: MessageSquare,
        title: "AI Customer Service",
        description: "Chatbots and voice agents that answer routine questions instantly, 24/7.",
        href: "/ai-customer-service-small-business",
        span: "lg:col-span-2",
        feature: false
    },
    {
        icon: Megaphone,
        title: "Marketing Automation",
        description: "Content, scheduling, and nurture sequences that keep running on your busy weeks.",
        href: "/ai-marketing-automation-small-business",
        span: "lg:col-span-2",
        feature: false
    },
    {
        icon: Briefcase,
        title: "Operations Automation",
        description:
            "Invoicing, scheduling, and data entry handled in the background, so admin stops eating your week.",
        href: "/ai-operations-automation",
        span: "lg:col-span-4",
        feature: false
    }
];

export function Solutions() {
    return (
        <section className="py-24 bg-background relative overflow-hidden" id="solutions">
            {/* Background Elements */}
            <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-secondary/5 rounded-full blur-3xl pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-2xl mb-14">
                    <p className="type-eyebrow mb-4">What we build</p>
                    <h2 className="type-section font-heading text-white mb-5">
                        Solutions built for <span className="accent-word">real profit</span>
                    </h2>
                    <p className="text-muted-foreground text-lg text-pretty">
                        We don&apos;t just install tools. We build complete workflows that increase
                        efficiency and drive revenue.
                    </p>
                </div>

                <div className="grid lg:grid-cols-6 gap-5">
                    {solutions.map((solution, index) => (
                        <Link
                            href={solution.href}
                            key={index}
                            className={`block group ${solution.span}`}
                        >
                            <div
                                className={`h-full rounded-2xl surface-interactive ${
                                    solution.feature
                                        ? "surface-floating p-8 md:p-10"
                                        : "surface-raised p-8"
                                }`}
                            >
                                <div
                                    className={`rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mb-6 ${
                                        solution.feature ? "w-14 h-14" : "w-11 h-11"
                                    }`}
                                >
                                    <solution.icon
                                        className={`text-primary ${solution.feature ? "w-7 h-7" : "w-5 h-5"}`}
                                    />
                                </div>

                                <h3
                                    className={`font-heading font-bold text-white mb-3 ${
                                        solution.feature ? "text-2xl md:text-3xl" : "text-lg"
                                    }`}
                                >
                                    {solution.title}
                                </h3>

                                <p className="text-gray-400 leading-relaxed text-pretty max-w-xl">
                                    {solution.description}
                                </p>

                                {solution.points && (
                                    <ul className="mt-6 space-y-2">
                                        {solution.points.map((point) => (
                                            <li
                                                key={point}
                                                className="flex items-center gap-3 text-sm text-gray-300"
                                            >
                                                <span className="w-1 h-1 rounded-full bg-primary flex-shrink-0" />
                                                {point}
                                            </li>
                                        ))}
                                    </ul>
                                )}

                                <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-white/70 group-hover:text-white transition-colors">
                                    Learn more
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
