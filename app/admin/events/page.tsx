"use client";

import { useMemo, useState } from "react";
import { DataTable, type DataTableColumn } from "@/components/admin/data-table";
import { Modal } from "@/components/admin/modal";
import { AdminPageHeader } from "@/components/admin/page-header";
import { SelectField, TextAreaField, TextField } from "@/components/forms/fields";
import { useApiResource } from "@/hooks/use-api-resource";
import type { EventItem } from "@/lib/admin-types";
import { api, ApiError } from "@/lib/api-client";
import { ImageField } from "@/components/forms/image-field";

const FREQUENCY_OPTIONS = [
  { label: "Weekly", value: "Weekly" },
  { label: "Monthly", value: "Monthly" },
  { label: "On Request", value: "On Request" },
  { label: "Seasonal", value: "Seasonal" },
];

export default function AdminEventsPage() {
  const { data: events, loading, error, refetch } = useApiResource<EventItem[]>("/admin/events");

  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<EventItem | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const columns: DataTableColumn<EventItem>[] = useMemo(
    () => [
      { key: "title", header: "Title", render: (row) => row.title },
      { key: "date", header: "Date", render: (row) => row.date },
      { key: "frequency", header: "Frequency", render: (row) => row.frequency },
    ],
    []
  );

  function openCreate() {
    setEditing(null);
    setFormError(null);
    setFormOpen(true);
  }

  function openEdit(event: EventItem) {
    setEditing(event);
    setFormError(null);
    setFormOpen(true);
  }

  async function handleSubmit(formEvent: React.FormEvent<HTMLFormElement>) {
    formEvent.preventDefault();
    setFormError(null);
    setSubmitting(true);

    const formData = new FormData(formEvent.currentTarget);
    const payload = {
      title: String(formData.get("title") ?? ""),
      date: String(formData.get("date") ?? ""),
      frequency: String(formData.get("frequency") ?? "Weekly"),
      description: String(formData.get("description") ?? "") || null,
      icon: String(formData.get("icon") ?? "") || null,
      image_url: String(formData.get("image_url") ?? "") || null,
      image_position: String(formData.get("image_position") ?? "") || null,
    };

    try {
      const saved = editing ? await api.patch<EventItem>(`/admin/events/${editing.id}`, payload) : await api.post<EventItem>("/admin/events", payload);
      setEditing(saved);
      const image = formData.get("image");
      if (image instanceof File && image.size) {
        const upload = new FormData(); upload.set("image", image);
        await api.post(`/admin/events/${saved.id}/image`, upload);
      }
      setFormOpen(false);
      refetch();
    } catch (submissionError) {
      setFormError(submissionError instanceof ApiError ? submissionError.message : "Could not save event.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(event: EventItem) {
    if (!window.confirm(`Delete "${event.title}"?`)) return;
    await api.del(`/admin/events/${event.id}`);
    refetch();
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Events"
        description="Recurring nights and one-off happenings shown on the public events page."
        action={
          <button type="button" className="luxury-button luxury-button-primary px-4 py-2.5 text-xs" onClick={openCreate}>
            Add Event
          </button>
        }
      />

      {loading ? (
        <div className="rounded-xl border border-white/8 bg-[rgba(20,14,15,0.5)] p-8 text-center text-sm text-[var(--muted)]">Loading events…</div>
      ) : error ? (
        <div className="rounded-xl border border-white/8 bg-[rgba(20,14,15,0.5)] p-8 text-center text-sm text-[rgb(220,145,145)]">{error}</div>
      ) : (
        <DataTable
          columns={columns}
          rows={events ?? []}
          rowKey={(row) => row.id}
          emptyMessage="No events yet — add your first one."
          actions={(row) => (
            <div className="flex justify-end gap-2">
              <button type="button" className="text-xs text-[var(--gold-soft)] hover:underline" onClick={() => openEdit(row)}>
                Edit
              </button>
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

      <Modal open={formOpen} onClose={() => setFormOpen(false)} title={editing ? "Edit Event" : "Add Event"}>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <TextField label="Title" name="title" defaultValue={editing?.title} required />
          <TextField label="Date" name="date" defaultValue={editing?.date} placeholder="Every Friday" required />
          <SelectField
            label="Frequency"
            name="frequency"
            defaultValue={editing?.frequency ?? "Weekly"}
            options={FREQUENCY_OPTIONS}
            required
          />
          <TextAreaField label="Description" name="description" defaultValue={editing?.description ?? ""} rows={3} />
          <TextField label="Icon" name="icon" defaultValue={editing?.icon ?? ""} placeholder="music" />
          <ImageField existing={editing?.image_url} allowUrl />
          <TextField label="Image Position" name="image_position" defaultValue={editing?.image_position ?? ""} />

          {formError ? <p className="text-[0.83rem] text-[rgb(220,145,145)]">{formError}</p> : null}

          <button type="submit" className="luxury-button luxury-button-primary w-full justify-center px-4 py-3 text-sm" disabled={submitting}>
            {submitting ? "Saving…" : "Save Event"}
          </button>
        </form>
      </Modal>
    </div>
  );
}
