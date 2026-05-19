import Header from "@/components/landing/Header";
import HeroSection from "@/components/landing/HeroSection";
import ProblemSection from "@/components/landing/ProblemSection";
import MethodSection from "@/components/landing/MethodSection";
import ServicesSection from "@/components/landing/ServicesSection";
import WhyUsSection from "@/components/landing/WhyUsSection";
import TrustSection from "@/components/landing/TrustSection";
import FAQSection from "@/components/landing/FAQSection";
import Footer from "@/components/landing/Footer";
import StickyCTA from "@/components/landing/StickyCTA";
import SectionTransition from "@/components/landing/SectionTransition";

const Index = () => {
  return (
    <>
      <a
        href="#contenuto"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-[hsl(var(--on-dark))] focus:text-[hsl(var(--foreground))] focus:rounded-md"
      >
        Vai al contenuto principale
      </a>
      <Header />
      <main id="contenuto">
        {/* Hero (dark) → Problem (dark) — la ProblemSection si auto-anima all'entry
            (foto sx entra da sinistra, blocco testo dx entra da destra) */}
        <HeroSection />
        <ProblemSection />

        {/* Problem (dark) → Method (dark-soft) — gradient morbido 18vh */}
        <SectionTransition from="--background" to="--background-soft" />
        <MethodSection />

        {/* Method (dark-soft) → Services (dark) */}
        <SectionTransition from="--background-soft" to="--background" />
        <ServicesSection />

        {/* Services (dark) → Trust (dark-soft) */}
        <SectionTransition from="--background" to="--background-soft" />
        <TrustSection />

        {/* Trust (dark-soft) → WhyUs (dark, hero+form) */}
        <SectionTransition from="--background-soft" to="--background" />
        <WhyUsSection />

        {/* WhyUs (dark) → FAQ (dark-soft) */}
        <SectionTransition from="--background" to="--background-soft" />
        <FAQSection />
      </main>
      <div className="pb-16 md:pb-0">
        <Footer />
      </div>
      <StickyCTA />
    </>
  );
};

export default Index;
