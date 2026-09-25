import type { CSSProperties } from "react";
import { Check, Home, Phone } from "lucide-react";

/**
 * Small, pure-CSS loops. Each one shows the specific kind of work a solution
 * takes off an owner's plate. They share a 6s cycle so a grid of them breathes
 * as one system rather than a dozen unrelated animations.
 *
 * Every animated element carries `data-loop`, which globals.css uses to stop
 * the animation and hold a sensible visible frame under reduced motion.
 */

const EASE = "var(--ease-spring)";

function loop(
    name: string,
    { duration = 6, delay = 0, timing = EASE }: { duration?: number; delay?: number; timing?: string } = {},
    extra: CSSProperties = {}
): CSSProperties {
    return { animation: `${name} ${duration}s ${timing} ${delay}s infinite both`, ...extra };
}

/* ------------------------------------------------------------------ */
/* Solution tiles                                                      */
/* ------------------------------------------------------------------ */

/** Customer service: a question answered and a booking confirmed. */
export function ChatLoop() {
    return (
        <div className="h-full flex flex-col justify-center gap-2 px-1">
            <div
                data-loop
                style={loop("pop-in-loop", { delay: 0 }, { transformOrigin: "bottom left" })}
                className="self-start rounded-2xl rounded-bl-md bg-sand/60 px-3 py-1.5 text-[11px] text-ink/85"
            >
                Any openings Saturday?
            </div>
            <div
                data-loop
                style={loop("pop-in-loop", { delay: 1.1 }, { transformOrigin: "bottom right" })}
                className="self-end rounded-2xl rounded-br-md bg-[image:var(--gradient-ai)] px-3 py-1.5 text-[11px] text-white"
            >
                Yes — 10 AM or 2 PM?
            </div>
            <div
                data-loop
                style={loop("pop-in-loop", { delay: 2.2 }, { transformOrigin: "bottom left" })}
                className="self-start rounded-2xl rounded-bl-md bg-sand/60 px-3 py-1.5 text-[11px] text-ink/85"
            >
                2 works, thanks!
            </div>
        </div>
    );
}

/**
 * Lead gen & CRM: a live pipeline. Lead cards step from New to Qualified to
 * Booked on their own — the work of chasing a lead, done without you. Two
 * cards run half a cycle apart so the board is never empty. Coloured in the
 * aqua of the hero's terrazzo mural.
 */
export function PipelineLoop() {
    const lanes = ["New lead", "Qualified", "Booked"];
    const cards = [
        { name: 64, delay: 0 },
        { name: 48, delay: -3.75 }
    ];
    // One step = one lane width + the gap between lanes.
    const CYCLE = 7.5;
    return (
        <div className="relative h-full" aria-hidden="true">
            <div className="absolute inset-0 flex gap-2">
                {lanes.map((lane, i) => (
                    <div
                        key={lane}
                        className="flex-1 rounded-xl border border-aqua/40 bg-aqua-soft/70 px-2 pt-2 pb-1.5 flex flex-col gap-1.5"
                    >
                        <div className="flex items-center justify-between">
                            <span className="font-label text-[9px] tracking-[0.14em] text-aqua-deep">{lane}</span>
                            <span className="text-[9px] font-semibold text-aqua-deep/70 tabular-nums">{[3, 2, 1][i]}</span>
                        </div>
                        {/* Resting cards already in the lane */}
                        <span className="h-7 rounded-lg bg-white/55 border border-aqua/20" />
                        <span className="h-7 rounded-lg bg-white/35 border border-aqua/15" />
                    </div>
                ))}
            </div>

            {cards.map((c, i) => (
                <div
                    key={i}
                    data-loop
                    data-loop-hide={i === 1 ? true : undefined}
                    className="absolute left-2 top-[30px] h-7"
                    style={{
                        width: "calc((100% - 16px) / 3 - 16px)",
                        ["--step" as string]: "calc(100% + 24px)",
                        animation: `pipeline-move ${CYCLE}s var(--ease-spring) ${c.delay}s infinite both`
                    }}
                >
                    <div
                        className="h-full rounded-lg border border-aqua/60 shadow-[0_6px_14px_-8px_rgba(78,127,108,0.6)] flex items-center gap-1.5 px-2"
                        style={{ animation: `pipeline-flash ${CYCLE}s ease ${c.delay}s infinite both` }}
                    >
                        <span className="w-3.5 h-3.5 rounded-full bg-aqua shrink-0" />
                        <span className="h-1.5 rounded-full bg-aqua-deep/50" style={{ width: c.name }} />
                        <span
                            className="ml-auto w-3.5 h-3.5 rounded-full bg-aqua-deep text-white flex items-center justify-center shrink-0"
                            style={{ animation: `pipeline-check ${CYCLE}s var(--ease-spring) ${c.delay}s infinite both` }}
                        >
                            <Check className="w-2.5 h-2.5" strokeWidth={3.5} />
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );
}

/** Voice AI: the phone rings, the agent talks. */
export function VoiceLoop() {
    const bars = [14, 26, 40, 22, 46, 30, 18, 36, 24, 12, 28];
    return (
        <div className="h-full flex items-center justify-center gap-5">
            <div className="relative w-12 h-12 rounded-full bg-teal/10 text-teal-deep flex items-center justify-center">
                <span
                    data-loop
                    className="absolute inset-0 rounded-full border border-teal/60"
                    style={loop("ping-ring", { duration: 2.4 })}
                />
                <Phone className="w-5 h-5" />
            </div>
            <div className="flex items-center gap-[3px] h-12" aria-hidden="true">
                {bars.map((h, i) => (
                    <span
                        key={i}
                        data-loop
                        className="w-[3px] rounded-full bg-[image:var(--gradient-ai)]"
                        style={loop(
                            "eq-bar",
                            { duration: 1.1, delay: i * 0.09, timing: "ease-in-out" },
                            { height: h, transformOrigin: "center" }
                        )}
                    />
                ))}
            </div>
        </div>
    );
}

/** Marketing: a month of posts landing on the calendar. */
export function CalendarLoop() {
    const posts = new Set([1, 3, 6, 9, 11, 14, 16, 19]);
    const colors = ["#F4774B", "#FFB27A", "#1DBCA0"];
    let order = 0;
    return (
        <div className="h-full flex items-center justify-center">
            <div className="grid grid-cols-7 gap-1.5" aria-hidden="true">
                {Array.from({ length: 21 }, (_, i) => {
                    const isPost = posts.has(i);
                    const n = isPost ? order++ : 0;
                    return (
                        <span key={i} className="relative w-5 h-5 rounded-[5px] bg-sand/60 border border-gold-soft">
                            {isPost && (
                                <span
                                    data-loop
                                    className="absolute inset-0.5 rounded-[3px]"
                                    style={loop(
                                        "cell-fill",
                                        { delay: n * 0.32 },
                                        { backgroundColor: colors[n % colors.length] }
                                    )}
                                />
                            )}
                        </span>
                    );
                })}
            </div>
        </div>
    );
}

/** Operations: invoices go out, one after another. */
export function InvoiceLoop() {
    return (
        <div className="relative h-full flex flex-col justify-center gap-2.5 px-1">
            {[0, 1, 2].map((i) => (
                <div key={i} className="flex items-center gap-3">
                    <span className="w-6 h-7 rounded-[4px] bg-sand/60 border border-gold-soft flex flex-col justify-center gap-[3px] px-1">
                        <span className="h-[2px] rounded bg-sand" />
                        <span className="h-[2px] w-2/3 rounded bg-sand" />
                    </span>
                    <span className="h-2 rounded-full bg-sand" style={{ width: 64 + i * 14 }} />
                    <svg viewBox="0 0 20 20" className="w-5 h-5 ml-auto text-teal-deep" aria-hidden="true">
                        <circle cx="10" cy="10" r="9" fill="rgba(29,188,160,0.14)" />
                        <path
                            data-loop
                            d="M6 10.5 L9 13.5 L14.5 7"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeDasharray="24"
                            style={loop("check-draw", { delay: i * 0.8 })}
                        />
                    </svg>
                </div>
            ))}
            <span
                data-loop
                style={loop("stamp-in", { delay: 0.4 })}
                className="absolute right-8 top-1/2 -translate-y-1/2 rounded-md border-2 border-teal px-2 py-0.5 font-label text-[11px] font-bold uppercase tracking-widest text-teal-deep bg-paper"
            >
                Sent
            </span>
        </div>
    );
}

/** Real estate: an inquiry comes in, a showing gets booked. */
export function HouseLoop() {
    return (
        <div className="flex items-center gap-4">
            <div className="relative w-14 h-14 rounded-2xl bg-sand/60 border border-gold-soft flex items-center justify-center text-ink">
                <span
                    data-loop
                    className="absolute inset-0 rounded-2xl border border-amber/60"
                    style={loop("ping-ring", { duration: 2.4 })}
                />
                <Home className="w-6 h-6" />
            </div>
            <div className="relative h-8 w-52">
                <span
                    data-loop
                    data-loop-hide
                    style={loop("chip-swap-a", { timing: "ease-in-out" })}
                    className="absolute inset-y-0 left-0 flex items-center gap-2 rounded-full border border-amber/40 bg-amber/10 px-3 text-xs text-amber whitespace-nowrap"
                >
                    <span className="status-dot bg-amber" />
                    New inquiry · 8:14 PM
                </span>
                <span
                    data-loop
                    style={loop("chip-swap-b", { timing: "ease-in-out" })}
                    className="absolute inset-y-0 left-0 flex items-center gap-2 rounded-full border border-teal/40 bg-teal/10 px-3 text-xs text-teal-deep whitespace-nowrap"
                >
                    <Check className="w-3.5 h-3.5" strokeWidth={3} />
                    Showing booked · Saturday
                </span>
            </div>
        </div>
    );
}

/* ------------------------------------------------------------------ */
/* Process steps                                                       */
/* ------------------------------------------------------------------ */

/** Audit: a scan passes over the workflow and flags the step worth fixing. */
export function AuditLoop() {
    return (
        <div className="relative h-full flex items-center justify-center overflow-hidden rounded-2xl">
            <div className="relative flex items-center" aria-hidden="true">
                {[0, 1, 2].map((i) => (
                    <div key={i} className="flex items-center">
                        <span
                            data-loop={i === 1 ? true : undefined}
                            className="w-11 h-11 rounded-xl border border-gold-soft bg-sand/60"
                            style={i === 1 ? loop("node-light", { duration: 3, timing: "ease-in-out" }) : undefined}
                        />
                        {i < 2 && <span className="w-7 h-px bg-sand" />}
                    </div>
                ))}
            </div>
            <span
                data-loop
                className="absolute inset-y-0 left-0 w-full"
                style={loop(
                    "scan-sweep",
                    { duration: 3, timing: "linear" },
                    {
                        background:
                            "linear-gradient(90deg, transparent 44%, rgba(244,119,75,0.3) 50%, transparent 56%)"
                    }
                )}
            />
        </div>
    );
}

/** Roadmap: the path draws itself, stops appear in order. */
export function RoadmapLoop() {
    const pins = [
        { x: 22, y: 70, delay: 0.3 },
        { x: 100, y: 26, delay: 1.3 },
        { x: 178, y: 58, delay: 2.3 }
    ];
    return (
        <div className="h-full flex items-center justify-center">
            <svg viewBox="0 0 200 96" className="w-full max-w-[220px] h-auto overflow-visible" aria-hidden="true">
                <defs>
                    <linearGradient id="roadmap-stroke" x1="0" x2="1">
                        <stop offset="0%" stopColor="#FFB27A" />
                        <stop offset="50%" stopColor="#F4774B" />
                        <stop offset="100%" stopColor="#E25C44" />
                    </linearGradient>
                </defs>
                <path
                    d="M22 70 C 60 72, 62 24, 100 26 S 150 64, 178 58"
                    fill="none"
                    stroke="rgba(6,32,28,0.1)"
                    strokeWidth="3"
                    strokeLinecap="round"
                />
                <path
                    data-loop
                    d="M22 70 C 60 72, 62 24, 100 26 S 150 64, 178 58"
                    fill="none"
                    stroke="url(#roadmap-stroke)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    pathLength={1}
                    strokeDasharray="1"
                    style={loop("path-draw", { duration: 6, timing: "ease-in-out" }, { ["--len" as string]: 1 })}
                />
                {pins.map((p, i) => (
                    <g
                        key={i}
                        data-loop
                        style={loop(
                            "pin-pop",
                            { delay: p.delay },
                            { transformOrigin: `${p.x}px ${p.y}px`, transformBox: "view-box" }
                        )}
                    >
                        <circle cx={p.x} cy={p.y} r="10" fill="#FFFBF5" stroke="#C9A46A" strokeOpacity="1" strokeWidth="1.5" />
                        <text
                            x={p.x}
                            y={p.y + 3.5}
                            textAnchor="middle"
                            fontSize="10"
                            fontWeight="700"
                            fill="#06201C"
                            style={{ fontFamily: "var(--font-inter)" }}
                        >
                            {i + 1}
                        </text>
                    </g>
                ))}
            </svg>
        </div>
    );
}

/** Build: pieces snap into place, then it's handled. */
export function BuildLoop() {
    const blocks = [
        { cls: "col-span-2", from: ["-28px", "0px"], delay: 0 },
        { cls: "", from: ["0px", "-22px"], delay: 0.5 },
        { cls: "", from: ["28px", "0px"], delay: 1 },
        { cls: "col-span-2", from: ["0px", "22px"], delay: 1.5 }
    ];
    return (
        <div className="relative h-full flex items-center justify-center">
            <div className="grid grid-cols-2 gap-1.5 w-28" aria-hidden="true">
                {blocks.map((b, i) => (
                    <span
                        key={i}
                        data-loop
                        className={`h-5 rounded-md bg-[image:var(--gradient-ai)] ${b.cls}`}
                        style={loop(
                            "block-snap",
                            { delay: b.delay },
                            { ["--from-x" as string]: b.from[0], ["--from-y" as string]: b.from[1], opacity: 0.9 - i * 0.12 }
                        )}
                    />
                ))}
            </div>
            <span
                data-loop
                style={loop("stamp-in", { delay: 0.8 })}
                className="absolute right-[18%] top-[18%] w-8 h-8 rounded-full bg-teal text-white flex items-center justify-center shadow-[0_0_20px_rgba(29,188,160,0.45)]"
            >
                <Check className="w-4 h-4" strokeWidth={3} />
            </span>
        </div>
    );
}
