"use client";

import { motion } from "framer-motion";

interface PageHeaderProps {
    title: string;
    description: string;
    gradientWord?: string;
}

export function PageHeader({ title, description, gradientWord }: PageHeaderProps) {
    return (
        <section className="pt-32 pb-16 relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px] pointer-events-none" />
            <div className="absolute -top-24 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] opacity-20 pointer-events-none" />

            <div className="container px-6 mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-4xl"
                >
                    <h1 className="font-heading font-bold text-4xl md:text-6xl leading-[1.1] tracking-tight text-white mb-6">
                        {title}
                        {gradientWord && (
                            <>
                                {" "}
                                <span className="text-transparent bg-clip-text gradient-text">
                                    {gradientWord}
                                </span>
                            </>
                        )}
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
                        {description}
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
