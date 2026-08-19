"use client";

import { useMemo, useState } from "react";
import { DataTable, type DataTableColumn } from "@/components/admin/data-table";
import { Modal } from "@/components/admin/modal";
import { AdminPageHeader } from "@/components/admin/page-header";
import { StatusPill } from "@/components/admin/status-pill";
import { SelectField, TextAreaField, TextField } from "@/components/forms/fields";
import { useApiResource } from "@/hooks/use-api-resource";
import { formatNaira, type Car } from "@/lib/admin-types";
import { api, ApiError } from "@/lib/api-client";

const CONDITION_OPTIONS = [
  { label: "New", value: "new" },
  { label: "Used", value: "used" },
  { label: "Certified Pre-Owned", value: "certified_pre_owned" },
];

const TRANSMISSION_OPTIONS = [
  { label: "Automatic", value: "automatic" },
  { label: "Manual", value: "manual" },
];

const FUEL_OPTIONS = [
  { label: "Petrol", value: "petrol" },
  { label: "Diesel", value: "diesel" },
  { label: "Hybrid", value: "hybrid" },
  { label: "Electric", value: "electric" },
];

const STATUS_OPTIONS = [
  { label: "Available", value: "available" },
  { label: "Reserved", value: "reserved" },
  { label: "Sold", value: "sold" },
];

export default function AdminCarsPage() {
  const { data: cars, loading, error, refetch } = useApiResource<Car[]>("/admin/cars");

  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Car | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const [imageTarget, setImageTarget] = useState<Car | null>(null);
  const [imageError, setImageError] = useState<string | null>(null);
  const [imageUploading, setImageUploading] = useState(false);

  const columns: DataTableColumn<Car>[] = useMemo(
    () => [
      { key: "car", header: "Car", render: (row) => `${row.year} ${row.make} ${row.model}` },
      { key: "price", header: "Price", render: (row) => formatNaira(row.price) },
      { key: "deposit", header: "Deposit", render: (row) => formatNaira(row.deposit_amount) },
      { key: "condition", header: "Condition", render: (row) => row.condition.replace(/_/g, " ") },
      { key: "status", header: "Status", render: (row) => <StatusPill status={row.status} /> },
    ],
    []
  );

  function openCreate() {
    setEditing(null);
    setFormError(null);
    setFormOpen(true);
  }

  function openEdit(car: Car) {
    setEditing(car);
    setFormError(null);
    setFormOpen(true);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError(null);
    setSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const featuresRaw = String(formData.get("features") ?? "");
    const payload = {
      make: String(formData.get("make") ?? ""),
      model: String(formData.get("model") ?? ""),
      year: Number(formData.get("year") ?? 0),
      price: Number(formData.get("price") ?? 0),
      deposit_amount: Number(formData.get("deposit_amount") ?? 0),
      mileage: formData.get("mileage") ? Number(formData.get("mileage")) : null,
      condition: String(formData.get("condition") ?? "used"),
      transmission: String(formData.get("transmission") ?? "automatic"),
      fuel_type: String(formData.get("fuel_type") ?? "petrol"),
      color: String(formData.get("color") ?? "") || null,
      vin: String(formData.get("vin") ?? "") || null,
      description: String(formData.get("description") ?? "") || null,
      features: featuresRaw
        .split(",")
        .map((feature) => feature.trim())
        .filter(Boolean),
      status: String(formData.get("status") ?? "available"),
    };

    try {
      if (editing) {
        await api.patch(`/admin/cars/${editing.id}`, payload);
      } else {
        await api.post("/admin/cars", payload);
      }
      setFormOpen(false);
      refetch();
    } catch (submissionError) {
      setFormError(submissionError instanceof ApiError ? submissionError.message : "Could not save car.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(car: Car) {
    if (!window.confirm(`Delete "${car.year} ${car.make} ${car.model}"? This cannot be undone.`)) return;
    await api.del(`/admin/cars/${car.id}`);
    refetch();
  }

  async function handleImageUpload(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!imageTarget) return;
    setImageError(null);
    setImageUploading(true);

    const formData = new FormData(event.currentTarget);

    try {
      const updated = await api.post<Car>(`/admin/cars/${imageTarget.id}/image`, formData);
      setImageTarget(updated);
      (event.target as HTMLFormElement).reset();
      refetch();
    } catch (submissionError) {
      setImageError(submissionError instanceof ApiError ? submissionError.message : "Could not upload image.");
    } finally {
      setImageUploading(false);
    }
  }

  async function handleImageDelete(imageId: number) {
    if (!imageTarget) return;
    const updated = await api.del<Car>(`/admin/cars/${imageTarget.id}/images/${imageId}`);
    setImageTarget(updated);
    refetch();
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Cars"
        description="FFSET Autos inventory — listings shown on the public car sales site."
        action={
          <button type="button" className="luxury-button luxury-button-primary px-4 py-2.5 text-xs" onClick={openCreate}>
            Add Car
          </button>
        }
      />

      {loading ? (
        <div className="rounded-xl border border-white/8 bg-[rgba(20,14,15,0.5)] p-8 text-center text-sm text-[var(--muted)]">Loading cars…</div>
      ) : error ? (
        <div className="rounded-xl border border-white/8 bg-[rgba(20,14,15,0.5)] p-8 text-center text-sm text-[rgb(220,145,145)]">{error}</div>
      ) : (
        <DataTable
          columns={columns}
          rows={cars ?? []}
          rowKey={(row) => row.id}
          emptyMessage="No cars yet — add your first listing."
          actions={(row) => (
            <div className="flex flex-wrap justify-end gap-2">
              <button type="button" className="text-xs text-[var(--gold-soft)] hover:underline" onClick={() => openEdit(row)}>
                Edit
              </button>
              <button
                type="button"
                className="text-xs text-[var(--gold-soft)] hover:underline"
                onClick={() => {
                  setImageError(null);
                  setImageTarget(row);
                }}
              >
                Photos ({row.images.length})
              </button>
              <button type="button" className="text-xs text-[rgb(220,145,145)] hover:underline" onClick={() => handleDelete(row)}>
                Delete
              </button>
            </div>
          )}
        />
      )}

      <Modal open={formOpen} onClose={() => setFormOpen(false)} title={editing ? "Edit Car" : "Add Car"}>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField label="Make" name="make" defaultValue={editing?.make} required />
            <TextField label="Model" name="model" defaultValue={editing?.model} required />
            <TextField label="Year" name="year" type="number" min={1980} defaultValue={editing?.year} required />
            <TextField label="Color" name="color" defaultValue={editing?.color ?? ""} />
            <TextField label="Price (₦)" name="price" type="number" min={0} step="0.01" defaultValue={editing?.price} required />
            <TextField
              label="Deposit Amount (₦)"
              name="deposit_amount"
              type="number"
              min={0}
              step="0.01"
              defaultValue={editing?.deposit_amount}
              hint="Charged to reserve the car online."
              required
            />
            <TextField label="Mileage (km)" name="mileage" type="number" min={0} defaultValue={editing?.mileage ?? ""} />
            <TextField label="VIN" name="vin" defaultValue={editing?.vin ?? ""} />
            <SelectField label="Condition" name="condition" defaultValue={editing?.condition ?? "used"} options={CONDITION_OPTIONS} required />
            <SelectField label="Transmission" name="transmission" defaultValue={editing?.transmission ?? "automatic"} options={TRANSMISSION_OPTIONS} required />
            <SelectField label="Fuel Type" name="fuel_type" defaultValue={editing?.fuel_type ?? "petrol"} options={FUEL_OPTIONS} required />
            <SelectField label="Status" name="status" defaultValue={editing?.status ?? "available"} options={STATUS_OPTIONS} required />
          </div>
          <TextAreaField label="Description" name="description" defaultValue={editing?.description ?? ""} rows={3} />
          <TextField
            label="Features (comma-separated)"
            name="features"
            defaultValue={editing?.features?.join(", ") ?? ""}
            placeholder="Leather Seats, Sunroof, Reverse Camera"
          />

          {formError ? <p className="text-[0.83rem] text-[rgb(220,145,145)]">{formError}</p> : null}

          <button type="submit" className="luxury-button luxury-button-primary w-full justify-center px-4 py-3 text-sm" disabled={submitting}>
            {submitting ? "Saving…" : "Save Car"}
          </button>
        </form>
      </Modal>

      <Modal open={Boolean(imageTarget)} onClose={() => setImageTarget(null)} title={`Photos — ${imageTarget ? `${imageTarget.year} ${imageTarget.make} ${imageTarget.model}` : ""}`}>
        <div className="space-y-4">
          {imageTarget && imageTarget.images.length > 0 ? (
            <div className="grid grid-cols-3 gap-2">
              {imageTarget.images.map((image) => (
                <div key={image.id} className="group relative overflow-hidden rounded-lg border border-white/8">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={image.image_url} alt="" className="h-24 w-full object-cover" />
                  <button
                    type="button"
                    className="absolute inset-0 flex items-center justify-center bg-black/60 text-xs text-white opacity-0 transition group-hover:opacity-100"
                    onClick={() => handleImageDelete(image.id)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-[var(--muted)]">No photos yet.</p>
          )}

          <form className="space-y-3" onSubmit={handleImageUpload}>
            <label className="block space-y-2">
              <span className="form-label">Add photo</span>
              <input type="file" name="image" accept="image/png,image/jpeg,image/webp" required className="form-input" />
            </label>
            {imageError ? <p className="text-[0.83rem] text-[rgb(220,145,145)]">{imageError}</p> : null}
            <button
              type="submit"
              className="luxury-button luxury-button-primary w-full justify-center px-4 py-3 text-sm"
              disabled={imageUploading}
            >
              {imageUploading ? "Uploading…" : "Upload Photo"}
            </button>
          </form>
        </div>
      </Modal>
    </div>
  );
}
