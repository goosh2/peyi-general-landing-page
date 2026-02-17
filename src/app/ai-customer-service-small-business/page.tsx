import { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHeader } from "@/components/ui/page-header";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { ComparisonTable } from "@/components/ui/comparison-table";
import { FAQ } from "@/components/sections/FAQ";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MessageCircle, Phone, Globe, Clock, ShieldCheck, Zap } from "lucide-react";

export const metadata: Metadata = {
    title: "AI Customer Service for Small Business: Chatbots, Voice & Automation",
    description: "Automate your customer support without losing the human touch. Implement AI chatbots and voice agents to answer questions 24/7.",
    openGraph: {
        title: "AI Customer Service Solutions for Small Business",
        description: "Reduce support tickets by 80% with AI automation. 24/7 answers, instant resolution, and happy customers.",
        type: "article",
        url: "https://www.peyiai.com/ai-customer-service-small-business",
    },
};

const customerServiceFaqs = [
    {
        question: "Will an AI chatbot frustrate my customers?",
        answer: "Not if it's built correctly. We implement 'AI Agents'—not old-school rule-based chatbots. These agents understand natural language, can handle complex queries, and know exactly when to escalate to a human if they can't solve the problem."
    },
    {
        question: "Can the AI handle support tickets automatically?",
        answer: "Yes. By connecting to your knowledge base, the AI can resolve up to 80% of common tier-1 tickets (like 'reset password', 'shipping status', or 'pricing') instantly without human intervention."
    },
    {
        question: "Does it work in languages other than English?",
        answer: "Absolutely. Most modern AI support tools can instantly translate and converse in over 90 languages, allowing you to support a global customer base without hiring multilingual staff."
    },
    {
        question: "How much time does it take to train the AI?",
        answer: "We can usually train the initial model in less than a week using your existing FAQs, website content, and past support tickets. The system then improves over time as it interacts with more customers."
    },
    {
        question: "What happens if the AI gives a wrong answer?",
        answer: "We implement strict 'guardrails' to prevent hallucinations. If the AI isn't confident in an answer, it is programmed to say 'I'm not sure about that, let me connect you with a specialist' rather than guessing."
    }
];

export default function CustomerServicePage() {
    return (
        <main className="min-h-screen bg-background">
            <Navbar />

            <PageHeader
                title="AI Customer Service for Small Business"
                gradientWord="Support Automation"
                description="Provide instant, 24/7 support to your customers while reducing your team's workload by 80%."
            />

            <div className="container mx-auto px-6 mb-24">
                <Breadcrumbs
                    items={[
                        { label: "Solutions", href: "/#solutions" },
                        { label: "AI Customer Service", href: "/ai-customer-service-small-business" }
                    ]}
                />

                {/* Intro */}
                <section className="mb-24 max-w-4xl">
                    <h2 className="text-2xl font-bold text-white mb-6">Automate Support Without Losing the Human Touch</h2>
                    <p className="text-lg text-muted-foreground leading-relaxed border-l-4 border-primary pl-6">
                        AI Customer Service isn't about replacing your support team—it's about removing the repetitive "busy work" so they can focus on complex issues. By implementing intelligent chatbots and voice agents, you can answer 80% of questions instantly, 24/7, improving customer satisfaction and freeing up your staff.
                    </p>
                </section>

                {/* Benefits / Tools Grid */}
                <section className="mb-24">
                    <h2 className="text-3xl font-bold text-white mb-12">Why Automate Customer Service?</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { icon: Clock, title: "24/7 Availability", desc: "Your business never really closes. Answer questions at 2 AM as easily as 2 PM." },
                            { icon: Zap, title: "Instant Responses", desc: "No more wait times. AI provides answers in seconds, reducing bounce rates." },
                            { icon: Globe, title: "Multilingual Support", desc: "Instantly support customers in 90+ languages without hiring translators." },
                            { icon: MessageCircle, title: "Smart Chatbots", desc: "Resolve tier-1 issues like order status and FAQs automatically." },
                            { icon: Phone, title: "Voice AI Receptionist", desc: "Handle inbound calls, route enquires, and book appointments over the phone." },
                            { icon: ShieldCheck, title: "Consistent Answers", desc: "Ensure every customer gets the technically correct answer, every time." }
                        ].map((item, i) => (
                            <div key={i} className="p-8 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors">
                                <item.icon className="w-10 h-10 text-primary mb-6" />
                                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                                <p className="text-muted-foreground">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Comparison */}
                <section className="mb-24 max-w-5xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-white mb-4">Old Chatbots vs AI Agents</h2>
                        <p className="text-muted-foreground">Why Generative AI changes the game for small business support.</p>
                    </div>
                    <ComparisonTable
                        headers={["Old Rule-Based Chatbots", "Modern AI Agents (We Build)"]}
                        rowHeaders={["Understanding", "Setup Time", "Flexibility", "Tone & Brand Voice", "Complex Issues"]}
                        rows={[
                            ["Keywords only (Frustrating)", "Natural Language (Human-like)"],
                            ["Weeks of manual flow building", "Days (Trains on your data)"],
                            ["Breaks easily if user goes off-script", "Adapts to conversation flow"],
                            ["Robotic", "Matches your brand personality"],
                            ["Gets stuck loops", "Escalates to human seamlessly"],
                        ]}
                    />
                </section>

                {/* ROI / Stats */}
                <section className="mb-24 bg-gradient-to-br from-primary/10 to-transparent p-12 rounded-3xl border border-primary/20 text-center">
                    <h2 className="text-3xl font-bold text-white mb-8">The Cost of Doing Nothing</h2>
                    <div className="grid md:grid-cols-3 gap-12">
                        <div>
                            <div className="text-4xl font-bold text-primary mb-2">67%</div>
                            <p className="text-muted-foreground">of customers hang up if they can't reach a human or get an answer quickly.</p>
                        </div>
                        <div>
                            <div className="text-4xl font-bold text-primary mb-2">20h+</div>
                            <p className="text-muted-foreground">per week wasted by staff answering the same 5 questions over and over.</p>
                        </div>
                        <div>
                            <div className="text-4xl font-bold text-primary mb-2">24/7</div>
                            <p className="text-muted-foreground">customer expectation for support availability in 2026.</p>
                        </div>
                    </div>
                </section>

                <FAQ
                    items={customerServiceFaqs}
                    title="Customer Service AI Questions"
                    description="Common questions about automating support responsibly."
                />

                {/* CTA */}
                <section className="text-center py-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Stop Burying Your Team in Support Tickets</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
                        Let AI handle the repetitive questions so your team can focus on building relationships.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link href="/ai-readiness-quiz">
                            <Button size="lg" className="rounded-full px-8 text-lg h-14 bg-primary hover:bg-primary/90 text-background font-bold">
                                Get Your Support Audit
                            </Button>
                        </Link>
                        <Link href="/#contact">
                            <Button variant="heroOutline" size="lg" className="rounded-full px-8 text-lg h-14">
                                Book a Demo
                            </Button>
                        </Link>
                    </div>
                </section>
            </div>

            <Footer />
        </main>
    );
}
