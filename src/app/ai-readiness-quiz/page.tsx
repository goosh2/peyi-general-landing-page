import { QuizContainer } from "@/components/quiz/QuizContainer";
import Image from "next/image";
import Link from "next/link";

export default function QuizPage() {
    return (
        <div className="min-h-screen bg-background flex flex-col">
            {/* Minimal Header */}
            <header className="fixed top-0 left-0 right-0 p-6 z-50 pointer-events-none">
                <div className="container mx-auto flex justify-between items-center pointer-events-auto">
                    <Link href="/" className="flex items-center gap-2">
                        <Image src="/logo.png" alt="" width={32} height={32} className="rounded-full ring-1 ring-gold/40" />
                        <span className="font-heading font-bold hidden sm:inline-block">Peyi Solutions</span>
                    </Link>

                    <div className="text-sm text-muted-foreground py-1 px-3 rounded-full bg-sand/60 border border-gold-soft backdrop-blur">
                        ~2 min
                    </div>
                </div>
            </header>

            <QuizContainer />
        </div>
    );
}
