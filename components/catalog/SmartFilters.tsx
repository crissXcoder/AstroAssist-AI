"use client";

import { motion } from "framer-motion";
import { X, SlidersHorizontal, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { CatalogFilters, ProductCategory } from "@/types/catalog";
import type { UseCatalogFiltersReturn } from "@/hooks/useCatalogFilters";

interface SmartFiltersProps {
  filters: CatalogFilters;
  setCategory: UseCatalogFiltersReturn["setCategory"];
  setSearch: UseCatalogFiltersReturn["setSearch"];
  clearFilter: UseCatalogFiltersReturn["clearFilter"];
  clearAll: UseCatalogFiltersReturn["clearAll"];
  isFiltered: boolean;
  locale: "en" | "es";
}

const CATEGORIES: { value: ProductCategory; labelEn: string; labelEs: string }[] = [
  { value: "Telescopios", labelEn: "Telescopes", labelEs: "Telescopios" },
  { value: "Monturas", labelEn: "Mounts", labelEs: "Monturas" },
  { value: "Cámaras", labelEn: "Cameras", labelEs: "Cámaras" },
  { value: "Accesorios", labelEn: "Accessories", labelEs: "Accesorios" },
];

const ACTIVE_FILTER_LABELS: Record<string, Record<"en" | "es", string>> = {
  level_beginner: { en: "Beginner", es: "Principiante" },
  level_intermediate: { en: "Intermediate", es: "Intermedio" },
  level_advanced: { en: "Advanced", es: "Avanzado" },
  goal_planetary: { en: "Planets", es: "Planetas" },
  goal_deep_sky: { en: "Deep Sky", es: "Cielo Profundo" },
  goal_astrophotography: { en: "Astrophotography", es: "Astrofotografía" },
  goal_general: { en: "General", es: "General" },
  sky_city: { en: "City Skies", es: "Ciudad" },
  sky_suburban: { en: "Suburbs", es: "Suburbios" },
  sky_dark_sky: { en: "Dark Sky", es: "Cielo Oscuro" },
};

function getActiveChips(filters: CatalogFilters, locale: "en" | "es") {
  const chips: { key: keyof CatalogFilters; label: string }[] = [];
  if (filters.level) {
    const label = ACTIVE_FILTER_LABELS[`level_${filters.level}`]?.[locale] ?? filters.level;
    chips.push({ key: "level", label });
  }
  if (filters.goal) {
    const label = ACTIVE_FILTER_LABELS[`goal_${filters.goal}`]?.[locale] ?? filters.goal;
    chips.push({ key: "goal", label });
  }
  if (filters.sky) {
    const label = ACTIVE_FILTER_LABELS[`sky_${filters.sky}`]?.[locale] ?? filters.sky;
    chips.push({ key: "sky", label });
  }
  if (filters.portability) chips.push({ key: "portability", label: filters.portability });
  if (filters.search) chips.push({ key: "search", label: `"${filters.search}"` });
  return chips;
}

export function SmartFilters({
  filters,
  setCategory,
  setSearch,
  clearFilter,
  clearAll,
  isFiltered,
  locale,
}: SmartFiltersProps) {
  const chips = getActiveChips(filters, locale);
  const t = locale === "en"
    ? { all: "All", clearAll: "Clear all", placeholder: "Search equipment…" }
    : { all: "Todos", clearAll: "Limpiar todo", placeholder: "Buscar equipo…" };

  return (
    <div className="space-y-4">
      {/* Search + category row */}
      <div className="flex flex-col sm:flex-row gap-3 items-center">
        {/* Search */}
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
          <input
            type="text"
            value={filters.search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t.placeholder}
            className="w-full pl-9 pr-4 py-2 rounded-full bg-white/[0.04] border border-white/[0.07] text-sm text-neutral-300 placeholder-neutral-600 focus:outline-none focus:border-indigo-500/50 focus:bg-white/[0.06] transition-all duration-200"
          />
        </div>

        {/* Category pills */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setCategory(null)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 border ${
              filters.category === null
                ? "bg-white/10 border-white/20 text-white"
                : "bg-transparent border-white/[0.06] text-neutral-500 hover:border-white/15 hover:text-neutral-300"
            }`}
          >
            {t.all}
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              onClick={() =>
                setCategory(filters.category === cat.value ? null : cat.value)
              }
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 border ${
                filters.category === cat.value
                  ? "bg-white/10 border-white/20 text-white"
                  : "bg-transparent border-white/[0.06] text-neutral-500 hover:border-white/15 hover:text-neutral-300"
              }`}
            >
              {locale === "en" ? cat.labelEn : cat.labelEs}
            </button>
          ))}
        </div>
      </div>

      {/* Active filter chips */}
      {chips.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          className="flex flex-wrap items-center gap-2"
        >
          <span className="text-[11px] text-neutral-600 uppercase tracking-widest flex items-center gap-1">
            <SlidersHorizontal className="w-3 h-3" />
            {locale === "en" ? "Active:" : "Activos:"}
          </span>
          {chips.map(({ key, label }) => (
            <motion.button
              key={key}
              onClick={() => clearFilter(key)}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/15 border border-indigo-400/30 text-indigo-300 text-xs font-medium hover:bg-indigo-500/25 transition-colors duration-200"
            >
              {label}
              <X className="w-3 h-3 opacity-70" />
            </motion.button>
          ))}
          {isFiltered && (
            <button
              onClick={clearAll}
              className="text-xs text-neutral-600 hover:text-neutral-400 underline underline-offset-2 transition-colors ml-2"
            >
              {t.clearAll}
            </button>
          )}
        </motion.div>
      )}
    </div>
  );
}
