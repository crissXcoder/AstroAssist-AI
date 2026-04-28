import { CartItem, CartSummary } from "@/features/cart/types";

export type PaymentMethod = "credit_card" | "paypal" | "transfer";
export type ShippingMethod = "standard" | "pickup";
export type CheckoutStep = "shipping" | "payment" | "success";

export interface ShippingAddress {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  zipCode: string;
  notes?: string;
}

export interface CheckoutDraft {
  shippingAddress: ShippingAddress | null;
  paymentMethod: PaymentMethod;
  shippingMethod: ShippingMethod;
  items: CartItem[];
  summary: CartSummary;
}

export interface Order extends CheckoutDraft {
  id: string;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  createdAt: string;
}

