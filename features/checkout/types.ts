import { CartItem, CartSummary } from "@/features/cart/types";

export type PaymentMethod = "credit_card" | "paypal" | "crypto";

export interface ShippingAddress {
  fullName: string;
  email: string;
  address: string;
  city: string;
  country: string;
  zipCode: string;
}

export interface CheckoutDraft {
  shippingAddress: ShippingAddress | null;
  paymentMethod: PaymentMethod | null;
  items: CartItem[];
  summary: CartSummary;
}

export interface Order extends CheckoutDraft {
  id: string;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  createdAt: string;
}
