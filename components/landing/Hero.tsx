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
        <div className="absolute inset-0 bg-linear-to-b from-background/80 via-transparent to-background" />
        
        {/* Single subtle aura for depth */}
        <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[40vw] h-[40vw] max-w-[600px] bg-[radial-gradient(ellipse,rgba(98,87,244,0.06),transparent_60%)] rounded-full blur-[80px]" />
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
          <Badge variant="glass" className="bg-primary/5 border-primary/10 text-label-sm text-text-muted">
            <Sparkles className="w-3 h-3 mr-2 text-primary" />
            {t.badge}
          </Badge>
        </motion.div>

        <motion.h1 
          className="text-display-lg md:text-display-xl font-medium tracking-tight text-text-main leading-[1.02]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          {t.title_part1} <br />
          {t.title_part2} <br />
          <span className="text-primary">{t.title_part3}</span>
        </motion.h1>

        <motion.p 
          className="max-w-[700px] text-body-lg text-text-soft font-light leading-relaxed mb-12 mx-auto mt-8"
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
            <Button size="lg" className="w-full sm:w-56 h-14 rounded-full text-label-md bg-primary text-on-primary hover:bg-primary-hover transition-all shadow-xl shadow-primary/20 border-0">
              {t.cta_catalog}
            </Button>
          </Link>
          <Link href={`/${locale}#chat`} className="w-full sm:w-auto">
            <Button size="lg" variant="glass" className="w-full sm:w-56 h-14 rounded-full text-label-md border border-white/10 hover:bg-white/10 text-text-main transition-colors shadow-none">
              {t.cta_console}
            </Button>
          </Link>
        </motion.div>
      </motion.div>

      {/* 3. Sleek Dashboard Window */}
      <motion.div 
        style={{ scale: windowScale, y: windowY, rotateX: windowRotateX }}
        className="relative z-20 w-full max-w-6xl px-4 mt-20 md:mt-24 pointer-events-none will-change-transform"
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.4, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="relative rounded-xl md:rounded-[40px] border border-white/5 bg-surface-container/60 backdrop-blur-3xl shadow-2xl shadow-black/50 overflow-hidden aspect-16/10 md:aspect-21/9">
          
          {/* Subtle OS Header */}
          <div className="absolute top-0 w-full h-12 bg-white/5 border-b border-white/5 flex items-center px-6 gap-2 z-20">
            <div className="w-3 h-3 rounded-full bg-white/10" />
            <div className="w-3 h-3 rounded-full bg-white/10" />
            <div className="w-3 h-3 rounded-full bg-white/10" />
          </div>
          
          <div className="absolute inset-0 bg-cover bg-center opacity-70 mix-blend-lighten scale-[1.02]" style={{ backgroundImage: `url('${images.hero.dashboard}')` }} />
          
          <div className="absolute inset-0 bg-linear-to-t from-background via-transparent to-transparent opacity-90" />

          {/* Ultra-clean AI Insight Card */}
          <motion.div 
            className="absolute bottom-8 right-8 bg-surface-container-highest/90 backdrop-blur-3xl border border-white/10 rounded-2xl p-5 max-w-[280px] flex items-start gap-4 shadow-2xl"
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
          >
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20">
              <Bot className="w-5 h-5 text-primary" />
            </div>
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2">
                <span className="text-body-sm font-bold text-text-main tracking-wide">AstroAssist</span>
                <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
              </div>
              <p className="text-[11px] text-text-soft leading-relaxed font-normal">
                Condiciones atmosféricas óptimas. Visibilidad cristalina detectada.
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Fade connecting to next section */}
      <div className="absolute bottom-0 w-full h-64 bg-linear-to-t from-background to-transparent z-30" />
    </section>
  );
}
