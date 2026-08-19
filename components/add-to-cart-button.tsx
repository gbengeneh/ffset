"use client";

import { useState } from "react";
import { useCart, type CartItem } from "@/lib/cart-context";

type AddToCartButtonProps = {
  item: Omit<CartItem, "quantity">;
  className?: string;
};

export function AddToCartButton({ item, className = "" }: AddToCartButtonProps) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const soldOut = item.maxQuantity !== undefined && item.maxQuantity <= 0;

  return (
    <button
      type="button"
      disabled={soldOut}
      className={`luxury-button luxury-button-primary px-4 py-3 text-xs disabled:cursor-not-allowed disabled:opacity-40 ${className}`.trim()}
      onClick={() => {
        addItem(item);
        setAdded(true);
        window.setTimeout(() => setAdded(false), 1500);
      }}
    >
      {soldOut ? "Out of Stock" : added ? "Added ✓" : "Add to Cart"}
    </button>
  );
}
