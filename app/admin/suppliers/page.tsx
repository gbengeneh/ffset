"use client";

import { useMemo, useState } from "react";
import { DataTable, type DataTableColumn } from "@/components/admin/data-table";
import { Modal } from "@/components/admin/modal";
import { AdminPageHeader } from "@/components/admin/page-header";
import { StatusPill } from "@/components/admin/status-pill";
import { TextAreaField, TextField } from "@/components/forms/fields";
import { useApiResource } from "@/hooks/use-api-resource";
import type { Supplier } from "@/lib/admin-types";
import { api, ApiError } from "@/lib/api-client";

export default function AdminSuppliersPage() {
  const { data: suppliers, loading, error, refetch } = useApiResource<Supplier[]>(
    "/admin/suppliers?include_inactive=1"
  );

  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Supplier | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const columns: DataTableColumn<Supplier>[] = useMemo(
    () => [
      { key: "name", header: "Name", render: (row) => row.name },
      { key: "contact_name", header: "Contact", render: (row) => row.contact_name ?? "—" },
      { key: "phone", header: "Phone", render: (row) => row.phone ?? "—" },
      { key: "email", header: "Email", render: (row) => row.email ?? "—" },
      {
        key: "is_active",
        header: "Status",
        render: (row) => <StatusPill status={row.is_active ? "active" : "inactive"} />,
      },
    ],
    []
  );

  function openCreate() {
    setEditing(null);
    setFormError(null);
    setFormOpen(true);
  }

  function openEdit(supplier: Supplier) {
    setEditing(supplier);
    setFormError(null);
    setFormOpen(true);
  }

  async function handleSubmit(formEvent: React.FormEvent<HTMLFormElement>) {
    formEvent.preventDefault();
    setFormError(null);
    setSubmitting(true);

    const formData = new FormData(formEvent.currentTarget);
    const payload = {
      name: String(formData.get("name") ?? ""),
      contact_name: String(formData.get("contact_name") ?? "") || null,
      phone: String(formData.get("phone") ?? "") || null,
      email: String(formData.get("email") ?? "") || null,
      address: String(formData.get("address") ?? "") || null,
      notes: String(formData.get("notes") ?? "") || null,
    };

    try {
      if (editing) {
        await api.patch(`/admin/suppliers/${editing.id}`, payload);
      } else {
        await api.post("/admin/suppliers", payload);
      }
      setFormOpen(false);
      refetch();
    } catch (submissionError) {
      setFormError(submissionError instanceof ApiError ? submissionError.message : "Could not save supplier.");
    } finally {
      setSubmitting(false);
    }
  }

  async function toggleActive(supplier: Supplier) {
    if (supplier.is_active) {
      if (!window.confirm(`Deactivate "${supplier.name}"? Past purchase invoices are kept.`)) return;
      await api.del(`/admin/suppliers/${supplier.id}`);
    } else {
      await api.patch(`/admin/suppliers/${supplier.id}`, { is_active: true });
    }
    refetch();
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Suppliers"
        description="Vendors you buy stock from — linked to purchase invoices."
        action={
          <button type="button" className="luxury-button luxury-button-primary px-4 py-2.5 text-xs" onClick={openCreate}>
            Add Supplier
          </button>
        }
      />

      {loading ? (
        <div className="rounded-xl border border-white/8 bg-[rgba(20,14,15,0.5)] p-8 text-center text-sm text-[var(--muted)]">Loading suppliers…</div>
      ) : error ? (
        <div className="rounded-xl border border-white/8 bg-[rgba(20,14,15,0.5)] p-8 text-center text-sm text-[rgb(220,145,145)]">{error}</div>
      ) : (
        <DataTable
          columns={columns}
          rows={suppliers ?? []}
          rowKey={(row) => row.id}
          emptyMessage="No suppliers yet — add your first one."
          actions={(row) => (
            <div className="flex flex-wrap justify-end gap-2">
              <button type="button" className="text-xs text-[var(--gold-soft)] hover:underline" onClick={() => openEdit(row)}>
                Edit
              </button>
              <button
                type="button"
                className={`text-xs hover:underline ${row.is_active ? "text-[rgb(220,145,145)]" : "text-[var(--gold-soft)]"}`}
                onClick={() => toggleActive(row)}
              >
                {row.is_active ? "Deactivate" : "Activate"}
              </button>
            </div>
          )}
        />
      )}

      <Modal open={formOpen} onClose={() => setFormOpen(false)} title={editing ? "Edit Supplier" : "Add Supplier"}>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <TextField label="Name" name="name" defaultValue={editing?.name} required />
          <TextField label="Contact Name" name="contact_name" defaultValue={editing?.contact_name ?? ""} />
          <TextField label="Phone" name="phone" defaultValue={editing?.phone ?? ""} />
          <TextField label="Email" name="email" type="email" defaultValue={editing?.email ?? ""} />
          <TextField label="Address" name="address" defaultValue={editing?.address ?? ""} />
          <TextAreaField label="Notes" name="notes" rows={3} defaultValue={editing?.notes ?? ""} />

          {formError ? <p className="text-[0.83rem] text-[rgb(220,145,145)]">{formError}</p> : null}

          <button type="submit" className="luxury-button luxury-button-primary w-full justify-center px-4 py-3 text-sm" disabled={submitting}>
            {submitting ? "Saving…" : "Save Supplier"}
          </button>
        </form>
      </Modal>
    </div>
  );
}
