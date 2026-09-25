"use client";

import { useRef, type ReactNode } from "react";

/**
 * A card that tilts a few degrees toward the cursor, with a soft highlight that
 * follows it across the surface — the card reads as an object you could pick
 * up. Pointer-only: touch never sees it, and reduced motion flattens it in CSS.
 */
export function TiltCard({
    children,
    className = "",
    strength = 1
}: {
    children: ReactNode;
    className?: string;
    strength?: number;
}) {
    const ref = useRef<HTMLDivElement>(null);

    const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
        if (e.pointerType !== "mouse") return;
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const nx = (e.clientX - r.left) / r.width; // 0..1
        const ny = (e.clientY - r.top) / r.height;
        el.style.setProperty("--tx", ((nx * 2 - 1) * strength).toFixed(3));
        el.style.setProperty("--ty", ((ny * 2 - 1) * strength).toFixed(3));
        el.style.setProperty("--gx", `${(nx * 100).toFixed(1)}%`);
        el.style.setProperty("--gy", `${(ny * 100).toFixed(1)}%`);
        el.style.setProperty("--glare", "1");
        el.classList.add("is-tracking");
    };

    const onLeave = () => {
        const el = ref.current;
        if (!el) return;
        el.classList.remove("is-tracking");
        el.style.setProperty("--tx", "0");
        el.style.setProperty("--ty", "0");
        el.style.setProperty("--glare", "0");
    };

    return (
        <div ref={ref} onPointerMove={onMove} onPointerLeave={onLeave} className={`tilt relative ${className}`}>
            {children}
            <div className="tilt-glare" aria-hidden="true" />
        </div>
    );
}
