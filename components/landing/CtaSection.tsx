"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Telescope, ShieldCheck, Zap, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useTranslations, useLocale } from "@/components/i18n-provider";

export function CtaSection() {
  const t = useTranslations().cta;
  const locale = useLocale();
  return (
    <section className="relative w-full py-24 md:py-32 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[800px] bg-[radial-gradient(circle,rgba(99,102,241,0.06),transparent_60%)] rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-4xl overflow-hidden border border-border/50 dark:border-white/5 bg-secondary/30 dark:bg-white/2 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.4)]"
        >
          {/* Internal gradient sweep */}
          <div className="absolute inset-0 bg-linear-to-br from-indigo-500/5 via-transparent to-purple-500/5 opacity-50 pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 relative z-10">
            {/* Left Content (Text & Typography) */}
            <div className="p-10 md:p-16 lg:p-20 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/50 dark:bg-white/3 border border-border/50 dark:border-white/5 w-fit mb-8 shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-primary" />
                <span className="text-[10px] sm:text-[11px] font-medium tracking-[0.2em] uppercase text-neutral-300">{t.badge}</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight md:tracking-[-0.03em] text-white leading-[1.05] mb-6">
                {t.title_part1} <br className="hidden lg:block"/>
                <span className="text-neutral-500">{t.title_part2}</span>
              </h2>
              
              <p className="text-lg text-neutral-600 dark:text-neutral-400 font-light leading-relaxed max-w-xl mb-10">
                {t.description}
              </p>
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                <Link href={`/${locale}/catalogo`}>
                  <Button size="lg" className="h-12 px-8 rounded-full bg-white text-black hover:bg-neutral-200 transition-colors w-full sm:w-auto text-sm font-medium shadow-[0_0_30px_rgba(255,255,255,0.15)] group">
                    {t.button} <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <div className="flex items-center gap-2 text-xs text-neutral-500">
                  <ShieldCheck className="w-4 h-4 text-emerald-500/70" />
                  <span className="tracking-wide">{t.guarantee}</span>
                </div>
              </div>
            </div>

            {/* Right Visual Ecosystem (Cinematic Image + Floating UI) */}
            <div className="relative min-h-[400px] lg:min-h-full overflow-hidden border-t lg:border-t-0 lg:border-l border-white/5 bg-background/30">
               {/* Astrophotography background slice */}
               <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=1200&auto=format&fit=crop')] bg-cover bg-center mix-blend-screen opacity-50 scale-105" />
               <div className="absolute inset-0 bg-linear-to-r from-[#0A0D14] via-[#0A0D14]/70 to-transparent opacity-90 hidden lg:block" />
               <div className="absolute inset-0 bg-linear-to-t from-[#0A0D14] via-[#0A0D14]/70 to-transparent opacity-90 block lg:hidden" />
               
               {/* Floating UI Elements indicating purchase / AI sync */}
               <div className="absolute inset-0 flex items-center justify-center p-8">
                 <motion.div 
                   animate={{ y: [-8, 8, -8] }}
                   transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
                   className="relative w-full max-w-[300px] rounded-2xl border border-border/50 dark:border-white/10 bg-background/80 dark:bg-background/70 backdrop-blur-2xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                 >
                   <div className="flex items-center justify-between mb-8">
                     <div className="w-10 h-10 rounded-full bg-secondary dark:bg-white/5 flex items-center justify-center border border-border/50 dark:border-white/10">
                       <Camera className="w-5 h-5 text-primary" />
                     </div>
                     <span className="text-[10px] font-medium text-emerald-400 bg-emerald-400/10 px-2.5 py-1 rounded-full border border-emerald-400/20 tracking-wider">{t.status_ready}</span>
                   </div>
                   
                   <div className="space-y-4 mb-2">
                     <div className="h-1.5 w-full bg-black/10 dark:bg-white/10 rounded-full overflow-hidden">
                       <motion.div 
                         className="h-full bg-indigo-500 rounded-full" 
                         initial={{ width: "0%" }}
                         whileInView={{ width: "100%" }}
                         transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
                       />
                     </div>
                     <div className="h-1.5 w-4/5 bg-black/5 dark:bg-white/5 rounded-full" />
                     <div className="h-1.5 w-2/3 bg-black/5 dark:bg-white/5 rounded-full" />
                   </div>
                   
                   <div className="mt-8 pt-6 border-t border-border/50 dark:border-white/5 flex items-center justify-between">
                     <span className="text-xs font-semibold text-neutral-200">{t.status_link}</span>
                     <span className="text-[10px] font-light text-neutral-500">{t.status_stab}</span>
                   </div>
                 </motion.div>
               </div>

            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
