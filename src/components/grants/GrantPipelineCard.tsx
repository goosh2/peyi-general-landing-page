import { BellRing, FileSignature, Mail, Radar, ShieldCheck } from "lucide-react";
import { TiltCard } from "@/components/art/TiltCard";
import { DecoArch } from "@/components/art/DecoArch";

/**
 * Hub hero visual: a grant pipeline board standing in front of the arch. It is
 * labelled as an illustrative example — no real client, grant or amount.
 */
const ROWS = [
    { icon: Radar, title: "Scout", note: "Ranked for fit", status: "Ranked", tone: "teal" },
    { icon: ShieldCheck, title: "Policy check", note: "AI-use rules recorded", status: "Checked", tone: "teal" },
    { icon: FileSignature, title: "Draft", note: "Narrative ready to review", status: "Awaiting you", tone: "coral" },
    { icon: BellRing, title: "Deadline", note: "21/14/7/2-day alerts set", status: "On track", tone: "teal" },
    { icon: Mail, title: "Funder email", note: "Reply drafted for your approval", status: "Drafted", tone: "gold" }
] as const;

const TONE = {
    teal: "text-teal-deep bg-teal/10",
    coral: "text-coral-deep bg-coral/10",
    gold: "text-gold-deep bg-gold-soft/50"
};

export function GrantPipelineCard() {
    return (
        <div className="relative w-[470px] h-[560px]">
            <div className="absolute right-0 top-0 w-[280px] h-[420px]">
                <DecoArch className="w-full h-full" priority />
            </div>
            <div className="absolute left-0 bottom-0 w-[360px]">
            <TiltCard strength={0.8}>
                <div className="relative overflow-hidden rounded-[1.6rem] border border-gold-soft bg-paper/95 p-4 shadow-[0_40px_80px_-40px_rgba(120,40,50,0.55)] backdrop-blur">
                    <div className="flex items-center justify-between px-2 pb-3">
                        <span className="flex items-center gap-2 font-label text-[10px] text-ink">
                            <span className="status-dot is-live h-2 w-2 bg-teal text-teal" />
                            Grant pipeline
                        </span>
                        <span className="font-label text-[9px] text-quiet">Illustrative example</span>
                    </div>
                    <ul className="space-y-2">
                        {ROWS.map((r, i) => (
                            <li
                                key={r.title}
                                className="rise flex items-center gap-3 rounded-2xl border border-gold-soft/80 bg-cream/70 px-3 py-2.5"
                                style={{ animationDelay: `${0.35 + i * 0.12}s` }}
                            >
                                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[image:var(--gradient-ai)] text-white">
                                    <r.icon className="h-4 w-4" />
                                </span>
                                <span className="min-w-0 flex-1">
                                    <span className="block font-heading font-semibold text-ink text-[15px] leading-tight">{r.title}</span>
                                    <span className="block text-[13px] leading-snug text-quiet">{r.note}</span>
                                </span>
                                <span className={`shrink-0 rounded-full px-2.5 py-1 font-label text-[9px] ${TONE[r.tone]}`}>{r.status}</span>
                            </li>
                        ))}
                    </ul>
                    <p className="px-2 pt-3 font-heading text-[15px] text-ink">
                        You: <span className="italic text-coral-deep">approve, edit or reject</span>
                    </p>
                </div>
            </TiltCard>
            </div>
        </div>
    );
}
