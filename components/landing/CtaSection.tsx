"use client";

import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useTranslations, useLocale } from "@/components/i18n-provider";

export function CtaSection() {
  const t = useTranslations().cta;
  const locale = useLocale();
  return (
    <section className="relative w-full py-24 md:py-40 bg-background border-t border-border/40 flex items-center justify-center">
      <div className="container mx-auto px-4 md:px-6 relative z-10 flex flex-col items-center text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mx-auto flex flex-col items-center"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/30 dark:bg-white/5 border border-border/50 dark:border-white/10 w-fit mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-neutral-400">{t.badge}</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-medium tracking-tight text-foreground leading-[1.05] mb-8">
            {t.title_part1} <br className="hidden sm:block"/>
            <span className="text-muted-foreground">{t.title_part2}</span>
          </h2>
          
          <p className="text-lg md:text-xl text-muted-foreground font-light leading-relaxed max-w-2xl mb-12">
            {t.description}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full sm:w-auto">
            <Link href={`/${locale}/catalogo`} className="w-full sm:w-auto">
              <Button size="lg" className="h-14 px-10 rounded-full bg-foreground text-background hover:bg-foreground/90 transition-colors w-full text-sm font-medium">
                {t.button} <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1" />
              </Button>
            </Link>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <ShieldCheck className="w-4 h-4 text-emerald-500/70" />
              <span className="tracking-wide font-medium">{t.guarantee}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
