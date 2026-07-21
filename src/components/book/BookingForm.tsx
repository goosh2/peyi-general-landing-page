"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Status = "idle" | "submitting" | "success" | "error";

export function BookingForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [business, setBusiness] = useState("");
    const [need, setNeed] = useState("");
    const [website, setWebsite] = useState(""); // honeypot
    const [status, setStatus] = useState<Status>("idle");
    const [errorMessage, setErrorMessage] = useState("");

    // Timestamp captured when the form first renders, used server-side to
    // reject submissions that arrive implausibly fast.
    const renderedAt = useRef<number>(0);
    useEffect(() => {
        renderedAt.current = Date.now();
    }, []);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setErrorMessage("");

        // Client-side required validation.
        if (!name.trim() || !email.trim() || !need.trim()) {
            setStatus("error");
            setErrorMessage("Please fill in your name, email, and what you need help with.");
            return;
        }

        setStatus("submitting");
        try {
            const res = await fetch("/api/book/request", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: name.trim(),
                    email: email.trim(),
                    business: business.trim(),
                    need: need.trim(),
                    website,
                    renderTimestamp: renderedAt.current,
                }),
            });

            if (!res.ok) {
                const data = (await res.json().catch(() => null)) as { message?: string } | null;
                setStatus("error");
                setErrorMessage(data?.message || "Something went wrong. Please try again.");
                return;
            }

            setStatus("success");
        } catch {
            setStatus("error");
            setErrorMessage("Network error. Please try again.");
        }
    }

    if (status === "success") {
        return (
            <div className="glass-card rounded-2xl p-8 text-center">
                <h2 className="text-2xl font-heading font-bold text-white mb-3">Check your inbox</h2>
                <p className="text-muted-foreground leading-relaxed">
                    If everything checks out, we&apos;ve sent a confirmation link to{" "}
                    <span className="text-white">{email.trim()}</span>. Click it to unlock your
                    booking page. The link is single-use and expires in 24 hours.
                </p>
            </div>
        );
    }

    const inputClass = cn(
        "w-full rounded-md bg-white/5 border border-white/10 px-4 py-3 text-sm text-white",
        "placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand-pink/50",
        "focus:border-transparent transition-colors"
    );

    return (
        <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-6 sm:p-8 space-y-5" noValidate>
            <div className="space-y-2">
                <label htmlFor="book-name" className="block text-sm font-medium text-white">
                    Name
                </label>
                <input
                    id="book-name"
                    name="name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={inputClass}
                    placeholder="Jane Doe"
                    autoComplete="name"
                />
            </div>

            <div className="space-y-2">
                <label htmlFor="book-email" className="block text-sm font-medium text-white">
                    Email
                </label>
                <input
                    id="book-email"
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={inputClass}
                    placeholder="jane@company.com"
                    autoComplete="email"
                />
            </div>

            <div className="space-y-2">
                <label htmlFor="book-business" className="block text-sm font-medium text-white">
                    Business name{" "}
                    <span className="text-muted-foreground font-normal">(optional)</span>
                </label>
                <input
                    id="book-business"
                    name="business"
                    type="text"
                    value={business}
                    onChange={(e) => setBusiness(e.target.value)}
                    className={inputClass}
                    placeholder="Acme Co."
                    autoComplete="organization"
                />
            </div>

            <div className="space-y-2">
                <label htmlFor="book-need" className="block text-sm font-medium text-white">
                    What do you want help with?
                </label>
                <textarea
                    id="book-need"
                    name="need"
                    required
                    rows={4}
                    value={need}
                    onChange={(e) => setNeed(e.target.value)}
                    className={cn(inputClass, "resize-y")}
                    placeholder="Tell us a bit about your business and what you're hoping AI can do for you."
                />
            </div>

            {/* Honeypot: visually hidden, must stay empty. Real users never see it. */}
            <div
                aria-hidden="true"
                style={{
                    position: "absolute",
                    left: "-9999px",
                    width: "1px",
                    height: "1px",
                    overflow: "hidden",
                }}
            >
                <label htmlFor="website">Website</label>
                <input
                    id="website"
                    name="website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                />
            </div>

            {status === "error" && errorMessage && (
                <p className="text-sm text-red-400" role="alert">
                    {errorMessage}
                </p>
            )}

            <Button
                type="submit"
                variant="hero"
                size="lg"
                className="w-full"
                disabled={status === "submitting"}
            >
                {status === "submitting" ? "Sending…" : "Request my AI audit"}
            </Button>

            <p className="text-xs text-muted-foreground text-center">
                We&apos;ll email you a single-use link to confirm and book. No spam.
            </p>
        </form>
    );
}
