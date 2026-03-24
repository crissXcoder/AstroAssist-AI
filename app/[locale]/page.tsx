import { Hero } from "@/components/landing/Hero";
import { FeaturedProducts } from "@/components/landing/FeaturedProducts";
import { ChatbotSection } from "@/components/landing/ChatbotSection";
import { CosmicInsights } from "@/components/landing/CosmicInsights";
import { Benefits } from "@/components/landing/Benefits";
import { Gallery } from "@/components/landing/Gallery";
import { Testimonials } from "@/components/landing/Testimonials";
import { CtaSection } from "@/components/landing/CtaSection";
import { Footer } from "@/components/landing/Footer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center w-full overflow-hidden selection:bg-primary/30">
      <Hero />
      <FeaturedProducts />
      <Benefits />
      <ChatbotSection />
      <CosmicInsights />
      <Gallery />
      <Testimonials />
      <CtaSection />
      <Footer />
    </main>
  );
}
