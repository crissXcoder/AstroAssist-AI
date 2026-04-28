import { Order, CheckoutDraft } from "../types";

const ORDERS_STORAGE_KEY = "astroassist_orders";

/**
 * Generate a unique Order ID with the ASTRO- prefix
 */
export function generateOrderId(): string {
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `ASTRO-${timestamp}${random}`;
}

/**
 * Save a new order to localStorage
 */
export function saveOrder(draft: CheckoutDraft): Order {
  const newOrder: Order = {
    ...draft,
    id: generateOrderId(),
    status: "pending",
    createdAt: new Date().toISOString(),
  };

  try {
    const existingOrdersJson = localStorage.getItem(ORDERS_STORAGE_KEY);
    const existingOrders: Order[] = existingOrdersJson ? JSON.parse(existingOrdersJson) : [];
    
    const updatedOrders = [newOrder, ...existingOrders];
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(updatedOrders));
  } catch (error) {
    console.error("Error saving order to localStorage:", error);
  }

  return newOrder;
}

/**
 * Get all orders from localStorage
 */
export function getOrders(): Order[] {
  try {
    const ordersJson = localStorage.getItem(ORDERS_STORAGE_KEY);
    return ordersJson ? JSON.parse(ordersJson) : [];
  } catch (error) {
    console.error("Error getting orders from localStorage:", error);
    return [];
  }
}

/**
 * Get a specific order by ID
 */
export function getOrderById(id: string): Order | undefined {
  const orders = getOrders();
  return orders.find(order => order.id === id);
}
