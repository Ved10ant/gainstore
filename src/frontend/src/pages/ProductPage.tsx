import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Link, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Minus,
  Package,
  Plus,
  ShoppingCart,
  Tag,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { useCart } from "../hooks/useCart";
import { useProduct } from "../hooks/useProducts";
import { formatPrice } from "../lib/utils";
import { Category } from "../types/index";
import type { NutritionFacts, Product } from "../types/index";

// ─── Helpers ────────────────────────────────────────────────────────────────

const categoryLabels: Record<string, string> = {
  [Category.proteins]: "Protein",
  [Category.preWorkout]: "Pre-Workout",
  [Category.postWorkout]: "Post-Workout",
  [Category.vitamins]: "Vitamins",
  [Category.accessories]: "Accessories",
};

const categoryColors: Record<string, string> = {
  [Category.proteins]: "bg-accent text-accent-foreground",
  [Category.preWorkout]: "bg-primary text-primary-foreground",
  [Category.postWorkout]: "bg-secondary text-secondary-foreground",
  [Category.vitamins]: "bg-muted text-foreground",
  [Category.accessories]: "bg-muted text-foreground",
};

// ─── Sub-components ──────────────────────────────────────────────────────────

function CollapsibleSection({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border border-border rounded-sm overflow-hidden">
      <button
        type="button"
        className="w-full flex items-center justify-between px-5 py-4 bg-card hover:bg-muted/40 transition-colors duration-200 text-left"
        onClick={() => setOpen((p) => !p)}
        aria-expanded={open}
      >
        <span className="font-display font-semibold text-base text-foreground">
          {title}
        </span>
        {open ? (
          <ChevronUp className="h-4 w-4 text-muted-foreground shrink-0" />
        ) : (
          <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />
        )}
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-5 py-4 bg-background text-sm text-foreground/80 leading-relaxed">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function NutritionPanel({ facts }: { facts: NutritionFacts }) {
  const rows = [
    { label: "Serving Size", value: facts.servingSize, unit: "" },
    { label: "Calories", value: Number(facts.calories), unit: "kcal" },
    { label: "Protein", value: Number(facts.protein), unit: "g" },
    { label: "Total Carbs", value: Number(facts.carbs), unit: "g" },
    { label: "Total Fat", value: Number(facts.fat), unit: "g" },
  ];

  return (
    <div className="border border-border rounded-sm overflow-hidden">
      <div className="px-5 py-3 bg-foreground text-background">
        <p className="font-display font-bold text-lg">Nutrition Facts</p>
        <p className="text-xs opacity-70 mt-0.5">Per serving</p>
      </div>
      <div className="divide-y divide-border">
        {rows.map((row, i) => (
          <div
            key={row.label}
            className={`flex items-center justify-between px-5 py-3 ${
              i === 0 ? "bg-muted/40" : "bg-background"
            }`}
          >
            <span className="text-sm font-medium text-foreground">
              {row.label}
            </span>
            <span className="text-sm font-semibold text-foreground">
              {typeof row.value === "number"
                ? `${row.value}${row.unit}`
                : row.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProductSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-16">
      <Skeleton className="aspect-square w-full rounded-sm" />
      <div className="flex flex-col gap-4">
        <Skeleton className="h-5 w-24" />
        <Skeleton className="h-9 w-3/4" />
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-8 w-20" />
        <Separator />
        <div className="flex gap-2">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-10 w-20" />
          ))}
        </div>
        <div className="flex gap-3">
          <Skeleton className="h-12 flex-1" />
          <Skeleton className="h-12 w-12" />
        </div>
      </div>
    </div>
  );
}

function NotFound() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-24 text-center"
      data-ocid="product-not-found"
    >
      <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-6">
        <Package className="h-9 w-9 text-muted-foreground" />
      </div>
      <h2 className="font-display text-2xl font-bold text-foreground mb-2">
        Product Not Found
      </h2>
      <p className="text-muted-foreground mb-8 max-w-sm">
        The product you're looking for doesn't exist or may have been removed.
      </p>
      <Button asChild variant="default">
        <Link to="/catalog" search={{ category: undefined, q: undefined }}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Catalog
        </Link>
      </Button>
    </motion.div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

export function ProductPage() {
  const { id } = useParams({ from: "/product/$id" });
  const productId = BigInt(id);

  const { data: product, isLoading, isError } = useProduct(productId);
  const { addItem } = useCart();

  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  // Reset selection when product loads
  const selectedVariant = product?.sizeVariants?.[selectedVariantIndex];

  function handleAddToCart(p: Product) {
    if (!selectedVariant) return;

    addItem({
      productId: p.id.toString(),
      variantIndex: selectedVariantIndex,
      productName: p.name,
      variantName: selectedVariant.name,
      priceInCents: Number(selectedVariant.priceInCents),
      quantity,
      imageId: p.imageId,
    });

    setAddedToCart(true);
    toast.success("Added to cart!", {
      description: `${p.name} — ${selectedVariant.name} × ${quantity}`,
      duration: 3000,
    });

    setTimeout(() => setAddedToCart(false), 2500);
  }

  return (
    <div className="bg-background min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link
              to="/"
              className="hover:text-foreground transition-colors duration-200"
            >
              Home
            </Link>
            <span>/</span>
            <Link
              to="/catalog"
              search={{ category: undefined, q: undefined }}
              className="hover:text-foreground transition-colors duration-200"
            >
              Catalog
            </Link>
            {product && (
              <>
                <span>/</span>
                <span className="text-foreground font-medium truncate max-w-[200px]">
                  {product.name}
                </span>
              </>
            )}
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Back link */}
        <Link
          to="/catalog"
          search={{ category: undefined, q: undefined }}
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 mb-8"
          data-ocid="back-to-catalog"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Catalog
        </Link>

        {isLoading && <ProductSkeleton />}
        {(isError || (!isLoading && product === null)) && <NotFound />}

        {product && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-16">
              {/* ── Left: Product Image ── */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="relative"
              >
                <div className="aspect-square w-full bg-card border border-border rounded-sm overflow-hidden flex items-center justify-center">
                  {product.imageId ? (
                    <img
                      src={`/api/images/${product.imageId}`}
                      alt={product.name}
                      className="w-full h-full object-contain p-8"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center gap-4 text-muted-foreground">
                      <div className="w-28 h-28 rounded-full bg-muted flex items-center justify-center">
                        <Package className="h-14 w-14 text-muted-foreground/40" />
                      </div>
                      <span className="text-sm font-medium">
                        No image available
                      </span>
                    </div>
                  )}

                  {/* Stock badge overlay */}
                  <div className="absolute top-4 right-4">
                    {product.inStock ? (
                      <span
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-accent text-accent-foreground shadow-lift"
                        data-ocid="stock-status-badge"
                      >
                        <CheckCircle2 className="h-3 w-3" />
                        In Stock
                      </span>
                    ) : (
                      <span
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-destructive text-destructive-foreground shadow-lift"
                        data-ocid="stock-status-badge"
                      >
                        Out of Stock
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>

              {/* ── Right: Product Details ── */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.15 }}
                className="flex flex-col gap-5"
              >
                {/* Brand + Category */}
                <div className="flex items-center gap-2 flex-wrap">
                  <span
                    className="text-xs font-bold uppercase tracking-widest text-muted-foreground"
                    data-ocid="product-brand"
                  >
                    {product.brand}
                  </span>
                  <Separator orientation="vertical" className="h-4" />
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-sm text-xs font-bold uppercase tracking-wide ${categoryColors[product.category] ?? "bg-muted text-foreground"}`}
                    data-ocid="product-category-badge"
                  >
                    <Zap className="h-3 w-3" />
                    {categoryLabels[product.category] ?? product.category}
                  </span>
                </div>

                {/* Name */}
                <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground leading-tight">
                  {product.name}
                </h1>

                {/* Type metadata */}
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge
                    variant="outline"
                    className="flex items-center gap-1.5 text-xs font-semibold"
                    data-ocid="product-type-tag"
                  >
                    <Tag className="h-3 w-3" />
                    {product.productType}
                  </Badge>
                </div>

                {/* Current price */}
                <div>
                  <p
                    className="text-4xl font-display font-bold text-foreground"
                    data-ocid="product-price"
                  >
                    {selectedVariant
                      ? formatPrice(selectedVariant.priceInCents)
                      : "—"}
                  </p>
                </div>

                <Separator />

                {/* Size Variant Selector */}
                {product.sizeVariants.length > 0 && (
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">
                      Size / Weight
                    </p>
                    <div
                      className="flex flex-wrap gap-2"
                      role="radiogroup"
                      aria-label="Select size"
                      data-ocid="size-variant-selector"
                    >
                      {product.sizeVariants.map((variant, idx) => (
                        <label
                          key={variant.name}
                          className={`cursor-pointer px-4 py-2.5 rounded-sm border text-sm font-semibold transition-smooth min-w-[72px] text-center select-none ${
                            selectedVariantIndex === idx
                              ? "border-accent bg-accent/10 text-accent-foreground ring-2 ring-accent ring-offset-1"
                              : "border-border bg-card text-foreground hover:border-accent/60 hover:bg-muted/30"
                          }`}
                          data-ocid={`size-variant-${idx}`}
                        >
                          <input
                            type="radio"
                            name="size-variant"
                            value={variant.name}
                            checked={selectedVariantIndex === idx}
                            onChange={() => setSelectedVariantIndex(idx)}
                            className="sr-only"
                          />
                          {variant.name}
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quantity Selector */}
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">
                    Quantity
                  </p>
                  <div
                    className="inline-flex items-center border border-border rounded-sm bg-card"
                    data-ocid="quantity-selector"
                  >
                    <button
                      type="button"
                      aria-label="Decrease quantity"
                      disabled={quantity <= 1}
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="flex items-center justify-center w-11 h-11 text-foreground hover:bg-muted/40 disabled:opacity-30 disabled:cursor-not-allowed transition-colors duration-200"
                      data-ocid="quantity-decrease"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-12 text-center font-bold text-lg text-foreground select-none">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      aria-label="Increase quantity"
                      onClick={() => setQuantity((q) => q + 1)}
                      className="flex items-center justify-center w-11 h-11 text-foreground hover:bg-muted/40 transition-colors duration-200"
                      data-ocid="quantity-increase"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Add to Cart */}
                <div className="flex gap-3 pt-1">
                  <Button
                    size="lg"
                    disabled={!product.inStock || addedToCart}
                    onClick={() => handleAddToCart(product)}
                    className={`flex-1 h-14 text-base font-bold font-display transition-smooth ${
                      addedToCart
                        ? "bg-accent text-accent-foreground"
                        : "bg-accent text-accent-foreground hover:bg-accent/90 active:scale-[0.98]"
                    }`}
                    data-ocid="add-to-cart-btn"
                  >
                    <AnimatePresence mode="wait">
                      {addedToCart ? (
                        <motion.span
                          key="added"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          className="flex items-center gap-2"
                        >
                          <CheckCircle2 className="h-5 w-5" />
                          Added to Cart!
                        </motion.span>
                      ) : (
                        <motion.span
                          key="add"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          className="flex items-center gap-2"
                        >
                          <ShoppingCart className="h-5 w-5" />
                          {product.inStock ? "Add to Cart" : "Out of Stock"}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </Button>
                </div>

                {/* Shipping note */}
                {product.inStock && (
                  <p className="text-xs text-muted-foreground">
                    ✓ Free shipping on orders over $75 &nbsp;·&nbsp; Ships in
                    1–3 business days
                  </p>
                )}
              </motion.div>
            </div>

            {/* ── Details Sections ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="mt-14 grid grid-cols-1 lg:grid-cols-3 gap-8"
            >
              {/* Left col: collapsible text sections */}
              <div className="lg:col-span-2 flex flex-col gap-4">
                <CollapsibleSection title="Product Description" defaultOpen>
                  <p className="whitespace-pre-line">{product.description}</p>
                </CollapsibleSection>

                {product.ingredients && (
                  <CollapsibleSection title="Ingredients">
                    <p className="whitespace-pre-line leading-relaxed">
                      {product.ingredients}
                    </p>
                  </CollapsibleSection>
                )}
              </div>

              {/* Right col: nutrition panel */}
              <div className="flex flex-col gap-4">
                {product.nutritionFacts ? (
                  <NutritionPanel facts={product.nutritionFacts} />
                ) : (
                  <div className="border border-border rounded-sm p-6 bg-card text-center text-muted-foreground text-sm">
                    <Package className="h-8 w-8 mx-auto mb-2 opacity-40" />
                    No nutrition facts available
                  </div>
                )}

                {/* Metadata card */}
                <div className="border border-border rounded-sm bg-card p-5">
                  <p className="font-display font-semibold text-sm text-foreground mb-3">
                    Product Details
                  </p>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Brand</span>
                      <span className="font-medium text-foreground">
                        {product.brand}
                      </span>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Type</span>
                      <span className="font-medium text-foreground">
                        {product.productType}
                      </span>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Category</span>
                      <span className="font-medium text-foreground">
                        {categoryLabels[product.category] ?? product.category}
                      </span>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        Availability
                      </span>
                      <span
                        className={`font-bold ${product.inStock ? "text-accent" : "text-destructive"}`}
                      >
                        {product.inStock ? "In Stock" : "Out of Stock"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
