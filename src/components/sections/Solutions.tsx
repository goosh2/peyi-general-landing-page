import Link from "next/link";
import type { ComponentType } from "react";
import { ArrowUpRight } from "lucide-react";
import { PointerField } from "@/components/art/PointerField";
import { PalmCluster, SPRIG } from "@/components/art/Palms";
import {
    CalendarLoop,
    ChatLoop,
    HouseLoop,
    InvoiceLoop,
    PipelineLoop,
    VoiceLoop
} from "@/components/loops/MiniLoops";

/**
 * Each tile shows its solution working rather than describing it. The bento is
 * weighted: lead gen is the headline tile because it's where most owners feel
 * the pain first; real estate gets a full-width band because it's a specialty.
 */

type Tile = {
    title: string;
    blurb: string;
    href: string;
    span: string;
    Loop: ComponentType;
    feature?: boolean;
};

const tiles: Tile[] = [
    {
        title: "AI Lead Gen & CRM",
        blurb:
            "Every lead captured, answered while it's warm, qualified, and followed up until it books — without you chasing it.",
        href: "/ai-lead-generation-small-business",
        span: "lg:col-span-4",
        Loop: PipelineLoop,
        feature: true
    },
    {
        title: "AI Customer Service",
        blurb: "Chat that answers routine questions and books appointments, day or night.",
        href: "/ai-customer-service-small-business",
        span: "lg:col-span-2",
        Loop: ChatLoop
    },
    {
        title: "Voice AI Receptionist",
        blurb: "A phone agent that picks up every call and handles the routine ones.",
        href: "/voice-ai-agent",
        span: "lg:col-span-2",
        Loop: VoiceLoop
    },
    {
        title: "Marketing Automation",
        blurb: "Posts, emails, and nurture sequences that keep going on your busiest weeks.",
        href: "/ai-marketing-automation-small-business",
        span: "lg:col-span-2",
        Loop: CalendarLoop
    },
    {
        title: "Operations Automation",
        blurb: "Invoicing, scheduling, and data entry running quietly in the background.",
        href: "/ai-operations-automation",
        span: "lg:col-span-2",
        Loop: InvoiceLoop
    }
];

export function Solutions() {
    return (
        <PointerField as="section" className="relative isolate overflow-hidden py-28 md:py-32">
            <div id="solutions" className="absolute -top-24" aria-hidden="true" />
            <PalmCluster
                fronds={SPRIG}
                className="hidden md:block right-0 top-0 w-[360px] h-[520px] -z-10 origin-top scale-x-[-1] opacity-90"
                depth={14}
                lean={-2.5}
                pivot="0% 0%"
            />
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
                    <div className="max-w-2xl">
                        <p className="type-eyebrow mb-4">What we build</p>
                        <h2 className="type-section font-heading text-ink text-balance">
                            Systems that do the work, <span className="accent-word">not just talk about it</span>.
                        </h2>
                    </div>
                    <p className="text-body max-w-sm text-pretty">
                        We don&apos;t install a tool and leave. We build complete workflows around how your
                        business actually runs.
                    </p>
                </div>

                <div className="grid lg:grid-cols-6 gap-4">
                    {tiles.map(({ title, blurb, href, span, Loop, feature }) => (
                        <Link key={href} href={href} className={`group block ${span}`}>
                            <article
                                className={`h-full rounded-3xl surface-interactive overflow-hidden flex flex-col ${
                                    feature ? "surface-floating" : "surface-raised"
                                }`}
                            >
                                <div
                                    className={`relative border-b border-gold-soft bg-paper/70 ${
                                        feature ? "h-44 md:h-52" : "h-36"
                                    } px-6 py-5`}
                                >
                                    <div className="dot-grid absolute inset-0 opacity-60" />
                                    <div className="relative h-full">
                                        <Loop />
                                    </div>
                                </div>
                                <div className="p-6 md:p-7 flex-1 flex flex-col">
                                    <div className="flex items-start justify-between gap-4 mb-2">
                                        <h3
                                            className={`font-heading font-bold text-ink ${
                                                feature ? "text-2xl md:text-3xl" : "text-lg"
                                            }`}
                                        >
                                            {title}
                                        </h3>
                                        <ArrowUpRight className="w-5 h-5 shrink-0 text-quiet/70 transition-all duration-300 group-hover:text-ink group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                                    </div>
                                    <p className={`text-body leading-relaxed text-pretty ${feature ? "max-w-lg" : ""}`}>
                                        {blurb}
                                    </p>
                                </div>
                            </article>
                        </Link>
                    ))}

                    {/* Real estate specialty band */}
                    <Link href="/ai-for-real-estate-agents" className="group block lg:col-span-6">
                        <article className="surface-raised surface-interactive rounded-3xl p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-6 md:gap-10">
                            <HouseLoop />
                            <div className="flex-1">
                                <p className="type-eyebrow mb-2">Specialty</p>
                                <h3 className="font-heading font-bold text-ink text-xl md:text-2xl mb-1">
                                    AI for real estate agents
                                </h3>
                                <p className="text-body text-pretty">
                                    Lead capture, follow-up, and showing scheduling built around how agents
                                    actually work.
                                </p>
                            </div>
                            <span className="inline-flex items-center gap-2 text-sm font-medium text-body group-hover:text-ink transition-colors">
                                Explore Real Estate AI
                                <ArrowUpRight className="w-4 h-4" />
                            </span>
                        </article>
                    </Link>
                </div>
            </div>
        </PointerField>
    );
}
