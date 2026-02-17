import Link from "next/link";
import { Facebook, Youtube, Linkedin, Twitter } from "lucide-react";

export function Footer() {
    return (
        <footer className="w-full border-t border-border/50 py-16 bg-[#0B0F19] relative z-10 text-sm">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    {/* Column 1: Brand & Entity Signal */}
                    <div className="space-y-6 md:col-span-1">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full overflow-hidden border border-white/10">
                                <div
                                    className="w-full h-full bg-white"
                                    style={{
                                        backgroundImage: "url('/logo.png')",
                                        backgroundSize: "cover",
                                        filter: "hue-rotate(90deg) saturate(1.2)"
                                    }}
                                />
                            </div>
                            <span className="font-heading font-bold text-lg text-white">Peyi Solutions</span>
                        </div>
                        <p className="text-muted-foreground leading-relaxed">
                            Peyi Solutions is an AI implementation partner serving small businesses and real estate professionals across the United States. We help you choose the right AI tools, automate your workflows, and train your team.
                        </p>
                        <div className="flex gap-4">
                            <Link href="https://www.facebook.com/people/Peyi-Solutions/61578259621787/" target="_blank" className="text-gray-400 hover:text-primary transition-colors">
                                <Facebook className="w-5 h-5" />
                                <span className="sr-only">Facebook</span>
                            </Link>
                            <Link href="https://www.youtube.com/channel/UClyFCi9ex6v2xhCx5TKppyQ" target="_blank" className="text-gray-400 hover:text-primary transition-colors">
                                <Youtube className="w-5 h-5" />
                                <span className="sr-only">YouTube</span>
                            </Link>
                            <Link href="https://www.linkedin.com/company/peyi-solutions" target="_blank" className="text-gray-400 hover:text-primary transition-colors">
                                <Linkedin className="w-5 h-5" />
                                <span className="sr-only">LinkedIn</span>
                            </Link>
                        </div>
                    </div>

                    {/* Column 2: Solutions */}
                    <div>
                        <h3 className="font-bold text-white mb-6">Solutions</h3>
                        <ul className="space-y-4">
                            <li><Link href="/ai-customer-service-small-business" className="text-muted-foreground hover:text-primary transition-colors">AI Customer Service</Link></li>
                            <li><Link href="/ai-marketing-automation-small-business" className="text-muted-foreground hover:text-primary transition-colors">AI Marketing Automation</Link></li>
                            <li><Link href="/ai-crm-small-business" className="text-muted-foreground hover:text-primary transition-colors">AI CRM Systems</Link></li>
                            <li><Link href="/ai-lead-generation-small-business" className="text-muted-foreground hover:text-primary transition-colors">AI Lead Generation</Link></li>
                        </ul>
                    </div>

                    {/* Column 3: Industries */}
                    <div>
                        <h3 className="font-bold text-white mb-6">Industries</h3>
                        <ul className="space-y-4">
                            <li><Link href="/ai-for-real-estate-agents" className="text-muted-foreground hover:text-primary transition-colors">AI for Real Estate Agents</Link></li>
                            <li><Link href="/ai-for-real-estate-agents" className="text-muted-foreground hover:text-primary transition-colors">Real Estate Voice AI</Link></li>
                            <li><Link href="/ai-customer-service-small-business" className="text-muted-foreground hover:text-primary transition-colors">Small Business Automation</Link></li>
                        </ul>
                    </div>

                    {/* Column 4: Company */}
                    <div>
                        <h3 className="font-bold text-white mb-6">Company</h3>
                        <ul className="space-y-4">
                            <li><Link href="#why-us" className="text-muted-foreground hover:text-primary transition-colors">Why Peyi Solutions</Link></li>
                            <li><Link href="/ai-readiness-quiz" className="text-muted-foreground hover:text-primary transition-colors">AI Readiness Quiz</Link></li>
                            <li><Link href="#contact" className="text-muted-foreground hover:text-primary transition-colors">Contact Us</Link></li>
                            <li><Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link></li>
                            <li><Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors">Terms of Service</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/5 pt-8 text-center text-muted-foreground">
                    <p>&copy; {new Date().getFullYear()} Peyi Solutions. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
