"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Orbit, Zap, Globe, ArrowRight } from "lucide-react";
import { SectionContainer } from "@/components/ui/section";
import { useTranslations } from "@/components/i18n-provider";

export function CosmicInsights() {
  const t = useTranslations().insights;
  const [activeItem, setActiveItem] = useState(1);

  const insights = [
    {
      id: 1,
      title: t.items[0].title,
      subtitle: t.items[0].subtitle,
      description: t.items[0].description,
      image: "https://imgs.search.brave.com/E4y87XYXy2oOzWR5fuZ-nUwdivjazrB-lLIru3-NKl4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnJl/ZGQuaXQvMTl5Z2F0/ZWtzdzc4MS5qcGc",
      icon: <Sparkles className="w-5 h-5 text-indigo-400" />
    },
    {
      id: 2,
      title: t.items[1].title,
      subtitle: t.items[1].subtitle,
      description: t.items[1].description,
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop",
      icon: <Zap className="w-5 h-5 text-purple-400" />
    },
    {
      id: 3,
      title: t.items[2].title,
      subtitle: t.items[2].subtitle,
      description: t.items[2].description,
      image: "https://imgs.search.brave.com/AkeNCGchre1T-GwH5th_aOVSXX1oHKyFw2XZjMTHyxQ/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5lcy53aXJlZC5j/b20vcGhvdG9zLzY2/YzM4NDJiOTU4MTUy/MTI0MjhkMWEwNy8x/Njo5L3dfNjQwLGNf/bGltaXQvR2V0dHlJ/bWFnZXMtMTE1NTI2/NjA1Ny5qcGc",
      icon: <Orbit className="w-5 h-5 text-amber-400" />
    },
    {
      id: 4,
      title: t.items[3].title,
      subtitle: t.items[3].subtitle,
      description: t.items[3].description,
      image: "https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?q=80&w=1200&auto=format&fit=crop",
      icon: <Globe className="w-5 h-5 text-cyan-400" />
    }
  ];

  return (
    <SectionContainer delay={0.2} className="py-24 md:py-32 relative overflow-hidden">
      {/* Cinematic Fog & Gradients */}
      <div className="absolute top-0 right-0 w-[60vw] h-[60vw] max-w-[800px] bg-[radial-gradient(circle_at_top_right,rgba(168,85,247,0.05),transparent_50%)] pointer-events-none blur-[100px]" />
      <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] max-w-[600px] bg-[radial-gradient(circle_at_bottom_left,rgba(99,102,241,0.03),transparent_50%)] pointer-events-none blur-[100px]" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        {/* Minimalist Header */}
        <div className="flex flex-col items-center sm:items-start text-center sm:text-left mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/30 dark:bg-white/2 border border-border/50 dark:border-white/5 w-fit mb-6 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span className="text-[10px] font-medium tracking-[0.25em] uppercase text-neutral-400">{t.badge}</span>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between w-full gap-8">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-[-0.03em] text-white leading-[1.1] max-w-xl">
              {t.title_part1} <br className="hidden md:block"/>
              <span className="text-neutral-600">{t.title_part2}</span>
            </h2>
            <p className="max-w-[700px] text-neutral-600 dark:text-neutral-400 md:text-xl font-light leading-relaxed mb-12">
              {t.description}
            </p>
          </div>
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
                className={`relative rounded-4xl overflow-hidden cursor-pointer group bg-background border ${isActive ? 'border-primary/50 dark:border-white/8 shadow-[0_30px_60px_rgba(0,0,0,0.1)] dark:shadow-[0_30px_60px_rgba(0,0,0,0.6)] z-10' : 'border-border/50 dark:border-white/2 z-0'} transition-all duration-700 will-change-transform`}
              >
                {/* Background Image Parallax layer */}
                <motion.div 
                  className="absolute inset-0 z-0"
                  animate={{ 
                    scale: isActive ? 1.05 : 1,
                    filter: isActive ? "grayscale(0%)" : "grayscale(80%)",
                    opacity: isActive ? 0.7 : 0.2
                  }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                >
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover mix-blend-screen"
                  />
                  {/* Aggressive gradient masking for premium storytelling depth */}
                  <div className={`absolute inset-0 bg-linear-to-t transition-opacity duration-1000 ${isActive ? 'from-[#0A0D14] via-[#0A0D14]/40 to-transparent opacity-100' : 'from-[#0A0D14] via-[#0A0D14]/80 to-[#0A0D14]/40 opacity-100'}`} />
                </motion.div>

                {/* Content Overlay */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 lg:p-10 z-10 pointer-events-none">
                  
                  {/* Minimal Absolute Floating Icon */}
                  <div className={`absolute top-6 right-6 lg:top-8 lg:right-8 w-10 h-10 rounded-full border bg-white/80 dark:bg-black/20 backdrop-blur-xl flex items-center justify-center transition-all duration-700 overflow-hidden shrink-0 ${isActive ? 'border-border/50 dark:border-white/10 opacity-100 scale-100' : 'border-transparent opacity-0 scale-75'}`}>
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
                    <span className="text-sm font-medium tracking-widest text-neutral-400 whitespace-nowrap uppercase">{item.title}</span>
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
                        <h4 className="text-[10px] uppercase tracking-[0.25em] text-neutral-400 font-medium mb-2">{item.subtitle}</h4>
                        <p className="text-secondary-foreground dark:text-white text-3xl font-black tracking-widest whitespace-nowrap">{`0${item.id}`}</p>
                        <h3 className="text-3xl md:text-5xl font-medium tracking-[-0.02em] text-white mb-4">
                          {item.title}
                        </h3>
                        <p className="text-sm text-neutral-400 font-light leading-relaxed hidden sm:block tracking-wide">
                          {item.description}
                        </p>
                        
                        <div className="mt-6 flex items-center gap-2 text-[11px] font-medium tracking-widest uppercase text-foreground dark:text-white group/btn w-fit pointer-events-auto cursor-pointer border-b border-transparent hover:border-black/30 dark:hover:border-white/30 pb-1 transition-all duration-300">
                          {t.explore} <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
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
