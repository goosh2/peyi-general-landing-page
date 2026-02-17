"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Building2, Users, Briefcase } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const personas = [
    {
        title: "Real Estate Professionals",
        description: "From lead capture to transaction coordination, we build AI systems that let agents focus on closing deals, not chasing admin.",
        icon: Building2,
        href: "/ai-for-real-estate-agents",
        cta: "Explore Real Estate AI",
        gradient: "from-blue-500/20 to-purple-500/20"
    },
    {
        title: "Service-Based Businesses",
        description: "Automate scheduling, follow-ups, and customer communication so your team can focus on delivering great service.",
        icon: Users,
        href: "/ai-customer-service-small-business",
        cta: "See Service Solutions",
        gradient: "from-emerald-500/20 to-teal-500/20"
    },
    {
        title: "Small Business Owners",
        description: "Not sure where to start with AI? We help you identify the highest-ROI opportunities and implement them fast.",
        icon: Briefcase,
        href: "/ai-readiness-quiz", // Direct to quiz for general biz owners
        cta: "Start Your AI Journey",
        gradient: "from-orange-500/20 to-pink-500/20"
    }
];

export function WhoWeServe() {
    return (
        <section className="py-24 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px] opacity-20 pointer-events-none" />

            <div className="container px-6 mx-auto relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                    <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl tracking-tight">
                        AI Implementation for the Businesses <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">
                            That Need It Most
                        </span>
                    </h2>
                    <p className="text-lg text-muted-foreground">
                        We don't just talk about AI. We build the systems that save you time and make you money.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {personas.map((persona, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <Card className="h-full border-white/5 bg-white/5 backdrop-blur-sm hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10 group flex flex-col">
                                <CardHeader>
                                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${persona.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 border border-white/10`}>
                                        <persona.icon className="w-6 h-6 text-white" />
                                    </div>
                                    <CardTitle className="mb-2">{persona.title}</CardTitle>
                                    <CardDescription className="text-base text-gray-400 leading-relaxed">
                                        {persona.description}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="flex-grow" />
                                <CardFooter>
                                    <Button variant="ghost" className="group/btn p-0 hover:bg-transparent hover:text-primary transition-colors" asChild>
                                        <Link href={persona.href} className="flex items-center gap-2">
                                            {persona.cta} <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                        </Link>
                                    </Button>
                                </CardFooter>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
