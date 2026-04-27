"use client";

import { SectionContainer, SectionHeader } from "@/shared/components/ui/section";
import { Badge } from "@/shared/components/ui/badge";
import { Card } from "@/shared/components/ui/card";
import { Bot, ShieldCheck, Truck, Shield } from "lucide-react"; // Replaced Rocket/Zap with more grounded icons
import { motion } from "framer-motion";
import { STAGGER_CONTAINER, FADE_IN_UP } from "@/shared/utils/motion";
import { useTranslations } from "@/shared/providers/i18n-provider";

export function Benefits() {
  const t = useTranslations().benefits;
  const features = [
    {
      icon: <Bot className="w-5 h-5 text-neutral-400" />,
      title: t.items[0].title,
      description: t.items[0].description
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-neutral-400" />,
      title: t.items[1].title,
      description: t.items[1].description
    },
    {
      icon: <Truck className="w-5 h-5 text-neutral-400" />,
      title: t.items[2].title,
      description: t.items[2].description
    },
    {
      icon: <Shield className="w-5 h-5 text-neutral-400" />,
      title: t.items[3].title,
      description: t.items[3].description
    }
  ];

  return (
    <SectionContainer 
      id="benefits" 
      delay={0.1} 
      className="py-24 md:py-32 border-y border-white/5 relative bg-surface-container-low"
    >
      <SectionHeader 
        badgeText={t.badge}
        titleNode={
          <>
            {t.title_part1} <br className="md:hidden" />
            <span className="text-primary">{t.title_part2}</span>
          </>
        }
        description={t.description}
        titleClassName="md:text-headline-xl"
      />
      
      <motion.div 
        variants={STAGGER_CONTAINER}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-white/5 border-y border-white/5"
      >
        {features.map((feature, idx) => (
          <motion.div key={idx} variants={FADE_IN_UP}>
            <Card variant="feature" className="h-full">
              <div className="flex items-center justify-center w-12 h-12 rounded-full border border-primary/20 bg-primary/5 mb-2 transition-transform group-hover/card:scale-110">
                <div className="text-primary">
                  {feature.icon}
                </div>
              </div>
              <h3 className="text-title-md font-semibold tracking-tight text-text-main">{feature.title}</h3>
              <p className="text-body-sm text-text-soft leading-relaxed font-normal">
                {feature.description}
              </p>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </SectionContainer>
  );
}
