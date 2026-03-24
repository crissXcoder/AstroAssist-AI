"use client";

import { SectionContainer } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";
import { ProductCard } from "./ProductCard";
import { useTranslations } from "@/components/i18n-provider";
import { catalogData } from "@/lib/catalog-data";

export function FeaturedProducts() {
  const t = useTranslations().featured;
  const featured = catalogData.slice(0, 3);

  return (
    <SectionContainer delay={0.1} className="py-32 relative z-10 overflow-hidden">
      {/* Huge background glow spanning the entire section */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-screen-xl h-[800px] bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent pointer-events-none -z-10 blur-[120px]" />
      
      <div className="container px-4 mx-auto md:px-6">
        <div className="flex flex-col items-center justify-center space-y-6 text-center mb-24">
          <Badge variant="glass" className="border-primary/20 dark:border-primary/40 text-primary-foreground uppercase tracking-[0.2em] px-5 py-2 shadow-sm dark:shadow-[0_0_30px_rgba(var(--primary),0.2)] bg-secondary/50 dark:bg-background/20 backdrop-blur-md">
            {t.badge}
          </Badge>
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-[1.1]">
            {t.title_part1} <br className="md:hidden" />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-white via-indigo-300 to-primary text-glow">
              {t.title_part2}
            </span>
          </h2>
          <p className="max-w-[600px] text-neutral-600 dark:text-neutral-400 md:text-xl font-light leading-relaxed">
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
