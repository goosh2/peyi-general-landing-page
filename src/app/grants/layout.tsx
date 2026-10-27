import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

/**
 * Every /grants page wears the late-afternoon palette. The .theme-dusk class
 * switches the site's colour tokens (see globals.css) for as long as one of
 * these pages is on screen — nav and footer included — and nowhere else.
 */
export default function GrantsLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="theme-dusk min-h-screen bg-cream overflow-x-clip">
            <Navbar />
            <main>{children}</main>
            <Footer hideCta />
        </div>
    );
}
