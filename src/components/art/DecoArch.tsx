import Image from "next/image";
import { ArchWindowMedia } from "./ArchWindowMedia";

/**
 * The Deco arch from the comp: a sage outer arch, a cream frame lined in gold,
 * and a window onto a Miami sunset.
 *
 * The view through the window drifts opposite to the frame as the cursor moves
 * (negative --d), which is what makes it read as a real opening with depth.
 * The water is a real looping clip of the painted scene — waves rolling in and
 * back out — with a soft sun bloom over it.
 */
export function DecoArch({
    className = "",
    priority = false
}: {
    className?: string;
    priority?: boolean;
}) {
    return (
        <div aria-hidden="true" className={`pointer-events-none relative ${className}`}>
            {/* Outer gold hairline, offset from the body — the layered Deco outline */}
            <div className="depth absolute -inset-5 arch border border-gold/60" style={{ ["--d" as string]: "6px" }} />
            <div className="depth absolute -inset-10 arch border border-gold/25" style={{ ["--d" as string]: "10px" }} />

            {/* Sage body */}
            <div className="deco-wall absolute inset-0 arch bg-gradient-to-b from-[#DFE7D9] via-[#D3DECD] to-[#BFD0BE] shadow-[0_40px_80px_-40px_rgba(60,70,40,0.45)]" />

            {/* Cream frame with a gold inner line */}
            <div className="deco-frame absolute inset-[18px] arch bg-gradient-to-b from-[#FBF1E4] to-[#F1E2CF] border border-gold/70" />

            {/* The window */}
            <div className="absolute inset-[34px] arch overflow-hidden border-[1.5px] border-gold/80 bg-peach">
                <div className="depth absolute -inset-8" style={{ ["--d" as string]: "-14px" }}>
                    <ArchWindowMedia
                        eager={priority}
                        className="absolute inset-0 h-full w-full object-cover object-[35%_center]"
                    />

                    {/* Sun bloom, breathing */}
                    <span
                        className="absolute left-[37%] top-[46%] -ml-16 -mt-16 w-32 h-32 rounded-full opacity-60"
                        style={{
                            background:
                                "radial-gradient(circle, rgba(255,246,214,0.9) 0%, rgba(255,214,160,0.45) 35%, rgba(255,194,149,0) 70%)",
                            animation: "sun-breathe 6s ease-in-out infinite"
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

/**
 * The Deco building at the far left of the comp: peach stucco, fluted mint
 * pilasters, a stepped cornice, and the solid gold PEYI sign. A painted asset
 * (recreated from the comp with the palms removed), framed on the sign and
 * faded into the page on its inner edge so it reads as architecture, not a
 * picture with a border.
 */
export function DecoFacade({ className = "" }: { className?: string }) {
    return (
        <div aria-hidden="true" className={`pointer-events-none absolute overflow-hidden ${className}`}>
            <div className="depth absolute -inset-y-3 -left-3 right-0" style={{ ["--d" as string]: "5px" }}>
                <Image
                    src="/art/deco-facade.webp"
                    alt=""
                    fill
                    priority
                    sizes="220px"
                    className="object-cover object-[46%_38%]"
                    style={{
                        WebkitMaskImage: "linear-gradient(90deg, black 62%, transparent 100%)",
                        maskImage: "linear-gradient(90deg, black 62%, transparent 100%)"
                    }}
                />
            </div>
        </div>
    );
}

/**
 * The sage terrazzo slab beneath the arch (comp, lower right): a painted stone
 * wall in slight perspective — cream top edge, speckled aqua face, gold inlays,
 * and sunlight falling across it from the window.
 *
 * Over the baked light, a palm-leaf shadow sways across the stone, masked to
 * the slab by its own alpha so it never spills onto the page. The signature is
 * set on the face at the slab's own 6° slant, so it reads as lettering on the
 * stone rather than type floating in front of it.
 */
export function TerrazzoSlab({ className = "" }: { className?: string }) {
    const mask = {
        WebkitMaskImage: "url(/art/terrazzo-slab.webp)",
        maskImage: "url(/art/terrazzo-slab.webp)",
        WebkitMaskSize: "100% 100%",
        maskSize: "100% 100%"
    } as const;

    return (
        <div aria-hidden="true" className={`pointer-events-none absolute ${className}`} style={{ aspectRatio: "1600 / 600" }}>
            <Image
                src="/art/terrazzo-slab.webp"
                alt=""
                fill
                sizes="(max-width: 1280px) 60vw, 860px"
                className="object-fill"
            />

            {/* Leaf shadow moving across the stone */}
            <div className="absolute inset-0 overflow-hidden" style={mask}>
                <Image
                    src="/art/frond-fan.webp"
                    alt=""
                    width={500}
                    height={476}
                    className="frond absolute max-w-none"
                    style={{
                        left: "52%",
                        top: "-18%",
                        width: "40%",
                        height: "auto",
                        opacity: 0.16,
                        mixBlendMode: "multiply",
                        filter: "brightness(0) blur(6px)",
                        transformOrigin: "6% 99%",
                        ["--sway-dur" as string]: "9s",
                        ["--sway-delay" as string]: "-3s",
                        ["--amp" as string]: 2.2
                    }}
                />
            </div>

            <p
                className="absolute left-[16%] top-[40%] -rotate-[6deg] font-script leading-none whitespace-nowrap text-[#9C7843] select-none"
                style={{
                    fontSize: "clamp(2rem, 3vw, 3.4rem)",
                    textShadow: "0 1px 0 rgba(255, 240, 214, 0.55)"
                }}
            >
                A Brighter Way to Work
            </p>
        </div>
    );
}

/** Gold Deco bars (comp, right edge). */
export function DecoOrnament({ className = "" }: { className?: string }) {
    return (
        <svg aria-hidden="true" viewBox="0 0 60 120" className={className} fill="none" stroke="#C9A46A" strokeWidth="1.2">
            <path d="M4 10 H56 M8 18 H52 M14 26 H46" />
            <path d="M18 26 V92 M30 26 V110 M42 26 V92" />
            <path d="M12 92 H48" />
            <circle cx="30" cy="114" r="3" />
        </svg>
    );
}
