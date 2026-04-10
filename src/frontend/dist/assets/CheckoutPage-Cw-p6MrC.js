import { c as createLucideIcon, e as useCart, l as useAuth, u as useNavigate, r as reactExports, j as jsxRuntimeExports, B as Button, C as ChevronDown, I as Input, h as ue, f as formatPrice } from "./index-BHyAZwjZ.js";
import { B as Badge } from "./badge-Cjm0YHzF.js";
import { L as Label } from "./label-rtnPE6dv.js";
import { S as Separator } from "./separator-DutG1O4X.js";
import { u as useUserProfile, a as useCreateCheckoutSession } from "./useOrders-CkV3fm4h.js";
import "./index-CVppxWpv.js";
import "./backend-BbJHmFow.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["rect", { width: "18", height: "11", x: "3", y: "11", rx: "2", ry: "2", key: "1w4ew1" }],
  ["path", { d: "M7 11V7a5 5 0 0 1 10 0v4", key: "fwvmzm" }]
];
const Lock = createLucideIcon("lock", __iconNode$1);
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
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
];
const ShieldCheck = createLucideIcon("shield-check", __iconNode);
const EMPTY_ADDRESS = {
  fullName: "",
  street: "",
  city: "",
  state: "",
  postalCode: "",
  country: "United States"
};
function CheckoutPage() {
  const { items, totalCents, clearCart } = useCart();
  const { isAuthenticated, login, loginStatus } = useAuth();
  const { data: profile } = useUserProfile();
  const createCheckout = useCreateCheckoutSession();
  const navigate = useNavigate();
  const [address, setAddress] = reactExports.useState(EMPTY_ADDRESS);
  const [selectedSaved, setSelectedSaved] = reactExports.useState("");
  const [step, setStep] = reactExports.useState(1);
  const savedAddresses = (profile == null ? void 0 : profile.savedAddresses) ?? [];
  function handleSelectSaved(idx) {
    setSelectedSaved(idx);
    if (idx !== "") {
      const a = savedAddresses[Number.parseInt(idx)];
      if (a) setAddress(a);
    } else {
      setAddress(EMPTY_ADDRESS);
    }
  }
  function handleAddressChange(field, value) {
    setSelectedSaved("");
    setAddress((prev) => ({ ...prev, [field]: value }));
  }
  function isAddressValid() {
    return address.fullName.trim() && address.street.trim() && address.city.trim() && address.state.trim() && address.postalCode.trim() && address.country.trim();
  }
  async function handleProceedToStripe() {
    if (!isAddressValid()) {
      ue.error("Please fill in all billing address fields.");
      return;
    }
    const shoppingItems = items.map((i) => ({
      productName: `${i.productName} — ${i.variantName}`,
      currency: "usd",
      quantity: BigInt(i.quantity),
      priceInCents: BigInt(i.priceInCents),
      productDescription: i.variantName
    }));
    const baseUrl = window.location.origin;
    const successUrl = `${baseUrl}/order-confirmation/new?success=1&session_id={CHECKOUT_SESSION_ID}`;
    const cancelUrl = `${baseUrl}/checkout?cancelled=1`;
    try {
      const checkoutUrl = await createCheckout.mutateAsync({
        items: shoppingItems,
        successUrl,
        cancelUrl
      });
      clearCart();
      window.location.href = checkoutUrl;
    } catch (err) {
      ue.error("Failed to start checkout. Please try again.");
      console.error(err);
    }
  }
  if (!isAuthenticated) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "min-h-[70vh] flex items-center justify-center bg-background",
        "data-ocid": "checkout-auth-gate",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md w-full mx-auto px-6 text-center space-y-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-8 h-8 text-primary" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-title mb-2", children: "Sign in to complete your purchase" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Securely authenticate with Internet Identity to place your order and track it anytime." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              size: "lg",
              className: "w-full",
              onClick: () => login(),
              disabled: loginStatus === "logging-in",
              "data-ocid": "checkout-login-btn",
              children: loginStatus === "logging-in" ? "Connecting…" : "Sign in with Internet Identity"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "No account needed — Internet Identity is privacy-preserving and passwordless." })
        ] })
      }
    );
  }
  if (items.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-[50vh] flex items-center justify-center bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-title", children: "Your cart is empty" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Add some products before checking out." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          onClick: () => navigate({
            to: "/catalog",
            search: { category: void 0, q: void 0 }
          }),
          children: "Shop Now"
        }
      )
    ] }) });
  }
  const total = totalCents;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-background min-h-screen", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-4 h-4 text-primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold text-primary uppercase tracking-widest", children: "Secure Checkout" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-display", children: "Checkout" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex items-center gap-3 mb-8",
        "data-ocid": "checkout-steps",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              className: `flex items-center gap-2 text-sm font-semibold transition-colors ${step === 1 ? "text-primary" : "text-muted-foreground"}`,
              onClick: () => setStep(1),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: `w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all ${step === 1 ? "bg-primary text-primary-foreground border-primary" : "bg-accent text-accent-foreground border-accent"}`,
                    children: step === 2 ? "✓" : "1"
                  }
                ),
                "Billing Address"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-px bg-border" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              className: `flex items-center gap-2 text-sm font-semibold transition-colors ${step === 2 ? "text-primary" : "text-muted-foreground"}`,
              onClick: () => isAddressValid() && setStep(2),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: `w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border-2 ${step === 2 ? "bg-primary text-primary-foreground border-primary" : "border-border"}`,
                    children: "2"
                  }
                ),
                "Payment"
              ]
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 items-start", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        step === 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-sm p-6 space-y-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-headline", children: "Billing Address" }),
          savedAddresses.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "space-y-1.5",
              "data-ocid": "checkout-saved-address-select",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Use a saved address" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "select",
                    {
                      value: selectedSaved,
                      onChange: (e) => handleSelectSaved(e.target.value),
                      className: "w-full appearance-none bg-input border border-input rounded-sm px-3 py-2 pr-8 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "— Enter a new address —" }),
                        savedAddresses.map((a, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "option",
                          {
                            value: i.toString(),
                            children: [
                              a.fullName,
                              " · ",
                              a.street,
                              ", ",
                              a.city
                            ]
                          },
                          `${a.fullName}-${a.street}-${i}`
                        ))
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:col-span-2 space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "fullName", children: "Full Name" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "fullName",
                  value: address.fullName,
                  onChange: (e) => handleAddressChange("fullName", e.target.value),
                  placeholder: "Jane Smith",
                  "data-ocid": "checkout-input-fullname"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:col-span-2 space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "street", children: "Street Address" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "street",
                  value: address.street,
                  onChange: (e) => handleAddressChange("street", e.target.value),
                  placeholder: "123 Main St, Apt 4B",
                  "data-ocid": "checkout-input-street"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "city", children: "City" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "city",
                  value: address.city,
                  onChange: (e) => handleAddressChange("city", e.target.value),
                  placeholder: "Los Angeles",
                  "data-ocid": "checkout-input-city"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "state", children: "State / Province" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "state",
                  value: address.state,
                  onChange: (e) => handleAddressChange("state", e.target.value),
                  placeholder: "CA",
                  "data-ocid": "checkout-input-state"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "postalCode", children: "Postal Code" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "postalCode",
                  value: address.postalCode,
                  onChange: (e) => handleAddressChange("postalCode", e.target.value),
                  placeholder: "90001",
                  "data-ocid": "checkout-input-postal"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "country", children: "Country" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "country",
                  value: address.country,
                  onChange: (e) => handleAddressChange("country", e.target.value),
                  placeholder: "United States",
                  "data-ocid": "checkout-input-country"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              className: "w-full",
              size: "lg",
              onClick: () => {
                if (!isAddressValid()) {
                  ue.error("Please fill in all fields.");
                  return;
                }
                setStep(2);
              },
              "data-ocid": "checkout-continue-btn",
              children: "Continue to Payment"
            }
          )
        ] }),
        step === 2 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-sm p-6 space-y-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-headline", children: "Payment" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/40 border border-border rounded-sm p-4 text-sm space-y-0.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: address.fullName }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: address.street }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground", children: [
              address.city,
              ", ",
              address.state,
              " ",
              address.postalCode
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: address.country }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                className: "text-primary text-xs font-semibold mt-2 hover:underline",
                onClick: () => setStep(1),
                children: "Edit address"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-border rounded-sm p-4 flex items-center gap-3 bg-background", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-sm bg-primary/10 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-5 h-5 text-primary" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: "Powered by Stripe" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Your payment info is encrypted and never stored by us." })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              size: "lg",
              className: "w-full",
              onClick: handleProceedToStripe,
              disabled: createCheckout.isPending,
              "data-ocid": "checkout-pay-btn",
              children: createCheckout.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-4 w-4 rounded-full border-2 border-primary-foreground border-t-transparent animate-spin" }),
                "Connecting to Stripe…"
              ] }) : `Proceed to Stripe · ${formatPrice(total)}`
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "bg-card border border-border rounded-sm p-5 sticky top-6",
          "data-ocid": "checkout-order-summary",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-headline mb-4", children: "Order Summary" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3 mb-4", children: items.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex items-start gap-3",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-9 h-9 rounded-sm bg-muted/60 flex items-center justify-center shrink-0 text-xs font-bold text-muted-foreground", children: [
                    item.quantity,
                    "×"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground truncate", children: item.productName }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: item.variantName })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-semibold text-foreground shrink-0", children: formatPrice(item.priceInCents * item.quantity) })
                ]
              },
              `${item.productId}-${item.variantIndex}`
            )) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "my-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Subtotal" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatPrice(totalCents) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Shipping" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Badge,
                  {
                    variant: "outline",
                    className: "text-xs font-semibold text-accent-foreground bg-accent/10 border-accent/30",
                    children: "FREE"
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "my-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between font-bold text-base text-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Total" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatPrice(total) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex items-center gap-1.5 text-xs text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-3.5 h-3.5 text-accent" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "SSL encrypted · Secure checkout" })
            ] })
          ]
        }
      )
    ] })
  ] }) });
}
export {
  CheckoutPage
};
