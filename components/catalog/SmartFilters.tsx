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
    <div className="space-y-6">
      {/* Search + category row */}
      <div className="flex flex-col lg:flex-row gap-4 items-center">
        {/* Search */}
        <div className="relative flex-1 w-full lg:max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-faint" />
          <input
            type="text"
            value={filters.search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t.placeholder}
            className="w-full h-12 pl-11 pr-4 rounded-full bg-surface-container-high border border-white/5 text-body-sm text-text-main placeholder-text-faint focus:outline-none focus:border-primary/50 focus:bg-surface-bright transition-all duration-300"
          />
        </div>

        {/* Category pills */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setCategory(null)}
            className={`h-10 px-6 rounded-full text-label-sm font-semibold transition-all duration-300 border ${
              filters.category === null
                ? "bg-primary text-on-primary border-primary"
                : "bg-surface-container border-white/5 text-text-soft hover:border-white/15 hover:text-text-main hover:bg-surface-bright"
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
              className={`h-10 px-6 rounded-full text-label-sm font-semibold transition-all duration-300 border ${
                filters.category === cat.value
                  ? "bg-primary text-on-primary border-primary"
                  : "bg-surface-container border-white/5 text-text-soft hover:border-white/15 hover:text-text-main hover:bg-surface-bright"
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
          <span className="text-label-sm text-text-faint flex items-center gap-1.5 uppercase font-semibold">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            {locale === "en" ? "Active:" : "Activos:"}
          </span>
          {chips.map(({ key, label }) => (
            <motion.button
              key={key}
              onClick={() => clearFilter(key)}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold hover:bg-primary/20 transition-all duration-300"
            >
              {label}
              <X className="w-3 h-3 opacity-70" />
            </motion.button>
          ))}
          {isFiltered && (
            <button
              onClick={clearAll}
              className="text-label-sm text-text-faint hover:text-text-main underline underline-offset-4 transition-colors ml-2"
            >
              {t.clearAll}
            </button>
          )}
        </motion.div>
      )}
    </div>
  );
}
