import Link from "next/link";
import { ArrowRight, Check, RefreshCw } from "lucide-react";
import { GrantsHeader } from "@/components/grants/GrantsHeader";
import { GrantsCTA, LastUpdated, SectionHead } from "@/components/grants/bits";
import { COMPARISON } from "@/lib/grants/content";
import { grantsMeta } from "@/lib/grants/meta";

export const metadata = grantsMeta(
    "/grants/done-for-you-vs-enablement",
    "Done-for-You Grant Service vs. Enablement: How to Choose | Peyi Solutions Grants",
    "Choose done-for-you if you have no grant staff and want one owner for the pipeline; choose enablement if you have a person who will run grants in-house with their own AI setup."
);

const CHOOSE = [
    {
        name: "Choose done-for-you if",
        items: ["You have no grant staff.", "Deadlines keep slipping.", "You want one owner for the pipeline."],
        href: "/grants/pricing",
        cta: "Grant Blitz, Core and Pro"
    },
    {
        name: "Choose enablement if",
        items: ["You have a person who will own grants.", "You want your own AI setup.", "You want to learn the system before handing it over."],
        href: "/grants/pricing#enablement",
        cta: "Enablement"
    }
];

export default function DfyVsEnablement() {
    return (
        <>
            <GrantsHeader
                title="Done-for-you vs. enablement:"
                accent="how to choose."
                lead="Peyi Solutions Grants comes in two tracks. Done-for-you means Peyi runs the whole pipeline and you approve; enablement means Peyi sets up your own AI grant system, trains your person, and advises while you run the applications yourself."
                crumbs={[
                    { label: "Grants", href: "/grants" },
                    { label: "Done-for-you vs. enablement", href: "/grants/done-for-you-vs-enablement" }
                ]}
            />

            <section className="container mx-auto px-6 lg:px-16 py-24 md:py-28">
                <div className="overflow-x-auto rounded-[1.5rem] border border-gold-soft bg-paper">
                    <table className="w-full min-w-[640px] text-left">
                        <thead>
                            <tr className="border-b border-gold-soft">
                                <th className="p-5" />
                                {COMPARISON.columns.map((c) => (
                                    <th key={c} className="p-5 font-heading text-xl font-bold text-ink">
                                        {c}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gold-soft">
                            {COMPARISON.rows.map(([label, a, b]) => (
                                <tr key={label}>
                                    <th scope="row" className="p-5 font-label text-[11px] text-gold-deep align-top">
                                        {label}
                                    </th>
                                    <td className="p-5 text-body">{a}</td>
                                    <td className="p-5 text-body">{b}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="mt-12 grid gap-6 md:grid-cols-2">
                    {CHOOSE.map((c) => (
                        <div key={c.name} className="rounded-[1.75rem] border border-gold-soft bg-paper p-8">
                            <h2 className="font-heading text-3xl font-bold text-ink">{c.name}</h2>
                            <ul className="mt-5 space-y-3">
                                {c.items.map((i) => (
                                    <li key={i} className="flex gap-3 text-lg text-body">
                                        <Check className="mt-1 h-5 w-5 shrink-0 text-teal-deep" strokeWidth={3} />
                                        {i}
                                    </li>
                                ))}
                            </ul>
                            <Link href={c.href} className="mt-7 inline-flex items-center gap-2 font-heading font-semibold text-coral-deep hover:text-ink">
                                See {c.cta} pricing <ArrowRight className="h-4 w-4" />
                            </Link>
                        </div>
                    ))}
                </div>
            </section>

            <section className="band py-24">
                <div className="container mx-auto px-6 lg:px-16 max-w-4xl">
                    <SectionHead eyebrow="Said plainly" title="The path most enablement clients" accent="end up on." />
                    <div className="flex gap-5 rounded-[1.75rem] border border-gold/60 bg-paper p-8">
                        <RefreshCw className="h-8 w-8 shrink-0 text-coral-deep" />
                        <p className="text-xl text-body leading-relaxed">
                            Enablement clients who stop keeping up often convert to done-for-you. We&apos;d rather tell you that now than hide it — and if you do
                            switch, your vault carries over, so nothing you built is wasted.
                        </p>
                    </div>
                    <LastUpdated className="mt-10" />
                </div>
            </section>

            <GrantsCTA />
        </>
    );
}
