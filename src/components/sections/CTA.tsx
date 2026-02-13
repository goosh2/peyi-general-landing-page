import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar } from "lucide-react";
import Link from "next/link";

export function CTA() {
    return (
        <section className="py-24 px-6 relative overflow-hidden text-center">
            {/* Background FX */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-primary/20 via-secondary/10 to-accent/20 rounded-full blur-3xl -z-10" />

            <div className="max-w-4xl mx-auto space-y-8">
                <h2 className="font-heading font-bold text-4xl md:text-6xl">
                    Ready to Transform <span className="gradient-text">Your Business?</span>
                </h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    Let&apos;s talk about your AI challenges. No pressure, no fluff—just a conversation about what&apos;s possible for your business.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                    <Button size="xl" variant="hero" className="group" asChild>
                        <Link href="/ai-readiness-quiz">
                            Take AI Readiness Quiz
                            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </Button>
                    <Button size="xl" variant="heroOutline">
                        <Calendar className="mr-2 w-5 h-5" />
                        Book AI Audit
                    </Button>
                </div>
            </div>
        </section>
    );
}
