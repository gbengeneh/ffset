"use client";

import { useMemo } from "react";
import { DataTable, type DataTableColumn } from "@/components/admin/data-table";
import { AdminPageHeader } from "@/components/admin/page-header";
import { StatusPill } from "@/components/admin/status-pill";
import { useApiResource } from "@/hooks/use-api-resource";
import type { ContactMessage, Paginated } from "@/lib/admin-types";
import { api } from "@/lib/api-client";

export default function AdminMessagesPage() {
  const { data, loading, error, refetch } = useApiResource<Paginated<ContactMessage>>("/admin/messages");

  const columns: DataTableColumn<ContactMessage>[] = useMemo(
    () => [
      { key: "name", header: "Name", render: (row) => row.name },
      { key: "email", header: "Email", render: (row) => row.email },
      {
        key: "message",
        header: "Message",
        render: (row) => <span className="line-clamp-2 max-w-sm">{row.message}</span>,
      },
      { key: "status", header: "Status", render: (row) => <StatusPill status={row.status} /> },
    ],
    []
  );

  async function markRead(message: ContactMessage) {
    await api.patch(`/admin/messages/${message.id}`, { status: "read" });
    refetch();
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader title="Messages" description="Enquiries submitted through the public contact form." />

      {loading ? (
        <div className="rounded-xl border border-white/8 bg-[rgba(20,14,15,0.5)] p-8 text-center text-sm text-[var(--muted)]">Loading messages…</div>
      ) : error ? (
        <div className="rounded-xl border border-white/8 bg-[rgba(20,14,15,0.5)] p-8 text-center text-sm text-[rgb(220,145,145)]">{error}</div>
      ) : (
        <DataTable
          columns={columns}
          rows={data?.data ?? []}
          rowKey={(row) => row.id}
          emptyMessage="No messages yet."
          actions={(row) =>
            row.status === "new" ? (
              <button type="button" className="text-xs text-[var(--gold-soft)] hover:underline" onClick={() => markRead(row)}>
                Mark Read
              </button>
            ) : null
          }
        />
      )}
    </div>
  );
}
