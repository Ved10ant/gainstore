import { useCallback, useEffect, useState } from "react";
import type { LocalCartItem } from "../types/index";

const CART_KEY = "supplement_cart";

function loadCart(): LocalCartItem[] {
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? (JSON.parse(raw) as LocalCartItem[]) : [];
  } catch {
    return [];
  }
}

function saveCart(items: LocalCartItem[]) {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
}

export function useCart() {
  const [items, setItems] = useState<LocalCartItem[]>(loadCart);

  useEffect(() => {
    saveCart(items);
  }, [items]);

  const addItem = useCallback(
    (item: Omit<LocalCartItem, "quantity"> & { quantity?: number }) => {
      setItems((prev) => {
        const key = `${item.productId}-${item.variantIndex}`;
        const existing = prev.find(
          (i) => `${i.productId}-${i.variantIndex}` === key,
        );
        if (existing) {
          return prev.map((i) =>
            `${i.productId}-${i.variantIndex}` === key
              ? { ...i, quantity: i.quantity + (item.quantity ?? 1) }
              : i,
          );
        }
        return [...prev, { ...item, quantity: item.quantity ?? 1 }];
      });
    },
    [],
  );

  const removeItem = useCallback((productId: string, variantIndex: number) => {
    setItems((prev) =>
      prev.filter(
        (i) => !(i.productId === productId && i.variantIndex === variantIndex),
      ),
    );
  }, []);

  const updateQuantity = useCallback(
    (productId: string, variantIndex: number, quantity: number) => {
      if (quantity <= 0) {
        removeItem(productId, variantIndex);
        return;
      }
      setItems((prev) =>
        prev.map((i) =>
          i.productId === productId && i.variantIndex === variantIndex
            ? { ...i, quantity }
            : i,
        ),
      );
    },
    [removeItem],
  );

  const clearCart = useCallback(() => setItems([]), []);

  const totalItems = items.reduce((acc, i) => acc + i.quantity, 0);
  const totalCents = items.reduce(
    (acc, i) => acc + i.priceInCents * i.quantity,
    0,
  );

  return {
    items,
    totalItems,
    totalCents,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
  };
}
