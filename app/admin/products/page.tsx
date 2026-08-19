"use client";

import { useMemo, useState } from "react";
import { DataTable, type DataTableColumn } from "@/components/admin/data-table";
import { Modal } from "@/components/admin/modal";
import { AdminPageHeader } from "@/components/admin/page-header";
import { StatusPill } from "@/components/admin/status-pill";
import { SelectField, TextAreaField, TextField } from "@/components/forms/fields";
import { useApiResource } from "@/hooks/use-api-resource";
import { formatNaira, type Product } from "@/lib/admin-types";
import { api, ApiError } from "@/lib/api-client";

const TYPE_OPTIONS = [
  { label: "Wine", value: "wine" },
  { label: "Drink", value: "drink" },
  { label: "Gaming Package", value: "gaming_package" },
  { label: "Service", value: "service" },
];

const STATUS_OPTIONS = [
  { label: "Active", value: "active" },
  { label: "Inactive", value: "inactive" },
  { label: "Reserve Only", value: "reserve_only" },
];

export default function AdminProductsPage() {
  const [typeFilter, setTypeFilter] = useState("");
  const path = typeFilter ? `/admin/products?type=${typeFilter}` : "/admin/products";
  const { data: products, loading, error, refetch } = useApiResource<Product[]>(path);

  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const [restockTarget, setRestockTarget] = useState<Product | null>(null);
  const [restockError, setRestockError] = useState<string | null>(null);

  const [imageTarget, setImageTarget] = useState<Product | null>(null);
  const [imageError, setImageError] = useState<string | null>(null);
  const [imageUploading, setImageUploading] = useState(false);

  const columns: DataTableColumn<Product>[] = useMemo(
    () => [
      { key: "name", header: "Name", render: (row) => row.name },
      { key: "type", header: "Type", render: (row) => row.type.replace("_", " ") },
      { key: "price", header: "Price", render: (row) => formatNaira(row.price) },
      {
        key: "stock",
        header: "Stock",
        render: (row) => (row.is_stocked ? row.stock_quantity : "—"),
      },
      { key: "status", header: "Status", render: (row) => <StatusPill status={row.status} /> },
    ],
    []
  );

  function openCreate() {
    setEditing(null);
    setFormError(null);
    setFormOpen(true);
  }

  function openEdit(product: Product) {
    setEditing(product);
    setFormError(null);
    setFormOpen(true);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError(null);
    setSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const payload = {
      name: String(formData.get("name") ?? ""),
      type: String(formData.get("type") ?? ""),
      category: String(formData.get("category") ?? "") || null,
      description: String(formData.get("description") ?? "") || null,
      size: String(formData.get("size") ?? "") || null,
      price: Number(formData.get("price") ?? 0),
      image_url: String(formData.get("image_url") ?? "") || null,
      is_stocked: formData.get("is_stocked") === "on",
      stock_quantity: formData.get("stock_quantity") ? Number(formData.get("stock_quantity")) : null,
      low_stock_threshold: Number(formData.get("low_stock_threshold") ?? 5),
      status: String(formData.get("status") ?? "active"),
    };

    try {
      if (editing) {
        await api.patch(`/admin/products/${editing.id}`, payload);
      } else {
        await api.post("/admin/products", payload);
      }
      setFormOpen(false);
      refetch();
    } catch (submissionError) {
      setFormError(submissionError instanceof ApiError ? submissionError.message : "Could not save product.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(product: Product) {
    if (!window.confirm(`Delete "${product.name}"? This cannot be undone.`)) return;
    await api.del(`/admin/products/${product.id}`);
    refetch();
  }

  async function handleRestock(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!restockTarget) return;
    setRestockError(null);

    const formData = new FormData(event.currentTarget);

    try {
      await api.post(`/admin/products/${restockTarget.id}/restock`, {
        quantity: Number(formData.get("quantity") ?? 0),
        reason: String(formData.get("reason") ?? "") || null,
      });
      setRestockTarget(null);
      refetch();
    } catch (submissionError) {
      setRestockError(submissionError instanceof ApiError ? submissionError.message : "Could not restock.");
    }
  }

  async function handleImageUpload(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!imageTarget) return;
    setImageError(null);
    setImageUploading(true);

    const formData = new FormData(event.currentTarget);

    try {
      await api.post(`/admin/products/${imageTarget.id}/image`, formData);
      setImageTarget(null);
      refetch();
    } catch (submissionError) {
      setImageError(submissionError instanceof ApiError ? submissionError.message : "Could not upload image.");
    } finally {
      setImageUploading(false);
    }
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Products"
        description="Wines, drinks, gaming packages, and service line items — with live stock levels."
        action={
          <button type="button" className="luxury-button luxury-button-primary px-4 py-2.5 text-xs" onClick={openCreate}>
            Add Product
          </button>
        }
      />

      <div className="max-w-xs">
        <SelectField
          label="Filter by type"
          name="type_filter"
          value={typeFilter}
          onChange={(event) => setTypeFilter(event.target.value)}
          options={[{ label: "All types", value: "" }, ...TYPE_OPTIONS]}
        />
      </div>

      {loading ? (
        <div className="rounded-xl border border-white/8 bg-[rgba(20,14,15,0.5)] p-8 text-center text-sm text-[var(--muted)]">Loading products…</div>
      ) : error ? (
        <div className="rounded-xl border border-white/8 bg-[rgba(20,14,15,0.5)] p-8 text-center text-sm text-[rgb(220,145,145)]">{error}</div>
      ) : (
        <DataTable
          columns={columns}
          rows={products ?? []}
          rowKey={(row) => row.id}
          emptyMessage="No products yet — add your first one."
          actions={(row) => (
            <div className="flex flex-wrap justify-end gap-2">
              <button type="button" className="text-xs text-[var(--gold-soft)] hover:underline" onClick={() => openEdit(row)}>
                Edit
              </button>
              {row.is_stocked ? (
                <button
                  type="button"
                  className="text-xs text-[var(--gold-soft)] hover:underline"
                  onClick={() => setRestockTarget(row)}
                >
                  Restock
                </button>
              ) : null}
              <button
                type="button"
                className="text-xs text-[var(--gold-soft)] hover:underline"
                onClick={() => setImageTarget(row)}
              >
                Image
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

      <Modal open={formOpen} onClose={() => setFormOpen(false)} title={editing ? "Edit Product" : "Add Product"}>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <TextField label="Name" name="name" defaultValue={editing?.name} required />
          <SelectField label="Type" name="type" defaultValue={editing?.type ?? "wine"} options={TYPE_OPTIONS} required />
          <TextField label="Category" name="category" defaultValue={editing?.category ?? ""} />
          <TextAreaField label="Description" name="description" defaultValue={editing?.description ?? ""} rows={3} />
          <TextField label="Size" name="size" defaultValue={editing?.size ?? ""} placeholder="750ml" />
          <TextField
            label="Price (₦)"
            name="price"
            type="number"
            min={0}
            step="0.01"
            defaultValue={editing?.price}
            required
          />
          <TextField label="Image URL" name="image_url" defaultValue={editing?.image_url ?? ""} />
          <label className="flex items-center gap-2 text-sm text-[var(--muted)]">
            <input type="checkbox" name="is_stocked" defaultChecked={editing?.is_stocked ?? true} />
            Track stock quantity for this product
          </label>
          <TextField
            label="Stock Quantity"
            name="stock_quantity"
            type="number"
            min={0}
            defaultValue={editing?.stock_quantity ?? ""}
          />
          <TextField
            label="Low Stock Threshold"
            name="low_stock_threshold"
            type="number"
            min={0}
            defaultValue={editing?.low_stock_threshold ?? 5}
          />
          <SelectField
            label="Status"
            name="status"
            defaultValue={editing?.status ?? "active"}
            options={STATUS_OPTIONS}
            required
          />

          {formError ? <p className="text-[0.83rem] text-[rgb(220,145,145)]">{formError}</p> : null}

          <button type="submit" className="luxury-button luxury-button-primary w-full justify-center px-4 py-3 text-sm" disabled={submitting}>
            {submitting ? "Saving…" : "Save Product"}
          </button>
        </form>
      </Modal>

      <Modal open={Boolean(restockTarget)} onClose={() => setRestockTarget(null)} title={`Restock ${restockTarget?.name ?? ""}`}>
        <form className="space-y-4" onSubmit={handleRestock}>
          <TextField label="Quantity to add" name="quantity" type="number" min={1} required />
          <TextField label="Reason (optional)" name="reason" placeholder="New delivery" />
          {restockError ? <p className="text-[0.83rem] text-[rgb(220,145,145)]">{restockError}</p> : null}
          <button type="submit" className="luxury-button luxury-button-primary w-full justify-center px-4 py-3 text-sm">
            Add Stock
          </button>
        </form>
      </Modal>

      <Modal open={Boolean(imageTarget)} onClose={() => setImageTarget(null)} title={`Product Image — ${imageTarget?.name ?? ""}`}>
        <form className="space-y-4" onSubmit={handleImageUpload}>
          <label className="block space-y-2">
            <span className="form-label">Image file</span>
            <input type="file" name="image" accept="image/png,image/jpeg,image/webp" required className="form-input" />
          </label>
          {imageError ? <p className="text-[0.83rem] text-[rgb(220,145,145)]">{imageError}</p> : null}
          <button
            type="submit"
            className="luxury-button luxury-button-primary w-full justify-center px-4 py-3 text-sm"
            disabled={imageUploading}
          >
            {imageUploading ? "Uploading…" : "Upload Image"}
          </button>
        </form>
      </Modal>
    </div>
  );
}
