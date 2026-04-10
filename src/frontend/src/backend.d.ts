import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type OrderId = bigint;
export type Timestamp = bigint;
export interface TransformationOutput {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export interface Address {
    street: string;
    country: string;
    city: string;
    postalCode: string;
    fullName: string;
    state: string;
}
export type ProductType = string;
export interface OrderItem {
    productId: ProductId;
    productName: string;
    variantIndex: bigint;
    quantity: bigint;
    priceInCents: bigint;
}
export interface Order {
    id: OrderId;
    status: OrderStatus;
    billingAddress?: Address;
    userId: Principal;
    createdAt: Timestamp;
    totalInCents: bigint;
    items: Array<OrderItem>;
    stripeSessionId?: string;
}
export interface http_header {
    value: string;
    name: string;
}
export interface http_request_result {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export interface ShoppingItem {
    productName: string;
    currency: string;
    quantity: bigint;
    priceInCents: bigint;
    productDescription: string;
}
export interface NutritionFacts {
    fat: bigint;
    carbs: bigint;
    calories: bigint;
    servingSize: string;
    protein: bigint;
}
export interface TransformationInput {
    context: Uint8Array;
    response: http_request_result;
}
export interface SizeVariant {
    name: string;
    priceInCents: bigint;
}
export type StripeSessionStatus = {
    __kind__: "completed";
    completed: {
        userPrincipal?: string;
        response: string;
    };
} | {
    __kind__: "failed";
    failed: {
        error: string;
    };
};
export interface StripeConfiguration {
    allowedCountries: Array<string>;
    secretKey: string;
}
export type ProductId = bigint;
export interface CartItem {
    productId: ProductId;
    variantIndex: bigint;
    quantity: bigint;
}
export interface Product {
    id: ProductId;
    inStock: boolean;
    nutritionFacts?: NutritionFacts;
    name: string;
    description: string;
    productType: ProductType;
    sizeVariants: Array<SizeVariant>;
    category: Category;
    brand: string;
    imageId?: string;
    ingredients: string;
}
export interface UserProfile {
    displayName: string;
    savedAddresses: Array<Address>;
}
export enum Category {
    preWorkout = "preWorkout",
    accessories = "accessories",
    postWorkout = "postWorkout",
    vitamins = "vitamins",
    proteins = "proteins"
}
export enum OrderStatus {
    shipped = "shipped",
    cancelled = "cancelled",
    pending = "pending",
    paid = "paid",
    delivered = "delivered"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addAddress(address: Address): Promise<void>;
    addProduct(product: Product): Promise<ProductId>;
    addToCart(item: CartItem): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    clearCart(): Promise<void>;
    confirmOrder(orderId: OrderId): Promise<void>;
    createCheckoutSession(items: Array<ShoppingItem>, successUrl: string, cancelUrl: string): Promise<string>;
    deleteProduct(id: ProductId): Promise<void>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getCart(): Promise<Array<CartItem>>;
    getMyOrders(): Promise<Array<Order>>;
    getOrderById(orderId: OrderId): Promise<Order | null>;
    getOrderHistory(): Promise<Array<Order>>;
    getProduct(id: ProductId): Promise<Product | null>;
    getProducts(): Promise<Array<Product>>;
    getProductsByCategory(category: Category): Promise<Array<Product>>;
    getStripeSessionStatus(sessionId: string): Promise<StripeSessionStatus>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    isStripeConfigured(): Promise<boolean>;
    removeAddress(index: bigint): Promise<void>;
    removeCartItem(productId: bigint, variantIndex: bigint): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    searchProducts(term: string): Promise<Array<Product>>;
    setStripeConfiguration(config: StripeConfiguration): Promise<void>;
    transform(input: TransformationInput): Promise<TransformationOutput>;
    updateCartItem(productId: bigint, variantIndex: bigint, quantity: bigint): Promise<void>;
    updateOrderStatus(orderId: OrderId, status: OrderStatus): Promise<void>;
    updateProduct(product: Product): Promise<void>;
}
