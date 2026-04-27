"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Maximize2, Camera, Telescope, MapPin, ArrowUpRight } from "lucide-react";
import { SectionContainer, SectionHeader } from "@/shared/components/ui/section";
import { Badge } from "@/shared/components/ui/badge";
import { Card } from "@/shared/components/ui/card";
import { useTranslations } from "@/shared/providers/i18n-provider";
import images from "@/lib/images.json";

const galleryData = [
  {
    id: "img1",
    src: images.gallery.img1,
    title: "Nebulosa de Orión (M42)",
    photographer: "Comunidad AstroAssist",
    equipment: "Sky-Watcher EQ6-R Pro + Asi533MC",
    location: "Observatorio Atacama",
    span: "col-span-1 md:col-span-2 row-span-2",
  },
  {
    id: "img2",
    src: images.gallery.img2,
    title: "Cúmulo de las Pléyades",
    photographer: "Dr. Elena M.",
    equipment: "Celestron NexStar 130SLT",
    location: "Cielo Oscuro Bortle 2",
    span: "col-span-1 md:col-span-1 row-span-1",
  },
  {
    id: "img3",
    src: images.gallery.img3,
    title: "Galaxia de Andrómeda",
    photographer: "Astrofoto PRO",
    equipment: "Refractor 80mm ED",
    location: "Desierto de Mojave",
    span: "col-span-1 md:col-span-1 row-span-1",
  },
  {
    id: "img4",
    src: images.gallery.img4,
    title: "Tránsito Fotográfico",
    photographer: "Carlos R.",
    equipment: "Maksutov-Cassegrain 90mm",
    location: "Montañas Rocosas",
    span: "col-span-1 md:col-span-2 row-span-1",
  },
  {
    id: "img5",
    src: images.gallery.img5,
    title: "Vía Láctea Central",
    photographer: "Cazadores de Estrellas",
    equipment: "Sony A7SIII + Lente 14mm",
    location: "Parque Nacional Teide",
    span: "col-span-1 md:col-span-1 row-span-2",
  },
  {
    id: "img6",
    src: images.gallery.img6,
    title: "Superficie Lunar",
    photographer: "Instituto Astronómico",
    equipment: "Montura CEM60",
    location: "Cúpula Observatorio",
    span: "col-span-1 md:col-span-1 row-span-1",
  },
  {
    id: "img7",
    src: images.gallery.img7,
    title: "Eclipse Solar Parcial",
    photographer: "M. Rodríguez",
    equipment: "Filtro Solar Baader",
    location: "Ciudad de México",
    span: "col-span-1 md:col-span-1 row-span-1",
  }
];

export function Gallery() {
  const t = useTranslations().gallery;
  const [selectedImage, setSelectedImage] = useState<typeof galleryData[0] | null>(null);

  // Close modal on Escape
  if (typeof window !== 'undefined') {
    window.onkeydown = (e) => {
      if (e.key === 'Escape') setSelectedImage(null);
    };
  }

  return (
    <SectionContainer id="gallery" delay={0.3} className="py-32 relative overflow-hidden bg-surface-container-lowest">
      {/* Immersive Deep Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(98,87,244,0.05),transparent_70%)] pointer-events-none -z-10" />
      <div className="absolute bottom-0 w-full h-[500px] bg-linear-to-t from-background via-transparent to-transparent pointer-events-none z-10" />

      <div className="container px-4 md:px-6 mx-auto relative z-20">
        <SectionHeader 
          badgeText={t.badge}
          badgeIcon={<Camera className="w-4 h-4 mr-2" />}
          titleNode={
            <>
              {t.title_part1} <br className="sm:hidden" />
              <span className="text-primary">{t.title_part2}</span>
            </>
          }
          description={t.description}
          titleClassName="max-w-4xl md:text-headline-xl"
          descriptionClassName="max-w-[700px] mx-auto"
        />

        {/* Bento Grid Layout - Masonry style representation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 auto-rows-[220px] md:auto-rows-[250px]">
          {galleryData.map((img, i) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className={img.span}
            >
              <Card 
                variant="interactive" 
                className="h-full cursor-pointer rounded-xl"
                onClick={() => setSelectedImage(img)}
              >
                {/* Image with extreme slow scale on hover */}
                <img 
                  src={img.src} 
                  alt={img.title} 
                  className="w-full h-full object-cover opacity-70 group-hover/card:opacity-100 group-hover/card:scale-110 transition-all duration-[2s] ease-out will-change-transform"
                />
                
                {/* Dark overlay that fades away slightly */}
                <div className="absolute inset-0 bg-linear-to-b from-transparent via-background/20 to-background/90 opacity-80 group-hover/card:opacity-100 transition-opacity duration-500" />
                
                  {/* Content overlay */}
                  <div className="absolute inset-0 p-6 flex flex-col justify-end translate-y-4 group-hover/card:translate-y-0 transition-transform duration-500 ease-out pointer-events-none">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-title-lg font-semibold text-text-main tracking-tight leading-tight">{t.items[img.id as keyof typeof t.items].title}</h3>
                      <div className="w-10 h-10 rounded-full bg-surface-container-highest/80 backdrop-blur-3xl flex items-center justify-center opacity-0 group-hover/card:opacity-100 transition-all duration-500 scale-75 group-hover/card:scale-100 border border-white/10 shrink-0 ml-2">
                        <ArrowUpRight className="w-5 h-5 text-text-main" />
                      </div>
                    </div>
                    <div className="flex flex-col gap-1.5 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 delay-100">
                      <p className="text-body-sm text-primary font-medium flex items-center gap-2">
                        <Telescope className="w-3.5 h-3.5 shrink-0" /> <span className="line-clamp-1">{t.items[img.id as keyof typeof t.items].equipment}</span>
                      </p>
                      <p className="text-[12px] text-text-soft flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 shrink-0" /> <span className="line-clamp-1">{t.items[img.id as keyof typeof t.items].location}</span>
                      </p>
                    </div>
                  </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal Preview powered by Framer Motion AnimatePresence */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-background/80 backdrop-blur-2xl"
            onClick={() => setSelectedImage(null)}
          >
            <button 
              className="absolute top-6 right-6 p-4 rounded-full bg-surface-container-highest border border-white/10 text-text-main hover:bg-white/10 transition-colors z-60 shadow-2xl"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-6 h-6" />
            </button>
            
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-full max-w-6xl aspect-4/3 md:aspect-auto md:h-[80vh] rounded-2xl overflow-hidden bg-surface-container-lowest border border-white/10 flex flex-col md:flex-row shadow-2xl"
              onClick={(e) => e.stopPropagation()} // Prevent close when clicking modal body
            >
              {/* Image Side */}
              <div className="w-full md:w-3/4 h-64 md:h-full relative bg-background/40 flex items-center justify-center p-4">
                 <img 
                   src={selectedImage.src} 
                   alt={selectedImage.title}
                   className="w-full h-full object-contain rounded-xl shadow-2xl"
                 />
              </div>
              
              {/* Details Side */}
              <div className="w-full md:w-1/4 h-full bg-surface-container p-8 flex flex-col border-t md:border-t-0 md:border-l border-white/10 backdrop-blur-3xl">
                <Badge variant="primary" className="w-fit mb-6">
                  {t.modal_verified}
                </Badge>
                
                <h3 className="text-headline-md font-semibold tracking-tight mb-2 text-text-main">{t.items[selectedImage.id as keyof typeof t.items].title}</h3>
                <p className="text-primary font-medium pb-6 border-b border-white/10 mb-6">{t.modal_photo_by} {t.items[selectedImage.id as keyof typeof t.items].photographer}</p>
                
                <div className="flex flex-col gap-8">
                  <div>
                    <h4 className="text-label-sm uppercase text-text-faint mb-3 flex items-center gap-2">
                       <Telescope className="w-4 h-4 text-primary" /> {t.modal_hardware}
                    </h4>
                      <p className="text-body-sm font-medium text-text-soft">{t.items[selectedImage.id as keyof typeof t.items].equipment}</p>
                  </div>
                  <div>
                    <h4 className="text-label-sm uppercase text-text-faint mb-3 flex items-center gap-2">
                       <MapPin className="w-4 h-4 text-primary" /> {t.modal_capture}
                    </h4>
                    <div className="bg-surface-container-high border border-white/5 rounded-xl p-4 shadow-inner">
                      <p className="text-body-sm font-medium text-text-soft">{t.items[selectedImage.id as keyof typeof t.items].location}</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-auto pt-6 border-t border-white/10">
                   <p className="text-body-sm text-text-faint leading-relaxed font-normal">
                     {t.modal_note}
                   </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </SectionContainer>
  );
}
