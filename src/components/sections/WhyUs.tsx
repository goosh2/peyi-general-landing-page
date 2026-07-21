import { Wrench, Target, Rocket, Search, Map, Hammer } from "lucide-react";

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
                        <div className="mb-8">
                            <div className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-1">How We Work</div>
                            <div className="font-heading font-bold text-2xl">One audit. A clear roadmap. Real systems.</div>
                        </div>

                        {/* Process Steps */}
                        <div className="relative space-y-6">
                            {/* Connecting line */}
                            <div className="absolute left-6 top-6 bottom-6 w-px bg-gradient-to-b from-primary/60 via-secondary/40 to-transparent" />

                            {[
                                { icon: Search, step: "01", title: "Audit", desc: "We dig into how your business actually runs—where hours leak and money hides." },
                                { icon: Map, step: "02", title: "Roadmap", desc: "You get a report naming the exact AI workflows worth building, in ROI order." },
                                { icon: Hammer, step: "03", title: "Build", desc: "We build, test, and deploy the systems with your team—so they stick." }
                            ].map((item, idx) => (
                                <div key={idx} className="relative flex gap-5">
                                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center text-white shadow-lg shadow-primary/20 z-10">
                                        <item.icon className="w-5 h-5" />
                                    </div>
                                    <div className="pt-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-xs font-heading font-bold text-primary tracking-wider">{item.step}</span>
                                            <h3 className="font-heading font-bold text-lg">{item.title}</h3>
                                        </div>
                                        <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}
