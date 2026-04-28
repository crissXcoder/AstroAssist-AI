"use client";

import { motion } from "framer-motion";
import { CuratedSetup, Product } from "../../types";
import { useTranslations } from "@/shared/providers/i18n-provider";
import { ArrowLeft, CheckCircle2, Info, LayoutGrid, Package } from "lucide-react";
import Link from "next/link";
import { Button } from "@/shared/components/ui/button";
import { getSetupProducts } from "../../services/recommendationEngine";
import { CatalogProductCard } from "../ProductCard";
import { BuySetupButton } from "@/features/cart/components/BuySetupButton";

interface SetupDetailViewProps {
  setup: CuratedSetup;
  locale: string;
}

export function SetupDetailView({ setup, locale }: SetupDetailViewProps) {
  const t = useTranslations();
  const { main, accessories } = getSetupProducts(setup);
  const name = locale === "es" ? setup.nameEs : setup.nameEn;
  const description = locale === "es" ? setup.descriptionEs : setup.descriptionEn;
  const reason = locale === "es" ? setup.reasonEs : setup.reasonEn;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div className="min-h-screen pt-24 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-12"
        >
          <Button
            variant="ghost"
            asChild
            className="text-text-muted hover:text-primary rounded-full pl-2"
          >
            <Link href={`/${locale}/catalogo`}>
              <ArrowLeft size={20} className="mr-2" />
              {locale === "es" ? "Volver al Catálogo" : "Back to Catalog"}
            </Link>
          </Button>
        </motion.div>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-24">
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-label-sm font-bold uppercase tracking-widest">
                  {locale === "es" ? "Setup Curado" : "Curated Setup"}
                </span>
                <span className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-text-muted text-label-sm font-bold uppercase tracking-widest">
                  {setup.recommendedLevel}
                </span>
              </div>
              <h1 className="text-display-lg font-bold text-text-main mb-6 leading-tight">
                {name}
              </h1>
              <p className="text-body-lg text-text-soft mb-10 max-w-3xl leading-relaxed font-light">
                {description}
              </p>

              {/* Quick Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
                <div className="p-6 rounded-2xl bg-surface-container/50 border border-outline/20 flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <Package className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-text-main font-bold mb-1">{locale === "es" ? "Contenido" : "Contents"}</h4>
                    <p className="text-text-muted text-sm">{main.length + accessories.length} {locale === "es" ? "Productos en total" : "Total products"}</p>
                  </div>
                </div>
                <div className="p-6 rounded-2xl bg-surface-container/50 border border-outline/20 flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary shrink-0">
                    <LayoutGrid className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-text-main font-bold mb-1">{locale === "es" ? "Objetivo" : "Goal"}</h4>
                    <p className="text-text-muted text-sm">{setup.goal}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-8 rounded-4xl bg-linear-to-br from-surface-container-high to-surface-container-low border border-outline/30 sticky top-32 shadow-2xl"
            >
              <h3 className="text-title-md font-bold text-text-main mb-6">
                {locale === "es" ? "Comprar Paquete" : "Purchase Bundle"}
              </h3>
              <div className="space-y-4 mb-8">
                {main.map(p => (
                  <div key={p.id} className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-success shrink-0" />
                    <span className="text-text-soft text-sm truncate">{locale === "es" ? p.nameEs : p.nameEn}</span>
                  </div>
                ))}
                {accessories.map(p => (
                  <div key={p.id} className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-success shrink-0" />
                    <span className="text-text-soft text-sm truncate">{locale === "es" ? p.nameEs : p.nameEn}</span>
                  </div>
                ))}
              </div>
              <BuySetupButton 
                products={[...main, ...accessories]} 
                locale={locale as "en" | "es"} 
                className="w-full"
              />
              <p className="text-text-faint text-[10px] text-center mt-4 uppercase tracking-widest">
                {locale === "es" ? "Envío Asegurado Incluido" : "Insured Shipping Included"}
              </p>
            </motion.div>
          </div>
        </div>

        {/* Expert Reasoning Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-32 p-12 rounded-4xl bg-linear-to-br from-primary/10 to-transparent border border-primary/20 relative overflow-hidden"
        >
          <div className="flex items-center gap-3 mb-8 text-primary">
            <Info className="w-6 h-6" />
            <h2 className="text-label-md font-bold uppercase tracking-widest">{locale === "es" ? "Análisis del Experto" : "Expert Analysis"}</h2>
          </div>
          <p className="text-2xl md:text-3xl text-text-main leading-relaxed italic font-light">
            "{reason}"
          </p>
          <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
            <Info className="w-48 h-48" />
          </div>
        </motion.div>

        {/* Products Grid */}
        <section className="mb-32">
          <div className="flex flex-col gap-4 mb-12">
            <div className="h-1.5 w-24 bg-linear-to-r from-primary to-secondary rounded-full" />
            <h2 className="text-headline-lg font-bold text-text-main">
              {locale === "es" ? "Componentes del Setup" : "Setup Components"}
            </h2>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {[...main, ...accessories].map((p, idx) => (
              <CatalogProductCard 
                key={p.id} 
                product={p} 
                locale={locale as "en" | "es"} 
                index={idx} 
              />
            ))}
          </motion.div>
        </section>
      </div>
    </div>
  );
}
