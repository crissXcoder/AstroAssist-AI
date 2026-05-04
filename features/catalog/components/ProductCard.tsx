"use client";

import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { ShoppingCart, ArrowRight, Zap } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { useCart } from "@/features/cart";
import Link from "next/link";
import type { Product, RecommendedLevel, ObservationType, SkyCondition } from "@/features/catalog";

// ─────────────────────────────────────────────────────────────────────────────
// Badge color maps
// ─────────────────────────────────────────────────────────────────────────────

const levelColors: Record<RecommendedLevel, string> = {
  beginner: "bg-success-container/30 text-on-success-container border-success-container/40",
  intermediate: "bg-warning-container/30 text-on-warning-container border-warning-container/40",
  advanced: "bg-error-container/30 text-on-error-container border-error-container/40",
};

const goalLabels: Record<ObservationType, Record<"en" | "es", string>> = {
  planetary: { en: "Planets", es: "Planetas" },
  deep_sky: { en: "Deep Sky", es: "Cielo Profundo" },
  astrophotography: { en: "Astrophotography", es: "Astrofotografía" },
  general: { en: "General", es: "General" },
};

const skyHints: Record<SkyCondition, Record<"en" | "es", string>> = {
  city: { en: "Great for city skies", es: "Ideal para cielos urbanos" },
  suburban: { en: "Works in suburban skies", es: "Funciona en suburbios" },
  dark_sky: { en: "Best at dark sites", es: "Mejor en cielo oscuro" },
};

const levelLabels: Record<RecommendedLevel, Record<"en" | "es", string>> = {
  beginner: { en: "Beginner", es: "Principiante" },
  intermediate: { en: "Intermediate", es: "Intermedio" },
  advanced: { en: "Advanced", es: "Avanzado" },
};

// ─────────────────────────────────────────────────────────────────────────────
// ProductCard
// ─────────────────────────────────────────────────────────────────────────────

interface CatalogProductCardProps {
  product: Product;
  index: number;
  locale: "en" | "es";
  isHighlighted?: boolean;
}

export function CatalogProductCard({
  product,
  index,
  locale,
  isHighlighted = false,
}: CatalogProductCardProps) {
  const name = locale === "en" ? product.nameEn : product.nameEs;
  const description = locale === "en" ? product.descriptionEn : product.descriptionEs;

  const { addItem, setOpen } = useCart();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseY = useSpring(y, { stiffness: 300, damping: 30 });

  function onMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    x.set(clientX - left - width / 2);
    y.set(clientY - top - height / 2);
  }
  function onMouseLeave() {
    x.set(0);
    y.set(0);
  }

  const rotateX = useTransform(mouseY, [-200, 200], [8, -8]);
  const rotateY = useTransform(mouseX, [-200, 200], [-8, 8]);
  const glare = useMotionTemplate`radial-gradient(300px circle at ${mouseX}px ${mouseY}px, rgba(98,87,244,0.12), transparent 80%)`;

  const compatibleCount = product.compatibility.length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: 1000 }}
      className="h-full"
    >
      <motion.div
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className={`relative flex flex-col h-full rounded-xl border bg-surface-container-low overflow-hidden group transition-all duration-500 will-change-transform ${
          isHighlighted
            ? "border-primary/40 shadow-[0_0_30px_rgba(98,87,244,0.15)]"
            : "border-white/5 hover:border-white/10 hover:shadow-2xl hover:shadow-primary/10"
        }`}
      >
        <Link href={`/${locale}/catalogo/${product.id}`} className="absolute inset-0 z-40" aria-label={`View ${name}`} />
        {/* Glare */}
        <motion.div
          className="pointer-events-none absolute -inset-px z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 mix-blend-screen rounded-xl overflow-hidden"
          style={{ background: glare }}
        />

        {/* Image */}
        <div
          className="relative w-full h-[220px] overflow-hidden bg-surface-container-lowest"
          style={{ transform: "translateZ(20px)" }}
        >
          <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-surface-container-low z-10" />
          <Image
            src={product.images.primary}
            alt={name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
          />

          {/* Level badge — top left */}
          <div className="absolute top-4 left-4 z-20">
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${levelColors[product.recommendedLevel]}`}
            >
              {levelLabels[product.recommendedLevel][locale]}
            </span>
          </div>

          {/* Best for — top right */}
          <div className="absolute top-4 right-4 z-20">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-surface-container-high/80 border border-white/10 text-text-muted backdrop-blur-md">
              {goalLabels[product.observationType][locale]}
            </span>
          </div>
        </div>

        {/* Content */}
        <div
          className="flex flex-col flex-1 px-6 pb-6 pt-4 relative z-20"
          style={{ transform: "translateZ(30px)" }}
        >
          {/* Sky hint */}
          <p className="text-label-sm text-primary font-bold mb-3 flex items-center gap-1.5 uppercase">
            <Zap className="w-3.5 h-3.5" />
            {skyHints[product.skyCondition][locale]}
          </p>

          <h3 className="text-title-lg font-semibold tracking-tight text-text-main mb-2 group-hover:text-primary transition-all duration-300">
            {name}
          </h3>

          <p className="text-body-sm text-text-soft leading-relaxed font-light line-clamp-2 mb-6">
            {description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-6">
            {product.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/5 border border-white/10 text-text-faint"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-auto flex items-end justify-between gap-3">
            <div>
              <span className="text-headline-md font-bold text-text-main font-mono tracking-tight">
                {product.price}
              </span>
              {compatibleCount > 0 && (
                <p className="text-label-sm text-text-faint mt-1 flex items-center gap-1 font-medium">
                  <ArrowRight className="w-3.5 h-3.5" />
                  {locale === "en"
                    ? `${compatibleCount} compatible items`
                    : `${compatibleCount} accesorios compatibles`}
                </p>
              )}
            </div>

            <Button
              size="icon"
              variant="primary"
              className="h-12 w-12 rounded-xl shrink-0 shadow-lg shadow-primary/20 relative z-50"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                addItem(product, 1);
                setOpen(true);
              }}
            >
              <ShoppingCart className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Bottom glow sweep */}
        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-linear-to-r from-transparent via-primary to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-center" />
      </motion.div>
    </motion.div>
  );
}
