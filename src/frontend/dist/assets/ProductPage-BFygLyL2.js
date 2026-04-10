import { c as createLucideIcon, i as useParams, e as useCart, r as reactExports, j as jsxRuntimeExports, L as Link, f as formatPrice, B as Button, g as ShoppingCart, h as ue, C as ChevronDown } from "./index-BHyAZwjZ.js";
import { B as Badge } from "./badge-Cjm0YHzF.js";
import { S as Separator } from "./separator-DutG1O4X.js";
import { S as Skeleton } from "./skeleton-ap8jj-EJ.js";
import { a as useProduct, Z as Zap } from "./useProducts-Dz6lekZg.js";
import { C as Category } from "./backend-BbJHmFow.js";
import { m as motion } from "./proxy-CajdjViD.js";
import { P as Package } from "./package-BdPvcS7e.js";
import { C as CircleCheck } from "./circle-check-BIv5TY_0.js";
import { M as Minus } from "./minus-DROurntQ.js";
import { P as Plus, A as AnimatePresence } from "./index-Bop_lSzh.js";
import { C as ChevronUp } from "./chevron-up-vZks34el.js";
import "./index-CVppxWpv.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
  ["path", { d: "M19 12H5", key: "x3x0zl" }]
];
const ArrowLeft = createLucideIcon("arrow-left", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z",
      key: "vktsd0"
    }
  ],
  ["circle", { cx: "7.5", cy: "7.5", r: ".5", fill: "currentColor", key: "kqv944" }]
];
const Tag = createLucideIcon("tag", __iconNode);
const categoryLabels = {
  [Category.proteins]: "Protein",
  [Category.preWorkout]: "Pre-Workout",
  [Category.postWorkout]: "Post-Workout",
  [Category.vitamins]: "Vitamins",
  [Category.accessories]: "Accessories"
};
const categoryColors = {
  [Category.proteins]: "bg-accent text-accent-foreground",
  [Category.preWorkout]: "bg-primary text-primary-foreground",
  [Category.postWorkout]: "bg-secondary text-secondary-foreground",
  [Category.vitamins]: "bg-muted text-foreground",
  [Category.accessories]: "bg-muted text-foreground"
};
function CollapsibleSection({
  title,
  children,
  defaultOpen = false
}) {
  const [open, setOpen] = reactExports.useState(defaultOpen);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-border rounded-sm overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        className: "w-full flex items-center justify-between px-5 py-4 bg-card hover:bg-muted/40 transition-colors duration-200 text-left",
        onClick: () => setOpen((p) => !p),
        "aria-expanded": open,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-semibold text-base text-foreground", children: title }),
          open ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "h-4 w-4 text-muted-foreground shrink-0" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-4 w-4 text-muted-foreground shrink-0" })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { initial: false, children: open && /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { height: 0, opacity: 0 },
        animate: { height: "auto", opacity: 1 },
        exit: { height: 0, opacity: 0 },
        transition: { duration: 0.25, ease: "easeInOut" },
        className: "overflow-hidden",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-5 py-4 bg-background text-sm text-foreground/80 leading-relaxed", children })
      },
      "content"
    ) })
  ] });
}
function NutritionPanel({ facts }) {
  const rows = [
    { label: "Serving Size", value: facts.servingSize, unit: "" },
    { label: "Calories", value: Number(facts.calories), unit: "kcal" },
    { label: "Protein", value: Number(facts.protein), unit: "g" },
    { label: "Total Carbs", value: Number(facts.carbs), unit: "g" },
    { label: "Total Fat", value: Number(facts.fat), unit: "g" }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-border rounded-sm overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 py-3 bg-foreground text-background", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-lg", children: "Nutrition Facts" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs opacity-70 mt-0.5", children: "Per serving" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-border", children: rows.map((row, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: `flex items-center justify-between px-5 py-3 ${i === 0 ? "bg-muted/40" : "bg-background"}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-foreground", children: row.label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-foreground", children: typeof row.value === "number" ? `${row.value}${row.unit}` : row.value })
        ]
      },
      row.label
    )) })
  ] });
}
function ProductSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-16", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "aspect-square w-full rounded-sm" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-24" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-9 w-3/4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-32" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-20" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-20" }, i)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 flex-1" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 w-12" })
      ] })
    ] })
  ] });
}
function NotFound() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      className: "flex flex-col items-center justify-center py-24 text-center",
      "data-ocid": "product-not-found",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "h-9 w-9 text-muted-foreground" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold text-foreground mb-2", children: "Product Not Found" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-8 max-w-sm", children: "The product you're looking for doesn't exist or may have been removed." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "default", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/catalog", search: { category: void 0, q: void 0 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4 mr-2" }),
          "Back to Catalog"
        ] }) })
      ]
    }
  );
}
function ProductPage() {
  var _a;
  const { id } = useParams({ from: "/product/$id" });
  const productId = BigInt(id);
  const { data: product, isLoading, isError } = useProduct(productId);
  const { addItem } = useCart();
  const [selectedVariantIndex, setSelectedVariantIndex] = reactExports.useState(0);
  const [quantity, setQuantity] = reactExports.useState(1);
  const [addedToCart, setAddedToCart] = reactExports.useState(false);
  const selectedVariant = (_a = product == null ? void 0 : product.sizeVariants) == null ? void 0 : _a[selectedVariantIndex];
  function handleAddToCart(p) {
    if (!selectedVariant) return;
    addItem({
      productId: p.id.toString(),
      variantIndex: selectedVariantIndex,
      productName: p.name,
      variantName: selectedVariant.name,
      priceInCents: Number(selectedVariant.priceInCents),
      quantity,
      imageId: p.imageId
    });
    setAddedToCart(true);
    ue.success("Added to cart!", {
      description: `${p.name} — ${selectedVariant.name} × ${quantity}`,
      duration: 3e3
    });
    setTimeout(() => setAddedToCart(false), 2500);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-background min-h-screen", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "flex items-center gap-2 text-sm text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link,
        {
          to: "/",
          className: "hover:text-foreground transition-colors duration-200",
          children: "Home"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "/" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link,
        {
          to: "/catalog",
          search: { category: void 0, q: void 0 },
          className: "hover:text-foreground transition-colors duration-200",
          children: "Catalog"
        }
      ),
      product && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "/" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-medium truncate max-w-[200px]", children: product.name })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to: "/catalog",
          search: { category: void 0, q: void 0 },
          className: "inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 mb-8",
          "data-ocid": "back-to-catalog",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
            "Back to Catalog"
          ]
        }
      ),
      isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx(ProductSkeleton, {}),
      (isError || !isLoading && product === null) && /* @__PURE__ */ jsxRuntimeExports.jsx(NotFound, {}),
      product && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { duration: 0.4 },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-16", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.div,
                {
                  initial: { opacity: 0, x: -20 },
                  animate: { opacity: 1, x: 0 },
                  transition: { duration: 0.4, delay: 0.1 },
                  className: "relative",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "aspect-square w-full bg-card border border-border rounded-sm overflow-hidden flex items-center justify-center", children: [
                    product.imageId ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "img",
                      {
                        src: `/api/images/${product.imageId}`,
                        alt: product.name,
                        className: "w-full h-full object-contain p-8"
                      }
                    ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center gap-4 text-muted-foreground", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-28 h-28 rounded-full bg-muted flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "h-14 w-14 text-muted-foreground/40" }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium", children: "No image available" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-4 right-4", children: product.inStock ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "span",
                      {
                        className: "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-accent text-accent-foreground shadow-lift",
                        "data-ocid": "stock-status-badge",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-3 w-3" }),
                          "In Stock"
                        ]
                      }
                    ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-destructive text-destructive-foreground shadow-lift",
                        "data-ocid": "stock-status-badge",
                        children: "Out of Stock"
                      }
                    ) })
                  ] })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  initial: { opacity: 0, x: 20 },
                  animate: { opacity: 1, x: 0 },
                  transition: { duration: 0.4, delay: 0.15 },
                  className: "flex flex-col gap-5",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: "text-xs font-bold uppercase tracking-widest text-muted-foreground",
                          "data-ocid": "product-brand",
                          children: product.brand
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { orientation: "vertical", className: "h-4" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "span",
                        {
                          className: `inline-flex items-center gap-1 px-2.5 py-1 rounded-sm text-xs font-bold uppercase tracking-wide ${categoryColors[product.category] ?? "bg-muted text-foreground"}`,
                          "data-ocid": "product-category-badge",
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "h-3 w-3" }),
                            categoryLabels[product.category] ?? product.category
                          ]
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl sm:text-4xl font-bold text-foreground leading-tight", children: product.name }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2 flex-wrap", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Badge,
                      {
                        variant: "outline",
                        className: "flex items-center gap-1.5 text-xs font-semibold",
                        "data-ocid": "product-type-tag",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { className: "h-3 w-3" }),
                          product.productType
                        ]
                      }
                    ) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "p",
                      {
                        className: "text-4xl font-display font-bold text-foreground",
                        "data-ocid": "product-price",
                        children: selectedVariant ? formatPrice(selectedVariant.priceInCents) : "—"
                      }
                    ) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
                    product.sizeVariants.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3", children: "Size / Weight" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          className: "flex flex-wrap gap-2",
                          role: "radiogroup",
                          "aria-label": "Select size",
                          "data-ocid": "size-variant-selector",
                          children: product.sizeVariants.map((variant, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            "label",
                            {
                              className: `cursor-pointer px-4 py-2.5 rounded-sm border text-sm font-semibold transition-smooth min-w-[72px] text-center select-none ${selectedVariantIndex === idx ? "border-accent bg-accent/10 text-accent-foreground ring-2 ring-accent ring-offset-1" : "border-border bg-card text-foreground hover:border-accent/60 hover:bg-muted/30"}`,
                              "data-ocid": `size-variant-${idx}`,
                              children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx(
                                  "input",
                                  {
                                    type: "radio",
                                    name: "size-variant",
                                    value: variant.name,
                                    checked: selectedVariantIndex === idx,
                                    onChange: () => setSelectedVariantIndex(idx),
                                    className: "sr-only"
                                  }
                                ),
                                variant.name
                              ]
                            },
                            variant.name
                          ))
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3", children: "Quantity" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "div",
                        {
                          className: "inline-flex items-center border border-border rounded-sm bg-card",
                          "data-ocid": "quantity-selector",
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "button",
                              {
                                type: "button",
                                "aria-label": "Decrease quantity",
                                disabled: quantity <= 1,
                                onClick: () => setQuantity((q) => Math.max(1, q - 1)),
                                className: "flex items-center justify-center w-11 h-11 text-foreground hover:bg-muted/40 disabled:opacity-30 disabled:cursor-not-allowed transition-colors duration-200",
                                "data-ocid": "quantity-decrease",
                                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { className: "h-4 w-4" })
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-12 text-center font-bold text-lg text-foreground select-none", children: quantity }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "button",
                              {
                                type: "button",
                                "aria-label": "Increase quantity",
                                onClick: () => setQuantity((q) => q + 1),
                                className: "flex items-center justify-center w-11 h-11 text-foreground hover:bg-muted/40 transition-colors duration-200",
                                "data-ocid": "quantity-increase",
                                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" })
                              }
                            )
                          ]
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-3 pt-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        size: "lg",
                        disabled: !product.inStock || addedToCart,
                        onClick: () => handleAddToCart(product),
                        className: `flex-1 h-14 text-base font-bold font-display transition-smooth ${addedToCart ? "bg-accent text-accent-foreground" : "bg-accent text-accent-foreground hover:bg-accent/90 active:scale-[0.98]"}`,
                        "data-ocid": "add-to-cart-btn",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: addedToCart ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          motion.span,
                          {
                            initial: { opacity: 0, scale: 0.8 },
                            animate: { opacity: 1, scale: 1 },
                            exit: { opacity: 0, scale: 0.8 },
                            className: "flex items-center gap-2",
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-5 w-5" }),
                              "Added to Cart!"
                            ]
                          },
                          "added"
                        ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          motion.span,
                          {
                            initial: { opacity: 0, scale: 0.8 },
                            animate: { opacity: 1, scale: 1 },
                            exit: { opacity: 0, scale: 0.8 },
                            className: "flex items-center gap-2",
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { className: "h-5 w-5" }),
                              product.inStock ? "Add to Cart" : "Out of Stock"
                            ]
                          },
                          "add"
                        ) })
                      }
                    ) }),
                    product.inStock && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "✓ Free shipping on orders over $75  ·  Ships in 1–3 business days" })
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.4, delay: 0.3 },
                className: "mt-14 grid grid-cols-1 lg:grid-cols-3 gap-8",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-2 flex flex-col gap-4", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CollapsibleSection, { title: "Product Description", defaultOpen: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "whitespace-pre-line", children: product.description }) }),
                    product.ingredients && /* @__PURE__ */ jsxRuntimeExports.jsx(CollapsibleSection, { title: "Ingredients", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "whitespace-pre-line leading-relaxed", children: product.ingredients }) })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4", children: [
                    product.nutritionFacts ? /* @__PURE__ */ jsxRuntimeExports.jsx(NutritionPanel, { facts: product.nutritionFacts }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-border rounded-sm p-6 bg-card text-center text-muted-foreground text-sm", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "h-8 w-8 mx-auto mb-2 opacity-40" }),
                      "No nutrition facts available"
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-border rounded-sm bg-card p-5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-sm text-foreground mb-3", children: "Product Details" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-sm", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Brand" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: product.brand })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-sm", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Type" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: product.productType })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-sm", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Category" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: categoryLabels[product.category] ?? product.category })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-sm", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Availability" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "span",
                            {
                              className: `font-bold ${product.inStock ? "text-accent" : "text-destructive"}`,
                              children: product.inStock ? "In Stock" : "Out of Stock"
                            }
                          )
                        ] })
                      ] })
                    ] })
                  ] })
                ]
              }
            )
          ]
        }
      )
    ] })
  ] });
}
export {
  ProductPage
};
