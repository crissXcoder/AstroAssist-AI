"use client";

import { SectionContainer } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";
import { ProductCard } from "./ProductCard";
import { useTranslations } from "@/components/i18n-provider";
import productsData from "@/data/products.json";
import type { Product } from "@/types/catalog";

const allProducts = productsData as Product[];

export function FeaturedProducts() {
  const t = useTranslations().featured;
  const featured = allProducts.slice(0, 3);

  return (
    <SectionContainer delay={0.1} className="py-32 relative z-10 overflow-hidden bg-surface-container-lowest">
      
      <div className="container px-4 mx-auto md:px-6">
        <div className="flex flex-col items-center justify-center space-y-6 text-center mb-24">
          <Badge variant="glass" className="bg-primary/5 border-primary/10 text-label-sm text-text-muted">
            {t.badge}
          </Badge>
          <h2 className="text-headline-lg md:text-headline-xl font-semibold tracking-tight text-text-main leading-[1.08]">
            {t.title_part1} <br className="md:hidden" />
            <span className="text-primary">
              {t.title_part2}
            </span>
          </h2>
          <p className="max-w-[600px] text-text-soft md:text-body-lg font-light leading-relaxed">
            {t.description}
          </p>
        </div>

        {/* CSS Grid ensures highly efficient scaling compared to messy flex arrays */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 perspective-[2000px]">
          {featured.map((product, index) => (
             <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </SectionContainer>
  );
}
