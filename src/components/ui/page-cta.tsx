import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * Closing call to action for solution pages. The heading and line stay page-
 * specific; the two actions are fixed so every page offers the same, honestly
 * labelled choice: book the audit, or take the quiz first.
 *
 * (It replaces per-page blocks where the primary button read "Get Your … Audit"
 * but linked to the quiz, and the audit booking hid behind "Book a Strategy Call".)
 */
export function PageCTA({ title, description }: { title: string; description: string }) {
    return (
        <section className="grain relative isolate overflow-hidden my-10 rounded-[2rem] border border-gold-soft px-6 py-20 md:py-24 text-center">
            <div className="dot-grid absolute inset-0 -z-10" />
            <div className="drift absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] rounded-full bg-[#FFC295]/[0.35] blur-[120px] pointer-events-none" />

            <p className="type-eyebrow mb-4">Next step</p>
            <h2 className="type-section font-heading text-ink text-balance max-w-3xl mx-auto mb-5">{title}</h2>
            <p className="text-lg text-body max-w-2xl mx-auto text-pretty mb-10">{description}</p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
                <Button size="xl" variant="hero" className="group" asChild>
                    <Link href="/book">
                        <Calendar className="mr-2 w-5 h-5" />
                        Book AI Audit
                        <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </Link>
                </Button>
                <Button size="xl" variant="heroOutline" className="bg-paper" asChild>
                    <Link href="/ai-readiness-quiz">Find Your AI Starting Point</Link>
                </Button>
            </div>
        </section>
    );
}
