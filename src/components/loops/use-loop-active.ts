"use client";

import { RefObject } from "react";
import { useInView, useReducedMotion } from "framer-motion";

/**
 * A JS-driven loop should only run while it is on screen and while the visitor
 * hasn't asked for reduced motion. Offscreen loops are paused, not torn down,
 * so they resume where they left off when scrolled back into view.
 */
export function useLoopActive(ref: RefObject<Element | null>, amount = 0.25) {
    const inView = useInView(ref, { amount });
    const reduced = useReducedMotion();
    return inView && !reduced;
}
