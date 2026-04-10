import { ProductCard } from "@/components/ProductCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { useProducts } from "@/hooks/useProducts";
import { Category } from "@/types/index";
import type { Product } from "@/types/index";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { Filter, RotateCcw, Search, SlidersHorizontal, X } from "lucide-react";
import { useCallback, useDeferredValue, useMemo, useState } from "react";

// ────────────────────────────────────────────────────────────────────
// Constants
// ────────────────────────────────────────────────────────────────────

const CATEGORY_OPTIONS: { value: Category; label: string }[] = [
  { value: Category.proteins, label: "Proteins" },
  { value: Category.preWorkout, label: "Pre-Workout" },
  { value: Category.postWorkout, label: "Post-Workout" },
  { value: Category.vitamins, label: "Vitamins" },
  { value: Category.accessories, label: "Accessories" },
];

const PRODUCT_TYPES = [
  "Whey Protein",
  "Plant-Based",
  "BCAA",
  "Creatine",
  "Pre-Workout",
  "Vitamins",
  "Mass Gainer",
  "Fat Burner",
  "Amino Acids",
  "Bars & Snacks",
];

// ────────────────────────────────────────────────────────────────────
// Types
// ────────────────────────────────────────────────────────────────────

interface FilterState {
  categories: Category[];
  productTypes: string[];
}

// ────────────────────────────────────────────────────────────────────
// Filter Panel (shared between sidebar + drawer)
// ────────────────────────────────────────────────────────────────────

interface FilterPanelProps {
  filters: FilterState;
  onToggleCategory: (cat: Category) => void;
  onToggleProductType: (type: string) => void;
  onClearAll: () => void;
  activeCount: number;
}

function FilterPanel({
  filters,
  onToggleCategory,
  onToggleProductType,
  onClearAll,
  activeCount,
}: FilterPanelProps) {
  return (
    <div className="flex flex-col gap-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-primary" />
          <span className="font-display font-bold text-sm uppercase tracking-wider text-foreground">
            Filters
          </span>
          {activeCount > 0 && (
            <Badge variant="secondary" className="text-xs px-1.5 py-0">
              {activeCount}
            </Badge>
          )}
        </div>
        {activeCount > 0 && (
          <Button
            data-ocid="clear-filters-btn"
            variant="ghost"
            size="sm"
            onClick={onClearAll}
            className="text-xs text-muted-foreground gap-1 h-7 px-2 hover:text-destructive"
          >
            <RotateCcw className="h-3 w-3" />
            Clear All
          </Button>
        )}
      </div>

      <Separator />

      {/* Category filters */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
          Category
        </p>
        <div className="flex flex-col gap-2.5">
          {CATEGORY_OPTIONS.map(({ value, label }) => {
            const id = `cat-${value}`;
            return (
              <div key={value} className="flex items-center gap-2.5">
                <Checkbox
                  id={id}
                  data-ocid={`filter-category-${value}`}
                  checked={filters.categories.includes(value)}
                  onCheckedChange={() => onToggleCategory(value)}
                />
                <Label
                  htmlFor={id}
                  className="cursor-pointer text-sm text-foreground font-normal select-none"
                >
                  {label}
                </Label>
              </div>
            );
          })}
        </div>
      </div>

      <Separator />

      {/* Product type filters */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
          Product Type
        </p>
        <div className="flex flex-col gap-2.5">
          {PRODUCT_TYPES.map((type) => {
            const id = `type-${type.replace(/\s+/g, "-").toLowerCase()}`;
            return (
              <div key={type} className="flex items-center gap-2.5">
                <Checkbox
                  id={id}
                  data-ocid={`filter-type-${id}`}
                  checked={filters.productTypes.includes(type)}
                  onCheckedChange={() => onToggleProductType(type)}
                />
                <Label
                  htmlFor={id}
                  className="cursor-pointer text-sm text-foreground font-normal select-none"
                >
                  {type}
                </Label>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────
// Skeleton grid
// ────────────────────────────────────────────────────────────────────

function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {Array.from({ length: 12 }, (_, i) => `skel-${i}`).map((key) => (
        <div key={key} className="flex flex-col gap-3">
          <Skeleton className="h-48 w-full rounded-sm" />
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-9 w-full" />
        </div>
      ))}
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────
// Main page
// ────────────────────────────────────────────────────────────────────

export function CatalogPage() {
  const navigate = useNavigate({ from: "/catalog" });
  const search = useSearch({ from: "/catalog" });

  // URL-synced search query
  const urlQuery = (search.q as string | undefined) ?? "";
  const urlCategory = (search.category as string | undefined) ?? "";

  // Local search input (URL gets updated on change with debounce effect via useDeferredValue)
  const [inputValue, setInputValue] = useState(urlQuery);
  const deferredInput = useDeferredValue(inputValue);

  // Local filter state (not URL-synced beyond category + q)
  const [filters, setFilters] = useState<FilterState>({
    categories: urlCategory ? [urlCategory as Category] : [],
    productTypes: [],
  });

  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Sync URL when filters change
  const updateUrl = useCallback(
    (nextQ: string, nextCategories: Category[]) => {
      void navigate({
        search: {
          q: nextQ || undefined,
          category: nextCategories.length === 1 ? nextCategories[0] : undefined,
        },
        replace: true,
      });
    },
    [navigate],
  );

  const handleSearchChange = (val: string) => {
    setInputValue(val);
    updateUrl(val, filters.categories);
  };

  const handleToggleCategory = (cat: Category) => {
    setFilters((prev) => {
      const next = prev.categories.includes(cat)
        ? prev.categories.filter((c) => c !== cat)
        : [...prev.categories, cat];
      updateUrl(inputValue, next);
      return { ...prev, categories: next };
    });
  };

  const handleToggleProductType = (type: string) => {
    setFilters((prev) => ({
      ...prev,
      productTypes: prev.productTypes.includes(type)
        ? prev.productTypes.filter((t) => t !== type)
        : [...prev.productTypes, type],
    }));
  };

  const handleClearAll = () => {
    setInputValue("");
    setFilters({ categories: [], productTypes: [] });
    updateUrl("", []);
  };

  const activeFilterCount =
    filters.categories.length + filters.productTypes.length;

  // Data
  const { data: allProducts, isLoading } = useProducts();

  // Filtered products
  const filteredProducts = useMemo<Product[]>(() => {
    const products = allProducts ?? [];
    const q = deferredInput.trim().toLowerCase();

    return products.filter((p) => {
      // Category filter
      if (
        filters.categories.length > 0 &&
        !filters.categories.includes(p.category)
      ) {
        return false;
      }

      // Product type filter
      if (
        filters.productTypes.length > 0 &&
        !filters.productTypes.some(
          (t) =>
            p.productType.toLowerCase().includes(t.toLowerCase()) ||
            t.toLowerCase().includes(p.productType.toLowerCase()),
        )
      ) {
        return false;
      }

      // Search query
      if (q) {
        const inName = p.name.toLowerCase().includes(q);
        const inBrand = p.brand.toLowerCase().includes(q);
        const inType = p.productType.toLowerCase().includes(q);
        if (!inName && !inBrand && !inType) return false;
      }

      return true;
    });
  }, [allProducts, deferredInput, filters]);

  // Determine heading label
  const headingLabel = useMemo(() => {
    if (filters.categories.length === 1) {
      return (
        CATEGORY_OPTIONS.find((c) => c.value === filters.categories[0])
          ?.label ?? "Products"
      );
    }
    if (deferredInput.trim()) return `Search: "${deferredInput.trim()}"`;
    return "All Products";
  }, [filters.categories, deferredInput]);

  const filterPanelProps: FilterPanelProps = {
    filters,
    onToggleCategory: handleToggleCategory,
    onToggleProductType: handleToggleProductType,
    onClearAll: handleClearAll,
    activeCount: activeFilterCount,
  };

  return (
    <div className="bg-background min-h-screen">
      {/* Page header band */}
      <div className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-5 flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="flex-1">
            <h1 className="text-display text-2xl sm:text-3xl text-foreground">
              {headingLabel}
            </h1>
            {!isLoading && (
              <p className="text-sm text-muted-foreground mt-0.5">
                {filteredProducts.length}{" "}
                {filteredProducts.length === 1 ? "product" : "products"} found
              </p>
            )}
          </div>

          {/* Search bar */}
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            <Input
              data-ocid="catalog-search"
              type="search"
              placeholder="Search by name or brand…"
              value={inputValue}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="pl-9 pr-8 rounded-sm"
            />
            {inputValue && (
              <button
                type="button"
                aria-label="Clear search"
                onClick={() => handleSearchChange("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          {/* Mobile filter trigger */}
          <Sheet open={mobileFilterOpen} onOpenChange={setMobileFilterOpen}>
            <SheetTrigger asChild>
              <Button
                data-ocid="mobile-filter-trigger"
                variant="outline"
                size="sm"
                className="lg:hidden gap-2 shrink-0 rounded-sm"
              >
                <SlidersHorizontal className="h-4 w-4" />
                Filters
                {activeFilterCount > 0 && (
                  <Badge className="h-5 w-5 rounded-full p-0 flex items-center justify-center text-[10px]">
                    {activeFilterCount}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 p-0">
              <SheetHeader className="px-5 pt-5 pb-2">
                <SheetTitle className="font-display text-base">
                  Filter Products
                </SheetTitle>
              </SheetHeader>
              <ScrollArea className="h-[calc(100vh-80px)] px-5 py-4">
                <FilterPanel {...filterPanelProps} />
              </ScrollArea>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Desktop sidebar */}
          <aside className="hidden lg:block w-56 xl:w-64 shrink-0">
            <div className="sticky top-24 bg-card border border-border rounded-sm p-5">
              <FilterPanel {...filterPanelProps} />
            </div>
          </aside>

          {/* Product grid */}
          <main className="flex-1 min-w-0">
            {isLoading ? (
              <ProductGridSkeleton />
            ) : filteredProducts.length === 0 ? (
              <EmptyState
                hasFilters={activeFilterCount > 0 || !!deferredInput}
                onReset={handleClearAll}
              />
            ) : (
              <div
                data-ocid="product-grid"
                className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4"
              >
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id.toString()} product={product} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────
// Empty state
// ────────────────────────────────────────────────────────────────────

function EmptyState({
  hasFilters,
  onReset,
}: {
  hasFilters: boolean;
  onReset: () => void;
}) {
  return (
    <div
      data-ocid="catalog-empty-state"
      className="flex flex-col items-center justify-center py-20 px-4 text-center bg-muted/30 rounded-sm border border-dashed border-border"
    >
      <div className="flex items-center justify-center h-16 w-16 rounded-full bg-muted mb-4">
        <Search className="h-7 w-7 text-muted-foreground" />
      </div>
      <h3 className="font-display font-bold text-lg text-foreground mb-1">
        {hasFilters ? "No products match your filters" : "No products yet"}
      </h3>
      <p className="text-sm text-muted-foreground max-w-xs mb-5">
        {hasFilters
          ? "Try adjusting or clearing your filters to see more products."
          : "Products will appear here once they are added to the catalog."}
      </p>
      {hasFilters && (
        <Button
          data-ocid="empty-state-reset"
          variant="outline"
          size="sm"
          onClick={onReset}
          className="gap-2 rounded-sm"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Reset Filters
        </Button>
      )}
    </div>
  );
}
