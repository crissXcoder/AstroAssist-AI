import { CartItem, CartSummary } from "../types";

/**
 * Calculates the summary of the cart.
 */
export function calculateCartSummary(items: CartItem[]): CartSummary {
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  
  // For a frontend-only demo, we can have fixed or calculated shipping/tax
  // These could later be fetched from a service
  const shipping = subtotal > 500 ? 0 : 50; // Free shipping over $500
  const taxRate = 0.15; // 15% tax
  const tax = subtotal * taxRate;
  const total = subtotal + shipping + tax;
  
  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
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

/**
 * Validates quantity to be at least 1.
 */
export function validateQuantity(quantity: number): number {
  return Math.max(1, Math.floor(quantity));
}
