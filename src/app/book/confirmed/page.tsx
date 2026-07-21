import { Metadata } from "next";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { verifyTicket } from "@/lib/booking";

export const metadata: Metadata = {
    title: "You're verified | Peyi Solutions",
    robots: {
        index: false,
        follow: false,
    },
};

// This page depends on request-time search params, so it must render dynamically.
export const dynamic = "force-dynamic";

interface ConfirmedPageProps {
    searchParams: Promise<{ ticket?: string }>;
}

export default async function ConfirmedPage({ searchParams }: ConfirmedPageProps) {
    const { ticket } = await searchParams;

    const secret = process.env.BOOKING_TOKEN_SECRET;
    if (!secret) {
        // Server console only; treat as an invalid ticket for the visitor.
        console.error("[book/confirmed] Missing BOOKING_TOKEN_SECRET.");
        redirect("/book");
    }

    const requestId = ticket ? verifyTicket(ticket, secret) : null;
    if (!requestId) {
        redirect("/book");
    }

    const calUrl = process.env.CALCOM_EVENT_URL || "#";

    return (
        <main className="min-h-screen bg-background">
            <Navbar />

            <section className="relative pt-32 pb-24">
                <div className="container mx-auto px-6">
                    <div className="max-w-xl mx-auto">
                        <div className="glass-card rounded-2xl p-8 sm:p-10 text-center">
                            <h1 className="text-3xl sm:text-4xl font-heading font-bold text-white mb-4">
                                You&apos;re <span className="gradient-text">verified</span>
                            </h1>
                            <p className="text-muted-foreground leading-relaxed mb-8">
                                Thanks for confirming your email. You&apos;re all set to book your
                                AI audit. Pick a time that works for you.
                            </p>
                            <Button asChild variant="hero" size="lg" className="w-full sm:w-auto">
                                <Link href={calUrl} target="_blank" rel="noopener noreferrer">
                                    Book my AI audit
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
