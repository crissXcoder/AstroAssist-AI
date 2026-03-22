"use client";

import { SectionContainer } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Rocket } from "lucide-react";
import { motion } from "framer-motion";
import { SCALE_IN, FADE_IN_UP, EASING } from "@/lib/motion";

export function CtaSection() {
  return (
    <SectionContainer delay={0} className="py-32 relative overflow-hidden">
      <div className="container px-4 md:px-6 mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 40 }} 
          whileInView={{ opacity: 1, scale: 1, y: 0 }} 
          viewport={{ once: true, margin: "-100px" }} 
          transition={{ duration: 0.8, ease: EASING.spring }}
          className="glass-panel border-white/10 rounded-[3rem] p-10 md:p-20 lg:p-28 flex flex-col items-center text-center space-y-10 overflow-hidden relative shadow-[0_0_80px_rgba(var(--primary),0.1)] group hover:shadow-[0_0_120px_rgba(var(--primary),0.2)] transition-shadow duration-1000"
        >
          {/* Inner intense glow following the borders roughly */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(var(--primary),0.15),transparent_70%)]" />
          <div className="absolute top-0 right-0 w-full h-[500px] bg-[radial-gradient(circle_at_right,rgba(147,51,234,0.15),transparent_50%)] rounded-full blur-[100px] -translate-y-1/2 translate-x-1/4 pointer-events-none group-hover:scale-150 transition-transform duration-[3s]" />
          
          <motion.h2 
            variants={FADE_IN_UP} initial="initial" whileInView="animate" viewport={{ once: true }}
            className="text-5xl md:text-7xl font-black tracking-tighter text-foreground relative z-10 max-w-4xl text-glow leading-[1.1]"
          >
            Inicia Tu Viaje <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-blue-400">Estelar</span> Hoy Mismo
          </motion.h2>
          <motion.p 
            variants={FADE_IN_UP} initial="initial" whileInView="animate" viewport={{ once: true }}
            className="text-xl md:text-2xl text-muted-foreground max-w-3xl relative z-10 font-light leading-relaxed"
          >
            Catálogo exhaustivo, envíos asegurados internacionalmente y la primera IA especializada en astronomía lista para guiarte en tu elección final.
          </motion.p>
          
          <motion.div 
            variants={FADE_IN_UP} initial="initial" whileInView="animate" viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-6 relative z-10 pt-8"
          >
            <Button size="lg" className="h-16 px-12 text-lg rounded-2xl shadow-[0_0_40px_rgba(var(--primary),0.6)] hover:shadow-[0_0_60px_rgba(var(--primary),0.9)] hover:scale-105 transition-all duration-500 overflow-hidden relative group/btn">
              <div className="absolute inset-0 w-[200%] h-full bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-[150%] skew-x-12 group-hover/btn:translate-x-[100%] transition-transform duration-700" />
              <Rocket className="w-6 h-6 mr-3 relative z-10" />
              <span className="relative z-10 font-bold">Ver Catálogo Completo</span>
            </Button>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Decorative ultimate bottom fade for footer boundary */}
      <div className="absolute bottom-0 w-full h-32 bg-linear-to-t from-background to-transparent pointer-events-none z-30" />
    </SectionContainer>
  );
}
