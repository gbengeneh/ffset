"use client";

import { useMemo, useState } from "react";
import { AdminPageHeader } from "@/components/admin/page-header";
import { DataTable, type DataTableColumn } from "@/components/admin/data-table";
import { Modal } from "@/components/admin/modal";
import { TextField } from "@/components/forms/fields";
import { useApiResource } from "@/hooks/use-api-resource";
import { api } from "@/lib/api-client";
import { formatNaira } from "@/lib/admin-types";

type Zone = {
  id: number;
  name: string;
  state: string | null;
  cities: string[];
  fee: string;
  estimated_delivery: string | null;
  is_active: boolean;
};

export default function DeliveryZonesPage() {
  const { data, loading, error, refetch } = useApiResource<Zone[]>("/admin/marketplace/delivery-zones");
  const [editing, setEditing] = useState<Zone | null>(null);
  const [open, setOpen] = useState(false);
  const columns: DataTableColumn<Zone>[] = useMemo(() => [
    { key: "name", header: "Zone", render: (row) => row.name },
    { key: "coverage", header: "Coverage", render: (row) => row.cities?.length ? row.cities.join(", ") : row.state ?? "Nationwide" },
    { key: "fee", header: "Fee", render: (row) => formatNaira(row.fee) },
    { key: "eta", header: "ETA", render: (row) => row.estimated_delivery ?? "-" },
    { key: "status", header: "Status", render: (row) => row.is_active ? "Active" : "Disabled" },
  ], []);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const body = {
      name: form.get("name"),
      state: form.get("state") || null,
      cities: String(form.get("cities") ?? "").split(",").map((value) => value.trim()).filter(Boolean),
      fee: Number(form.get("fee")),
      estimated_delivery: form.get("estimated_delivery") || null,
      is_active: form.get("is_active") === "on",
    };

    if (editing) {
      await api.patch(`/admin/marketplace/delivery-zones/${editing.id}`, body);
    } else {
      await api.post("/admin/marketplace/delivery-zones", body);
    }

    setOpen(false);
    refetch();
  }

  return <div className="space-y-6">
    <AdminPageHeader
      title="Delivery Zones"
      description="Configure checkout coverage, fees, and delivery estimates."
      action={<button className="luxury-button luxury-button-primary" onClick={() => { setEditing(null); setOpen(true); }}>Add zone</button>}
    />
    {loading ? <p>Loading...</p> : error ? <p className="text-red-300">{error}</p> : <DataTable
      columns={columns}
      rows={data ?? []}
      rowKey={(row) => row.id}
      emptyMessage="No delivery zones."
      actions={(row) => <button className="text-xs text-[var(--gold-soft)]" onClick={() => { setEditing(row); setOpen(true); }}>Edit</button>}
    />}
    <Modal open={open} onClose={() => setOpen(false)} title={editing ? "Edit delivery zone" : "Add delivery zone"}>
      <form className="space-y-4" onSubmit={submit}>
        <TextField label="Name" name="name" defaultValue={editing?.name} required />
        <TextField label="State" name="state" defaultValue={editing?.state ?? ""} />
        <TextField label="Cities (comma separated)" name="cities" defaultValue={editing?.cities?.join(", ") ?? ""} />
        <TextField label="Fee (NGN)" name="fee" type="number" min={0} defaultValue={editing?.fee} required />
        <TextField label="Estimated delivery" name="estimated_delivery" defaultValue={editing?.estimated_delivery ?? ""} />
        <label className="flex gap-2 text-sm text-white"><input type="checkbox" name="is_active" defaultChecked={editing?.is_active ?? true} /> Active</label>
        <button className="luxury-button luxury-button-primary w-full">Save zone</button>
      </form>
    </Modal>
  </div>;
}
