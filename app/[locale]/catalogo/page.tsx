"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Telescope } from "lucide-react";
import { QuickGuide } from "@/components/catalog/QuickGuide";
import { SmartFilters } from "@/components/catalog/SmartFilters";
import { ProductGrid } from "@/components/catalog/ProductGrid";
import { SetupsSection } from "@/components/catalog/SetupsSection";
import { useCatalogFilters } from "@/hooks/useCatalogFilters";
import { useLocale } from "@/components/i18n-provider";

export default function CatalogPage() {
  const locale = (useLocale() ?? "en") as "en" | "es";
  const {
    filters,
    filteredProducts,
    relevantSetups,
    isFiltered,
    setLevel,
    setGoal,
    setSky,
    setCategory,
    setSearch,
    clearFilter,
    clearAll,
  } = useCatalogFilters();

  const t = locale === "en"
    ? {
        badge: "Optical Arsenal",
        title1: "Find your",
        title2: "perfect setup.",
        desc: "Tell us your goals and we'll surface the right equipment — not just a list of products.",
        count: (n: number) => `${n} system${n !== 1 ? "s" : ""} available`,
      }
    : {
        badge: "Arsenal Óptico",
        title1: "Encuentra tu",
        title2: "setup perfecto.",
        desc: "Cuéntanos tus objetivos y te mostraremos el equipo adecuado — no solo una lista de productos.",
        count: (n: number) => `${n} sistema${n !== 1 ? "s" : ""} disponible${n !== 1 ? "s" : ""}`,
      };

  return (
    <main className="min-h-screen bg-background pt-32 md:pt-40 pb-32 overflow-hidden relative selection:bg-primary/30">
      {/* Ambient background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(98,87,244,0.05),transparent_60%)] pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[30vh] bg-primary/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-0 w-[40vw] h-[50vh] bg-secondary/5 blur-[150px] pointer-events-none" />

      {/* Star field (subtle static dots via CSS) */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          backgroundPosition: "0 0, 40px 40px",
        }}
      />

      <div className="container-max mx-auto px-6 relative z-10">
        {/* ── HERO SECTION ── */}
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10 w-fit mb-8 shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span className="text-label-sm text-text-muted">
              {t.badge}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="text-headline-lg md:text-headline-xl lg:text-display-lg font-semibold tracking-tight text-text-main leading-[1.1] mb-8"
          >
            {t.title1}{" "}
            <br className="hidden md:block" />
            <span className="text-primary">{t.title2}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="text-body-lg text-text-soft font-light leading-relaxed max-w-2xl mb-16 mx-auto"
          >
            {t.desc}
          </motion.p>

          {/* QuickGuide */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.35 }}
            className="w-full"
          >
            <QuickGuide
              filters={filters}
              setGoal={setGoal}
              setLevel={setLevel}
              setSky={setSky}
              locale={locale}
            />
          </motion.div>
        </div>

        {/* ── SMART FILTERS BAR ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mb-10"
        >
          <SmartFilters
            filters={filters}
            setCategory={setCategory}
            setSearch={setSearch}
            clearFilter={clearFilter}
            clearAll={clearAll}
            isFiltered={isFiltered}
            locale={locale}
          />
        </motion.div>

        {/* Product count */}
        <AnimatePresence mode="wait">
          <motion.p
            key={filteredProducts.length}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-label-sm text-text-muted mb-8 flex items-center gap-2"
          >
            <Telescope className="w-4 h-4 text-primary" />
            {t.count(filteredProducts.length)}
          </motion.p>
        </AnimatePresence>

        {/* ── PRODUCT GRID ── */}
        <ProductGrid
          products={filteredProducts}
          locale={locale}
          isFiltered={isFiltered}
        />

        {/* ── SETUPS SECTION ── */}
        <SetupsSection
          setups={relevantSetups}
          locale={locale}
          isFiltered={isFiltered}
        />
      </div>
    </main>
  );
}
