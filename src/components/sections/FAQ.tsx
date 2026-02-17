"use client";

import { motion } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { useState } from "react";

const faqs = [
    {
        question: "How can AI actually help my business make more money?",
        answer: "AI isn't just a buzzword—it's a profit multiplier. We help you automate repetitive tasks (saving labor costs), nurture leads 24/7 (increasing conversion rates), and identify upsell opportunities in your customer data. Our clients typically see ROI within the first 3 months."
    },
    {
        question: "I don't know where to start. What is the first step?",
        answer: "The first step is identifying your 'Low Hanging Fruit'—processes that are high-volume, repetitive, and rule-based. We recommend starting with our AI Readiness Quiz or booking a discovery call where we map out a phased roadmap, starting with a single high-impact pilot project."
    },
    {
        question: "Is AI expensive to implement for a small business?",
        answer: "It doesn't have to be. We focus on 'Practical AI'—using affordable, off-the-shelf tools and custom integrations rather than building expensive models from scratch. You can start with a small pilot to prove the value before scaling up."
    },
    {
        question: "Will AI replace my employees?",
        answer: "No, it empowers them. By automating the drudgery (data entry, scheduling, basic follow-ups), your team gets freed up to focus on high-value tasks like strategy, creative problem solving, and closing deals. It's about augmentation, not replacement."
    }
];

export function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <section className="py-24 bg-background relative overflow-hidden" id="faq">
            <div className="container mx-auto px-4 max-w-4xl relative z-10">
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-3xl md:text-5xl font-bold font-heading">
                        Common{" "}
                        <span className="text-transparent bg-clip-text gradient-text">
                            Questions
                        </span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Clear answers about how we help you turn AI into a competitive advantage.
                    </p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="border border-white/5 rounded-2xl bg-white/5 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:border-white/10"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full flex items-center justify-between p-6 text-left"
                                aria-expanded={openIndex === index}
                            >
                                <span className="text-lg font-medium text-white pr-8">
                                    {faq.question}
                                </span>
                                <span className={`flex-shrink-0 text-primary transition-transform duration-300 ${openIndex === index ? "rotate-180" : ""}`}>
                                    {openIndex === index ? <Minus className="w-6 h-6" /> : <Plus className="w-6 h-6" />}
                                </span>
                            </button>

                            <motion.div
                                initial={false}
                                animate={{ height: openIndex === index ? "auto" : 0, opacity: openIndex === index ? 1 : 0 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                className="overflow-hidden"
                            >
                                <div className="p-6 pt-0 text-gray-400 leading-relaxed border-t border-white/5">
                                    {faq.answer}
                                </div>
                            </motion.div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
