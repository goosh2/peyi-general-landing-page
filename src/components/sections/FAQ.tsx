"use client";

import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export const homepageFaqs = [
    {
        question: "How can AI actually help my business make more money?",
        answer: "AI isn't just a buzzword—it's a profit multiplier. We help you automate repetitive tasks (saving labor costs), nurture leads 24/7 (increasing conversion rates), and identify upsell opportunities in your customer data. We start with the workflow where the payoff is clearest, so you can judge the return for yourself before going further."
    },
    {
        question: "What are the best AI tools for automating customer service in a small business?",
        answer: "The best tools depend on your business size and needs. For small businesses, we typically recommend Intercom (starting ~$39/mo), Tidio AI (~$29/mo), or GoHighLevel's built-in AI features (~$97/mo) for their balance of capability and affordability. The key isn't the tool — it's how it's configured. A poorly set up AI chatbot frustrates customers; a well-configured one resolves routine questions instantly and hands the rest to you with context. That's why we handle full implementation. [→ Learn more about AI Customer Service Solutions](/ai-customer-service-small-business)"
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

/**
 * Answers are authored with inline markdown links. Render them as real anchors —
 * printing the raw `[label](href)` source to the page loses the internal link
 * entirely and reads as an unfinished page.
 */
const MARKDOWN_LINK = /\[([^\]]+)\]\(([^)]+)\)/g;

/**
 * Plain-text form for the FAQ JSON-LD. Answer engines read this schema directly,
 * so it must not carry raw markdown syntax.
 */
function toPlainText(answer: string) {
    return answer.replace(MARKDOWN_LINK, (_full, label: string) => label.replace(/^→\s*/, "")).trim();
}

function renderAnswer(answer: string) {
    const nodes: React.ReactNode[] = [];
    let cursor = 0;

    for (const match of answer.matchAll(MARKDOWN_LINK)) {
        const [full, label, href] = match;
        const start = match.index ?? 0;

        if (start > cursor) {
            nodes.push(answer.slice(cursor, start));
        }

        nodes.push(
            <Link
                key={`${href}-${start}`}
                href={href}
                className="text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
            >
                {label.replace(/^→\s*/, "")}
            </Link>
        );

        cursor = start + full.length;
    }

    if (cursor < answer.length) {
        nodes.push(answer.slice(cursor));
    }

    return nodes;
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
                "text": toPlainText(faq.answer)
            }
        }))
    };

    return (
        // Denser padding and a narrower measure than the rest of the page: this is
        // reference material, read at the visitor's own pace, not a statement beat.
        <section className="py-16 md:py-20 bg-background relative overflow-hidden" id="faq">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
            <div className="container mx-auto px-4 max-w-3xl relative z-10">
                <div className="text-center mb-12">
                    <p className="type-eyebrow mb-4">Answers</p>
                    <h2 className="type-section font-heading text-white mb-4">
                        {title}
                    </h2>
                    <p className="text-gray-400 max-w-xl mx-auto text-pretty">
                        {description}
                    </p>
                </div>

                <div className="space-y-4">
                    {items.map((faq, index) => (
                        <div
                            key={index}
                            className="border border-white/5 rounded-2xl bg-white/5 backdrop-blur-sm overflow-hidden transition-colors duration-200 hover:border-white/10"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full flex items-center justify-between p-6 text-left cursor-pointer transition-colors duration-150 hover:bg-white/[0.03] active:bg-white/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-2xl"
                                aria-expanded={openIndex === index}
                            >
                                <span className="text-lg font-medium text-white pr-8">
                                    {faq.question}
                                </span>
                                {/* One glyph that rotates + into ×: continuous motion reads as the
                                    same object changing state, where swapping icons reads as a cut. */}
                                <motion.span
                                    className="flex-shrink-0 text-primary"
                                    animate={{ rotate: openIndex === index ? 45 : 0 }}
                                    transition={{ type: "spring", bounce: 0, duration: 0.35 }}
                                >
                                    <Plus className="w-6 h-6" />
                                </motion.span>
                            </button>

                            <motion.div
                                initial={false}
                                animate={{ height: openIndex === index ? "auto" : 0, opacity: openIndex === index ? 1 : 0 }}
                                transition={{ type: "spring", bounce: 0, duration: 0.35, opacity: { duration: 0.2 } }}
                                className="overflow-hidden"
                            >
                                <div className="p-6 pt-0 text-gray-400 leading-relaxed border-t border-white/5">
                                    {renderAnswer(faq.answer)}
                                </div>
                            </motion.div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
