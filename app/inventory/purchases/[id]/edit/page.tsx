"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { PurchaseInvoiceForm } from "@/components/admin/purchase-invoice-form";
import { AdminPageHeader } from "@/components/admin/page-header";
import { useApiResource } from "@/hooks/use-api-resource";
import type { Product, PurchaseInvoice, Supplier } from "@/lib/admin-types";

export default function EditInventoryPurchaseInvoicePage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const { data: invoice, loading, error } = useApiResource<PurchaseInvoice>(
    `/admin/purchase-invoices/${params.id}`
  );
  const { data: suppliers } = useApiResource<Supplier[]>("/admin/suppliers");
  const { data: products } = useApiResource<Product[]>("/admin/products");

  const supplierOptions = useMemo(
    () => (suppliers ?? []).filter((s) => s.is_active).map((s) => ({ label: s.name, value: String(s.id) })),
    [suppliers]
  );
  const productOptions = useMemo(
    () => (products ?? []).map((p) => ({ label: p.name, value: String(p.id) })),
    [products]
  );

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title={invoice ? `Edit Invoice ${invoice.invoice_number}` : "Edit Purchase Invoice"}
        description="Only pending invoices can be edited."
        action={
          <Link href="/inventory/purchases" className="text-xs text-[var(--muted)] hover:text-white hover:underline">
            ← Back to Purchase Invoices
          </Link>
        }
      />

      {loading ? (
        <div className="rounded-xl border border-white/8 bg-[rgba(20,14,15,0.5)] p-8 text-center text-sm text-[var(--muted)]">
          Loading invoice…
        </div>
      ) : error || !invoice ? (
        <div className="rounded-xl border border-white/8 bg-[rgba(20,14,15,0.5)] p-8 text-center text-sm text-[rgb(220,145,145)]">
          {error ?? "Purchase invoice not found."}
        </div>
      ) : invoice.status !== "pending" ? (
        <div className="rounded-xl border border-white/8 bg-[rgba(20,14,15,0.5)] p-6 text-sm text-[var(--muted)]">
          This invoice is <span className="text-white">{invoice.status}</span> and can no longer be edited — stock has
          already moved. You can still toggle its payment status from the Purchase Invoices list.
        </div>
      ) : (
        <div className="rounded-xl border border-white/8 bg-[rgba(20,14,15,0.5)] p-4 sm:p-5">
          <PurchaseInvoiceForm
            editing={invoice}
            supplierOptions={supplierOptions}
            productOptions={productOptions}
            products={products ?? []}
            onSaved={() => router.push("/inventory/purchases")}
          />
        </div>
      )}
    </div>
  );
}
