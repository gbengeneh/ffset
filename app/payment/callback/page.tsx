"use client";

import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { PageSection, Panel } from "@/components/ui";
import { formatNaira } from "@/lib/admin-types";
import { verifyPayment, type PaymentSale } from "@/lib/payment";
import { PublicApiError } from "@/lib/public-form";
import { contactDetails } from "@/lib/site-data";

function PaymentCallbackContent() {
  const searchParams = useSearchParams();
  const reference = searchParams.get("reference") ?? searchParams.get("trxref");

  const [loading, setLoading] = useState(true);
  const [sale, setSale] = useState<PaymentSale | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    void Promise.resolve().then(async () => {
      if (!reference) {
        setLoading(false);
        setError("No payment reference was found in the link.");
        return;
      }

      try {
        setSale(await verifyPayment(reference));
      } catch (verifyError) {
        setError(verifyError instanceof PublicApiError ? verifyError.message : "Could not verify payment.");
      } finally {
        setLoading(false);
      }
    });
  }, [reference]);

  if (loading) {
    return (
      <Panel className="mx-auto max-w-lg space-y-3 p-6 text-center">
        <p className="eyebrow">Payment</p>
        <h1 className="display-font text-2xl text-white">Confirming your payment…</h1>
        <p className="text-sm text-[var(--muted)]">This will only take a moment.</p>
      </Panel>
    );
  }

  if (sale && sale.status === "completed") {
    return (
      <Panel className="mx-auto max-w-lg space-y-4 p-6 text-center">
        <p className="eyebrow">Payment Confirmed</p>
        <h1 className="display-font text-2xl text-white">Thank you — payment received.</h1>
        <div className="space-y-2 text-left text-sm text-[var(--muted)]">
          {sale.items.map((item, index) => (
            <div key={index} className="flex items-center justify-between gap-3">
              <span>
                {item.product?.name ?? "Item"} x{item.quantity}
              </span>
              <span>{formatNaira(item.line_total)}</span>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between border-t border-white/8 pt-3 text-sm">
          <span className="text-[var(--muted)]">Total Paid</span>
          <span className="display-font text-lg text-[var(--gold)]">{formatNaira(sale.total)}</span>
        </div>
        <p className="text-sm leading-6 text-[var(--muted)]">
          The team has been notified and will prepare your order or confirm your registration shortly.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link href="/wines" className="luxury-button luxury-button-secondary px-5 py-3 text-sm">
            Continue Browsing
          </Link>
          <Link href="/" className="luxury-button luxury-button-primary px-5 py-3 text-sm">
            Back Home
          </Link>
        </div>
      </Panel>
    );
  }

  return (
    <Panel className="mx-auto max-w-lg space-y-4 p-6 text-center">
      <p className="eyebrow">Payment Not Confirmed</p>
      <h1 className="display-font text-2xl text-white">We couldn&apos;t confirm this payment yet.</h1>
      <p className="text-sm leading-6 text-[var(--muted)]">
        {error ?? "The payment may still be processing, or it did not complete."} If an amount was
        deducted from your card, please contact us at{" "}
        <span className="text-white">{contactDetails.phonePrimary}</span> with your reference. You can
        also complete payment by bank transfer instead — the details were shown after you submitted
        your order or registration.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
        <Link href="/" className="luxury-button luxury-button-primary px-5 py-3 text-sm">
          Back Home
        </Link>
      </div>
    </Panel>
  );
}

export default function PaymentCallbackPage() {
  return (
    <PageSection className="section-space">
      <Suspense
        fallback={
          <Panel className="mx-auto max-w-lg space-y-3 p-6 text-center">
            <p className="eyebrow">Payment</p>
            <h1 className="display-font text-2xl text-white">Confirming your payment…</h1>
          </Panel>
        }
      >
        <PaymentCallbackContent />
      </Suspense>
    </PageSection>
  );
}
