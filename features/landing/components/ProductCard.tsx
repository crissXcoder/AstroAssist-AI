"use client";

import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { useTranslations, useLocale } from "@/shared/providers/i18n-provider";
import type { Product } from "@/features/catalog";
import { useCart } from "@/features/cart/hooks/useCart";

export function ProductCard({ product, index }: { product: Product; index: number }) {
  const { addItem } = useCart();
  const locale = useLocale();
  const name = locale === "en" ? product.nameEn : product.nameEs;
  const description = locale === "en" ? product.descriptionEn : product.descriptionEs;
  const tags = product.tags.slice(0, 2);

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

  const rotateX = useTransform(mouseY, [-200, 200], [10, -10]);
  const rotateY = useTransform(mouseX, [-200, 200], [-10, 10]);
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
        className="relative flex flex-col h-full rounded-xl bg-surface-container-low border border-white/5 backdrop-blur-3xl overflow-hidden group hover:shadow-2xl hover:shadow-primary/10 hover:border-white/15 transition-all duration-500 will-change-transform"
      >
        {/* Dynamic glare effect overlay */}
        <motion.div
          className="pointer-events-none absolute -inset-px z-30 transition-opacity duration-300 opacity-0 group-hover:opacity-100 mix-blend-screen rounded-xl overflow-hidden"
          style={{ background }}
        />

        {/* Top Image Section */}
        <div
          className="relative w-full h-[300px] overflow-hidden bg-background"
          style={{ transform: "translateZ(40px)" }}
        >
          <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-background z-10" />

          <Image
            src={product.images.primary}
            alt={name}
            fill
            priority={index < 3}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000 ease-out mix-blend-screen"
          />

          {/* Tags floating over image */}
          <div className="absolute top-6 left-6 z-20 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge key={tag} variant="glass" className="bg-surface-container-highest/80 border-white/10 text-text-main px-3 py-1 text-label-sm">
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
          <h3 className="text-title-lg font-semibold tracking-tight text-text-main group-hover:text-primary transition-all duration-300">
            {name}
          </h3>

          <p className="mt-4 text-body-sm text-text-soft leading-relaxed line-clamp-3 font-normal">
            {description}
          </p>

          <div className="mt-auto pt-8 flex items-end justify-between">
            <span className="text-display-md font-bold text-text-main font-mono tracking-tighter">
              {product.price}
            </span>

            <Button 
              size="icon" 
              variant="primary" 
              className="h-12 w-12 rounded-xl group-hover:scale-110 transition-transform active:scale-95"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                addItem(product);
              }}
            >
              <ShoppingCart className="w-5 h-5" />
            </Button>
          </div>

          {/* Subtle bottom border glow sweep */}
          <div className="absolute bottom-0 left-0 w-full h-[2px] bg-linear-to-r from-transparent via-primary to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-center" />
        </div>
      </motion.div>
    </motion.div>
  );
}
