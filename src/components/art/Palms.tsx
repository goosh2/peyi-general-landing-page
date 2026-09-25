import Image from "next/image";
import type { CSSProperties } from "react";

/**
 * Living palms.
 *
 * Every frond is its own painted cut-out, pivoting from its stem so it moves
 * like a leaf rather than a picture. Three motions stack without conflicting:
 *   • .frond  — each leaf sways on its own period/phase (`rotate` keyframes)
 *   • .lean   — the whole cluster leans toward the cursor, like wind (`rotate`)
 *   • .depth  — the cluster drifts with the cursor for parallax (`translate`)
 * .lean and .depth read --px/--py from the nearest PointerField; outside one,
 * they rest at zero and the palms simply sway.
 *
 * Pivots below were measured from each cut-out's alpha channel.
 */

const ART = {
    arc: { src: "/art/frond-arc.webp", w: 1100, h: 541, origin: "1% 98%" },
    fan: { src: "/art/frond-fan.webp", w: 1000, h: 953, origin: "6% 99%" },
    droop: { src: "/art/frond-droop.webp", w: 900, h: 1215, origin: "98% 3%" },
    tree: { src: "/art/palm-tree.webp", w: 700, h: 1502, origin: "36% 97%" }
} as const;

type Kind = keyof typeof ART;

export type Frond = {
    kind: Kind;
    /** Where the stem sits, in px from the cluster's top-left. */
    x: number;
    y: number;
    /** Rendered width in px. */
    w: number;
    /** Resting angle in degrees. */
    rot?: number;
    flip?: boolean;
    /** Sway period (s), phase offset (s, usually negative), amplitude multiplier. */
    dur?: number;
    delay?: number;
    amp?: number;
    gust?: boolean;
    /** 0 = back of the cluster (shaded), 1 = front. */
    layer?: 0 | 1;
};

function FrondImg({ f }: { f: Frond }) {
    const art = ART[f.kind];
    const h = (f.w * art.h) / art.w;
    const [ox, oy] = art.origin.split(" ").map((v) => parseFloat(v) / 100);
    // Place the element so its pivot lands exactly on (x, y).
    const left = f.x - ox * f.w;
    const top = f.y - oy * h;

    const style = {
        left,
        top,
        width: f.w,
        height: h,
        transformOrigin: art.origin,
        transform: `rotate(${f.rot ?? 0}deg)${f.flip ? " scaleX(-1)" : ""}`,
        filter:
            f.layer === 0
                ? "brightness(0.86) saturate(0.9)"
                : "drop-shadow(0 14px 14px rgba(52, 60, 24, 0.18))",
        ["--sway-dur" as string]: `${f.dur ?? 7}s`,
        ["--sway-delay" as string]: `${f.delay ?? 0}s`,
        ["--amp" as string]: f.amp ?? 1
    } as CSSProperties;

    return (
        <Image
            src={art.src}
            alt=""
            width={Math.round(f.w)}
            height={Math.round(h)}
            className={`frond absolute max-w-none select-none ${f.gust ? "is-gusty" : ""}`}
            style={style}
            draggable={false}
        />
    );
}

export function PalmCluster({
    fronds,
    className = "",
    style,
    depth = 14,
    lean = 2.5,
    pivot = "0% 0%"
}: {
    fronds: Frond[];
    className?: string;
    style?: CSSProperties;
    /** Parallax travel in px at the cursor's extremes. */
    depth?: number;
    /** Wind lean in degrees at the cursor's extremes (negative mirrors it). */
    lean?: number;
    /** Point the whole cluster leans around — usually where it enters frame. */
    pivot?: string;
}) {
    return (
        <div aria-hidden="true" className={`pointer-events-none absolute ${className}`} style={style}>
            <div className="depth absolute inset-0" style={{ ["--d" as string]: `${depth}px` }}>
                <div
                    className="lean absolute inset-0"
                    style={{ ["--lean" as string]: `${lean}deg`, transformOrigin: pivot }}
                >
                    {fronds.map((f, i) => (
                        <FrondImg key={i} f={f} />
                    ))}
                </div>
            </div>
        </div>
    );
}

/** Scale a preset (positions and sizes) for smaller placements. */
export function scaleFronds(fronds: Frond[], k: number): Frond[] {
    return fronds.map((f) => ({ ...f, x: f.x * k, y: f.y * k, w: f.w * k }));
}

/* ------------------------------------------------------------------ */
/* Presets. Coordinates are in each cluster's own box.                 */
/* ------------------------------------------------------------------ */

/** Hero, left edge: fronds reaching in from off-canvas, top to bottom. */
export const HERO_LEFT: Frond[] = [
    { kind: "arc", x: -140, y: 170, w: 360, rot: 22, dur: 8.5, delay: -2, amp: 1.1, layer: 0 },
    { kind: "droop", x: -10, y: -30, w: 240, rot: 10, flip: true, dur: 6.5, delay: -4, amp: 1.4, gust: true, layer: 1 },
    { kind: "fan", x: -60, y: 770, w: 250, rot: -24, dur: 7.2, delay: -1, amp: 1.2, layer: 0 },
    { kind: "arc", x: -150, y: 990, w: 460, rot: -38, dur: 9, delay: -5, amp: 1, gust: true, layer: 1 },
    { kind: "fan", x: -30, y: 1020, w: 300, rot: 5, dur: 6.8, delay: -3, amp: 1.3, layer: 1 }
];

/** Hero, bottom-right corner: fronds rising out of the corner, reaching up-left.
    Flipping puts each stem on the right; a clockwise turn then tips it upward. */
export const HERO_RIGHT: Frond[] = [
    { kind: "arc", x: 520, y: 560, w: 480, rot: 28, flip: true, dur: 8, delay: -3, amp: 1.1, layer: 0 },
    { kind: "fan", x: 510, y: 575, w: 320, rot: -6, flip: true, dur: 7, delay: -1, amp: 1.3, gust: true, layer: 1 },
    { kind: "arc", x: 545, y: 600, w: 420, rot: 50, flip: true, dur: 9.5, delay: -6, amp: 0.9, layer: 1 }
];

/** Smaller corner sprig for page headers and section accents. */
export const SPRIG: Frond[] = [
    { kind: "arc", x: -30, y: 40, w: 360, rot: 24, dur: 8, delay: -2, amp: 1.1, layer: 0 },
    { kind: "droop", x: 20, y: -10, w: 210, rot: -4, flip: true, dur: 6.4, delay: -3, amp: 1.4, gust: true, layer: 1 },
    { kind: "fan", x: -20, y: 330, w: 250, rot: -18, dur: 7.4, delay: -1, amp: 1.2, layer: 1 }
];

/** A single tall palm, swaying from the base of its trunk. */
export const TREE: Frond[] = [{ kind: "tree", x: 110, y: 640, w: 300, rot: 0, dur: 11, delay: -4, amp: 0.5, gust: true, layer: 1 }];
