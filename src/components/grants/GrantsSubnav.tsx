"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { GRANTS_PAGES } from "@/lib/grants/content";

/** Section navigation linking every Grants page to every other one. */
export function GrantsSubnav() {
    const path = usePathname();
    const listRef = useRef<HTMLUListElement>(null);

    // On narrow screens the strip scrolls sideways; bring the current page's pill into view
    // so it never sits cut off past the edge.
    useEffect(() => {
        const list = listRef.current;
        const active = list?.querySelector<HTMLElement>('[aria-current="page"]');
        if (!list || !active) return;
        const offset = active.getBoundingClientRect().left - list.getBoundingClientRect().left + list.scrollLeft;
        list.scrollTo({ left: Math.max(0, offset - (list.clientWidth - active.offsetWidth) / 2), behavior: "auto" });
    }, [path]);

    return (
        <nav aria-label="Grants pages" className="relative z-20 border-t border-gold-soft/70 bg-paper/70 backdrop-blur-sm">
            <ul ref={listRef} className="container mx-auto px-6 lg:pl-16 flex gap-1 overflow-x-auto py-2.5 [scrollbar-width:none]">
                {GRANTS_PAGES.map((p) => {
                    const active = path === p.href;
                    return (
                        <li key={p.href} className="shrink-0">
                            <Link
                                href={p.href}
                                aria-current={active ? "page" : undefined}
                                className={`inline-flex rounded-full px-3.5 py-1.5 text-sm transition-colors ${
                                    active ? "bg-ink text-cream" : "text-body hover:bg-sand/80 hover:text-ink"
                                }`}
                            >
                                {p.label}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}
