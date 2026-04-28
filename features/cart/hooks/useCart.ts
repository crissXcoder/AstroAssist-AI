"use client";

import { useCartContext } from "../context/CartContext";

/**
 * Hook to interact with the AstroAssist Cart.
 * Provides all necessary actions and state for the cart system.
 */
export function useCart() {
  const context = useCartContext();
  
  return {
    // State
    items: context.items,
    isOpen: context.isOpen,
    isHydrated: context.isHydrated,
    
    // Summary & Totals
    summary: context.summary,
    subtotal: context.summary.subtotal,
    total: context.summary.total,
    totalItems: context.summary.totalItems,
    totalUniqueItems: context.summary.totalUniqueItems,
    
    // Actions
    addItem: context.addItem,
    removeItem: context.removeItem,
    updateQuantity: context.updateQuantity,
    incrementQuantity: context.incrementQuantity,
    decrementQuantity: context.decrementQuantity,
    clearCart: context.clearCart,
    toggleCart: context.toggleCart,
    setOpen: context.setOpen,
    
    // Helpers
    isInCart: context.isInCart,
    getItemQuantity: context.getItemQuantity,
  };
}
