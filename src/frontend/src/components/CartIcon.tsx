import { Link } from "@tanstack/react-router";
import { ShoppingCart } from "lucide-react";
import { useCart } from "../hooks/useCart";

export function CartIcon() {
  const { totalItems } = useCart();

  return (
    <Link
      to="/cart"
      className="relative flex items-center gap-1.5 text-foreground hover:text-primary transition-colors duration-200"
      aria-label={`Cart, ${totalItems} items`}
      data-ocid="cart-icon-link"
    >
      <ShoppingCart className="h-5 w-5" />
      {totalItems > 0 && (
        <span
          className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-primary-foreground text-[10px] font-bold leading-none"
          aria-hidden="true"
          data-ocid="cart-badge"
        >
          {totalItems > 99 ? "99+" : totalItems}
        </span>
      )}
    </Link>
  );
}
