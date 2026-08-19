"use client";

import { useMemo } from "react";
import { DataTable, type DataTableColumn } from "@/components/admin/data-table";
import { AdminPageHeader } from "@/components/admin/page-header";
import { StatusPill } from "@/components/admin/status-pill";
import { useApiResource } from "@/hooks/use-api-resource";
import { formatNaira, type CashShift, type Paginated, type Sale } from "@/lib/admin-types";

export default function CashierHistoryPage() {
  const { data: sales, loading: salesLoading, error: salesError } = useApiResource<Paginated<Sale>>(
    "/admin/sales"
  );
  const { data: shifts, loading: shiftsLoading, error: shiftsError } = useApiResource<Paginated<CashShift>>(
    "/admin/shifts"
  );

  const saleColumns: DataTableColumn<Sale>[] = useMemo(
    () => [
      { key: "sale_number", header: "Sale", render: (row) => row.sale_number },
      { key: "items", header: "Items", render: (row) => row.items.length },
      { key: "total", header: "Total", render: (row) => formatNaira(row.total) },
      { key: "payment_method", header: "Payment", render: (row) => row.payment_method ?? "—" },
      { key: "status", header: "Status", render: (row) => <StatusPill status={row.status} /> },
      { key: "created_at", header: "Date", render: (row) => new Date(row.created_at).toLocaleString() },
    ],
    []
  );

  const shiftColumns: DataTableColumn<CashShift>[] = useMemo(
    () => [
      { key: "opened_at", header: "Opened", render: (row) => new Date(row.opened_at).toLocaleString() },
      {
        key: "closed_at",
        header: "Closed",
        render: (row) => (row.closed_at ? new Date(row.closed_at).toLocaleString() : "—"),
      },
      { key: "opening_float", header: "Opening Float", render: (row) => formatNaira(row.opening_float) },
      {
        key: "expected_cash",
        header: "Expected",
        render: (row) => (row.expected_cash !== null ? formatNaira(row.expected_cash) : "—"),
      },
      {
        key: "closing_count",
        header: "Counted",
        render: (row) => (row.closing_count !== null ? formatNaira(row.closing_count) : "—"),
      },
      {
        key: "discrepancy",
        header: "Discrepancy",
        render: (row) => (row.discrepancy !== null ? formatNaira(row.discrepancy) : "—"),
      },
      { key: "status", header: "Status", render: (row) => <StatusPill status={row.status} /> },
    ],
    []
  );

  return (
    <div className="space-y-8">
      <AdminPageHeader title="History" description="Your past sales and till shifts." />

      <div className="space-y-3">
        <p className="eyebrow text-[0.68rem]">My Sales</p>
        {salesLoading ? (
          <div className="rounded-xl border border-white/8 bg-[rgba(20,14,15,0.5)] p-8 text-center text-sm text-[var(--muted)]">Loading sales…</div>
        ) : salesError ? (
          <div className="rounded-xl border border-white/8 bg-[rgba(20,14,15,0.5)] p-8 text-center text-sm text-[rgb(220,145,145)]">{salesError}</div>
        ) : (
          <DataTable columns={saleColumns} rows={sales?.data ?? []} rowKey={(row) => row.id} emptyMessage="No sales yet." />
        )}
      </div>

      <div className="space-y-3">
        <p className="eyebrow text-[0.68rem]">My Shifts</p>
        {shiftsLoading ? (
          <div className="rounded-xl border border-white/8 bg-[rgba(20,14,15,0.5)] p-8 text-center text-sm text-[var(--muted)]">Loading shifts…</div>
        ) : shiftsError ? (
          <div className="rounded-xl border border-white/8 bg-[rgba(20,14,15,0.5)] p-8 text-center text-sm text-[rgb(220,145,145)]">{shiftsError}</div>
        ) : (
          <DataTable columns={shiftColumns} rows={shifts?.data ?? []} rowKey={(row) => row.id} emptyMessage="No shifts yet." />
        )}
      </div>
    </div>
  );
}
