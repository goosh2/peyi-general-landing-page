import { Wrench, Target, Rocket } from "lucide-react";

export function WhyUs() {
    return (
        <section id="why-us" className="py-24 px-6">
            <div className="container mx-auto grid lg:grid-cols-2 gap-16 items-center">

                {/* Text Column */}
                <div>
                    <h2 className="font-heading font-bold text-4xl md:text-5xl mb-6">
                        Why Partner With <span className="gradient-text">Peyi Solutions</span>
                    </h2>
                    <p className="text-lg text-muted-foreground mb-12 max-w-lg">
                        We&apos;re not consultants who disappear after a report. We&apos;re your AI implementation partner.
                    </p>

                    <div className="space-y-8">
                        {[
                            { icon: Wrench, title: "Hands-On Implementation", desc: "We don't just advise—we build, test, and deploy with your team." },
                            { icon: Target, title: "Measurable Results", desc: "Every solution is tracked. You'll see ROI, not just promises." },
                            { icon: Rocket, title: "Fast Time-to-Value", desc: "Start seeing results in weeks, not months. Rapid iteration and deployment." }
                        ].map((item, idx) => (
                            <div key={idx} className="flex gap-6 group">
                                <div className="flex-shrink-0 w-12 h-12 rounded-lg border border-primary/20 bg-background/50 flex items-center justify-center group-hover:border-primary/60 transition-colors">
                                    <item.icon className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <h3 className="font-heading font-bold text-xl mb-1">{item.title}</h3>
                                    <p className="text-muted-foreground">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Dashboard Visualization Column */}
                <div className="relative">
                    {/* Decor Blobs */}
                    <div className="absolute -top-12 -right-12 w-64 h-64 bg-primary/20 rounded-full blur-[80px]" />
                    <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-secondary/20 rounded-full blur-[60px]" />

                    <div className="relative glass-card rounded-3xl p-8 md:p-12 overflow-hidden border-white/10">
                        {/* Header Row */}
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-16 h-16 rounded-xl bg-gradient-primary flex items-center justify-center text-white font-heading font-bold text-2xl">
                                P
                            </div>
                            <div>
                                <div className="font-heading font-bold text-lg">Peyi Solutions</div>
                                <div className="text-sm text-muted-foreground">Your Partner in Practical AI</div>
                            </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="space-y-3 mb-8">
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">AI Capability Readiness</span>
                                <span className="text-primary font-medium">85%</span>
                            </div>
                            <div className="h-3 w-full bg-muted rounded-full overflow-hidden">
                                <div className="h-full bg-gradient-to-r from-primary to-secondary w-[85%] rounded-full" />
                            </div>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-muted/50 rounded-xl p-4">
                                <div className="gradient-text font-heading font-bold text-2xl mb-1">12</div>
                                <div className="text-xs text-muted-foreground uppercase tracking-wider">AI Systems Built</div>
                            </div>
                            <div className="bg-muted/50 rounded-xl p-4">
                                <div className="gradient-text font-heading font-bold text-2xl mb-1">98%</div>
                                <div className="text-xs text-muted-foreground uppercase tracking-wider">Success Rate</div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}
