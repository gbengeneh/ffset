"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { DataTable, type DataTableColumn } from "@/components/admin/data-table";
import { AdminPageHeader } from "@/components/admin/page-header";
import { StatusPill } from "@/components/admin/status-pill";
import { SelectField } from "@/components/forms/fields";
import { useApiResource } from "@/hooks/use-api-resource";
import { formatNaira, type Paginated, type PurchaseInvoice } from "@/lib/admin-types";
import { api } from "@/lib/api-client";

const STATUS_OPTIONS = [
  { label: "All statuses", value: "" },
  { label: "Pending", value: "pending" },
  { label: "Received", value: "received" },
  { label: "Cancelled", value: "cancelled" },
];

export default function AdminPurchasesPage() {
  const [statusFilter, setStatusFilter] = useState("");
  const path = statusFilter ? `/admin/purchase-invoices?status=${statusFilter}` : "/admin/purchase-invoices";
  const { data: invoices, loading, error, refetch } = useApiResource<Paginated<PurchaseInvoice>>(path);

  const columns: DataTableColumn<PurchaseInvoice>[] = useMemo(
    () => [
      { key: "invoice_number", header: "Invoice #", render: (row) => row.invoice_number },
      { key: "supplier", header: "Supplier", render: (row) => row.supplier?.name ?? "—" },
      { key: "invoice_date", header: "Date", render: (row) => row.invoice_date },
      { key: "total", header: "Total", render: (row) => formatNaira(row.total) },
      { key: "status", header: "Status", render: (row) => <StatusPill status={row.status} /> },
      { key: "payment_status", header: "Payment", render: (row) => <StatusPill status={row.payment_status} /> },
    ],
    []
  );

  async function handleReceive(invoice: PurchaseInvoice) {
    if (!window.confirm(`Mark invoice ${invoice.invoice_number} as received? This will add stock for every line item.`)) return;
    await api.patch(`/admin/purchase-invoices/${invoice.id}/status`, { status: "received" });
    refetch();
  }

  async function handleCancel(invoice: PurchaseInvoice) {
    if (!window.confirm(`Cancel invoice ${invoice.invoice_number}?`)) return;
    await api.patch(`/admin/purchase-invoices/${invoice.id}/status`, { status: "cancelled" });
    refetch();
  }

  async function handleDelete(invoice: PurchaseInvoice) {
    if (!window.confirm(`Delete invoice ${invoice.invoice_number}? This cannot be undone.`)) return;
    await api.del(`/admin/purchase-invoices/${invoice.id}`);
    refetch();
  }

  async function togglePayment(invoice: PurchaseInvoice) {
    await api.patch(`/admin/purchase-invoices/${invoice.id}/payment-status`, {
      payment_status: invoice.payment_status === "paid" ? "unpaid" : "paid",
    });
    refetch();
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Purchase Invoices"
        description="Stock coming in from suppliers — receiving an invoice restocks every line item."
        action={
          <Link href="/admin/purchases/new" className="luxury-button luxury-button-primary px-4 py-2.5 text-xs">
            New Purchase Invoice
          </Link>
        }
      />

      <div className="max-w-xs">
        <SelectField
          label="Filter by status"
          name="status_filter"
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value)}
          options={STATUS_OPTIONS}
        />
      </div>

      {loading ? (
        <div className="rounded-xl border border-white/8 bg-[rgba(20,14,15,0.5)] p-8 text-center text-sm text-[var(--muted)]">Loading purchase invoices…</div>
      ) : error ? (
        <div className="rounded-xl border border-white/8 bg-[rgba(20,14,15,0.5)] p-8 text-center text-sm text-[rgb(220,145,145)]">{error}</div>
      ) : (
        <DataTable
          columns={columns}
          rows={invoices?.data ?? []}
          rowKey={(row) => row.id}
          emptyMessage="No purchase invoices yet — create your first one."
          actions={(row) => (
            <div className="flex flex-wrap justify-end gap-2">
              <button
                type="button"
                className="text-xs text-[var(--gold-soft)] hover:underline"
                onClick={() => togglePayment(row)}
              >
                Mark {row.payment_status === "paid" ? "Unpaid" : "Paid"}
              </button>
              {row.status === "pending" ? (
                <>
                  <Link href={`/admin/purchases/${row.id}/edit`} className="text-xs text-[var(--gold-soft)] hover:underline">
                    Edit
                  </Link>
                  <button type="button" className="text-xs text-[var(--gold-soft)] hover:underline" onClick={() => handleReceive(row)}>
                    Receive
                  </button>
                  <button type="button" className="text-xs text-[rgb(220,145,145)] hover:underline" onClick={() => handleCancel(row)}>
                    Cancel
                  </button>
                  <button type="button" className="text-xs text-[rgb(220,145,145)] hover:underline" onClick={() => handleDelete(row)}>
                    Delete
                  </button>
                </>
              ) : null}
            </div>
          )}
        />
      )}
    </div>
  );
}
