import Link from "next/link";
import { ClipboardCheck, FolderOpen, MessagesSquare, Route } from "lucide-react";
import { GrantsHeader } from "@/components/grants/GrantsHeader";
import { GrantsInquiryForm } from "@/components/grants/GrantsInquiryForm";
import { LastUpdated } from "@/components/grants/bits";
import { GRANTS_LINKS, READINESS_HREF } from "@/lib/grants/config";
import { grantsMeta } from "@/lib/grants/meta";

export const metadata = grantsMeta(
    "/grants/book-a-call",
    "Book a Grants Call or Start Your Org Vault Intake | Peyi Solutions Grants",
    "Use this form to book a call with Peyi Solutions about grants, start your Org Vault intake, or ask a question first. No payment, and nothing sensitive is collected."
);

const NEXT = [
    { icon: MessagesSquare, title: "Peyi replies", body: "With a time to talk, or your Org Vault intake if that's what you asked for." },
    { icon: FolderOpen, title: "Intake and documents", body: "16 intake questions, plus your documents in a private Uploads folder." },
    { icon: ClipboardCheck, title: "Your gap list", body: "Peyi reviews what you sent and returns what's missing or expired." },
    { icon: Route, title: "Scope and tier", body: "A short discovery call confirms the right tier — then Vault, Scout, drafting, your approval, and the Tracker." }
];

export default function BookACall() {
    return (
        <>
            <GrantsHeader
                title="Book a call, or start your"
                accent="Org Vault intake."
                lead="Use this form to book a call with Peyi Solutions about grants, start your Org Vault intake, or ask a question first. There's no payment and no obligation, and the form never asks for EINs, bank details or documents."
                crumbs={[
                    { label: "Grants", href: "/grants" },
                    { label: "Book a call", href: "/grants/book-a-call" }
                ]}
            />

            <section className="container mx-auto px-6 lg:px-16 py-20 md:py-24">
                <div className="grid lg:grid-cols-[1.25fr_0.75fr] gap-10 items-start">
                    <GrantsInquiryForm />
                    <aside className="lg:sticky lg:top-28 space-y-6">
                        <div className="rounded-[1.75rem] border border-gold-soft bg-paper p-7">
                            <h2 className="font-heading text-2xl font-bold text-ink">What happens next</h2>
                            <ol className="mt-5 space-y-5">
                                {NEXT.map((n, i) => (
                                    <li key={n.title} className="flex gap-4">
                                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[image:var(--gradient-ai)] text-white">
                                            <n.icon className="h-4 w-4" />
                                        </span>
                                        <span>
                                            <span className="block font-heading font-semibold text-ink">
                                                {i + 1}. {n.title}
                                            </span>
                                            <span className="text-[15px] text-body leading-relaxed">{n.body}</span>
                                        </span>
                                    </li>
                                ))}
                            </ol>
                        </div>
                        <div className="rounded-[1.75rem] border border-dashed border-gold bg-paper/70 p-6 text-[15px] text-body leading-relaxed">
                            Haven&apos;t taken the{" "}
                            <Link href={READINESS_HREF} className="font-semibold text-coral-deep underline decoration-gold underline-offset-2">
                                Readiness Check
                            </Link>{" "}
                            yet? It takes about 5 minutes, and your score comes along with this form.
                            {GRANTS_LINKS.contactEmail ? (
                                <p className="mt-3">
                                    Prefer email? <a href={`mailto:${GRANTS_LINKS.contactEmail}`} className="text-ink underline">{GRANTS_LINKS.contactEmail}</a>
                                </p>
                            ) : (
                                <p className="mt-3">
                                    Prefer email? <span className="tbc">To confirm: contact email</span>
                                </p>
                            )}
                        </div>
                    </aside>
                </div>
                <LastUpdated className="mt-12" />
            </section>
        </>
    );
}
