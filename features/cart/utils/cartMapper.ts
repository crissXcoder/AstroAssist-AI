import { Product } from "@/features/catalog/types";
import { CartItem } from "../types";

/**
 * Maps a Product domain entity to a CartItem UI entity.
 * Handles locale-specific names if provided.
 */
export function mapProductToCartItem(
  product: Product, 
  quantity: number = 1,
  locale: string = "en"
): CartItem {
  return {
    id: product.id,
    productId: product.id,
    name: locale === "es" ? product.nameEs : product.nameEn,
    price: product.priceValue,
    image: product.images.primary,
    quantity,
  };
}
