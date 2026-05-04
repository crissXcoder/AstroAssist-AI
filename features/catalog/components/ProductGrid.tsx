"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Search } from "lucide-react";
import { CatalogProductCard } from "./ProductCard";
import type { ScoredProduct } from "@/features/catalog";

interface ProductGridProps {
  products: ScoredProduct[];
  locale: "en" | "es";
  isFiltered: boolean;
}

export function ProductGrid({ products, locale, isFiltered }: ProductGridProps) {
  const emptyTitle = locale === "en" ? "No matching equipment found" : "No se encontró equipo compatible";
  const emptyDesc = locale === "en"
    ? "Try adjusting your filters or clearing some selections to see more options."
    : "Intenta ajustar tus filtros o limpiar algunas selecciones para ver más opciones.";

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 min-h-[40vh]">
      <AnimatePresence mode="popLayout">
        {products.map(({ product, score }, index) => (
          <motion.div
            key={product.id}
            layout
            initial={{ opacity: 0, scale: 0.85, filter: "blur(8px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.85, filter: "blur(8px)" }}
            transition={{ duration: 0.4, type: "spring", bounce: 0.15 }}
            className="h-full"
          >
            <CatalogProductCard
              product={product}
              index={index}
              locale={locale}
              isHighlighted={isFiltered && score >= 7}
            />
          </motion.div>
        ))}
      </AnimatePresence>

      {products.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="col-span-1 md:col-span-2 lg:col-span-3 flex flex-col items-center justify-center py-32 text-center"
        >
          <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6">
            <Search className="w-6 h-6 text-neutral-600" />
          </div>
          <h3 className="text-lg font-semibold text-neutral-300 mb-2">{emptyTitle}</h3>
          <p className="text-sm text-neutral-600 font-light max-w-xs">{emptyDesc}</p>
        </motion.div>
      )}
    </div>
  );
}
