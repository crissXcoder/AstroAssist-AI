"use client";

import { motion } from "framer-motion";
import { ArrowRight, Star, Telescope, Camera } from "lucide-react";
import Link from "next/link";
import type { CuratedSetup } from "@/features/catalog";
import { getSetupProducts } from "@/features/catalog/services/recommendationEngine";
import { BuySetupButton } from "@/features/cart/components/BuySetupButton";

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
  beginner: "bg-success-container/30 text-on-success-container border-success-container/40",
  intermediate: "bg-warning-container/30 text-on-warning-container border-warning-container/40",
  advanced: "bg-error-container/30 text-on-error-container border-error-container/40",
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

import { Card, CardContent } from "@/shared/components/ui/card";

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
    >
      <Card variant="interactive" className="h-full relative overflow-hidden group p-0!">
        <CardContent className="p-6 flex flex-col h-full">
        {/* Icon + badges */}
        <div className="flex items-start justify-between gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
            {GOAL_ICONS[setup.icon]}
          </div>
          <div className="flex flex-wrap gap-2 justify-end">
            <span className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${LEVEL_COLORS[setup.recommendedLevel]}`}>
              {LEVEL_LABELS[setup.recommendedLevel][locale]}
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-white/5 border border-white/10 text-text-muted">
              {GOAL_LABELS[setup.goal][locale]}
            </span>
          </div>
        </div>

        {/* Title + description */}
        <h3 className="text-title-md font-semibold text-text-main mb-2 leading-tight group-hover:text-primary transition-colors">{name}</h3>
        <p className="text-body-sm text-text-soft leading-relaxed font-light line-clamp-2 mb-6">{description}</p>

        {/* Product thumbnails */}
        {allImages.length > 0 && (
          <div className="flex items-center gap-3 mb-6">
            <div className="flex -space-x-3">
              {allImages.map((p, i) => (
                <div
                  key={p.id}
                  className="w-10 h-10 rounded-full overflow-hidden bg-surface-container border-2 border-surface-container-low shrink-0 shadow-lg"
                  style={{ zIndex: allImages.length - i }}
                >
                  <img
                    src={p.images.primary}
                    alt={locale === "en" ? p.nameEn : p.nameEs}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                  />
                </div>
              ))}
            </div>
            <span className="text-label-sm text-text-faint font-medium">
              {main.length + accessories.length} {locale === "en" ? "items" : "productos"}
            </span>
          </div>
        )}

        {/* Reason teaser */}
        <div className="bg-surface-container/50 rounded-lg p-4 mb-6 border border-white/5">
          <p className="text-body-sm text-text-soft leading-relaxed italic line-clamp-2">
            "{reason}"
          </p>
        </div>

        {/* Actions */}
        <div className="mt-auto pt-6 flex flex-col gap-4">
          <BuySetupButton 
            products={[...main, ...accessories]} 
            locale={locale}
            className="w-full"
          />
          
          <Link
            href={`/${locale}/setups/${setup.id}`}
            className="inline-flex items-center justify-center gap-2 text-label-sm font-bold text-text-muted hover:text-primary transition-all group/link py-2"
          >
            {exploreLabel}
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/link:translate-x-1" />
          </Link>
        </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
