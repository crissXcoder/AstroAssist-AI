import type {
  Product,
  CuratedSetup,
  CatalogFilters,
  ScoredProduct,
  ObservationType,
  SkyCondition,
} from "@/features/catalog";
import productsData from "@/features/catalog/data/products.json";
import setupsData from "@/features/catalog/data/setups.json";

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
 * Returns a single setup by ID.
 */
export function getSetupById(id: string): CuratedSetup | undefined {
  return allSetups.find((s) => s.id === id);
}

/**
 * Returns all curated setups.
 */
export function getAllSetups(): CuratedSetup[] {
  return allSetups;
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

/**
 * Enhanced Related Products Logic
 * Scores products based on multiple factors:
 * - Compatibility (Strongest signal): +10
 * - Same Category: +5
 * - Same Observation Type: +4
 * - Recommended Level (Exact: +3, Adjacent: +1)
 * - Matching Tags: +1 per common tag
 */
export function getRelatedProducts(
  currentProduct: Product,
  limit: number = 4
): Product[] {
  const scored = allProducts
    .filter(p => p.id !== currentProduct.id)
    .map(product => {
      let score = 0;

      // 1. Compatibility (Highest weight)
      if (
        currentProduct.compatibility.includes(product.id) ||
        product.compatibility.includes(currentProduct.id)
      ) {
        score += 10;
      }

      // 2. Same Category
      if (product.category === currentProduct.category) {
        score += 5;
      }

      // 3. Observation Type (Goal)
      if (product.observationType === currentProduct.observationType) {
        score += 4;
      }

      // 4. Recommended Level
      const levels = ["beginner", "intermediate", "advanced"];
      const currentIdx = levels.indexOf(currentProduct.recommendedLevel);
      const otherIdx = levels.indexOf(product.recommendedLevel);
      if (currentIdx === otherIdx) {
        score += 3;
      } else if (Math.abs(currentIdx - otherIdx) === 1) {
        score += 1;
      }

      // 5. Shared Tags
      const commonTags = product.tags.filter(tag => currentProduct.tags.includes(tag));
      score += commonTags.length;

      return { product, score };
    });

  // Sort by score descending
  scored.sort((a, b) => b.score - a.score);

  // Take top results
  let results = scored.filter(s => s.score > 0).map(s => s.product);

  // Fallback: If not enough results, add products from same category or observation type
  if (results.length < limit) {
    const existingIds = new Set(results.map(r => r.id));
    const fallbacks = allProducts
      .filter(p => p.id !== currentProduct.id && !existingIds.has(p.id))
      .sort((a, b) => {
        // Simple fallback sort: same category first
        if (a.category === currentProduct.category && b.category !== currentProduct.category) return -1;
        if (a.category !== currentProduct.category && b.category === currentProduct.category) return 1;
        return 0;
      });
    
    results = [...results, ...fallbacks].slice(0, limit);
  }

  return results.slice(0, limit);
}

/**
 * Returns recommendations based on a collection of products (e.g. a shopping cart).
 * Prioritizes compatibility and accessories.
 */
export function getRecommendedForCart(
  cartProducts: Product[],
  limit: number = 4
): Product[] {
  if (cartProducts.length === 0) {
    // If cart is empty, return top-rated or general recommendations
    return allProducts.slice(0, limit);
  }

  const existingIds = new Set(cartProducts.map(p => p.id));
  
  // Aggregate scores from all products in cart
  const scores: Record<string, number> = {};

  cartProducts.forEach(currentProduct => {
    const related = getRelatedProducts(currentProduct, allProducts.length);
    related.forEach((p, idx) => {
      if (existingIds.has(p.id)) return;
      
      // Simple inverse rank scoring + baseline
      const rankScore = Math.max(0, 10 - idx);
      scores[p.id] = (scores[p.id] || 0) + rankScore;
    });
  });

  const sortedIds = Object.keys(scores).sort((a, b) => scores[b] - scores[a]);
  const results = sortedIds
    .map(id => getProductById(id))
    .filter((p): p is Product => p !== undefined)
    .slice(0, limit);

  // If still not enough, add general fallbacks
  if (results.length < limit) {
    const resultsIds = new Set(results.map(r => r.id));
    const fallbacks = allProducts
      .filter(p => !existingIds.has(p.id) && !resultsIds.has(p.id))
      .slice(0, limit - results.length);
    return [...results, ...fallbacks];
  }

  return results;
}
