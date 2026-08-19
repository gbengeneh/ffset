"use client";

import { useMemo, useState } from "react";
import { DataTable, type DataTableColumn } from "@/components/admin/data-table";
import { Modal } from "@/components/admin/modal";
import { AdminPageHeader } from "@/components/admin/page-header";
import { StatusPill } from "@/components/admin/status-pill";
import { SelectField, TextAreaField, TextField } from "@/components/forms/fields";
import { useApiResource } from "@/hooks/use-api-resource";
import { formatNaira, type Competition } from "@/lib/admin-types";
import { api, ApiError } from "@/lib/api-client";

const STATUS_OPTIONS = [
  { label: "Upcoming", value: "upcoming" },
  { label: "Open", value: "open" },
  { label: "Closed", value: "closed" },
  { label: "Completed", value: "completed" },
];

function toDatetimeLocalValue(iso: string | null | undefined): string {
  if (!iso) return "";
  const date = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

export default function AdminCompetitionsPage() {
  const { data: competitions, loading, error, refetch } = useApiResource<Competition[]>("/admin/competitions");

  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Competition | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const columns: DataTableColumn<Competition>[] = useMemo(
    () => [
      { key: "title", header: "Title", render: (row) => row.title },
      { key: "entry_fee", header: "Entry Fee", render: (row) => formatNaira(row.entry_fee) },
      { key: "first_prize", header: "First Prize", render: (row) => formatNaira(row.first_prize) },
      { key: "status", header: "Status", render: (row) => <StatusPill status={row.status} /> },
    ],
    []
  );

  function openCreate() {
    setEditing(null);
    setFormError(null);
    setFormOpen(true);
  }

  function openEdit(competition: Competition) {
    setEditing(competition);
    setFormError(null);
    setFormOpen(true);
  }

  async function handleSubmit(formEvent: React.FormEvent<HTMLFormElement>) {
    formEvent.preventDefault();
    setFormError(null);
    setSubmitting(true);

    const formData = new FormData(formEvent.currentTarget);
    const rulesText = String(formData.get("rules") ?? "");
    const rules = rulesText
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);

    const payload = {
      title: String(formData.get("title") ?? ""),
      entry_fee: Number(formData.get("entry_fee") ?? 0),
      first_prize: Number(formData.get("first_prize") ?? 0),
      second_prize: Number(formData.get("second_prize") ?? 0),
      third_prize: Number(formData.get("third_prize") ?? 0),
      rules: rules.length ? rules : null,
      registration_opens_at: String(formData.get("registration_opens_at") ?? "") || null,
      registration_closes_at: String(formData.get("registration_closes_at") ?? "") || null,
      event_date: String(formData.get("event_date") ?? "") || null,
      status: String(formData.get("status") ?? "upcoming"),
    };

    try {
      if (editing) {
        await api.patch(`/admin/competitions/${editing.id}`, payload);
      } else {
        await api.post("/admin/competitions", payload);
      }
      setFormOpen(false);
      refetch();
    } catch (submissionError) {
      setFormError(submissionError instanceof ApiError ? submissionError.message : "Could not save competition.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(competition: Competition) {
    if (!window.confirm(`Delete "${competition.title}"?`)) return;
    await api.del(`/admin/competitions/${competition.id}`);
    refetch();
  }

  async function handleStatusChange(competition: Competition, status: string) {
    await api.patch(`/admin/competitions/${competition.id}/status`, { status });
    refetch();
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Competitions"
        description="Tournaments, entry fees, prizes, and registration windows."
        action={
          <button type="button" className="luxury-button luxury-button-primary px-4 py-2.5 text-xs" onClick={openCreate}>
            Add Competition
          </button>
        }
      />

      {loading ? (
        <div className="rounded-xl border border-white/8 bg-[rgba(20,14,15,0.5)] p-8 text-center text-sm text-[var(--muted)]">Loading competitions…</div>
      ) : error ? (
        <div className="rounded-xl border border-white/8 bg-[rgba(20,14,15,0.5)] p-8 text-center text-sm text-[rgb(220,145,145)]">{error}</div>
      ) : (
        <DataTable
          columns={columns}
          rows={competitions ?? []}
          rowKey={(row) => row.id}
          emptyMessage="No competitions yet — add your first one."
          actions={(row) => (
            <div className="flex flex-wrap justify-end gap-2">
              <button type="button" className="text-xs text-[var(--gold-soft)] hover:underline" onClick={() => openEdit(row)}>
                Edit
              </button>
              <select
                className="rounded-full border border-white/10 bg-black/25 px-2 py-1 text-xs text-[var(--muted)]"
                value={row.status}
                onChange={(event) => handleStatusChange(row, event.target.value)}
              >
                {STATUS_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <button
                type="button"
                className="text-xs text-[rgb(220,145,145)] hover:underline"
                onClick={() => handleDelete(row)}
              >
                Delete
              </button>
            </div>
          )}
        />
      )}

      <Modal open={formOpen} onClose={() => setFormOpen(false)} title={editing ? "Edit Competition" : "Add Competition"}>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <TextField label="Title" name="title" defaultValue={editing?.title} required />
          <TextField label="Entry Fee (₦)" name="entry_fee" type="number" min={0} step="0.01" defaultValue={editing?.entry_fee} required />
          <TextField label="First Prize (₦)" name="first_prize" type="number" min={0} step="0.01" defaultValue={editing?.first_prize} required />
          <TextField label="Second Prize (₦)" name="second_prize" type="number" min={0} step="0.01" defaultValue={editing?.second_prize} required />
          <TextField label="Third Prize (₦)" name="third_prize" type="number" min={0} step="0.01" defaultValue={editing?.third_prize} required />
          <TextAreaField
            label="Rules (one per line)"
            name="rules"
            rows={4}
            defaultValue={editing?.rules?.join("\n") ?? ""}
          />
          <TextField
            label="Registration Opens"
            name="registration_opens_at"
            type="datetime-local"
            defaultValue={toDatetimeLocalValue(editing?.registration_opens_at)}
          />
          <TextField
            label="Registration Closes"
            name="registration_closes_at"
            type="datetime-local"
            defaultValue={toDatetimeLocalValue(editing?.registration_closes_at)}
          />
          <TextField
            label="Event Date"
            name="event_date"
            type="datetime-local"
            defaultValue={toDatetimeLocalValue(editing?.event_date)}
          />
          <SelectField
            label="Status"
            name="status"
            defaultValue={editing?.status ?? "upcoming"}
            options={STATUS_OPTIONS}
            required
          />

          {formError ? <p className="text-[0.83rem] text-[rgb(220,145,145)]">{formError}</p> : null}

          <button type="submit" className="luxury-button luxury-button-primary w-full justify-center px-4 py-3 text-sm" disabled={submitting}>
            {submitting ? "Saving…" : "Save Competition"}
          </button>
        </form>
      </Modal>
    </div>
  );
}
