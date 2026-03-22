"use client";

import { SectionContainer } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";
import { ProductCard } from "./ProductCard";

const products = [
  {
    id: 1,
    name: "Celestron NexStar 130SLT",
    description: "Telescopio Newtoniano Computarizado ideal para iniciarse en la observación de cielo profundo. Alineación autoguiada en minutos.",
    price: "$649.00",
    tags: ["Principiante", "Automático"],
    image: "https://images.unsplash.com/photo-1518349619113-03114f06ac3a?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 2,
    name: "Sky-Watcher EQ6-R Pro",
    description: "Montura Ecuatorial Alemana de alta precisión, la elección definitiva para astrofotografía premium tolerando cargas ultra pesadas.",
    price: "$2,025.00",
    tags: ["Avanzado", "Heavy Duty", "Precisa"],
    image: "https://images.unsplash.com/photo-1543722530-d2c3201371e7?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 3,
    name: "ZWO ASI533MC Pro",
    description: "Cámara Astronómica en color refrigerada, perfecta para reducir el ruido térmico en largas exposiciones bajo altas temperaturas.",
    price: "$799.00",
    tags: ["Astrofotografía", "Refrigerada"],
    image: "https://images.unsplash.com/photo-1614729939124-032f0b56c9ce?q=80&w=600&auto=format&fit=crop"
  }
];

export function FeaturedProducts() {
  return (
    <SectionContainer delay={0.1} className="py-32 relative z-10 overflow-hidden">
      {/* Huge background glow spanning the entire section */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-screen-xl h-[800px] bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent pointer-events-none -z-10 blur-[120px]" />
      
      <div className="container px-4 mx-auto md:px-6">
        <div className="flex flex-col items-center justify-center space-y-6 text-center mb-24">
          <Badge variant="glass" className="border-primary/40 text-primary-foreground uppercase tracking-[0.2em] px-5 py-2 shadow-[0_0_30px_rgba(var(--primary),0.2)] bg-background/50">
            Catálogo Óptico
          </Badge>
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-[1.1]">
            Equipamiento <br className="md:hidden" />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-white via-indigo-300 to-primary text-glow">
              Premium
            </span>
          </h2>
          <p className="max-w-[800px] text-muted-foreground md:text-xl font-light leading-relaxed">
            Sistemas ópticos y monturas de vanguardia elegidos por nuestra IA analítica. Interactúa con las tarjetas para explorar la calidad de sus componentes.
          </p>
        </div>

        {/* CSS Grid ensures highly efficient scaling compared to messy flex arrays */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 perspective-[2000px]">
          {products.map((product, index) => (
             <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </SectionContainer>
  );
}
