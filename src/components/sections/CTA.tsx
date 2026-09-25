import Link from "next/link";
import {
    ArrowRight,
    Calendar,
    CalendarCheck,
    FileText,
    Mail,
    MessageSquare,
    PhoneIncoming,
    Receipt,
    Star,
    UserPlus,
    type LucideIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { PointerField } from "@/components/art/PointerField";
import { Magnetic } from "@/components/art/Magnetic";
import { PalmCluster, SPRIG } from "@/components/art/Palms";

/**
 * Closing beat, set at sunset. The call to action stands in a Deco doorway —
 * nested gold arches — while the busywork from the rest of the page orbits it
 * and palms sway at either edge. Ring radii exceed the content's half-width so
 * the chips circle the message rather than crossing it.
 */

type OrbitChip = { icon: LucideIcon; angle: number };

const inner: OrbitChip[] = [
    { icon: PhoneIncoming, angle: 20 },
    { icon: Receipt, angle: 110 },
    { icon: CalendarCheck, angle: 200 },
    { icon: Star, angle: 290 }
];

const outer: OrbitChip[] = [
    { icon: Mail, angle: 60 },
    { icon: FileText, angle: 150 },
    { icon: UserPlus, angle: 240 },
    { icon: MessageSquare, angle: 330 }
];

function Ring({ chips, size, duration, reverse, className = "" }: {
    chips: OrbitChip[];
    size: number;
    duration: number;
    reverse?: boolean;
    className?: string;
}) {
    const r = size / 2;
    return (
        <div
            aria-hidden="true"
            className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none ${className}`}
            style={{ width: size, height: size }}
        >
            <div
                className={`orbit relative w-full h-full rounded-full border border-dashed border-gold/40 ${reverse ? "is-reverse" : ""}`}
                style={{ ["--orbit-duration" as string]: `${duration}s` }}
            >
                {chips.map(({ icon: Icon, angle }) => {
                    const rad = (angle * Math.PI) / 180;
                    return (
                        <span
                            key={angle}
                            className="absolute -translate-x-1/2 -translate-y-1/2"
                            style={{ left: r + r * Math.cos(rad), top: r + r * Math.sin(rad) }}
                        >
                            <span className="orbit-counter flex w-14 h-14 items-center justify-center rounded-2xl border border-gold/60 bg-paper text-coral shadow-[0_12px_28px_-14px_rgba(120,70,30,0.55)]">
                                <Icon className="w-6 h-6" strokeWidth={1.7} />
                            </span>
                        </span>
                    );
                })}
            </div>
        </div>
    );
}

export function CTA() {
    return (
        <PointerField
            as="section"
            className="grain relative isolate overflow-hidden py-40 md:py-56 px-6"
            style={{ background: "linear-gradient(180deg, #FDF6ED 0%, #FFE9D6 45%, #FCD4B8 100%)" }}
        >
            {/* Anchor the sticky CTA watches, so it steps aside here */}
            <div id="final-cta" className="absolute inset-0 pointer-events-none" aria-hidden="true" />

            {/* Deco doorway: two nested gold arches behind the message */}
            <div aria-hidden="true" className="absolute left-1/2 bottom-0 -translate-x-1/2 -z-10 w-[min(92vw,780px)] h-[88%]">
                <div className="depth absolute inset-0 arch border border-gold/70" style={{ ["--d" as string]: "6px" }} />
                <div
                    className="depth absolute inset-[22px] arch border border-gold/40 bg-gradient-to-b from-[#FFF8EE]/80 to-[#FFE6CF]/40"
                    style={{ ["--d" as string]: "10px" }}
                />
            </div>

            <Ring chips={inner} size={940} duration={52} className="-z-10 hidden lg:block" />
            <Ring chips={outer} size={1260} duration={80} reverse className="-z-10 hidden xl:block" />

            <PalmCluster
                fronds={SPRIG}
                className="left-0 top-0 w-[360px] h-[520px] origin-top-left scale-[0.7] md:scale-100"
                depth={16}
                lean={3}
                pivot="0% 0%"
            />
            <PalmCluster
                fronds={SPRIG}
                className="hidden md:block right-0 top-0 w-[360px] h-[520px] origin-top scale-x-[-1]"
                depth={16}
                lean={-3}
                pivot="0% 0%"
            />

            <div className="relative max-w-3xl mx-auto text-center">
                <p className="type-eyebrow mb-6">Your move</p>
                <h2 className="type-display text-balance mb-7">
                    Hand off the <span className="accent-word">busywork</span>.
                </h2>
                <p className="text-lg md:text-xl text-body max-w-xl mx-auto mb-11">
                    Book an audit. We&apos;ll map where AI pays off in your business — and build it only if
                    you want us to.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Magnetic>
                        <Button size="xl" variant="hero" className="group h-16 px-9 text-xl" asChild>
                            <Link href="/book">
                                <Calendar className="mr-3 w-6 h-6" />
                                Book AI Audit
                                <ArrowRight className="ml-3 w-5 h-5 transition-transform group-hover:translate-x-1" />
                            </Link>
                        </Button>
                    </Magnetic>
                    <Magnetic pull={0.18}>
                        <Button size="xl" variant="heroOutline" className="h-16 px-9 text-xl bg-paper" asChild>
                            <Link href="/ai-readiness-quiz">Take the 2-minute quiz</Link>
                        </Button>
                    </Magnetic>
                </div>
            </div>
        </PointerField>
    );
}
