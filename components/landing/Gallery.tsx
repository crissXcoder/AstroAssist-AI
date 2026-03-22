"use client";

import { SectionContainer } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";
import { Camera } from "lucide-react";

export function Gallery() {
  const images = [
    { src: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=800&auto=format&fit=crop", alt: "Nebulosa de Orión" },
    { src: "https://images.unsplash.com/photo-1464802686167-b939a6910659?q=80&w=800&auto=format&fit=crop", alt: "Cúmulo Estelar Abierto" },
    { src: "https://images.unsplash.com/photo-1543722530-d2c3201371e7?q=80&w=800&auto=format&fit=crop", alt: "Tránsito Planetario" },
    { src: "https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?q=80&w=800&auto=format&fit=crop", alt: "Superficie Lunar Detalles" },
  ];

  return (
    <SectionContainer delay={0.3} className="py-24 bg-secondary/10">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
          <Badge variant="secondary" className="border-primary/20 text-primary uppercase tracking-wider flex gap-2 items-center">
            <Camera className="w-3 h-3" />
            Galería Óptica
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter">El Universo que te Espera</h2>
          <p className="max-w-[700px] text-muted-foreground md:text-lg">
            Capturas reales realizadas por nuestra comunidad utilizando configuraciones de astrofotografía disponibles en nuestro catálogo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 auto-rows-[300px]">
          {images.map((img, i) => (
            <div 
              key={i} 
              className={`relative rounded-3xl overflow-hidden group ${i === 1 || i === 2 ? 'md:row-span-2' : ''}`}
            >
              <div className="absolute inset-0 bg-background/20 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none" />
              <img 
                src={img.src} 
                alt={img.alt} 
                className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-[1.5s] ease-in-out" 
              />
              <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-background/90 via-background/40 to-transparent z-20 translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <p className="text-white font-medium tracking-wide text-lg">{img.alt}</p>
                <div className="w-8 h-1 bg-primary mt-3 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionContainer>
  );
}
