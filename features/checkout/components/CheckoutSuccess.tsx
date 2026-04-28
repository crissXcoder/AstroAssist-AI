"use client";

import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight, Telescope, Mail, Sparkles, Share2 } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Card } from "@/shared/components/ui/card";
import Link from "next/link";
import { useLocale, useTranslations } from "@/shared/providers/i18n-provider";

/**
 * CheckoutSuccess Component
 * 
 * Displayed after a successful order placement.
 * Features immersive animations, celebratory visuals, and localized information.
 */
export function CheckoutSuccess() {
  const locale = useLocale();
  const t = useTranslations();
  
  // Simulated Order ID for display purposes
  const orderId = `ASTRO-${Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}`;

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-3xl mx-auto text-center"
    >
      <Card className="p-10 md:p-16 bg-surface-container/40 border-primary/20 backdrop-blur-3xl shadow-2xl shadow-primary/5 overflow-hidden relative group">
        {/* Animated background elements for cosmic feel */}
        <div className="absolute -top-32 -left-32 w-80 h-80 bg-primary/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-secondary/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[url('/stars.png')] opacity-10 pointer-events-none" />
        
        <div className="relative z-10">
          {/* Success Icon with layered animation */}
          <motion.div
            initial={{ scale: 0, rotate: -45 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", damping: 15, stiffness: 200, delay: 0.3 }}
            className="w-24 h-24 rounded-3xl bg-success/10 border border-success/30 flex items-center justify-center mx-auto mb-10 shadow-[0_0_50px_rgba(16,185,129,0.2)] relative"
          >
            <CheckCircle2 size={48} className="text-success" />
            <motion.div 
              animate={{ opacity: [0, 1, 0], scale: [1, 1.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 rounded-3xl border-2 border-success/20"
            />
          </motion.div>

          {/* Headline and Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h2 className="text-headline-lg md:text-headline-xl font-bold text-text-main mb-6 tracking-tight text-glow">
              {t.checkout.success}
            </h2>
            <p className="text-body-lg text-text-soft mb-12 max-w-lg mx-auto leading-relaxed">
              {t.checkout.success_desc}
            </p>
          </motion.div>

          {/* Next Steps Grid */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12"
          >
            <div className="p-8 rounded-3xl bg-surface-bright/10 border border-outline/5 text-left hover:border-primary/20 transition-all group/step">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20 group-hover/step:scale-110 transition-transform">
                  <Telescope size={24} className="text-primary" />
                </div>
                <span className="text-label-sm uppercase font-bold tracking-[0.2em] text-primary">{t.checkout.next_steps}</span>
              </div>
              <p className="text-body-sm text-text-muted leading-relaxed">
                {t.checkout.next_steps_desc}
              </p>
            </div>
            
            <div className="p-8 rounded-3xl bg-surface-bright/10 border border-outline/5 text-left hover:border-secondary/20 transition-all group/step">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center border border-secondary/20 group-hover/step:scale-110 transition-transform">
                  <Mail size={24} className="text-secondary" />
                </div>
                <span className="text-label-sm uppercase font-bold tracking-[0.2em] text-secondary">{t.checkout.tracking}</span>
              </div>
              <p className="text-body-sm text-text-muted leading-relaxed">
                {t.checkout.tracking_desc}
              </p>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="flex flex-col sm:flex-row gap-5 justify-center"
          >
            <Button asChild size="lg" className="h-16 px-12 rounded-2xl bg-primary hover:bg-primary-hover shadow-2xl shadow-primary/20 group">
              <Link href={`/${locale}`} className="flex items-center gap-3">
                <span className="font-bold uppercase tracking-widest text-label-md">{t.checkout.back_home}</span>
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-16 px-12 rounded-2xl border-outline/10 bg-surface-bright/5 hover:bg-surface-bright/20 transition-all group">
              <Link href={`/${locale}/catalogo`} className="flex items-center gap-3">
                <Sparkles size={20} className="text-secondary group-hover:scale-110 transition-transform" />
                <span className="font-bold uppercase tracking-widest text-label-md">{t.checkout.continue_shopping}</span>
              </Link>
            </Button>
          </motion.div>
        </div>

        {/* Share Button (Aesthetic addition) */}
        <button className="absolute top-8 right-8 p-3 rounded-full bg-white/5 border border-white/10 text-text-faint hover:text-text-main hover:bg-white/10 transition-all">
          <Share2 size={20} />
        </button>
      </Card>
      
      {/* Order Identifier */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="mt-10 flex flex-col items-center gap-2"
      >
        <span className="text-text-faint text-[10px] uppercase tracking-[0.3em] font-bold">Protocol Identifier</span>
        <div className="px-6 py-2 rounded-full bg-surface-bright/10 border border-outline/5 backdrop-blur-sm shadow-inner">
          <span className="text-primary font-mono text-label-md font-bold">{orderId}</span>
        </div>
      </motion.div>
    </motion.div>
  );
}
