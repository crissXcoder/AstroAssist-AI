// Strict TypeScript types for the AstroAssist catalog system

export type ProductCategory = "Telescopios" | "Monturas" | "Cámaras" | "Accesorios";

export type RecommendedLevel = "beginner" | "intermediate" | "advanced";

export type ObservationType = "planetary" | "deep_sky" | "astrophotography" | "general";

export type SkyCondition = "city" | "suburban" | "dark_sky";

export type Portability = "low" | "medium" | "high";

export type SetupComplexity = "easy" | "moderate" | "advanced";

export type SetupGoal = "planetary" | "deep_sky" | "astrophotography" | "general";

export interface ProductImages {
  primary: string;
  gallery?: string[];
}

export interface Product {
  id: string;
  nameEn: string;
  nameEs: string;
  category: ProductCategory;
  price: string;
  images: ProductImages;
  descriptionEn: string;
  descriptionEs: string;
  recommendedLevel: RecommendedLevel;
  observationType: ObservationType;
  skyCondition: SkyCondition;
  portability: Portability;
  setupComplexity: SetupComplexity;
  compatibility: string[];
  advantages: string[];
  idealUseCases: string[];
  tags: string[];
}

export interface CuratedSetup {
  id: string;
  nameEn: string;
  nameEs: string;
  descriptionEn: string;
  descriptionEs: string;
  productIds: string[];
  accessoryIds: string[];
  goal: SetupGoal;
  recommendedLevel: RecommendedLevel;
  skyCondition: SkyCondition;
  icon: "planet" | "galaxy" | "camera" | "star";
  reasonEn: string;
  reasonEs: string;
  tags: string[];
}

export interface CatalogFilters {
  level: RecommendedLevel | null;
  goal: ObservationType | null;
  sky: SkyCondition | null;
  portability: Portability | null;
  category: ProductCategory | null;
  search: string;
}

export interface ScoredProduct {
  product: Product;
  score: number;
  matchReasons: string[];
}
