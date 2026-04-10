import type { backendInterface, Category, UserRole, Product, Order, CartItem, UserProfile, Address, StripeSessionStatus, StripeConfiguration, TransformationInput, TransformationOutput } from "../backend";
import type { Principal } from "@icp-sdk/core/principal";

const sampleProducts: Product[] = [
  {
    id: BigInt(1),
    inStock: true,
    name: "Whey Protein Isolate",
    description: "Ultra-pure whey protein isolate with 27g protein per serving. Fast absorbing, low lactose, and great taste in every scoop.",
    productType: "protein",
    sizeVariants: [
      { name: "2 lbs", priceInCents: BigInt(3999) },
      { name: "5 lbs", priceInCents: BigInt(7999) },
    ],
    category: "proteins" as unknown as Category,
    brand: "IronCore Nutrition",
    ingredients: "Whey protein isolate, cocoa powder, natural flavors, sunflower lecithin, stevia",
    nutritionFacts: {
      calories: BigInt(130),
      protein: BigInt(27),
      carbs: BigInt(3),
      fat: BigInt(1),
      servingSize: "35g",
    },
  },
  {
    id: BigInt(2),
    inStock: true,
    name: "Pre-Workout Extreme",
    description: "Explosive energy, laser focus, and massive pumps. Clinically dosed formula for elite performance.",
    productType: "pre-workout",
    sizeVariants: [
      { name: "30 servings", priceInCents: BigInt(4499) },
      { name: "60 servings", priceInCents: BigInt(7999) },
    ],
    category: "preWorkout" as unknown as Category,
    brand: "ElitePump Labs",
    ingredients: "Beta-alanine, citrulline malate, caffeine anhydrous, L-theanine, B vitamins",
    nutritionFacts: {
      calories: BigInt(10),
      protein: BigInt(0),
      carbs: BigInt(2),
      fat: BigInt(0),
      servingSize: "12g",
    },
  },
  {
    id: BigInt(3),
    inStock: true,
    name: "Creatine Monohydrate",
    description: "Pharmaceutical grade creatine monohydrate. Increases strength, power, and muscle mass.",
    productType: "post-workout",
    sizeVariants: [
      { name: "300g", priceInCents: BigInt(1999) },
      { name: "1kg", priceInCents: BigInt(4999) },
    ],
    category: "postWorkout" as unknown as Category,
    brand: "IronCore Nutrition",
    ingredients: "Creatine monohydrate",
    nutritionFacts: {
      calories: BigInt(0),
      protein: BigInt(0),
      carbs: BigInt(0),
      fat: BigInt(0),
      servingSize: "5g",
    },
  },
  {
    id: BigInt(4),
    inStock: true,
    name: "Omega-3 Fish Oil",
    description: "High-potency omega-3 fatty acids for heart health, joint support, and recovery.",
    productType: "vitamins",
    sizeVariants: [
      { name: "90 softgels", priceInCents: BigInt(1899) },
      { name: "180 softgels", priceInCents: BigInt(3299) },
    ],
    category: "vitamins" as unknown as Category,
    brand: "PureVita Labs",
    ingredients: "Fish oil concentrate, gelatin capsule, vitamin E (as d-alpha tocopherol)",
    nutritionFacts: {
      calories: BigInt(15),
      protein: BigInt(0),
      carbs: BigInt(0),
      fat: BigInt(1),
      servingSize: "2 softgels",
    },
  },
  {
    id: BigInt(5),
    inStock: true,
    name: "BCAA Recovery Formula",
    description: "2:1:1 BCAA ratio for optimal muscle recovery, reduced soreness, and lean muscle preservation.",
    productType: "post-workout",
    sizeVariants: [
      { name: "30 servings", priceInCents: BigInt(2999) },
      { name: "60 servings", priceInCents: BigInt(5499) },
    ],
    category: "postWorkout" as unknown as Category,
    brand: "ElitePump Labs",
    ingredients: "L-leucine, L-isoleucine, L-valine, citric acid, natural flavors",
    nutritionFacts: {
      calories: BigInt(20),
      protein: BigInt(5),
      carbs: BigInt(0),
      fat: BigInt(0),
      servingSize: "10g",
    },
  },
  {
    id: BigInt(6),
    inStock: true,
    name: "Mass Gainer Pro",
    description: "High-calorie mass gainer with 50g protein and 250g carbs per serving. Fuel serious size gains.",
    productType: "protein",
    sizeVariants: [
      { name: "6 lbs", priceInCents: BigInt(5999) },
      { name: "12 lbs", priceInCents: BigInt(9999) },
    ],
    category: "proteins" as unknown as Category,
    brand: "BulkForce",
    ingredients: "Maltodextrin, whey protein concentrate, oat flour, flaxseed, MCT oil, vitamins & minerals",
    nutritionFacts: {
      calories: BigInt(1250),
      protein: BigInt(50),
      carbs: BigInt(250),
      fat: BigInt(8),
      servingSize: "334g",
    },
  },
];

const sampleOrders: Order[] = [
  {
    id: BigInt(1001),
    status: "paid" as unknown as any,
    userId: "aaaaa-aa" as unknown as Principal,
    createdAt: BigInt(Date.now() * 1_000_000 - 86400000 * 1_000_000),
    totalInCents: BigInt(7998),
    items: [
      {
        productId: BigInt(1),
        productName: "Whey Protein Isolate",
        variantIndex: BigInt(0),
        quantity: BigInt(2),
        priceInCents: BigInt(3999),
      },
    ],
  },
];

export const mockBackend: backendInterface = {
  _initializeAccessControl: async () => undefined,
  addAddress: async (_address: Address) => undefined,
  addProduct: async (_product: Product) => BigInt(7),
  addToCart: async (_item: CartItem) => undefined,
  assignCallerUserRole: async (_user: Principal, _role: UserRole) => undefined,
  clearCart: async () => undefined,
  confirmOrder: async (_orderId: bigint) => undefined,
  createCheckoutSession: async (_items: any[], _successUrl: string, _cancelUrl: string) => "mock_session_id",
  deleteProduct: async (_id: bigint) => undefined,
  getCallerUserProfile: async (): Promise<UserProfile | null> => ({
    displayName: "Alex Johnson",
    savedAddresses: [
      {
        fullName: "Alex Johnson",
        street: "123 Fitness Ave",
        city: "Los Angeles",
        state: "CA",
        postalCode: "90001",
        country: "US",
      },
    ],
  }),
  getCallerUserRole: async (): Promise<UserRole> => "user" as unknown as UserRole,
  getCart: async (): Promise<CartItem[]> => [
    { productId: BigInt(1), variantIndex: BigInt(0), quantity: BigInt(1) },
    { productId: BigInt(2), variantIndex: BigInt(0), quantity: BigInt(2) },
  ],
  getMyOrders: async (): Promise<Order[]> => sampleOrders,
  getOrderById: async (_orderId: bigint): Promise<Order | null> => sampleOrders[0],
  getOrderHistory: async (): Promise<Order[]> => sampleOrders,
  getProduct: async (id: bigint): Promise<Product | null> =>
    sampleProducts.find((p) => p.id === id) || null,
  getProducts: async (): Promise<Product[]> => sampleProducts,
  getProductsByCategory: async (category: Category): Promise<Product[]> =>
    sampleProducts.filter((p) => p.category === category),
  getStripeSessionStatus: async (_sessionId: string): Promise<StripeSessionStatus> => ({
    __kind__: "completed",
    completed: { userPrincipal: "aaaaa-aa", response: "paid" },
  }),
  getUserProfile: async (_user: Principal): Promise<UserProfile | null> => ({
    displayName: "Alex Johnson",
    savedAddresses: [],
  }),
  isCallerAdmin: async () => false,
  isStripeConfigured: async () => false,
  removeAddress: async (_index: bigint) => undefined,
  removeCartItem: async (_productId: bigint, _variantIndex: bigint) => undefined,
  saveCallerUserProfile: async (_profile: UserProfile) => undefined,
  searchProducts: async (term: string): Promise<Product[]> =>
    sampleProducts.filter(
      (p) => p.name.toLowerCase().includes(term.toLowerCase()) || p.brand.toLowerCase().includes(term.toLowerCase())
    ),
  setStripeConfiguration: async (_config: StripeConfiguration) => undefined,
  transform: async (input: TransformationInput): Promise<TransformationOutput> => ({
    status: BigInt(200),
    body: new Uint8Array(),
    headers: [],
  }),
  updateCartItem: async (_productId: bigint, _variantIndex: bigint, _quantity: bigint) => undefined,
  updateOrderStatus: async (_orderId: bigint, _status: any) => undefined,
  updateProduct: async (_product: Product) => undefined,
};
