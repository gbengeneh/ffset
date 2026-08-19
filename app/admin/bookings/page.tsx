"use client";

import { useMemo, useState } from "react";
import { DataTable, type DataTableColumn } from "@/components/admin/data-table";
import { AdminPageHeader } from "@/components/admin/page-header";
import { StatusPill } from "@/components/admin/status-pill";
import { SelectField } from "@/components/forms/fields";
import { useApiResource } from "@/hooks/use-api-resource";
import type { Booking, Paginated } from "@/lib/admin-types";
import { api } from "@/lib/api-client";

const STATUS_OPTIONS = [
  { label: "Pending", value: "pending" },
  { label: "Confirmed", value: "confirmed" },
  { label: "Cancelled", value: "cancelled" },
];

export default function AdminBookingsPage() {
  const [statusFilter, setStatusFilter] = useState("");
  const path = statusFilter ? `/admin/bookings?status=${statusFilter}` : "/admin/bookings";
  const { data, loading, error, refetch } = useApiResource<Paginated<Booking>>(path);

  const columns: DataTableColumn<Booking>[] = useMemo(
    () => [
      { key: "name", header: "Name", render: (row) => row.name },
      { key: "phone", header: "Phone", render: (row) => row.phone },
      { key: "date", header: "Date", render: (row) => row.date },
      { key: "time", header: "Time", render: (row) => row.time },
      { key: "guests", header: "Guests", render: (row) => row.guests },
      { key: "occasion", header: "Occasion", render: (row) => row.occasion ?? "—" },
      { key: "status", header: "Status", render: (row) => <StatusPill status={row.status} /> },
    ],
    []
  );

  async function updateStatus(booking: Booking, status: string) {
    await api.patch(`/admin/bookings/${booking.id}`, { status });
    refetch();
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader title="Bookings" description="Table reservation requests submitted from the public site." />

      <div className="max-w-xs">
        <SelectField
          label="Filter by status"
          name="status_filter"
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value)}
          options={[{ label: "All statuses", value: "" }, ...STATUS_OPTIONS]}
        />
      </div>

      {loading ? (
        <div className="rounded-xl border border-white/8 bg-[rgba(20,14,15,0.5)] p-8 text-center text-sm text-[var(--muted)]">Loading bookings…</div>
      ) : error ? (
        <div className="rounded-xl border border-white/8 bg-[rgba(20,14,15,0.5)] p-8 text-center text-sm text-[rgb(220,145,145)]">{error}</div>
      ) : (
        <DataTable
          columns={columns}
          rows={data?.data ?? []}
          rowKey={(row) => row.id}
          emptyMessage="No bookings yet."
          actions={(row) => (
            <select
              className="rounded-full border border-white/10 bg-black/25 px-2 py-1 text-xs text-[var(--muted)]"
              value={row.status}
              onChange={(event) => updateStatus(row, event.target.value)}
            >
              {STATUS_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          )}
        />
      )}
    </div>
  );
}
