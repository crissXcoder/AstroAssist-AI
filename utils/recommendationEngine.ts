import type {
  Product,
  CuratedSetup,
  CatalogFilters,
  ScoredProduct,
  ObservationType,
  SkyCondition,
} from "@/types/catalog";
import productsData from "@/data/products.json";
import setupsData from "@/data/setups.json";

// Cast JSON imports to typed arrays
const allProducts = productsData as Product[];
const allSetups = setupsData as CuratedSetup[];

/**
 * Score a product against the active filters.
 * Higher score = better match. Returns 0 means no hard conflict.
 */
function scoreProduct(product: Product, filters: CatalogFilters): ScoredProduct {
  let score = 0;
  const matchReasons: string[] = [];

  // Hard filter: category
  if (filters.category && product.category !== filters.category) {
    return { product, score: -1, matchReasons: [] };
  }

  // Hard filter: search
  if (filters.search) {
    const q = filters.search.toLowerCase();
    const searchable = [
      product.nameEn,
      product.nameEs,
      product.descriptionEn,
      product.descriptionEs,
      ...product.tags,
    ]
      .join(" ")
      .toLowerCase();
    if (!searchable.includes(q)) {
      return { product, score: -1, matchReasons: [] };
    }
    score += 2;
  }

  // Soft: experience level
  if (filters.level) {
    if (product.recommendedLevel === filters.level) {
      score += 4;
      matchReasons.push("level");
    } else {
      // Adjacent levels get partial credit
      const levels = ["beginner", "intermediate", "advanced"];
      const filterIdx = levels.indexOf(filters.level);
      const productIdx = levels.indexOf(product.recommendedLevel);
      if (Math.abs(filterIdx - productIdx) === 1) {
        score += 1;
      }
    }
  }

  // Soft: observation goal
  if (filters.goal) {
    // Map goal to observationType equivalents
    const goalMap: Record<ObservationType, ObservationType[]> = {
      planetary: ["planetary", "general"],
      deep_sky: ["deep_sky", "astrophotography", "general"],
      astrophotography: ["astrophotography"],
      general: ["planetary", "deep_sky", "astrophotography", "general"],
    };
    const compatibleTypes = goalMap[filters.goal];
    if (compatibleTypes.includes(product.observationType)) {
      score += 4;
      matchReasons.push("goal");
    }
  }

  // Soft: sky condition
  if (filters.sky) {
    if (product.skyCondition === filters.sky) {
      score += 3;
      matchReasons.push("sky");
    } else {
      // City-friendly products work everywhere; dark sky products need good skies
      const skyLevels: SkyCondition[] = ["city", "suburban", "dark_sky"];
      const filterIdx = skyLevels.indexOf(filters.sky);
      const productIdx = skyLevels.indexOf(product.skyCondition);
      // Products designed for darker skies than user has → partial penalty
      if (productIdx > filterIdx) {
        score -= 1;
      } else {
        score += 1; // Products for worse skies are fine in better skies
      }
    }
  }

  // Soft: portability
  if (filters.portability) {
    if (product.portability === filters.portability) {
      score += 2;
      matchReasons.push("portability");
    }
  }

  return { product, score, matchReasons };
}

/**
 * Returns all products filtered and sorted by relevance score.
 * Products with score === -1 (hard exclusions) are removed.
 */
export function getFilteredProducts(filters: CatalogFilters): ScoredProduct[] {
  const scored = allProducts
    .map((p) => scoreProduct(p, filters))
    .filter((s) => s.score >= 0);

  // Sort by score descending; keep original order for equal scores
  scored.sort((a, b) => b.score - a.score);

  return scored;
}

/**
 * Returns all products (unfiltered), for use in non-catalog contexts.
 */
export function getAllProducts(): Product[] {
  return allProducts;
}

/**
 * Returns a single product by ID.
 */
export function getProductById(id: string): Product | undefined {
  return allProducts.find((p) => p.id === id);
}

/**
 * Returns curated setups matched to the active filters.
 * If no filters are active, returns all setups.
 */
export function getRelevantSetups(filters: CatalogFilters): CuratedSetup[] {
  const hasFilters =
    filters.level || filters.goal || filters.sky;

  if (!hasFilters) return allSetups;

  return allSetups.filter((setup) => {
    let matches = 0;
    let checks = 0;

    if (filters.level) {
      checks++;
      const levels = ["beginner", "intermediate", "advanced"];
      const filterIdx = levels.indexOf(filters.level);
      const setupIdx = levels.indexOf(setup.recommendedLevel);
      if (Math.abs(filterIdx - setupIdx) <= 1) matches++;
    }

    if (filters.goal) {
      checks++;
      // Map observationType to setup goal (slightly different vocabulary)
      const goalEquivalents: Record<string, string[]> = {
        planetary: ["planetary", "general"],
        deep_sky: ["deep_sky", "general"],
        astrophotography: ["astrophotography"],
        general: ["planetary", "deep_sky", "astrophotography", "general"],
      };
      if (goalEquivalents[filters.goal]?.includes(setup.goal)) matches++;
    }

    if (filters.sky) {
      checks++;
      const skyLevels: SkyCondition[] = ["city", "suburban", "dark_sky"];
      const filterIdx = skyLevels.indexOf(filters.sky);
      const setupIdx = skyLevels.indexOf(setup.skyCondition);
      // Setup designed for darker sky than user has → not great match
      if (setupIdx <= filterIdx + 1) matches++;
    }

    // Show setup if it matches at least half the active filters
    return checks === 0 || matches >= Math.ceil(checks / 2);
  });
}

/**
 * Returns products belonging to a specific curated setup (main + accessories).
 */
export function getSetupProducts(setup: CuratedSetup): {
  main: Product[];
  accessories: Product[];
} {
  const main = setup.productIds
    .map((id) => getProductById(id))
    .filter((p): p is Product => p !== undefined);
  const accessories = setup.accessoryIds
    .map((id) => getProductById(id))
    .filter((p): p is Product => p !== undefined);
  return { main, accessories };
}
