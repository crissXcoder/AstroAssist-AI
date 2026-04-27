import { Product } from "../catalog/types";

export interface CartItem {
  id: string; // Composite ID if needed, or just product ID
  productId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  // Options like 'color' or 'mount-type' could go here in the future
}

export interface CartSummary {
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  itemCount: number;
}

export interface CartState {
  items: CartItem[];
  isOpen: boolean;
}
