import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/useAuth";
import {
  useAddAddress,
  useMyOrders,
  useRemoveAddress,
  useSaveUserProfile,
  useUserProfile,
} from "@/hooks/useOrders";
import { cn, formatDate, formatPrice } from "@/lib/utils";
import type { Address, Order, OrderItem } from "@/types";
import { OrderStatus } from "@/types";
import { useNavigate } from "@tanstack/react-router";
import {
  Check,
  ChevronDown,
  ChevronUp,
  Copy,
  Home,
  MapPin,
  Package,
  Pencil,
  Plus,
  ShoppingBag,
  Trash2,
  User,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

// ─── Status Badge ─────────────────────────────────────────────────────────────
const STATUS_CONFIG: Record<string, { label: string; className: string }> = {
  [OrderStatus.pending]: {
    label: "Pending",
    className: "bg-muted text-muted-foreground border border-border",
  },
  [OrderStatus.paid]: {
    label: "Paid",
    className: "bg-accent/20 text-accent-foreground border border-accent/40",
  },
  [OrderStatus.shipped]: {
    label: "Shipped",
    className: "bg-primary/15 text-primary border border-primary/30",
  },
  [OrderStatus.delivered]: {
    label: "Delivered",
    className: "bg-green-100 text-green-800 border border-green-200",
  },
  [OrderStatus.cancelled]: {
    label: "Cancelled",
    className:
      "bg-destructive/10 text-destructive border border-destructive/30",
  },
};

function OrderStatusBadge({ status }: { status: OrderStatus }) {
  const cfg = STATUS_CONFIG[status] ?? STATUS_CONFIG[OrderStatus.pending];
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-sm px-2 py-0.5 text-xs font-semibold",
        cfg.className,
      )}
    >
      {cfg.label}
    </span>
  );
}

// ─── Order Row ────────────────────────────────────────────────────────────────
function OrderRow({ order, index }: { order: Order; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const orderId = `#${order.id.toString().padStart(3, "0")}`;
  const itemCount = order.items.reduce((sum, i) => sum + Number(i.quantity), 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06 }}
      className="border border-border rounded-sm overflow-hidden"
    >
      <button
        type="button"
        data-ocid="order-row"
        onClick={() => setExpanded((v) => !v)}
        className="w-full flex items-center gap-3 px-4 py-3.5 bg-card hover:bg-muted/40 transition-smooth text-left"
        aria-expanded={expanded}
      >
        <Package className="h-4 w-4 text-primary shrink-0" />
        <span className="font-display font-semibold text-sm text-foreground w-20 shrink-0">
          {orderId}
        </span>
        <span className="text-sm text-muted-foreground flex-1 min-w-0">
          {formatDate(order.createdAt)}
        </span>
        <span className="text-sm text-muted-foreground hidden sm:block w-24 shrink-0">
          {itemCount} item{itemCount !== 1 ? "s" : ""}
        </span>
        <span className="text-sm font-semibold text-foreground w-24 text-right shrink-0">
          {formatPrice(order.totalInCents)}
        </span>
        <div className="w-24 flex justify-center shrink-0">
          <OrderStatusBadge status={order.status} />
        </div>
        <div className="text-muted-foreground ml-2">
          {expanded ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </div>
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="overflow-hidden"
          >
            <div className="bg-muted/30 border-t border-border px-4 py-3">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                Order Items
              </p>
              <div className="space-y-2">
                {order.items.map((item: OrderItem, itemIdx: number) => (
                  <div
                    key={`${item.productId.toString()}-${itemIdx}`}
                    className="flex items-center justify-between text-sm"
                  >
                    <span className="text-foreground font-medium flex-1 min-w-0 truncate">
                      {item.productName}
                    </span>
                    <span className="text-muted-foreground text-xs mx-3">
                      ×{Number(item.quantity)}
                    </span>
                    <span className="text-foreground font-semibold shrink-0">
                      {formatPrice(item.priceInCents * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>
              {order.billingAddress && (
                <div className="mt-3 pt-3 border-t border-border">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                    Shipped To
                  </p>
                  <p className="text-sm text-foreground">
                    {order.billingAddress.fullName} ·{" "}
                    {order.billingAddress.street}, {order.billingAddress.city},{" "}
                    {order.billingAddress.state}{" "}
                    {order.billingAddress.postalCode},{" "}
                    {order.billingAddress.country}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Address Form ─────────────────────────────────────────────────────────────
const EMPTY_ADDRESS: Address = {
  fullName: "",
  street: "",
  city: "",
  state: "",
  postalCode: "",
  country: "",
};

function AddressForm({
  onSave,
  onCancel,
  saving,
}: {
  onSave: (addr: Address) => void;
  onCancel: () => void;
  saving: boolean;
}) {
  const [form, setForm] = useState<Address>(EMPTY_ADDRESS);
  const update = (field: keyof Address, val: string) =>
    setForm((f) => ({ ...f, [field]: val }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !form.fullName ||
      !form.street ||
      !form.city ||
      !form.state ||
      !form.postalCode ||
      !form.country
    ) {
      toast.error("Please fill in all fields");
      return;
    }
    onSave(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <Label htmlFor="addr-fullName" className="text-xs font-semibold">
          Full Name
        </Label>
        <Input
          id="addr-fullName"
          data-ocid="address-full-name"
          value={form.fullName}
          onChange={(e) => update("fullName", e.target.value)}
          placeholder="John Doe"
          className="mt-1"
        />
      </div>
      <div>
        <Label htmlFor="addr-street" className="text-xs font-semibold">
          Street Address
        </Label>
        <Input
          id="addr-street"
          data-ocid="address-street"
          value={form.street}
          onChange={(e) => update("street", e.target.value)}
          placeholder="123 Main St"
          className="mt-1"
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label htmlFor="addr-city" className="text-xs font-semibold">
            City
          </Label>
          <Input
            id="addr-city"
            data-ocid="address-city"
            value={form.city}
            onChange={(e) => update("city", e.target.value)}
            placeholder="Austin"
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="addr-state" className="text-xs font-semibold">
            State
          </Label>
          <Input
            id="addr-state"
            data-ocid="address-state"
            value={form.state}
            onChange={(e) => update("state", e.target.value)}
            placeholder="TX"
            className="mt-1"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label htmlFor="addr-postal" className="text-xs font-semibold">
            Postal Code
          </Label>
          <Input
            id="addr-postal"
            data-ocid="address-postal"
            value={form.postalCode}
            onChange={(e) => update("postalCode", e.target.value)}
            placeholder="78701"
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="addr-country" className="text-xs font-semibold">
            Country
          </Label>
          <Input
            id="addr-country"
            data-ocid="address-country"
            value={form.country}
            onChange={(e) => update("country", e.target.value)}
            placeholder="United States"
            className="mt-1"
          />
        </div>
      </div>
      <div className="flex gap-2 pt-1">
        <Button
          type="submit"
          data-ocid="address-save-btn"
          disabled={saving}
          className="flex-1"
        >
          {saving ? "Saving…" : "Save Address"}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
}

// ─── Account Page ─────────────────────────────────────────────────────────────
export function AccountPage() {
  const navigate = useNavigate();
  const { isAuthenticated, principalText, login, loginStatus } = useAuth();

  const { data: orders, isLoading: ordersLoading } = useMyOrders();
  const { data: profile, isLoading: profileLoading } = useUserProfile();
  const saveProfile = useSaveUserProfile();
  const addAddress = useAddAddress();
  const removeAddress = useRemoveAddress();

  const [editingName, setEditingName] = useState(false);
  const [nameValue, setNameValue] = useState("");
  const [copied, setCopied] = useState(false);
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [deleteConfirmIdx, setDeleteConfirmIdx] = useState<number | null>(null);

  // Auth gate
  if (loginStatus !== "initializing" && !isAuthenticated) {
    return (
      <div
        data-ocid="account-login-gate"
        className="flex flex-col items-center justify-center min-h-[60vh] gap-6 px-4"
      >
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
          <User className="h-8 w-8 text-primary" />
        </div>
        <div className="text-center">
          <h2 className="text-title text-foreground mb-2">
            Sign in to your account
          </h2>
          <p className="text-muted-foreground max-w-xs">
            View your order history, manage saved addresses, and update your
            profile.
          </p>
        </div>
        <Button
          data-ocid="account-login-btn"
          size="lg"
          onClick={login}
          className="gap-2"
        >
          <User className="h-4 w-4" />
          Sign In with Internet Identity
        </Button>
        <button
          type="button"
          onClick={() => navigate({ to: "/" })}
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          ← Back to store
        </button>
      </div>
    );
  }

  const handleCopyPrincipal = () => {
    if (!principalText) return;
    navigator.clipboard.writeText(principalText);
    setCopied(true);
    toast.success("Principal ID copied");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveName = () => {
    if (!profile) return;
    saveProfile.mutate(
      { ...profile, displayName: nameValue },
      {
        onSuccess: () => {
          toast.success("Display name updated");
          setEditingName(false);
        },
        onError: () => toast.error("Failed to update name"),
      },
    );
  };

  const startEditName = () => {
    setNameValue(profile?.displayName ?? "");
    setEditingName(true);
  };

  const handleAddAddress = (addr: Address) => {
    addAddress.mutate(addr, {
      onSuccess: () => {
        toast.success("Address saved");
        setShowAddAddress(false);
      },
      onError: () => toast.error("Failed to save address"),
    });
  };

  const handleRemoveAddress = (idx: number) => {
    removeAddress.mutate(idx, {
      onSuccess: () => {
        toast.success("Address removed");
        setDeleteConfirmIdx(null);
      },
      onError: () => toast.error("Failed to remove address"),
    });
  };

  const sortedOrders = orders
    ? [...orders].sort((a, b) => Number(b.createdAt) - Number(a.createdAt))
    : [];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      {/* Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card border border-border rounded-sm p-6 shadow-subtle"
      >
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
            <User className="h-7 w-7 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            {profileLoading ? (
              <div className="space-y-2">
                <Skeleton className="h-5 w-40" />
                <Skeleton className="h-4 w-64" />
              </div>
            ) : (
              <>
                <div className="flex items-center gap-2 flex-wrap">
                  {editingName ? (
                    <div className="flex items-center gap-2">
                      <Input
                        data-ocid="display-name-input"
                        value={nameValue}
                        onChange={(e) => setNameValue(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") handleSaveName();
                          if (e.key === "Escape") setEditingName(false);
                        }}
                        className="h-8 text-sm w-48 font-display font-semibold"
                        autoFocus
                      />
                      <Button
                        size="sm"
                        data-ocid="display-name-save"
                        onClick={handleSaveName}
                        disabled={saveProfile.isPending}
                        className="h-8"
                      >
                        {saveProfile.isPending ? (
                          "…"
                        ) : (
                          <Check className="h-3 w-3" />
                        )}
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setEditingName(false)}
                        className="h-8"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <h1 className="text-headline text-foreground">
                        {profile?.displayName || "My Account"}
                      </h1>
                      <button
                        type="button"
                        data-ocid="edit-display-name"
                        onClick={startEditName}
                        aria-label="Edit display name"
                        className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded-sm"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  )}
                </div>
                {principalText && (
                  <button
                    type="button"
                    data-ocid="copy-principal"
                    onClick={handleCopyPrincipal}
                    className="flex items-center gap-1.5 mt-1 text-xs text-muted-foreground hover:text-foreground transition-colors font-mono group"
                    aria-label="Copy principal ID"
                  >
                    <span className="truncate max-w-[280px]">
                      {principalText.slice(0, 20)}…{principalText.slice(-6)}
                    </span>
                    {copied ? (
                      <Check className="h-3 w-3 text-accent shrink-0" />
                    ) : (
                      <Copy className="h-3 w-3 shrink-0 opacity-0 group-hover:opacity-100 transition-smooth" />
                    )}
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Tabs defaultValue="orders" className="space-y-4">
          <TabsList
            data-ocid="account-tabs"
            className="bg-muted/40 border border-border w-full sm:w-auto"
          >
            <TabsTrigger
              data-ocid="tab-orders"
              value="orders"
              className="gap-2"
            >
              <Package className="h-4 w-4" />
              Order History
            </TabsTrigger>
            <TabsTrigger
              data-ocid="tab-addresses"
              value="addresses"
              className="gap-2"
            >
              <MapPin className="h-4 w-4" />
              Saved Addresses
            </TabsTrigger>
          </TabsList>

          {/* Order History */}
          <TabsContent value="orders" className="space-y-3 outline-none">
            {ordersLoading ? (
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-14 w-full rounded-sm" />
                ))}
              </div>
            ) : sortedOrders.length === 0 ? (
              <motion.div
                data-ocid="orders-empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-16 gap-4 bg-card border border-border rounded-sm"
              >
                <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center">
                  <ShoppingBag className="h-7 w-7 text-muted-foreground" />
                </div>
                <div className="text-center">
                  <p className="font-display font-semibold text-foreground">
                    No orders yet
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Your order history will appear here after your first
                    purchase.
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  data-ocid="orders-empty-cta"
                  onClick={() =>
                    navigate({
                      to: "/catalog",
                      search: { category: undefined, q: undefined },
                    })
                  }
                >
                  Browse Products
                </Button>
              </motion.div>
            ) : (
              <>
                <div className="hidden sm:flex items-center gap-3 px-4 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  <span className="w-4" />
                  <span className="w-20">Order</span>
                  <span className="flex-1">Date</span>
                  <span className="w-24">Items</span>
                  <span className="w-24 text-right">Total</span>
                  <span className="w-24 text-center">Status</span>
                  <span className="w-6" />
                </div>
                <div className="space-y-2">
                  {sortedOrders.map((order, idx) => (
                    <OrderRow
                      key={order.id.toString()}
                      order={order}
                      index={idx}
                    />
                  ))}
                </div>
              </>
            )}
          </TabsContent>

          {/* Saved Addresses */}
          <TabsContent value="addresses" className="space-y-4 outline-none">
            {profileLoading ? (
              <div className="grid sm:grid-cols-2 gap-3">
                {[1, 2].map((i) => (
                  <Skeleton key={i} className="h-28 w-full rounded-sm" />
                ))}
              </div>
            ) : (
              <>
                {(!profile?.savedAddresses ||
                  profile.savedAddresses.length === 0) &&
                  !showAddAddress && (
                    <motion.div
                      data-ocid="addresses-empty"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex flex-col items-center justify-center py-16 gap-4 bg-card border border-border rounded-sm"
                    >
                      <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center">
                        <Home className="h-7 w-7 text-muted-foreground" />
                      </div>
                      <div className="text-center">
                        <p className="font-display font-semibold text-foreground">
                          No saved addresses
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                          Add an address for faster checkout next time.
                        </p>
                      </div>
                    </motion.div>
                  )}

                {profile?.savedAddresses &&
                  profile.savedAddresses.length > 0 && (
                    <div className="grid sm:grid-cols-2 gap-3">
                      {profile.savedAddresses.map(
                        (addr: Address, addrIdx: number) => (
                          <motion.div
                            key={`addr-${addrIdx}-${addr.postalCode}`}
                            data-ocid="address-card"
                            initial={{ opacity: 0, scale: 0.97 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: addrIdx * 0.07 }}
                            className="bg-card border border-border rounded-sm p-4 relative group shadow-subtle"
                          >
                            <div className="flex items-start gap-3">
                              <div className="w-8 h-8 rounded-sm bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                                <MapPin className="h-4 w-4 text-primary" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="font-display font-semibold text-sm text-foreground">
                                  {addr.fullName}
                                </p>
                                <p className="text-sm text-muted-foreground mt-0.5">
                                  {addr.street}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  {addr.city}, {addr.state} {addr.postalCode}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  {addr.country}
                                </p>
                              </div>
                            </div>
                            <button
                              type="button"
                              data-ocid="address-delete-btn"
                              onClick={() => setDeleteConfirmIdx(addrIdx)}
                              aria-label="Delete address"
                              className="absolute top-3 right-3 p-1.5 rounded-sm text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-smooth opacity-0 group-hover:opacity-100 focus-visible:opacity-100"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </motion.div>
                        ),
                      )}
                    </div>
                  )}

                {!showAddAddress && (
                  <Button
                    data-ocid="add-address-btn"
                    variant="outline"
                    className="gap-2"
                    onClick={() => setShowAddAddress(true)}
                  >
                    <Plus className="h-4 w-4" />
                    Add Address
                  </Button>
                )}

                <AnimatePresence>
                  {showAddAddress && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      className="bg-card border border-border rounded-sm p-5 shadow-subtle"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-display font-semibold text-sm text-foreground">
                          New Address
                        </h3>
                        <button
                          type="button"
                          onClick={() => setShowAddAddress(false)}
                          className="text-muted-foreground hover:text-foreground transition-colors"
                          aria-label="Close form"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                      <AddressForm
                        onSave={handleAddAddress}
                        onCancel={() => setShowAddAddress(false)}
                        saving={addAddress.isPending}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </>
            )}
          </TabsContent>
        </Tabs>
      </motion.div>

      {/* Delete Confirm Dialog */}
      <Dialog
        open={deleteConfirmIdx !== null}
        onOpenChange={(open) => {
          if (!open) setDeleteConfirmIdx(null);
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Address</DialogTitle>
            <DialogDescription>
              Are you sure you want to remove this saved address? This action
              cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-3 mt-2">
            <Button
              data-ocid="address-delete-confirm"
              variant="destructive"
              className="flex-1"
              disabled={removeAddress.isPending}
              onClick={() => {
                if (deleteConfirmIdx !== null)
                  handleRemoveAddress(deleteConfirmIdx);
              }}
            >
              {removeAddress.isPending ? "Deleting…" : "Delete"}
            </Button>
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => setDeleteConfirmIdx(null)}
            >
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
