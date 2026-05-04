"use client";

import React, { createContext, useContext, useReducer, useEffect, useState, useMemo, useCallback } from "react";
import { CartItem, CartState, CartAction, CartSummary } from "../types";
import { calculateCartSummary, validateQuantity } from "../utils/cart-logic";
import { mapProductToCartItem } from "../utils/cartMapper";
import { Product } from "@/features/catalog/types";

import productsData from "@/features/catalog/data/products.json";

const CART_STORAGE_KEY = "astroassist-cart";

const initialState: CartState = {
  items: [],
  isOpen: false,
};

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const { product, quantity } = action.payload;
      const validatedQty = validateQuantity(quantity);
      const existingItemIndex = state.items.findIndex((item) => item.productId === product.id);

      if (existingItemIndex > -1) {
        const newItems = [...state.items];
        newItems[existingItemIndex].quantity = validateQuantity(newItems[existingItemIndex].quantity + validatedQty);
        return { ...state, items: newItems, isOpen: true };
      }

      const newItem = mapProductToCartItem(product, validatedQty);

      return { ...state, items: [...state.items, newItem], isOpen: true };
    }

    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter((item) => item.productId !== action.payload.productId),
      };

    case "UPDATE_QUANTITY": {
      const { productId, quantity } = action.payload;
      return {
        ...state,
        items: state.items.map((item) =>
          item.productId === productId ? { ...item, quantity: validateQuantity(quantity) } : item
        ),
      };
    }

    case "INCREMENT_QUANTITY":
      return {
        ...state,
        items: state.items.map((item) =>
          item.productId === action.payload.productId ? { ...item, quantity: validateQuantity(item.quantity + 1) } : item
        ),
      };

    case "DECREMENT_QUANTITY":
      return {
        ...state,
        items: state.items.map((item) =>
          item.productId === action.payload.productId
            ? { ...item, quantity: validateQuantity(item.quantity - 1) }
            : item
        ),
      };

    case "CLEAR_CART":
      return { ...state, items: [] };

    case "ADD_BUNDLE": {
      const { products } = action.payload;
      const newItems = [...state.items];

      products.forEach((product) => {
        const existingItemIndex = newItems.findIndex((item) => item.productId === product.id);
        if (existingItemIndex > -1) {
          newItems[existingItemIndex].quantity = validateQuantity(newItems[existingItemIndex].quantity + 1);
        } else {
          newItems.push(mapProductToCartItem(product, 1));
        }
      });

      return { ...state, items: newItems, isOpen: true }; // Open cart when bundle added
    }

    case "SET_CART":
      return { ...state, items: action.payload };

    case "TOGGLE_CART":
      return { ...state, isOpen: !state.isOpen };

    case "SET_OPEN":
      return { ...state, isOpen: action.payload };

    default:
      return state;
  }
}

interface CartContextType extends CartState {
  summary: CartSummary;
  addItem: (product: Product, quantity?: number) => void;
  addBundle: (products: Product[]) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  incrementQuantity: (productId: string) => void;
  decrementQuantity: (productId: string) => void;
  clearCart: () => void;
  toggleCart: () => void;
  setOpen: (isOpen: boolean) => void;
  isInCart: (productId: string) => boolean;
  getItemQuantity: (productId: string) => number;
  isHydrated: boolean;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const [isHydrated, setIsHydrated] = useState(false);

  // Persistence: Load from localStorage & Cleanup stale items
  useEffect(() => {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (savedCart) {
      try {
        const items: CartItem[] = JSON.parse(savedCart);
        
        // Filter out items that are no longer in the catalog
        const validItems = items.filter(item => 
          productsData.some(p => p.id === item.productId)
        );
        
        // Re-validate all quantities just in case
        const sanitizedItems = validItems.map(item => ({
          ...item,
          quantity: validateQuantity(item.quantity)
        }));

        dispatch({ type: "SET_CART", payload: sanitizedItems });
      } catch (error) {
        console.error("Failed to parse cart from localStorage", error);
      }
    }
    // Defer hydration flag to avoid set-state-in-effect warning
    const timer = setTimeout(() => {
      setIsHydrated(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  // Persistence: Save to localStorage
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state.items));
    }
  }, [state.items, isHydrated]);

  const summary = useMemo(() => calculateCartSummary(state.items), [state.items]);

  const addItem = useCallback((product: Product, quantity = 1) => 
    dispatch({ type: "ADD_ITEM", payload: { product, quantity } }), []);

  const addBundle = useCallback((products: Product[]) => 
    dispatch({ type: "ADD_BUNDLE", payload: { products } }), []);

  const removeItem = useCallback((productId: string) => 
    dispatch({ type: "REMOVE_ITEM", payload: { productId } }), []);

  const updateQuantity = useCallback((productId: string, quantity: number) =>
    dispatch({ type: "UPDATE_QUANTITY", payload: { productId, quantity } }), []);

  const incrementQuantity = useCallback((productId: string) => 
    dispatch({ type: "INCREMENT_QUANTITY", payload: { productId } }), []);

  const decrementQuantity = useCallback((productId: string) => 
    dispatch({ type: "DECREMENT_QUANTITY", payload: { productId } }), []);

  const clearCart = useCallback(() => dispatch({ type: "CLEAR_CART" }), []);
  const toggleCart = useCallback(() => dispatch({ type: "TOGGLE_CART" }), []);
  const setOpen = useCallback((isOpen: boolean) => 
    dispatch({ type: "SET_OPEN", payload: isOpen }), []);

  const isInCart = useCallback((productId: string) => 
    state.items.some((item) => item.productId === productId), [state.items]);

  const getItemQuantity = useCallback((productId: string) => 
    state.items.find((item) => item.productId === productId)?.quantity || 0, [state.items]);

  const contextValue = useMemo(() => ({
    ...state,
    summary,
    addItem,
    addBundle,
    removeItem,
    updateQuantity,
    incrementQuantity,
    decrementQuantity,
    clearCart,
    toggleCart,
    setOpen,
    isInCart,
    getItemQuantity,
    isHydrated,
  }), [
    state,
    summary,
    addItem,
    addBundle,
    removeItem,
    updateQuantity,
    incrementQuantity,
    decrementQuantity,
    clearCart,
    toggleCart,
    setOpen,
    isInCart,
    getItemQuantity,
    isHydrated,
  ]);

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
}

export function useCartContext() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCartContext must be used within a CartProvider");
  }
  return context;
}
