// Re-export backend types for convenience
export type {
  Product,
  CartItem,
  Order,
  OrderItem,
  UserProfile,
  Address,
  SizeVariant,
  NutritionFacts,
  ShoppingItem,
  StripeSessionStatus,
  StripeConfiguration,
} from "../backend";

export { Category, OrderStatus, UserRole } from "../backend";

export type ProductId = bigint;
export type OrderId = bigint;
export type Timestamp = bigint;

// Frontend-only cart item (with product details denormalized)
export interface LocalCartItem {
  productId: string; // store as string for localStorage
  variantIndex: number;
  quantity: number;
  productName: string;
  variantName: string;
  priceInCents: number;
  imageId?: string;
}

export interface CartState {
  items: LocalCartItem[];
  totalItems: number;
  totalCents: number;
}
