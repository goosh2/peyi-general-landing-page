import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Zap, BarChart3, Users } from "lucide-react";

const solutionsData = [
    {
        title: "Marketing Automation",
        icon: Zap,
        description: "Automate email, SMS, and voicemail campaigns. Nurture leads on autopilot while you focus on closing deals.",
        gradient: "from-primary to-[#D61A6A]", // approximating hsl(340)
    },
    {
        title: "CRM & Pipeline Management",
        icon: BarChart3,
        description: "Track every lead from first touch to closed deal. Never lose a prospect with smart pipeline automation.",
        gradient: "from-[#D61A6A] to-secondary",
    },
    {
        title: "Reputation & Reviews",
        icon: Users,
        description: "Automate review requests and manage your online reputation. Turn happy customers into 5-star advocates.",
        gradient: "from-secondary to-accent",
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
                        <Card key={idx} className="group hover:-translate-y-2 transition-transform duration-500 hover:shadow-2xl hover:shadow-primary/10 border-white/5">
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
