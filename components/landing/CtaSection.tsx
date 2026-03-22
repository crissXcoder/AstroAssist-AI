"use client";

import { SectionContainer } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Rocket } from "lucide-react";

export function CtaSection() {
  return (
    <SectionContainer delay={0.1} className="py-24 relative overflow-hidden">
      <div className="container px-4 md:px-6 mx-auto relative z-10">
        <div className="glass-panel border-primary/30 rounded-[3rem] p-8 md:p-16 lg:p-24 flex flex-col items-center text-center space-y-8 overflow-hidden relative box-glow">
          {/* Inner intense glow */}
          <div className="absolute inset-0 bg-primary/10" />
          <div className="absolute top-0 right-0 w-full h-[500px] bg-primary/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4 pointer-events-none" />
          
          <h2 className="text-4xl md:text-6xl font-black tracking-tight text-foreground relative z-10 max-w-3xl leading-[1.1] text-glow">
            Inicia Tu Viaje Estelar Hoy Mismo
          </h2>
          <p className="text-lg md:text-xl text-primary-foreground/70 max-w-2xl relative z-10">
            Catálogo exhaustivo, envíos asegurados y la primera IA especializada en astronomía lista para guiarte en tu elección.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 relative z-10 pt-6">
            <Button size="lg" className="h-16 px-10 text-lg rounded-2xl shadow-[0_0_40px_rgba(var(--primary),0.6)] hover:shadow-[0_0_60px_rgba(var(--primary),0.8)] hover:scale-105 transition-all duration-300">
              <Rocket className="w-6 h-6 mr-2" />
              Ver Catálogo Completo
            </Button>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}
