"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Calendar } from "lucide-react";

/**
 * Once the hero's buttons have scrolled away, keep one quiet path to action in
 * reach. It steps aside when the closing CTA (or the footer) is on screen, so
 * it never competes with a bigger button saying the same thing.
 */
export function StickyCTA({ watchId = "final-cta" }: { watchId?: string }) {
    const [pastHero, setPastHero] = useState(false);
    const [nearEnd, setNearEnd] = useState(false);

    useEffect(() => {
        const onScroll = () => setPastHero(window.scrollY > window.innerHeight * 0.85);
        // First read on the next frame rather than synchronously in the effect.
        const first = requestAnimationFrame(onScroll);
        window.addEventListener("scroll", onScroll, { passive: true });

        const targets = [document.getElementById(watchId), document.querySelector("footer")].filter(
            (el): el is HTMLElement => el !== null
        );
        const visible = new Set<Element>();
        const io = new IntersectionObserver((entries) => {
            entries.forEach((e) => (e.isIntersecting ? visible.add(e.target) : visible.delete(e.target)));
            setNearEnd(visible.size > 0);
        });
        targets.forEach((t) => io.observe(t));

        return () => {
            cancelAnimationFrame(first);
            window.removeEventListener("scroll", onScroll);
            io.disconnect();
        };
    }, [watchId]);

    const show = pastHero && !nearEnd;

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 24 }}
                    transition={{ type: "spring", bounce: 0, duration: 0.45 }}
                    className="fixed z-40 bottom-4 inset-x-3 sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2"
                >
                    <div className="surface-chrome rounded-full flex items-center justify-between gap-4 pl-5 pr-1.5 py-1.5">
                        <span className="text-sm text-body whitespace-nowrap">
                            <span className="hidden sm:inline">Busywork eating your week? </span>
                            <span className="sm:hidden">Ready when you are</span>
                        </span>
                        <Link
                            href="/book"
                            className="inline-flex items-center gap-2 rounded-full bg-[image:var(--gradient-ai)] px-4 py-2 text-sm font-semibold text-white transition-transform duration-150 active:scale-[0.97]"
                        >
                            <Calendar className="w-4 h-4" />
                            Book AI Audit
                        </Link>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
