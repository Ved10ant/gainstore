import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "@tanstack/react-router";
import { ChevronDown, Lock, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type { Address, ShoppingItem } from "../backend";
import { useAuth } from "../hooks/useAuth";
import { useCart } from "../hooks/useCart";
import { useCreateCheckoutSession, useUserProfile } from "../hooks/useOrders";
import { formatPrice } from "../lib/utils";

const EMPTY_ADDRESS: Address = {
  fullName: "",
  street: "",
  city: "",
  state: "",
  postalCode: "",
  country: "United States",
};

export function CheckoutPage() {
  const { items, totalCents, clearCart } = useCart();
  const { isAuthenticated, login, loginStatus } = useAuth();
  const { data: profile } = useUserProfile();
  const createCheckout = useCreateCheckoutSession();
  const navigate = useNavigate();

  const [address, setAddress] = useState<Address>(EMPTY_ADDRESS);
  const [selectedSaved, setSelectedSaved] = useState<string>("");
  const [step, setStep] = useState<1 | 2>(1);

  const savedAddresses = profile?.savedAddresses ?? [];

  function handleSelectSaved(idx: string) {
    setSelectedSaved(idx);
    if (idx !== "") {
      const a = savedAddresses[Number.parseInt(idx)];
      if (a) setAddress(a);
    } else {
      setAddress(EMPTY_ADDRESS);
    }
  }

  function handleAddressChange(field: keyof Address, value: string) {
    setSelectedSaved("");
    setAddress((prev) => ({ ...prev, [field]: value }));
  }

  function isAddressValid() {
    return (
      address.fullName.trim() &&
      address.street.trim() &&
      address.city.trim() &&
      address.state.trim() &&
      address.postalCode.trim() &&
      address.country.trim()
    );
  }

  async function handleProceedToStripe() {
    if (!isAddressValid()) {
      toast.error("Please fill in all billing address fields.");
      return;
    }
    const shoppingItems: ShoppingItem[] = items.map((i) => ({
      productName: `${i.productName} — ${i.variantName}`,
      currency: "usd",
      quantity: BigInt(i.quantity),
      priceInCents: BigInt(i.priceInCents),
      productDescription: i.variantName,
    }));
    const baseUrl = window.location.origin;
    const successUrl = `${baseUrl}/order-confirmation/new?success=1&session_id={CHECKOUT_SESSION_ID}`;
    const cancelUrl = `${baseUrl}/checkout?cancelled=1`;
    try {
      const checkoutUrl = await createCheckout.mutateAsync({
        items: shoppingItems,
        successUrl,
        cancelUrl,
      });
      clearCart();
      window.location.href = checkoutUrl;
    } catch (err) {
      toast.error("Failed to start checkout. Please try again.");
      console.error(err);
    }
  }

  // Auth gate
  if (!isAuthenticated) {
    return (
      <div
        className="min-h-[70vh] flex items-center justify-center bg-background"
        data-ocid="checkout-auth-gate"
      >
        <div className="max-w-md w-full mx-auto px-6 text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
            <Lock className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h1 className="text-title mb-2">
              Sign in to complete your purchase
            </h1>
            <p className="text-muted-foreground">
              Securely authenticate with Internet Identity to place your order
              and track it anytime.
            </p>
          </div>
          <Button
            size="lg"
            className="w-full"
            onClick={() => login()}
            disabled={loginStatus === "logging-in"}
            data-ocid="checkout-login-btn"
          >
            {loginStatus === "logging-in"
              ? "Connecting…"
              : "Sign in with Internet Identity"}
          </Button>
          <p className="text-xs text-muted-foreground">
            No account needed — Internet Identity is privacy-preserving and
            passwordless.
          </p>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <h1 className="text-title">Your cart is empty</h1>
          <p className="text-muted-foreground">
            Add some products before checking out.
          </p>
          <Button
            onClick={() =>
              navigate({
                to: "/catalog",
                search: { category: undefined, q: undefined },
              })
            }
          >
            Shop Now
          </Button>
        </div>
      </div>
    );
  }

  const total = totalCents;

  return (
    <div className="bg-background min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Page header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-1">
            <ShieldCheck className="w-4 h-4 text-primary" />
            <span className="text-xs font-semibold text-primary uppercase tracking-widest">
              Secure Checkout
            </span>
          </div>
          <h1 className="text-display">Checkout</h1>
        </div>

        {/* Step indicator */}
        <div
          className="flex items-center gap-3 mb-8"
          data-ocid="checkout-steps"
        >
          <button
            type="button"
            className={`flex items-center gap-2 text-sm font-semibold transition-colors ${step === 1 ? "text-primary" : "text-muted-foreground"}`}
            onClick={() => setStep(1)}
          >
            <span
              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all ${step === 1 ? "bg-primary text-primary-foreground border-primary" : "bg-accent text-accent-foreground border-accent"}`}
            >
              {step === 2 ? "✓" : "1"}
            </span>
            Billing Address
          </button>
          <div className="w-12 h-px bg-border" />
          <button
            type="button"
            className={`flex items-center gap-2 text-sm font-semibold transition-colors ${step === 2 ? "text-primary" : "text-muted-foreground"}`}
            onClick={() => isAddressValid() && setStep(2)}
          >
            <span
              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border-2 ${step === 2 ? "bg-primary text-primary-foreground border-primary" : "border-border"}`}
            >
              2
            </span>
            Payment
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 items-start">
          {/* Left: Step forms */}
          <div>
            {step === 1 && (
              <div className="bg-card border border-border rounded-sm p-6 space-y-5">
                <h2 className="text-headline">Billing Address</h2>

                {savedAddresses.length > 0 && (
                  <div
                    className="space-y-1.5"
                    data-ocid="checkout-saved-address-select"
                  >
                    <Label>Use a saved address</Label>
                    <div className="relative">
                      <select
                        value={selectedSaved}
                        onChange={(e) => handleSelectSaved(e.target.value)}
                        className="w-full appearance-none bg-input border border-input rounded-sm px-3 py-2 pr-8 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                      >
                        <option value="">— Enter a new address —</option>
                        {savedAddresses.map((a, i) => (
                          <option
                            key={`${a.fullName}-${a.street}-${i}`}
                            value={i.toString()}
                          >
                            {a.fullName} · {a.street}, {a.city}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2 space-y-1.5">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      value={address.fullName}
                      onChange={(e) =>
                        handleAddressChange("fullName", e.target.value)
                      }
                      placeholder="Jane Smith"
                      data-ocid="checkout-input-fullname"
                    />
                  </div>
                  <div className="sm:col-span-2 space-y-1.5">
                    <Label htmlFor="street">Street Address</Label>
                    <Input
                      id="street"
                      value={address.street}
                      onChange={(e) =>
                        handleAddressChange("street", e.target.value)
                      }
                      placeholder="123 Main St, Apt 4B"
                      data-ocid="checkout-input-street"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      value={address.city}
                      onChange={(e) =>
                        handleAddressChange("city", e.target.value)
                      }
                      placeholder="Los Angeles"
                      data-ocid="checkout-input-city"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="state">State / Province</Label>
                    <Input
                      id="state"
                      value={address.state}
                      onChange={(e) =>
                        handleAddressChange("state", e.target.value)
                      }
                      placeholder="CA"
                      data-ocid="checkout-input-state"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="postalCode">Postal Code</Label>
                    <Input
                      id="postalCode"
                      value={address.postalCode}
                      onChange={(e) =>
                        handleAddressChange("postalCode", e.target.value)
                      }
                      placeholder="90001"
                      data-ocid="checkout-input-postal"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="country">Country</Label>
                    <Input
                      id="country"
                      value={address.country}
                      onChange={(e) =>
                        handleAddressChange("country", e.target.value)
                      }
                      placeholder="United States"
                      data-ocid="checkout-input-country"
                    />
                  </div>
                </div>

                <Button
                  className="w-full"
                  size="lg"
                  onClick={() => {
                    if (!isAddressValid()) {
                      toast.error("Please fill in all fields.");
                      return;
                    }
                    setStep(2);
                  }}
                  data-ocid="checkout-continue-btn"
                >
                  Continue to Payment
                </Button>
              </div>
            )}

            {step === 2 && (
              <div className="bg-card border border-border rounded-sm p-6 space-y-5">
                <h2 className="text-headline">Payment</h2>

                {/* Address preview */}
                <div className="bg-muted/40 border border-border rounded-sm p-4 text-sm space-y-0.5">
                  <p className="font-semibold text-foreground">
                    {address.fullName}
                  </p>
                  <p className="text-muted-foreground">{address.street}</p>
                  <p className="text-muted-foreground">
                    {address.city}, {address.state} {address.postalCode}
                  </p>
                  <p className="text-muted-foreground">{address.country}</p>
                  <button
                    type="button"
                    className="text-primary text-xs font-semibold mt-2 hover:underline"
                    onClick={() => setStep(1)}
                  >
                    Edit address
                  </button>
                </div>

                <div className="border border-border rounded-sm p-4 flex items-center gap-3 bg-background">
                  <div className="w-10 h-10 rounded-sm bg-primary/10 flex items-center justify-center shrink-0">
                    <Lock className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      Powered by Stripe
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Your payment info is encrypted and never stored by us.
                    </p>
                  </div>
                </div>

                <Button
                  size="lg"
                  className="w-full"
                  onClick={handleProceedToStripe}
                  disabled={createCheckout.isPending}
                  data-ocid="checkout-pay-btn"
                >
                  {createCheckout.isPending ? (
                    <span className="flex items-center gap-2">
                      <span className="h-4 w-4 rounded-full border-2 border-primary-foreground border-t-transparent animate-spin" />
                      Connecting to Stripe…
                    </span>
                  ) : (
                    `Proceed to Stripe · ${formatPrice(total)}`
                  )}
                </Button>
              </div>
            )}
          </div>

          {/* Right: Order Summary */}
          <div
            className="bg-card border border-border rounded-sm p-5 sticky top-6"
            data-ocid="checkout-order-summary"
          >
            <h2 className="text-headline mb-4">Order Summary</h2>
            <div className="space-y-3 mb-4">
              {items.map((item) => (
                <div
                  key={`${item.productId}-${item.variantIndex}`}
                  className="flex items-start gap-3"
                >
                  <div className="w-9 h-9 rounded-sm bg-muted/60 flex items-center justify-center shrink-0 text-xs font-bold text-muted-foreground">
                    {item.quantity}×
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground truncate">
                      {item.productName}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {item.variantName}
                    </p>
                  </div>
                  <div className="text-sm font-semibold text-foreground shrink-0">
                    {formatPrice(item.priceInCents * item.quantity)}
                  </div>
                </div>
              ))}
            </div>
            <Separator className="my-4" />
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span>{formatPrice(totalCents)}</span>
              </div>
              <div className="flex justify-between items-center text-muted-foreground">
                <span>Shipping</span>
                <Badge
                  variant="outline"
                  className="text-xs font-semibold text-accent-foreground bg-accent/10 border-accent/30"
                >
                  FREE
                </Badge>
              </div>
            </div>
            <Separator className="my-4" />
            <div className="flex justify-between font-bold text-base text-foreground">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
            <div className="mt-4 flex items-center gap-1.5 text-xs text-muted-foreground">
              <ShieldCheck className="w-3.5 h-3.5 text-accent" />
              <span>SSL encrypted · Secure checkout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
