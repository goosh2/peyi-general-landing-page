"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Sparkles, Zap, Target } from "lucide-react";
import { Hero3D } from "./Hero3D";
import Link from "next/link";

export function Hero() {
    return (
        <section className="relative w-full min-h-screen overflow-hidden flex flex-col justify-center pt-20 bg-[#0B0F19]">
            {/* 
        Background:
        Base: #0B0F19
        Overlay: Large radial gradient radiating from the center.
        Colors: Subtle warm purple/red glowing in the center, fading to transparent.
      */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: "radial-gradient(circle at 50% 50%, rgba(220, 80, 80, 0.25) 0%, rgba(147, 51, 234, 0.2) 35%, rgba(11, 15, 25, 0) 70%)"
                }}
            />

            {/* 3D Scene */}
            <Hero3D />

            {/* Content */}
            <div className="container px-6 relative z-10 grid md:grid-cols-2 gap-12 items-center h-full">
                <div className="flex flex-col gap-8 max-w-2xl">
                    {/* Headline */}
                    <div className="space-y-4">
                        <h1 className="font-heading font-bold text-5xl md:text-7xl leading-[1.1] tracking-tight text-white">
                            AI That Works{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B6B] via-[#D946EF] to-[#8B5CF6]">
                                For
                                <br />
                                Your Business
                            </span>
                        </h1>
                        <p className="text-lg md:text-xl text-gray-300 font-sans leading-relaxed max-w-lg">
                            Stop guessing which AI tools to use. We help SMBs and creators implement practical AI solutions that drive real results.
                        </p>
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 items-center sm:items-start">
                        <Button
                            size="xl"
                            className="group relative border-0 text-white bg-gradient-to-r from-[#FF7E5F] via-[#EB5897] to-[#9F48DA] hover:scale-105 transition-transform duration-300 shadow-lg shadow-purple-500/25"
                            asChild
                        >
                            <Link href="/ai-readiness-quiz">
                                Take AI Readiness Quiz
                                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </Button>

                        <Button
                            size="xl"
                            variant="heroOutline"
                            className="group border border-gray-700 bg-white/5 hover:bg-white/10 text-white"
                        >
                            <Calendar className="mr-2 w-5 h-5 text-gray-400" />
                            Book AI Audit
                        </Button>
                    </div>

                    {/* Value Props */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-gray-800 mt-4">
                        <div className="flex flex-col gap-2">
                            <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-500 mb-1">
                                <Sparkles className="w-5 h-5" />
                            </div>
                            <h3 className="font-heading font-bold text-lg text-white">Strategy</h3>
                            <p className="text-sm text-gray-400">Custom AI Roadmap</p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-500 mb-1">
                                <Zap className="w-5 h-5" />
                            </div>
                            <h3 className="font-heading font-bold text-lg text-white">Automation</h3>
                            <p className="text-sm text-gray-400">Workflows That Scale</p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-500 mb-1">
                                <Target className="w-5 h-5" />
                            </div>
                            <h3 className="font-heading font-bold text-lg text-white">Training</h3>
                            <p className="text-sm text-gray-400">Team Enablement</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
