import Link from "next/link";

export function Footer() {
    return (
        <footer className="w-full border-t border-border/50 py-12 px-6 bg-background relative z-10">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-6 md:gap-0">

                {/* Left: Branding */}
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-gradient-primary flex items-center justify-center text-white font-bold font-heading">
                        P
                    </div>
                    <span className="font-heading font-bold text-lg">Peyi Solutions</span>
                </div>

                {/* Center: Mission */}
                <p className="text-sm text-muted-foreground text-center md:text-left max-w-sm">
                    Trusted by SMBs, creators, and enterprises. Let&apos;s build something great together.
                </p>

                {/* Right: Links */}
                <div className="flex items-center gap-6">
                    {["Privacy", "Terms", "Contact"].map((item) => (
                        <Link
                            key={item}
                            href="#"
                            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                            {item}
                        </Link>
                    ))}
                </div>
            </div>
        </footer>
    );
}
