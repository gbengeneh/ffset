"use client";

import { useMemo } from "react";
import { DataTable, type DataTableColumn } from "@/components/admin/data-table";
import { AdminPageHeader } from "@/components/admin/page-header";
import { StatusPill } from "@/components/admin/status-pill";
import { useApiResource } from "@/hooks/use-api-resource";
import { formatNaira, type Order, type Paginated } from "@/lib/admin-types";
import { api } from "@/lib/api-client";

export default function AdminOrdersPage() {
  const { data, loading, error, refetch } = useApiResource<Paginated<Order>>("/admin/orders");

  const columns: DataTableColumn<Order>[] = useMemo(
    () => [
      { key: "reference_code", header: "Reference", render: (row) => row.reference_code },
      { key: "name", header: "Customer", render: (row) => `${row.name} (${row.phone})` },
      {
        key: "fulfillment",
        header: "Fulfillment",
        render: (row) =>
          row.fulfillment_type === "delivery" ? `Delivery — ${row.delivery_address ?? "—"}` : "Pickup",
      },
      {
        key: "items",
        header: "Items",
        render: (row) => {
          const items = row.sale?.items ?? [];
          if (items.length === 0) return "—";
          const [first, ...rest] = items;
          return rest.length > 0
            ? `${first.product?.name ?? "Item"} +${rest.length} more`
            : first.product?.name ?? "Item";
        },
      },
      { key: "total", header: "Total", render: (row) => formatNaira(row.sale?.total ?? "0") },
      { key: "status", header: "Status", render: (row) => <StatusPill status={row.status} /> },
    ],
    []
  );

  async function updateStatus(order: Order, status: Order["status"]) {
    await api.patch(`/admin/orders/${order.id}`, { status });
    refetch();
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Orders"
        description="Website orders for wines and gaming packages. Confirm bank transfer payment, then mark fulfilled once collected or delivered."
      />

      {loading ? (
        <div className="rounded-xl border border-white/8 bg-[rgba(20,14,15,0.5)] p-8 text-center text-sm text-[var(--muted)]">Loading orders…</div>
      ) : error ? (
        <div className="rounded-xl border border-white/8 bg-[rgba(20,14,15,0.5)] p-8 text-center text-sm text-[rgb(220,145,145)]">{error}</div>
      ) : (
        <DataTable
          columns={columns}
          rows={data?.data ?? []}
          rowKey={(row) => row.id}
          emptyMessage="No orders yet."
          actions={(row) => (
            <div className="flex flex-wrap justify-end gap-3">
              {row.status === "pending" ? (
                <>
                  <button type="button" className="text-xs text-[var(--gold-soft)] hover:underline" onClick={() => updateStatus(row, "paid")}>
                    Mark Paid
                  </button>
                  <button type="button" className="text-xs text-[rgb(220,145,145)] hover:underline" onClick={() => updateStatus(row, "cancelled")}>
                    Cancel
                  </button>
                </>
              ) : null}
              {row.status === "paid" ? (
                <button type="button" className="text-xs text-[var(--gold-soft)] hover:underline" onClick={() => updateStatus(row, "completed")}>
                  Mark Completed
                </button>
              ) : null}
            </div>
          )}
        />
      )}
    </div>
  );
}
