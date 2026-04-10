import { ProductCard, ProductCardSkeleton } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { useProducts } from "@/hooks/useProducts";
import { Category } from "@/types/index";
import { Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight, ChevronRight, Zap } from "lucide-react";
import { motion } from "motion/react";
import { useRef } from "react";

// ─── Static data ──────────────────────────────────────────────────────────────
const CATEGORIES = [
  {
    label: "Proteins",
    value: Category.proteins,
    emoji: "🥛",
    color: "from-primary/20 to-primary/5",
  },
  {
    label: "Pre-Workout",
    value: Category.preWorkout,
    emoji: "⚡",
    color: "from-accent/20 to-accent/5",
  },
  {
    label: "Post-Workout",
    value: Category.postWorkout,
    emoji: "💪",
    color: "from-secondary/30 to-secondary/10",
  },
  {
    label: "Vitamins",
    value: Category.vitamins,
    emoji: "🌿",
    color: "from-chart-5/20 to-chart-5/5",
  },
  {
    label: "Accessories",
    value: Category.accessories,
    emoji: "🎽",
    color: "from-chart-4/20 to-chart-4/5",
  },
] as const;

const TRUST_BADGES = [
  { emoji: "🔬", label: "Lab Tested" },
  { emoji: "🚚", label: "Free Shipping $75+" },
  { emoji: "🔄", label: "30-Day Returns" },
  { emoji: "⭐", label: "10,000+ Reviews" },
];

export function HomePage() {
  const { data: allProducts, isLoading } = useProducts();
  const bestSellers = allProducts?.slice(0, 6) ?? [];
  const bestSellersRef = useRef<HTMLElement>(null);
  const navigate = useNavigate();

  function scrollToBestSellers() {
    bestSellersRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden min-h-[520px] flex items-center"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.18 0.12 250) 0%, oklch(0.25 0.16 220) 40%, oklch(0.30 0.14 190) 100%)",
        }}
      >
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25"
          style={{
            backgroundImage:
              "url('/assets/generated/hero-supplements.dim_1400x600.jpg')",
          }}
          aria-hidden="true"
        />
        {/* Gradient mesh overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 80% at 80% 50%, oklch(0.7 0.22 130 / 0.15) 0%, transparent 60%), radial-gradient(ellipse 40% 60% at 20% 80%, oklch(0.68 0.19 250 / 0.25) 0%, transparent 50%)",
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-2xl">
            {/* Pre-headline label */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 mb-5"
            >
              <span
                className="flex items-center gap-1.5 px-3 py-1 rounded-sm text-xs font-bold uppercase tracking-widest"
                style={{
                  background: "oklch(0.7 0.22 130 / 0.20)",
                  color: "oklch(0.88 0.28 130)",
                  border: "1px solid oklch(0.7 0.22 130 / 0.40)",
                }}
              >
                <Zap className="h-3 w-3" />
                Premium Supplements
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight mb-5"
              style={{ color: "oklch(0.97 0 0)" }}
            >
              Fuel Your{" "}
              <span style={{ color: "oklch(0.88 0.28 130)" }}>Best</span>
              <br />
              Performance
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-base sm:text-lg font-body mb-8 max-w-lg leading-relaxed"
              style={{ color: "oklch(0.78 0.04 250)" }}
            >
              Science-backed nutrition engineered for athletes. From whey
              isolates to pre-workouts — everything you need to hit new PRs.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap gap-3"
            >
              <Button
                size="lg"
                className="gap-2 text-sm font-semibold shadow-lift"
                style={{
                  background: "oklch(0.7 0.22 130)",
                  color: "oklch(0.12 0 0)",
                }}
                onClick={() =>
                  navigate({
                    to: "/catalog",
                    search: { category: undefined, q: undefined },
                  })
                }
                data-ocid="hero-shop-now"
              >
                Shop Now
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="gap-2 text-sm font-semibold"
                style={{
                  borderColor: "oklch(0.97 0 0 / 0.35)",
                  color: "oklch(0.97 0 0)",
                  background: "oklch(0.97 0 0 / 0.08)",
                }}
                onClick={scrollToBestSellers}
                data-ocid="hero-best-sellers"
              >
                View Best Sellers
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Trust badges ─────────────────────────────────────────────────── */}
      <section className="bg-muted/40 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-border">
            {TRUST_BADGES.map((badge) => (
              <div
                key={badge.label}
                className="flex items-center justify-center gap-2 py-3.5 px-2"
              >
                <span className="text-lg">{badge.emoji}</span>
                <span className="text-xs font-semibold text-foreground uppercase tracking-wide">
                  {badge.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Categories ───────────────────────────────────────────── */}
      <section className="bg-background py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h2 className="text-title text-foreground">Shop by Category</h2>
            <p className="text-muted-foreground font-body text-sm mt-1">
              Find exactly what your training demands
            </p>
          </motion.div>

          {/* Horizontally scrollable row */}
          <div
            className="flex gap-4 overflow-x-auto pb-3 snap-x snap-mandatory -mx-1 px-1"
            style={{ scrollbarWidth: "none" }}
          >
            {CATEGORIES.map((cat, idx) => (
              <motion.div
                key={cat.value}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="snap-start shrink-0"
              >
                <Link
                  to="/catalog"
                  search={{ category: cat.value, q: undefined }}
                  className="flex flex-col items-center gap-3 w-32 sm:w-36 p-4 rounded-sm border border-border bg-card hover:border-primary/50 hover:shadow-lift transition-smooth group focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  data-ocid={`category-${cat.value}`}
                >
                  <div
                    className={`w-14 h-14 rounded-sm bg-gradient-to-br ${cat.color} flex items-center justify-center text-2xl group-hover:scale-110 transition-smooth`}
                  >
                    {cat.emoji}
                  </div>
                  <span className="text-xs font-semibold text-center text-foreground font-display leading-tight">
                    {cat.label}
                  </span>
                  <ChevronRight className="h-3 w-3 text-muted-foreground group-hover:text-primary transition-colors duration-200" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Best Sellers ─────────────────────────────────────────────────── */}
      <section
        ref={bestSellersRef}
        className="py-14 sm:py-20 bg-muted/30"
        id="best-sellers"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-end justify-between mb-8"
          >
            <div>
              <h2 className="text-title text-foreground">Best Sellers</h2>
              <p className="text-muted-foreground font-body text-sm mt-1">
                Top-rated by our community of athletes
              </p>
            </div>
            <Link
              to="/catalog"
              search={{ category: undefined, q: undefined }}
              className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary/80 transition-colors duration-200"
              data-ocid="best-sellers-view-all"
            >
              View all
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {(["s1", "s2", "s3", "s4", "s5", "s6"] as const).map((k) => (
                <ProductCardSkeleton key={k} />
              ))}
            </div>
          ) : bestSellers.length === 0 ? (
            <EmptyProductsState
              onBrowse={() =>
                navigate({
                  to: "/catalog",
                  search: { category: undefined, q: undefined },
                })
              }
            />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {bestSellers.map((product, idx) => (
                <motion.div
                  key={product.id.toString()}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.07 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>
          )}

          <div className="mt-8 text-center sm:hidden">
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                navigate({
                  to: "/catalog",
                  search: { category: undefined, q: undefined },
                })
              }
              className="gap-2"
              data-ocid="mobile-view-all"
            >
              View all products
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* ── Promo banner ─────────────────────────────────────────────────── */}
      <section className="bg-background py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden rounded-sm p-8 sm:p-14 text-center"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.55 0.18 250) 0%, oklch(0.50 0.20 220) 50%, oklch(0.42 0.18 200) 100%)",
            }}
          >
            <div
              className="absolute inset-0 opacity-10 pointer-events-none"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 20% 80%, oklch(0.7 0.22 130) 0%, transparent 50%), radial-gradient(circle at 80% 20%, white 0%, transparent 50%)",
              }}
              aria-hidden="true"
            />
            <div className="relative z-10">
              <span
                className="inline-block text-xs font-bold uppercase tracking-widest mb-3 px-3 py-1 rounded-sm"
                style={{
                  background: "oklch(0.7 0.22 130 / 0.25)",
                  color: "oklch(0.9 0.28 130)",
                  border: "1px solid oklch(0.7 0.22 130 / 0.40)",
                }}
              >
                Limited Offer
              </span>
              <h2
                className="font-display text-3xl sm:text-4xl font-bold mb-3"
                style={{ color: "oklch(0.97 0 0)" }}
              >
                New Arrivals Just Dropped
              </h2>
              <p
                className="font-body text-base mb-6 max-w-md mx-auto"
                style={{ color: "oklch(0.82 0.06 250)" }}
              >
                Explore our latest formulations — ultra-pure isolates to
                advanced pre-workout blends.
              </p>
              <Button
                size="lg"
                className="gap-2 font-semibold"
                style={{
                  background: "oklch(0.7 0.22 130)",
                  color: "oklch(0.12 0 0)",
                }}
                onClick={() =>
                  navigate({
                    to: "/catalog",
                    search: { category: undefined, q: undefined },
                  })
                }
                data-ocid="promo-shop-btn"
              >
                Shop New Arrivals
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

// ─── Empty state ──────────────────────────────────────────────────────────────
function EmptyProductsState({ onBrowse }: { onBrowse: () => void }) {
  return (
    <div
      className="flex flex-col items-center justify-center py-20 text-center"
      data-ocid="empty-products"
    >
      <span className="text-6xl mb-4">🏋️</span>
      <h3 className="font-display font-bold text-lg text-foreground mb-2">
        Loading products...
      </h3>
      <p className="text-muted-foreground font-body text-sm mb-6 max-w-xs">
        Our catalog is syncing. Browse all available products now.
      </p>
      <Button onClick={onBrowse} variant="default" size="sm" className="gap-2">
        Browse Catalog
        <ArrowRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
