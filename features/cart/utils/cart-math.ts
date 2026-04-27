import { CartItem, CartSummary } from "../types";

/**
 * Calculates the subtotal of all items in the cart.
 */
export function calculateSubtotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

/**
 * Generates a complete cart summary including taxes and shipping.
 */
export function calculateCartSummary(items: CartItem[], shippingCost: number = 0): CartSummary {
  const subtotal = calculateSubtotal(items);
  const taxRate = 0.08; // 8% placeholder tax
  const tax = subtotal * taxRate;
  const total = subtotal + tax + shippingCost;
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return {
    subtotal,
    shipping: shippingCost,
    tax,
    total,
    itemCount,
  };
}
