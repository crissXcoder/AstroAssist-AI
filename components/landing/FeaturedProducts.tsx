"use client";

import { SectionContainer } from "@/components/ui/section";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

const products = [
  {
    id: 1,
    name: "Celestron NexStar 130SLT",
    description: "Telescopio Newtoniano Computarizado ideal para iniciarse en la observación de cielo profundo.",
    price: "$649.00",
    tags: ["Principiante", "Alineación Automática"],
    image: "https://images.unsplash.com/photo-1518349619113-03114f06ac3a?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 2,
    name: "Sky-Watcher EQ6-R Pro",
    description: "Montura Ecuatorial Alemana de alta precisión, la elección definitiva para astrofotografía premium.",
    price: "$2,025.00",
    tags: ["Avanzado", "Heavy Duty", "Precisión"],
    image: "https://images.unsplash.com/photo-1543722530-d2c3201371e7?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 3,
    name: "ZWO ASI533MC Pro",
    description: "Cámara Astronómica en color refrigerada, perfecta para reducir el ruido térmico en largas exposiciones.",
    price: "$799.00",
    tags: ["Astrofotografía", "Refrigerada"],
    image: "https://images.unsplash.com/photo-1614729939124-032f0b56c9ce?q=80&w=600&auto=format&fit=crop"
  }
];

export function FeaturedProducts() {
  return (
    <SectionContainer delay={0.2} className="py-20 relative z-10">
      <div className="container px-4 mx-auto md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
          <Badge variant="secondary" className="border-primary/20 text-primary uppercase tracking-wider">
            Equipamiento Destacado
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter">Niveles de Observación Premium</h2>
          <p className="max-w-[700px] text-muted-foreground md:text-lg">
            Seleccionados meticulosamente por expertos. Nuestra línea destacada abarca desde kits de iniciación hasta configuraciones de astrofotografía de observatorio.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <Card key={product.id} className="flex flex-col overflow-hidden group hover:border-primary/50 transition-all duration-500 hover:shadow-[0_0_30px_rgba(var(--primary),0.15)] relative">
              <div className="relative w-full h-60 overflow-hidden bg-secondary/50">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="object-cover w-full h-full opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 mix-blend-screen"
                />
              </div>
              <CardHeader className="pt-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  {product.tags.map(tag => (
                    <Badge key={tag} variant="secondary" className="text-[10px] bg-secondary/80 border-border/40">{tag}</Badge>
                  ))}
                </div>
                <CardTitle className="text-xl leading-tight">{product.name}</CardTitle>
                <CardDescription className="line-clamp-3 mt-2">{product.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1" />
              <CardFooter className="flex items-center justify-between border-t border-border/30 pt-6">
                <span className="text-2xl font-bold text-glow font-mono">{product.price}</span>
                <Button variant="glass" size="sm" className="gap-2 shrink-0">
                  <ShoppingCart className="w-4 h-4" />
                  Agregar
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </SectionContainer>
  );
}
