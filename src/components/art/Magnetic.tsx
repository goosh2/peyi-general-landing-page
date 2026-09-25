"use client";

import { useRef, type ReactNode } from "react";

/**
 * Pulls its child a few pixels toward the cursor while hovered, then springs
 * back — primary actions feel like they lean in to be pressed. Uses the
 * individual `translate` property so it composes with the button's own
 * hover/press `transform` instead of overwriting it.
 */
export function Magnetic({
    children,
    pull = 0.22,
    max = 10,
    className = ""
}: {
    children: ReactNode;
    pull?: number;
    /** Maximum travel in px. */
    max?: number;
    className?: string;
}) {
    const ref = useRef<HTMLSpanElement>(null);

    const onMove = (e: React.PointerEvent<HTMLSpanElement>) => {
        if (e.pointerType !== "mouse") return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        // Capped so a wide button leans in rather than lurching.
        const clamp = (v: number) => Math.max(-max, Math.min(max, v));
        const dx = clamp((e.clientX - (r.left + r.width / 2)) * pull);
        const dy = clamp((e.clientY - (r.top + r.height / 2)) * pull);
        el.style.transition = "translate 120ms ease-out";
        el.style.translate = `${dx.toFixed(1)}px ${dy.toFixed(1)}px`;
    };

    const onLeave = () => {
        const el = ref.current;
        if (!el) return;
        el.style.transition = "translate 520ms cubic-bezier(0.34, 1.56, 0.64, 1)";
        el.style.translate = "0px 0px";
    };

    return (
        <span
            ref={ref}
            onPointerMove={onMove}
            onPointerLeave={onLeave}
            className={`inline-flex ${className}`}
        >
            {children}
        </span>
    );
}
