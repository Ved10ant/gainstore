import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  AlertTriangle,
  ArrowRight,
  Minus,
  Package,
  Plus,
  ShoppingCart,
  Trash2,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useCart } from "../hooks/useCart";
import { formatPrice } from "../lib/utils";
import type { LocalCartItem } from "../types/index";

// ── CartRow ─────────────────────────────────────────────────────────────────

interface CartRowProps {
  item: LocalCartItem;
  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;
}

function CartRow({ item, onIncrease, onDecrease, onRemove }: CartRowProps) {
  const lineTotal = item.priceInCents * item.quantity;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -24, transition: { duration: 0.22 } }}
      data-ocid="cart-item-row"
      className="flex gap-4 py-5"
    >
      {/* Product image / icon */}
      <div className="flex-shrink-0 w-20 h-20 rounded-sm bg-muted flex items-center justify-center overflow-hidden">
        {item.imageId ? (
          <img
            src={`/api/assets/${item.imageId}`}
            alt={item.productName}
            className="w-full h-full object-cover"
          />
        ) : (
          <Package className="w-8 h-8 text-muted-foreground" />
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="font-display font-semibold text-foreground leading-tight truncate">
          {item.productName}
        </p>
        <p className="text-sm text-muted-foreground mt-0.5 truncate">
          {item.variantName}
        </p>
        <p className="text-sm font-medium text-foreground mt-1">
          {formatPrice(item.priceInCents)} each
        </p>
      </div>

      {/* Quantity + remove */}
      <div className="flex flex-col items-end justify-between gap-3 flex-shrink-0">
        {/* Line total */}
        <span className="font-display font-bold text-foreground text-base tabular-nums">
          {formatPrice(lineTotal)}
        </span>

        <div className="flex items-center gap-2">
          {/* Qty stepper */}
          <div className="flex items-center border border-border rounded-sm overflow-hidden">
            <button
              type="button"
              onClick={onDecrease}
              data-ocid="cart-item-decrease"
              aria-label="Decrease quantity"
              className="w-8 h-8 flex items-center justify-center text-foreground hover:bg-muted transition-colors duration-150 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span
              className="w-9 text-center text-sm font-semibold select-none"
              aria-label={`Quantity: ${item.quantity}`}
            >
              {item.quantity}
            </span>
            <button
              type="button"
              onClick={onIncrease}
              data-ocid="cart-item-increase"
              aria-label="Increase quantity"
              className="w-8 h-8 flex items-center justify-center text-foreground hover:bg-muted transition-colors duration-150 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Remove */}
          <button
            type="button"
            onClick={onRemove}
            data-ocid="cart-item-remove"
            aria-label={`Remove ${item.productName} from cart`}
            className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-destructive transition-colors duration-150 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring rounded-sm"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// ── EmptyCart ────────────────────────────────────────────────────────────────

function EmptyCart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      data-ocid="cart-empty-state"
      className="flex flex-col items-center justify-center py-24 px-6 text-center"
    >
      <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mb-6">
        <ShoppingCart className="w-12 h-12 text-muted-foreground" />
      </div>
      <h2 className="font-display text-2xl font-bold text-foreground mb-2">
        Your cart is empty
      </h2>
      <p className="text-muted-foreground max-w-sm mb-8">
        Looks like you haven&apos;t added any supplements yet. Browse our
        collection and fuel your performance.
      </p>
      <Link
        to="/catalog"
        search={{ category: undefined, q: undefined }}
        data-ocid="cart-start-shopping"
      >
        <Button size="lg" className="gap-2 font-semibold">
          Start Shopping
          <ArrowRight className="w-4 h-4" />
        </Button>
      </Link>
    </motion.div>
  );
}

// ── CartSummary ───────────────────────────────────────────────────────────────

interface CartSummaryProps {
  totalItems: number;
  totalCents: number;
  onCheckout: () => void;
  onClearCart: () => void;
}

function CartSummary({
  totalItems,
  totalCents,
  onCheckout,
  onClearCart,
}: CartSummaryProps) {
  return (
    <motion.aside
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.35, delay: 0.1 }}
      data-ocid="cart-summary-panel"
      className="bg-card border border-border rounded-sm p-6 sticky top-24 space-y-5"
    >
      <h2 className="font-display font-bold text-lg text-foreground">
        Order Summary
      </h2>

      <div className="space-y-3 text-sm">
        <div className="flex justify-between text-muted-foreground">
          <span>
            Items ({totalItems} {totalItems === 1 ? "item" : "items"})
          </span>
          <span className="font-medium text-foreground tabular-nums">
            {formatPrice(totalCents)}
          </span>
        </div>
        <div className="flex justify-between text-muted-foreground">
          <span>Shipping</span>
          <span className="font-semibold text-accent-foreground">
            Calculated at checkout
          </span>
        </div>
        <div className="flex justify-between text-muted-foreground">
          <span>Taxes</span>
          <span className="font-semibold text-accent-foreground">
            Calculated at checkout
          </span>
        </div>
      </div>

      <Separator />

      <div className="flex justify-between font-display font-bold text-foreground text-lg">
        <span>Subtotal</span>
        <span className="tabular-nums">{formatPrice(totalCents)}</span>
      </div>

      <p className="text-xs text-muted-foreground leading-relaxed flex gap-1.5">
        <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
        Taxes and shipping will be calculated at checkout. Final price may vary.
      </p>

      <Button
        size="lg"
        className="w-full gap-2 font-semibold"
        onClick={onCheckout}
        data-ocid="cart-checkout-btn"
      >
        Proceed to Checkout
        <ArrowRight className="w-4 h-4" />
      </Button>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="w-full gap-2 text-destructive border-destructive/30 hover:bg-destructive/10 hover:text-destructive"
            data-ocid="cart-clear-btn"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Clear Cart
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Clear your cart?</AlertDialogTitle>
            <AlertDialogDescription>
              This will remove all {totalItems}{" "}
              {totalItems === 1 ? "item" : "items"} from your cart. This action
              cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={onClearCart}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              data-ocid="cart-clear-confirm"
            >
              Yes, clear cart
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </motion.aside>
  );
}

// ── CartPage ─────────────────────────────────────────────────────────────────

export function CartPage() {
  const navigate = useNavigate();
  const {
    items,
    totalItems,
    totalCents,
    updateQuantity,
    removeItem,
    clearCart,
  } = useCart();

  const [removingKey, setRemovingKey] = useState<string | null>(null);

  function handleRemove(productId: string, variantIndex: number) {
    const key = `${productId}-${variantIndex}`;
    setRemovingKey(key);
    setTimeout(() => {
      removeItem(productId, variantIndex);
      setRemovingKey(null);
    }, 220);
  }

  function handleCheckout() {
    void navigate({ to: "/checkout" });
  }

  const isEmpty = items.length === 0;

  return (
    <div className="min-h-screen bg-background">
      {/* Page header band */}
      <div className="bg-card border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
          <div className="flex items-center gap-3">
            <ShoppingCart className="w-6 h-6 text-primary" />
            <h1 className="font-display text-2xl font-bold text-foreground">
              Shopping Cart
            </h1>
            {!isEmpty && (
              <span className="ml-1 text-sm text-muted-foreground font-medium">
                ({totalItems} {totalItems === 1 ? "item" : "items"})
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {isEmpty ? (
          <EmptyCart />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8 items-start">
            {/* Cart items list */}
            <div className="bg-card border border-border rounded-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-border bg-muted/40">
                <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                  Cart Items
                </span>
              </div>
              <div className="px-6 divide-y divide-border">
                <AnimatePresence initial={false}>
                  {items.map((item) => {
                    const key = `${item.productId}-${item.variantIndex}`;
                    const isRemoving = removingKey === key;
                    return (
                      <CartRow
                        key={key}
                        item={item}
                        onIncrease={() =>
                          updateQuantity(
                            item.productId,
                            item.variantIndex,
                            item.quantity + 1,
                          )
                        }
                        onDecrease={() =>
                          updateQuantity(
                            item.productId,
                            item.variantIndex,
                            item.quantity - 1,
                          )
                        }
                        onRemove={() =>
                          !isRemoving &&
                          handleRemove(item.productId, item.variantIndex)
                        }
                      />
                    );
                  })}
                </AnimatePresence>
              </div>

              {/* Continue shopping link */}
              <div className="px-6 py-4 border-t border-border bg-muted/20">
                <Link
                  to="/catalog"
                  search={{ category: undefined, q: undefined }}
                  className="inline-flex items-center gap-1.5 text-sm text-primary font-medium hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring rounded-sm"
                  data-ocid="cart-continue-shopping"
                >
                  ← Continue Shopping
                </Link>
              </div>
            </div>

            {/* Summary sidebar */}
            <CartSummary
              totalItems={totalItems}
              totalCents={totalCents}
              onCheckout={handleCheckout}
              onClearCart={clearCart}
            />
          </div>
        )}
      </div>
    </div>
  );
}
