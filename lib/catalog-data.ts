import images from "@/lib/images.json";

export type ProductCategory = "Telescopios" | "Monturas" | "Cámaras" | "Accesorios";

export interface CatalogProduct {
  id: string;
  name: string;
  description: string;
  price: string;
  tags: string[];
  image: string;
  category: ProductCategory;
}

export const catalogData: CatalogProduct[] = [
  {
    id: "celestron-130slt",
    name: "Celestron NexStar 130SLT",
    description: "Telescopio Newtoniano Computarizado ideal para observadores lunares y planetarios. Seguimiento sideral de alta precisión interconectado.",
    price: "$649.00",
    tags: ["Principiante", "Automático"],
    category: "Telescopios",
    image: images.products["celestron-130slt"]
  },
  {
    id: "sw-eq6r",
    name: "Sky-Watcher EQ6-R Pro",
    description: "Montura Ecuatorial Alemana ultra-precisa con tracción por correas. La espina dorsal de la astrofotografía premium de grado observatorio.",
    price: "$2,025.00",
    tags: ["Avanzado", "Precisa"],
    category: "Monturas",
    image: images.products["sw-eq6r"]
  },
  {
    id: "zwo-533mc",
    name: "ZWO ASI533MC Pro",
    description: "Sensor CMOS a color con refrigeración termoeléctrica extrema (Peltier) garantizando el mínimo ruido en exposiciones cósmicas ultra-largas.",
    price: "$799.00",
    tags: ["Astrofotografía", "Sensor CMOS"],
    category: "Cámaras",
    image: images.products["zwo-533mc"]
  },
  {
    id: "celestron-edge",
    name: "Celestron EdgeHD 8\"",
    description: "Tubo Óptico avanzado con corrección de coma y campo hiper-plano. Transmisión StarBright XLT para resolución profunda implacable.",
    price: "$1,499.00",
    tags: ["Profesional", "Alta Resolución"],
    category: "Telescopios",
    image: images.products["celestron-edge"]
  },
  {
    id: "zwo-eaf",
    name: "ZWO EAF Focuser 5V",
    description: "Micro-focalizador electrónico avanzado para ajustes sub-milimétricos de óptica remota sin vibración ambiental inter-fásica.",
    price: "$199.00",
    tags: ["Accesorios", "IA Sync"],
    category: "Accesorios",
    image: images.products["zwo-eaf"]
  },
  {
    id: "optolong-lpro",
    name: "Optolong L-eXtreme 2\"",
    description: "Filtro de doble banda pasante estricto para Ha y OIII. Perfora cielos fuertemente polucionados (Bortle 8).",
    price: "$309.00",
    tags: ["Banda Estrecha", "Bortle 8"],
    category: "Accesorios",
    image: images.products["optolong-lpro"]
  }
];
