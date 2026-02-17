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
import { FileText, Calculator, Calendar, Brain, Clock, DollarSign, Settings, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
    title: "AI for Business Ops: Bookkeeping, Scheduling & Admin Automation",
    description: "Streamline your back office. Automate invoicing, data entry, and scheduling so you can focus on strategy.",
    openGraph: {
        title: "AI Operations Automation: The Backbone of Scale",
        description: "Reduce overhead by 40%. Automate the boring stuff with AI.",
        type: "article",
        url: "https://www.peyiai.com/ai-operations-automation",
        authors: ["Peyi Solutions"],
    },
};

const opsFaqs = [
    {
        question: "Is AI secure enough for my financial data?",
        answer: "Yes. We only implement tools that are SOC-2 compliant and use enterprise-grade encryption. AI tools like QuickBooks Online's AI features or specialized bookkeeping bots are built with bank-level security."
    },
    {
        question: "Can AI really handle my scheduling?",
        answer: "Better than a human assistant. AI scheduling tools (like Reclaim.ai or Motion) can negotiate meeting times with guests, optimize your calendar to minimize gaps, and even defend time for deep work automatically."
    },
    {
        question: "Will this replace my bookkeeper?",
        answer: "It replaces data entry, not the bookkeeper. Your financial professional shifts from typing in receipts to reviewing the AI's work and providing strategic advice."
    },
    {
        question: "How does it help with project management?",
        answer: "AI can listen to your team meetings, transcribe the audio, extract action items, assign them to the right person in Asana/ClickUp, and set due dates—all without a project manager taking notes."
    },
    {
        question: "What is the setup time?",
        answer: "Simple automations (like receipt processing) can be set up in hours. Complex operational workflows typically take 1-2 weeks to map out and implement correctly."
    }
];

export default function OpsPage() {
    return (
        <main className="min-h-screen bg-background">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Article",
                        "headline": "AI Operations Automation Guide for Business",
                        "description": "How to automate bookkeeping, scheduling, and admin tasks with AI.",
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
                            "@id": "https://www.peyiai.com/ai-operations-automation"
                        }
                    })
                }}
            />
            <Navbar />

            <PageHeader
                title="AI Operations Automation"
                gradientWord="for Efficiency"
                description="Streamline your back office. Let AI handle the invoices, data entry, and scheduling while you run the business."
            />

            <div className="container mx-auto px-6 mb-24">
                <Breadcrumbs
                    items={[
                        { label: "Solutions", href: "/#solutions" },
                        { label: "AI Operations", href: "/ai-operations-automation" }
                    ]}
                />

                {/* Intro */}
                <section className="mb-24 max-w-4xl">
                    <h2 className="text-2xl font-bold text-white mb-6">Operations Eating Your Profit?</h2>
                    <p className="text-lg text-muted-foreground leading-relaxed border-l-4 border-primary pl-6">
                        As you scale, the "boring" work scales with you. Invoicing, scheduling, compliance, and data entry can quickly consume 40% of your revenue in overhead. AI Operations Automation reverses this trend—allowing you to handle 10x the volume without adding a single new admin staff member.
                    </p>
                </section>

                {/* Benefits / Tools Grid */}
                <section className="mb-24">
                    <h2 className="text-3xl font-bold text-white mb-12">Automate the Back Office</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { icon: Calculator, title: "Bookkeeping", desc: "Auto-categorize transactions and reconcile accounts in real-time." },
                            { icon: Calendar, title: "Smart Scheduling", desc: "AI negotiates meeting times and optimizes your calendar logic." },
                            { icon: FileText, title: "Document Processing", desc: "Extract data from PDFs, invoices, and contracts instantly." },
                            { icon: Brain, title: "Meeting AI", desc: "Record, transcribe, and extract action items from every Zoom call." },
                            { icon: Clock, title: "Time Tracking", desc: "AI tracks billable hours automatically based on your activity." },
                            { icon: DollarSign, title: "Invoicing", desc: "Send invoices and chase late payments without human intervention." }
                        ].map((item, i) => (
                            <div key={i} className="p-8 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors">
                                <item.icon className="w-10 h-10 text-primary mb-6" />
                                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                                <p className="text-muted-foreground">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Tool Stack Table */}
                <ToolTable
                    title="The AI Ops Tech Stack"
                    description="Tools that act as your digital COO."
                    headers={["Category", "Tool", "Est. Price", "What It Automates"]}
                    rows={[
                        { category: "Smart Calendar", tool: "Motion / Reclaim", price: "$19/mo", whatItDoes: "Auto-schedules tasks & protects focus time." },
                        { category: "Meeting Notes", tool: "Fireflies.ai / Otter", price: "Free - $10/mo", whatItDoes: "Records calls & syncs action items to CRM." },
                        { category: "Bookkeeping", tool: "QuickBooks + AI", price: "$35/mo", whatItDoes: "Auto-tags expenses & predicts cash flow." },
                        { category: "Project Mgmt", tool: "ClickUp AI", price: "$12/mo", whatItDoes: "Summarizes tasks & writes project updates." },
                        { category: "Workflow", tool: "Zapier", price: "$29/mo", whatItDoes: "Moves data between apps (Glue of the internet)." }
                    ]}
                />

                {/* Comparison */}
                <section className="mb-24 max-w-5xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-white mb-4">Virtual Assistant vs AI Ops</h2>
                        <p className="text-muted-foreground">The cost of scale.</p>
                    </div>
                    <ComparisonTable
                        headers={["Human Admin / VA", "AI Operations Stack"]}
                        rowHeaders={["Cost", "Availability", "Error Rate", "Speed", "Scalability"]}
                        rows={[
                            ["$2,000 - $5,000/mo", "$100 - $500/mo"],
                            ["9am - 5pm (w/ breaks)", "24/7/365"],
                            ["Human Error (Fatigue)", "Near Zero"],
                            ["Minutes/Hours per task", "Milliseconds"],
                            ["Linear (Hire more people)", "Exponential (Add server capacity)"],
                        ]}
                    />
                </section>

                {/* ROI / Stats */}
                <section className="mb-24 bg-gradient-to-br from-green-500/10 to-transparent p-12 rounded-3xl border border-green-500/20 text-center">
                    <h2 className="text-3xl font-bold text-white mb-8">Operational Excellence</h2>
                    <div className="grid md:grid-cols-3 gap-12">
                        <div>
                            <div className="text-4xl font-bold text-green-400 mb-2">40%</div>
                            <p className="text-muted-foreground">reduction in operational overhead for AI-native businesses.</p>
                        </div>
                        <div>
                            <div className="text-4xl font-bold text-green-400 mb-2">0</div>
                            <p className="text-muted-foreground">missed invoices or billing errors.</p>
                        </div>
                        <div>
                            <div className="text-4xl font-bold text-green-400 mb-2">15h</div>
                            <p className="text-muted-foreground">saved per week per executive on scheduling and email.</p>
                        </div>
                    </div>
                </section>


                <FAQ
                    items={opsFaqs}
                    title="Ops Automation Questions"
                    description="Expert answers on streamlining your business."
                />

                {/* CTA */}
                <section className="text-center py-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Get Your Time Back</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
                        Stop being the highest paid admin assistant in your company. Let AI run the ops.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link href="/ai-readiness-quiz">
                            <Button size="lg" className="rounded-full px-8 text-lg h-14 bg-primary hover:bg-primary/90 text-background font-bold">
                                Get Your Ops Audit
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
