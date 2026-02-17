import { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHeader } from "@/components/ui/page-header";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { ComparisonTable } from "@/components/ui/comparison-table";
import { FAQ } from "@/components/sections/FAQ";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Mail, Share2, PenTool, Target, BarChart2, Repeat } from "lucide-react";

export const metadata: Metadata = {
    title: "AI Marketing Automation for Small Business: Email, Social & Ads",
    description: "Marketing that runs 24/7. Use AI to automate email campaigns, create social content, and optimize ads for higher ROI.",
    openGraph: {
        title: "AI Marketing Automation: Consistency & Growth on Autopilot",
        description: "Stop posting sporadically. Let AI handle your content calendar, email nurture, and ad targeting.",
        type: "article",
        url: "https://www.peyiai.com/ai-marketing-automation-small-business",
    },
};

const marketingFaqs = [
    {
        question: "Will AI-generated content sound like a robot?",
        answer: "Not if we train it on your brand voice. We upload your past successful emails, blogs, and social posts to teach the AI exactly how you speak. The result is content that sounds 95% like you, but produced 100x faster."
    },
    {
        question: "Can AI really handle my social media posting?",
        answer: "Yes. AI can plan the calendar, generate the captions and hashtags, create the images, and even schedule the posts for optimal times. You just review and approve."
    },
    {
        question: "Does this replace my marketing agency?",
        answer: "For many small businesses, yes. AI can handle the execution work (writing, posting, emailing) that agencies typically charge $2k-$5k/month for. You'll still need strategy, but the heavy lifting becomes automated."
    },
    {
        question: "How does AI help with email marketing?",
        answer: "AI goes beyond basic newsletters. It can send personalized emails to each lead based on what they clicked on your site, predicting the best time to send and the best subject line to get an open."
    },
    {
        question: "Is it expensive to set up?",
        answer: "Compared to hiring a marketing manager ($60k+) or an agency ($30k+/yr), AI is incredibly affordable. Most stacks cost under $300/mo in software fees."
    }
];

export default function MarketingPage() {
    return (
        <main className="min-h-screen bg-background">
            <Navbar />

            <PageHeader
                title="AI Marketing Automation"
                gradientWord="for Growth"
                description="Marketing that runs 24/7. Generate content, nurture leads, and optimize ads without lifting a finger."
            />

            <div className="container mx-auto px-6 mb-24">
                <Breadcrumbs
                    items={[
                        { label: "Solutions", href: "/#solutions" },
                        { label: "AI Marketing Automation", href: "/ai-marketing-automation-small-business" }
                    ]}
                />

                {/* Intro */}
                <section className="mb-24 max-w-4xl">
                    <h2 className="text-2xl font-bold text-white mb-6">Consistency is Key (And AI Never Sleeps)</h2>
                    <p className="text-lg text-muted-foreground leading-relaxed border-l-4 border-primary pl-6">
                        The biggest challenge for small business marketing isn't quality—it's consistency. You get busy, strict operations take over, and months go by without an email or social post. AI marketing automation solves this by ensuring your brand stays top-of-mind 24/7, executing your strategy rain or shine.
                    </p>
                </section>

                {/* Benefits / Tools Grid */}
                <section className="mb-24">
                    <h2 className="text-3xl font-bold text-white mb-12">What Can You Automate?</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { icon: Mail, title: "Email Nurture", desc: "Send personalized sequences that warm up leads over months, not days." },
                            { icon: Share2, title: "Social Media", desc: "Generate and schedule a month's worth of content in one afternoon." },
                            { icon: PenTool, title: "Content Writing", desc: "Blog posts, ad copy, and video scripts written in your brand voice instantly." },
                            { icon: Target, title: "Ad Optimization", desc: "AI adjusts your ad spend in real-time to focus on the best performing creatives." },
                            { icon: BarChart2, title: "Lead Scoring", desc: "Know exactly which leads are ready to buy based on their engagement." },
                            { icon: Repeat, title: "Review Generation", desc: "Automatically ask happy customers for reviews at the perfect moment." }
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
                        <h2 className="text-3xl font-bold text-white mb-4">Manual Marketing vs AI Automation</h2>
                        <p className="text-muted-foreground">Stop trading time for visibility.</p>
                    </div>
                    <ComparisonTable
                        headers={["Manual Marketing", "AI Automation (We Build)"]}
                        rowHeaders={["Consistency", "Personalization", "Content Volume", "Cost", "Speed"]}
                        rows={[
                            ["Sporadic (When you have time)", "Daily / 24/7"],
                            ["Generic blasts", "1:1 Personalization at scale"],
                            ["1-2 pieces per week", "Unlimited (Scale up instantly)"],
                            ["High (Time or Agency fees)", "Low (Software costs)"],
                            ["Slow iteration", "Instant testing & optimization"],
                        ]}
                    />
                </section>

                {/* ROI / Stats */}
                <section className="mb-24 bg-gradient-to-br from-purple-500/10 to-transparent p-12 rounded-3xl border border-purple-500/20 text-center">
                    <h2 className="text-3xl font-bold text-white mb-8">Marketing ROI You Can Measure</h2>
                    <div className="grid md:grid-cols-3 gap-12">
                        <div>
                            <div className="text-4xl font-bold text-purple-400 mb-2">300%</div>
                            <p className="text-muted-foreground">increase in leads reported by businesses using marketing automation.</p>
                        </div>
                        <div>
                            <div className="text-4xl font-bold text-purple-400 mb-2">10hrs</div>
                            <p className="text-muted-foreground">saved per week on content creation and scheduling.</p>
                        </div>
                        <div>
                            <div className="text-4xl font-bold text-purple-400 mb-2">50%</div>
                            <p className="text-muted-foreground">lower cost per lead when using AI to optimize ad campaigns.</p>
                        </div>
                    </div>
                </section>

                <FAQ
                    items={marketingFaqs}
                    title="AI Marketing Questions"
                    description="How to scale your presence without losing your soul."
                />

                {/* CTA */}
                <section className="text-center py-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Put Your Marketing on Autopilot</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
                        Don't let another week go by without posting. Build a system that grows your business while you sleep.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link href="/ai-readiness-quiz">
                            <Button size="lg" className="rounded-full px-8 text-lg h-14 bg-primary hover:bg-primary/90 text-background font-bold">
                                Get Your Marketing Plan
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
