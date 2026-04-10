import { c as createLucideIcon, r as reactExports, u as useNavigate, j as jsxRuntimeExports, B as Button, L as Link } from "./index-BHyAZwjZ.js";
import { P as ProductCardSkeleton, a as ProductCard } from "./ProductCard-CZFVGi4l.js";
import { u as useProducts, Z as Zap } from "./useProducts-Dz6lekZg.js";
import { C as Category } from "./backend-BbJHmFow.js";
import { m as motion } from "./proxy-CajdjViD.js";
import { A as ArrowRight } from "./arrow-right-mbEIx6Nv.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]];
const ChevronRight = createLucideIcon("chevron-right", __iconNode);
const CATEGORIES = [
  {
    label: "Proteins",
    value: Category.proteins,
    emoji: "🥛",
    color: "from-primary/20 to-primary/5"
  },
  {
    label: "Pre-Workout",
    value: Category.preWorkout,
    emoji: "⚡",
    color: "from-accent/20 to-accent/5"
  },
  {
    label: "Post-Workout",
    value: Category.postWorkout,
    emoji: "💪",
    color: "from-secondary/30 to-secondary/10"
  },
  {
    label: "Vitamins",
    value: Category.vitamins,
    emoji: "🌿",
    color: "from-chart-5/20 to-chart-5/5"
  },
  {
    label: "Accessories",
    value: Category.accessories,
    emoji: "🎽",
    color: "from-chart-4/20 to-chart-4/5"
  }
];
const TRUST_BADGES = [
  { emoji: "🔬", label: "Lab Tested" },
  { emoji: "🚚", label: "Free Shipping $75+" },
  { emoji: "🔄", label: "30-Day Returns" },
  { emoji: "⭐", label: "10,000+ Reviews" }
];
function HomePage() {
  const { data: allProducts, isLoading } = useProducts();
  const bestSellers = (allProducts == null ? void 0 : allProducts.slice(0, 6)) ?? [];
  const bestSellersRef = reactExports.useRef(null);
  const navigate = useNavigate();
  function scrollToBestSellers() {
    var _a;
    (_a = bestSellersRef.current) == null ? void 0 : _a.scrollIntoView({ behavior: "smooth" });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col min-h-screen", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        className: "relative overflow-hidden min-h-[520px] flex items-center",
        style: {
          background: "linear-gradient(135deg, oklch(0.18 0.12 250) 0%, oklch(0.25 0.16 220) 40%, oklch(0.30 0.14 190) 100%)"
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute inset-0 bg-cover bg-center opacity-25",
              style: {
                backgroundImage: "url('/assets/generated/hero-supplements.dim_1400x600.jpg')"
              },
              "aria-hidden": "true"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute inset-0 pointer-events-none",
              style: {
                background: "radial-gradient(ellipse 70% 80% at 80% 50%, oklch(0.7 0.22 130 / 0.15) 0%, transparent 60%), radial-gradient(ellipse 40% 60% at 20% 80%, oklch(0.68 0.19 250 / 0.25) 0%, transparent 50%)"
              },
              "aria-hidden": "true"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                initial: { opacity: 0, y: -10 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.4 },
                className: "inline-flex items-center gap-2 mb-5",
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "span",
                  {
                    className: "flex items-center gap-1.5 px-3 py-1 rounded-sm text-xs font-bold uppercase tracking-widest",
                    style: {
                      background: "oklch(0.7 0.22 130 / 0.20)",
                      color: "oklch(0.88 0.28 130)",
                      border: "1px solid oklch(0.7 0.22 130 / 0.40)"
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "h-3 w-3" }),
                      "Premium Supplements"
                    ]
                  }
                )
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.h1,
              {
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.5, delay: 0.1 },
                className: "font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight mb-5",
                style: { color: "oklch(0.97 0 0)" },
                children: [
                  "Fuel Your",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "oklch(0.88 0.28 130)" }, children: "Best" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                  "Performance"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.p,
              {
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.5, delay: 0.2 },
                className: "text-base sm:text-lg font-body mb-8 max-w-lg leading-relaxed",
                style: { color: "oklch(0.78 0.04 250)" },
                children: "Science-backed nutrition engineered for athletes. From whey isolates to pre-workouts — everything you need to hit new PRs."
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.5, delay: 0.3 },
                className: "flex flex-wrap gap-3",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      size: "lg",
                      className: "gap-2 text-sm font-semibold shadow-lift",
                      style: {
                        background: "oklch(0.7 0.22 130)",
                        color: "oklch(0.12 0 0)"
                      },
                      onClick: () => navigate({
                        to: "/catalog",
                        search: { category: void 0, q: void 0 }
                      }),
                      "data-ocid": "hero-shop-now",
                      children: [
                        "Shop Now",
                        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4" })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      size: "lg",
                      variant: "outline",
                      className: "gap-2 text-sm font-semibold",
                      style: {
                        borderColor: "oklch(0.97 0 0 / 0.35)",
                        color: "oklch(0.97 0 0)",
                        background: "oklch(0.97 0 0 / 0.08)"
                      },
                      onClick: scrollToBestSellers,
                      "data-ocid": "hero-best-sellers",
                      children: "View Best Sellers"
                    }
                  )
                ]
              }
            )
          ] }) })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-muted/40 border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-4 divide-x divide-border", children: TRUST_BADGES.map((badge) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex items-center justify-center gap-2 py-3.5 px-2",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg", children: badge.emoji }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold text-foreground uppercase tracking-wide", children: badge.label })
        ]
      },
      badge.label
    )) }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-background py-14 sm:py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 16 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.5 },
          className: "mb-8",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-title text-foreground", children: "Shop by Category" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-body text-sm mt-1", children: "Find exactly what your training demands" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "flex gap-4 overflow-x-auto pb-3 snap-x snap-mandatory -mx-1 px-1",
          style: { scrollbarWidth: "none" },
          children: CATEGORIES.map((cat, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0, x: 20 },
              whileInView: { opacity: 1, x: 0 },
              viewport: { once: true },
              transition: { duration: 0.4, delay: idx * 0.08 },
              className: "snap-start shrink-0",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Link,
                {
                  to: "/catalog",
                  search: { category: cat.value, q: void 0 },
                  className: "flex flex-col items-center gap-3 w-32 sm:w-36 p-4 rounded-sm border border-border bg-card hover:border-primary/50 hover:shadow-lift transition-smooth group focus:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  "data-ocid": `category-${cat.value}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: `w-14 h-14 rounded-sm bg-gradient-to-br ${cat.color} flex items-center justify-center text-2xl group-hover:scale-110 transition-smooth`,
                        children: cat.emoji
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold text-center text-foreground font-display leading-tight", children: cat.label }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-3 w-3 text-muted-foreground group-hover:text-primary transition-colors duration-200" })
                  ]
                }
              )
            },
            cat.value
          ))
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        ref: bestSellersRef,
        className: "py-14 sm:py-20 bg-muted/30",
        id: "best-sellers",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 16 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              transition: { duration: 0.5 },
              className: "flex items-end justify-between mb-8",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-title text-foreground", children: "Best Sellers" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-body text-sm mt-1", children: "Top-rated by our community of athletes" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Link,
                  {
                    to: "/catalog",
                    search: { category: void 0, q: void 0 },
                    className: "hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary/80 transition-colors duration-200",
                    "data-ocid": "best-sellers-view-all",
                    children: [
                      "View all",
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4" })
                    ]
                  }
                )
              ]
            }
          ),
          isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5", children: ["s1", "s2", "s3", "s4", "s5", "s6"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(ProductCardSkeleton, {}, k)) }) : bestSellers.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            EmptyProductsState,
            {
              onBrowse: () => navigate({
                to: "/catalog",
                search: { category: void 0, q: void 0 }
              })
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5", children: bestSellers.map((product, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0, y: 24 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              transition: { duration: 0.4, delay: idx * 0.07 },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(ProductCard, { product })
            },
            product.id.toString()
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 text-center sm:hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "outline",
              size: "sm",
              onClick: () => navigate({
                to: "/catalog",
                search: { category: void 0, q: void 0 }
              }),
              className: "gap-2",
              "data-ocid": "mobile-view-all",
              children: [
                "View all products",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4" })
              ]
            }
          ) })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-background py-14 sm:py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, scale: 0.98 },
        whileInView: { opacity: 1, scale: 1 },
        viewport: { once: true },
        transition: { duration: 0.5 },
        className: "relative overflow-hidden rounded-sm p-8 sm:p-14 text-center",
        style: {
          background: "linear-gradient(135deg, oklch(0.55 0.18 250) 0%, oklch(0.50 0.20 220) 50%, oklch(0.42 0.18 200) 100%)"
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute inset-0 opacity-10 pointer-events-none",
              style: {
                backgroundImage: "radial-gradient(circle at 20% 80%, oklch(0.7 0.22 130) 0%, transparent 50%), radial-gradient(circle at 80% 20%, white 0%, transparent 50%)"
              },
              "aria-hidden": "true"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "inline-block text-xs font-bold uppercase tracking-widest mb-3 px-3 py-1 rounded-sm",
                style: {
                  background: "oklch(0.7 0.22 130 / 0.25)",
                  color: "oklch(0.9 0.28 130)",
                  border: "1px solid oklch(0.7 0.22 130 / 0.40)"
                },
                children: "Limited Offer"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "h2",
              {
                className: "font-display text-3xl sm:text-4xl font-bold mb-3",
                style: { color: "oklch(0.97 0 0)" },
                children: "New Arrivals Just Dropped"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: "font-body text-base mb-6 max-w-md mx-auto",
                style: { color: "oklch(0.82 0.06 250)" },
                children: "Explore our latest formulations — ultra-pure isolates to advanced pre-workout blends."
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                size: "lg",
                className: "gap-2 font-semibold",
                style: {
                  background: "oklch(0.7 0.22 130)",
                  color: "oklch(0.12 0 0)"
                },
                onClick: () => navigate({
                  to: "/catalog",
                  search: { category: void 0, q: void 0 }
                }),
                "data-ocid": "promo-shop-btn",
                children: [
                  "Shop New Arrivals",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4" })
                ]
              }
            )
          ] })
        ]
      }
    ) }) })
  ] });
}
function EmptyProductsState({ onBrowse }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex flex-col items-center justify-center py-20 text-center",
      "data-ocid": "empty-products",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-6xl mb-4", children: "🏋️" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-lg text-foreground mb-2", children: "Loading products..." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-body text-sm mb-6 max-w-xs", children: "Our catalog is syncing. Browse all available products now." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: onBrowse, variant: "default", size: "sm", className: "gap-2", children: [
          "Browse Catalog",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4" })
        ] })
      ]
    }
  );
}
export {
  HomePage
};
