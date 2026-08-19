"use client";

import Link from "next/link";
import { useState } from "react";
import { TextAreaField, TextField } from "@/components/forms/fields";
import { PageSection, Panel } from "@/components/ui";
import { formatNaira } from "@/lib/admin-types";
import { useCart } from "@/lib/cart-context";
import { initializePayment } from "@/lib/payment";
import { PublicApiError, submitPublicForm } from "@/lib/public-form";
import { bankTransferDetails } from "@/lib/site-data";

type OrderResponse = {
  reference_code: string;
  sale?: { id: number; total: string };
};

export default function CheckoutPage() {
  const { items, subtotal, clear } = useCart();
  const [fulfillmentType, setFulfillmentType] = useState<"pickup" | "delivery">("pickup");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [order, setOrder] = useState<OrderResponse | null>(null);
  const [customerEmail, setCustomerEmail] = useState("");
  const [payingNow, setPayingNow] = useState(false);
  const [payError, setPayError] = useState<string | null>(null);

  const hasPhysicalItem = items.some((item) => item.type !== "gaming_package");

  if (order) {
    return (
      <PageSection className="section-space">
        <Panel className="mx-auto max-w-lg space-y-4 p-6 text-center">
          <p className="eyebrow">Order Received</p>
          <h1 className="display-font text-2xl text-white">Thank you — your order is in.</h1>
          <p className="text-sm leading-6 text-[var(--muted)]">
            Reference <span className="text-white">{order.reference_code}</span>. Pay{" "}
            {order.sale ? formatNaira(order.sale.total) : "the order total"} to{" "}
            <span className="text-white">{bankTransferDetails.bankName}</span>,{" "}
            <span className="text-white">{bankTransferDetails.accountNumber}</span> (
            {bankTransferDetails.accountName}), using your reference as the transfer narration. The
            team will confirm your order once payment is verified.
          </p>

          {order.sale ? (
            <div className="space-y-2">
              <button
                type="button"
                className="luxury-button luxury-button-primary w-full justify-center"
                disabled={payingNow}
                onClick={async () => {
                  setPayError(null);
                  setPayingNow(true);
                  try {
                    const { authorization_url } = await initializePayment(order.sale!.id, customerEmail);
                    window.location.href = authorization_url;
                  } catch (payingError) {
                    setPayError(
                      payingError instanceof PublicApiError
                        ? payingError.message
                        : "Could not start payment."
                    );
                    setPayingNow(false);
                  }
                }}
              >
                {payingNow ? "Redirecting..." : "Pay Now with Card"}
              </button>
              {payError ? <p className="text-sm text-[rgb(220,145,145)]">{payError}</p> : null}
            </div>
          ) : null}

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link href="/wines" className="luxury-button luxury-button-secondary px-5 py-3 text-sm">
              Continue Browsing
            </Link>
            <Link href="/" className="luxury-button luxury-button-primary px-5 py-3 text-sm">
              Back Home
            </Link>
          </div>
        </Panel>
      </PageSection>
    );
  }

  if (items.length === 0) {
    return (
      <PageSection className="section-space">
        <Panel className="mx-auto max-w-lg space-y-4 p-6 text-center">
          <p className="eyebrow">Checkout</p>
          <h1 className="display-font text-2xl text-white">Your cart is empty.</h1>
          <p className="text-sm text-[var(--muted)]">
            Browse the wine list or gaming packages and add something to get started.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link href="/wines" className="luxury-button luxury-button-secondary px-5 py-3 text-sm">
              View Wines
            </Link>
            <Link href="/gaming" className="luxury-button luxury-button-primary px-5 py-3 text-sm">
              View Gaming Packages
            </Link>
          </div>
        </Panel>
      </PageSection>
    );
  }

  return (
    <PageSection className="section-space">
      <div className="grid gap-4 lg:grid-cols-[1fr_1.1fr]">
        <Panel className="h-fit space-y-3" compact>
          <p className="eyebrow">Order Summary</p>
          <div className="space-y-2.5">
            {items.map((item) => (
              <div key={item.productId} className="flex items-center justify-between gap-3 text-sm">
                <div>
                  <p className="text-white">{item.name}</p>
                  <p className="text-xs text-[var(--muted)]">Qty {item.quantity}</p>
                </div>
                <span className="text-[var(--muted)]">
                  {formatNaira(Number(item.price) * item.quantity)}
                </span>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between border-t border-white/8 pt-3 text-sm">
            <span className="text-[var(--muted)]">Subtotal</span>
            <span className="display-font text-lg text-[var(--gold)]">{formatNaira(subtotal)}</span>
          </div>
        </Panel>

        <Panel compact>
          <p className="eyebrow">Your Details</p>
          <form
            className="mt-2.5 space-y-2.5"
            onSubmit={async (event) => {
              event.preventDefault();
              setError(null);
              setSubmitting(true);

              const form = event.currentTarget;
              const formData = new FormData(form);
              const submittedEmail = String(formData.get("email") ?? "");

              try {
                const response = await submitPublicForm<OrderResponse>("/orders", {
                  name: formData.get("fullName"),
                  phone: formData.get("phone"),
                  email: submittedEmail,
                  fulfillment_type: hasPhysicalItem ? fulfillmentType : "pickup",
                  delivery_address:
                    hasPhysicalItem && fulfillmentType === "delivery"
                      ? formData.get("deliveryAddress")
                      : null,
                  notes: formData.get("notes") || null,
                  items: items.map((item) => ({ product_id: item.productId, quantity: item.quantity })),
                });

                clear();
                setCustomerEmail(submittedEmail);
                setOrder(response);
              } catch (submissionError) {
                setError(
                  submissionError instanceof PublicApiError
                    ? submissionError.message
                    : "Order submission failed."
                );
              } finally {
                setSubmitting(false);
              }
            }}
          >
            <div className="grid gap-2.5 sm:grid-cols-2">
              <TextField className="rounded-xl py-2.5" label="Full Name" name="fullName" placeholder="Your full name" autoComplete="name" minLength={3} required />
              <TextField className="rounded-xl py-2.5" label="Phone Number" name="phone" type="tel" placeholder="0800 000 0000" autoComplete="tel" minLength={7} required />
            </div>
            <TextField className="rounded-xl py-2.5" label="Email Address" name="email" type="email" placeholder="you@example.com" autoComplete="email" required />

            {hasPhysicalItem ? (
              <div className="space-y-1.5">
                <span className="form-label">Fulfillment</span>
                <div className="flex gap-2">
                  {(["pickup", "delivery"] as const).map((option) => (
                    <button
                      key={option}
                      type="button"
                      className={`flex-1 rounded-xl border px-3 py-2 text-sm capitalize transition ${
                        fulfillmentType === option
                          ? "border-[rgba(213,170,77,0.4)] bg-[rgba(213,170,77,0.14)] text-[var(--gold-soft)]"
                          : "border-white/10 text-[var(--muted)] hover:border-white/20 hover:text-white"
                      }`}
                      onClick={() => setFulfillmentType(option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            ) : null}

            {hasPhysicalItem && fulfillmentType === "delivery" ? (
              <TextField
                className="rounded-xl py-2.5"
                label="Delivery Address"
                name="deliveryAddress"
                placeholder="Street, area, landmark"
                required
              />
            ) : null}

            <TextAreaField
              label="Notes"
              name="notes"
              className="min-h-12 rounded-xl py-2.5"
              placeholder="Anything the team should know about your order."
              maxLength={500}
            />

            <div className="flex flex-wrap items-center gap-4 pt-0.5">
              <button type="submit" className="luxury-button luxury-button-primary" disabled={submitting}>
                {submitting ? "Placing Order..." : "Place Order"}
              </button>
              {error ? <p className="text-sm text-[rgb(220,145,145)]">{error}</p> : null}
            </div>
          </form>
        </Panel>
      </div>
    </PageSection>
  );
}
