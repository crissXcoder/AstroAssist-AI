"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Telescope, ArrowRight, Sparkles, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const yContent = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacityFade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section 
      ref={containerRef}
      className="relative w-full min-h-[100vh] flex flex-col items-center justify-center overflow-hidden pt-24 pb-16"
    >
      {/* Deep Space Parallax Background */}
      <motion.div 
        style={{ y: yBg }}
        className="absolute inset-0 z-0 pointer-events-none"
      >
        {/* Core glowing orb */}
        <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,var(--tw-gradient-stops))] from-primary/15 via-transparent to-transparent rounded-full blur-[80px]" />
        
        {/* Secondary accents */}
        <div className="absolute top-[10%] right-[10%] w-[400px] h-[400px] bg-[radial-gradient(circle,var(--tw-gradient-stops))] from-blue-600/15 via-transparent to-transparent rounded-full blur-[100px]" />
        <div className="absolute bottom-[20%] left-[10%] w-[500px] h-[500px] bg-[radial-gradient(circle,var(--tw-gradient-stops))] from-purple-600/10 via-transparent to-transparent rounded-full blur-[120px]" />
        
        {/* Grid pattern overlay (subtle SaaS look) */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)]" />
      </motion.div>

      <motion.div 
        style={{ y: yContent, opacity: opacityFade }}
        className="container relative z-10 px-4 md:px-6 flex flex-col items-center text-center mt-10 md:mt-20"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8"
        >
          <Badge variant="glass" className="py-2 px-5 text-sm gap-2 uppercase tracking-widest border-primary/30 text-primary-foreground shadow-[0_0_20px_rgba(var(--primary),0.3)] backdrop-blur-md bg-background/40">
            <Sparkles className="w-4 h-4 text-primary animate-pulse" />
            <span className="bg-clip-text text-transparent bg-linear-to-r from-primary to-blue-300 font-semibold">
              Desbloquea el Cosmos
            </span>
          </Badge>
        </motion.div>

        <motion.h1 
          className="text-6xl md:text-8xl lg:text-[10rem] font-black tracking-tighter text-foreground leading-[0.9] max-w-6xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          Claridad a <br className="hidden md:block" />
          <span className="inline-block relative">
            <span className="relative z-10 text-transparent bg-clip-text bg-linear-to-r from-primary via-indigo-400 to-purple-400 text-glow">
              Años Luz
            </span>
          </span>
        </motion.h1>

        <motion.p 
          className="mt-10 text-xl md:text-2xl text-muted-foreground max-w-3xl leading-relaxed font-light"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          Equipamiento óptico de precisión superior impulsado por la primera Inteligencia Artificial especializada. 
          Encuentra tu setup ideal en segundos.
        </motion.p>

        <motion.div 
          className="mt-12 flex flex-col sm:flex-row gap-6 w-full sm:w-auto items-center justify-center"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <Button size="lg" className="h-16 px-10 text-lg rounded-2xl shadow-[0_0_40px_rgba(var(--primary),0.4)] hover:shadow-[0_0_60px_rgba(var(--primary),0.6)] hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto relative group overflow-hidden">
            {/* Glossy reflection effect */}
            <div className="absolute inset-0 w-1/2 h-full bg-linear-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-[150%] group-hover:translate-x-[250%] transition-transform duration-1000" />
            <Telescope className="w-5 h-5 mr-3 relative z-10" />
            <span className="relative z-10 font-bold">Explorar Catálogo</span>
          </Button>
          
          <Button size="lg" variant="glass" className="h-16 px-10 text-lg rounded-2xl group w-full sm:w-auto border-white/10 hover:bg-white/5 backdrop-blur-lg transition-all duration-300">
            Consultar IA Asistente
            <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1.5 transition-transform" />
          </Button>
        </motion.div>
      </motion.div>

      {/* Hero Visual Element (AI Hint + Astronomy Composite) */}
      <motion.div 
        className="w-full max-w-6xl px-4 mt-20 relative z-20"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="relative rounded-3xl glass border border-white/10 shadow-2xl overflow-hidden aspect-[21/9] bg-background/50 backdrop-blur-2xl flex items-center justify-center group transform perspective-[1000px] hover:rotate-x-2 transition-transform duration-700">
          
          {/* Base imagery */}
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1543722530-d2c3201371e7?q=80&w=1600&auto=format&fit=crop')] bg-cover bg-center opacity-40 group-hover:opacity-60 transition-opacity duration-1000 mix-blend-lighten group-hover:scale-105" />
          
          {/* Vignette & Fade blending */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,var(--background)_100%)] opacity-80" />
          <div className="absolute bottom-0 w-full h-1/2 bg-linear-to-t from-background to-transparent" />
          
          {/* Floating UI Dasboard Hint layers */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[70%] border border-white/5 rounded-2xl bg-black/20 backdrop-blur-sm shadow-2xl hidden md:flex flex-col overflow-hidden pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity duration-700">
             {/* Fake Header */}
             <div className="w-full h-10 border-b border-white/5 bg-white/5 flex items-center px-4 gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                <div className="w-3 h-3 rounded-full bg-green-500/50" />
             </div>
             {/* Fake Body */}
             <div className="flex-1 w-full bg-linear-to-b from-primary/5 to-transparent relative opacity-50" />
          </div>

          {/* Floating AI Bubble Hint - Popout */}
          <motion.div 
            className="absolute bottom-6 right-6 md:bottom-12 md:right-12 glass-panel rounded-2xl p-4 md:p-6 border-primary/20 shadow-[0_20px_50px_rgba(var(--primary),0.4)] flex gap-4 max-w-sm pointer-events-none z-30 bg-background/80 backdrop-blur-2xl"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2, ease: "easeOut" }}
          >
            <div className="w-12 h-12 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center shrink-0">
              <Bot className="w-6 h-6 text-primary" />
            </div>
            <div className="flex flex-col justify-center">
              <p className="text-sm font-semibold text-foreground mb-1 flex items-center gap-2">
                AstroAssist <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Condiciones óptimas: Cielo despejado, seeing 4/5. La nebulosa de la Cabeza de Caballo es visible esta noche.
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Decorative ultimate bottom fade to blend into the next section perfectly */}
      <div className="absolute bottom-0 w-full h-48 bg-linear-to-t from-background via-background/90 to-transparent pointer-events-none z-30" />
    </section>
  );
}
