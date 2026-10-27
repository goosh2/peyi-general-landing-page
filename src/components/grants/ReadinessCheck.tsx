"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AlertTriangle, ArrowRight, Calendar, Check, Download, FileText, Printer, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    COUNTRIES,
    QUESTIONS,
    SHORT_IDS,
    US_STATES,
    checklistText,
    isAnswered,
    isComplete,
    labelOf,
    locationLabel,
    score,
    visibleOptions,
    visibleQuestions,
    type Answers,
    type Question,
    type Result
} from "@/lib/grants/readiness";
import { BOOK_HREF, INTAKE_HREF, READINESS_HREF } from "@/lib/grants/config";

/* ------------------------------------------------------------------ */
/* One question, as a group of pill options (real radios/checkboxes)   */
/* ------------------------------------------------------------------ */

const control =
    "w-full rounded-2xl border border-gold-soft bg-paper px-4 py-2.5 text-[15px] text-ink placeholder:text-quiet/70 transition-[border-color,box-shadow] duration-200 hover:border-gold focus:outline-none focus:border-coral focus:shadow-[0_0_0_4px_rgba(224,80,106,0.14)]";

/** Country (US by default), then state or region, then city. Geography only: no street address. */
function LocationFields({
    answers,
    onChange,
    compact = false
}: {
    answers: Answers;
    onChange: (id: keyof Answers, value: string) => void;
    compact?: boolean;
}) {
    const country = answers.country ?? "US";
    return (
        <div className="mt-3.5 grid gap-3 sm:grid-cols-2">
            <label className="block">
                <span className="mb-1.5 block text-sm font-semibold text-ink">Country</span>
                <select className={control} value={country} onChange={(e) => onChange("country", e.target.value)}>
                    {COUNTRIES.map((c) => (
                        <option key={c.value} value={c.value}>
                            {c.label}
                        </option>
                    ))}
                </select>
            </label>
            {country === "other" && (
                <label className="block">
                    <span className="mb-1.5 block text-sm font-semibold text-ink">Country name</span>
                    <input
                        className={control}
                        value={answers.countryOther ?? ""}
                        maxLength={60}
                        onChange={(e) => onChange("countryOther", e.target.value)}
                        placeholder="Type your country"
                    />
                </label>
            )}
            {country === "US" ? (
                <label className="block">
                    <span className="mb-1.5 block text-sm font-semibold text-ink">State / District</span>
                    <select className={control} value={answers.usState ?? ""} onChange={(e) => onChange("usState", e.target.value)} required>
                        <option value="">Choose one</option>
                        {US_STATES.map((st) => (
                            <option key={st.value} value={st.value}>
                                {st.label}
                            </option>
                        ))}
                    </select>
                </label>
            ) : (
                !compact && (
                    <label className="block">
                        <span className="mb-1.5 block text-sm font-semibold text-ink">Region / department / province</span>
                        <input
                            className={control}
                            value={answers.region ?? ""}
                            maxLength={60}
                            onChange={(e) => onChange("region", e.target.value)}
                            placeholder="For example: Antioquia"
                        />
                    </label>
                )
            )}
            {!compact && (
                <label className="block sm:col-span-2">
                    <span className="mb-1.5 block text-sm font-semibold text-ink">City / metro area</span>
                    <input
                        className={control}
                        value={answers.city ?? ""}
                        maxLength={60}
                        onChange={(e) => onChange("city", e.target.value)}
                        placeholder="Your city"
                    />
                    <span className="mt-1.5 block text-sm text-quiet">For example: Atlanta, Seattle, Washington DC, Miami, Bogotá</span>
                </label>
            )}
        </div>
    );
}

function QuestionField({
    q,
    index,
    answers,
    onChange,
    compact = false
}: {
    q: Question;
    index: number;
    answers: Answers;
    onChange: (id: keyof Answers, value: string | string[]) => void;
    compact?: boolean;
}) {
    const value = q.kind === "location" ? undefined : answers[q.id as keyof Answers];
    const opts = visibleOptions(q, answers);
    const answered = q.multi ? true : isAnswered(q, answers);

    return (
        <fieldset className="rq relative grid grid-cols-[38px_1fr] gap-x-4 py-6 border-b border-gold-soft/70 last:border-b-0">
            <span
                aria-hidden="true"
                className={`mt-0.5 flex h-[34px] w-[34px] items-center justify-center rounded-full border font-heading italic text-sm transition-colors duration-300 ${
                    answered && (q.multi ? (value as string[] | undefined)?.length : true)
                        ? "bg-teal-deep border-teal-deep text-white"
                        : "border-gold text-gold-deep bg-paper"
                }`}
            >
                {answered && (q.multi ? (value as string[] | undefined)?.length : true) ? <Check className="h-4 w-4" strokeWidth={3} /> : String(index + 1).padStart(2, "0")}
            </span>
            <div>
                <legend className="font-heading font-semibold text-ink text-lg leading-snug">
                    {labelOf(q.label, answers)}
                    {q.hint && <span className="block mt-1 font-sans font-normal text-sm text-quiet">{q.hint}</span>}
                </legend>
                {q.kind === "location" && <LocationFields answers={answers} onChange={onChange} compact={compact} />}
                <div className={q.kind === "location" ? "hidden" : "mt-3.5 flex flex-wrap gap-2"}>
                    {opts.map((o) => {
                        const checked = q.multi ? ((value as string[] | undefined) ?? []).includes(o.value) : value === o.value;
                        return (
                            <label
                                key={o.value}
                                className={`group relative inline-flex cursor-pointer select-none items-center gap-2 rounded-full border px-4 py-2 text-[15px] transition-[background-color,border-color,color,transform] duration-200 active:scale-[0.97] ${
                                    checked
                                        ? "border-coral bg-coral text-white shadow-[0_8px_18px_-10px_rgba(194,59,87,0.8)]"
                                        : "border-gold-soft bg-paper text-ink hover:border-gold"
                                }`}
                            >
                                <input
                                    type={q.multi ? "checkbox" : "radio"}
                                    name={q.id}
                                    value={o.value}
                                    checked={checked}
                                    onChange={() => {
                                        const id = q.id as keyof Answers;
                                        if (q.multi) {
                                            const cur = (value as string[] | undefined) ?? [];
                                            onChange(id, checked ? cur.filter((v) => v !== o.value) : [...cur, o.value]);
                                        } else onChange(id, o.value);
                                    }}
                                    className="peer sr-only"
                                />
                                {q.multi && (
                                    <span
                                        aria-hidden="true"
                                        className={`flex h-4 w-4 items-center justify-center rounded-[5px] border ${checked ? "border-white bg-white/20" : "border-gold"}`}
                                    >
                                        {checked && <Check className="h-3 w-3" strokeWidth={3.5} />}
                                    </span>
                                )}
                                {o.label}
                                <span aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-full ring-coral/40 ring-offset-2 peer-focus-visible:ring-2" />
                            </label>
                        );
                    })}
                </div>
            </div>
        </fieldset>
    );
}

/* ------------------------------------------------------------------ */
/* Result                                                              */
/* ------------------------------------------------------------------ */

/** Typical hours per application, doing it yourself versus done-for-you. */
const EFFORT: [string, string, string][] = [
    ["Simple local application", "3–10 hours", "About 30 minutes of batch approvals per application"],
    ["Standard county or state application", "10–25 hours", "1–2 hours of review per application"],
    ["Complex federal or foundation application", "30–60+ hours", "2–4 hours of review per application"]
];

function ScoreRing({ value }: { value: number }) {
    const r = 58;
    const c = 2 * Math.PI * r;
    const [shown, setShown] = useState(0);
    useEffect(() => {
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        let raf = 0;
        if (reduce) {
            raf = requestAnimationFrame(() => setShown(value));
            return () => cancelAnimationFrame(raf);
        }
        const start = performance.now();
        const tick = (t: number) => {
            const k = Math.min(1, (t - start) / 1100);
            setShown(Math.round(value * (1 - Math.pow(1 - k, 3))));
            if (k < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    }, [value]);
    return (
        <div className="relative h-[150px] w-[150px] shrink-0">
            <svg viewBox="0 0 140 140" className="h-full w-full -rotate-90">
                <defs>
                    <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#F48C8A" />
                        <stop offset="100%" stopColor="#C23B57" />
                    </linearGradient>
                </defs>
                <circle cx="70" cy="70" r={r} fill="none" stroke="var(--color-sand)" strokeWidth="12" />
                <circle
                    cx="70"
                    cy="70"
                    r={r}
                    fill="none"
                    stroke="url(#ringGrad)"
                    strokeWidth="12"
                    strokeLinecap="round"
                    strokeDasharray={c}
                    strokeDashoffset={c * (1 - shown / 100)}
                />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-heading text-5xl font-extrabold text-ink tabular-nums leading-none">{shown}</span>
                <span className="font-label text-[10px] text-quiet mt-1">out of 100</span>
            </div>
        </div>
    );
}

function ResultView({ r, onReset }: { r: Result; onReset: () => void }) {
    const download = () => {
        const blob = new Blob([checklistText(r)], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "peyi-grant-readiness-checklist.txt";
        a.click();
        URL.revokeObjectURL(url);
    };
    const tone = r.band.tone === "ready" ? "text-teal-deep" : r.band.tone === "nearly" ? "text-gold-deep" : "text-coral-deep";

    return (
        <div id="readiness-result" className="scroll-mt-28 space-y-8" aria-live="polite">
            {/* 1. Score + sub-scores */}
            <section className="rise rounded-[1.75rem] border border-gold-soft bg-paper p-7 md:p-10 shadow-[0_40px_70px_-50px_rgba(120,50,50,0.55)]">
                <p className="type-eyebrow mb-6">Your Grant Readiness</p>
                <div className="flex flex-col md:flex-row gap-8 md:items-center">
                    <ScoreRing value={r.total} />
                    <div>
                        <h2 className={`font-heading text-3xl md:text-4xl font-bold ${tone}`}>{r.band.label}</h2>
                        <p className="mt-3 text-lg text-body leading-relaxed max-w-xl">{r.band.copy}</p>
                    </div>
                </div>
                <div className="mt-9 grid gap-5 sm:grid-cols-2">
                    {r.subs.map((s, i) => (
                        <div key={s.area}>
                            <div className="flex items-baseline justify-between">
                                <span className="font-heading font-semibold text-ink">{s.area}</span>
                                <span className="font-heading font-bold text-ink tabular-nums">
                                    {s.score}
                                    <span className="text-quiet font-normal">/25</span>
                                </span>
                            </div>
                            <div className="mt-2 h-2 rounded-full bg-sand overflow-hidden">
                                <div
                                    className="h-full rounded-full bg-[image:var(--gradient-ai)] origin-left transition-transform duration-1000 ease-[var(--ease-spring)]"
                                    style={{ transform: `scaleX(${s.score / 25})`, transitionDelay: `${i * 120}ms` }}
                                />
                            </div>
                            <p className="mt-2 text-sm text-quiet leading-snug">{s.note}</p>
                        </div>
                    ))}
                </div>
                {r.federalBlocked && (
                    <p className="mt-7 flex gap-3 rounded-2xl border border-coral/30 bg-coral/[0.06] p-4 text-[15px] text-body">
                        <AlertTriangle className="h-5 w-5 shrink-0 text-coral-deep mt-0.5" />
                        <span>
                            <strong className="text-ink">Federal applications are blocked</strong> until your SAM.gov registration is active. Local, county,
                            state and foundation programs aren&apos;t affected by this.
                        </span>
                    </p>
                )}
                {r.deadlineNote && (
                    <p className="mt-4 flex gap-3 rounded-2xl border border-gold/50 bg-gold-soft/30 p-4 text-[15px] text-body">
                        <Calendar className="h-5 w-5 shrink-0 text-gold-deep mt-0.5" />
                        {r.deadlineNote}
                    </p>
                )}
            </section>

            {/* 2. Gap checklist */}
            <section className="rounded-[1.75rem] border border-gold-soft bg-paper p-7 md:p-10">
                <h3 className="font-heading text-2xl font-bold text-ink">Your gap checklist</h3>
                <p className="mt-2 text-body">In priority order, grouped by the section of your Org Vault where each item belongs.</p>
                {r.gaps.length === 0 ? (
                    <p className="mt-6 text-body">No gaps found from your answers. The next step is a ranked opportunity list.</p>
                ) : (
                    <ol className="mt-6 space-y-3">
                        {r.gaps.map((g, i) => (
                            <li key={g.missing} className="rounded-2xl border border-gold-soft/80 bg-cream/60 p-5">
                                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                                    <span className="font-heading font-bold text-coral-deep tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                                    <span className="font-heading font-semibold text-ink text-lg">{g.missing}</span>
                                    <span className="font-label text-[10px] text-quiet">{g.section}</span>
                                </div>
                                <p className="mt-2 text-[15px] text-body leading-relaxed">{g.why}</p>
                                <p className="mt-2 text-sm">
                                    <span className="text-quiet">Blocks: </span>
                                    <span className="text-ink font-medium">{Array.isArray(g.blocks) ? g.blocks.join(", ") : g.blocks}</span>
                                </p>
                            </li>
                        ))}
                    </ol>
                )}
            </section>

            {/* 3. Grant types */}
            <section className="rounded-[1.75rem] border border-gold-soft bg-paper p-7 md:p-10">
                <h3 className="font-heading text-2xl font-bold text-ink">Grant types that fit your profile</h3>
                <p className="mt-2 text-body">
                    These are types, not specific grants. Each type below fits your profile — eligibility must be confirmed against each funder&apos;s
                    current notice.
                </p>
                <ul className="mt-6 grid gap-3 md:grid-cols-2">
                    {r.types.map((t) => (
                        <li key={t.name} className="rounded-2xl border border-gold-soft/80 bg-cream/60 p-5">
                            <p className="font-heading font-semibold text-ink text-lg">{t.name}</p>
                            <p className="mt-1.5 text-[15px] text-body leading-relaxed">{t.why}</p>
                            <p className="mt-2 text-sm text-quiet leading-relaxed">{t.watch}</p>
                            {t.blocked && (
                                <p className="mt-3 flex gap-2 rounded-xl border border-coral/30 bg-coral/[0.06] px-3 py-2 text-sm text-body">
                                    <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-coral-deep" />
                                    <span>
                                        <strong className="text-ink">{t.blocked}</strong>
                                    </span>
                                </p>
                            )}
                        </li>
                    ))}
                </ul>
                <p className="mt-5 text-sm text-quiet">Live matches and current deadlines require a Scout run against your vault.</p>
            </section>

            {/* 4. Effort estimate */}
            <section className="rounded-[1.75rem] border border-gold-soft bg-paper p-7 md:p-10">
                <h3 className="font-heading text-2xl font-bold text-ink">Effort for your next application</h3>
                <p className="mt-2 text-body">Your time doing it yourself, against your time with the done-for-you service.</p>
                <div className="mt-6 overflow-hidden rounded-2xl border border-gold-soft">
                    <table className="w-full text-left text-[15px]">
                        <thead className="bg-sand/60 text-ink">
                            <tr>
                                <th className="p-4 font-heading font-semibold">Application</th>
                                <th className="p-4 font-heading font-semibold">Doing it yourself</th>
                                <th className="p-4 font-heading font-semibold">With done-for-you</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gold-soft">
                            {EFFORT.map(([row, solo, done]) => (
                                <tr key={row}>
                                    <td className="p-4 text-ink">{row}</td>
                                    <td className="p-4 text-body">{solo}</td>
                                    <td className="p-4 text-body">{done}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <p className="mt-4 text-sm text-quiet">
                    Typical ranges; actual effort varies by funder, application complexity, and how complete your vault is. Federal submissions stay
                    human-clicked by design.
                </p>
            </section>

            {/* 5. Next actions */}
            <section className="rounded-[1.75rem] border border-gold/60 bg-paper p-7 md:p-10">
                <h3 className="font-heading text-2xl font-bold text-ink">Your next 3 actions</h3>
                <ol className="mt-6 space-y-4">
                    {r.actions.map((a, i) => (
                        <li key={a} className="flex gap-4">
                            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[image:var(--gradient-ai)] font-heading font-bold text-white">
                                {i + 1}
                            </span>
                            <span className="pt-1.5 text-lg text-ink leading-snug">{a}</span>
                        </li>
                    ))}
                </ol>

                {/* 6. Checklist + actions */}
                <div className="no-print mt-9 flex flex-wrap gap-3">
                    <Button size="lg" variant="hero" className="group" asChild>
                        <Link href={INTAKE_HREF}>
                            <FileText className="mr-2 h-4 w-4" />
                            Tell us about your organization
                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                    </Button>
                    <Button size="lg" variant="heroOutline" asChild>
                        <Link href={BOOK_HREF}>
                            <Calendar className="mr-2 h-4 w-4" />
                            Book a call
                        </Link>
                    </Button>
                    <Button size="lg" variant="ghost" onClick={() => window.print()}>
                        <Printer className="mr-2 h-4 w-4" />
                        Print checklist
                    </Button>
                    <Button size="lg" variant="ghost" onClick={download}>
                        <Download className="mr-2 h-4 w-4" />
                        Save as text
                    </Button>
                    <Button size="lg" variant="ghost" onClick={onReset}>
                        <RotateCcw className="mr-2 h-4 w-4" />
                        Retake the quiz
                    </Button>
                </div>
            </section>
        </div>
    );
}

/* ------------------------------------------------------------------ */
/* Full check                                                          */
/* ------------------------------------------------------------------ */

const STORE_KEY = "peyi-grants-readiness";

/** United States is pre-selected; nothing else is assumed. */
const DEFAULT_ANSWERS: Answers = { docs: [], categories: [], country: "US" };

export function ReadinessCheck() {
    const [answers, setAnswers] = useState<Answers>(DEFAULT_ANSWERS);
    const [result, setResult] = useState<Result | null>(null);
    const resultRef = useRef<HTMLDivElement>(null);

    // Prefill from the short check (query string), never from anything sensitive.
    useEffect(() => {
        // Read on the next frame rather than synchronously in the effect.
        const raf = requestAnimationFrame(() => {
            const p = new URLSearchParams(window.location.search);
            const pre: Answers = {};
            for (const id of SHORT_IDS) {
                if (id === "location") continue;
                const v = p.get(id);
                const q = QUESTIONS.find((x) => x.id === id);
                if (v && q?.options.some((o) => o.value === v)) (pre as Record<string, string>)[id] = v;
            }
            const country = p.get("country");
            if (country && COUNTRIES.some((c) => c.value === country)) pre.country = country;
            const st = p.get("usState");
            if (st && US_STATES.some((x) => x.value === st)) pre.usState = st;
            if (Object.keys(pre).length) setAnswers((a) => ({ ...a, ...pre }));
        });
        return () => cancelAnimationFrame(raf);
    }, []);

    const asked = visibleQuestions(answers);
    const done = asked.filter((q) => isAnswered(q, answers)).length;
    const complete = isComplete(answers);

    const set = (id: keyof Answers, v: string | string[]) => {
        setAnswers((a) => ({ ...a, [id]: v }));
    };

    const reset = () => {
        setAnswers(DEFAULT_ANSWERS);
        setResult(null);
        try {
            sessionStorage.removeItem(STORE_KEY);
        } catch {
            /* storage unavailable: nothing to clear */
        }
        // Drop any prefilled answers from the URL so a refresh starts clean too.
        window.history.replaceState(null, "", `${window.location.pathname}#check`);
        document.getElementById("check")?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    const submit = () => {
        const r = score(answers);
        setResult(r);
        try {
            sessionStorage.setItem(STORE_KEY, JSON.stringify({ total: r.total, band: r.band.label, orgType: answers.orgType, location: locationLabel(answers) }));
        } catch {
            /* storage unavailable: the result still shows */
        }
        requestAnimationFrame(() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
    };

    return (
        <div className="grid gap-10">
            <div className="sticky top-24 z-30 mx-auto w-full max-w-xl rounded-full border border-gold-soft bg-paper/90 px-5 py-2.5 backdrop-blur-md shadow-[0_12px_30px_-20px_rgba(120,50,50,0.6)] no-print">
                <div className="flex items-center gap-4">
                    <span className="font-label text-[10px] text-gold-deep whitespace-nowrap">{complete ? "All answered" : "Your answers"}</span>
                    <div className="relative h-1.5 flex-1 rounded-full bg-sand">
                        <div
                            className="absolute inset-y-0 left-0 rounded-full bg-[image:var(--gradient-ai)] transition-[width] duration-700 ease-[var(--ease-spring)]"
                            style={{ width: `${(done / asked.length) * 100}%` }}
                        />
                    </div>
                    <span className="font-heading font-bold text-ink tabular-nums text-sm">
                        {done}/{asked.length}
                    </span>
                </div>
            </div>

            <form
                className="rounded-[1.75rem] border border-gold-soft bg-paper px-6 md:px-10 py-4 shadow-[0_40px_70px_-50px_rgba(120,50,50,0.5)]"
                onSubmit={(e) => {
                    e.preventDefault();
                    if (complete) submit();
                }}
            >
                {asked.map((q, i) => (
                    <QuestionField key={q.id} q={q} index={i} answers={answers} onChange={set} />
                ))}
                <div className="py-8 flex flex-col sm:flex-row sm:items-center gap-4">
                    <Button type="submit" size="xl" variant="hero" disabled={!complete} className="group">
                        See my readiness score
                        <ArrowRight className="ml-2.5 h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </Button>
                    <p className="text-sm text-quiet">
                        {complete ? "No email needed — your result shows right here." : "Answer every question to see your score. Nothing leaves your browser."}
                    </p>
                    {(done > 0 || result) && (
                        <button
                            type="button"
                            onClick={reset}
                            className="inline-flex items-center gap-2 self-start rounded-full px-4 py-2 text-sm font-semibold text-coral-deep transition-colors hover:bg-coral/10 sm:ml-auto"
                        >
                            <RotateCcw className="h-4 w-4" />
                            Start over
                        </button>
                    )}
                </div>
            </form>

            <div ref={resultRef}>{result && <ResultView r={result} onReset={reset} />}</div>
        </div>
    );
}

/* ------------------------------------------------------------------ */
/* Short embed: the first four questions                               */
/* ------------------------------------------------------------------ */

export function ReadinessShort() {
    const router = useRouter();
    const [answers, setAnswers] = useState<Answers>({ country: "US" });
    const qs = QUESTIONS.filter((q) => SHORT_IDS.includes(q.id));
    const ready = qs.every((q) => isAnswered(q, answers));

    return (
        <div className="rounded-[1.75rem] border border-gold/60 bg-paper p-6 md:p-9 shadow-[0_40px_70px_-50px_rgba(120,50,50,0.5)]">
            <p className="type-eyebrow mb-3">Grant Readiness Check</p>
            <h3 className="font-heading text-2xl md:text-3xl font-bold text-ink">Start here: four quick questions</h3>
            <p className="mt-2 text-body">Then finish the full check for your score, gap list and next three actions. No email needed.</p>
            <div className="mt-2">
                {qs.map((q, i) => (
                    <QuestionField key={q.id} q={q} index={i} answers={answers} compact onChange={(id, v) => setAnswers((a) => ({ ...a, [id]: v }))} />
                ))}
            </div>
            <Button
                size="lg"
                variant="hero"
                className="group mt-6"
                disabled={!ready}
                onClick={() => {
                    const p = new URLSearchParams();
                    for (const id of SHORT_IDS) {
                        if (id === "location") continue;
                        const v = answers[id];
                        if (v) p.set(id, String(v));
                    }
                    p.set("country", answers.country ?? "US");
                    if (answers.usState) p.set("usState", answers.usState);
                    router.push(`${READINESS_HREF}?${p.toString()}#check`);
                }}
            >
                Continue to the full check
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
        </div>
    );
}
