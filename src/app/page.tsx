import { Navbar } from "@/components/layout/Navbar";
import { UntangleFilm } from "@/components/sections/UntangleFilm";
import { WhoWeServe } from "@/components/sections/WhoWeServe";
import { Solutions } from "@/components/sections/Solutions";
import { WhyUs } from "@/components/sections/WhyUs";
import { Deliverable } from "@/components/sections/Deliverable";
import { NotTheAnswer } from "@/components/sections/NotTheAnswer";
import { Founder } from "@/components/sections/Founder";
import { FAQ } from "@/components/sections/FAQ";
import { CTA } from "@/components/sections/CTA";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    // Order follows the question a warm visitor actually asks, in sequence:
    // what is this → who's it for → what do you build → how do you work →
    // what do I get → when would you say no → who are you → details → book.
    <main className="min-h-screen bg-background text-foreground selection:bg-primary/30">
      <Navbar />
      <UntangleFilm />
      <WhoWeServe />
      <Solutions />
      <WhyUs />
      <Deliverable />
      <NotTheAnswer />
      <Founder />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  );
}
