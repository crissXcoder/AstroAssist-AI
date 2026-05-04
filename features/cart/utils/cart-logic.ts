import { CartItem, CartSummary } from "../types";

/**
 * Calculates the subtotal for a single cart item.
 */
export function calculateItemSubtotal(price: number, quantity: number): number {
  return price * validateQuantity(quantity);
}

/**
 * Validates and sanitizes a quantity value.
 * Ensures it's a positive integer, defaults to 1 if invalid.
 */
export function validateQuantity(quantity: unknown): number {
  if (quantity === null || quantity === undefined) return 1;
  
  const parsed = typeof quantity === "number" ? quantity : parseInt(String(quantity), 10);
  
  if (isNaN(parsed) || parsed < 1) return 1;
  
  return Math.floor(parsed);
}

/**
 * Centralized logic for calculating the complete cart summary.
 * Can be extended later with discount codes or real tax/shipping calculations.
 */
export function calculateCartSummary(items: CartItem[]): CartSummary {
  const subtotal = items.reduce((acc, item) => {
    return acc + (item.price * validateQuantity(item.quantity));
  }, 0);

  // Future: These values could come from a shipping/tax calculation service
  const shipping = subtotal > 1500 ? 0 : 250; // Free shipping over $1500
  const taxRate = 0.15; // 15% estimated tax
  const tax = subtotal * taxRate;
  
  const total = subtotal + shipping + tax;
  const totalItems = items.reduce((acc, item) => acc + validateQuantity(item.quantity), 0);
  const totalUniqueItems = items.length;

  return {
    subtotal,
    shipping,
    tax,
    total,
    totalItems,
    totalUniqueItems,
  };
}
