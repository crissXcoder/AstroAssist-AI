import { SetupBuilder } from "@/components/setup-builder/SetupBuilder";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";

export default function BuilderPage() {
  return (
    <main className="min-h-screen bg-background flex flex-col pt-24">
      <Navbar />
      
      <div className="flex-1 w-full bg-background border-b border-border/40">
        <div className="container mx-auto px-4 md:px-6 py-12 md:py-20 flex justify-center">
          <SetupBuilder />
        </div>
      </div>
      
      <Footer />
    </main>
  );
}
