"use client";

import { SectionContainer } from "@/components/ui/section";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MessageSquareQuote } from "lucide-react";
import { motion } from "framer-motion";
import { STAGGER_CONTAINER, FADE_IN_UP } from "@/lib/motion";
import { Badge } from "@/components/ui/badge";
import { useTranslations } from "@/components/i18n-provider";

export function Testimonials() {
  const t = useTranslations().testimonials;
  const reviews = [
    {
      name: t.items[0].name,
      role: t.items[0].role,
      text: t.items[0].text,
      initials: t.items[0].initials
    },
    {
      name: t.items[1].name,
      role: t.items[1].role,
      text: t.items[1].text,
      initials: t.items[1].initials
    },
    {
      name: t.items[2].name,
      role: t.items[2].role,
      text: t.items[2].text,
      initials: t.items[2].initials
    }
  ];

  return (
    <SectionContainer delay={0.1} className="py-24 border-t border-border/50 dark:border-white/5 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,var(--tw-gradient-stops))] from-primary/5 via-background to-background pointer-events-none" />
      <div className="container px-4 md:px-6 mx-auto relative z-10">
        <div className="flex flex-col items-center justify-center space-y-6 text-center mb-24">
          <Badge variant="glass" className="bg-primary/5 border-primary/10 text-label-sm text-text-muted">
            <MessageSquareQuote className="w-4 h-4 mr-2" />
            {t.badge}
          </Badge>
          <h2 className="text-headline-lg md:text-headline-xl font-semibold tracking-tight text-text-main leading-[1.08]">
            {t.title_part1} <span className="text-primary">{t.title_part2}</span>
          </h2>
          <p className="max-w-[700px] text-text-soft md:text-body-lg font-light leading-relaxed mx-auto">
            {t.description}
          </p>
        </div>

        <motion.div 
          variants={STAGGER_CONTAINER} initial="initial" whileInView="animate" viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {reviews.map((review, i) => (
            <motion.div key={i} variants={FADE_IN_UP} className="h-full">
              <div className="relative h-full flex flex-col bg-surface-container border border-white/5 rounded-xl p-8 group hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 overflow-hidden">
                {/* Decorative inner glow */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                
                <div className="flex items-center gap-4 mb-6 relative z-10">
                  <Avatar className="w-12 h-12 border border-primary/20 bg-primary/5 ring-1 ring-primary/5 group-hover:scale-110 transition-transform duration-500 shadow-xl shadow-primary/5">
                    <AvatarFallback className="bg-transparent text-primary font-bold text-label-md">{review.initials}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <h4 className="text-title-md font-semibold text-text-main group-hover:text-primary transition-colors">{review.name}</h4>
                    <p className="text-label-sm text-primary uppercase tracking-widest font-bold">{review.role}</p>
                  </div>
                </div>

                <div className="relative z-10">
                  <p className="text-body-sm text-text-soft italic leading-relaxed font-light">
                    "{review.text}"
                  </p>
                </div>

                {/* Bottom accent */}
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-linear-to-r from-transparent via-primary/20 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-center" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </SectionContainer>
  );
}
