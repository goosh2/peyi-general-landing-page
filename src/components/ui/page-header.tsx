import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PointerField } from "@/components/art/PointerField";
import { Magnetic } from "@/components/art/Magnetic";
import { DecoArch } from "@/components/art/DecoArch";
import { PalmCluster, SPRIG } from "@/components/art/Palms";

interface PageHeaderProps {
    title: string;
    description: string;
    gradientWord?: string;
    /** Small label above the title. */
    eyebrow?: string;
    /** Set false on pages that are themselves the conversion step. */
    showCta?: boolean;
}

/**
 * Shared header for every solution page, in the homepage's Tropical Deco
 * language: gold-ruled eyebrow, serif headline with one italic coral phrase,
 * the arch-framed sunset, and a palm sprig — all responding to the cursor.
 * The API is unchanged, so no page needed editing.
 */
export function PageHeader({
    title,
    description,
    gradientWord,
    eyebrow = "Peyi Solutions",
    showCta = true
}: PageHeaderProps) {
    return (
        <PointerField as="section" className="grain relative isolate overflow-hidden bg-cream">
            <div
                aria-hidden="true"
                className="absolute inset-0 -z-20"
                style={{
                    background:
                        "radial-gradient(60% 60% at 82% 15%, rgba(255,214,176,0.55) 0%, rgba(253,246,237,0) 70%), radial-gradient(40% 50% at 0% 100%, rgba(217,224,210,0.6) 0%, rgba(253,246,237,0) 70%)"
                }}
            />

            {/* Palms frame the arch on the right; on the left they'd sit under the headline. */}
            <PalmCluster
                fronds={SPRIG}
                className="hidden lg:block right-0 top-0 w-[360px] h-[520px] z-10 origin-top scale-x-[-1]"
                depth={14}
                lean={-3}
                pivot="0% 0%"
            />

            <div className="relative z-20 container mx-auto px-6 lg:pl-16 pt-40 pb-20 md:pt-48 md:pb-24 grid lg:grid-cols-[1.25fr_0.75fr] gap-12 items-center">
                <div className="max-w-3xl">
                    <p className="rise type-eyebrow mb-7">{eyebrow}</p>

                    <h1
                        className="rise font-heading font-extrabold text-ink mb-7"
                        style={{
                            fontSize: "clamp(2.6rem, 5.8vw, 5rem)",
                            lineHeight: 0.98,
                            letterSpacing: "-0.025em",
                            animationDelay: "0.08s"
                        }}
                    >
                        {title}
                        {gradientWord && (
                            <>
                                {" "}
                                <span className="accent-word">{gradientWord}</span>
                            </>
                        )}
                    </h1>

                    <p className="rise text-lg md:text-xl text-body max-w-2xl leading-relaxed" style={{ animationDelay: "0.16s" }}>
                        {description}
                    </p>

                    {showCta && (
                        <div className="rise mt-10 flex flex-col sm:flex-row gap-4" style={{ animationDelay: "0.24s" }}>
                            <Magnetic>
                                <Button size="xl" variant="hero" className="group" asChild>
                                    <Link href="/book">
                                        <Calendar className="mr-2.5 w-5 h-5" />
                                        Book AI Audit
                                        <ArrowRight className="ml-2.5 w-4 h-4 transition-transform group-hover:translate-x-1" />
                                    </Link>
                                </Button>
                            </Magnetic>
                            <Magnetic pull={0.18}>
                                <Button size="xl" variant="heroOutline" asChild>
                                    <Link href="/ai-readiness-quiz">Find Your AI Starting Point</Link>
                                </Button>
                            </Magnetic>
                        </div>
                    )}
                </div>

                <DecoArch className="hidden lg:block justify-self-end w-[320px] h-[440px]" priority />
            </div>

            <div className="gold-rule opacity-60" />
        </PointerField>
    );
}
