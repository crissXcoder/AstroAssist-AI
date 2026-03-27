"use client";

import { motion } from "framer-motion";
import { ArrowRight, Star, Telescope, Camera } from "lucide-react";
import Link from "next/link";
import type { CuratedSetup } from "@/types/catalog";
import { getSetupProducts } from "@/utils/recommendationEngine";

const GOAL_ICONS: Record<CuratedSetup["icon"], React.ReactNode> = {
  planet: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
      <circle cx="12" cy="12" r="5" />
      <ellipse cx="12" cy="12" rx="10" ry="3.5" transform="rotate(-25 12 12)" strokeDasharray="2 2" />
    </svg>
  ),
  galaxy: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
      <circle cx="12" cy="12" r="1.5" />
      <path d="M12 12c-4 4.5-8 4-8 0s4-8 8-8 8 4 8 8-4 8-8 8" />
    </svg>
  ),
  camera: <Camera className="w-5 h-5" />,
  star: <Star className="w-5 h-5" />,
};

const LEVEL_COLORS = {
  beginner: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  intermediate: "text-amber-400 bg-amber-500/10 border-amber-500/20",
  advanced: "text-red-400 bg-red-500/10 border-red-500/20",
};

const LEVEL_LABELS = {
  beginner: { en: "Beginner", es: "Principiante" },
  intermediate: { en: "Intermediate", es: "Intermedio" },
  advanced: { en: "Advanced", es: "Avanzado" },
};

const GOAL_LABELS = {
  planetary: { en: "Planets & Moon", es: "Planetas y Luna" },
  deep_sky: { en: "Deep Sky", es: "Cielo Profundo" },
  astrophotography: { en: "Astrophotography", es: "Astrofotografía" },
  general: { en: "General", es: "General" },
};

interface SetupCardProps {
  setup: CuratedSetup;
  index: number;
  locale: "en" | "es";
}

export function SetupCard({ setup, index, locale }: SetupCardProps) {
  const name = locale === "en" ? setup.nameEn : setup.nameEs;
  const description = locale === "en" ? setup.descriptionEn : setup.descriptionEs;
  const reason = locale === "en" ? setup.reasonEn : setup.reasonEs;
  const { main, accessories } = getSetupProducts(setup);
  const allImages = [...main, ...accessories].slice(0, 4);

  const exploreLabel = locale === "en" ? "Explore Setup" : "Ver Setup";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex flex-col rounded-3xl border border-white/[0.07] bg-gradient-to-br from-white/[0.03] to-transparent backdrop-blur-xl overflow-hidden group hover:border-white/[0.14] transition-all duration-500"
    >
      {/* Top accent bar */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-indigo-500/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="p-6">
        {/* Icon + badges */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0">
            {GOAL_ICONS[setup.icon]}
          </div>
          <div className="flex flex-wrap gap-2 justify-end">
            <span className={`text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full border ${LEVEL_COLORS[setup.recommendedLevel]}`}>
              {LEVEL_LABELS[setup.recommendedLevel][locale]}
            </span>
            <span className="text-[10px] font-medium px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.06] text-neutral-400">
              {GOAL_LABELS[setup.goal][locale]}
            </span>
          </div>
        </div>

        {/* Title + description */}
        <h3 className="text-lg font-bold text-white mb-2 leading-tight">{name}</h3>
        <p className="text-sm text-neutral-500 leading-relaxed font-light line-clamp-2 mb-4">{description}</p>

        {/* Product thumbnails */}
        {allImages.length > 0 && (
          <div className="flex items-center gap-3 mb-4">
            {allImages.map((p, i) => (
              <div
                key={p.id}
                className="w-12 h-12 rounded-xl overflow-hidden bg-black/60 border border-white/[0.06] shrink-0"
                style={{ zIndex: allImages.length - i }}
              >
                <img
                  src={p.images.primary}
                  alt={locale === "en" ? p.nameEn : p.nameEs}
                  className="w-full h-full object-cover opacity-70 mix-blend-screen"
                />
              </div>
            ))}
            <span className="text-xs text-neutral-600 font-light">
              {main.length} {locale === "en" ? "items" : "productos"}
              {accessories.length > 0
                ? ` + ${accessories.length} ${locale === "en" ? "accessories" : "accesorios"}`
                : ""}
            </span>
          </div>
        )}

        {/* Reason teaser */}
        <p className="text-[11px] text-neutral-600 leading-relaxed italic line-clamp-2 mb-5">
          "{reason.slice(0, 100)}…"
        </p>

        {/* CTA */}
        <Link
          href={`/builder`}
          className="inline-flex items-center gap-2 text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors group/link"
        >
          {exploreLabel}
          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-1" />
        </Link>
      </div>
    </motion.div>
  );
}
