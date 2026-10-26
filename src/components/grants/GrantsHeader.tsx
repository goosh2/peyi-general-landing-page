import type { ReactNode } from "react";
import { PointerField } from "@/components/art/PointerField";
import { DecoArch } from "@/components/art/DecoArch";
import { PalmCluster, SPRIG, scaleFronds } from "@/components/art/Palms";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { GrantsSubnav } from "./GrantsSubnav";

/**
 * Header for every Grants page: the homepage's Deco arch and palms in the
 * late-afternoon palette. `lead` is the answer-first paragraph — every Grants
 * page says what it is about in its first paragraph, no clever headline that
 * hides the answer.
 */
export function GrantsHeader({
    eyebrow = "Peyi Solutions Grants",
    title,
    accent,
    after,
    lead,
    crumbs,
    children,
    aside
}: {
    eyebrow?: string;
    title: string;
    accent?: string;
    /** Words after the accent, if the accent sits mid-headline. */
    after?: string;
    lead: string;
    crumbs: { label: string; href: string }[];
    children?: ReactNode;
    aside?: ReactNode;
}) {
    const url = "https://www.peyiai.com";
    return (
        <PointerField as="section" className="grain relative isolate overflow-hidden bg-cream">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "BreadcrumbList",
                        itemListElement: [{ label: "Home", href: "/" }, ...crumbs].map((c, i) => ({
                            "@type": "ListItem",
                            position: i + 1,
                            name: c.label,
                            item: `${url}${c.href}`
                        }))
                    })
                }}
            />
            <div
                aria-hidden="true"
                className="absolute inset-0 -z-20"
                style={{
                    background:
                        "radial-gradient(60% 60% at 82% 12%, rgba(247,178,178,0.55) 0%, rgba(252,242,239,0) 70%), radial-gradient(45% 55% at 0% 100%, rgba(240,205,198,0.7) 0%, rgba(252,242,239,0) 70%)"
                }}
            />

            <PalmCluster
                fronds={SPRIG}
                className="hidden lg:block right-0 top-0 w-[360px] h-[520px] z-10 origin-top scale-x-[-1]"
                depth={14}
                lean={-3}
                pivot="0% 0%"
            />
            <PalmCluster
                fronds={scaleFronds(SPRIG, 0.5)}
                className="lg:hidden right-0 top-16 w-[180px] h-[260px] z-0 origin-top scale-x-[-1] opacity-90"
                depth={8}
                lean={-2}
                pivot="0% 0%"
            />

            <div className="relative z-20 container mx-auto px-6 lg:pl-16 pt-32 pb-16 md:pt-40 md:pb-20">
                <Breadcrumbs items={crumbs} />
                <div className="grid lg:grid-cols-[1.3fr_0.7fr] gap-12 items-center">
                    <div className="max-w-3xl">
                        <p className="rise type-eyebrow mb-6">{eyebrow}</p>
                        <h1
                            className="rise font-heading font-extrabold text-ink mb-7 text-balance"
                            style={{ fontSize: "clamp(2.5rem, 5.4vw, 4.6rem)", lineHeight: 1, letterSpacing: "-0.025em", animationDelay: "0.08s" }}
                        >
                            {title}
                            {accent && (
                                <>
                                    {" "}
                                    <span className="accent-word">{accent}</span>
                                </>
                            )}
                            {after && <> {after}</>}
                        </h1>
                        <p className="rise text-lg md:text-xl text-body max-w-2xl leading-relaxed text-pretty" style={{ animationDelay: "0.16s" }}>
                            {lead}
                        </p>
                        {children && (
                            <div className="rise mt-9" style={{ animationDelay: "0.24s" }}>
                                {children}
                            </div>
                        )}
                    </div>
                    <div className="hidden lg:flex justify-self-end">{aside ?? <DecoArch className="w-[300px] h-[420px]" priority />}</div>
                </div>
            </div>

            <GrantsSubnav />
            <div className="gold-rule opacity-60" />
        </PointerField>
    );
}
