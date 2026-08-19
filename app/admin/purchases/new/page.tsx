"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { PurchaseInvoiceForm } from "@/components/admin/purchase-invoice-form";
import { AdminPageHeader } from "@/components/admin/page-header";
import { useApiResource } from "@/hooks/use-api-resource";
import type { Product, Supplier } from "@/lib/admin-types";

export default function NewPurchaseInvoicePage() {
  const router = useRouter();
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
        title="New Purchase Invoice"
        description="Record stock coming in from a supplier."
        action={
          <Link href="/admin/purchases" className="text-xs text-[var(--muted)] hover:text-white hover:underline">
            ← Back to Purchase Invoices
          </Link>
        }
      />

      <div className="rounded-xl border border-white/8 bg-[rgba(20,14,15,0.5)] p-4 sm:p-5">
        <PurchaseInvoiceForm
          editing={null}
          supplierOptions={supplierOptions}
          productOptions={productOptions}
          products={products ?? []}
          onSaved={() => router.push("/admin/purchases")}
        />
      </div>
    </div>
  );
}
