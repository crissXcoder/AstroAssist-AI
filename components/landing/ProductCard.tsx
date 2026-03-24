"use client";

import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useTranslations } from "@/components/i18n-provider";

interface Product {
  id: string | number;
  name: string;
  description: string;
  price: string;
  tags: string[];
  image: string;
}

export function ProductCard({ product, index }: { product: Product; index: number }) {
  const tContext = useTranslations();
  const t = tContext.catalog_page.products[product.id as keyof typeof tContext.catalog_page.products];
  
  const name = t?.name || product.name;
  const description = t?.description || product.description;
  const tags = t?.tags || product.tags;

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseY = useSpring(y, { stiffness: 300, damping: 30 });

  function onMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const xPos = clientX - left;
    const yPos = clientY - top;
    x.set(xPos - width / 2);
    y.set(yPos - height / 2);
  }

  function onMouseLeave() {
    x.set(0);
    y.set(0);
  }

  // Tilt effect calculations (-10deg to 10deg max tilt)
  const rotateX = useTransform(mouseY, [-200, 200], [10, -10]);
  const rotateY = useTransform(mouseX, [-200, 200], [-10, 10]);

  // Glare effect follows mouse directly using percentage positioning internally via useMotionTemplate
  const background = useMotionTemplate`radial-gradient(350px circle at ${mouseX}px ${mouseY}px, rgba(147, 51, 234, 0.15), transparent 80%)`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: 1000 }}
      className="h-full"
    >
      <motion.div
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative flex flex-col h-full rounded-4xl glass border border-border/50 dark:border-white/5 bg-secondary/30 dark:bg-background/30 backdrop-blur-2xl overflow-hidden group hover:shadow-[0_20px_50px_rgba(var(--primary),0.05)] dark:hover:shadow-[0_20px_50px_rgba(var(--primary),0.15)] hover:border-border dark:hover:border-white/15 transition-shadow duration-500 will-change-transform"
      >
        {/* Dynamic glare effect overlay */}
        <motion.div
          className="pointer-events-none absolute -inset-px z-30 transition-opacity duration-300 opacity-0 group-hover:opacity-100 mix-blend-screen rounded-4xl overflow-hidden"
          style={{ background }}
        />

        {/* Top Image Section */}
        <div 
          className="relative w-full h-[300px] overflow-hidden bg-black"
          style={{ transform: "translateZ(40px)" }}
        >
          {/* Deep shadow masking the image bottoms out */}
          <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-background z-10" />
          
          <img 
            src={product.image} 
            alt={name} 
            className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000 ease-out mix-blend-screen"
          />
          
          {/* Tags floating over image */}
          <div className="absolute top-6 left-6 z-20 flex flex-wrap gap-2">
            {tags.map(tag => (
              <Badge key={tag} variant="glass" className="text-xs backdrop-blur-md bg-white/80 dark:bg-black/40 border-border dark:border-white/20 text-foreground dark:text-white shadow-xl px-3 py-1">
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* Content Section */}
        <div 
          className="flex flex-col flex-1 px-8 pb-8 pt-4 relative z-30"
          style={{ transform: "translateZ(50px)" }}
        >
          <h3 className="text-2xl font-black tracking-tight text-foreground group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-linear-to-r group-hover:from-white group-hover:to-primary transition-all duration-300">
            {name}
          </h3>
          
          <p className="mt-4 text-sm text-muted-foreground/80 leading-relaxed line-clamp-3 font-light">
            {description}
          </p>

          <div className="mt-auto pt-8 flex items-end justify-between">
            <span className="text-3xl font-black text-white font-mono tracking-tighter drop-shadow-[0_0_15px_rgba(var(--primary),0.5)]">
              {product.price}
            </span>
            
            <Button size="icon" className="h-[52px] w-[52px] rounded-2xl shadow-[0_0_20px_rgba(var(--primary),0.2)] group-hover:shadow-[0_0_30px_rgba(var(--primary),0.6)] transition-all bg-primary/20 text-primary border border-primary/50 hover:bg-primary hover:text-white group/btn relative overflow-hidden shrink-0 hover:scale-110">
               <div className="absolute inset-0 w-[200%] h-full bg-linear-to-r from-transparent via-black/5 dark:via-white/30 to-transparent -translate-x-[150%] skew-x-12 group-hover/btn:translate-x-full transition-transform duration-700" />
               <ShoppingCart className="w-5 h-5 relative z-10" />
            </Button>
          </div>
          
          {/* Subtle bottom border glow sweep */}
          <div className="absolute bottom-0 left-0 w-full h-[2px] bg-linear-to-r from-transparent via-primary to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-center" />
        </div>
      </motion.div>
    </motion.div>
  );
}
