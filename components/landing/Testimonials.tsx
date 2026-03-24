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
        <motion.div 
          className="flex flex-col items-center justify-center space-y-5 text-center mb-20"
          initial="initial" whileInView="animate" viewport={{ once: true, margin: "-50px" }} variants={FADE_IN_UP}
        >
          <MessageSquareQuote className="w-10 h-10 text-primary opacity-80 mb-2 drop-shadow-[0_0_15px_rgba(var(--primary),0.5)]" />
          <Badge variant="glass" className="mb-4 bg-secondary/50 dark:bg-background/20 backdrop-blur-md">{t.badge}</Badge>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tighter">{t.title_part1} <span className="text-glow text-transparent bg-clip-text bg-linear-to-r from-primary to-blue-400">{t.title_part2}</span></h2>
          <p className="max-w-[700px] text-neutral-600 dark:text-neutral-400 md:text-xl font-light leading-relaxed">
            {t.description}
          </p>
        </motion.div>

        <motion.div 
          variants={STAGGER_CONTAINER} initial="initial" whileInView="animate" viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {reviews.map((review, i) => (
              <motion.div key={i} variants={FADE_IN_UP} className="h-full">
                <div className="relative h-full rounded-3xl p-px group overflow-hidden">
                  {/* CSS Magic: Conic Gradient Rotating Border */}
                 <div className="absolute inset-0 bg-[conic-gradient(from_0deg_at_50%_50%,rgba(var(--primary),0)_0%,rgba(var(--primary),1)_20%,rgba(var(--primary),0)_40%)] opacity-0 group-hover:opacity-100 group-hover:animate-[spin_3s_linear_infinite] transition-opacity duration-700 w-[250%] h-[250%] -top-[75%] -left-[75%] pointer-events-none" />
                 
                 {/* Internal Mask - Must have higher z-index than the rotating gradient */}
                 <Card className="relative h-full bg-card/60 dark:bg-card/80 backdrop-blur-2xl border-border/50 dark:border-white/10 rounded-[calc(1.5rem-1px)] transition-all duration-500 overflow-hidden flex flex-col z-10">
                   {/* Dark subtle background glow inside the card on hover */}
                   <div className="absolute inset-0 bg-linear-to-b from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                   
                   <CardHeader className="flex flex-row items-center gap-4 pb-4 pt-6 px-6 relative z-20">
                     <Avatar className="w-12 h-12 border border-primary/30 bg-primary/10 group-hover:scale-110 transition-transform duration-500 shrink-0 shadow-[0_0_15px_rgba(var(--primary),0.2)]">
                       <AvatarFallback className="bg-transparent text-primary font-black tracking-tight">{review.initials}</AvatarFallback>
                     </Avatar>
                     <div className="flex flex-col gap-0.5">
                       <h4 className="font-bold text-lg text-foreground tracking-tight leading-none group-hover:text-glow transition-all">{review.name}</h4>
                       <p className="text-xs text-primary/80 font-medium tracking-wide uppercase">{review.role}</p>
                     </div>
                   </CardHeader>
                   <CardContent className="px-6 pb-8 text-muted-foreground/90 text-sm italic leading-relaxed font-light relative z-20">
                     "{review.text}"
                   </CardContent>
                 </Card>
               </div>
             </motion.div>
          ))}
        </motion.div>
      </div>
    </SectionContainer>
  );
}
