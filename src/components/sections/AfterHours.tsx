import Link from "next/link";
import { ArrowRight, BookOpen, CalendarCheck, Flag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AfterHoursChat } from "@/components/loops/AfterHoursChat";
import { PointerField } from "@/components/art/PointerField";
import { TiltCard } from "@/components/art/TiltCard";
import { DecoArch } from "@/components/art/DecoArch";

const points = [
    { icon: BookOpen, text: "Answers from your own FAQ, services, and pricing — not guesses." },
    { icon: CalendarCheck, text: "Books straight onto your calendar, the way you'd book it." },
    { icon: Flag, text: "Flags anything unusual for you, with the full conversation attached." }
];

export function AfterHours() {
    return (
        <PointerField as="section" className="relative py-28 md:py-36 overflow-hidden">
            <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
                {/* The phone stands in the Deco arch, sunset behind it, and tilts toward the cursor */}
                <div className="order-2 lg:order-1 relative flex justify-center py-6">
                    <div className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                        <DecoArch className="w-[430px] h-[600px]" />
                    </div>
                    <div className="relative w-full max-w-[340px]">
                        <TiltCard className="rounded-[2.6rem]" strength={0.8}>
                            <AfterHoursChat />
                        </TiltCard>
                    </div>
                </div>

                <div className="order-1 lg:order-2 max-w-xl">
                    <p className="type-eyebrow mb-4">After hours</p>
                    <h2 className="type-section font-heading text-ink text-balance mb-6">
                        The phone rings at 11:48 PM. <span className="accent-word">It still gets answered.</span>
                    </h2>
                    <p className="text-lg text-body leading-relaxed text-pretty mb-8">
                        A customer who can&apos;t reach you tonight may try the next business on the list.
                        An AI assistant picks up, answers the question, and books the job — then hands
                        you anything tricky in the morning.
                    </p>

                    <ul className="space-y-4 mb-10">
                        {points.map((p) => (
                            <li key={p.text} className="flex gap-4">
                                <span className="mt-0.5 w-9 h-9 shrink-0 rounded-xl bg-teal/10 text-teal-deep flex items-center justify-center">
                                    <p.icon className="w-4 h-4" />
                                </span>
                                <span className="text-body leading-relaxed pt-1.5">{p.text}</span>
                            </li>
                        ))}
                    </ul>

                    <div className="flex flex-col sm:flex-row gap-3.5">
                        <Button size="lg" variant="hero" asChild>
                            <Link href="/book">Book AI Audit</Link>
                        </Button>
                        <Button size="lg" variant="heroOutline" className="group" asChild>
                            <Link href="/ai-customer-service-small-business">
                                See customer service AI
                                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </PointerField>
    );
}
