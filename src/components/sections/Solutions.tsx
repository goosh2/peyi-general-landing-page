import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Zap, BarChart3 } from "lucide-react";
import Link from "next/link";
import { MessageSquare, Megaphone, Users, Briefcase } from "lucide-react";

const solutions = [
    {
        icon: MessageSquare,
        title: "AI Customer Service",
        description: "Deploy intelligent chatbots and voice agents that handle 80% of support queries instantly, 24/7.",
        href: "/ai-customer-service-small-business"
    },
    {
        icon: Megaphone,
        title: "Marketing Automation",
        description: "Generate content, schedule posts, and nurture leads with personalized email sequences on autopilot.",
        href: "/ai-marketing-automation-small-business"
    },
    {
        icon: Users,
        title: "AI CRM & Lead Gen",
        description: "Automatically capture, qualify, and follow up with leads until they book a meeting on your calendar.",
        href: "/ai-lead-generation-small-business"
    },
    {
        icon: Briefcase,
        title: "Operations Automation",
        description: "Streamline invoicing, scheduling, and data entry. Reduce operational overhead by 40%.",
        href: "/ai-operations-automation"
    }
];

export function Solutions() {
    return (
        <section className="py-24 bg-background relative overflow-hidden" id="solutions">
            {/* Background Elements */}
            <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-secondary/5 rounded-full blur-3xl pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-16 max-w-2xl mx-auto">
                    <h2 className="text-3xl md:text-5xl font-bold font-heading mb-6">
                        Solutions Built for{" "}
                        <span className="text-transparent bg-clip-text gradient-text">
                            Real Profit
                        </span>
                    </h2>
                    <p className="text-muted-foreground text-lg">
                        We don&apos;t just install tools. We build complete workflows that increase efficiency and drive revenue.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {solutions.map((solution, index) => (
                        <Link href={solution.href} key={index} className="block group">
                            <div
                                className="h-full p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/50 transition-all duration-300 group-hover:transform group-hover:-translate-y-2 group-hover:shadow-2xl hover:shadow-primary/10"
                            >
                                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                    <solution.icon className="w-7 h-7 text-primary" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors">
                                    {solution.title}
                                </h3>
                                <p className="text-gray-400 leading-relaxed">
                                    {solution.description}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
