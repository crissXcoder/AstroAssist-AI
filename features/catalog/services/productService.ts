import productsData from "../data/products.json";
import { Product, ProductCategory } from "../types";
import { parsePrice } from "@/shared/utils/currency";

/**
 * Service to handle product data access and normalization.
 * Prepared for future backend integration.
 */
class ProductService {
  private products: Product[];

  constructor() {
    // Initialize and normalize products from local JSON
    this.products = (productsData as any[]).map((p) => ({
      ...p,
      priceValue: parsePrice(p.price),
    })) as Product[];
  }

  /**
   * Returns all products in the catalog.
   */
  async getProducts(): Promise<Product[]> {
    return this.products;
  }

  /**
   * Finds a product by its unique ID.
   */
  async getProductById(id: string): Promise<Product | undefined> {
    return this.products.find((p) => p.id === id);
  }

  /**
   * Returns products belonging to a specific category.
   */
  async getProductsByCategory(category: ProductCategory): Promise<Product[]> {
    return this.products.filter((p) => p.category === category);
  }

  /**
   * Returns products related to the given one (basic logic based on category).
   */
  async getRelatedProducts(product: Product, limit: number = 3): Promise<Product[]> {
    return this.products
      .filter((p) => p.category === product.category && p.id !== product.id)
      .slice(0, limit);
  }

  /**
   * Search products by name or tags.
   */
  async searchProducts(query: string): Promise<Product[]> {
    const q = query.toLowerCase();
    return this.products.filter(
      (p) =>
        p.nameEn.toLowerCase().includes(q) ||
        p.nameEs.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
    );
  }
}

export const productService = new ProductService();
