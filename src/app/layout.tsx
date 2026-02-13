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
  title: "Peyi Solutions - Your Partner in Practical AI",
  description: "Strategy, Automation & Training for SMBs and Creators. We help you Implement practical AI solutions that drive real results.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={clsx(inter.variable, spaceGrotesk.variable, "antialiased font-sans bg-background text-foreground overflow-x-hidden")}>
        {children}
      </body>
    </html>
  );
}
