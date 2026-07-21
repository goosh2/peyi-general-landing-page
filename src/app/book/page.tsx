import { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BookingForm } from "@/components/book/BookingForm";

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
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
