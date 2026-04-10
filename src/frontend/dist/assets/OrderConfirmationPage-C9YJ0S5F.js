import { c as createLucideIcon, i as useParams, d as useSearch, r as reactExports, j as jsxRuntimeExports, B as Button, L as Link, f as formatPrice } from "./index-BHyAZwjZ.js";
import { S as Separator } from "./separator-DutG1O4X.js";
import { S as Skeleton } from "./skeleton-ap8jj-EJ.js";
import { a as useActor, c as createActor } from "./backend-BbJHmFow.js";
import { b as useOrderById } from "./useOrders-CkV3fm4h.js";
import { C as CircleCheck } from "./circle-check-BIv5TY_0.js";
import { P as Package } from "./package-BdPvcS7e.js";
import { S as ShoppingBag } from "./shopping-bag-33Ed5E-G.js";
import "./index-CVppxWpv.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m15 9-6 6", key: "1uzhvr" }],
  ["path", { d: "m9 9 6 6", key: "z0biqf" }]
];
const CircleX = createLucideIcon("circle-x", __iconNode);
const STATUS_LABELS = {
  pending: "Pending",
  paid: "Paid",
  shipped: "Shipped",
  delivered: "Delivered",
  cancelled: "Cancelled"
};
function useConfirmOrder() {
  const { actor } = useActor(createActor);
  return reactExports.useCallback(
    async (orderId) => {
      if (!actor) return;
      await actor.confirmOrder(orderId);
    },
    [actor]
  );
}
function OrderConfirmationPage() {
  const params = useParams({ from: "/order-confirmation/$orderId" });
  const search = useSearch({ from: "/order-confirmation/$orderId" });
  const isSuccess = search.success === "1";
  const isCancelled = search.cancelled === "1";
  const isNewOrder = params.orderId === "new";
  const numericOrderId = isNewOrder ? null : (() => {
    try {
      return BigInt(params.orderId);
    } catch {
      return null;
    }
  })();
  const confirmOrder = useConfirmOrder();
  const { data: order, isLoading } = useOrderById(numericOrderId);
  reactExports.useEffect(() => {
    if (isSuccess && numericOrderId) {
      confirmOrder(numericOrderId).catch(console.error);
    }
  }, [isSuccess, numericOrderId, confirmOrder]);
  if (isCancelled) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-[70vh] flex items-center justify-center bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "max-w-md w-full mx-auto px-6 text-center space-y-6",
        "data-ocid": "order-cancelled",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-9 h-9 text-destructive" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-title mb-2", children: "Payment cancelled" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Your payment was not completed. Don't worry — your cart has been saved." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3 justify-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, size: "lg", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/checkout", "data-ocid": "order-cancelled-return-checkout", children: "Return to Checkout" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", asChild: true, size: "lg", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/cart", "data-ocid": "order-cancelled-view-cart", children: "View Cart" }) })
          ] })
        ]
      }
    ) });
  }
  if (isSuccess && isNewOrder) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-[70vh] flex items-center justify-center bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "max-w-md w-full mx-auto px-6 text-center space-y-6",
        "data-ocid": "order-success-generic",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-9 h-9 text-accent" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-title mb-2", children: "Your order is confirmed!" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Thank you for your purchase. You'll receive a confirmation soon." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, size: "lg", className: "w-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/catalog",
              search: { category: void 0, q: void 0 },
              "data-ocid": "order-success-continue-shopping",
              children: "Continue Shopping"
            }
          ) })
        ]
      }
    ) });
  }
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto px-4 py-12 space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-64" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 w-48" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-40 w-full" })
    ] });
  }
  if (!order) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-[50vh] flex items-center justify-center bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-title", children: "Order not found" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "We couldn't find that order." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/catalog", search: { category: void 0, q: void 0 }, children: "Continue Shopping" }) })
    ] }) });
  }
  const statusLabel = STATUS_LABELS[order.status] ?? String(order.status);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-background min-h-screen", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "max-w-2xl mx-auto px-4 py-12 sm:px-6",
      "data-ocid": "order-confirmation",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-accent/10 border border-accent/30 rounded-sm px-6 py-5 flex items-center gap-4 mb-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-7 h-7 text-accent" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-title text-foreground mb-0.5", children: "Your order is confirmed!" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Thank you for your purchase. We'll start processing it right away." })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-sm p-5 mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-4 mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground uppercase tracking-widest font-semibold mb-0.5", children: "Order Number" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "p",
                {
                  className: "text-headline font-mono text-foreground",
                  "data-ocid": "order-number",
                  children: [
                    "#",
                    order.id.toString()
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground uppercase tracking-widest font-semibold mb-0.5", children: "Status" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: order.status, label: statusLabel })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "my-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-4 h-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              order.items.length,
              " item",
              order.items.length !== 1 ? "s" : "",
              " · Placed ",
              formatOrderDate(order.createdAt)
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "bg-card border border-border rounded-sm p-5 mb-6",
            "data-ocid": "order-items",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-headline mb-4", children: "Items Ordered" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: order.items.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "flex items-center gap-3",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-sm bg-muted/60 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "w-5 h-5 text-muted-foreground" }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground truncate", children: item.productName }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                        "Qty: ",
                        item.quantity.toString()
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-bold text-foreground shrink-0", children: formatPrice(item.priceInCents * item.quantity) })
                  ]
                },
                `${item.productId}-${item.variantIndex}-${i}`
              )) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "my-4" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-base font-bold text-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Total" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { "data-ocid": "order-total", children: formatPrice(order.totalInCents) })
              ] })
            ]
          }
        ),
        order.billingAddress && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-sm p-5 mb-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-headline mb-3", children: "Billing Address" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm text-muted-foreground space-y-0.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: order.billingAddress.fullName }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: order.billingAddress.street }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
              order.billingAddress.city,
              ", ",
              order.billingAddress.state,
              " ",
              order.billingAddress.postalCode
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: order.billingAddress.country })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              asChild: true,
              size: "lg",
              className: "flex-1",
              "data-ocid": "order-continue-shopping",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/catalog", search: { category: void 0, q: void 0 }, children: "Continue Shopping" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              asChild: true,
              size: "lg",
              className: "flex-1",
              "data-ocid": "order-view-account",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/account", children: "View My Orders" })
            }
          )
        ] })
      ]
    }
  ) });
}
function StatusBadge({
  status,
  label
}) {
  const colorMap = {
    pending: "bg-secondary/30 text-foreground border-secondary",
    paid: "bg-accent/20 text-accent-foreground border-accent/40",
    shipped: "bg-primary/10 text-primary border-primary/30",
    delivered: "bg-accent/10 text-accent-foreground border-accent/30",
    cancelled: "bg-destructive/10 text-destructive border-destructive/30"
  };
  const statusKey = status;
  const cls = colorMap[statusKey] ?? "bg-muted text-muted-foreground border-border";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      className: `inline-flex items-center px-2.5 py-0.5 rounded-sm text-xs font-semibold border ${cls}`,
      children: label
    }
  );
}
function formatOrderDate(ts) {
  const ms = Number(ts) / 1e6;
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  }).format(new Date(ms));
}
export {
  OrderConfirmationPage
};
