"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Bot, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useTranslations, useLocale } from "@/components/i18n-provider";
import { Badge } from "@/components/ui/badge"; // Assuming Badge is needed for the new structure
import { ChevronRight } from "lucide-react"; // Assuming ChevronRight is needed for the new structure
import images from "@/lib/images.json";

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const t = useTranslations().hero;
  const locale = useLocale();

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  
  const windowScale = useTransform(scrollYProgress, [0, 0.6], [0.95, 1]);
  const windowY = useTransform(scrollYProgress, [0, 1], ["5%", "-5%"]);
  const windowRotateX = useTransform(scrollYProgress, [0, 0.5], [8, 0]);

  return (
    <section 
      ref={containerRef} 
      className="relative w-full min-h-[120vh] md:min-h-[140vh] flex flex-col items-center pt-32 md:pt-44 overflow-hidden perspective-distant"
    >
      {/* 1. Ultra-clean Deep Space Background */}
      <motion.div 
        style={{ y: bgY }}
        className="absolute inset-0 z-0 pointer-events-none"
      >
        <div className="absolute inset-0 bg-cover bg-center opacity-[0.10] mix-blend-screen" style={{ backgroundImage: `url('${images.hero.background}')` }} />
        <div className="absolute inset-0 bg-linear-to-b from-[#0A0D14]/80 via-transparent to-[#0A0D14]" />
        
        {/* Single subtle aura for depth */}
        <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[40vw] h-[40vw] max-w-[600px] bg-[radial-gradient(ellipse,rgba(99,102,241,0.06),transparent_60%)] rounded-full blur-[80px]" />
      </motion.div>

      {/* 2. Premium Minimalist Typography */}
      <motion.div 
        style={{ y: textY, opacity: textOpacity }}
        className="container relative z-10 px-4 flex flex-col items-center text-center will-change-transform"
      >
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8"
        >
          <Badge variant="glass" className="bg-white/5 border-white/10 text-[10px] px-3 py-1.5 uppercase tracking-[0.2em] text-neutral-400 font-medium">
            <Sparkles className="w-3 h-3 mr-2 text-indigo-400" />
            {t.badge}
          </Badge>
        </motion.div>

        <motion.h1 
          className="text-6xl sm:text-7xl md:text-[6.5rem] lg:text-[7.5rem] font-medium tracking-tight text-neutral-300 leading-[1.05]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          {t.title_part1} <br />
          {t.title_part2} <br />
          {t.title_part3}
        </motion.h1>

        <motion.p 
          className="max-w-[700px] text-neutral-500 text-lg md:text-xl font-light leading-relaxed mb-10 mx-auto mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          {t.description}
        </motion.p>

        <motion.div 
          className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto items-center justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <Link href={`/${locale}/catalogo`} className="w-full sm:w-auto">
            <Button size="lg" className="w-full sm:w-48 h-12 rounded-full text-sm font-medium bg-white text-black hover:bg-neutral-200 transition-colors shadow-none border-0">
              {t.cta_catalog}
            </Button>
          </Link>
          <Link href={`/${locale}#chat`} className="w-full sm:w-auto">
            <Button size="lg" variant="glass" className="w-full sm:w-48 h-12 rounded-full text-sm font-medium border border-white/10 hover:bg-white/10 text-neutral-300 transition-colors shadow-none">
              {t.cta_console}
            </Button>
          </Link>
        </motion.div>
      </motion.div>

      {/* 3. Sleek Dashboard Window */}
      <motion.div 
        style={{ scale: windowScale, y: windowY, rotateX: windowRotateX }}
        className="relative z-20 w-full max-w-5xl px-4 mt-20 md:mt-24 pointer-events-none will-change-transform"
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.4, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="relative rounded-xl md:rounded-4xl border border-border/50 dark:border-white/5 bg-background/60 dark:bg-background/40 backdrop-blur-2xl shadow-2xl dark:shadow-[0_0_50px_rgba(0,0,0,0.4)] overflow-hidden aspect-16/10 md:aspect-21/9">
          
          {/* Subtle OS Header */}
          <div className="absolute top-0 w-full h-10 bg-secondary/30 dark:bg-white/2 border-b border-border/30 dark:border-white/2 flex items-center px-5 gap-2 z-20">
            <div className="w-2.5 h-2.5 rounded-full bg-neutral-700/50" />
            <div className="w-2.5 h-2.5 rounded-full bg-neutral-700/50" />
            <div className="w-2.5 h-2.5 rounded-full bg-neutral-700/50" />
          </div>
          
          <div className="absolute inset-0 bg-cover bg-center opacity-60 mix-blend-lighten scale-[1.02]" style={{ backgroundImage: `url('${images.hero.dashboard}')` }} />
          
          <div className="absolute inset-0 bg-linear-to-t from-[#0A0D14] via-transparent to-transparent opacity-80" />

          {/* Ultra-clean AI Insight Card */}
          <motion.div 
            className="absolute bottom-6 left-6 md:bottom-8 md:right-8 md:left-auto bg-background/90 dark:bg-background/80 backdrop-blur-3xl border border-border/50 dark:border-white/5 rounded-xl p-4 max-w-[260px] flex items-start gap-4"
            animate={{ y: [0, -6, 0] }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
          >
            <div className="w-8 h-8 rounded-full bg-secondary dark:bg-white/5 flex items-center justify-center shrink-0 border border-border/50 dark:border-white/5">
              <Bot className="w-4 h-4 text-neutral-400" />
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-white tracking-wide">AstroAssist</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse drop-shadow-[0_0_5px_rgba(16,185,129,0.5)]" />
              </div>
              <p className="text-[11px] text-neutral-400 leading-relaxed font-light">
                Condiciones atmosféricas óptimas. Visibilidad cristalina.
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Fade connecting to next section */}
      <div className="absolute bottom-0 w-full h-48 bg-linear-to-t from-[#0A0D14] to-transparent z-30" />
    </section>
  );
}
