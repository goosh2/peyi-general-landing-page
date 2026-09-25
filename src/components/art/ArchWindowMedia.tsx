"use client";

import { useEffect, useRef } from "react";

/**
 * The view through the Deco arch: waves rolling in and out at sunset.
 *
 * A 7.5s seamless loop (the clip's tail is cross-faded into its head, so the
 * last frame leads straight back into the first). It only plays while the arch
 * is on screen, and never for visitors who prefer reduced motion — they get
 * the poster, which is the loop's own first frame, so nothing jumps when the
 * video takes over.
 */
export function ArchWindowMedia({ className = "", eager = false }: { className?: string; eager?: boolean }) {
    const ref = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const video = ref.current;
        if (!video) return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        const io = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    // play() rejects if the browser blocks it; the poster simply stays.
                    video.play().catch(() => {});
                } else {
                    video.pause();
                }
            },
            { threshold: 0.15 }
        );
        io.observe(video);
        return () => io.disconnect();
    }, []);

    return (
        <video
            ref={ref}
            className={className}
            poster="/art/sunset-waves-poster.webp"
            muted
            loop
            playsInline
            preload={eager ? "auto" : "metadata"}
            aria-hidden="true"
            tabIndex={-1}
            disablePictureInPicture
        >
            <source src="/art/sunset-waves.mp4" type="video/mp4" />
        </video>
    );
}
