import productsData from "@/data/products.json";
import setupsData from "@/data/setups.json";
import type { Product, CuratedSetup } from "@/types/catalog";

const products = productsData as Product[];
const setups = setupsData as CuratedSetup[];

export type Intent = "discovery" | "purchase" | "comparison" | "technical" | "general";

/**
 * Detects the user's intent based on keywords and context.
 * This is a lightweight pre-processor to guide the system prompt.
 */
export function detectIntent(query: string): Intent {
  const q = query.toLowerCase();
  
  if (q.includes("comparar") || q.includes("vs") || q.includes("diferencia") || q.includes("mejor que") || q.includes("o el")) {
    return "comparison";
  }
  
  if (q.includes("comprar") || q.includes("precio") || q.includes("costo") || q.includes("compra") || q.includes("adquirir") || q.includes("venden")) {
    return "purchase";
  }

  if (q.includes("cómo") || q.includes("configurar") || q.includes("instalar") || q.includes("ajustes") || q.includes("exposición") || q.includes("iso") || q.includes("foco") || q.includes("problema") || q.includes("error")) {
    return "technical";
  }

  if (q.includes("recomienda") || q.includes("buscar") || q.includes("telescopio") || q.includes("setup") || q.includes("principiante") || q.includes("avanzado") || q.includes("equipo")) {
    return "discovery";
  }

  return "general";
}

/**
 * Returns a compressed string representation of relevant products for the LLM context.
 */
export function getProductContext(intent: Intent, query: string): string {
  const q = query.toLowerCase();
  
  // 1. Search for specific matches (by category, name, or tags)
  const relevantProducts = products.filter(p => {
    const categoryMatch = q.includes(p.category.toLowerCase().slice(0, -2)); // "telescopio" matches "telescopios"
    const nameMatch = q.includes(p.nameEn.toLowerCase()) || q.includes(p.nameEs.toLowerCase());
    const tagMatch = p.tags.some(t => q.includes(t.toLowerCase()));
    const descMatch = p.descriptionEs.toLowerCase().includes(q) || p.descriptionEn.toLowerCase().includes(q);
    
    return categoryMatch || nameMatch || tagMatch || (q.length > 3 && descMatch);
  }).slice(0, 6);

  // 2. If no specific matches, provide popular/essential products as fallback
  // This prevents the AI from being "blind" during discovery or general chat
  if (relevantProducts.length === 0) {
    console.log("🔍 [AI-Logic] No se encontraron coincidencias exactas, inyectando catálogo base.");
    // Return a diverse set of products: one telescope, one mount, one camera
    const fallbackProducts = [
      products.find(p => p.id === 'celestron-130slt'), // Beginner favorite
      products.find(p => p.id === 'zwo-533mc'),       // Popular camera
      products.find(p => p.id === 'sw-eq6r')          // Standard mount
    ].filter(Boolean) as Product[];

    return fallbackProducts.map(formatProductForContext).join("\n---\n");
  }

  console.log(`✅ [AI-Logic] Inyectando ${relevantProducts.length} productos relevantes.`);
  return relevantProducts.map(formatProductForContext).join("\n---\n");
}

/**
 * Helper to format product for LLM consumption
 */
function formatProductForContext(p: Product): string {
  return `
PRODUCT_ID: ${p.id}
NAME: ${p.nameEs} (${p.nameEn})
CATEGORY: ${p.category}
LEVEL: ${p.recommendedLevel}
PRICE: ${p.price}
DESCRIPTION: ${p.descriptionEs}
BEST_FOR: ${p.idealUseCases.join(", ").replace(/useCasesEn_\d/g, "General use")}
ADVANTAGES: ${p.advantages.join(", ").replace(/advantagesEn_\d/g, "High quality")}
TAGS: ${p.tags.join(", ")}
  `.trim();
}

/**
 * Returns relevant setups if the user is asking about complete kits.
 */
export function getSetupContext(query: string): string {
  const q = query.toLowerCase();
  if (!q.includes("setup") && !q.includes("kit") && !q.includes("paquete") && !q.includes("completo")) {
    return "";
  }

  return setups.map(s => `
Setup ID: ${s.id}
Name: ${s.nameEn} / ${s.nameEs}
Products: ${s.productIds.join(", ")}
Description: ${s.descriptionEn}
`).join("\n---\n");
}
