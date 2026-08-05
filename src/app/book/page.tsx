import { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BookingForm } from "@/components/book/BookingForm";
import { Search, Map, Hammer } from "lucide-react";

export const metadata: Metadata = {
    title: "Book an AI Audit | Peyi Solutions",
    description:
        "Request a free AI audit with Peyi Solutions. We'll email you a single-use link to confirm and book your session.",
};

export default function BookPage() {
    return (
        <main className="min-h-screen bg-background">
            <Navbar />

            <section className="relative pt-32 pb-24">
                <div className="container mx-auto px-6">
                    <div className="max-w-xl mx-auto">
                        <div className="text-center mb-10">
                            <h1 className="text-3xl sm:text-4xl font-heading font-bold text-white mb-4">
                                Book an <span className="gradient-text">AI Audit</span>
                            </h1>
                            <p className="text-muted-foreground leading-relaxed">
                                Tell us a little about your business. We&apos;ll email you a
                                single-use link to confirm and unlock your booking page.
                            </p>
                        </div>

                        <BookingForm />

                        {/* What the audit actually is. The form asks for commitment,
                            so the page has to answer "what am I signing up for?"
                            before it asks. */}
                        <div className="mt-16 pt-12 border-t border-white/5">
                            <h2 className="font-heading font-bold text-xl text-white mb-8 text-center">
                                What happens after you book
                            </h2>
                            <ol className="space-y-6">
                                {[
                                    {
                                        icon: Search,
                                        title: "We dig into how your business runs",
                                        desc: "A working session on your actual workflows—where hours leak and where money hides."
                                    },
                                    {
                                        icon: Map,
                                        title: "You get a roadmap you can act on",
                                        desc: "A report naming the specific AI workflows worth building for you, ordered by return. Yours to keep, whether or not we build it."
                                    },
                                    {
                                        icon: Hammer,
                                        title: "We build it—only if you want that",
                                        desc: "No obligation. Plenty of people take the roadmap and run with it themselves."
                                    }
                                ].map((step, i) => (
                                    <li key={i} className="flex gap-4">
                                        <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-[image:var(--gradient-ai)] flex items-center justify-center text-white">
                                            <step.icon className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <h3 className="font-heading font-bold text-white mb-1">{step.title}</h3>
                                            <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                                        </div>
                                    </li>
                                ))}
                            </ol>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
