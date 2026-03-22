"use client";

import { motion } from "framer-motion";
import { Telescope, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function Hero() {
  return (
    <section className="relative w-full min-h-[90vh] flex flex-col items-center justify-center overflow-hidden pt-20">
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-primary/20 rounded-full blur-[120px] -z-10 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[400px] bg-blue-600/10 rounded-full blur-[100px] -z-10 pointer-events-none" />

      <div className="container px-4 md:px-6 flex flex-col items-center text-center z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Badge variant="glass" className="py-1.5 px-4 text-sm gap-2 uppercase tracking-widest border-primary/30 text-primary-foreground shadow-[0_0_15px_rgba(var(--primary),0.3)]">
            <Sparkles className="w-4 h-4 text-primary" />
            <span>El Universo a tu alcance</span>
          </Badge>
        </motion.div>

        <motion.h1 
          className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-foreground leading-[1.1] max-w-5xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Explora más allá de <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-linear-to-r from-primary via-blue-400 to-purple-400 text-glow">
            Nuestra Galaxia
          </span>
        </motion.h1>

        <motion.p 
          className="mt-8 text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Equipos premium de astronomía y astrofotografía. Deja que nuestra Inteligencia Artificial evalúe tu nivel de experiencia y te acompañe en cada observación.
        </motion.p>

        <motion.div 
          className="mt-10 flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Button size="lg" className="h-14 px-8 text-base shadow-[0_0_30px_rgba(var(--primary),0.3)] hover:shadow-[0_0_50px_rgba(var(--primary),0.5)] transition-all">
            <Telescope className="w-5 h-5 mr-2" />
            Explorar Catálogo
          </Button>
          <Button size="lg" variant="glass" className="h-14 px-8 text-base group">
            Consultar AstroAssist
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>

      {/* Decorative bottom fade */}
      <div className="absolute bottom-0 w-full h-32 bg-linear-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
}
