import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useActor } from "@caffeineai/core-infrastructure";
import { Link, useParams, useSearch } from "@tanstack/react-router";
import { CheckCircle2, Package, ShoppingBag, XCircle } from "lucide-react";
import { useCallback, useEffect } from "react";
import { toast } from "sonner";
import { createActor } from "../backend";
import type { OrderStatus } from "../backend";
import { useOrderById } from "../hooks/useOrders";
import { formatPrice } from "../lib/utils";

const STATUS_LABELS: Record<string, string> = {
  pending: "Pending",
  paid: "Paid",
  shipped: "Shipped",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

function useConfirmOrder() {
  const { actor } = useActor(createActor);
  return useCallback(
    async (orderId: bigint) => {
      if (!actor) return;
      await actor.confirmOrder(orderId);
    },
    [actor],
  );
}

export function OrderConfirmationPage() {
  const params = useParams({ from: "/order-confirmation/$orderId" });
  const search = useSearch({ from: "/order-confirmation/$orderId" }) as {
    success?: string;
    cancelled?: string;
    session_id?: string;
  };

  const isSuccess = search.success === "1";
  const isCancelled = search.cancelled === "1";
  const isNewOrder = params.orderId === "new";

  // For a real order ID (not "new"), parse it
  const numericOrderId = isNewOrder
    ? null
    : (() => {
        try {
          return BigInt(params.orderId);
        } catch {
          return null;
        }
      })();

  const confirmOrder = useConfirmOrder();
  const { data: order, isLoading } = useOrderById(numericOrderId);

  // On success with a real order ID, call confirmOrder
  useEffect(() => {
    if (isSuccess && numericOrderId) {
      confirmOrder(numericOrderId).catch(console.error);
    }
  }, [isSuccess, numericOrderId, confirmOrder]);

  if (isCancelled) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-background">
        <div
          className="max-w-md w-full mx-auto px-6 text-center space-y-6"
          data-ocid="order-cancelled"
        >
          <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mx-auto">
            <XCircle className="w-9 h-9 text-destructive" />
          </div>
          <div>
            <h1 className="text-title mb-2">Payment cancelled</h1>
            <p className="text-muted-foreground">
              Your payment was not completed. Don't worry — your cart has been
              saved.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild size="lg">
              <Link to="/checkout" data-ocid="order-cancelled-return-checkout">
                Return to Checkout
              </Link>
            </Button>
            <Button variant="outline" asChild size="lg">
              <Link to="/cart" data-ocid="order-cancelled-view-cart">
                View Cart
              </Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (isSuccess && isNewOrder) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-background">
        <div
          className="max-w-md w-full mx-auto px-6 text-center space-y-6"
          data-ocid="order-success-generic"
        >
          <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-9 h-9 text-accent" />
          </div>
          <div>
            <h1 className="text-title mb-2">Your order is confirmed!</h1>
            <p className="text-muted-foreground">
              Thank you for your purchase. You'll receive a confirmation soon.
            </p>
          </div>
          <Button asChild size="lg" className="w-full">
            <Link
              to="/catalog"
              search={{ category: undefined, q: undefined }}
              data-ocid="order-success-continue-shopping"
            >
              Continue Shopping
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12 space-y-6">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-6 w-48" />
        <Skeleton className="h-40 w-full" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <h1 className="text-title">Order not found</h1>
          <p className="text-muted-foreground">We couldn't find that order.</p>
          <Button asChild>
            <Link to="/catalog" search={{ category: undefined, q: undefined }}>
              Continue Shopping
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const statusLabel =
    STATUS_LABELS[order.status as unknown as string] ?? String(order.status);

  return (
    <div className="bg-background min-h-screen">
      <div
        className="max-w-2xl mx-auto px-4 py-12 sm:px-6"
        data-ocid="order-confirmation"
      >
        {/* Success banner */}
        <div className="bg-accent/10 border border-accent/30 rounded-sm px-6 py-5 flex items-center gap-4 mb-8">
          <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-7 h-7 text-accent" />
          </div>
          <div>
            <h1 className="text-title text-foreground mb-0.5">
              Your order is confirmed!
            </h1>
            <p className="text-sm text-muted-foreground">
              Thank you for your purchase. We'll start processing it right away.
            </p>
          </div>
        </div>

        {/* Order meta */}
        <div className="bg-card border border-border rounded-sm p-5 mb-6">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-widest font-semibold mb-0.5">
                Order Number
              </p>
              <p
                className="text-headline font-mono text-foreground"
                data-ocid="order-number"
              >
                #{order.id.toString()}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground uppercase tracking-widest font-semibold mb-0.5">
                Status
              </p>
              <StatusBadge status={order.status} label={statusLabel} />
            </div>
          </div>
          <Separator className="my-4" />
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Package className="w-4 h-4" />
            <span>
              {order.items.length} item{order.items.length !== 1 ? "s" : ""} ·
              Placed {formatOrderDate(order.createdAt)}
            </span>
          </div>
        </div>

        {/* Items list */}
        <div
          className="bg-card border border-border rounded-sm p-5 mb-6"
          data-ocid="order-items"
        >
          <h2 className="text-headline mb-4">Items Ordered</h2>
          <div className="space-y-4">
            {order.items.map((item, i) => (
              <div
                key={`${item.productId}-${item.variantIndex}-${i}`}
                className="flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-sm bg-muted/60 flex items-center justify-center shrink-0">
                  <ShoppingBag className="w-5 h-5 text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate">
                    {item.productName}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Qty: {item.quantity.toString()}
                  </p>
                </div>
                <div className="text-sm font-bold text-foreground shrink-0">
                  {formatPrice(item.priceInCents * item.quantity)}
                </div>
              </div>
            ))}
          </div>
          <Separator className="my-4" />
          <div className="flex justify-between text-base font-bold text-foreground">
            <span>Total</span>
            <span data-ocid="order-total">
              {formatPrice(order.totalInCents)}
            </span>
          </div>
        </div>

        {/* Billing address */}
        {order.billingAddress && (
          <div className="bg-card border border-border rounded-sm p-5 mb-8">
            <h2 className="text-headline mb-3">Billing Address</h2>
            <div className="text-sm text-muted-foreground space-y-0.5">
              <p className="font-semibold text-foreground">
                {order.billingAddress.fullName}
              </p>
              <p>{order.billingAddress.street}</p>
              <p>
                {order.billingAddress.city}, {order.billingAddress.state}{" "}
                {order.billingAddress.postalCode}
              </p>
              <p>{order.billingAddress.country}</p>
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            asChild
            size="lg"
            className="flex-1"
            data-ocid="order-continue-shopping"
          >
            <Link to="/catalog" search={{ category: undefined, q: undefined }}>
              Continue Shopping
            </Link>
          </Button>
          <Button
            variant="outline"
            asChild
            size="lg"
            className="flex-1"
            data-ocid="order-view-account"
          >
            <Link to="/account">View My Orders</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

function StatusBadge({
  status,
  label,
}: { status: OrderStatus; label: string }) {
  const colorMap: Record<string, string> = {
    pending: "bg-secondary/30 text-foreground border-secondary",
    paid: "bg-accent/20 text-accent-foreground border-accent/40",
    shipped: "bg-primary/10 text-primary border-primary/30",
    delivered: "bg-accent/10 text-accent-foreground border-accent/30",
    cancelled: "bg-destructive/10 text-destructive border-destructive/30",
  };
  const statusKey = status as unknown as string;
  const cls =
    colorMap[statusKey] ?? "bg-muted text-muted-foreground border-border";
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-sm text-xs font-semibold border ${cls}`}
    >
      {label}
    </span>
  );
}

function formatOrderDate(ts: bigint): string {
  const ms = Number(ts) / 1_000_000;
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(ms));
}
