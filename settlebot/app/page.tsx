import Hero from "@/components/hero";
import Features from "@/components/features";
import HowItWorks from "@/components/how-it-works";
import CTA from "@/components/cta";

export default function Home() {
  return (
    <>
      <Hero />
      <main className="flex-1 flex flex-col gap-16 px-4 py-16 max-w-6xl mx-auto">
        <Features />
        <HowItWorks />
        <CTA />
      </main>
    </>
  );
}
