"use client";

import { motion, Variants } from "framer-motion";
import { useTranslations } from "@/shared/providers/i18n-provider";
import { Star, Quote, Sparkles } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Alex Rivera",
    role: "Astro-Photographer",
    quote: "The AI recommendation engine found exactly the mount I needed for my specific telescope. Incredible precision.",
    stars: 5,
    avatar: "https://i.pravatar.cc/150?u=alex"
  },
  {
    id: 2,
    name: "Sarah Chen",
    role: "Deep Space Observer",
    quote: "AstroAssist turned a complex gear upgrade into a seamless 5-minute process. The best tool in the hobby.",
    stars: 5,
    avatar: "https://i.pravatar.cc/150?u=sarah"
  },
  {
    id: 3,
    name: "Marcus Thorne",
    role: "Planetary Specialist",
    quote: "Finally, a platform that understands that every astrophotographer has unique needs. Premium experience.",
    stars: 5,
    avatar: "https://i.pravatar.cc/150?u=marcus"
  }
];

export function Testimonials() {
  const t = useTranslations();

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="py-32 relative overflow-hidden">
      {/* Decorative blurred orbit */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] aspect-square border border-white/5 rounded-full pointer-events-none -rotate-12" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] aspect-square border border-white/5 rounded-full pointer-events-none rotate-12" />

      <div className="container px-6 mx-auto relative z-10">
        <div className="flex flex-col items-center text-center mb-20 space-y-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-[0.3em] mb-4"
          >
            <Sparkles className="w-3 h-3" />
            <span>{t.testimonials.badge}</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-text-main tracking-tight">
            {t.testimonials.title_part1} <span className="text-primary">{t.testimonials.title_part2}</span>
          </h2>
          <p className="text-text-soft text-lg max-w-2xl">
            {t.testimonials.description}
          </p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial) => (
            <motion.div 
              key={testimonial.id}
              variants={itemVariants}
              className="group relative p-8 rounded-[2.5rem] bg-surface-container/30 border border-white/5 backdrop-blur-xl hover:bg-surface-container/50 transition-all duration-500"
            >
              <Quote className="absolute top-8 right-8 w-10 h-10 text-primary/10 group-hover:text-primary/20 transition-colors" />
              
              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.stars)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-secondary text-secondary" />
                ))}
              </div>

              <p className="text-cosmic-200 italic mb-10 leading-relaxed text-lg">&quot;{testimonial.quote}&quot;</p>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary/20 group-hover:border-primary transition-colors">
                  <img src={testimonial.avatar} alt={testimonial.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="text-text-main font-bold text-sm tracking-tight">{testimonial.name}</h4>
                  <p className="text-primary text-[11px] uppercase font-black tracking-widest">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
