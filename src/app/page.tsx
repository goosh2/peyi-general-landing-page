import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { StickyCTA } from "@/components/layout/StickyCTA";
import { HomeHero } from "@/components/sections/HomeHero";
import { TaskMarquee } from "@/components/sections/TaskMarquee";
import { Solutions } from "@/components/sections/Solutions";
import { AfterHours } from "@/components/sections/AfterHours";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Deliverable } from "@/components/sections/Deliverable";
import { NotTheAnswer } from "@/components/sections/NotTheAnswer";
import { Founder } from "@/components/sections/Founder";
import { FAQ } from "@/components/sections/FAQ";
import { CTA } from "@/components/sections/CTA";

export default function Home() {
  return (
    // The page answers a warm visitor's questions in the order they ask them:
    // what is this → what could it take off my plate → what do you build →
    // show me one working → how does it start → what do I get → why you →
    // who are you → details → book.
    <main className="min-h-screen bg-background text-foreground selection:bg-primary/30">
      <Navbar />
      <HomeHero />
      <TaskMarquee />
      <Solutions />
      <AfterHours />
      <HowItWorks />
      <Deliverable />
      <NotTheAnswer />
      <Founder />
      <FAQ />
      <CTA />
      <Footer />
      <StickyCTA />
    </main>
  );
}
