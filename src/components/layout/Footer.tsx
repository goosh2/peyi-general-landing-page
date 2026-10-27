import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, Facebook, Linkedin, Youtube } from "lucide-react";
import { PointerField } from "@/components/art/PointerField";
import { PalmCluster, SPRIG } from "@/components/art/Palms";

const columns = [
    {
        title: "Solutions",
        links: [
            { href: "/ai-lead-generation-small-business", label: "AI Lead Gen & CRM" },
            { href: "/ai-customer-service-small-business", label: "AI Customer Service" },
            { href: "/voice-ai-agent", label: "Voice AI Receptionist" },
            { href: "/ai-marketing-automation-small-business", label: "Marketing Automation" },
            { href: "/ai-operations-automation", label: "Operations Automation" }
        ]
    },
    {
        title: "Industries",
        links: [
            { href: "/ai-for-real-estate-agents", label: "AI for Real Estate Agents" },
            { href: "/ai-customer-service-small-business", label: "Service Businesses" },
            { href: "/ai-operations-automation", label: "Small Business Automation" },
            { href: "/grants", label: "Grants for Nonprofits & Small Businesses" },
            { href: "/grants/readiness-check", label: "Grant Readiness Check" },
            { href: "/grants/miami-grants", label: "Miami Grants" }
        ]
    },
    {
        title: "Company",
        links: [
            { href: "/#how-it-works", label: "How it works" },
            { href: "/#why-us", label: "Why Peyi Solutions" },
            { href: "/ai-readiness-quiz", label: "AI Readiness Quiz" },
            { href: "/book", label: "Book AI Audit" },
            { href: "/privacy", label: "Privacy Policy" },
            { href: "/terms", label: "Terms of Service" }
        ]
    }
];

const socials = [
    { href: "https://www.linkedin.com/company/peyi-solutions", label: "LinkedIn", icon: Linkedin },
    { href: "https://www.youtube.com/channel/UClyFCi9ex6v2xhCx5TKppyQ", label: "YouTube", icon: Youtube },
    { href: "https://www.facebook.com/people/Peyi-Solutions/61578259621787/", label: "Facebook", icon: Facebook }
];

/**
 * Evening in the same place: deep palm-green ground, gold hairlines, and the
 * palms from the hero again — shaded almost to silhouette, still swaying.
 */
export function Footer({ hideCta = false }: { hideCta?: boolean }) {
    return (
        <PointerField as="footer" className="relative isolate overflow-hidden bg-[#0B2A24] text-[#F3E9DA]">
            <div
                aria-hidden="true"
                className="absolute inset-0 -z-10"
                style={{
                    background:
                        "radial-gradient(60% 70% at 85% 0%, rgba(244,119,75,0.16) 0%, transparent 60%), radial-gradient(50% 60% at 0% 100%, rgba(29,188,160,0.10) 0%, transparent 60%)"
                }}
            />
            <div className="gold-rule opacity-70" />

            {/* Palms in silhouette */}
            <PalmCluster
                fronds={SPRIG}
                className="hidden md:block right-0 top-0 w-[380px] h-[520px] -z-10 origin-top scale-x-[-1] opacity-80 [filter:brightness(0.32)_saturate(0.6)]"
                depth={12}
                lean={-2.5}
                pivot="0% 0%"
            />
            <PalmCluster
                fronds={SPRIG}
                className="left-0 bottom-0 w-[340px] h-[460px] -z-10 origin-left scale-y-[-1] opacity-70 [filter:brightness(0.3)_saturate(0.6)]"
                depth={10}
                lean={2.5}
                pivot="0% 100%"
            />

            <div className={`container mx-auto px-6 ${hideCta ? "pt-8" : "pt-24"}`}>
                {/* Closing line + action */}
                {!hideCta && (
                <>
                <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 pb-16">
                    <div>
                        <p className="font-label text-[11px] text-gold mb-4">Peyi Solutions</p>
                        <p className="font-heading text-4xl md:text-5xl font-bold leading-[1.05] text-[#FBF3E6] max-w-2xl text-balance">
                            Your business, handled — <span className="italic text-[#FFB27A]">even after hours.</span>
                        </p>
                    </div>
                    <Link
                        href="/book"
                        className="self-start lg:self-auto inline-flex items-center gap-2.5 rounded-full bg-[image:var(--gradient-ai)] px-7 py-3.5 font-heading text-lg font-semibold text-white shadow-[0_14px_30px_-12px_rgba(232,102,75,0.6)] transition-transform duration-150 hover:scale-[1.03] active:scale-[0.97]"
                    >
                        <Calendar className="w-5 h-5" />
                        Book AI Audit
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>

                <div className="gold-rule opacity-40" />
                </>
                )}

                <div className="grid gap-12 lg:grid-cols-[1.3fr_2fr] py-16">
                    {/* Brand */}
                    <div className="max-w-sm">
                        <Link href="/" className="flex items-center gap-3 mb-5">
                            <Image src="/logo.png" alt="" width={44} height={44} className="rounded-full ring-1 ring-gold/50" />
                            <span className="font-bold text-xl tracking-[-0.02em] text-[#FBF3E6]">Peyi Solutions</span>
                        </Link>
                        <p className="text-[#F3E9DA]/65 leading-relaxed mb-6">
                            An AI implementation partner for small businesses and real estate professionals. We
                            help you choose the right tools, automate the busywork, and train your team.
                        </p>
                        <div className="flex gap-2">
                            {socials.map(({ href, label, icon: Icon }) => (
                                <Link
                                    key={label}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={label}
                                    className="w-10 h-10 rounded-full border border-gold/40 flex items-center justify-center text-[#F3E9DA]/70 hover:text-[#FBF3E6] hover:border-gold transition-colors"
                                >
                                    <Icon className="w-4 h-4" />
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Links */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
                        {columns.map((col) => (
                            <div key={col.title}>
                                <h3 className="font-label text-[11px] text-gold mb-5 !font-sans !tracking-[0.2em]">
                                    {col.title}
                                </h3>
                                <ul className="space-y-3">
                                    {col.links.map((l) => (
                                        <li key={l.label}>
                                            <Link
                                                href={l.href}
                                                className="text-[15px] text-[#F3E9DA]/70 hover:text-[#FBF3E6] transition-colors"
                                            >
                                                {l.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="gold-rule opacity-30" />
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 py-7 text-sm text-[#F3E9DA]/50">
                    <p>&copy; {new Date().getFullYear()} Peyi Solutions. All rights reserved.</p>
                    <p className="font-script text-3xl text-gold/80 leading-none">A brighter way to work</p>
                </div>
            </div>

            {/* Oversized wordmark in gold outline, cropped by the page edge */}
            <div
                aria-hidden="true"
                className="pointer-events-none select-none text-center font-heading font-bold leading-[0.78] tracking-[-0.04em] text-transparent text-[24vw] -mb-[5vw] opacity-60"
                style={{ WebkitTextStroke: "1.5px rgba(201,164,106,0.55)" }}
            >
                Peyi
            </div>
        </PointerField>
    );
}
