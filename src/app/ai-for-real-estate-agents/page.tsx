import { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHeader } from "@/components/ui/page-header";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { ComparisonTable } from "@/components/ui/comparison-table";
import { ToolTable } from "@/components/ui/tool-table";
import { FAQ } from "@/components/sections/FAQ";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CheckCircle2, Bot, Mic, MessageSquare, Database, PenTool, BarChart, BadgeCheck } from "lucide-react";

export const metadata: Metadata = {
    title: "AI for Real Estate Agents: Tools, Automation & Implementation Guide (2026)",
    description: "Discover the best AI tools for real estate professionals. From AI voice agents and lead capture to CRM automation and transaction coordination — plus implementation guidance.",
    openGraph: {
        title: "AI for Real Estate Agents: The Complete Guide",
        description: "Automate lead capture, follow-ups, and admin. The definitive guide to AI for Realtors.",
        type: "article",
        url: "https://www.peyiai.com/ai-for-real-estate-agents",
        authors: ["Peyi Solutions"],
    },
};

const realEstateFaqs = [
    {
        question: "Will AI voice agents sound robotic to my leads?",
        answer: "Modern AI voice agents (like the ones we implement) are nearly indistinguishable from humans. They pause naturally, handle interruptions, and can even detect sentiment. Most leads don't realize they're talking to an AI until the agent schedules the appointment."
    },
    {
        question: "Does GoHighLevel replace my existing CRM like kvCORE or Follow Up Boss?",
        answer: "It can, but it doesn't have to. We often integrate GoHighLevel as a 'frontend' to handle speed-to-lead and initial qualification, then sync qualified leads into your main CRM. However, for many agents, GoHighLevel replaces 3-4 separate tools (CRM, email marketing, calendar, funnel builder) saving significant money."
    },
    {
        question: "How long does it take to set up an AI system?",
        answer: "A basic lead reactivation system can be live in 48 hours. A full custom build with voice AI and transaction coordination automation typically takes 2-3 weeks to configure, test, and launch."
    },
    {
        question: "Is my client data secure with these AI tools?",
        answer: "Yes. The enterprise-grade tools we recommend (like GoHighLevel and OpenAI) use encryption and adhere to strict data privacy standards. We also configure your system so that you retain 100% ownership of your data."
    },
    {
        question: "What is the ROI of AI for a real estate agent?",
        answer: "The primary ROI comes from 'Speed to Lead' and 'Long-term Nurture'. AI contacts leads within seconds 24/7, increasing conversion rates by up to 300%. Additionally, saving 10-15 hours of admin time per week allows you to focus on high-dollar activities like showing homes and negotiating contracts."
    },
    {
        question: "Do I need to be tech-savvy to manage this?",
        answer: "No. The system is 'done-for-you'. Once built, you simply receive notifications when a lead is qualified and ready to talk. We provide a simple mobile app where you can see all conversations and appointments."
    },
    {
        question: "What happens if the AI makes a mistake?",
        answer: "We frame the AI with strict guardrails and specific knowledge bases so it stays on script. If it encounters a complex question it can't answer, it's programmed to politely escalate the conversation to a human agent immediately."
    },
    {
        question: "Can this work for a team or brokerage?",
        answer: "Absolutely. We build multi-user systems where leads are routed to specific agents based on round-robin rules or territory. Team leaders get a master dashboard to view all agent activity and lead performance."
    }
];

export default function RealEstatePage() {
    return (
        <main className="min-h-screen bg-background">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Article",
                        "headline": "AI for Real Estate Agents: The Complete Implementation Guide",
                        "description": "A comprehensive guide to implementing AI voice agents, CRMs, and automation in your real estate business.",
                        "author": {
                            "@type": "Organization",
                            "name": "Peyi Solutions",
                            "url": "https://www.peyiai.com"
                        },
                        "publisher": {
                            "@type": "Organization",
                            "name": "Peyi Solutions",
                            "logo": {
                                "@type": "ImageObject",
                                "url": "https://www.peyiai.com/logo.png"
                            }
                        },
                        "mainEntityOfPage": {
                            "@type": "WebPage",
                            "@id": "https://www.peyiai.com/ai-for-real-estate-agents"
                        }
                    })
                }}
            />
            <Navbar />

            <PageHeader
                title="AI for Real Estate Agents"
                gradientWord="Implementation Guide"
                description="Automate lead capture, follow-ups, scheduling, and marketing. Free yourself from admin work and focus on closing deals."
            />

            <div className="container mx-auto px-6 mb-24">
                <Breadcrumbs
                    items={[
                        { label: "Solutions", href: "/#solutions" },
                        { label: "AI for Real Estate Agents", href: "/ai-for-real-estate-agents" }
                    ]}
                />

                {/* Direct Answer / Intro */}
                <section className="mb-24 max-w-4xl">
                    <h2 className="text-2xl font-bold text-white mb-6">What is AI for Real Estate?</h2>
                    <p className="text-lg text-muted-foreground leading-relaxed border-l-4 border-primary pl-6">
                        AI for real estate is the application of artificial intelligence tools—such as voice agents, chatbots, and predictive analytics—to automate the repetitive tasks of a real estate business. Unlike simple automation, AI can understand context, hold conversations with leads, and personalize marketing at scale, allowing agents to service more clients without increasing headcount.
                    </p>
                </section>

                {/* Tool Categories */}
                <section className="mb-24">
                    <h2 className="text-3xl font-bold text-white mb-12">The AI Tools Every Agent Should Know</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            { icon: Mic, title: "AI Voice Agents", desc: "Answer calls 24/7, qualify leads, and book appointments instantly." },
                            { icon: Database, title: "AI-Powered CRM", desc: "Automatically nurture leads for 12+ months with personalized messages." },
                            { icon: MessageSquare, title: "Lead Gen Chatbots", desc: "Engage website visitors and qualify them before they leave your site." },
                            { icon: PenTool, title: "Content Creation", desc: "Generate listing descriptions, social posts, and emails in seconds." },
                            { icon: Bot, title: "Transaction Coordinator", desc: "Automate document collection, deadlines, and compliance checks." },
                            { icon: BarChart, title: "Marketing Automation", desc: "Run ads, retarget leads, and optimize spend with AI guidance." }
                        ].map((tool, i) => (
                            <div key={i} className="p-8 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors">
                                <tool.icon className="w-10 h-10 text-primary mb-6" />
                                <h3 className="text-xl font-bold text-white mb-3">{tool.title}</h3>
                                <p className="text-muted-foreground">{tool.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Tool Stack Table */}
                <ToolTable
                    title="The Complete Real Estate AI Tech Stack"
                    description="Our recommended tools for a modern, automated real estate business."
                    headers={["Category", "Recommended Tool", "Est. Price", "What It Does"]}
                    rows={[
                        { category: "Voice AI", tool: "Bland AI / Vapi", price: "~$0.09/min", whatItDoes: "Handles inbound/outbound calls 24/7." },
                        { category: "CRM & Funnels", tool: "GoHighLevel", price: "$97/mo", whatItDoes: "All-in-one CRM, email, SMS, and automation." },
                        { category: "Video Avatars", tool: "HeyGen", price: "$29/mo", whatItDoes: "Create social media video content without a camera." },
                        { category: "Data & Leads", tool: "PropStream", price: "$99/mo", whatItDoes: "Pull lists of distressed properties and leads." },
                        { category: "Automation", tool: "Make.com", price: "Free - $29/mo", whatItDoes: "Connects all your tools together (e.g. Zillow -> CRM)." }
                    ]}
                />

                {/* Comparison Table */}
                <section className="mb-24 max-w-5xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-white mb-4">Tool Comparison: AI CRM Systems</h2>
                        <p className="text-muted-foreground">Why we often recommend GoHighLevel for implementation.</p>
                    </div>
                    <ComparisonTable
                        headers={["GoHighLevel", "Follow Up Boss", "kvCORE", "HubSpot"]}
                        rowHeaders={["AI Lead Scoring", "Built-in Voice AI", "SMS & Email Automation", "Unified Inbox", "Funnel Builder", "Cost Effectivness"]}
                        rows={[
                            ["✅", "✅", "✅", "✅"],
                            ["✅", "❌", "❌", "❌"],
                            ["✅", "❌", "✅", "✅"],
                            ["✅", "❌", "✅", "✅"],
                            ["✅", "❌", "❌", "✅"],
                            ["High", "Medium", "varies", "Low"]
                        ]}
                    />
                    <div className="mt-8 p-6 rounded-xl bg-primary/10 border border-primary/20">
                        <p className="text-sm text-gray-300">
                            <strong>Note:</strong> We specialize in GoHighLevel implementation for real estate professionals because of its all-in-one capabilities (replacing Mailchimp, Calendly, ClickFunnels, etc.) and cost-effectiveness.
                        </p>
                    </div>
                </section>

                {/* Cost Breakdown */}
                <section className="mb-24 bg-white/5 p-8 md:p-12 rounded-3xl border border-white/10">
                    <h2 className="text-3xl font-bold text-white mb-8 text-center">How Much Does an AI System Cost?</h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="p-6 rounded-2xl bg-[#0B0F19] border border-white/10">
                            <h3 className="text-xl font-bold text-white mb-2">Starter AI Stack</h3>
                            <p className="text-muted-foreground mb-6 text-sm">Best for solo agents just getting started.</p>
                            <ul className="space-y-3 mb-6">
                                <li className="flex justify-between text-gray-300 text-sm"><span>Smart CRM (GoHighLevel)</span> <span>$97/mo</span></li>
                                <li className="flex justify-between text-gray-300 text-sm"><span>AI Content Tools (ChatGPT Plus)</span> <span>$20/mo</span></li>
                                <li className="flex justify-between text-gray-300 text-sm"><span>Video AI (OpusClip)</span> <span>$19/mo</span></li>
                            </ul>
                            <div className="border-t border-white/10 pt-4 flex justify-between items-center">
                                <span className="font-bold text-white">Total Estimated Cost</span>
                                <span className="text-2xl font-bold text-primary">~$136/mo</span>
                            </div>
                        </div>
                        <div className="p-6 rounded-2xl bg-[#0B0F19] border border-white/10 relative overflow-hidden">
                            <div className="absolute top-0 right-0 bg-primary/20 px-3 py-1 rounded-bl-xl text-xs font-bold text-primary border-b border-l border-white/10">RECOMMENDED</div>
                            <h3 className="text-xl font-bold text-white mb-2">Pro Growth Stack</h3>
                            <p className="text-muted-foreground mb-6 text-sm">For agents & teams ready to scale.</p>
                            <ul className="space-y-3 mb-6">
                                <li className="flex justify-between text-gray-300 text-sm"><span>All-in-One CRM & Automation</span> <span>$97/mo</span></li>
                                <li className="flex justify-between text-gray-300 text-sm"><span>AI Voice Agent (500 mins)</span> <span>~$50/mo</span></li>
                                <li className="flex justify-between text-gray-300 text-sm"><span>Data Scraper (PropStream)</span> <span>$99/mo</span></li>
                                <li className="flex justify-between text-gray-300 text-sm"><span>Make.com Automation</span> <span>$29/mo</span></li>
                            </ul>
                            <div className="border-t border-white/10 pt-4 flex justify-between items-center">
                                <span className="font-bold text-white">Total Estimated Cost</span>
                                <span className="text-2xl font-bold text-primary">~$275/mo</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Why Peyi/About Peyi */}
                <section className="mb-24 flex flex-col md:flex-row items-center gap-12">
                    <div className="flex-1">
                        <BadgeCheck className="w-16 h-16 text-primary mb-6" />
                        <h2 className="text-3xl font-bold text-white mb-6">Why Partner With Peyi Solutions?</h2>
                        <p className="text-lg text-muted-foreground mb-6">
                            We don't just sell you software and wish you luck. <strong>We build the entire system for you.</strong>
                        </p>
                        <p className="text-gray-400 leading-relaxed mb-6">
                            Real estate is a relationship business. You shouldn't be stuck behind a computer configuring webhooks or training chatbots. Peyi Solutions specializes in the technical implementation of AI for real estate. We configure the voice agents to sound like you, build the nurtures to convert your leads, and train your team on how to manage the dashboard.
                        </p>
                        <ul className="space-y-2 text-gray-300">
                            <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary" /> <span>Custom-built workflows for your market</span></li>
                            <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary" /> <span>Done-for-you technical setup</span></li>
                            <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary" /> <span>Ongoing support & optimization</span></li>
                        </ul>
                    </div>
                    <div className="flex-1 bg-gradient-to-br from-primary/20 to-purple-500/20 p-1 rounded-3xl">
                        <div className="bg-[#0B0F19] p-8 rounded-[22px] h-full flex flex-col justify-center items-center text-center">
                            <h3 className="text-2xl font-bold text-white mb-4">Ready to Automate?</h3>
                            <p className="text-gray-400 mb-8 max-w-sm">
                                Find out exactly where AI can save you the most time and money right now.
                            </p>
                            <Link href="/ai-readiness-quiz">
                                <Button size="lg" className="rounded-full px-8 text-lg w-full bg-white text-black hover:bg-gray-200 font-bold">
                                    Take the Free AI Quiz
                                </Button>
                            </Link>
                        </div>
                    </div>
                </section>

                {/* ROI Section */}
                <section className="mb-24 bg-gradient-to-br from-white/5 to-transparent p-12 rounded-3xl border border-white/10">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-bold text-white mb-6">Save 15+ Hours Per Week</h2>
                            <p className="text-muted-foreground mb-8">
                                Most agents spend 80% of their time on low-value admin tasks. AI reverses this, letting you spend 80% of your time with clients.
                            </p>
                            <ul className="space-y-4">
                                {[
                                    { saved: "3-5 Hours", task: "Lead Follow-up & Reactivation" },
                                    { saved: "2-3 Hours", task: "Appointment Scheduling" },
                                    { saved: "2-3 Hours", task: "Listing Descriptions & Social Content" },
                                    { saved: "2-4 Hours", task: "Data Entry & CRM Updates" }
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-4 text-gray-300">
                                        <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-500 font-bold text-xs">
                                            <CheckCircle2 className="w-5 h-5" />
                                        </div>
                                        <span><strong className="text-white">{item.saved}</strong> saved on {item.task}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="relative">
                            <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full" />
                            <div className="relative bg-[#0B0F19] p-8 rounded-2xl border border-white/10 shadow-2xl">
                                <h3 className="text-xl font-bold text-white mb-6 border-b border-white/10 pb-4">The "Old Way" vs "AI Way"</h3>
                                <div className="space-y-6">
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-red-400">Manual Follow-up</span>
                                        <span className="text-gray-500">vs</span>
                                        <span className="text-green-400 font-bold">Instant AI Voice Call</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-red-400">Chase Leads for Days</span>
                                        <span className="text-gray-500">vs</span>
                                        <span className="text-green-400 font-bold">Booked on Calendar Automatically</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-red-400">Generic Batch Emails</span>
                                        <span className="text-gray-500">vs</span>
                                        <span className="text-green-400 font-bold">Personalized 1:1 Messages</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Implementation Guide */}
                <section className="mb-24">
                    <h2 className="text-3xl font-bold text-white mb-12 text-center">Your Implementation Roadmap</h2>
                    <div className="grid md:grid-cols-4 gap-6">
                        {[
                            { step: "01", title: "Audit", desc: "We identify your biggest time-drains and missed opportunities." },
                            { step: "02", title: "Strategy", desc: "We design a custom AI workflow tailored to your market." },
                            { step: "03", title: "Build", desc: "We configure the tools, voice agents, and automations for you." },
                            { step: "04", title: "Launch", desc: "We train you and your team, then flip the switch." }
                        ].map((phase, i) => (
                            <div key={i} className="relative p-6 pt-12 rounded-xl border border-white/10 bg-white/5">
                                <span className="absolute top-6 left-6 text-4xl font-bold text-white/5 font-heading">{phase.step}</span>
                                <h3 className="text-xl font-bold text-white mb-3 relative z-10">{phase.title}</h3>
                                <p className="text-muted-foreground relative z-10">{phase.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* FAQ */}
                <FAQ
                    items={realEstateFaqs}
                    title="Real Estate AI Questions"
                    description="Specific answers for agents, brokers, and team leaders."
                />

                {/* CTA */}
                <section className="text-center py-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Modernize Your Real Estate Business?</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
                        Stop chasing leads manually. Let us build an AI system that works 24/7 to fill your calendar with qualified appointments.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link href="/ai-readiness-quiz">
                            <Button size="lg" className="rounded-full px-8 text-lg h-14 bg-primary hover:bg-primary/90 text-background font-bold">
                                Take the AI Readiness Quiz
                            </Button>
                        </Link>
                        <Link href="/#contact">
                            <Button variant="heroOutline" size="lg" className="rounded-full px-8 text-lg h-14">
                                Book a Strategy Call
                            </Button>
                        </Link>
                    </div>
                </section>
            </div>

            <Footer />
        </main>
    );
}
