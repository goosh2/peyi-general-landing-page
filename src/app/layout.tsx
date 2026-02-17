import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import clsx from "clsx";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap" // Ensure fast text display
});

export const metadata: Metadata = {
  title: "Peyi Solutions | Practical AI Implementation for Business Growth",
  description: "Don't know where to start with AI? We help businesses identify high-ROI opportunities, build a custom AI roadmap, and implement solutions that increase profitability.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={clsx(inter.variable, spaceGrotesk.variable, "antialiased font-sans bg-background text-foreground overflow-x-hidden")}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Peyi Solutions",
              "url": "https://peyi.solutions",
              "logo": "https://peyi.solutions/logo.png",
              "description": "We help businesses identify high-ROI opportunities, build a custom AI roadmap, and implement solutions that increase profitability.",
              "makesOffer": {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "AI Roadmap & Implementation Consulting",
                  "description": "Custom AI strategy to increase business profitability and automate revenue-generating tasks."
                }
              }
            })
          }}
        />
        {children}
      </body>
    </html>
  );
}
