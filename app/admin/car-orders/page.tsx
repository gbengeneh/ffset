"use client";

import { useMemo } from "react";
import { DataTable, type DataTableColumn } from "@/components/admin/data-table";
import { AdminPageHeader } from "@/components/admin/page-header";
import { StatusPill } from "@/components/admin/status-pill";
import { useApiResource } from "@/hooks/use-api-resource";
import { formatNaira, type CarOrder, type Paginated } from "@/lib/admin-types";
import { api } from "@/lib/api-client";

export default function AdminCarOrdersPage() {
  const { data, loading, error, refetch } = useApiResource<Paginated<CarOrder>>("/admin/car-orders");

  const columns: DataTableColumn<CarOrder>[] = useMemo(
    () => [
      { key: "reference_code", header: "Reference", render: (row) => row.reference_code },
      { key: "name", header: "Customer", render: (row) => `${row.name} (${row.phone})` },
      {
        key: "car",
        header: "Car",
        render: (row) => (row.car ? `${row.car.year} ${row.car.make} ${row.car.model}` : "—"),
      },
      { key: "deposit", header: "Deposit", render: (row) => formatNaira(row.sale?.total ?? "0") },
      { key: "status", header: "Status", render: (row) => <StatusPill status={row.status} /> },
    ],
    []
  );

  async function updateStatus(carOrder: CarOrder, status: CarOrder["status"]) {
    await api.patch(`/admin/car-orders/${carOrder.id}`, { status });
    refetch();
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Car Orders"
        description="Deposit reservations from FFSET Autos. Confirm payment, then mark completed once the sale is finalized."
      />

      {loading ? (
        <div className="rounded-xl border border-white/8 bg-[rgba(20,14,15,0.5)] p-8 text-center text-sm text-[var(--muted)]">Loading car orders…</div>
      ) : error ? (
        <div className="rounded-xl border border-white/8 bg-[rgba(20,14,15,0.5)] p-8 text-center text-sm text-[rgb(220,145,145)]">{error}</div>
      ) : (
        <DataTable
          columns={columns}
          rows={data?.data ?? []}
          rowKey={(row) => row.id}
          emptyMessage="No car reservations yet."
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
