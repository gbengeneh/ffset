"use client";

import { useMemo, useState } from "react";
import { DataTable, type DataTableColumn } from "@/components/admin/data-table";
import { Modal } from "@/components/admin/modal";
import { AdminPageHeader } from "@/components/admin/page-header";
import { SelectField, TextField } from "@/components/forms/fields";
import { useApiResource } from "@/hooks/use-api-resource";
import type { GalleryItem } from "@/lib/admin-types";
import { api, ApiError } from "@/lib/api-client";

const TYPE_OPTIONS = [
  { label: "Image", value: "image" },
  { label: "Video", value: "video" },
];

export default function AdminGalleryPage() {
  const { data: items, loading, error, refetch } = useApiResource<GalleryItem[]>("/admin/gallery");

  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<GalleryItem | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const columns: DataTableColumn<GalleryItem>[] = useMemo(
    () => [
      { key: "title", header: "Title", render: (row) => row.title },
      { key: "category", header: "Category", render: (row) => row.category },
      { key: "type", header: "Type", render: (row) => row.type },
    ],
    []
  );

  function openCreate() {
    setEditing(null);
    setFormError(null);
    setFormOpen(true);
  }

  function openEdit(item: GalleryItem) {
    setEditing(item);
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
      category: String(formData.get("category") ?? ""),
      type: String(formData.get("type") ?? "image"),
      src: String(formData.get("src") ?? ""),
      poster: String(formData.get("poster") ?? "") || null,
    };

    try {
      if (editing) {
        await api.patch(`/admin/gallery/${editing.id}`, payload);
      } else {
        await api.post("/admin/gallery", payload);
      }
      setFormOpen(false);
      refetch();
    } catch (submissionError) {
      setFormError(submissionError instanceof ApiError ? submissionError.message : "Could not save gallery item.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(item: GalleryItem) {
    if (!window.confirm(`Delete "${item.title}"?`)) return;
    await api.del(`/admin/gallery/${item.id}`);
    refetch();
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Gallery"
        description="Photos and videos shown on the public gallery page."
        action={
          <button type="button" className="luxury-button luxury-button-primary px-4 py-2.5 text-xs" onClick={openCreate}>
            Add Item
          </button>
        }
      />

      {loading ? (
        <div className="rounded-xl border border-white/8 bg-[rgba(20,14,15,0.5)] p-8 text-center text-sm text-[var(--muted)]">Loading gallery…</div>
      ) : error ? (
        <div className="rounded-xl border border-white/8 bg-[rgba(20,14,15,0.5)] p-8 text-center text-sm text-[rgb(220,145,145)]">{error}</div>
      ) : (
        <DataTable
          columns={columns}
          rows={items ?? []}
          rowKey={(row) => row.id}
          emptyMessage="No gallery items yet — add your first one."
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

      <Modal open={formOpen} onClose={() => setFormOpen(false)} title={editing ? "Edit Gallery Item" : "Add Gallery Item"}>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <TextField label="Title" name="title" defaultValue={editing?.title} required />
          <TextField label="Category" name="category" defaultValue={editing?.category} required />
          <SelectField label="Type" name="type" defaultValue={editing?.type ?? "image"} options={TYPE_OPTIONS} required />
          <TextField label="Source URL" name="src" defaultValue={editing?.src} required />
          <TextField label="Poster URL (video only)" name="poster" defaultValue={editing?.poster ?? ""} />

          {formError ? <p className="text-[0.83rem] text-[rgb(220,145,145)]">{formError}</p> : null}

          <button type="submit" className="luxury-button luxury-button-primary w-full justify-center px-4 py-3 text-sm" disabled={submitting}>
            {submitting ? "Saving…" : "Save Item"}
          </button>
        </form>
      </Modal>
    </div>
  );
}
