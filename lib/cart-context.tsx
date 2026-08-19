"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { formatNaira } from "@/lib/admin-types";

export type CartItem = {
  productId: number;
  name: string;
  price: string;
  imageUrl?: string;
  type: "wine" | "drink" | "gaming_package";
  quantity: number;
  maxQuantity?: number;
};

type CartContextValue = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  removeItem: (productId: number) => void;
  clear: () => void;
  itemCount: number;
  subtotal: number;
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

const CART_KEY = "ffset_cart";
const CartContext = createContext<CartContextValue | null>(null);

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }

  return context;
}

function CloseIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    >
      <path d="m5 5 10 10M15 5 5 15" />
    </svg>
  );
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    void Promise.resolve().then(() => {
      const stored = window.localStorage.getItem(CART_KEY);

      if (stored) {
        try {
          setItems(JSON.parse(stored) as CartItem[]);
        } catch {
          setItems([]);
        }
      }

      setHydrated(true);
    });
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(CART_KEY, JSON.stringify(items));
  }, [items, hydrated]);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  const addItem = useCallback((item: Omit<CartItem, "quantity">, quantity = 1) => {
    setItems((current) => {
      const existing = current.find((row) => row.productId === item.productId);
      const cap = item.maxQuantity;

      if (existing) {
        const nextQuantity = cap ? Math.min(existing.quantity + quantity, cap) : existing.quantity + quantity;
        return current.map((row) =>
          row.productId === item.productId ? { ...row, quantity: nextQuantity } : row
        );
      }

      const nextQuantity = cap ? Math.min(quantity, cap) : quantity;
      return [...current, { ...item, quantity: nextQuantity }];
    });
    setIsOpen(true);
  }, []);

  const updateQuantity = useCallback((productId: number, quantity: number) => {
    setItems((current) =>
      current
        .map((row) =>
          row.productId === productId
            ? { ...row, quantity: row.maxQuantity ? Math.min(quantity, row.maxQuantity) : quantity }
            : row
        )
        .filter((row) => row.quantity > 0)
    );
  }, []);

  const removeItem = useCallback((productId: number) => {
    setItems((current) => current.filter((row) => row.productId !== productId));
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const itemCount = useMemo(() => items.reduce((sum, item) => sum + item.quantity, 0), [items]);
  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0),
    [items]
  );

  const value = useMemo(
    () => ({ items, addItem, updateQuantity, removeItem, clear, itemCount, subtotal, isOpen, open, close }),
    [items, addItem, updateQuantity, removeItem, clear, itemCount, subtotal, isOpen, open, close]
  );

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };

    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, close]);

  return (
    <CartContext.Provider value={value}>
      {children}
      <AnimatePresence>
        {isOpen ? (
          <motion.div
            className="fixed inset-0 z-100 flex justify-end"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
          >
            <motion.div
              className="fixed inset-0 bg-black/78 backdrop-blur-sm"
              onClick={close}
              aria-hidden="true"
            />

            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Your cart"
              className="glass-panel relative flex h-full w-full max-w-md flex-col rounded-l-[1.6rem] p-5 sm:p-6"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center justify-between">
                <h2 className="display-font text-xl text-white">Your Cart</h2>
                <button
                  type="button"
                  onClick={close}
                  aria-label="Close cart"
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[var(--muted)] transition hover:border-white/20 hover:text-white"
                >
                  <CloseIcon />
                </button>
              </div>

              {items.length === 0 ? (
                <p className="mt-6 text-sm text-[var(--muted)]">
                  Your cart is empty. Browse{" "}
                  <Link href="/wines" className="text-[var(--gold-soft)] underline" onClick={close}>
                    wines
                  </Link>{" "}
                  or{" "}
                  <Link href="/gaming" className="text-[var(--gold-soft)] underline" onClick={close}>
                    gaming packages
                  </Link>{" "}
                  to get started.
                </p>
              ) : (
                <>
                  <div className="mt-5 flex-1 space-y-3 overflow-y-auto pr-1">
                    {items.map((item) => (
                      <div
                        key={item.productId}
                        className="flex items-center gap-3 rounded-[1.15rem] border border-white/8 bg-white/[0.03] p-3"
                      >
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm text-white">{item.name}</p>
                          <p className="text-xs text-[var(--muted)]">{formatNaira(item.price)}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            className="flex h-7 w-7 items-center justify-center rounded-full border border-white/10 text-[var(--muted)] transition hover:border-white/20 hover:text-white"
                            onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                          >
                            −
                          </button>
                          <span className="w-5 text-center text-sm text-white">{item.quantity}</span>
                          <button
                            type="button"
                            className="flex h-7 w-7 items-center justify-center rounded-full border border-white/10 text-[var(--muted)] transition hover:border-white/20 hover:text-white disabled:opacity-30"
                            disabled={item.maxQuantity !== undefined && item.quantity >= item.maxQuantity}
                            onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                          >
                            +
                          </button>
                        </div>
                        <button
                          type="button"
                          aria-label={`Remove ${item.name}`}
                          className="text-[var(--muted)] transition hover:text-white"
                          onClick={() => removeItem(item.productId)}
                        >
                          <CloseIcon />
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 space-y-3 border-t border-white/8 pt-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-[var(--muted)]">Subtotal</span>
                      <span className="display-font text-lg text-[var(--gold)]">{formatNaira(subtotal)}</span>
                    </div>
                    <Link
                      href="/checkout"
                      className="luxury-button luxury-button-primary block w-full text-center"
                      onClick={close}
                    >
                      Checkout
                    </Link>
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </CartContext.Provider>
  );
}
