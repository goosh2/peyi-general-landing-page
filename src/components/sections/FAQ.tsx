"use client";

import { motion } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { useState } from "react";

export const homepageFaqs = [
    {
        question: "How can AI actually help my business make more money?",
        answer: "AI isn't just a buzzword—it's a profit multiplier. We help you automate repetitive tasks (saving labor costs), nurture leads 24/7 (increasing conversion rates), and identify upsell opportunities in your customer data. Our clients typically see ROI within the first 3 months."
    },
    {
        question: "What are the best AI tools for automating customer service in a small business?",
        answer: "The best tools depend on your business size. For small businesses, we recommend solutions like Intercom, Zendesk AI, or GoHighLevel's built-in AI features because they balance capability with affordability. We handle the full implementation to ensure the AI is trained on your specific business data."
    },
    {
        question: "How much does it cost to implement AI for a small business?",
        answer: "AI implementation costs vary, but it doesn't have to break the bank. Many small businesses start with $200–$500/month in tool costs plus implementation. We focus on 'Practical AI'—proving ROI with a single high-impact pilot project before scaling to more complex systems."
    },
    {
        question: "Can AI help with lead generation for small businesses?",
        answer: "Absolutely. AI can qualify leads 24/7 through chatbots and voice agents, score leads based on behavior, and automate personalized follow-ups. We build systems that integrate directly with your CRM so you never lose a qualified prospect."
    },
    {
        question: "What AI tools are best for real estate agents?",
        answer: "Real estate professionals benefit most from AI voice agents (for 24/7 lead capture), AI-powered CRM systems (like GoHighLevel or Follow Up Boss), and AI content tools for listing descriptions. We specialize in building complete AI stacks that automate lead follow-up and transaction coordination."
    },
    {
        question: "Is AI difficult to learn for non-technical business owners?",
        answer: "Not at all. The tools we recommend are designed for business professionals, not developers. More importantly, we handle the technical setup and configuration, then provide hands-on training so your team feels confident using the system from day one."
    },
    {
        question: "How can AI improve marketing for small businesses?",
        answer: "AI transforms marketing by automating personalized email campaigns, generating social media content at scale, and scoring leads to focus your sales efforts. It ensures your marketing runs consistently 24/7, even when you get busy with operations."
    },
    {
        question: "I don't know where to start. What is the first step?",
        answer: "The first step is identifying your 'Low Hanging Fruit'—processes that are high-volume, repetitive, and rule-based. We recommend starting with our AI Readiness Quiz to get a personalized recommendation on where to begin."
    },
    {
        question: "Will AI replace my employees?",
        answer: "No, it empowers them. By automating drudgery like data entry and basic scheduling, your team gets freed up to focus on high-value tasks like strategy, relationship building, and closing deals."
    }
];

interface FAQProps {
    items?: { question: string; answer: string }[];
    title?: string;
    description?: string;
}

export function FAQ({ items = homepageFaqs, title = "Common Questions", description = "Clear answers about how we help you turn AI into a competitive advantage." }: FAQProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": items.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
            }
        }))
    };

    return (
        <section className="py-24 bg-background relative overflow-hidden" id="faq">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
            <div className="container mx-auto px-4 max-w-4xl relative z-10">
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-3xl md:text-5xl font-bold font-heading">
                        {title}
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        {description}
                    </p>
                </div>

                <div className="space-y-4">
                    {items.map((faq, index) => (
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
