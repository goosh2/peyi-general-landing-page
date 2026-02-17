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
  metadataBase: new URL('https://www.peyiai.com'),
  title: "Peyi Solutions | AI Implementation for Small Businesses & Real Estate",
  description: "We help small businesses and real estate professionals implement AI tools that automate workflows, capture leads 24/7, and drive revenue. Strategy, automation, and training — no jargon, just results.",
  keywords: ["AI for small business", "AI implementation", "AI for real estate agents", "business automation", "AI CRM", "AI lead generation", "AI customer service", "AI marketing automation"],
  alternates: {
    canonical: "https://www.peyiai.com/",
  },
  openGraph: {
    title: "Peyi Solutions | AI Implementation for Small Businesses & Real Estate",
    description: "Turn AI into profit for your business. We implement AI tools that automate workflows, capture leads, and drive revenue.",
    type: "website",
    url: "https://www.peyiai.com/",
    images: [{ url: "/og-image.jpg" }], // Assuming default or will need to act on it
  },
  twitter: {
    card: "summary_large_image",
    title: "Peyi Solutions | AI Implementation for Small Businesses",
    description: "Turn AI into profit for your business. Strategy, automation, and training for small businesses and real estate professionals.",
  },
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
              "@type": "ProfessionalService",
              "name": "Peyi Solutions",
              "url": "https://www.peyiai.com",
              "description": "AI implementation partner helping small businesses and real estate professionals choose, configure, and deploy AI tools for automation, lead generation, and growth.",
              "areaServed": "United States",
              "knowsAbout": ["Artificial Intelligence", "Business Automation", "CRM Implementation", "AI for Real Estate", "AI for Small Business", "Marketing Automation", "Lead Generation", "GoHighLevel", "Voice AI"],
              "sameAs": [
                "https://www.facebook.com/people/Peyi-Solutions/61578259621787/",
                "https://www.youtube.com/channel/UClyFCi9ex6v2xhCx5TKppyQ",
                "https://www.linkedin.com/company/peyi-solutions"
              ]
            })
          }}
        />
        {children}
      </body>
    </html>
  );
}
