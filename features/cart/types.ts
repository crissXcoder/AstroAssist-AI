import { Product } from "../catalog/types";

export interface CartItem {
  id: string; // productId
  productId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  category: string;
}

export interface CartSummary {
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  totalItems: number;
  totalUniqueItems: number;
}

export interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

export type CartAction =
  | { type: "ADD_ITEM"; payload: { product: Product; quantity: number } }
  | { type: "REMOVE_ITEM"; payload: { productId: string } }
  | { type: "UPDATE_QUANTITY"; payload: { productId: string; quantity: number } }
  | { type: "INCREMENT_QUANTITY"; payload: { productId: string } }
  | { type: "DECREMENT_QUANTITY"; payload: { productId: string } }
  | { type: "CLEAR_CART" }
  | { type: "ADD_BUNDLE"; payload: { products: Product[] } }
  | { type: "SET_CART"; payload: CartItem[] }
  | { type: "TOGGLE_CART" }
  | { type: "SET_OPEN"; payload: boolean };
