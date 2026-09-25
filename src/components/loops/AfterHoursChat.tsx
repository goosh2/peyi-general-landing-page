"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarCheck } from "lucide-react";
import { useLoopActive } from "./use-loop-active";

/**
 * A looped example text conversation: a customer messages late at night and an
 * AI assistant answers, offers a slot, and books it onto the calendar.
 *
 * The full conversation is rendered on the server and for reduced motion, so
 * the content never depends on the animation running.
 */

type Message =
    | { kind: "in" | "out"; text: string; at: number; typingFrom?: number }
    | { kind: "event"; text: string; at: number; typingFrom?: undefined };

const SCRIPT: Message[] = [
    { kind: "in", text: "Hi — our water heater is leaking. Can someone come out tomorrow?", at: 700 },
    {
        kind: "out",
        text: "So sorry — that's no fun. We can get a technician out tomorrow. Morning or afternoon?",
        typingFrom: 1800,
        at: 3300
    },
    { kind: "in", text: "Morning, please.", at: 5200 },
    {
        kind: "out",
        text: "Done. You're booked tomorrow, 9–11 AM. We'll text when the tech is on the way.",
        typingFrom: 6000,
        at: 7600
    },
    { kind: "event", text: "Added to your calendar · Tomorrow 9:00 AM", at: 8900 }
];

const CYCLE_MS = 13000;

export function AfterHoursChat() {
    const ref = useRef<HTMLDivElement>(null);
    const active = useLoopActive(ref, 0.45);

    // Server render and reduced motion show the whole exchange.
    const [shown, setShown] = useState(SCRIPT.length);
    const [typing, setTyping] = useState(false);
    const [cycle, setCycle] = useState(0);

    useEffect(() => {
        if (!active) return;
        const timers: ReturnType<typeof setTimeout>[] = [];

        timers.push(
            setTimeout(() => {
                setShown(0);
                setTyping(false);
            }, 0)
        );

        SCRIPT.forEach((m, i) => {
            if (m.typingFrom) timers.push(setTimeout(() => setTyping(true), m.typingFrom));
            timers.push(
                setTimeout(() => {
                    setTyping(false);
                    setShown(i + 1);
                }, m.at)
            );
        });

        timers.push(setTimeout(() => setCycle((c) => c + 1), CYCLE_MS));
        return () => timers.forEach(clearTimeout);
    }, [active, cycle]);

    return (
        <div ref={ref} className="relative mx-auto w-full max-w-[340px]">
            <div className="drift absolute -inset-12 -z-10 rounded-full bg-[#D9E0D2]/70 blur-[90px] pointer-events-none" />

            {/* Phone */}
            <div className="rounded-[2.6rem] p-2.5 bg-gradient-to-b from-[#E7D2A8] via-[#D8BD8B] to-[#C9A46A] shadow-[0_40px_80px_-30px_rgba(80,50,20,0.45),inset_0_1px_0_rgba(255,255,255,0.6)]">
                <div className="rounded-[2.1rem] bg-paper overflow-hidden border border-gold-soft">
                    {/* Header */}
                    <div className="flex items-center gap-3 px-5 pt-6 pb-4 border-b border-gold-soft">
                        <div className="relative w-10 h-10 rounded-full bg-[image:var(--gradient-ai)] flex items-center justify-center font-heading font-bold text-white text-sm">
                            YB
                            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-teal border-2 border-paper" />
                        </div>
                        <div>
                            <div className="text-sm font-semibold text-ink">Your Business</div>
                            <div className="font-label text-[10px] uppercase tracking-wider text-teal-deep">
                                AI assistant · replies instantly
                            </div>
                        </div>
                    </div>

                    {/* Thread */}
                    <div className="h-[420px] px-4 py-4 flex flex-col gap-2.5 overflow-hidden">
                        <div className="text-center font-label text-[10px] text-quiet/70 mb-1">
                            Today · 11:48 PM
                        </div>

                        <AnimatePresence initial={false}>
                            {SCRIPT.slice(0, shown).map((m) =>
                                m.kind === "event" ? (
                                    <motion.div
                                        key={m.text}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ type: "spring", bounce: 0.35, duration: 0.5 }}
                                        className="mt-1 self-center flex items-center gap-2 rounded-full border border-teal/40 bg-teal/10 px-3 py-1.5 text-[11px] text-teal-deep"
                                    >
                                        <CalendarCheck className="w-3.5 h-3.5" />
                                        {m.text}
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key={m.text}
                                        initial={{ opacity: 0, y: 10, scale: 0.96 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                                        style={{ transformOrigin: m.kind === "in" ? "bottom left" : "bottom right" }}
                                        className={`max-w-[82%] px-3.5 py-2.5 text-[13px] leading-snug ${
                                            m.kind === "in"
                                                ? "self-start rounded-2xl rounded-bl-md bg-[#EFE6D8] text-ink"
                                                : "self-end rounded-2xl rounded-br-md bg-[image:var(--gradient-ai)] text-white"
                                        }`}
                                    >
                                        {m.text}
                                    </motion.div>
                                )
                            )}

                            {typing && (
                                <motion.div
                                    key="typing"
                                    initial={{ opacity: 0, y: 6 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                    className="self-end flex items-center gap-1 rounded-2xl rounded-br-md bg-sand/60 px-3.5 py-3"
                                    aria-hidden="true"
                                >
                                    <span className="typing-dot" />
                                    <span className="typing-dot" />
                                    <span className="typing-dot" />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            <p className="mt-4 text-center font-label text-[10px] uppercase tracking-wider text-quiet/70">
                Example conversation
            </p>
        </div>
    );
}
