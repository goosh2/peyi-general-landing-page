"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

/**
 * Publishes the cursor position to its subtree as --px / --py in -1..1,
 * eased toward the pointer so motion reads as physical rather than twitchy.
 * Descendants react with CSS alone (.depth drifts, .lean tilts palms toward
 * the "wind"), so one listener drives a whole scene.
 *
 * The variables are written on this element — not :root — so a pointer move
 * only restyles this subtree. It does nothing for touch/coarse pointers or
 * reduced motion, and stops animating while offscreen.
 */
export function PointerField({
    children,
    className,
    style,
    as: Tag = "div",
    ease = 0.075
}: {
    children: ReactNode;
    className?: string;
    style?: CSSProperties;
    as?: "div" | "section" | "header" | "footer";
    ease?: number;
}) {
    const ref = useRef<HTMLElement | null>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        if (!window.matchMedia("(pointer: fine)").matches) return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        let targetX = 0;
        let targetY = 0;
        let x = 0;
        let y = 0;
        let raf = 0;
        let visible = true;

        const tick = () => {
            x += (targetX - x) * ease;
            y += (targetY - y) * ease;
            el.style.setProperty("--px", x.toFixed(4));
            el.style.setProperty("--py", y.toFixed(4));
            const settled = Math.abs(targetX - x) < 0.0008 && Math.abs(targetY - y) < 0.0008;
            raf = settled || !visible ? 0 : requestAnimationFrame(tick);
        };

        const onMove = (e: PointerEvent) => {
            targetX = (e.clientX / window.innerWidth) * 2 - 1;
            targetY = (e.clientY / window.innerHeight) * 2 - 1;
            if (!raf && visible) raf = requestAnimationFrame(tick);
        };

        const io = new IntersectionObserver(([entry]) => {
            visible = entry.isIntersecting;
            if (visible && !raf) raf = requestAnimationFrame(tick);
        });
        io.observe(el);
        window.addEventListener("pointermove", onMove, { passive: true });

        return () => {
            window.removeEventListener("pointermove", onMove);
            io.disconnect();
            cancelAnimationFrame(raf);
        };
    }, [ease]);

    return (
        <Tag ref={ref as never} className={className} style={style}>
            {children}
        </Tag>
    );
}
