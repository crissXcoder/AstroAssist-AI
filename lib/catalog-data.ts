import type { Product } from "@/types/catalog";
import productsData from "@/data/products.json";
import setupsData from "@/data/setups.json";

// Export the old CatalogProduct interface for backward compat with setup builder engine
export type { ProductCategory } from "@/types/catalog";
export type CatalogProduct = Product;

export const catalogData: Product[] = productsData as Product[];
