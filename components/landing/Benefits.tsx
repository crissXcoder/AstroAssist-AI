"use client";

import { SectionContainer } from "@/components/ui/section";
import { Bot, ShieldCheck, Rocket, Zap } from "lucide-react";

export function Benefits() {
  const features = [
    {
      icon: <Bot className="w-8 h-8 text-primary" />,
      title: "Asistencia de IA 24/7",
      description: "AstroAssist analiza tu ubicación y clima para recomendarte los mejores equipos en tiempo real."
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-primary" />,
      title: "Garantía Extendida",
      description: "Protección de 5 años en todos los equipos ópticos y monturas ecuatoriales contra defectos."
    },
    {
      icon: <Rocket className="w-8 h-8 text-primary" />,
      title: "Envíos Asegurados",
      description: "Logística especializada internacional. Tu telescopio llegará en perfectas condiciones a todo el mundo."
    },
    {
      icon: <Zap className="w-8 h-8 text-primary" />,
      title: "Calibración Óptica",
      description: "Cada equipo es pre-colimado usando estrellas artificiales antes de despacharse del laboratorio."
    }
  ];

  return (
    <SectionContainer delay={0.4} className="py-24 border-y border-border/40 relative">
      <div className="absolute inset-0 bg-background/90" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent opacity-50" />
      
      <div className="container px-4 md:px-6 mx-auto relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {features.map((feature, idx) => (
            <div key={idx} className="flex flex-col items-center text-center space-y-5 group">
              <div className="p-5 rounded-2xl bg-secondary/40 border border-border/60 group-hover:border-primary/50 group-hover:shadow-[0_0_25px_rgba(var(--primary),0.2)] transition-all duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold tracking-tight">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-[250px]">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </SectionContainer>
  );
}
