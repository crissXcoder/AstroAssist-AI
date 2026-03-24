"use client";

import { SectionContainer } from "@/components/ui/section";
import { Bot, ShieldCheck, Rocket, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { STAGGER_CONTAINER, FADE_IN_UP } from "@/lib/motion";

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
    <SectionContainer delay={0.1} className="py-24 border-y border-border/40 relative">
      <div className="absolute inset-0 bg-background/40" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent opacity-50 pointer-events-none" />
      
      <div className="container px-4 md:px-6 mx-auto relative z-10">
        <motion.div 
          variants={STAGGER_CONTAINER}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12"
        >
          {features.map((feature, idx) => (
            <motion.div 
              key={idx} 
              variants={FADE_IN_UP} 
              className="flex flex-col items-center text-center space-y-5 group"
            >
              <div className="p-5 rounded-2xl bg-secondary/40 border border-border/60 group-hover:border-primary/50 group-hover:shadow-[0_0_30px_rgba(var(--primary),0.3)] group-hover:bg-primary/10 transition-all duration-500 hover:-translate-y-2 will-change-transform flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold tracking-tight text-foreground transition-colors group-hover:text-glow">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-[250px] font-light">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </SectionContainer>
  );
}
