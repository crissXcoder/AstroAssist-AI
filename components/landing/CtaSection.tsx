"use client";

import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useTranslations, useLocale } from "@/components/i18n-provider";

export function CtaSection() {
  const t = useTranslations().cta;
  const locale = useLocale();
  return (
    <section className="relative w-full py-24 md:py-40 bg-surface-container-lowest border-t border-white/5 flex items-center justify-center">
      <div className="container mx-auto px-4 md:px-6 relative z-10 flex flex-col items-center text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mx-auto flex flex-col items-center"
        >
          <Badge variant="glass" className="bg-primary/5 border-primary/10 text-label-sm text-text-muted mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse mr-2" />
            {t.badge}
          </Badge>
          
          <h2 className="text-headline-lg md:text-headline-xl font-semibold tracking-tight text-text-main leading-[1.08] mb-8">
            {t.title_part1} <br className="hidden sm:block"/>
            <span className="text-primary">{t.title_part2}</span>
          </h2>
          
          <p className="text-body-lg text-text-soft font-light leading-relaxed max-w-2xl mb-12">
            {t.description}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full sm:w-auto">
            <Link href={`/${locale}/catalogo`} className="w-full sm:w-auto">
              <Button size="lg" variant="primary" className="h-14 px-12 rounded-full w-full shadow-2xl shadow-primary/20">
                {t.button} <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <div className="flex items-center gap-2 text-label-sm text-text-faint">
              <ShieldCheck className="w-4 h-4 text-success" />
              <span className="tracking-wide font-medium">{t.guarantee}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
