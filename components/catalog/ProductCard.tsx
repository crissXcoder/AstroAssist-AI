"use client";

import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ShoppingCart, ArrowRight, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Product, RecommendedLevel, ObservationType, SkyCondition } from "@/types/catalog";

// ─────────────────────────────────────────────────────────────────────────────
// Badge color maps
// ─────────────────────────────────────────────────────────────────────────────

const levelColors: Record<RecommendedLevel, string> = {
  beginner: "bg-emerald-500/15 border-emerald-400/40 text-emerald-300",
  intermediate: "bg-amber-500/15 border-amber-400/40 text-amber-300",
  advanced: "bg-red-500/15 border-red-400/40 text-red-300",
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
  const glare = useMotionTemplate`radial-gradient(300px circle at ${mouseX}px ${mouseY}px, rgba(147,51,234,0.12), transparent 80%)`;

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
        className={`relative flex flex-col h-full rounded-3xl border bg-[#0c0f1a]/80 backdrop-blur-2xl overflow-hidden group transition-shadow duration-500 will-change-transform ${
          isHighlighted
            ? "border-indigo-500/40 shadow-[0_0_30px_rgba(99,102,241,0.15)]"
            : "border-white/[0.06] hover:border-white/[0.14] hover:shadow-[0_20px_50px_rgba(0,0,0,0.4)]"
        }`}
      >
        {/* Glare */}
        <motion.div
          className="pointer-events-none absolute -inset-px z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 mix-blend-screen rounded-3xl overflow-hidden"
          style={{ background: glare }}
        />

        {/* Highlight ring */}
        {isHighlighted && (
          <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-indigo-400/20 pointer-events-none z-30" />
        )}

        {/* Image */}
        <div
          className="relative w-full h-[220px] overflow-hidden bg-gradient-to-b from-[#080a12] to-[#0c0f1a]"
          style={{ transform: "translateZ(20px)" }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0c0f1a] z-10" />
          <img
            src={product.images.primary}
            alt={name}
            className="w-full h-full object-cover opacity-50 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700 ease-out mix-blend-screen"
          />

          {/* Level badge — top left */}
          <div className="absolute top-4 left-4 z-20">
            <span
              className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider border ${levelColors[product.recommendedLevel]}`}
            >
              {levelLabels[product.recommendedLevel][locale]}
            </span>
          </div>

          {/* Best for — top right */}
          <div className="absolute top-4 right-4 z-20">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-medium bg-black/40 border border-white/10 text-neutral-300 backdrop-blur-sm">
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
          <p className="text-[11px] text-indigo-400/70 font-medium mb-2 flex items-center gap-1">
            <Zap className="w-3 h-3" />
            {skyHints[product.skyCondition][locale]}
          </p>

          <h3 className="text-xl font-bold tracking-tight text-white leading-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-indigo-300 transition-all duration-300 mb-2">
            {name}
          </h3>

          <p className="text-sm text-neutral-500 leading-relaxed line-clamp-2 font-light mb-4">
            {description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {product.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded-full text-[10px] bg-white/[0.04] border border-white/[0.06] text-neutral-600"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-auto flex items-end justify-between gap-3">
            <div>
              <span className="text-2xl font-black text-white font-mono tracking-tight">
                {product.price}
              </span>
              {compatibleCount > 0 && (
                <p className="text-[11px] text-neutral-600 mt-0.5 flex items-center gap-1">
                  <ArrowRight className="w-3 h-3" />
                  {locale === "en"
                    ? `Compatible with ${compatibleCount} item${compatibleCount > 1 ? "s" : ""}`
                    : `Compatible con ${compatibleCount} accesorio${compatibleCount > 1 ? "s" : ""}`}
                </p>
              )}
            </div>

            <Button
              size="icon"
              className="h-11 w-11 rounded-2xl shrink-0 bg-indigo-500/15 text-indigo-300 border border-indigo-500/30 hover:bg-indigo-500 hover:text-white hover:border-indigo-400 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(99,102,241,0.4)]"
            >
              <ShoppingCart className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Bottom glow sweep */}
        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-indigo-500 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-center" />
      </motion.div>
    </motion.div>
  );
}
