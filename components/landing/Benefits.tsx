"use client";

import { SectionContainer } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";
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
    <SectionContainer id="benefits" delay={0.1} className="py-24 md:py-32 border-y border-white/5 relative bg-surface-container-low">
      <div className="container px-4 md:px-6 mx-auto relative z-10">
        <div className="flex flex-col items-center justify-center space-y-6 text-center mb-24">
          <Badge variant="glass" className="bg-primary/5 border-primary/10 text-label-sm text-text-muted">
            {t.badge}
          </Badge>
          <h2 className="text-headline-lg md:text-headline-xl font-semibold tracking-tight text-text-main leading-[1.08]">
            {t.title_part1} <br className="md:hidden" />
            <span className="text-primary">
              {t.title_part2}
            </span>
          </h2>
          <p className="max-w-[600px] text-text-soft md:text-body-lg font-light leading-relaxed">
            {t.description}
          </p>
        </div>

        <motion.div 
          variants={STAGGER_CONTAINER}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-white/5 border-y border-white/5"
        >
          {features.map((feature, idx) => (
            <motion.div 
              key={idx} 
              variants={FADE_IN_UP} 
              className="flex flex-col items-start p-8 md:p-10 space-y-4 group bg-white/2 hover:bg-white/4 transition-colors"
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-full border border-primary/20 bg-primary/5 mb-2 transition-transform group-hover:scale-110">
                <div className="text-primary">
                  {feature.icon}
                </div>
              </div>
              <h3 className="text-title-md font-semibold tracking-tight text-text-main">{feature.title}</h3>
              <p className="text-body-sm text-text-soft leading-relaxed font-normal">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </SectionContainer>
  );
}
