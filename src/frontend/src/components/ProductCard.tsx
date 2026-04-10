import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useCart } from "@/hooks/useCart";
import { cn, formatPrice } from "@/lib/utils";
import type { Product } from "@/types/index";
import { useNavigate } from "@tanstack/react-router";
import { ShoppingCart, Zap } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

interface ProductCardProps {
  product: Product;
  className?: string;
}

const CATEGORY_LABELS: Record<string, string> = {
  proteins: "Protein",
  preWorkout: "Pre-Workout",
  postWorkout: "Post-Workout",
  vitamins: "Vitamins",
  accessories: "Accessories",
};

const PLACEHOLDER_GRADIENT = [
  "from-primary/20 to-primary/5",
  "from-accent/20 to-accent/5",
  "from-secondary/40 to-secondary/10",
  "from-chart-4/20 to-chart-4/5",
  "from-chart-5/20 to-chart-5/5",
];

export function ProductCard({ product, className }: ProductCardProps) {
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [selectedVariant, setSelectedVariant] = useState(0);

  const variant = product.sizeVariants[selectedVariant];
  const priceInCents = variant ? Number(variant.priceInCents) : 0;
  const lowestPrice =
    product.sizeVariants.length > 0
      ? Number(
          product.sizeVariants.reduce(
            (min, v) => (v.priceInCents < min.priceInCents ? v : min),
            product.sizeVariants[0],
          ).priceInCents,
        )
      : 0;
  const gradientIdx = Number(product.id) % PLACEHOLDER_GRADIENT.length;
  const proteinG = product.nutritionFacts
    ? Number(product.nutritionFacts.protein)
    : null;

  function handleAddToCart(e: React.MouseEvent) {
    e.stopPropagation();
    if (!variant) return;
    addItem({
      productId: product.id.toString(),
      variantIndex: selectedVariant,
      productName: product.name,
      variantName: variant.name,
      priceInCents,
      imageId: product.imageId,
    });
    toast.success(`${product.name} added to cart`, {
      description: `${variant.name} · ${formatPrice(priceInCents)}`,
    });
  }

  function handleCardClick() {
    navigate({ to: "/product/$id", params: { id: product.id.toString() } });
  }

  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={cn("h-full", className)}
    >
      <Card
        data-ocid="product-card"
        onClick={handleCardClick}
        className="group relative flex flex-col h-full cursor-pointer overflow-hidden border border-border hover:border-primary/40 hover:shadow-lift transition-smooth rounded-sm"
      >
        {/* Image area */}
        <div
          className={cn(
            "relative flex items-center justify-center bg-gradient-to-br h-48 overflow-hidden",
            PLACEHOLDER_GRADIENT[gradientIdx],
          )}
        >
          {product.imageId ? (
            <img
              src={`/api/assets/${product.imageId}`}
              alt={product.name}
              className="h-full w-full object-cover group-hover:scale-105 transition-smooth"
            />
          ) : (
            <div className="flex flex-col items-center gap-1 opacity-40">
              <Zap className="h-10 w-10 text-primary" />
              <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
                {CATEGORY_LABELS[product.category] ?? product.category}
              </span>
            </div>
          )}

          {/* Protein badge — top right corner (reference design) */}
          {proteinG !== null && (
            <div className="absolute top-2 right-2 flex flex-col items-center justify-center bg-accent text-accent-foreground rounded-sm px-2 py-1 min-w-[46px] shadow-lift">
              <span className="text-base font-bold font-display leading-none">
                {proteinG}g
              </span>
              <span className="text-[9px] font-bold uppercase tracking-widest leading-none mt-0.5">
                protein
              </span>
            </div>
          )}

          {/* Category badge — top left */}
          <span className="absolute top-2 left-2 badge-accent text-[10px] uppercase tracking-wider">
            {CATEGORY_LABELS[product.category] ?? product.category}
          </span>

          {/* Out of stock overlay */}
          {!product.inStock && (
            <div className="absolute inset-0 bg-background/70 flex items-center justify-center">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
                Out of Stock
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 p-4 gap-2">
          <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wide truncate">
            {product.brand}
          </p>
          <h3 className="font-display font-bold text-sm leading-tight line-clamp-2 text-foreground group-hover:text-primary transition-colors duration-200">
            {product.name}
          </h3>

          {/* Product type tag */}
          {product.productType && (
            <p className="text-[11px] text-muted-foreground truncate">
              {product.productType}
            </p>
          )}

          {/* Size selector */}
          {product.sizeVariants.length > 1 && (
            <div
              className="flex flex-wrap gap-1 mt-auto pt-2"
              onClick={(e) => e.stopPropagation()}
              onKeyDown={(e) => e.stopPropagation()}
            >
              {product.sizeVariants.map((v, i) => (
                <button
                  key={v.name}
                  type="button"
                  data-ocid="variant-selector"
                  onClick={() => setSelectedVariant(i)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ")
                      setSelectedVariant(i);
                  }}
                  className={cn(
                    "text-[10px] px-2 py-0.5 border rounded-sm font-medium transition-smooth",
                    selectedVariant === i
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border text-muted-foreground hover:border-primary/50",
                  )}
                >
                  {v.name}
                </button>
              ))}
            </div>
          )}

          {/* Price + CTA */}
          <div className="flex items-center justify-between mt-auto pt-3 gap-2">
            <div className="min-w-0">
              {product.sizeVariants.length > 1 && selectedVariant === 0 && (
                <span className="text-[10px] text-muted-foreground mr-1">
                  from
                </span>
              )}
              <span className="font-display font-bold text-base text-foreground">
                {formatPrice(
                  selectedVariant === 0 ? lowestPrice : priceInCents,
                )}
              </span>
            </div>
            <Button
              data-ocid="add-to-cart-btn"
              size="sm"
              variant="default"
              disabled={!product.inStock}
              onClick={handleAddToCart}
              className="gap-1.5 text-xs shrink-0"
              aria-label={`Add ${product.name} to cart`}
            >
              <ShoppingCart className="h-3.5 w-3.5" />
              Add to Cart
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

// Skeleton for loading states
export function ProductCardSkeleton() {
  return (
    <Card className="overflow-hidden border border-border rounded-sm animate-pulse flex flex-col">
      <div className="h-48 bg-muted/60" />
      <div className="p-4 flex flex-col gap-3">
        <div className="h-3 bg-muted rounded w-1/3" />
        <div className="h-4 bg-muted rounded w-3/4" />
        <div className="h-3 bg-muted rounded w-full" />
        <div className="h-3 bg-muted rounded w-2/3" />
        <div className="flex justify-between items-center mt-3">
          <div className="h-5 bg-muted rounded w-16" />
          <div className="h-8 bg-muted rounded w-20" />
        </div>
      </div>
    </Card>
  );
}
