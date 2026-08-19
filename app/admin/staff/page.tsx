"use client";

import { useMemo, useState } from "react";
import { DataTable, type DataTableColumn } from "@/components/admin/data-table";
import { Modal } from "@/components/admin/modal";
import { AdminPageHeader } from "@/components/admin/page-header";
import { StatusPill } from "@/components/admin/status-pill";
import { SelectField, TextField } from "@/components/forms/fields";
import { useApiResource } from "@/hooks/use-api-resource";
import type { Paginated, Staff } from "@/lib/admin-types";
import { api, ApiError } from "@/lib/api-client";

const ROLE_OPTIONS = [
  { label: "Admin", value: "admin" },
  { label: "Cashier", value: "cashier" },
  { label: "Inventory Manager", value: "inventory" },
];

export default function AdminStaffPage() {
  const { data, loading, error, refetch } = useApiResource<Paginated<Staff>>("/admin/staff");

  const [formOpen, setFormOpen] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const columns: DataTableColumn<Staff>[] = useMemo(
    () => [
      { key: "name", header: "Name", render: (row) => row.name },
      { key: "email", header: "Email", render: (row) => row.email },
      { key: "role", header: "Role", render: (row) => row.role },
      {
        key: "is_active",
        header: "Status",
        render: (row) => <StatusPill status={row.is_active ? "active" : "inactive"} />,
      },
    ],
    []
  );

  async function handleSubmit(formEvent: React.FormEvent<HTMLFormElement>) {
    formEvent.preventDefault();
    setFormError(null);
    setSubmitting(true);

    const formData = new FormData(formEvent.currentTarget);
    const payload = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      phone: String(formData.get("phone") ?? "") || null,
      password: String(formData.get("password") ?? ""),
      role: String(formData.get("role") ?? "cashier"),
    };

    try {
      await api.post("/admin/staff", payload);
      setFormOpen(false);
      refetch();
    } catch (submissionError) {
      setFormError(submissionError instanceof ApiError ? submissionError.message : "Could not create staff account.");
    } finally {
      setSubmitting(false);
    }
  }

  async function toggleActive(staff: Staff) {
    if (staff.is_active) {
      if (!window.confirm(`Deactivate ${staff.name}? They will no longer be able to log in.`)) return;
      await api.del(`/admin/staff/${staff.id}`);
    } else {
      await api.patch(`/admin/staff/${staff.id}`, { is_active: true });
    }
    refetch();
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Staff"
        description="Admin and cashier accounts that can sign in to the console and POS."
        action={
          <button
            type="button"
            className="luxury-button luxury-button-primary px-4 py-2.5 text-xs"
            onClick={() => {
              setFormError(null);
              setFormOpen(true);
            }}
          >
            Add Staff
          </button>
        }
      />

      {loading ? (
        <div className="rounded-xl border border-white/8 bg-[rgba(20,14,15,0.5)] p-8 text-center text-sm text-[var(--muted)]">Loading staff…</div>
      ) : error ? (
        <div className="rounded-xl border border-white/8 bg-[rgba(20,14,15,0.5)] p-8 text-center text-sm text-[rgb(220,145,145)]">{error}</div>
      ) : (
        <DataTable
          columns={columns}
          rows={data?.data ?? []}
          rowKey={(row) => row.id}
          emptyMessage="No staff accounts yet."
          actions={(row) => (
            <button
              type="button"
              className={`text-xs hover:underline ${row.is_active ? "text-[rgb(220,145,145)]" : "text-[var(--gold-soft)]"}`}
              onClick={() => toggleActive(row)}
            >
              {row.is_active ? "Deactivate" : "Activate"}
            </button>
          )}
        />
      )}

      <Modal open={formOpen} onClose={() => setFormOpen(false)} title="Add Staff Account">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <TextField label="Name" name="name" required />
          <TextField label="Email" name="email" type="email" required />
          <TextField label="Phone" name="phone" />
          <TextField label="Password" name="password" type="password" minLength={8} required />
          <SelectField label="Role" name="role" defaultValue="cashier" options={ROLE_OPTIONS} required />

          {formError ? <p className="text-[0.83rem] text-[rgb(220,145,145)]">{formError}</p> : null}

          <button type="submit" className="luxury-button luxury-button-primary w-full justify-center px-4 py-3 text-sm" disabled={submitting}>
            {submitting ? "Creating…" : "Create Account"}
          </button>
        </form>
      </Modal>
    </div>
  );
}
