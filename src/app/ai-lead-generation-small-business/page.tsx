import { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHeader } from "@/components/ui/page-header";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { ComparisonTable } from "@/components/ui/comparison-table";
import { FAQ } from "@/components/sections/FAQ";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Users, Filter, MessageSquare, Database, Zap, Search } from "lucide-react";

export const metadata: Metadata = {
    title: "AI Lead Generation & CRM for Small Business: Capture & Convert",
    description: "Stop chasing bad leads. Use AI to find, qualify, and nurture prospects automatically. Integrate with your CRM for seamless sales.",
    openGraph: {
        title: "AI Lead Gen & CRM: The Ultimate Sales Machine",
        description: "Automate your sales pipeline. From cold outreach to warm appointment, let AI handle the heavy lifting.",
        type: "article",
        url: "https://www.peyiai.com/ai-lead-generation-small-business",
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

                {/* Comparison */}
                <section className="mb-24 max-w-5xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-white mb-4">Manual Prospecting vs AI Systems</h2>
                        <p className="text-muted-foreground">The difference between linear growth and exponential scale.</p>
                    </div>
                    <ComparisonTable
                        headers={["Manual Sales Rep", "AI Sales System"]}
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
