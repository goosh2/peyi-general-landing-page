"use client";

import * as React from "react";

// Let's use simple state for now since I didn't add radix to the install command.
// Actually, I can just build a custom one easily.
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface AccordionItemProps {
    title: string;
    children: React.ReactNode;
    isOpen: boolean;
    onClick: () => void;
}

function AccordionItem({ title, children, isOpen, onClick }: AccordionItemProps) {
    return (
        <div className="border border-white/10 rounded-lg bg-card/30 backdrop-blur-sm overflow-hidden">
            <button
                onClick={onClick}
                className="w-full flex items-center justify-between p-6 text-left"
            >
                <span className="font-heading font-medium text-lg">{title}</span>
                <ChevronDown className={cn("w-5 h-5 text-muted-foreground transition-transform duration-300", isOpen && "rotate-180")} />
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <div className="px-6 pb-6 text-muted-foreground leading-relaxed border-t border-white/5 pt-4">
                            {children}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

const faqs = [
    { q: "What is Peyi Solutions and how does it help businesses with AI?", a: "Peyi Solutions is an AI consulting and implementation partner that helps small and mid-sized businesses understand, choose, and use AI effectively. We specialize in practical AI strategy, automation, training, and custom AI systems that solve real business problems, not experiments or hype." },
    { q: "How can a small business start using AI the right way?", a: "The right way to start using AI is by identifying specific business problems first, not tools. Peyi Solutions helps businesses assess where AI can save time, improve workflows, increase revenue, or reduce manual effort, then recommends and implements the most appropriate AI solutions for those needs." },
    { q: "Is ChatGPT good enough for running a business?", a: "ChatGPT is useful, but most businesses need more than ChatGPT alone. While ChatGPT can assist with writing and ideas, businesses often benefit more from custom AI systems, automated workflows, and AI tools connected to their data and existing software." },
    { q: "How can AI help my business make more money?", a: "AI can help businesses make more money by improving lead response times, automating follow-ups, reducing operational costs, enhancing customer experience, and freeing up time for high-value work." },
    { q: "Do I need technical skills or coding experience to use AI?", a: "No. You do not need technical or coding skills to use AI effectively. Peyi Solutions handles the technical setup and provides clear training so business owners and teams can confidently use AI tools without needing to become technical experts." },
    { q: "Can Peyi Solutions build a custom AI system for my business?", a: "Yes. Peyi Solutions designs and implements custom AI systems tailored to each business. This can include AI assistants, automated workflows, internal AI tools, customer-facing AI, or AI systems trained on your business data." },
    { q: "How do businesses stay up to date with AI without chasing every new tool?", a: "Businesses stay up to date by focusing on stable, proven AI use cases, not trends. Peyi Solutions acts as a long-term AI partner, helping clients evaluate new tools, avoid unnecessary complexity, and update systems only when it makes strategic sense." },
    { q: "Who should work with Peyi Solutions?", a: "Peyi Solutions works best with small and mid-sized business owners, entrepreneurs, and teams who want clear guidance on how to use AI and who need help implementing AI systems that deliver practical business value." }
];

export function FAQ() {
    const [openIndex, setOpenIndex] = React.useState<number | null>(0);

    return (
        <section className="py-20 px-6 max-w-3xl mx-auto">
            <div className="text-center mb-12">
                <h2 className="font-heading font-bold text-4xl mb-4">Frequently Asked <span className="gradient-text">Questions</span></h2>
                <p className="text-muted-foreground">Get answers to common questions about AI implementation and how we can help.</p>
            </div>

            <div className="space-y-4">
                {faqs.map((faq, idx) => (
                    <AccordionItem
                        key={idx}
                        title={faq.q}
                        isOpen={openIndex === idx}
                        onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                    >
                        {faq.a}
                    </AccordionItem>
                ))}
            </div>
        </section>
    );
}
