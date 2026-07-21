import { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
    title: "Privacy Policy | Peyi Solutions",
    description:
        "How Peyi Solutions collects, uses, and protects the information you share when you request an AI audit or use this site.",
};

const LAST_UPDATED = "July 20, 2026";

export default function PrivacyPage() {
    return (
        <main className="min-h-screen bg-background">
            <Navbar />

            <section className="relative pt-32 pb-24">
                <div className="container mx-auto px-6">
                    <div className="max-w-3xl mx-auto">
                        <h1 className="text-3xl sm:text-4xl font-heading font-bold text-white mb-3">
                            Privacy <span className="gradient-text">Policy</span>
                        </h1>
                        <p className="text-sm text-muted-foreground mb-12">Last updated: {LAST_UPDATED}</p>

                        <div className="space-y-10 text-muted-foreground leading-relaxed">
                            <p>
                                Peyi Solutions (&quot;we,&quot; &quot;us&quot;) helps small businesses
                                choose and implement AI systems. This policy explains what we collect
                                when you use this website and request an AI audit, and what we do with it.
                                We keep this short and plain on purpose.
                            </p>

                            <div>
                                <h2 className="font-heading font-bold text-xl text-white mb-3">What we collect</h2>
                                <ul className="space-y-2 list-disc pl-5">
                                    <li>
                                        <span className="text-foreground font-medium">Booking requests.</span>{" "}
                                        When you request an audit, we collect the name, email address,
                                        business name, and details you enter in the form.
                                    </li>
                                    <li>
                                        <span className="text-foreground font-medium">Abuse prevention.</span>{" "}
                                        To stop spam and duplicate bookings, we store a one-way hashed
                                        version of your IP address. We do not keep your raw IP address.
                                    </li>
                                    <li>
                                        <span className="text-foreground font-medium">Site analytics.</span>{" "}
                                        We use privacy-friendly analytics to understand aggregate traffic.
                                        This does not identify you personally.
                                    </li>
                                </ul>
                            </div>

                            <div>
                                <h2 className="font-heading font-bold text-xl text-white mb-3">How we use it</h2>
                                <p>
                                    We use your information only to respond to your request, send the
                                    single-use link that confirms your email, schedule your audit, and
                                    prevent abuse of the booking system. We do not sell your information,
                                    and we do not send marketing email you did not ask for.
                                </p>
                            </div>

                            <div>
                                <h2 className="font-heading font-bold text-xl text-white mb-3">Who we share it with</h2>
                                <p>
                                    We rely on a small number of service providers to run this site and
                                    the booking flow&mdash;including an email delivery service and a
                                    database provider&mdash;who process your data only on our behalf. We
                                    do not share your information with anyone else except where required
                                    by law.
                                </p>
                            </div>

                            <div>
                                <h2 className="font-heading font-bold text-xl text-white mb-3">Your choices</h2>
                                <p>
                                    You can ask us to access or delete the information you&apos;ve given us
                                    at any time. Just reach out and we&apos;ll take care of it.
                                </p>
                            </div>

                            <div>
                                <h2 className="font-heading font-bold text-xl text-white mb-3">Contact</h2>
                                <p>
                                    Questions about this policy? Start with the{" "}
                                    <Link href="/book" className="text-primary hover:underline">
                                        audit request page
                                    </Link>{" "}
                                    or reach us through the channels listed in the footer.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
