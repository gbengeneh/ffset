"use client";

import { useMemo } from "react";
import { DataTable, type DataTableColumn } from "@/components/admin/data-table";
import { AdminPageHeader } from "@/components/admin/page-header";
import { StatusPill } from "@/components/admin/status-pill";
import { useApiResource } from "@/hooks/use-api-resource";
import type { CompetitionRegistration, Paginated } from "@/lib/admin-types";
import { api } from "@/lib/api-client";

export default function AdminCompetitionRegistrationsPage() {
  const { data, loading, error, refetch } = useApiResource<Paginated<CompetitionRegistration>>(
    "/admin/competition-registrations"
  );

  const columns: DataTableColumn<CompetitionRegistration>[] = useMemo(
    () => [
      { key: "name", header: "Player", render: (row) => row.name },
      { key: "competition", header: "Competition", render: (row) => row.competition?.title ?? "—" },
      { key: "gamertag", header: "Gamertag", render: (row) => row.gamertag },
      { key: "game", header: "Game", render: (row) => row.game },
      { key: "payment_status", header: "Payment", render: (row) => <StatusPill status={row.payment_status} /> },
      { key: "reference_code", header: "Reference", render: (row) => row.reference_code ?? "—" },
    ],
    []
  );

  async function markPaid(registration: CompetitionRegistration) {
    await api.patch(`/admin/competition-registrations/${registration.id}`, { payment_status: "paid" });
    refetch();
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Competition Registrations"
        description="Entrants across all competitions. Approving payment reveals their registration reference code."
      />

      {loading ? (
        <div className="rounded-xl border border-white/8 bg-[rgba(20,14,15,0.5)] p-8 text-center text-sm text-[var(--muted)]">Loading registrations…</div>
      ) : error ? (
        <div className="rounded-xl border border-white/8 bg-[rgba(20,14,15,0.5)] p-8 text-center text-sm text-[rgb(220,145,145)]">{error}</div>
      ) : (
        <DataTable
          columns={columns}
          rows={data?.data ?? []}
          rowKey={(row) => row.id}
          emptyMessage="No registrations yet."
          actions={(row) =>
            row.payment_status === "pending" ? (
              <button type="button" className="text-xs text-[var(--gold-soft)] hover:underline" onClick={() => markPaid(row)}>
                Mark Paid
              </button>
            ) : null
          }
        />
      )}
    </div>
  );
}
