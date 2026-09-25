import Link from "next/link";
import type { ComponentType } from "react";
import { ArrowRight, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AuditLoop, BuildLoop, RoadmapLoop } from "@/components/loops/MiniLoops";

type Step = { n: string; title: string; body: string; Loop: ComponentType };

const steps: Step[] = [
    {
        n: "01",
        title: "Audit",
        body: "We dig into how your business actually runs — where the hours go and where money slips through.",
        Loop: AuditLoop
    },
    {
        n: "02",
        title: "Roadmap",
        body: "You get a report naming the exact workflows worth automating, ordered by what pays off first.",
        Loop: RoadmapLoop
    },
    {
        n: "03",
        title: "Build",
        body: "We build, test, and launch the systems with your team — so they actually get used.",
        Loop: BuildLoop
    }
];

export function HowItWorks() {
    return (
        <section id="how-it-works" className="band relative py-28 md:py-36 overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <p className="type-eyebrow mb-4">How it works</p>
                    <h2 className="type-section font-heading text-ink text-balance mb-5">
                        One audit. A clear roadmap. <span className="accent-word">Real systems.</span>
                    </h2>
                    <p className="text-lg text-body text-pretty">
                        No year-long transformation program. Start with the one thing that pays off first,
                        then decide what&apos;s next.
                    </p>
                </div>

                <div className="relative grid md:grid-cols-3 gap-5">
                    {/* Flowing connector between the step visuals (desktop) */}
                    <svg
                        className="hidden md:block absolute top-[88px] left-[16%] right-[16%] w-[68%] h-2 pointer-events-none"
                        viewBox="0 0 100 2"
                        preserveAspectRatio="none"
                        aria-hidden="true"
                    >
                        <line
                            x1="0"
                            y1="1"
                            x2="100"
                            y2="1"
                            className="flow-dash"
                            stroke="rgba(168,132,79,0.55)"
                            strokeWidth="2"
                            vectorEffect="non-scaling-stroke"
                        />
                    </svg>

                    {steps.map(({ n, title, body, Loop }) => (
                        <article key={n} className="relative surface-raised rounded-3xl overflow-hidden">
                            <div className="relative h-44 border-b border-gold-soft bg-paper p-5">
                                <div className="dot-grid absolute inset-0 opacity-50" />
                                <div className="relative h-full">
                                    <Loop />
                                </div>
                            </div>
                            <div className="p-7">
                                <div className="flex items-baseline gap-3 mb-3">
                                    <span className="font-label text-xs text-primary">{n}</span>
                                    <h3 className="font-heading font-bold text-2xl text-ink">{title}</h3>
                                </div>
                                <p className="text-body leading-relaxed text-pretty">{body}</p>
                            </div>
                        </article>
                    ))}
                </div>

                <div className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-5">
                    <Button size="xl" variant="hero" asChild>
                        <Link href="/book">
                            <Calendar className="mr-2 w-5 h-5" />
                            Start with the audit
                        </Link>
                    </Button>
                    <Link
                        href="/ai-readiness-quiz"
                        className="group inline-flex items-center gap-2 text-body hover:text-ink transition-colors"
                    >
                        Not ready? Find your AI starting point
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
