"use client";

import { SectionContainer } from "@/components/ui/section";
import { Bot, ShieldCheck, Truck, Shield } from "lucide-react"; // Replaced Rocket/Zap with more grounded icons
import { motion } from "framer-motion";
import { STAGGER_CONTAINER, FADE_IN_UP } from "@/lib/motion";
import { useTranslations } from "@/components/i18n-provider";

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
    <SectionContainer delay={0.1} className="py-24 md:py-32 border-y border-border/40 relative bg-background">
      <div className="container px-4 md:px-6 mx-auto relative z-10">
        <motion.div 
          variants={STAGGER_CONTAINER}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-border/50 border-y border-border/50"
        >
          {features.map((feature, idx) => (
            <motion.div 
              key={idx} 
              variants={FADE_IN_UP} 
              className="flex flex-col items-start p-8 md:p-10 space-y-4 group bg-accent/5 hover:bg-accent/10 transition-colors"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-border/50 bg-background/50 mb-2">
                {feature.icon}
              </div>
              <h3 className="text-lg md:text-xl font-medium tracking-tight text-foreground">{feature.title}</h3>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed font-light">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </SectionContainer>
  );
}
