import {
    BellRing,
    CalendarCheck,
    ClipboardList,
    FileText,
    Filter,
    Mail,
    MessageCircleQuestion,
    Megaphone,
    PhoneIncoming,
    Receipt,
    RefreshCw,
    Star,
    UserCheck,
    Wrench,
    Mic,
    Database,
    type LucideIcon
} from "lucide-react";

/**
 * Two rows of real busywork drifting past in opposite directions. It answers
 * "what could you actually take off my plate?" in plain language, faster than
 * any paragraph, and pauses on hover so anything interesting can be read.
 */

type Chip = { icon: LucideIcon; label: string };

const ROW_A: Chip[] = [
    { icon: PhoneIncoming, label: "Answer after-hours calls" },
    { icon: Receipt, label: "Chase unpaid invoices" },
    { icon: FileText, label: "Send quotes" },
    { icon: CalendarCheck, label: "Book appointments" },
    { icon: Star, label: "Ask for reviews" },
    { icon: RefreshCw, label: "Follow up with every lead" },
    { icon: BellRing, label: "Remind no-shows" },
    { icon: Database, label: "Keep your CRM up to date" }
];

const ROW_B: Chip[] = [
    { icon: Megaphone, label: "Draft social posts" },
    { icon: UserCheck, label: "Onboard new clients" },
    { icon: MessageCircleQuestion, label: "Answer the same questions" },
    { icon: Filter, label: "Qualify new leads" },
    { icon: Wrench, label: "Schedule jobs" },
    { icon: Mail, label: "Send follow-up emails" },
    { icon: ClipboardList, label: "Collect intake forms" },
    { icon: Mic, label: "Summarize every call" }
];

function Row({ chips, reverse, duration }: { chips: Chip[]; reverse?: boolean; duration: number }) {
    // The track holds two copies and translates by -50%, so the loop is seamless.
    // Spacing is a trailing margin on each chip, not flex `gap`: with gap, half
    // the track is half a gap short of one period and the loop visibly hitches.
    const doubled = [...chips, ...chips];
    return (
        <div className="marquee overflow-hidden">
            <div
                className={`marquee-track ${reverse ? "is-reverse" : ""}`}
                style={{ ["--marquee-duration" as string]: `${duration}s` }}
            >
                {doubled.map((chip, i) => {
                    const Icon = chip.icon;
                    return (
                        <span
                            key={i}
                            aria-hidden={i >= chips.length ? "true" : undefined}
                            className="mr-3 flex items-center gap-2.5 whitespace-nowrap rounded-full border border-gold-soft bg-paper/70 pl-2 pr-4 py-2 text-sm text-body"
                        >
                            <span className="w-7 h-7 rounded-full bg-sand/60 flex items-center justify-center">
                                <Icon className="w-3.5 h-3.5 text-body" />
                            </span>
                            {chip.label}
                        </span>
                    );
                })}
            </div>
        </div>
    );
}

export function TaskMarquee() {
    return (
        <section aria-label="Busywork we can take off your plate" className="relative py-14 border-y border-gold-soft bg-paper/70">
            <p className="text-center font-label text-[11px] uppercase tracking-[0.18em] text-quiet mb-7">
                The busywork we take off your plate
            </p>
            <div className="space-y-3">
                <Row chips={ROW_A} duration={52} />
                <Row chips={ROW_B} duration={60} reverse />
            </div>
        </section>
    );
}
