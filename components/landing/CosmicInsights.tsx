"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Orbit, Zap, Globe, ArrowRight } from "lucide-react";
import { SectionContainer } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";
import { useTranslations } from "@/components/i18n-provider";
import images from "@/lib/images.json";

export function CosmicInsights() {
  const t = useTranslations().insights;
  const [activeItem, setActiveItem] = useState(1);

  const insights = [
    {
      id: 1,
      title: t.items[0].title,
      subtitle: t.items[0].subtitle,
      description: t.items[0].description,
      image: images.insights.item1,
      icon: <Sparkles className="w-5 h-5 text-indigo-400" />
    },
    {
      id: 2,
      title: t.items[1].title,
      subtitle: t.items[1].subtitle,
      description: t.items[1].description,
      image: images.insights.item2,
      icon: <Zap className="w-5 h-5 text-purple-400" />
    },
    {
      id: 3,
      title: t.items[2].title,
      subtitle: t.items[2].subtitle,
      description: t.items[2].description,
      image: images.insights.item3,
      icon: <Orbit className="w-5 h-5 text-amber-400" />
    },
    {
      id: 4,
      title: t.items[3].title,
      subtitle: t.items[3].subtitle,
      description: t.items[3].description,
      image: images.insights.item4,
      icon: <Globe className="w-5 h-5 text-cyan-400" />
    }
  ];

  return (
    <SectionContainer delay={0.2} className="py-24 md:py-32 relative overflow-hidden bg-surface-container-lowest">
      {/* Cinematic Fog & Gradients */}
      <div className="absolute top-0 right-0 w-[60vw] h-[60vw] max-w-[800px] bg-[radial-gradient(circle_at_top_right,rgba(168,85,247,0.03),transparent_50%)] pointer-events-none blur-[100px]" />
      <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] max-w-[600px] bg-[radial-gradient(circle_at_bottom_left,rgba(98,87,244,0.02),transparent_50%)] pointer-events-none blur-[100px]" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        {/* Minimalist Header */}
        <div className="flex flex-col items-center justify-center space-y-6 text-center mb-24">
          <Badge variant="glass" className="bg-primary/5 border-primary/10 text-label-sm text-text-muted">
            <Sparkles className="w-3.5 h-3.5 text-primary mr-2" />
            {t.badge}
          </Badge>
          <h2 className="text-headline-lg lg:text-headline-xl font-semibold tracking-tight text-text-main leading-[1.08] max-w-3xl mx-auto">
            {t.title_part1} <br className="hidden md:block"/>
            <span className="text-primary">{t.title_part2}</span>
          </h2>
          <p className="max-w-[700px] text-text-soft md:text-body-lg font-light leading-relaxed mx-auto">
            {t.description}
          </p>
        </div>

        {/* Hyper-fluid Bento Expansion Array */}
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-5 h-[65vh] min-h-[450px] max-h-[600px] w-full">
          {insights.map((item) => {
            const isActive = activeItem === item.id;
            return (
              <motion.div
                key={item.id}
                layout
                onClick={() => setActiveItem(item.id)}
                onHoverStart={() => setActiveItem(item.id)}
                animate={{
                  flex: isActive ? 5 : 1,
                  opacity: 1,
                }}
                transition={{ 
                  flex: { type: "spring", stiffness: 180, damping: 25, mass: 0.8 },
                }}
                className={`relative rounded-2xl overflow-hidden cursor-pointer group bg-surface-container border ${isActive ? 'border-primary/30 shadow-2xl shadow-primary/5 z-10' : 'border-white/5 z-0'} transition-all duration-700 will-change-transform`}
              >
                {/* Background Image Parallax layer */}
                <motion.div 
                  className="absolute inset-0 z-0"
                  animate={{ 
                    scale: isActive ? 1.05 : 1,
                    filter: isActive ? "grayscale(0%)" : "grayscale(80%)",
                    opacity: isActive ? 0.8 : 0.3
                  }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                >
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover mix-blend-screen"
                  />
                  {/* Aggressive gradient masking for premium storytelling depth */}
                  <div className={`absolute inset-0 bg-linear-to-t transition-opacity duration-1000 ${isActive ? 'from-background via-background/40 to-transparent opacity-100' : 'from-background via-background/80 to-background/40 opacity-100'}`} />
                </motion.div>

                {/* Content Overlay */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 lg:p-10 z-10 pointer-events-none">
                  
                  {/* Minimal Absolute Floating Icon */}
                  <div className={`absolute top-6 right-6 lg:top-8 lg:right-8 w-12 h-12 rounded-full border bg-surface-container-highest/80 backdrop-blur-3xl flex items-center justify-center transition-all duration-700 overflow-hidden shrink-0 ${isActive ? 'border-primary/20 opacity-100 scale-100' : 'border-transparent opacity-0 scale-75'}`}>
                    {item.icon}
                  </div>

                  {/* Vertical Collapsed Typography */}
                  <motion.div 
                    initial={false}
                    animate={{ opacity: isActive ? 0 : 1, y: isActive ? 20 : 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="absolute bottom-8 left-6 right-6 lg:left-1/2 lg:-translate-x-1/2 lg:w-max lg:bottom-1/2 lg:translate-y-1/2 lg:-rotate-90 origin-center text-center lg:text-left flex items-center justify-center lg:justify-start"
                    style={{ pointerEvents: isActive ? 'none' : 'auto' }}
                  >
                    <span className="text-label-md tracking-widest text-text-muted whitespace-nowrap uppercase">{item.title}</span>
                  </motion.div>

                  {/* Expanded Narrative Payload */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, y: 40, filter: "blur(5px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        exit={{ opacity: 0, y: 10, filter: "blur(2px)" }}
                        transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                        className="flex flex-col gap-1 max-w-[400px]"
                      >
                        <h4 className="text-label-sm uppercase text-text-faint font-medium mb-2">{item.subtitle}</h4>
                        <p className="text-primary text-display-md font-bold tracking-tighter">{`0${item.id}`}</p>
                        <h3 className="text-headline-md md:text-headline-lg font-semibold tracking-tight text-text-main mb-4">
                          {item.title}
                        </h3>
                        <p className="text-body-sm text-text-soft font-normal leading-relaxed hidden sm:block">
                          {item.description}
                        </p>
                        
                        <div className="mt-6 flex items-center gap-2 text-label-md text-text-main group/btn w-fit pointer-events-auto cursor-pointer border-b border-white/5 hover:border-white/20 pb-1 transition-all duration-300">
                          {t.explore} <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </SectionContainer>
  );
}
