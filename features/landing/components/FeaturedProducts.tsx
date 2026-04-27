"use client";

import { SectionContainer, SectionHeader } from "@/shared/components/ui/section";
import { Telescope } from "lucide-react";
import { ProductCard } from "./ProductCard";
import { useTranslations } from "@/shared/providers/i18n-provider";
import productsData from "@/features/catalog/data/products.json";
import type { Product } from "@/features/catalog";

const allProducts = productsData as Product[];

export function FeaturedProducts() {
  const t = useTranslations().featured;
  const featured = allProducts.slice(0, 3);

  return (
    <SectionContainer 
      delay={0.1} 
      className="py-32 relative z-10 overflow-hidden bg-surface-container-lowest"
    >
      <SectionHeader 
        badgeText={t.badge}
        badgeIcon={<Telescope className="w-4 h-4 mr-2" />}
        titlePart1={t.title_part1}
        titlePart2={t.title_part2}
        description={t.description}
      />

      {/* CSS Grid ensures highly efficient scaling compared to messy flex arrays */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 perspective-[2000px]">
        {featured.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
        ))}
      </div>
    </SectionContainer>
  );
}
