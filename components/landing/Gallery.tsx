"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Maximize2, Camera, Telescope, MapPin, ArrowUpRight } from "lucide-react";
import { SectionContainer } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";

const galleryData = [
  {
    id: "img1",
    src: "https://imgs.search.brave.com/jfMc9FfYARezUYWhrpeH-wwM58N_wnUUlscD6MvNsvo/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9lc3Ry/ZWxsYXN5Z2FsYXhp/YXMuY29tL3dwLWNv/bnRlbnQvdXBsb2Fk/cy8yMDIxLzAxL000/MjI1MkJNNDNORUJV/TE9TQU9SSU9OWU1B/UklBTkJOT1JJT04y/MFg2QTI1TTBXMFNX/SDk1QVBPMjUyQklN/WDI5NDI1MkJVVklS/MjUyQkNDLmpwZw",
    title: "Nebulosa de Orión (M42)",
    photographer: "Comunidad AstroAssist",
    equipment: "Sky-Watcher EQ6-R Pro + Asi533MC",
    location: "Observatorio Atacama",
    span: "col-span-1 md:col-span-2 row-span-2",
  },
  {
    id: "img2",
    src: "https://imgs.search.brave.com/AmZz5nuvPWvxQN1TVzfk3WitT_u-3x-t8iqoI2BJAHs/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9zZXJ2/aWNlcy5tZXRlb3Jl/ZC5jb20vaW1nL2Fy/dGljbGUvY3VtdWxv/LWRlLWxhcy1wbGV5/YWRlcy1jb21vLWxv/Y2FsaXphcmxvLWVu/LWVsLWNpZWxvLW5v/Y3R1cm5vLTE3NjEy/NTQxMzE5MDJfMTAy/NC5qcGVn",
    title: "Cúmulo de las Pléyades",
    photographer: "Dr. Elena M.",
    equipment: "Celestron NexStar 130SLT",
    location: "Cielo Oscuro Bortle 2",
    span: "col-span-1 md:col-span-1 row-span-1",
  },
  {
    id: "img3",
    src: "https://imgs.search.brave.com/O2z-N2hbDjAMd_uvLo91tWTZ7ImmrPE7vDeNlJ6QuZk/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWFn/ZW5lcy5lbHBhaXMu/Y29tL3Jlc2l6ZXIv/djIvT040TFdHRkZF/QVlNM1RCNFlOWDNF/UFFBSEEuanBnP2F1/dGg9NDg2OTNlY2Uw/ZDZkYTk4MzdiMjYx/ZGE1MDFlY2ZhZTk4/YTg2NGM3Njg2ZTRi/OWVmMDg0ZDhlNGU5/MWVjOGViNiZ3aWR0/aD00MTQ",
    title: "Galaxia de Andrómeda",
    photographer: "Astrofoto PRO",
    equipment: "Refractor 80mm ED",
    location: "Desierto de Mojave",
    span: "col-span-1 md:col-span-1 row-span-1",
  },
  {
    id: "img4",
    src: "https://images.unsplash.com/photo-1543722530-d2c3201371e7?q=80&w=800&auto=format&fit=crop",
    title: "Tránsito Fotográfico",
    photographer: "Carlos R.",
    equipment: "Maksutov-Cassegrain 90mm",
    location: "Montañas Rocosas",
    span: "col-span-1 md:col-span-2 row-span-1",
  },
  {
    id: "img5",
    src: "https://imgs.search.brave.com/MuyPvGq5JldQFWmwF7ov5aamRZ3-3e-d99ixGFEqV4M/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9jZG4u/ZXNvLm9yZy9pbWFn/ZXMvdGh1bWI3MDB4/L2VzbzE5MjBhLmpw/Zw",
    title: "Vía Láctea Central",
    photographer: "Cazadores de Estrellas",
    equipment: "Sony A7SIII + Lente 14mm",
    location: "Parque Nacional Teide",
    span: "col-span-1 md:col-span-1 row-span-2",
  },
  {
    id: "img6",
    src: "https://imgs.search.brave.com/LdRuaplO4bbceaK0JcJntjm4_TCgAin1njzGycoaEtw/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9wbmcu/cG5ndHJlZS5jb20v/cG5nLXZlY3Rvci8y/MDI0MDkxMy9vdXJt/aWQvcG5ndHJlZS1s/dW5hci1zdXJmYWNl/LXBuZy1pbWFnZV8x/MzU1ODcyMi5wbmc",
    title: "Superficie Lunar",
    photographer: "Instituto Astronómico",
    equipment: "Montura CEM60",
    location: "Cúpula Observatorio",
    span: "col-span-1 md:col-span-1 row-span-1",
  },
  {
    id: "img7",
    src: "https://imgs.search.brave.com/WgJsTnKG48uIe9ejdLN7i999_-e03W5k6Y5sjjy53Cg/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9jZG4u/Y3JlYXRlLnZpc3Rh/LmNvbS9hcGkvbWVk/aWEvc21hbGwvNzE0/NzA5OTg0L3N0b2Nr/LXBob3RvLXBhcnRp/YWwtc29sYXItZWNs/aXBzZS1maXJzdC1z/ZWNvbmQtY29udGFj/dHMtc3VuLXNlZW4t/c29sYXItZmlsdGVy",
    title: "Eclipse Solar Parcial",
    photographer: "M. Rodríguez",
    equipment: "Filtro Solar Baader",
    location: "Ciudad de México",
    span: "col-span-1 md:col-span-1 row-span-1",
  }
];

export function Gallery() {
  const [selectedImage, setSelectedImage] = useState<typeof galleryData[0] | null>(null);

  // Close modal on Escape
  if (typeof window !== 'undefined') {
    window.onkeydown = (e) => {
      if (e.key === 'Escape') setSelectedImage(null);
    };
  }

  return (
    <SectionContainer delay={0.3} className="py-32 relative overflow-hidden">
      {/* Immersive Deep Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-primary/10 via-background to-background pointer-events-none -z-10" />
      <div className="absolute bottom-0 w-full h-[500px] bg-linear-to-t from-background via-background/10 to-transparent pointer-events-none z-10 block" />

      <div className="container px-4 md:px-6 mx-auto relative z-20">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
          <div className="flex flex-col space-y-5 max-w-2xl">
            <Badge variant="glass" className="mb-4 bg-secondary/50 dark:bg-background/20 border-border/50 dark:border-white/10 text-foreground dark:text-white backdrop-blur-md">
              <Camera className="w-4 h-4 mr-2 inline-block" /> Galería Óptica
            </Badge>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter text-glow leading-[1.1]">
              El Universo a través de nuestras ópticas.
            </h2>
          </div>
          <p className="max-w-[700px] text-neutral-600 dark:text-neutral-400 md:text-xl font-light leading-relaxed mx-auto">
            Astrocultores y observadores de nuestra comunidad demuestran de lo que es capaz el hardware de AstroAssist.
          </p>
        </div>

        {/* Bento Grid Layout - Masonry style representation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 auto-rows-[220px] md:auto-rows-[250px]">
          {galleryData.map((img, i) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className={`relative rounded-3xl overflow-hidden group cursor-pointer border border-border/50 dark:border-white/5 bg-secondary/30 dark:bg-secondary/20 shadow-xl ${img.span}`}
              onClick={() => setSelectedImage(img)}
            >
              {/* Image with extreme slow scale on hover */}
              <img 
                src={img.src} 
                alt={img.title} 
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-[2s] ease-out will-change-transform"
              />
              
              {/* Dark overlay that fades away slightly */}
              <div className="absolute inset-0 bg-linear-to-b from-transparent via-background/20 to-background/90 opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Content overlay */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-white tracking-tight leading-tight drop-shadow-md">{img.title}</h3>
                  <div className="w-8 h-8 rounded-full bg-white/80 dark:bg-white/20 backdrop-blur-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 scale-75 group-hover:scale-100 border border-border/20 dark:border-white/20 shrink-0 ml-2">
                    <ArrowUpRight className="w-4 h-4 text-foreground dark:text-white" />
                  </div>
                </div>
                <div className="flex flex-col gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                  <p className="text-sm text-indigo-300 font-medium flex items-center gap-2">
                    <Telescope className="w-3.5 h-3.5 shrink-0" /> <span className="line-clamp-1">{img.equipment}</span>
                  </p>
                  <p className="text-xs text-slate-300 flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 shrink-0" /> <span className="line-clamp-1">{img.location}</span>
                  </p>
                </div>
              </div>
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
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/60 dark:bg-black/90 backdrop-blur-2xl"
            onClick={() => setSelectedImage(null)}
          >
            <button 
              className="absolute top-6 right-6 p-3 rounded-full bg-white dark:bg-white/5 hover:bg-neutral-100 dark:hover:bg-white/10 text-foreground dark:text-white transition-colors z-[60] border border-border/50 dark:border-white/10 shadow-lg"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-6 h-6" />
            </button>
            
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-full max-w-6xl aspect-[4/3] md:aspect-auto md:h-[80vh] rounded-[2rem] overflow-hidden glass border border-border/50 dark:border-white/10 flex flex-col md:flex-row shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:shadow-[0_0_100px_rgba(var(--primary),0.3)] bg-card border-card dark:bg-card/60"
              onClick={(e) => e.stopPropagation()} // Prevent close when clicking modal body
            >
              {/* Image Side */}
              <div className="w-full md:w-3/4 h-64 md:h-full relative bg-white dark:bg-black/60 flex items-center justify-center p-2">
                 <img 
                   src={selectedImage.src} 
                   alt={selectedImage.title}
                   className="w-full h-full object-contain drop-shadow-2xl rounded-xl"
                 />
              </div>
              
              {/* Details Side */}
              <div className="w-full md:w-1/4 h-full bg-background dark:bg-background/60 p-8 flex flex-col border-t md:border-t-0 md:border-l border-border dark:border-white/10 backdrop-blur-xl">
                <Badge variant="secondary" className="w-fit mb-6 bg-primary/20 text-primary border-primary/30 uppercase tracking-widest px-3 py-1">
                  Captura Verificada
                </Badge>
                
                <h3 className="text-3xl lg:text-4xl font-black tracking-tight mb-2 text-glow">{selectedImage.title}</h3>
                <p className="text-primary font-medium pb-6 border-b border-border/50 dark:border-white/10 mb-6">Fotografía por {selectedImage.photographer}</p>
                
                <div className="flex flex-col gap-6">
                  <div>
                    <h4 className="text-xs uppercase tracking-widest text-muted-foreground mb-2 flex items-center gap-2">
                       <Telescope className="w-4 h-4 text-primary" /> Hardware Óptico
                    </h4>
                    <p className="text-foreground font-medium text-lg">{selectedImage.equipment}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-xs uppercase tracking-widest text-muted-foreground mb-2 flex items-center gap-2">
                       <MapPin className="w-4 h-4 text-primary" /> Punto de Captura
                    </h4>
                    <p className="text-foreground font-medium">{selectedImage.location}</p>
                  </div>
                </div>
                
                <div className="mt-auto pt-6 border-t border-border/50 dark:border-white/10">
                   <p className="text-xs text-muted-foreground leading-relaxed text-pretty">
                     Esta imagen fue obtenida usando equipamiento disponible en el catálogo de AstroAssist AI. Las condiciones atmosféricas y el tiempo expuesto pueden iterar sobre el resultado final de observación visual humana.
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
