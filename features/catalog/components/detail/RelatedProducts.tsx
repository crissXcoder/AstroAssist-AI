"use client";

import { motion } from "framer-motion";
import { Product } from "../../types";
import { CatalogProductCard } from "../ProductCard";
import { useTranslations } from "@/shared/providers/i18n-provider";
import { productService } from "../../services/productService";
import { useEffect, useState } from "react";

interface RelatedProductsProps {
  currentProductId: string;
  category: string;
  locale: string;
}

export function RelatedProducts({ currentProductId, category, locale }: RelatedProductsProps) {
  const t = useTranslations();
  const [related, setRelated] = useState<Product[]>([]);

  useEffect(() => {
    async function loadRelated() {
      const allProducts = await productService.getProducts();
      const filtered = allProducts
        .filter(p => p.id !== currentProductId && p.category === category)
        .slice(0, 3);
      
      // If no same category, just take random ones
      if (filtered.length === 0) {
        setRelated(allProducts.filter(p => p.id !== currentProductId).slice(0, 3));
      } else {
        setRelated(filtered);
      }
    }
    loadRelated();
  }, [currentProductId, category]);

  if (related.length === 0) return null;

  return (
    <div className="space-y-12">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-bold text-text-main">{t.product_detail.related}</h2>
        <div className="h-1.5 w-24 bg-linear-to-r from-primary to-secondary rounded-full" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {related.map((product, idx) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.15 }}
          >
            <CatalogProductCard product={product} locale={locale as "en" | "es"} index={idx} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
