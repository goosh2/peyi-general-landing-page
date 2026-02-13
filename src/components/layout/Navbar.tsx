"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                ? "bg-background/80 backdrop-blur-md border-b border-border/50 py-3"
                : "bg-transparent py-6"
                }`}
        >
            <div className="container px-6 mx-auto flex items-center justify-between">
                {/* Left: Logo */}
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="relative w-11 h-11 rounded-full overflow-hidden border border-white/10 group-hover:border-primary/50 transition-colors">
                        {/* Logo Image with Color Shift: Teal -> Purple/Pink */}
                        {/* hue-rotate(90deg) shifts Teal(180) to ~270 (Purple). Saturate helps keep it vibrant. */}
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
                    <Link
                        href="#solutions"
                        className="text-sm font-medium text-foreground/90 hover:text-primary transition-colors"
                    >
                        Solutions
                    </Link>
                    <Link
                        href="#why-us"
                        className="text-sm font-medium text-foreground/90 hover:text-primary transition-colors"
                    >
                        Why Us
                    </Link>
                    <Button variant="heroOutline" size="sm" asChild>
                        <Link href="/ai-readiness-quiz">Get Started</Link>
                    </Button>
                </div>

                {/* Mobile Toggle */}
                <button className="md:hidden text-foreground">
                    <Menu className="w-6 h-6" />
                </button>
            </div>
        </nav>
    );
}
