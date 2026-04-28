"use client";

import { motion } from "framer-motion";
import { Product } from "../../types";
import { ProductGallery } from "./ProductGallery";
import { ProductInfo } from "./ProductInfo";
import { ProductSpecs } from "./ProductSpecs";
import { useTranslations } from "@/shared/providers/i18n-provider";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/shared/components/ui/button";
import { RelatedProducts } from "./RelatedProducts";

interface ProductDetailViewProps {
  product: Product;
  locale: string;
}

export function ProductDetailView({ product, locale }: ProductDetailViewProps) {
  const t = useTranslations();

  return (
    <div className="min-h-screen pt-24 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Button
            variant="ghost"
            asChild
            className="text-text-muted hover:text-primary rounded-full pl-2"
          >
            <Link href={`/${locale}/catalogo`}>
              <ArrowLeft size={20} className="mr-2" />
              {t.product_detail.back}
            </Link>
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20">
          {/* Left: Gallery */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <ProductGallery images={product.images} name={locale === "es" ? product.nameEs : product.nameEn} />
          </motion.div>

          {/* Right: Info */}
          <div>
            <ProductInfo product={product} locale={locale} />
          </div>
        </div>

        {/* Bottom: Specifications */}
        <div className="mt-24">
          <ProductSpecs product={product} locale={locale} />
        </div>

        {/* Related Products Section */}
        <div className="mt-32">
          <RelatedProducts 
            currentProductId={product.id} 
            category={product.category} 
            locale={locale} 
          />
        </div>

        {/* Bottom: Extra Confidence Section (Premium visual) */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-32 p-12 rounded-4xl bg-linear-to-br from-surface-container-high/60 to-surface-container-lowest/40 border border-outline/20 relative overflow-hidden text-center"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-linear-to-r from-transparent via-primary/40 to-transparent" />
          
          <h3 className="text-3xl font-bold text-text-main mb-6">
            {t.chatbot.title_part1} {t.chatbot.title_part2}
          </h3>
          <p className="text-text-soft max-w-2xl mx-auto mb-10 text-lg">
            {t.chatbot.description}
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            {t.chatbot.features.map((feature: string, idx: number) => (
              <div 
                key={idx}
                className="px-6 py-3 rounded-full bg-surface-bright/50 border border-outline/30 text-text-main text-sm font-medium backdrop-blur-md"
              >
                {feature}
              </div>
            ))}
          </div>

          {/* Background Atmospheric Elements */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[radial-gradient(circle,rgba(98,87,244,0.05)_0%,transparent_50%)] pointer-events-none" />
        </motion.div>
      </div>
    </div>
  );
}
