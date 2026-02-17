import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Zap, BarChart3, Users } from "lucide-react";

const solutionsData = [
    {
        title: "Automate Revenue Tasks",
        icon: Zap,
        description: "Stop wasting time on manual work. Automate outreach, follow-ups, and admin so you can focus on strategy.",
        gradient: "from-[hsl(var(--primary))] to-[hsl(340,80%,60%)]", // Brand Orange -> Pink
    },
    {
        title: "Stop Leaking Money",
        icon: BarChart3,
        description: "Plug the holes in your sales pipeline. Ensure every lead is nurtured and no opportunity slips through the cracks.",
        gradient: "from-[hsl(340,80%,60%)] to-[hsl(270,80%,65%)]", // Pink -> Purple
    },
    {
        title: "Turn Reviews into Cash",
        icon: Users,
        description: "Automatically generate 5-star reviews to build trust and attract more high-paying customers on autopilot.",
        gradient: "from-[hsl(270,80%,65%)] to-[hsl(200,90%,55%)]", // Purple -> Accent
    },
];

export function Solutions() {
    return (
        <section id="solutions" className="py-24 px-6 relative">
            {/* Background accent */}
            <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/5 to-background pointer-events-none" />

            <div className="container mx-auto max-w-[1400px]">
                {/* Header */}
                <div className="text-center mb-16 space-y-4">
                    <h2 className="font-heading font-bold text-4xl md:text-5xl">
                        Solutions Built for <span className="gradient-text">Real Challenges</span>
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        We don&apos;t sell features. We solve problems. From workflow automation to customer insights, we implement AI that moves the needle.
                    </p>
                </div>

                {/* Grid */}
                <div className="grid md:grid-cols-3 gap-8">
                    {solutionsData.map((item, idx) => (
                        <Card key={idx} className="group hover:-translate-y-2 transition-transform duration-300 hover:shadow-2xl hover:shadow-primary/10 border-white/5 bg-white/5 backdrop-blur-sm">
                            <CardHeader className="space-y-6">
                                <div className={`w-14 h-14 rounded-xl flex items-center justify-center bg-gradient-to-br ${item.gradient} text-white shadow-lg`}>
                                    <item.icon className="w-7 h-7" />
                                </div>
                                <CardTitle>{item.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground leading-relaxed">
                                    {item.description}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
