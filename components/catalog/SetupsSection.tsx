"use client";

import { motion } from "framer-motion";
import { Layers } from "lucide-react";
import type { CuratedSetup } from "@/types/catalog";
import { SetupCard } from "./SetupCard";

interface SetupsSectionProps {
  setups: CuratedSetup[];
  locale: "en" | "es";
  isFiltered: boolean;
}

export function SetupsSection({ setups, locale, isFiltered }: SetupsSectionProps) {
  if (setups.length === 0) return null;

  const title = locale === "en" ? "Recommended Setups" : "Setups Recomendados";
  const subtitle = isFiltered
    ? locale === "en"
      ? "Complete configurations matching your criteria"
      : "Configuraciones completas que coinciden con tus criterios"
    : locale === "en"
    ? "Curated configurations handpicked by our team"
    : "Configuraciones seleccionadas por nuestro equipo";

  return (
    <section className="mt-24 pt-16 border-t border-white/[0.05]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex items-center gap-3 mb-10"
      >
        <div className="w-8 h-8 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0">
          <Layers className="w-4 h-4" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">{title}</h2>
          <p className="text-sm text-neutral-500 font-light mt-0.5">{subtitle}</p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {setups.map((setup, i) => (
          <SetupCard key={setup.id} setup={setup} index={i} locale={locale} />
        ))}
      </div>
    </section>
  );
}
