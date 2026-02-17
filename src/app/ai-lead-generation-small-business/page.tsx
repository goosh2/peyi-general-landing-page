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
import { Users, Filter, MessageSquare, Database, Zap, Search, ArrowRight, Target, Magnet } from "lucide-react";

export const metadata: Metadata = {
    title: "AI Lead Generation & CRM for Small Business: Capture & Convert",
    description: "Stop chasing bad leads. Use AI to find, qualify, and nurture prospects automatically. Integrate with your CRM for seamless sales.",
    openGraph: {
        title: "AI Lead Gen & CRM: The Ultimate Sales Machine",
        description: "Automate your sales pipeline. From cold outreach to warm appointment, let AI handle the heavy lifting.",
        type: "article",
        url: "https://www.peyiai.com/ai-lead-generation-small-business",
        authors: ["Peyi Solutions"],
    },
};

const leadGenFaqs = [
    {
        question: "How does AI find new leads?",
        answer: "AI tools can scrape public databases (like LinkedIn, Google Maps, and business directories) to find prospects matching your exact ideal customer profile (ICP). It then verifies their email and phone number instantly."
    },
    {
        question: "Does this work with my existing CRM?",
        answer: "Yes. We can integrate AI lead gen tools with HubSpot, Salesforce, Pipedrive, or move you to a more modern AI-first CRM like GoHighLevel. The goal is to have leads flow automatically into your pipeline."
    },
    {
        question: "Can AI really qualify leads for me?",
        answer: "Absolutely. AI chatbots and voice agents can ask qualifying questions (e.g., 'What is your budget?', 'When are you looking to buy?') and only book appointments with the leads that match your criteria."
    },
    {
        question: "Is cold outreach with AI spammy?",
        answer: "It can be if done wrong. We implement 'Hyper-Personalized' outreach. The AI researchers each prospect and references specific details (like a recent news article or their company mission) so the message feels handcrafted, not blasted."
    },
    {
        question: "What is 'Lead Scoring'?",
        answer: "Lead scoring is when the AI assigns a point value to each lead based on their actions (opened email = 1 point, visited pricing page = 10 points). Your sales team then prioritizes calling only the leads with the highest scores."
    }
];

export default function LeadGenPage() {
    return (
        <main className="min-h-screen bg-background">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Article",
                        "headline": "AI Lead Generation & CRM Implementation Guide",
                        "description": "How to automate sales prospecting and pipeline management with AI.",
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
                            "@id": "https://www.peyiai.com/ai-lead-generation-small-business"
                        }
                    })
                }}
            />
            <Navbar />

            <PageHeader
                title="AI Lead Generation & CRM"
                gradientWord="Systems"
                description="Stop chasing leads. Let AI find, qualify, and book them on your calendar significantly faster than humanly possible."
            />

            <div className="container mx-auto px-6 mb-24">
                <Breadcrumbs
                    items={[
                        { label: "Solutions", href: "/#solutions" },
                        { label: "AI Lead Gen & CRM", href: "/ai-lead-generation-small-business" }
                    ]}
                />

                {/* Intro */}
                <section className="mb-24 max-w-4xl">
                    <h2 className="text-2xl font-bold text-white mb-6">The "Speed to Lead" Advantage</h2>
                    <p className="text-lg text-muted-foreground leading-relaxed border-l-4 border-primary pl-6">
                        In modern sales, the first vendor to respond wins 70% of the deals. AI gives you a chemically unfair advantage by responding to every lead within seconds—whether it's 2 PM or 2 AM—qualifying them, and booking the appointment before your competitor even opens their email.
                    </p>
                </section>

                {/* Benefits / Tools Grid */}
                <section className="mb-24">
                    <h2 className="text-3xl font-bold text-white mb-12">Building Your Automated Pipeline</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { icon: Search, title: "Prospecting", desc: "Identify thousands of ideal clients and extract their verified contact info instantly." },
                            { icon: MessageSquare, title: "Outreach", desc: "Send personalized cold emails and DMs that get responses, at scale." },
                            { icon: Filter, title: "Qualification", desc: "AI chats with leads to ensure they have budget and need before booking." },
                            { icon: Database, title: "CRM Sync", desc: "Automatically update contact records, log calls, and set tasks in your CRM." },
                            { icon: Users, title: "Nurture", desc: "Keep leads warm with long-term follow-up sequences until they are ready to buy." },
                            { icon: Zap, title: "Instant Booking", desc: "Leads book directly into your calendar without back-and-forth emails." }
                        ].map((item, i) => (
                            <div key={i} className="p-8 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors">
                                <item.icon className="w-10 h-10 text-primary mb-6" />
                                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                                <p className="text-muted-foreground">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Strategy Section */}
                <section className="mb-24">
                    <h2 className="text-3xl font-bold text-white mb-12 text-center">Which System Do You Need?</h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Outbound Card */}
                        <div className="p-8 rounded-3xl border border-white/10 bg-[#0B0F19] relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-bl-full transition-transform group-hover:scale-110" />
                            <div className="relative z-10">
                                <Target className="w-12 h-12 text-blue-400 mb-6" />
                                <h3 className="text-2xl font-bold text-white mb-4">Outbound Engine</h3>
                                <p className="text-muted-foreground mb-6">"I need to go find clients."</p>
                                <ul className="space-y-4 mb-8">
                                    <li className="flex items-start gap-3">
                                        <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0 mt-0.5"><span className="text-blue-400 text-xs">1</span></div>
                                        <span className="text-gray-300 text-sm">AI scrapes leads from Maps/LinkedIn.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0 mt-0.5"><span className="text-blue-400 text-xs">2</span></div>
                                        <span className="text-gray-300 text-sm">AI enriches data (email, phone, size).</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0 mt-0.5"><span className="text-blue-400 text-xs">3</span></div>
                                        <span className="text-gray-300 text-sm">Sends personalized cold email/DM.</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Inbound Card */}
                        <div className="p-8 rounded-3xl border border-white/10 bg-[#0B0F19] relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-bl-full transition-transform group-hover:scale-110" />
                            <div className="relative z-10">
                                <Magnet className="w-12 h-12 text-primary mb-6" />
                                <h3 className="text-2xl font-bold text-white mb-4">Inbound Capture</h3>
                                <p className="text-muted-foreground mb-6">"I have traffic, but no leads."</p>
                                <ul className="space-y-4 mb-8">
                                    <li className="flex items-start gap-3">
                                        <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-0.5"><span className="text-primary text-xs">1</span></div>
                                        <span className="text-gray-300 text-sm">AI Chatbot engages site visitors.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-0.5"><span className="text-primary text-xs">2</span></div>
                                        <span className="text-gray-300 text-sm">Captures name, email, & intent.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-0.5"><span className="text-primary text-xs">3</span></div>
                                        <span className="text-gray-300 text-sm">Instantly books to your CRM.</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Tool Stack Table */}
                <ToolTable
                    title="Top AI Sales Tools"
                    description="The engines behind high-growth sales teams."
                    headers={["Category", "Tool", "Est. Price", "Function"]}
                    rows={[
                        { category: "Prospecting", tool: "Apollo.io", price: "$49/mo", whatItDoes: "Database of 250M+ contacts with emails." },
                        { category: "Enrichment", tool: "Clay", price: "$149/mo", whatItDoes: "AI research on every prospect (company news, hiring, etc)." },
                        { category: "CRM & Funnel", tool: "GoHighLevel", price: "$97/mo", whatItDoes: "The destination for all leads (Landing Pages + Auto-Nurture)." },
                        { category: "Outreach", tool: "Instantly.ai", price: "$37/mo", whatItDoes: "Sends unlimited cold emails with high deliverability." },
                        { category: "Voice Agent", tool: "Bland AI", price: "Usage based", whatItDoes: "Calls leads instantly to qualify and book." }
                    ]}
                />

                {/* Comparison */}
                <section className="mb-24 max-w-5xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-white mb-4">Manual Prospecting vs AI Systems</h2>
                        <p className="text-muted-foreground">The difference between linear growth and exponential scale.</p>
                    </div>
                    <ComparisonTable
                        headers={["Manual Sales Rep", "AI Sales System (We Build)"]}
                        rowHeaders={["Leads Contacted/Day", "Response Time", "Follow-up Duration", "Cost Per Activity", "Data Accuracy"]}
                        rows={[
                            ["50-100", "Unlimited (1000+)"],
                            ["Hours/Days", "Seconds"],
                            ["3-5 touches (then gives up)", "Indefinite (until they buy or opt-out)"],
                            ["High (Salary + Commission)", "Pennies"],
                            ["Prone to human error", "Synced automatically"],
                        ]}
                    />
                </section>

                {/* ROI / Stats */}
                <section className="mb-24 bg-gradient-to-br from-blue-500/10 to-transparent p-12 rounded-3xl border border-blue-500/20 text-center">
                    <h2 className="text-3xl font-bold text-white mb-8">Pipeline Velocity</h2>
                    <div className="grid md:grid-cols-3 gap-12">
                        <div>
                            <div className="text-4xl font-bold text-blue-400 mb-2">300%</div>
                            <p className="text-muted-foreground">increase in appointments booked when responding in under 5 minutes.</p>
                        </div>
                        <div>
                            <div className="text-4xl font-bold text-blue-400 mb-2">98%</div>
                            <p className="text-muted-foreground">of website visitors leave without converting. AI captures them.</p>
                        </div>
                        <div>
                            <div className="text-4xl font-bold text-blue-400 mb-2">10x</div>
                            <p className="text-muted-foreground">ROI on lead generation spend by filtering out bad leads early.</p>
                        </div>
                    </div>
                </section>

                <FAQ
                    items={leadGenFaqs}
                    title="Lead Gen & CRM Questions"
                    description="Expert answers on building your sales machine."
                />

                {/* CTA */}
                <section className="text-center py-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Fill Your Pipeline on Autopilot</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
                        Stop wondering where your next deal is coming from. Build a predictable system today.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link href="/ai-readiness-quiz">
                            <Button size="lg" className="rounded-full px-8 text-lg h-14 bg-primary hover:bg-primary/90 text-background font-bold">
                                Get Your Lead Gen Audit
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
