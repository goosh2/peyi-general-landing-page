import { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
    title: "Terms of Service | Peyi Solutions",
    description:
        "The terms that govern your use of the Peyi Solutions website and the AI audit request process.",
};

const LAST_UPDATED = "July 20, 2026";

export default function TermsPage() {
    return (
        <main className="min-h-screen bg-background">
            <Navbar />

            <section className="relative pt-32 pb-24">
                <div className="container mx-auto px-6">
                    <div className="max-w-3xl mx-auto">
                        <h1 className="text-3xl sm:text-4xl font-heading font-bold text-white mb-3">
                            Terms of <span className="gradient-text">Service</span>
                        </h1>
                        <p className="text-sm text-muted-foreground mb-12">Last updated: {LAST_UPDATED}</p>

                        <div className="space-y-10 text-muted-foreground leading-relaxed">
                            <p>
                                These terms cover your use of the Peyi Solutions website and the AI audit
                                request process. By using this site, you agree to them.
                            </p>

                            <div>
                                <h2 className="font-heading font-bold text-xl text-white mb-3">Using this site</h2>
                                <p>
                                    You may use this site for its intended purpose: learning about our
                                    services and requesting an AI audit. Please don&apos;t misuse the
                                    booking system, submit false information, or attempt to disrupt or
                                    gain unauthorized access to the site.
                                </p>
                            </div>

                            <div>
                                <h2 className="font-heading font-bold text-xl text-white mb-3">Audit requests and bookings</h2>
                                <p>
                                    Submitting the audit form is a request, not a confirmed booking. We
                                    confirm your email with a single-use link before any session is
                                    scheduled. We may decline or reschedule a request at our discretion.
                                </p>
                            </div>

                            <div>
                                <h2 className="font-heading font-bold text-xl text-white mb-3">Information and results</h2>
                                <p>
                                    The content on this site, including guides and comparisons, is for
                                    general information. Every business is different, and outcomes from
                                    any AI system depend on your specific situation. Nothing here is a
                                    guarantee of a particular result.
                                </p>
                            </div>

                            <div>
                                <h2 className="font-heading font-bold text-xl text-white mb-3">Intellectual property</h2>
                                <p>
                                    The Peyi Solutions name, brand, and site content belong to us. You may
                                    not copy or reuse them without permission. Third-party product names
                                    and logos belong to their respective owners.
                                </p>
                            </div>

                            <div>
                                <h2 className="font-heading font-bold text-xl text-white mb-3">Limitation of liability</h2>
                                <p>
                                    This site is provided &quot;as is.&quot; To the extent permitted by
                                    law, we are not liable for indirect or incidental damages arising from
                                    your use of the site or reliance on its content.
                                </p>
                            </div>

                            <div>
                                <h2 className="font-heading font-bold text-xl text-white mb-3">Changes and contact</h2>
                                <p>
                                    We may update these terms from time to time; the date above reflects
                                    the latest version. Questions? Start with the{" "}
                                    <Link href="/book" className="text-primary hover:underline">
                                        audit request page
                                    </Link>{" "}
                                    or the channels in the footer.
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
