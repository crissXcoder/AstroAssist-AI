"use client";

import { motion } from "framer-motion";
import { Product } from "../../types";
import { CatalogProductCard } from "../ProductCard";
import { useTranslations } from "@/shared/providers/i18n-provider";
import { getRelatedProducts } from "../../services/recommendationEngine";
import { useEffect, useState } from "react";
import { Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import Link from "next/link";

interface RelatedProductsProps {
  product: Product;
  locale: string;
}

export function RelatedProducts({ product, locale }: RelatedProductsProps) {
  const t = useTranslations();
  const [related, setRelated] = useState<Product[]>([]);

  useEffect(() => {
    // We use the enhanced recommendation logic
    const results = getRelatedProducts(product, 3);
    setRelated(results);
  }, [product]);

  if (related.length === 0) return null;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  return (
    <section className="space-y-12">
      {/* Premium Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-4">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 text-primary text-label-md font-bold uppercase tracking-[0.2em]"
          >
            <Sparkles className="w-4 h-4" />
            <span>Setup Discovery</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-text-main tracking-tight"
          >
            {t.product_detail.related}
          </motion.h2>
          
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: "80px" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-1.5 bg-linear-to-r from-primary to-secondary rounded-full" 
          />
        </div>

        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-text-soft max-w-sm text-sm leading-relaxed"
        >
          {locale === "en" 
            ? "Expand your capabilities with gear that perfectly complements your current setup choice."
            : "Expande tus capacidades con equipo que complementa perfectamente tu elección actual."}
        </motion.p>
      </div>

      {/* Grid - Could be a carousel, but a clean 3-col grid feels very premium on desktop */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {related.map((p, idx) => (
          <CatalogProductCard 
            key={p.id} 
            product={p} 
            locale={locale as "en" | "es"} 
            index={idx} 
          />
        ))}
      </motion.div>

      {/* Empty State Fallback handled by return null, but if we wanted "See more" */}
      <div className="flex justify-center pt-8">
        <Button variant="ghost" asChild className="group text-text-muted hover:text-primary transition-colors">
          <Link href={`/${locale}/catalogo`}>
            {locale === "en" ? "Explore full catalog" : "Explorar catálogo completo"}
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
