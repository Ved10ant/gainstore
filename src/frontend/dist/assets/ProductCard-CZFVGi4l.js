import { j as jsxRuntimeExports, b as cn, u as useNavigate, e as useCart, r as reactExports, f as formatPrice, B as Button, g as ShoppingCart, h as ue } from "./index-BHyAZwjZ.js";
import { m as motion } from "./proxy-CajdjViD.js";
import { Z as Zap } from "./useProducts-Dz6lekZg.js";
function Card({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "card",
      className: cn(
        "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",
        className
      ),
      ...props
    }
  );
}
const CATEGORY_LABELS = {
  proteins: "Protein",
  preWorkout: "Pre-Workout",
  postWorkout: "Post-Workout",
  vitamins: "Vitamins",
  accessories: "Accessories"
};
const PLACEHOLDER_GRADIENT = [
  "from-primary/20 to-primary/5",
  "from-accent/20 to-accent/5",
  "from-secondary/40 to-secondary/10",
  "from-chart-4/20 to-chart-4/5",
  "from-chart-5/20 to-chart-5/5"
];
function ProductCard({ product, className }) {
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [selectedVariant, setSelectedVariant] = reactExports.useState(0);
  const variant = product.sizeVariants[selectedVariant];
  const priceInCents = variant ? Number(variant.priceInCents) : 0;
  const lowestPrice = product.sizeVariants.length > 0 ? Number(
    product.sizeVariants.reduce(
      (min, v) => v.priceInCents < min.priceInCents ? v : min,
      product.sizeVariants[0]
    ).priceInCents
  ) : 0;
  const gradientIdx = Number(product.id) % PLACEHOLDER_GRADIENT.length;
  const proteinG = product.nutritionFacts ? Number(product.nutritionFacts.protein) : null;
  function handleAddToCart(e) {
    e.stopPropagation();
    if (!variant) return;
    addItem({
      productId: product.id.toString(),
      variantIndex: selectedVariant,
      productName: product.name,
      variantName: variant.name,
      priceInCents,
      imageId: product.imageId
    });
    ue.success(`${product.name} added to cart`, {
      description: `${variant.name} · ${formatPrice(priceInCents)}`
    });
  }
  function handleCardClick() {
    navigate({ to: "/product/$id", params: { id: product.id.toString() } });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      whileHover: { y: -3 },
      transition: { duration: 0.2, ease: "easeOut" },
      className: cn("h-full", className),
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Card,
        {
          "data-ocid": "product-card",
          onClick: handleCardClick,
          className: "group relative flex flex-col h-full cursor-pointer overflow-hidden border border-border hover:border-primary/40 hover:shadow-lift transition-smooth rounded-sm",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: cn(
                  "relative flex items-center justify-center bg-gradient-to-br h-48 overflow-hidden",
                  PLACEHOLDER_GRADIENT[gradientIdx]
                ),
                children: [
                  product.imageId ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "img",
                    {
                      src: `/api/assets/${product.imageId}`,
                      alt: product.name,
                      className: "h-full w-full object-cover group-hover:scale-105 transition-smooth"
                    }
                  ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-1 opacity-40", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "h-10 w-10 text-primary" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-mono text-muted-foreground uppercase tracking-widest", children: CATEGORY_LABELS[product.category] ?? product.category })
                  ] }),
                  proteinG !== null && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute top-2 right-2 flex flex-col items-center justify-center bg-accent text-accent-foreground rounded-sm px-2 py-1 min-w-[46px] shadow-lift", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-base font-bold font-display leading-none", children: [
                      proteinG,
                      "g"
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] font-bold uppercase tracking-widest leading-none mt-0.5", children: "protein" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute top-2 left-2 badge-accent text-[10px] uppercase tracking-wider", children: CATEGORY_LABELS[product.category] ?? product.category }),
                  !product.inStock && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-background/70 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-widest", children: "Out of Stock" }) })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col flex-1 p-4 gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-semibold uppercase tracking-wide truncate", children: product.brand }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-sm leading-tight line-clamp-2 text-foreground group-hover:text-primary transition-colors duration-200", children: product.name }),
              product.productType && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground truncate", children: product.productType }),
              product.sizeVariants.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "flex flex-wrap gap-1 mt-auto pt-2",
                  onClick: (e) => e.stopPropagation(),
                  onKeyDown: (e) => e.stopPropagation(),
                  children: product.sizeVariants.map((v, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      "data-ocid": "variant-selector",
                      onClick: () => setSelectedVariant(i),
                      onKeyDown: (e) => {
                        if (e.key === "Enter" || e.key === " ")
                          setSelectedVariant(i);
                      },
                      className: cn(
                        "text-[10px] px-2 py-0.5 border rounded-sm font-medium transition-smooth",
                        selectedVariant === i ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground hover:border-primary/50"
                      ),
                      children: v.name
                    },
                    v.name
                  ))
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mt-auto pt-3 gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                  product.sizeVariants.length > 1 && selectedVariant === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground mr-1", children: "from" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-base text-foreground", children: formatPrice(
                    selectedVariant === 0 ? lowestPrice : priceInCents
                  ) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    "data-ocid": "add-to-cart-btn",
                    size: "sm",
                    variant: "default",
                    disabled: !product.inStock,
                    onClick: handleAddToCart,
                    className: "gap-1.5 text-xs shrink-0",
                    "aria-label": `Add ${product.name} to cart`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { className: "h-3.5 w-3.5" }),
                      "Add to Cart"
                    ]
                  }
                )
              ] })
            ] })
          ]
        }
      )
    }
  );
}
function ProductCardSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "overflow-hidden border border-border rounded-sm animate-pulse flex flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-48 bg-muted/60" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 flex flex-col gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 bg-muted rounded w-1/3" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-4 bg-muted rounded w-3/4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 bg-muted rounded w-full" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 bg-muted rounded w-2/3" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center mt-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-5 bg-muted rounded w-16" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-8 bg-muted rounded w-20" })
      ] })
    ] })
  ] });
}
export {
  ProductCardSkeleton as P,
  ProductCard as a
};
