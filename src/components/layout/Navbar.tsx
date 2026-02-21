"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [solutionsOpen, setSolutionsOpen] = useState(false);
    const [resourcesOpen, setResourcesOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Dropdown Item Component
    const DropdownItem = ({ href, children }: { href: string; children: React.ReactNode }) => (
        <Link
            href={href}
            className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-md transition-colors"
            onClick={() => {
                setSolutionsOpen(false);
                setResourcesOpen(false);
            }}
        >
            {children}
        </Link>
    );

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled || mobileMenuOpen
                ? "bg-[#0B0F19]/90 backdrop-blur-xl border-b border-white/5 py-3 shadow-lg shadow-purple-500/5"
                : "bg-transparent py-6"
                }`}
        >
            <div className="container px-6 mx-auto flex items-center justify-between">
                {/* Left: Logo */}
                <Link href="/" className="flex items-center gap-3 group relative z-50">
                    <div className="relative w-11 h-11 rounded-full overflow-hidden border border-white/10 group-hover:border-primary/50 transition-colors">
                        <div
                            className="w-full h-full bg-white"
                            style={{
                                backgroundImage: "url('/logo.png')",
                                backgroundSize: "cover",
                                filter: "hue-rotate(90deg) saturate(1.2)"
                            }}
                        />
                    </div>
                    <span className="font-heading font-bold text-xl tracking-tight text-foreground">
                        Peyi Solutions
                    </span>
                </Link>

                {/* Right: Desktop Links & CTA */}
                <div className="hidden md:flex items-center gap-8">

                    {/* Solutions Dropdown */}
                    <div className="relative group" onMouseEnter={() => setSolutionsOpen(true)} onMouseLeave={() => setSolutionsOpen(false)}>
                        <button className="flex items-center gap-1 text-sm font-medium text-foreground/90 hover:text-primary transition-colors py-2">
                            Solutions <ChevronDown className={`w-4 h-4 transition-transform ${solutionsOpen ? "rotate-180" : ""}`} />
                        </button>
                        <AnimatePresence>
                            {solutionsOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    transition={{ duration: 0.2 }}
                                    className="absolute top-full left-0 mt-2 w-64 bg-[#0B0F19]/95 backdrop-blur-md border border-white/10 rounded-xl shadow-2xl py-2"
                                >
                                    <Link href="/ai-customer-service-small-business" className="block px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors">
                                        AI Customer Service
                                    </Link>
                                    <Link href="/voice-ai-agent" className="block px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors font-semibold text-primary/90">
                                        Self-Selling Voice AI
                                    </Link>
                                    <Link href="/ai-marketing-automation-small-business" className="block px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors">
                                        AI Marketing Automation
                                    </Link>
                                    <Link href="/ai-lead-generation-small-business" className="block px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors">
                                        AI Lead Gen & CRM
                                    </Link>
                                    <Link href="/ai-operations-automation" className="block px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors">
                                        AI Operations Automation
                                    </Link>
                                    <div className="border-t border-white/10 my-1"></div>
                                    <Link href="/ai-for-real-estate-agents" className="block px-4 py-3 text-sm text-primary hover:text-primary/80 hover:bg-white/5 transition-colors font-medium">
                                        For Real Estate Agents
                                    </Link>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Industries Link */}
                    <Link
                        href="/ai-for-real-estate-agents"
                        className="text-sm font-medium text-foreground/90 hover:text-primary transition-colors"
                    >
                        Real Estate
                    </Link>

                    <Link
                        href="#why-us"
                        className="text-sm font-medium text-foreground/90 hover:text-primary transition-colors"
                    >
                        Why Us
                    </Link>

                    {/* Resources Dropdown */}
                    <div className="relative group" onMouseEnter={() => setResourcesOpen(true)} onMouseLeave={() => setResourcesOpen(false)}>
                        <button className="flex items-center gap-1 text-sm font-medium text-foreground/90 hover:text-primary transition-colors py-2">
                            Resources <ChevronDown className={`w-4 h-4 transition-transform ${resourcesOpen ? "rotate-180" : ""}`} />
                        </button>
                        <AnimatePresence>
                            {resourcesOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    transition={{ duration: 0.2 }}
                                    className="absolute top-full text-center left-1/2 -translate-x-1/2 w-48 bg-[#0B0F19] border border-white/10 rounded-xl shadow-2xl p-2 mt-1 backdrop-blur-3xl"
                                >
                                    <DropdownItem href="/ai-readiness-quiz">AI Readiness Quiz</DropdownItem>
                                    {/* <DropdownItem href="/blog">Blog & Guides</DropdownItem> */}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <Button variant="heroOutline" size="sm" asChild>
                        <Link href="/ai-readiness-quiz">Get Started</Link>
                    </Button>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden text-foreground hover:text-primary transition-colors relative z-50"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-label="Toggle menu"
                >
                    {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>

                {/* Mobile Menu Overlay */}
                <AnimatePresence>
                    {mobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="fixed inset-0 bg-[#0B0F19] z-40 pt-24 px-6 flex flex-col gap-6 md:hidden overflow-y-auto"
                        >
                            <div className="flex flex-col gap-4">
                                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Solutions</p>
                                <Link href="/ai-customer-service-small-business" className="text-lg font-medium text-gray-300" onClick={() => setMobileMenuOpen(false)}>Customer Service</Link>
                                <Link href="/voice-ai-agent" className="text-lg font-bold text-primary/90" onClick={() => setMobileMenuOpen(false)}>Self-Selling Voice AI</Link>
                                <Link href="/ai-marketing-automation-small-business" className="text-lg font-medium text-gray-300" onClick={() => setMobileMenuOpen(false)}>Marketing Automation</Link>
                                <Link href="/ai-lead-generation-small-business" className="text-lg font-medium text-gray-300" onClick={() => setMobileMenuOpen(false)}>AI Lead Gen & CRM</Link>
                            </div>

                            <div className="h-px bg-white/10 w-full" />

                            <div className="flex flex-col gap-4">
                                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Industries</p>
                                <Link href="/ai-for-real-estate-agents" className="text-lg font-medium text-gray-300" onClick={() => setMobileMenuOpen(false)}>Real Estate</Link>
                            </div>

                            <div className="h-px bg-white/10 w-full" />

                            <Link href="#why-us" className="text-xl font-bold text-white block" onClick={() => setMobileMenuOpen(false)}>Why Us</Link>
                            <Link href="/ai-readiness-quiz" className="text-xl font-bold text-white block" onClick={() => setMobileMenuOpen(false)}>AI Readiness Quiz</Link>

                            <div className="mt-8">
                                <Button variant="hero" size="lg" className="w-full" asChild>
                                    <Link href="/ai-readiness-quiz" onClick={() => setMobileMenuOpen(false)}>Get Started</Link>
                                </Button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </nav>
    );
}
