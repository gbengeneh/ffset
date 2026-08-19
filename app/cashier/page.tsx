"use client";

import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { SelectField, TextField } from "@/components/forms/fields";
import { useApiResource } from "@/hooks/use-api-resource";
import {
  formatNaira,
  type CashierDashboardStats,
  type CashShift,
  type Product,
  type Sale,
} from "@/lib/admin-types";
import { api, ApiError } from "@/lib/api-client";
import { useAuth } from "@/lib/auth-context";

const TYPE_OPTIONS = [
  { label: "All products", value: "" },
  { label: "Wine", value: "wine" },
  { label: "Drink", value: "drink" },
  { label: "Gaming Package", value: "gaming_package" },
  { label: "Service", value: "service" },
];

const PAYMENT_OPTIONS = [
  { label: "Cash", value: "cash" },
  { label: "Card", value: "card" },
  { label: "Transfer", value: "transfer" },
];

type CartLine = { product: Product; quantity: number };

export default function CashierPosPage() {
  const { user } = useAuth();
  const { data: shift, loading: shiftLoading, refetch: refetchShift } = useApiResource<CashShift | null>(
    "/admin/shifts/current"
  );
  const { data: stats, refetch: refetchStats } = useApiResource<CashierDashboardStats>(
    "/admin/dashboard/cashier"
  );
  const [typeFilter, setTypeFilter] = useState("");
  const [search, setSearch] = useState("");
  const productsPath = typeFilter ? `/admin/products?type=${typeFilter}` : "/admin/products";
  const { data: products, loading: productsLoading, refetch: refetchProducts } = useApiResource<Product[]>(
    productsPath
  );

  const [cart, setCart] = useState<CartLine[]>([]);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [customerName, setCustomerName] = useState("");
  const [checkoutError, setCheckoutError] = useState<string | null>(null);
  const [checkingOut, setCheckingOut] = useState(false);
  const [lastSale, setLastSale] = useState<Sale | null>(null);
  const [receiptOpen, setReceiptOpen] = useState(false);
  const [openFloat, setOpenFloat] = useState("");
  const [openError, setOpenError] = useState<string | null>(null);
  const [opening, setOpening] = useState(false);
  const [showCloseShift, setShowCloseShift] = useState(false);
  const [closingCount, setClosingCount] = useState("");
  const [closeError, setCloseError] = useState<string | null>(null);
  const [closing, setClosing] = useState(false);
  const [closedSummary, setClosedSummary] = useState<CashShift | null>(null);
  const [headerSlot, setHeaderSlot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const openCloseShift = () => setShowCloseShift(true);
    window.addEventListener("ffset:open-close-shift", openCloseShift);

    const frame = window.requestAnimationFrame(() => {
      setHeaderSlot(document.getElementById("cashier-header-center"));

      if (window.sessionStorage.getItem("ffset_open_close_shift") === "1") {
        window.sessionStorage.removeItem("ffset_open_close_shift");
        setShowCloseShift(true);
      }
    });

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("ffset:open-close-shift", openCloseShift);
    };
  }, []);

  const visibleProducts = useMemo(() => {
    const list = products ?? [];
    const query = search.trim().toLowerCase();
    return query ? list.filter((product) => product.name.toLowerCase().includes(query)) : list;
  }, [products, search]);

  const subtotal = cart.reduce((sum, line) => sum + Number(line.product.price) * line.quantity, 0);
  const itemCount = cart.reduce((sum, line) => sum + line.quantity, 0);
  const hasOpenShift = Boolean(shift && shift.status === "open");

  function addToCart(product: Product) {
    setLastSale(null);
    setCart((current) => {
      const existing = current.find((line) => line.product.id === product.id);
      const maxQty = product.is_stocked && product.stock_quantity !== null ? product.stock_quantity : Infinity;
      if (existing) {
        if (existing.quantity >= maxQty) return current;
        return current.map((line) =>
          line.product.id === product.id ? { ...line, quantity: line.quantity + 1 } : line
        );
      }
      return maxQty < 1 ? current : [...current, { product, quantity: 1 }];
    });
  }

  function changeQuantity(productId: number, delta: number) {
    setCart((current) =>
      current
        .map((line) => {
          if (line.product.id !== productId) return line;
          const maxQty =
            line.product.is_stocked && line.product.stock_quantity !== null
              ? line.product.stock_quantity
              : Infinity;
          return { ...line, quantity: Math.min(Math.max(line.quantity + delta, 0), maxQty) };
        })
        .filter((line) => line.quantity > 0)
    );
  }

  function removeFromCart(productId: number) {
    setCart((current) => current.filter((line) => line.product.id !== productId));
  }

  async function handleOpenShift(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setOpenError(null);
    setOpening(true);
    try {
      await api.post("/admin/shifts/open", { opening_float: Number(openFloat || 0) });
      setOpenFloat("");
      setClosedSummary(null);
      refetchShift();
      refetchStats();
    } catch (error) {
      setOpenError(error instanceof ApiError ? error.message : "Could not start your shift.");
    } finally {
      setOpening(false);
    }
  }

  async function handleCloseShift(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!shift) return;
    setCloseError(null);
    setClosing(true);
    try {
      const closed = await api.post<CashShift>(`/admin/shifts/${shift.id}/close`, {
        closing_count: Number(closingCount || 0),
      });
      setClosedSummary(closed);
      setClosingCount("");
      setShowCloseShift(false);
      setCart([]);
      refetchShift();
      refetchStats();
    } catch (error) {
      setCloseError(error instanceof ApiError ? error.message : "Could not close shift.");
    } finally {
      setClosing(false);
    }
  }

  async function handleCheckout() {
    if (!cart.length) return;
    setCheckoutError(null);
    setCheckingOut(true);
    try {
      const sale = await api.post<Sale>("/admin/sales", {
        status: "completed",
        payment_method: paymentMethod,
        customer_name: customerName || null,
        items: cart.map((line) => ({ product_id: line.product.id, quantity: line.quantity })),
      });
      setLastSale(sale);
      setReceiptOpen(true);
      setCart([]);
      setCustomerName("");
      refetchProducts();
      refetchStats();
    } catch (error) {
      setCheckoutError(error instanceof ApiError ? error.message : "Could not complete sale.");
    } finally {
      setCheckingOut(false);
    }
  }

  if (shiftLoading) {
    return (
      <div className="flex min-h-[calc(100vh-9rem)] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-white/10 border-t-[var(--gold)]" />
          <p className="mt-4 text-sm text-[var(--muted)]">Preparing your till…</p>
        </div>
      </div>
    );
  }

  if (!hasOpenShift) {
    return (
      <div className="flex min-h-[calc(100vh-9rem)] items-center justify-center py-8">
        <section className="glass-panel relative w-full max-w-xl overflow-hidden rounded-3xl p-7 sm:p-10">
          <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[rgba(213,170,77,0.12)] blur-3xl" />
          <div className="relative">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[rgba(213,170,77,0.24)] bg-[rgba(213,170,77,0.08)] text-2xl">
              ◷
            </div>
            <p className="eyebrow mt-7 text-[0.68rem]">Till closed</p>
            <h1 className="display-font mt-2 text-3xl text-white sm:text-4xl">Start your shift</h1>
            <p className="mt-3 max-w-md text-sm leading-6 text-[var(--muted)]">
              Confirm the cash currently in your drawer. Your sales workspace will unlock when the shift begins.
            </p>

            {closedSummary ? (
              <div className="mt-6 grid grid-cols-3 gap-2 rounded-2xl border border-white/8 bg-black/15 p-4 text-center">
                <div>
                  <p className="text-[0.65rem] uppercase tracking-wider text-[var(--muted)]">Expected</p>
                  <p className="mt-1 text-sm text-white">{formatNaira(closedSummary.expected_cash ?? 0)}</p>
                </div>
                <div className="border-x border-white/8">
                  <p className="text-[0.65rem] uppercase tracking-wider text-[var(--muted)]">Counted</p>
                  <p className="mt-1 text-sm text-white">{formatNaira(closedSummary.closing_count ?? 0)}</p>
                </div>
                <div>
                  <p className="text-[0.65rem] uppercase tracking-wider text-[var(--muted)]">Difference</p>
                  <p className="mt-1 text-sm text-[var(--gold-soft)]">{formatNaira(closedSummary.discrepancy ?? 0)}</p>
                </div>
              </div>
            ) : null}

            <form className="mt-7 space-y-5" onSubmit={handleOpenShift}>
              <TextField
                label="Opening cash float (₦)"
                name="opening_float"
                type="number"
                min={0}
                step="0.01"
                placeholder="0.00"
                value={openFloat}
                onChange={(event) => setOpenFloat(event.target.value)}
                required
              />
              {openError ? <p className="text-sm text-[rgb(220,145,145)]">{openError}</p> : null}
              <button
                type="submit"
                className="luxury-button luxury-button-primary w-full justify-center py-4 text-sm"
                disabled={opening}
              >
                {opening ? "Starting shift…" : "Start Shift & Open POS"}
              </button>
            </form>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 xl:h-[calc(100dvh-8rem)] xl:min-h-0">
      {headerSlot
        ? createPortal(
            <div className="flex flex-wrap items-center justify-center gap-3 rounded-xl border border-white/8 bg-white/[0.035] px-3 py-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-50" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              <div className="whitespace-nowrap">
                <p className="text-xs font-semibold text-white">Shift active</p>
                <p className="text-[0.64rem] text-[var(--muted)]">
                  {new Date(shift!.opened_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  {" · "}{formatNaira(shift!.opening_float)} float
                  {stats ? ` · ${stats.sales_today_count} sales` : ""}
                </p>
              </div>
              <button
                type="button"
                className="ml-1 rounded-lg border border-white/10 px-2.5 py-1.5 text-[0.65rem] font-semibold text-[var(--muted)] transition hover:border-[rgba(220,145,145,0.4)] hover:text-white"
                onClick={() => {
                  setCloseError(null);
                  setShowCloseShift((current) => !current);
                }}
              >
                {showCloseShift ? "Cancel" : "Close"}
              </button>
            </div>,
            headerSlot
          )
        : null}

      {showCloseShift ? (
        <section className="rounded-2xl border border-[rgba(220,145,145,0.22)] bg-[rgba(35,18,21,0.72)] p-5">
          <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
            <div>
              <p className="text-sm font-semibold text-white">Close this shift?</p>
              <p className="mt-1 text-xs leading-5 text-[var(--muted)]">
                Count all cash in the drawer. The POS will lock immediately after confirmation.
              </p>
            </div>
            <form className="flex flex-col gap-3 sm:flex-row sm:items-end" onSubmit={handleCloseShift}>
              <div className="min-w-56">
                <TextField
                  label="Closing cash count (₦)"
                  name="closing_count"
                  type="number"
                  min={0}
                  step="0.01"
                  value={closingCount}
                  onChange={(event) => setClosingCount(event.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                className="rounded-xl bg-[rgba(180,65,85,0.9)] px-5 py-3.5 text-xs font-bold text-white transition hover:bg-[rgb(190,72,92)]"
                disabled={closing}
              >
                {closing ? "Closing…" : "Confirm Close Shift"}
              </button>
            </form>
          </div>
          {closeError ? <p className="mt-3 text-sm text-[rgb(220,145,145)]">{closeError}</p> : null}
        </section>
      ) : null}

      {stats && stats.low_stock_products.length > 0 ? (
        <div className="rounded-xl border border-[rgba(213,170,77,0.22)] bg-[rgba(213,170,77,0.06)] px-4 py-2.5">
          <p className="text-xs text-[var(--gold-soft)]">
            Low stock · {stats.low_stock_products.map((product) => `${product.name} (${product.stock_quantity ?? 0})`).join(", ")}
          </p>
        </div>
      ) : null}

      <div className="grid min-h-[calc(100vh-14rem)] gap-4 xl:min-h-0 xl:flex-1 xl:grid-cols-[minmax(280px,30%)_minmax(0,70%)]">
        <aside className="flex min-h-0 flex-col overflow-hidden rounded-2xl border border-white/8 bg-[rgba(20,14,15,0.52)] p-4">
          <div className="mb-4">
            <p className="eyebrow text-[0.64rem]">Product catalogue</p>
            <p className="mt-1 text-xs text-[var(--muted)]">{visibleProducts.length} items available</p>
          </div>
          <div>
            <label htmlFor="product-search" className="form-label">
              Find a product
            </label>
            <div className="mt-2 flex overflow-hidden rounded-2xl border border-[rgba(213,170,77,0.15)] bg-white/[0.03] transition focus-within:border-[rgba(213,170,77,0.55)] focus-within:shadow-[0_0_0_4px_rgba(213,170,77,0.08)]">
              <div className="flex min-w-0 flex-1 items-center gap-2 pl-3">
                <span aria-hidden="true" className="text-sm text-[var(--muted)]">
                  ⌕
                </span>
                <input
                  id="product-search"
                  name="search"
                  type="search"
                  placeholder="Search…"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  className="min-w-0 flex-1 bg-transparent py-3 text-sm text-white outline-none placeholder:text-white/35"
                />
              </div>
              <div className="my-2 w-px bg-white/10" />
              <select
                aria-label="Product category"
                name="type_filter"
                value={typeFilter}
                onChange={(event) => setTypeFilter(event.target.value)}
                className="max-w-32 cursor-pointer bg-transparent px-3 text-xs font-semibold text-[var(--gold-soft)] outline-none"
              >
                {TYPE_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value} className="bg-[#171011] text-white">
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="scrollbar-none mt-4 grid max-h-[58vh] grid-cols-2 gap-2 overflow-y-auto pr-1 xl:min-h-0 xl:flex-1 xl:grid-cols-1 xl:content-start 2xl:grid-cols-2">
            {productsLoading ? (
              <p className="col-span-full py-10 text-center text-sm text-[var(--muted)]">Loading products…</p>
            ) : visibleProducts.length ? (
              visibleProducts.map((product) => {
                const outOfStock = product.is_stocked && (product.stock_quantity ?? 0) <= 0;
                return (
                  <button
                    key={product.id}
                    type="button"
                    disabled={outOfStock}
                    onClick={() => addToCart(product)}
                    className="group min-h-24 rounded-xl border border-white/8 bg-white/[0.025] p-3 text-left transition hover:-translate-y-0.5 hover:border-[rgba(213,170,77,0.38)] hover:bg-white/[0.05] disabled:cursor-not-allowed disabled:opacity-35"
                  >
                    <span className="line-clamp-2 text-sm font-medium leading-5 text-white">{product.name}</span>
                    <span className="mt-2 block text-sm font-bold text-[var(--gold-soft)]">{formatNaira(product.price)}</span>
                    {product.is_stocked ? (
                      <span className="mt-1 block text-[0.65rem] text-[var(--muted)]">
                        {outOfStock ? "Out of stock" : `${product.stock_quantity} left`}
                      </span>
                    ) : null}
                  </button>
                );
              })
            ) : (
              <p className="col-span-full py-10 text-center text-sm text-[var(--muted)]">No matching products.</p>
            )}
          </div>
        </aside>

        <main className="flex min-h-0 min-w-0 flex-col overflow-hidden rounded-xl border border-white/8 bg-[rgba(20,14,15,0.62)] xl:h-full">
          <div className="shrink-0 flex flex-wrap items-center justify-between gap-3 border-b border-white/8 px-5 py-3.5 sm:px-6">
            <div>
              <p className="eyebrow text-[0.64rem]">Current transaction</p>
              <p className="mt-1 text-xs text-[var(--muted)]">{itemCount} {itemCount === 1 ? "item" : "items"} in basket</p>
            </div>
            <div className="flex flex-1 items-center justify-end gap-3">
              <label className="flex min-w-0 max-w-64 flex-1 items-center gap-2 rounded-lg border border-white/10 bg-black/15 px-3 focus-within:border-[rgba(213,170,77,0.42)]">
                <span className="shrink-0 text-[0.62rem] font-bold uppercase tracking-wider text-[var(--muted)]">
                  Customer
                </span>
                <input
                  name="customer_name"
                  type="text"
                  aria-label="Customer name, optional"
                  placeholder="Walk-in"
                  value={customerName}
                  onChange={(event) => setCustomerName(event.target.value)}
                  className="min-w-0 flex-1 bg-transparent py-2 text-sm text-white outline-none placeholder:text-white/30"
                />
              </label>
              {cart.length ? (
                <button
                  type="button"
                  className="shrink-0 text-xs font-semibold text-[var(--muted)] transition hover:text-[rgb(220,145,145)]"
                  onClick={() => setCart([])}
                >
                  Clear sale
                </button>
              ) : null}
            </div>
          </div>

          <div className="min-h-64 flex-1 overflow-y-auto overscroll-contain xl:h-0 xl:min-h-0">
            {cart.length === 0 ? (
              <div className="flex h-full min-h-72 flex-col items-center justify-center px-6 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/8 bg-white/[0.025] text-2xl text-[var(--muted)]">＋</div>
                <p className="mt-4 text-base font-semibold text-white">Ready for a new sale</p>
                <p className="mt-1 max-w-xs text-sm leading-6 text-[var(--muted)]">Select products from the catalogue to begin.</p>
              </div>
            ) : (
              <div className="divide-y divide-white/8">
                {cart.map((line) => (
                  <div key={line.product.id} className="grid grid-cols-[minmax(0,1fr)_auto_auto_auto] items-center gap-3 px-5 py-4 sm:gap-4 sm:px-6">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-white">{line.product.name}</p>
                      <p className="mt-1 text-xs text-[var(--muted)]">{formatNaira(line.product.price)} each</p>
                    </div>
                    <div className="flex items-center rounded-xl border border-white/10 bg-black/15">
                      <button type="button" className="h-9 w-9 text-[var(--muted)] transition hover:text-white" onClick={() => changeQuantity(line.product.id, -1)}>−</button>
                      <span className="w-8 text-center text-sm font-semibold text-white">{line.quantity}</span>
                      <button type="button" className="h-9 w-9 text-[var(--muted)] transition hover:text-white" onClick={() => changeQuantity(line.product.id, 1)}>+</button>
                    </div>
                    <p className="w-24 text-right text-sm font-bold text-white">{formatNaira(Number(line.product.price) * line.quantity)}</p>
                    <button
                      type="button"
                      aria-label={`Remove ${line.product.name} from sale`}
                      title="Remove item"
                      className="flex h-9 w-9 items-center justify-center rounded-lg text-[var(--muted)] transition hover:bg-[rgba(190,72,92,0.12)] hover:text-[rgb(220,145,145)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(220,145,145,0.45)]"
                      onClick={() => removeFromCart(line.product.id)}
                    >
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        className="h-4 w-4"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M9 7V4h6v3m3 0-1 13H7L6 7m4 4v5m4-5v5" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="sticky bottom-0 z-20 shrink-0 border-t border-[rgba(213,170,77,0.16)] bg-[rgba(13,9,10,0.96)] p-4 shadow-[0_-18px_40px_rgba(0,0,0,0.28)] backdrop-blur-xl [&_.form-input]:rounded-lg">
            {lastSale ? (
              <div className="mb-3 flex items-center justify-between rounded-lg border border-emerald-400/20 bg-emerald-400/[0.07] px-3 py-2.5">
                <p className="text-sm text-emerald-200">Sale {lastSale.sale_number} completed successfully.</p>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-white">{formatNaira(lastSale.total)}</span>
                  <button
                    type="button"
                    className="text-xs font-semibold text-emerald-200 underline decoration-emerald-200/40 underline-offset-4"
                    onClick={() => setReceiptOpen(true)}
                  >
                    Receipt
                  </button>
                </div>
              </div>
            ) : null}
            {checkoutError ? <p className="mt-3 text-sm text-[rgb(220,145,145)]">{checkoutError}</p> : null}
            <div className="grid items-end gap-3 md:grid-cols-[140px_1fr_auto]">
              <SelectField
                label="Payment"
                name="payment_method"
                value={paymentMethod}
                onChange={(event) => setPaymentMethod(event.target.value)}
                options={PAYMENT_OPTIONS}
              />
              <div className="min-w-36 md:justify-self-end md:px-3 md:text-right">
                <p className="text-xs uppercase tracking-[0.18em] text-[var(--muted)]">Amount due</p>
                <p className="mt-1 text-2xl font-bold tracking-tight text-white">{formatNaira(subtotal)}</p>
              </div>
              <button
                type="button"
                className="luxury-button luxury-button-primary min-h-[3.25rem] min-w-48 !rounded-lg justify-center px-6 py-3 text-sm"
                disabled={!cart.length || checkingOut}
                onClick={handleCheckout}
              >
                {checkingOut ? "Processing…" : `Complete ${paymentMethod} sale`}
              </button>
            </div>
          </div>
        </main>
      </div>

      {receiptOpen && lastSale ? (
        <div
          className="receipt-overlay fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="receipt-title"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setReceiptOpen(false);
          }}
        >
          <div className="receipt-dialog flex max-h-[92dvh] w-full max-w-sm flex-col overflow-hidden rounded-xl bg-[#f7f4ed] text-[#181312] shadow-2xl">
            <div className="receipt-actions flex shrink-0 items-center justify-between border-b border-black/10 bg-white px-4 py-3">
              <div>
                <p className="text-sm font-bold text-[#181312]">Sale receipt</p>
                <p className="text-xs text-[#6b625d]">{lastSale.sale_number}</p>
              </div>
              <button
                type="button"
                aria-label="Close receipt"
                className="flex h-8 w-8 items-center justify-center rounded-md border border-black/10 text-lg text-[#6b625d] hover:bg-black/5"
                onClick={() => setReceiptOpen(false)}
              >
                ×
              </button>
            </div>

            <div className="receipt-scroll overflow-y-auto">
              <article className="receipt-print-root mx-auto w-full bg-[#f7f4ed] px-6 py-7 font-mono text-[12px] leading-5 text-[#181312]">
                <header className="text-center">
                  <p className="font-sans text-xl font-black uppercase tracking-[0.16em]">FFSET</p>
                  <p className="mt-1 font-sans text-[10px] font-semibold uppercase tracking-[0.28em] text-[#6b625d]">
                    Lounge · Sales Receipt
                  </p>
                </header>

                <div className="my-5 border-t border-dashed border-black/35" />

                <dl className="space-y-1">
                  <div className="flex justify-between gap-4">
                    <dt className="text-[#6b625d]">Receipt</dt>
                    <dd className="text-right font-semibold">{lastSale.sale_number}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-[#6b625d]">Date</dt>
                    <dd className="text-right">
                      {new Date(lastSale.created_at).toLocaleString("en-NG", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-[#6b625d]">Cashier</dt>
                    <dd className="text-right">{user?.name ?? "FFSET Cashier"}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-[#6b625d]">Customer</dt>
                    <dd className="text-right">{lastSale.customer_name || "Walk-in"}</dd>
                  </div>
                </dl>

                <div className="my-5 border-t border-dashed border-black/35" />

                <div className="space-y-3">
                  {lastSale.items.map((item) => (
                    <div key={item.id}>
                      <p className="font-semibold">{item.product?.name ?? `Item #${item.product_id}`}</p>
                      <div className="mt-0.5 flex justify-between gap-4 text-[#514945]">
                        <span>{item.quantity} × {formatNaira(item.unit_price)}</span>
                        <span className="font-semibold text-[#181312]">{formatNaira(item.line_total)}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="my-5 border-t border-dashed border-black/35" />

                <dl className="space-y-1.5">
                  <div className="flex justify-between">
                    <dt>Subtotal</dt>
                    <dd>{formatNaira(lastSale.subtotal)}</dd>
                  </div>
                  <div className="flex items-end justify-between border-t border-black/15 pt-3 font-sans">
                    <dt className="text-sm font-bold uppercase tracking-wider">Total</dt>
                    <dd className="text-xl font-black">{formatNaira(lastSale.total)}</dd>
                  </div>
                  <div className="flex justify-between pt-1 font-sans text-[10px] uppercase tracking-wider text-[#6b625d]">
                    <dt>Payment</dt>
                    <dd>{lastSale.payment_method ?? "Not specified"}</dd>
                  </div>
                </dl>

                <div className="my-6 border-t border-dashed border-black/35" />

                <footer className="text-center font-sans">
                  <p className="text-sm font-bold">Thank you for visiting.</p>
                  <p className="mt-1 text-[10px] leading-4 text-[#6b625d]">
                    Please keep this receipt for your records.
                  </p>
                </footer>
              </article>
            </div>

            <div className="receipt-actions grid shrink-0 grid-cols-2 gap-2 border-t border-black/10 bg-white p-3">
              <button
                type="button"
                className="rounded-md border border-black/15 px-4 py-3 text-sm font-bold text-[#514945] hover:bg-black/5"
                onClick={() => setReceiptOpen(false)}
              >
                Done
              </button>
              <button
                type="button"
                className="rounded-md bg-[#181312] px-4 py-3 text-sm font-bold text-white hover:bg-black"
                onClick={() => window.print()}
              >
                Print Receipt
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
