import { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHeader } from "@/components/ui/page-header";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { ComparisonTable } from "@/components/ui/comparison-table";
import { FAQ } from "@/components/sections/FAQ";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CheckCircle2, Bot, Mic, MessageSquare, PhoneMissed, CalendarCheck, ShieldCheck, BadgeCheck, PhoneCall } from "lucide-react";

export const metadata: Metadata = {
    title: "Self-Selling Voice AI Agent | Peyi Solutions",
    description: "Stop missing calls, losing leads, and leaving money on the table. Get your own 24/7 Voice AI Assistant to answer calls and book appointments.",
    openGraph: {
        title: "Peyi AI: Your 24/7 Virtual Receptionist",
        description: "Never miss a call, lead, or opportunity again with Peyi AI.",
        type: "article",
        url: "https://www.peyiai.com/voice-ai-agent",
        authors: ["Peyi Solutions"],
    },
};

const voiceAiFaqs = [
    {
        question: "Can I get help setting up Peyi AI?",
        answer: "Absolutely! Our team is here to answer any questions you have while getting started with Peyi AI. Just reach out to us through our support channels."
    },
    {
        question: "How long does it take to set up?",
        answer: "It’s quick and easy! We scan your website to train Peyi AI right away. Then, you just confirm your data, add any FAQs or messaging preferences, and you're all set."
    },
    {
        question: "Does Peyi AI stay updated on my business information, like hours?",
        answer: "Yes! Peyi AI can automatically pull your business hours and other info from your Google Business Profile and website. You can also edit and update details anytime."
    },
    {
        question: "How can I provide Peyi AI feedback?",
        answer: "You can always reach out to our online support system 24/7."
    },
    {
        question: "Can I keep my phone number?",
        answer: "Yes! You don’t need to change a thing. We’ll guide you through setting up call forwarding with your existing phone number."
    }
];

export default function VoiceAIPage() {
    return (
        <main className="min-h-screen bg-background">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "WebPage",
                        "headline": "Stop Missing Calls & Losing Leads with Peyi AI",
                        "description": "Imagine a world where every call, every inquiry, and every request is handled instantly and professionally. Automate your phone answering with Peyi AI.",
                        "author": {
                            "@type": "Organization",
                            "name": "Peyi Solutions",
                            "url": "https://www.peyiai.com"
                        },
                        "mainEntityOfPage": {
                            "@type": "WebPage",
                            "@id": "https://www.peyiai.com/voice-ai-agent"
                        }
                    })
                }}
            />
            <Navbar />

            <PageHeader
                title="Stop Missing Calls,"
                gradientWord="Losing Leads & Money"
                description="Imagine a world where every call, every inquiry, and every request is handled instantly and professionally. Meet your 24/7 Virtual Receptionist."
            />

            <div className="container mx-auto px-6 mb-24">
                <Breadcrumbs
                    items={[
                        { label: "Solutions", href: "/#solutions" },
                        { label: "Voice AI Agent", href: "/voice-ai-agent" }
                    ]}
                />

                {/* Direct Answer / Intro */}
                <section className="mb-24 flex flex-col md:flex-row gap-12 items-center">
                    <div className="flex-1">
                        <h2 className="text-3xl font-bold text-white mb-6">Right now, you could be losing sales without even knowing it.</h2>
                        <p className="text-lg text-muted-foreground leading-relaxed border-l-4 border-primary pl-6 mb-6">
                            Every missed call is a lead that was ready to work with you...gone. A new lead calls someone else. A current client feels ignored. A deal slips away. How much longer can you afford to let business slip away?
                        </p>
                        <ul className="space-y-4 text-gray-300">
                            <li className="flex items-start gap-3">
                                <PhoneCall className="w-6 h-6 text-primary shrink-0" />
                                <span><strong>Peyi AI picks up every time:</strong> Ensuring your business feels approachable and professional.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <MessageSquare className="w-6 h-6 text-primary shrink-0" />
                                <span><strong>Instant responses:</strong> "What’s your availability?", "Can I get a quote?", "What's your process?" — answered instantly.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <CalendarCheck className="w-6 h-6 text-primary shrink-0" />
                                <span><strong>Book Appointments:</strong> Peyi AI sends interested prospects a link to schedule on your calendar, so new opportunities get booked autonomously.</span>
                            </li>
                        </ul>
                    </div>
                    <div className="flex-1 bg-white/5 p-8 rounded-3xl border border-white/10 text-center flex flex-col justify-center items-center h-full">
                        <PhoneMissed className="w-16 h-16 text-red-400 mb-6" />
                        <h3 className="text-2xl font-bold text-white mb-4">Want to try it yourself right now?</h3>
                        <p className="text-gray-400 mb-8 max-w-sm">
                            Listen as Peyi AI answers calls like a pro. Call our demo number to experience it live.
                        </p>
                        <a href="tel:9548334829">
                            <Button size="lg" className="rounded-full px-8 text-xl w-full bg-white text-black hover:bg-gray-200 font-bold mb-4">
                                Call (954) 833-4829
                            </Button>
                        </a>
                        <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold">Live Interactive Demo</p>
                    </div>
                </section>

                {/* How It Works */}
                <section className="mb-24">
                    <h2 className="text-3xl font-bold text-white mb-12 text-center">Here's How It Works</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { step: "STEP 1", title: "We Train Your Peyi AI", desc: "Share your FAQs, common scripts, and preferences. Peyi AI learns your style and business inside-out." },
                            { step: "STEP 2", title: "Peyi AI Handles Your Calls", desc: "Calls are answered promptly and professionally. Call recordings and transcripts are sent directly to you, so you're always informed." },
                            { step: "STEP 3", title: "Focus on Selling", desc: "Scheduling? Done. Initial lead qualification? Covered. Peyi AI does the rest while you focus on growth." }
                        ].map((phase, i) => (
                            <div key={i} className="relative p-8 rounded-2xl border border-white/10 bg-[#0B0F19] hover:bg-white/5 transition-colors">
                                <span className="absolute top-4 right-4 text-5xl font-bold text-white/5 font-heading block">{phase.step.replace('STEP ', '')}</span>
                                <div className="text-primary font-bold text-sm tracking-widest mb-4 uppercase">{phase.step}</div>
                                <h3 className="text-xl font-bold text-white mb-4 relative z-10">{phase.title}</h3>
                                <p className="text-muted-foreground relative z-10 leading-relaxed">{phase.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Bundle / Pricing */}
                <section className="mb-24">
                    <div className="bg-gradient-to-br from-primary/20 to-purple-500/20 p-1 rounded-3xl max-w-5xl mx-auto">
                        <div className="bg-[#0B0F19] p-8 md:p-12 rounded-[22px] border border-white/5">
                            <div className="text-center mb-10">
                                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">The "Peyi AI" Bundle</h2>
                                <p className="text-xl text-primary font-heading font-medium">Your Complete Client-Handling Solution</p>
                                <div className="mt-6 inline-block bg-white/10 px-6 py-2 rounded-full border border-white/10">
                                    <span className="text-gray-300">Just </span>
                                    <span className="text-2xl font-bold text-white">$299/Month</span>
                                    <span className="text-sm text-gray-400"> (with a one-time $500 setup fee)</span>
                                </div>
                                <p className="mt-4 text-gray-400 text-sm max-w-2xl mx-auto">
                                    With Peyi AI, you get a complete client-handling system which you'd typically pay nearly $4,000 per month for. It's like having an entire team behind you without the extra hires!
                                </p>
                            </div>

                            <div className="grid md:grid-cols-2 gap-x-12 gap-y-6 mb-10">
                                {[
                                    { title: "24/7 Virtual Receptionist", desc: "Handles calls, books appointments, and manages inquiries." },
                                    { title: "Automated Review Management", desc: "Automatic review requests sent to boost your reputation on Google & Facebook." },
                                    { title: "Conversational AI Texting", desc: "Back-and-forth SMS to help your customers with their inquiries." },
                                    { title: "Call Recordings & Transcriptions", desc: "Easy access to all client details and conversations." },
                                    { title: "Onboarding & Setup Call", desc: "Step-by-step onboarding session with our team to configure your agent." },
                                    { title: "Real-Time Notifications", desc: "Instant alerts via text or email so you never miss a new lead." },
                                    { title: "VIP 24/7 Support", desc: "Dedicated support for any questions or issues, anytime you need us." },
                                    { title: "Full System Setup", desc: "Not tech-savvy? No problem. We set everything up for you." }
                                ].map((feature, i) => (
                                    <div key={i} className="flex gap-4">
                                        <CheckCircle2 className="w-6 h-6 text-primary shrink-0 mt-0.5" />
                                        <div>
                                            <h4 className="text-white font-bold mb-1">{feature.title}</h4>
                                            <p className="text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="text-center">
                                <Link href="/ai-readiness-quiz">
                                    <Button size="lg" className="rounded-full px-12 text-lg h-14 bg-primary hover:bg-primary/90 text-background font-bold shadow-[0_0_20px_rgba(var(--primary),0.3)]">
                                        START WORKING WITH PEYI AI NOW
                                    </Button>
                                </Link>
                                <p className="mt-4 text-xs text-gray-500">Less than the cost of 1 employee. Definitely less than losing your next appointment.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Comparison Table */}
                <section className="mb-24 max-w-5xl mx-auto text-center">
                    <h2 className="text-3xl font-bold text-white mb-12">Compare Your Options</h2>
                    <ComparisonTable
                        headers={["Features", "Traditional Voicemail", "Answering Service", "Peyi AI"]}
                        rowHeaders={["Availability", "Client Experience", "Scheduling", "Overall Value"]}
                        rows={[
                            ["After-hours only", "Limited availability", "24/7 Coverage"],
                            ["Clients hang up / leave", "Needs oversight / training", "Instant, professional response"],
                            ["No scheduling capabilities", "Inconsistent booking", "Autonomous booking & routing"],
                            ["High opportunity cost", "Expensive, unreliable", "Affordable, flawless execution"]
                        ]}
                    />
                </section>

                {/* FAQ */}
                <FAQ
                    items={voiceAiFaqs}
                    title="Frequently Asked Questions"
                    description="Everything you need to know about setting up and running your Virtual Receptionist."
                />

                {/* Final CTA */}
                <section className="text-center py-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">You Don't Need To Be A Tech Wizard</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
                        Simple, straightforward, and totally covered. We handle the setup so you can focus on doing what you do best.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link href="/ai-readiness-quiz">
                            <Button size="lg" className="rounded-full px-8 text-lg h-14 bg-white text-black hover:bg-gray-200 font-bold">
                                Buy Now
                            </Button>
                        </Link>
                        <a href="tel:9548334829">
                            <Button variant="heroOutline" size="lg" className="rounded-full px-8 text-lg h-14">
                                Test the AI (954) 833-4829
                            </Button>
                        </a>
                    </div>
                </section>
            </div>

            <Footer />
        </main>
    );
}
