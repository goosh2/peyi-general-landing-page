"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar } from "lucide-react";

/**
 * "Untangle" — the scroll-film hero.
 *
 * The page opens on a tangle of glowing strands, each one a business process.
 * Scrolling pushes into the tangle, lights one strand, pulls it free, and then
 * resolves the rest into an ordered system. The motion is the pitch: the audit's
 * value isn't "do all the AI", it's knowing which thread to pull first.
 *
 * Design constraints this file is built around:
 *
 * 1. ALL COPY IS REAL DOM TEXT. Nothing readable is drawn into the canvas. The
 *    vertical pages and FAQ are the AEO moat and the homepage feeds the same
 *    machinery — canvas-only text would be invisible to crawlers and answer
 *    engines. If that ever changes, the feature isn't worth shipping.
 * 2. The page must be fully readable and fully convertible if the canvas never
 *    paints a frame. Film is enhancement, never the delivery mechanism.
 * 3. Reduced motion gets a static composition with the beats stacked as ordinary
 *    prose, not a degraded animation.
 *
 * Rendering is Canvas 2D with pseudo-depth (draw order + width + alpha) rather
 * than WebGL: no heavy dependency, no context-loss handling, trivial fallback,
 * and comfortably 60fps at this strand count.
 */

/* ------------------------------------------------------------------ */
/* Beats                                                               */
/* ------------------------------------------------------------------ */

type Beat = {
    id: string;
    /** progress window: fades in at `in`, full at `peak`, out by `out` */
    in: number;
    peak: number;
    out: number;
};

const BEATS: Beat[] = [
    { id: "hero", in: -0.1, peak: 0, out: 0.17 },
    { id: "tangle", in: 0.16, peak: 0.26, out: 0.4 },
    { id: "audit", in: 0.38, peak: 0.5, out: 0.62 },
    { id: "pull", in: 0.6, peak: 0.7, out: 0.82 },
    { id: "system", in: 0.8, peak: 0.9, out: 2 } // out > 1: finale never fades
];

function beatAlpha(beat: Beat, p: number) {
    if (p < beat.in || p > beat.out) return 0;
    if (p < beat.peak) return (p - beat.in) / Math.max(1e-4, beat.peak - beat.in);
    if (beat.out > 1.5) return 1;
    return 1 - (p - beat.peak) / Math.max(1e-4, beat.out - beat.peak);
}

/* ------------------------------------------------------------------ */
/* Strand model                                                        */
/* ------------------------------------------------------------------ */

/** Deterministic RNG so the tangle is identical every load and across SSR. */
function makeRng(seed: number) {
    let s = seed >>> 0;
    return () => {
        s = (s * 1664525 + 1013904223) >>> 0;
        return s / 4294967296;
    };
}

const POINTS_PER_STRAND = 7;

type Strand = {
    tangled: { x: number; y: number }[];
    ordered: { x: number; y: number }[];
    depth: number; // 0 = far, 1 = near
    hue: number; // 0..1 along the brand gradient
    delay: number; // stagger for the untangling
};

/** Brand gradient stops: orange → pink → purple. */
function brandColor(t: number, alpha: number) {
    const stops = [
        [250, 137, 56],
        [235, 71, 126],
        [166, 94, 237]
    ];
    const x = Math.max(0, Math.min(0.999, t)) * (stops.length - 1);
    const i = Math.floor(x);
    const f = x - i;
    const a = stops[i];
    const b = stops[Math.min(stops.length - 1, i + 1)];
    const c = a.map((v, k) => Math.round(v + (b[k] - v) * f));
    return `rgba(${c[0]}, ${c[1]}, ${c[2]}, ${alpha})`;
}

function buildStrands(count: number): Strand[] {
    const rng = makeRng(20260721);
    const strands: Strand[] = [];

    for (let i = 0; i < count; i++) {
        const tangled: { x: number; y: number }[] = [];
        const ordered: { x: number; y: number }[] = [];

        // Tangled: a tight knot of overlapping loops. The sweep is kept modest and
        // the radius small so it reads as one dense mass rather than stray lines
        // flying out of frame.
        const phase = rng() * Math.PI * 2;
        const radius = 0.16 + rng() * 0.13;
        const wobble = 0.1 + rng() * 0.12;

        for (let j = 0; j < POINTS_PER_STRAND; j++) {
            const t = j / (POINTS_PER_STRAND - 1);
            const angle = phase + t * Math.PI * (1.6 + rng() * 1.4);
            tangled.push({
                x: Math.cos(angle) * radius + (rng() - 0.5) * wobble,
                y: Math.sin(angle * 1.25) * radius * 0.8 + (rng() - 0.5) * wobble
            });
        }

        // Ordered: a clean horizontal run in its own lane. Narrower than the
        // viewport so the resolved system sits beside the copy, not under it.
        const lane = (i / Math.max(1, count - 1) - 0.5) * 0.7;
        for (let j = 0; j < POINTS_PER_STRAND; j++) {
            const t = j / (POINTS_PER_STRAND - 1);
            ordered.push({
                x: -0.34 + t * 0.68,
                y: lane + Math.sin(t * Math.PI) * 0.01
            });
        }

        strands.push({
            tangled,
            ordered,
            depth: rng(),
            hue: i / Math.max(1, count - 1),
            delay: rng() * 0.45
        });
    }

    // Draw far strands first so nearer ones overlap them.
    return strands.sort((a, b) => a.depth - b.depth);
}

/* ------------------------------------------------------------------ */
/* Easing                                                              */
/* ------------------------------------------------------------------ */

const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

/* ------------------------------------------------------------------ */
/* Reduced-motion subscription                                         */
/* ------------------------------------------------------------------ */

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(onChange: () => void) {
    const mq = window.matchMedia(REDUCED_MOTION_QUERY);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
}

const getReducedMotion = () => window.matchMedia(REDUCED_MOTION_QUERY).matches;
/** Server can't know the preference; assume motion, then correct on hydration. */
const getReducedMotionServer = () => false;

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

export function UntangleFilm() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);
    const reducedMotion = useSyncExternalStore(
        subscribeReducedMotion,
        getReducedMotion,
        getReducedMotionServer
    );

    useEffect(() => {
        if (reducedMotion) return;

        const section = sectionRef.current;
        const canvas = canvasRef.current;
        const overlay = overlayRef.current;
        if (!section || !canvas || !overlay) return;

        const ctx = canvas.getContext("2d", { alpha: true });
        if (!ctx) return; // No 2D context: the static markup below still stands.

        const isMobile = window.matchMedia("(max-width: 767px)").matches;
        // Fewer strands than instinct suggests: individual threads have to stay
        // readable, otherwise the tangle reads as noise instead of work.
        const strands = buildStrands(isMobile ? 14 : 26);
        const beatEls = Array.from(overlay.querySelectorAll<HTMLElement>("[data-beat]"));

        let width = 0;
        let height = 0;
        let dpr = 1;
        let raf = 0;
        let running = true;

        // Lerped playhead. Binding straight to scroll feels mechanical; easing
        // toward the target is what makes it read as motion.
        let target = 0;
        let current = 0;

        const resize = () => {
            const rect = canvas.getBoundingClientRect();
            dpr = Math.min(window.devicePixelRatio || 1, 1.5); // 2.0 doubles cost for no visible gain
            width = rect.width;
            height = rect.height;
            canvas.width = Math.round(width * dpr);
            canvas.height = Math.round(height * dpr);
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        };

        const readProgress = () => {
            const rect = section.getBoundingClientRect();
            const total = rect.height - window.innerHeight;
            if (total <= 0) return 0;
            return clamp01(-rect.top / total);
        };

        const onScroll = () => {
            target = readProgress();
        };

        const drawStrand = (
            s: Strand,
            localProgress: number,
            cam: { scale: number; x: number; y: number },
            dim: number,
            highlight: boolean
        ) => {
            const e = easeInOut(localProgress);
            const cx = width / 2 + cam.x * width;
            const cy = height / 2 + cam.y * height;
            const unit = Math.min(width, height) * cam.scale;

            // Interpolate control points from tangled toward ordered.
            const pts = s.tangled.map((tp, j) => {
                const op = s.ordered[j];
                return {
                    x: cx + (tp.x + (op.x - tp.x) * e) * unit,
                    y: cy + (tp.y + (op.y - tp.y) * e) * unit
                };
            });

            // Depth drives width and opacity — nearer strands read heavier.
            const depthScale = 0.6 + s.depth * 0.85;
            const baseAlpha = (0.5 + s.depth * 0.5) * dim;
            const w = (isMobile ? 3 : 4.6) * depthScale;

            ctx.lineCap = "round";
            ctx.lineJoin = "round";

            ctx.beginPath();
            ctx.moveTo(pts[0].x, pts[0].y);
            // Catmull-Rom through the points, expressed as bezier segments.
            for (let j = 0; j < pts.length - 1; j++) {
                const p0 = pts[Math.max(0, j - 1)];
                const p1 = pts[j];
                const p2 = pts[j + 1];
                const p3 = pts[Math.min(pts.length - 1, j + 2)];
                ctx.bezierCurveTo(
                    p1.x + (p2.x - p0.x) / 6,
                    p1.y + (p2.y - p0.y) / 6,
                    p2.x - (p3.x - p1.x) / 6,
                    p2.y - (p3.y - p1.y) / 6,
                    p2.x,
                    p2.y
                );
            }

            // Glow is two strokes (wide + faint, then narrow + bright) rather than
            // shadowBlur, which is disproportionately expensive per frame.
            // Additive blending is what makes crossings read as light stacking on
            // light; with normal compositing a dense tangle just turns to mud.
            ctx.globalCompositeOperation = "lighter";

            ctx.strokeStyle = brandColor(s.hue, baseAlpha * (highlight ? 0.34 : 0.13));
            ctx.lineWidth = w * (highlight ? 7 : 5);
            ctx.stroke();

            ctx.strokeStyle = brandColor(s.hue, Math.min(1, baseAlpha * (highlight ? 1.1 : 0.62)));
            ctx.lineWidth = w;
            ctx.stroke();

            ctx.globalCompositeOperation = "source-over";
        };

        const render = () => {
            if (!running) return;

            current += (target - current) * 0.14;
            const p = current;

            // Camera: push in through the tangle, then pull back to reveal the system.
            let scale: number;
            if (p < 0.35) scale = 0.78 + (p / 0.35) * 0.5;
            else if (p < 0.75) scale = 1.28 - ((p - 0.35) / 0.4) * 0.16;
            else scale = 1.12 - ((p - 0.75) / 0.25) * 0.3;

            const cam = {
                scale,
                // On desktop the scene stays in the right half throughout — the copy
                // column owns the left, so the two never fight for the same pixels.
                x: isMobile ? 0 : 0.22,
                y: 0
            };

            ctx.clearRect(0, 0, width, height);

            // Chapter 2 spotlights one strand: everything else dims toward mono.
            const spotlight = clamp01((p - 0.36) / 0.14) * (1 - clamp01((p - 0.62) / 0.12));

            strands.forEach((s, i) => {
                const isHero = i === Math.floor(strands.length * 0.5);
                const local = clamp01((p - 0.55 - s.delay * 0.22) / 0.3);
                const dim = isHero ? 1 : 1 - spotlight * 0.78;
                drawStrand(s, local, cam, dim, isHero && spotlight > 0.05);
            });

            // Beat overlays share the same playhead as the canvas.
            beatEls.forEach((el) => {
                const beat = BEATS.find((b) => b.id === el.dataset.beat);
                if (!beat) return;
                const a = beatAlpha(beat, p);
                el.style.opacity = String(a);
                el.style.transform = `translate3d(0, ${(1 - a) * 14}px, 0)`;
                el.style.pointerEvents = a > 0.6 ? "auto" : "none";
                el.setAttribute("aria-hidden", a < 0.05 ? "true" : "false");
            });

            raf = requestAnimationFrame(render);
        };

        resize();
        onScroll();
        current = target;

        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", resize);

        // Only burn frames while the film is actually on screen.
        const io = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !running) {
                    running = true;
                    raf = requestAnimationFrame(render);
                } else if (!entry.isIntersecting) {
                    running = false;
                    cancelAnimationFrame(raf);
                }
            },
            { rootMargin: "200px" }
        );
        io.observe(section);

        raf = requestAnimationFrame(render);

        return () => {
            running = false;
            cancelAnimationFrame(raf);
            io.disconnect();
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", resize);
        };
    }, [reducedMotion]);

    /* -------------------------------------------------------------- */
    /* Reduced motion: same content, no film.                          */
    /* -------------------------------------------------------------- */
    if (reducedMotion) {
        return (
            <section className="relative w-full px-6 pt-32 pb-24 bg-[#0B0F19]">
                <div className="container mx-auto max-w-3xl">
                    <h1 className="type-display font-heading text-white text-balance mb-6">
                        Turn AI Into{" "}
                        <span className="text-transparent bg-clip-text gradient-text">
                            Profit For Your Business
                        </span>
                    </h1>
                    <p className="text-xl text-gray-400 leading-relaxed text-pretty mb-10 max-w-2xl">
                        Every business runs on a tangle of work. An audit finds the one worth pulling
                        first — then we build it, and pull the next one. Ordered work, and your hours
                        back.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Button size="xl" variant="hero" asChild>
                            <Link href="/book">
                                <Calendar className="mr-2 w-5 h-5" />
                                Book AI Audit
                            </Link>
                        </Button>
                        <Button size="xl" variant="heroOutline" asChild>
                            <Link href="/ai-readiness-quiz">Find Your AI Starting Point</Link>
                        </Button>
                    </div>
                </div>
            </section>
        );
    }

    /* -------------------------------------------------------------- */
    /* The film                                                        */
    /* -------------------------------------------------------------- */
    return (
        <div ref={sectionRef} className="relative w-full" style={{ height: "320vh" }}>
            <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#0B0F19]">
                {/* Ambient wash */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background:
                            "radial-gradient(circle at 55% 50%, rgba(147, 51, 234, 0.16) 0%, rgba(220, 80, 80, 0.10) 38%, rgba(11, 15, 25, 0) 72%)"
                    }}
                />

                <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />

                {/* Legibility scrim — heavier on mobile, where copy sits over the tangle */}
                <div
                    className="absolute inset-0 pointer-events-none md:bg-none"
                    style={{
                        background:
                            "linear-gradient(to bottom, rgba(11,15,25,0.86) 0%, rgba(11,15,25,0.7) 60%, rgba(11,15,25,0.5) 100%)"
                    }}
                />

                {/* Beat overlays — real DOM text, never drawn to canvas */}
                <div ref={overlayRef} className="absolute inset-0">
                    <div className="container mx-auto h-full px-6 flex items-center">
                        <div className="relative w-full max-w-2xl">
                            {/* Chapter 0 — hero */}
                            <div data-beat="hero" className="md:absolute md:inset-0 md:flex md:flex-col md:justify-center">
                                <h1 className="type-display font-heading text-white text-balance mb-6">
                                    Turn AI Into{" "}
                                    <span className="text-transparent bg-clip-text gradient-text">
                                        Profit For Your Business
                                    </span>
                                </h1>
                                <p className="text-xl text-gray-400 leading-relaxed text-pretty mb-8 max-w-xl">
                                    Overwhelmed by AI hype? We give you a clear roadmap to start small,
                                    scale fast, and see real returns. No jargon, just results.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <Button size="xl" variant="hero" asChild>
                                        <Link href="/book">
                                            <Calendar className="mr-2 w-5 h-5" />
                                            Book AI Audit
                                        </Link>
                                    </Button>
                                    <Button size="xl" variant="heroOutline" asChild>
                                        <Link href="/ai-readiness-quiz">
                                            Find Your AI Starting Point
                                            <ArrowRight className="ml-2 w-5 h-5" />
                                        </Link>
                                    </Button>
                                </div>
                            </div>

                            {/* Chapters 1–4 */}
                            <BeatLine id="tangle" text="Every business runs on a tangle of work." />
                            <BeatLine
                                id="audit"
                                text="An audit finds the one worth pulling first."
                            />
                            <BeatLine id="pull" text="Then we build it — and pull the next one." />

                            <div
                                data-beat="system"
                                className="hidden md:flex md:absolute md:inset-0 md:flex-col md:justify-center"
                                style={{ opacity: 0 }}
                            >
                                <h2 className="type-section font-heading text-white text-balance mb-6">
                                    Ordered work. <span className="accent-word">Your hours back.</span>
                                </h2>
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <Button size="xl" variant="hero" asChild>
                                        <Link href="/book">
                                            <Calendar className="mr-2 w-5 h-5" />
                                            Book AI Audit
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Handoff: the film settles into the page background, no hard seam. */}
                <div className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none bg-gradient-to-b from-transparent to-[#0B0F19]" />
            </div>
        </div>
    );
}

/** A single mid-film line. Hidden below md, where the stacked hero copy carries it. */
function BeatLine({ id, text }: { id: string; text: string }) {
    return (
        <div
            data-beat={id}
            className="hidden md:flex md:absolute md:inset-0 md:flex-col md:justify-center"
            style={{ opacity: 0 }}
        >
            <p className="type-section font-heading text-white text-balance max-w-xl">{text}</p>
        </div>
    );
}
