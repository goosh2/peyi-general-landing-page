"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
    CalendarX,
    Check,
    FileText,
    Mail,
    Moon,
    PhoneMissed,
    Sparkle,
    Receipt,
    Star,
    UserPlus,
    type LucideIcon
} from "lucide-react";
import { useLoopActive } from "./use-loop-active";

/**
 * The hero's signature loop: a night of small-business busywork arriving and
 * getting handled while the owner is off the clock.
 *
 * Every row walks the site-wide status grammar — amber "Incoming", the AI
 * gradient "Working", teal "Handled". It's an illustrative example, labelled as
 * such, and it deliberately shows no counters or totals: nothing here should
 * read as a performance claim.
 */

type Task = {
    icon: LucideIcon;
    tint: "coral" | "teal";
    time: string;
    source: string;
    detail: string;
    working: string;
    outcome: string;
};

const TASKS: Task[] = [
    {
        icon: PhoneMissed,
        tint: "teal",
        time: "9:42 PM",
        source: "Missed call",
        detail: "New customer, after hours",
        working: "Calling back…",
        outcome: "Called back · booked Thursday 10:00"
    },
    {
        icon: FileText,
        tint: "coral",
        time: "10:17 PM",
        source: "Quote request",
        detail: "Repair job, via your website",
        working: "Drafting quote…",
        outcome: "Quote drafted for your approval"
    },
    {
        icon: Receipt,
        tint: "teal",
        time: "11:03 PM",
        source: "Invoice overdue",
        detail: "Payment is a week late",
        working: "Writing reminder…",
        outcome: "Friendly reminder sent"
    },
    {
        icon: UserPlus,
        tint: "coral",
        time: "11:48 PM",
        source: "New lead",
        detail: "Form fill from Google",
        working: "Qualifying…",
        outcome: "Qualified · added to your CRM"
    },
    {
        icon: Star,
        tint: "coral",
        time: "12:36 AM",
        source: "Job completed",
        detail: "Customer marked it done",
        working: "Asking for a review…",
        outcome: "Review request sent"
    },
    {
        icon: CalendarX,
        tint: "teal",
        time: "1:52 AM",
        source: "No-show",
        detail: "Missed their 3:00 slot",
        working: "Rescheduling…",
        outcome: "Rebooked for Monday"
    },
    {
        icon: Mail,
        tint: "coral",
        time: "5:40 AM",
        source: "Support email",
        detail: "“What are your hours?”",
        working: "Answering…",
        outcome: "Answered from your FAQ"
    }
];

const VISIBLE_ROWS = 4;
const NEW_TASK_EVERY_MS = 2600;

type Item = { key: number; task: number; fresh: boolean };

/* ------------------------------------------------------------------ */

type Phase = 0 | 1 | 2; // incoming → working → handled

function StatusPill({ phase }: { phase: Phase }) {
    return (
        <div className="flex items-center gap-2 justify-end min-w-[18px] sm:min-w-[92px]">
            <AnimatePresence mode="wait" initial={false}>
                {phase === 0 && (
                    <motion.span
                        key="in"
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ type: "spring", bounce: 0, duration: 0.3 }}
                        className="flex items-center gap-2 text-amber"
                    >
                        <span className="status-dot is-live bg-amber" />
                        <span className="hidden sm:inline font-label text-[11px]">Incoming</span>
                    </motion.span>
                )}
                {phase === 1 && (
                    <motion.span
                        key="work"
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ type: "spring", bounce: 0, duration: 0.3 }}
                        className="flex items-center gap-2.5 text-quiet"
                    >
                        <span className="shimmer-bar block w-8 sm:w-16 h-[5px] rounded-full" />
                        <span className="hidden sm:inline font-label text-[11px]">Working</span>
                    </motion.span>
                )}
                {phase === 2 && (
                    <motion.span
                        key="done"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ type: "spring", bounce: 0.35, duration: 0.45 }}
                        className="flex items-center gap-2.5 text-teal-deep"
                    >
                        <span className="w-6 h-6 rounded-full bg-teal text-white flex items-center justify-center shadow-[0_4px_10px_-3px_rgba(29,188,160,0.7)]">
                            <Check className="w-3.5 h-3.5" strokeWidth={3} />
                        </span>
                        <span className="hidden sm:inline font-label text-[11px]">Handled</span>
                    </motion.span>
                )}
            </AnimatePresence>
        </div>
    );
}

function Row({ item }: { item: Item }) {
    const task = TASKS[item.task];
    const [phase, setPhase] = useState<Phase>(item.fresh ? 0 : 2);

    useEffect(() => {
        if (!item.fresh) return;
        const toWorking = setTimeout(() => setPhase(1), 750);
        const toDone = setTimeout(() => setPhase(2), 2050);
        return () => {
            clearTimeout(toWorking);
            clearTimeout(toDone);
        };
    }, [item.fresh]);

    const Icon = task.icon;
    const line = phase === 0 ? task.detail : phase === 1 ? task.working : task.outcome;

    return (
        <motion.li
            layout
            initial={item.fresh ? { opacity: 0, y: -18, scale: 0.97 } : false}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 14, transition: { duration: 0.25 } }}
            transition={{ type: "spring", bounce: 0, duration: 0.5 }}
            className={`grid grid-cols-[auto_1fr_auto] items-center gap-3.5 rounded-2xl px-4 py-3.5 border transition-colors duration-500 shadow-[0_6px_16px_-12px_rgba(80,50,20,0.35)] ${
                phase === 2
                    ? "bg-paper border-gold-soft/80"
                    : phase === 1
                      ? "bg-white border-gold/50"
                      : "bg-[#FFF6E6] border-amber/40"
            }`}
        >
            <div
                className={`w-11 h-11 rounded-xl flex items-center justify-center ${
                    task.tint === "teal" ? "bg-[#DDF3EC] text-teal-deep" : "bg-[#FFEDE0] text-coral"
                }`}
            >
                <Icon className="w-5 h-5" strokeWidth={1.8} />
            </div>

            <div className="min-w-0">
                <div className="flex items-baseline gap-2">
                    <span className="text-[15px] font-semibold text-ink truncate">{task.source}</span>
                    <span className="text-[12px] text-quiet shrink-0">{task.time}</span>
                </div>
                <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                        key={phase}
                        initial={{ opacity: 0, x: -4 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 4 }}
                        transition={{ duration: 0.2 }}
                        className={`text-[13px] truncate ${phase === 2 ? "text-body" : "text-quiet"}`}
                    >
                        {line}
                    </motion.div>
                </AnimatePresence>
            </div>

            <StatusPill phase={phase} />
        </motion.li>
    );
}

/* ------------------------------------------------------------------ */

const INITIAL: Item[] = [3, 2, 1, 0].map((task, i) => ({ key: -1 - i, task, fresh: false }));

export function AutopilotBoard() {
    const ref = useRef<HTMLDivElement>(null);
    const active = useLoopActive(ref, 0.3);
    const [items, setItems] = useState<Item[]>(INITIAL);
    const next = useRef(4);

    useEffect(() => {
        if (!active) return;
        const id = setInterval(() => {
            const n = next.current++;
            setItems((prev) =>
                [{ key: n, task: n % TASKS.length, fresh: true }, ...prev].slice(0, VISIBLE_ROWS)
            );
        }, NEW_TASK_EVERY_MS);
        return () => clearInterval(id);
    }, [active]);

    const clock = TASKS[items[0].task].time;

    return (
        <div ref={ref} className="relative">
            {/* Ambient light behind the board */}
            <div className="absolute -inset-10 -z-10 pointer-events-none">
                <div className="drift absolute top-4 right-6 w-64 h-64 rounded-full bg-[#FFC295]/40 blur-[90px]" />
            </div>

            <div className="surface-floating rounded-[2rem] p-4 sm:p-5">
                {/* Header */}
                <div className="flex items-center justify-between px-2 pt-1 pb-4">
                    <div className="flex items-center gap-2.5 text-teal">
                        <span className="status-dot is-live bg-teal" />
                        <span className="font-label text-[12px] tracking-[0.22em] text-ink/80">
                            Peyi · Autopilot
                        </span>
                    </div>
                    <div className="flex items-center gap-1.5 rounded-full border border-gold-soft bg-paper px-3 py-1.5">
                        <Moon className="w-3.5 h-3.5 text-quiet" />
                        <span className="text-[12px] text-ink/80 tabular-nums">{clock}</span>
                    </div>
                </div>

                {/* The queue. Hidden from assistive tech — a constantly changing list
                    is noise there; the sr-only summary carries the meaning. */}
                <p className="sr-only">
                    An example of after-hours tasks being handled automatically: missed calls returned,
                    quotes drafted, overdue invoices chased, leads qualified, reviews requested, no-shows
                    rebooked, and support emails answered.
                </p>
                <ul aria-hidden="true" className="relative h-[330px] overflow-hidden space-y-2.5">
                    <AnimatePresence initial={false} mode="popLayout">
                        {items.map((item) => (
                            <Row key={item.key} item={item} />
                        ))}
                    </AnimatePresence>
                </ul>

                {/* Footer */}
                <div className="mt-3 flex items-center justify-between gap-3 rounded-2xl border border-gold-soft/80 bg-paper px-4 py-3">
                    <div className="flex items-center gap-2.5 text-[15px] text-body">
                        <Sparkle className="w-5 h-5 text-gold fill-gold" />
                        <span>
                            You: <span className="text-ink font-medium">off the clock</span>
                        </span>
                    </div>
                    <span className="font-label text-[9px] tracking-[0.22em] text-quiet/80">
                        Illustrative example
                    </span>
                </div>
            </div>
        </div>
    );
}
