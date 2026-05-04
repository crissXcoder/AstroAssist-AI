"use client";

import { motion } from "framer-motion";
import { Product } from "@/features/catalog/types";
import { CatalogProductCard } from "@/features/catalog/components/ProductCard";
import { useTranslations, useLocale } from "@/shared/providers/i18n-provider";
import { getRecommendedForCart, getAllProducts } from "@/features/catalog/services/recommendationEngine";
import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";
import { useMemo } from "react";
import { useCart } from "../hooks/useCart";

export function CartRecommendations() {
  const t = useTranslations();
  const locale = useLocale();
  const { items } = useCart();
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsHydrated(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  // Derived state: Map cart items to full products and get recommendations
  const recommendations = useMemo(() => {
    // Map cart items to full products
    const allProducts = getAllProducts();
    const cartProducts = items
      .map(item => allProducts.find(p => p.id === item.productId))
      .filter((p): p is Product => p !== undefined);

    return getRecommendedForCart(cartProducts, 4);
  }, [items]);

  if (recommendations.length === 0) return null;

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
    <section className="mt-32 space-y-12">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2 text-primary text-label-md font-bold uppercase tracking-[0.2em]">
          <Sparkles className="w-4 h-4" />
          <span>{locale === "en" ? "Complement your setup" : "Complementa tu setup"}</span>
        </div>
        <h2 className="text-3xl font-bold text-text-main">
          {locale === "en" ? "Recommended for your expedition" : "Recomendado para tu expedición"}
        </h2>
        <div className="h-1.5 w-24 bg-linear-to-r from-primary to-secondary rounded-full" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {recommendations.map((p, idx) => (
          <CatalogProductCard 
            key={p.id} 
            product={p} 
            locale={locale as "en" | "es"} 
            index={idx} 
          />
        ))}
      </motion.div>
    </section>
  );
}
