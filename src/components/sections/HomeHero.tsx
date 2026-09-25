import Link from "next/link";
import { ArrowRight, BarChart3, Calendar, Users, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AutopilotBoard } from "@/components/loops/AutopilotBoard";
import { PointerField } from "@/components/art/PointerField";
import { TiltCard } from "@/components/art/TiltCard";
import { Magnetic } from "@/components/art/Magnetic";
import { DecoArch, DecoFacade, DecoOrnament, TerrazzoSlab } from "@/components/art/DecoArch";
import { HERO_LEFT, HERO_RIGHT, PalmCluster, SPRIG, scaleFronds } from "@/components/art/Palms";

/**
 * Hero, built from the approved Tropical Deco comp.
 *
 * Everything decorative sits inside one PointerField, so a single cursor
 * listener drives the whole scene: palms lean toward the cursor like wind, the
 * arch frame and the sunset view drift in opposite directions for depth, and
 * the Autopilot Board tilts under the pointer. On touch, or with reduced
 * motion, the scene is still — and the palms keep a gentle sway only where
 * motion is allowed.
 */

const features = [
    { icon: BarChart3, title: ["Practical", "use cases"], line: "Real work, real results." },
    { icon: Zap, title: ["Built for", "small businesses"], line: "Simple. Scalable. Yours." },
    { icon: Users, title: ["A partner", "by your side"], line: "Strategy. Setup. Support." }
];

export function HomeHero() {
    return (
        <PointerField as="section" className="grain relative isolate overflow-hidden bg-cream">
            {/* Warm light falling from the upper right, where the sun is */}
            <div
                aria-hidden="true"
                className="absolute inset-0 -z-20"
                style={{
                    background:
                        "radial-gradient(70% 60% at 78% 20%, rgba(255,214,176,0.55) 0%, rgba(253,246,237,0) 70%), radial-gradient(50% 50% at 10% 90%, rgba(217,224,210,0.55) 0%, rgba(253,246,237,0) 70%)"
                }}
            />

            {/* Architecture */}
            <DecoFacade className="hidden xl:block left-0 top-0 bottom-0 w-[184px] -z-10" />

            <div aria-hidden="true" className="hidden lg:block absolute right-0 top-[30%] bottom-0 w-[96px] -z-10">
                <div className="absolute inset-0 bg-gradient-to-b from-[#E7ECDF] via-[#D9E0D2] to-[#C7D5C4] border-l border-gold/35" />
                <DecoOrnament className="absolute top-10 left-1/2 -translate-x-1/2 w-12" />
                <ul className="absolute top-[34%] inset-x-0 flex flex-col items-center gap-4 font-label text-[10px] text-sage-ink">
                    <li>Automate</li>
                    <li>Simplify</li>
                    <li>Grow</li>
                    <li>Thrive</li>
                </ul>
            </div>

            <div
                aria-hidden="true"
                className="hidden xl:flex absolute top-28 right-5 items-stretch gap-3 font-label text-[10px] leading-[2.4] text-quiet"
            >
                <div className="text-left">
                    Small
                    <br />
                    Business
                    <br />
                    Bigger
                    <br />
                    Tomorrow
                </div>
                <span className="w-px bg-gold/70" />
            </div>

            {/* Terrazzo slab under the arch, carrying the signature */}
            <TerrazzoSlab className="hidden lg:block right-0 bottom-0 w-[48%] -z-10 translate-y-[8%]" />

            {/* Palms — alive */}
            <PalmCluster
                fronds={HERO_LEFT}
                className="hidden lg:block left-0 top-0 h-full w-[360px] z-10 origin-top-left lg:scale-[0.72] xl:scale-[0.85] 2xl:scale-100"
                depth={16}
                lean={3}
                pivot="0% 45%"
            />
            <PalmCluster
                fronds={HERO_RIGHT}
                className="hidden md:block right-0 bottom-0 h-[560px] w-[520px] z-10 origin-bottom-right scale-[0.7] xl:scale-[0.82]"
                depth={22}
                lean={2.5}
                pivot="100% 100%"
            />

            {/* Content */}
            <div className="relative z-20 container mx-auto px-6 lg:pl-24 xl:pl-40 lg:pr-36 pt-28 lg:pt-32 pb-16 lg:pb-20 grid lg:grid-cols-[1.08fr_0.92fr] gap-16 lg:gap-10 items-center">
                <div>
                    <p className="rise type-eyebrow mb-6" style={{ animationDelay: "0.05s" }}>
                        AI implementation for small businesses
                    </p>

                    {/* Sized to the copy column so "Profit For Your" holds one line, as in the comp */}
                    <h1
                        className="rise type-display mb-6"
                        style={{ animationDelay: "0.12s", fontSize: "clamp(2.9rem, 5.6vw, 5.4rem)" }}
                    >
                        <span className="block">Turn AI Into</span>
                        <span className="block">
                            <span className="accent-word">Profit</span> For Your
                        </span>
                        <span className="block">Business</span>
                    </h1>

                    <p
                        className="rise text-lg md:text-[1.3rem] leading-relaxed text-body max-w-xl mb-8"
                        style={{ animationDelay: "0.2s" }}
                    >
                        Overwhelmed by AI hype? We find the work that&apos;s eating your week, build the
                        systems that handle it, and give you a clear roadmap to start small and scale fast.
                    </p>

                    <div className="rise flex flex-col sm:flex-row sm:flex-wrap gap-4" style={{ animationDelay: "0.28s" }}>
                        <Magnetic>
                            <Button size="xl" variant="hero" className="group h-16 px-9 text-xl whitespace-nowrap" asChild>
                                <Link href="/book">
                                    <Calendar className="mr-3 w-6 h-6" />
                                    Book AI Audit
                                    <ArrowRight className="ml-3 w-5 h-5 transition-transform group-hover:translate-x-1" />
                                </Link>
                            </Button>
                        </Magnetic>
                        <Magnetic pull={0.18}>
                            <Button size="xl" variant="heroOutline" className="h-16 px-9 text-xl whitespace-nowrap" asChild>
                                <Link href="/ai-readiness-quiz">Find Your AI Starting Point</Link>
                            </Button>
                        </Magnetic>
                    </div>

                    <ul
                        className="rise mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl"
                        style={{ animationDelay: "0.36s" }}
                    >
                        {features.map(({ icon: Icon, title, line }) => (
                            <li key={line} className="flex items-start gap-3.5">
                                <span className="shrink-0 w-12 h-12 rounded-full border-[1.5px] border-gold flex items-center justify-center text-gold-deep bg-paper/60">
                                    <Icon className="w-5 h-5" strokeWidth={1.6} />
                                </span>
                                <span>
                                    <span className="block font-label text-[11px] leading-[1.7] text-ink/85">
                                        {title[0]}
                                        <br />
                                        {title[1]}
                                    </span>
                                    <span className="block mt-1 text-[13px] text-quiet">{line}</span>
                                </span>
                            </li>
                        ))}
                    </ul>

                    <Link
                        href="/#solutions"
                        className="rise group mt-8 flex items-center gap-5 font-label text-[11px] text-gold-deep max-w-xl"
                        style={{ animationDelay: "0.44s" }}
                    >
                        AI works better here
                        <span className="flex-1 gold-rule" />
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>

                {/* Arch + board */}
                <div className="rise relative" style={{ animationDelay: "0.3s" }}>
                    {/* Below lg the edge palms would sit behind the copy, so on
                        small screens they frame the arch instead. */}
                    <PalmCluster
                        fronds={scaleFronds(SPRIG, 0.55)}
                        className="lg:hidden left-[calc(50%-min(43vw,180px)-24px)] -top-4 w-[200px] h-[290px] z-[1]"
                        depth={10}
                        lean={3}
                        pivot="0% 0%"
                    />
                    <PalmCluster
                        fronds={scaleFronds(SPRIG, 0.5)}
                        className="lg:hidden right-[calc(50%-min(43vw,180px)-24px)] top-28 w-[180px] h-[260px] z-[1] origin-top scale-x-[-1]"
                        depth={10}
                        lean={-3}
                        pivot="0% 0%"
                    />
                    <DecoArch
                        priority
                        className="mx-auto w-[min(86vw,360px)] h-[430px] lg:absolute lg:mx-0 lg:left-[30%] lg:-top-[96px] lg:w-[430px] lg:h-[680px]"
                    />
                    <div className="relative z-10 -mt-48 lg:mt-24 lg:-ml-6 max-w-[540px] mx-auto lg:mx-0">
                        <TiltCard className="rounded-[2rem]">
                            <AutopilotBoard />
                        </TiltCard>
                    </div>
                </div>
            </div>

        </PointerField>
    );
}
