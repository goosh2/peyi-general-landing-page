"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Calendar, ChevronDown, Menu, X } from "lucide-react";

const SOLUTIONS = [
    { href: "/ai-lead-generation-small-business", label: "AI Lead Gen & CRM", note: "Capture, qualify, follow up" },
    { href: "/ai-customer-service-small-business", label: "AI Customer Service", note: "Answers and bookings, 24/7" },
    { href: "/voice-ai-agent", label: "Voice AI Receptionist", note: "Every call picked up" },
    { href: "/ai-marketing-automation-small-business", label: "Marketing Automation", note: "Content that keeps going" },
    { href: "/ai-operations-automation", label: "Operations Automation", note: "Invoices, scheduling, admin" }
];

const LINKS = [
    { href: "/#how-it-works", label: "How it works" },
    { href: "/#why-us", label: "Why Peyi" },
    { href: "/#faq", label: "FAQ" }
];

// Hoisted so it isn't re-created on every Navbar render.
const DropdownItem = ({
    href,
    label,
    note,
    onNavigate
}: {
    href: string;
    label: string;
    note?: string;
    onNavigate: () => void;
}) => (
    <Link
        href={href}
        onClick={onNavigate}
        className="block rounded-xl px-3.5 py-2.5 transition-colors hover:bg-sand/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
        <span className="block text-sm font-medium text-ink">{label}</span>
        {note && <span className="block text-xs text-quiet">{note}</span>}
    </Link>
);

function Logo() {
    return (
        <Link href="/" className="flex items-center gap-2.5 shrink-0" aria-label="Peyi Solutions home">
            <Image
                src="/logo.png"
                alt=""
                width={44}
                height={44}
                className="rounded-full ring-1 ring-gold/40 shadow-[0_4px_12px_-4px_rgba(6,32,28,0.35)]"
                priority
            />
            <span className="font-sans font-bold text-[1.35rem] tracking-[-0.02em] text-ink">Peyi Solutions</span>
        </Link>
    );
}

export function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [solutionsOpen, setSolutionsOpen] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 12);
        const first = requestAnimationFrame(onScroll);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => {
            cancelAnimationFrame(first);
            window.removeEventListener("scroll", onScroll);
        };
    }, []);

    // Lock page scroll behind the mobile sheet.
    useEffect(() => {
        document.body.style.overflow = mobileOpen ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [mobileOpen]);

    const close = () => {
        setSolutionsOpen(false);
        setMobileOpen(false);
    };

    return (
        <header className="fixed top-3 inset-x-0 z-50 px-3">
            <nav
                className={`mx-auto max-w-7xl flex items-center justify-between gap-4 rounded-full pl-4 pr-2 py-2 transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300 ${
                    scrolled || mobileOpen
                        ? "surface-chrome"
                        : "border border-transparent bg-transparent"
                }`}
            >
                <Logo />

                {/* Desktop links */}
                <div className="hidden md:flex items-center gap-1">
                    <div
                        className="relative"
                        onMouseEnter={() => setSolutionsOpen(true)}
                        onMouseLeave={() => setSolutionsOpen(false)}
                    >
                        <button
                            type="button"
                            aria-expanded={solutionsOpen}
                            onClick={() => setSolutionsOpen((o) => !o)}
                            className="flex items-center gap-1 rounded-full px-3.5 py-2 text-[15px] text-ink/85 hover:text-ink transition-colors"
                        >
                            Solutions
                            <ChevronDown
                                className={`w-4 h-4 transition-transform duration-200 ${solutionsOpen ? "rotate-180" : ""}`}
                            />
                        </button>

                        <AnimatePresence>
                            {solutionsOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: -6, scale: 0.97 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: -6, scale: 0.97 }}
                                    transition={{ type: "spring", bounce: 0, duration: 0.3 }}
                                    style={{ transformOrigin: "top left" }}
                                    className="absolute left-0 top-full pt-3"
                                >
                                    <div className="w-72 rounded-2xl border border-gold-soft bg-paper p-2 shadow-[0_24px_60px_-24px_rgba(80,50,20,0.4)]">
                                        {SOLUTIONS.map((s) => (
                                            <DropdownItem key={s.href} {...s} onNavigate={close} />
                                        ))}
                                        <div className="my-1.5 gold-rule opacity-60" />
                                        <DropdownItem
                                            href="/ai-for-real-estate-agents"
                                            label="For Real Estate Agents"
                                            note="Our specialty"
                                            onNavigate={close}
                                        />
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {LINKS.map((l) => (
                        <Link
                            key={l.href}
                            href={l.href}
                            className="rounded-full px-3.5 py-2 text-[15px] text-ink/85 hover:text-ink transition-colors"
                        >
                            {l.label}
                        </Link>
                    ))}
                </div>

                <div className="flex items-center gap-2">
                    <Link
                        href="/book"
                        className="hidden sm:inline-flex items-center gap-2.5 rounded-full bg-[image:var(--gradient-ai)] px-6 py-3 font-heading text-[17px] font-semibold text-white shadow-[0_14px_30px_-12px_rgba(232,102,75,0.6),inset_0_1px_0_rgba(255,255,255,0.35)] transition-transform duration-150 hover:scale-[1.03] active:scale-[0.97]"
                    >
                        <Calendar className="w-[18px] h-[18px]" />
                        Book AI Audit
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                    <button
                        type="button"
                        className="md:hidden w-10 h-10 rounded-full flex items-center justify-center text-ink hover:bg-sand/70 transition-colors"
                        onClick={() => setMobileOpen((o) => !o)}
                        aria-label={mobileOpen ? "Close menu" : "Open menu"}
                        aria-expanded={mobileOpen}
                    >
                        {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                </div>
            </nav>

            {/* Mobile sheet */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ type: "spring", bounce: 0, duration: 0.3 }}
                        className="md:hidden mx-auto mt-2 max-w-7xl rounded-3xl border border-gold-soft bg-paper p-3 shadow-[0_24px_60px_-24px_rgba(80,50,20,0.4)] max-h-[calc(100svh-6rem)] overflow-y-auto"
                    >
                        <p className="px-3.5 pt-2 pb-1 font-label text-[10px] text-quiet">
                            Solutions
                        </p>
                        {SOLUTIONS.map((s) => (
                            <DropdownItem key={s.href} {...s} onNavigate={close} />
                        ))}
                        <DropdownItem
                            href="/ai-for-real-estate-agents"
                            label="For Real Estate Agents"
                            note="Our specialty"
                            onNavigate={close}
                        />
                        <div className="my-2 gold-rule opacity-60" />
                        {LINKS.map((l) => (
                            <DropdownItem key={l.href} href={l.href} label={l.label} onNavigate={close} />
                        ))}
                        <DropdownItem href="/ai-readiness-quiz" label="AI Readiness Quiz" onNavigate={close} />
                        <Link
                            href="/book"
                            onClick={close}
                            className="mt-3 flex items-center justify-center gap-2 rounded-full bg-[image:var(--gradient-ai)] px-4 py-3.5 font-heading text-lg font-semibold text-white"
                        >
                            <Calendar className="w-4 h-4" />
                            Book AI Audit
                        </Link>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
