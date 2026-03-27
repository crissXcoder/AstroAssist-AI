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
  
  // Filter relevant products
  const relevantProducts = products.filter(p => {
    if (intent === "general") return false;
    const categoryMatch = q.includes(p.category.toLowerCase().slice(0, -1)); // fuzzy match for category
    const nameMatch = q.includes(p.nameEn.toLowerCase()) || q.includes(p.nameEs.toLowerCase());
    const tagMatch = p.tags.some(t => q.includes(t.toLowerCase()));
    
    return categoryMatch || nameMatch || tagMatch;
  }).slice(0, 5);

  if (relevantProducts.length === 0) {
    // Return a default set of popular products if no specific match but it's a discovery intent
    if (intent === "discovery") {
      return products.slice(0, 3).map(formatProductForContext).join("\n---\n");
    }
    return "No specific product context available.";
  }

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
