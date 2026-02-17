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
        answer: "The best tools depend on your business size and needs. For small businesses, we typically recommend Intercom (starting ~$39/mo), Tidio AI (~$29/mo), or GoHighLevel's built-in AI features (~$97/mo) for their balance of capability and affordability. The key isn't the tool — it's how it's configured. A poorly set up AI chatbot frustrates customers; a well-configured one resolves 80% of tickets instantly. That's why we handle full implementation. [→ Learn more about AI Customer Service Solutions](/ai-customer-service-small-business)"
    },
    {
        question: "How much does it cost to implement AI for a small business?",
        answer: "AI implementation costs vary, but most small businesses can start with $100–$500/month in software tools plus a one-time implementation fee. For example: a basic AI chatbot runs $29–$99/month, an AI-powered CRM like GoHighLevel is $97–$297/month, and AI voice agents range from $50–$300/month depending on call volume. We focus on starting with one high-impact system, proving ROI within 90 days, then scaling."
    },
    {
        question: "Can AI help with lead generation for small businesses?",
        answer: "Absolutely. AI can qualify leads 24/7 through chatbots and voice agents, score leads based on engagement behavior, automate personalized follow-up sequences, and identify your highest-value prospects. We implement AI lead generation systems that integrate directly with your CRM so no lead falls through the cracks. [→ See our AI Lead Generation solutions](/ai-lead-generation-small-business)"
    },
    {
        question: "What AI tools are best for real estate agents?",
        answer: "Real estate professionals benefit most from AI voice agents (for 24/7 lead capture, ~$50–$200/mo), AI-powered CRM systems like GoHighLevel ($97–$297/mo), AI content tools (for listing descriptions and social media), and AI transaction coordinators. We specialize in building complete AI stacks for real estate. [→ See our Real Estate AI Solutions](/ai-for-real-estate-agents)"
    },
    {
        question: "Is AI difficult to learn for non-technical business owners?",
        answer: "Not at all. The AI tools we implement are designed for business professionals, not developers. If you can use email and social media, you can use these tools. We handle all technical setup, configuration, and integration — then train your team through hands-on sessions so you're confident using the system independently."
    },
    {
        question: "How can AI improve marketing for small businesses?",
        answer: "AI transforms small business marketing by automating personalized email campaigns, generating and scheduling social media content, optimizing ad targeting and spend, scoring leads so you focus on the hottest prospects, and creating content at scale. Most AI marketing stacks cost under $300/month in software — less than a single day of agency fees. [→ Learn more about AI Marketing Automation](/ai-marketing-automation-small-business)"
    },
    {
        question: "I don't know where to start. What is the first step?",
        answer: "The first step is identifying your 'Low Hanging Fruit'—processes that are high-volume, repetitive, and rule-based. We recommend starting with our AI Readiness Quiz to get a personalized recommendation on where to begin."
    },
    {
        question: "Will AI replace my employees?",
        answer: "No, it empowers them. By automating drudgery like data entry and basic scheduling, your team gets freed up to focus on high-value tasks like strategy, relationship building, and closing deals."
    },
    {
        question: "What is the best AI tool for small business customer service?",
        answer: "For most small businesses, we recommend GoHighLevel ($97/mo) if you want customer service AI integrated with your CRM and marketing, or Tidio ($29/mo) if you need a standalone chatbot. For SaaS companies, Intercom ($39/mo) offers the deepest AI resolution capabilities. The best choice depends on your support volume, channels (chat vs phone vs email), and whether you need CRM integration."
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
