import Image from "next/image";
import Link from "next/link";
import { Linkedin, Youtube } from "lucide-react";

/**
 * The site sells warm, to people who are buying the founder's judgement. A page
 * with no human on it asks for that trust without offering anything to trust.
 *
 * Hard rule from the brand: the founder is public, but family and personal life
 * never appear here. Keep this section about the work.
 *
 * NOTE: /founder-placeholder.png is a deliberate stand-in — a featureless
 * silhouette, not a real or invented person. Replace it with a real photo
 * before this is treated as finished.
 */
export function Founder() {
    return (
        <section id="founder" className="py-28 px-6 relative overflow-hidden">
            <div className="container mx-auto max-w-5xl">
                <div className="grid md:grid-cols-[minmax(0,320px)_1fr] gap-10 md:gap-16 items-start">
                    {/* Portrait */}
                    <div className="relative">
                        <div className="relative aspect-square rounded-3xl overflow-hidden surface-raised">
                            <Image
                                src="/founder-placeholder.png"
                                alt="Portrait placeholder for the founder of Peyi Solutions"
                                fill
                                sizes="(max-width: 768px) 100vw, 320px"
                                className="object-cover"
                            />
                        </div>
                        <p className="mt-3 text-xs text-muted-foreground/70">
                            Placeholder image — to be replaced with a real photo.
                        </p>
                    </div>

                    {/* Statement */}
                    <div>
                        <p className="type-eyebrow mb-4">Who you&apos;re working with</p>
                        <h2 className="type-section font-heading text-white mb-6 text-balance">
                            You&apos;re not hiring an agency. You&apos;re hiring{" "}
                            <span className="accent-word">one person who builds</span>.
                        </h2>

                        <div className="space-y-5 text-lg text-muted-foreground leading-relaxed text-pretty max-w-2xl">
                            <p>
                                I started Peyi Solutions because small businesses kept getting sold AI
                                the same way they get sold everything else — a big promise, a monthly
                                invoice, and no one who actually understands how the business runs.
                            </p>
                            <p>
                                So I do the work myself. I sit with your actual workflows, find where
                                the hours are going, and build the systems that take that work off
                                your plate. If AI isn&apos;t the right answer for something, I&apos;ll
                                tell you that too — it&apos;s cheaper for both of us than building the
                                wrong thing.
                            </p>
                            <p>
                                I&apos;m not going to point at a client logo wall, because I&apos;m
                                building this in the open. What I&apos;ll give you instead is a clear
                                read on your business and systems that keep working after I&apos;m
                                gone.
                            </p>
                        </div>

                        <div className="flex flex-wrap items-center gap-3 mt-8">
                            <Link
                                href="https://www.linkedin.com/company/peyi-solutions"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-full surface-raised surface-interactive text-sm text-white/80 hover:text-white"
                            >
                                <Linkedin className="w-4 h-4" />
                                LinkedIn
                            </Link>
                            <Link
                                href="https://www.youtube.com/channel/UClyFCi9ex6v2xhCx5TKppyQ"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-full surface-raised surface-interactive text-sm text-white/80 hover:text-white"
                            >
                                <Youtube className="w-4 h-4" />
                                YouTube
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
