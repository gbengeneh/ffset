"use client";

import Link from "next/link";
import { AdminPageHeader } from "@/components/admin/page-header";
import { DataTable } from "@/components/admin/data-table";
import { ProductThumbnail } from "@/components/admin/product-thumbnail";
import { StatusPill } from "@/components/admin/status-pill";
import { useApiResource } from "@/hooks/use-api-resource";
import { formatNaira, type Car } from "@/lib/admin-types";

export default function LegacyCarsPage() {
  const { data, loading, error } = useApiResource<Car[]>("/admin/cars");
  return <div className="space-y-4">
    <AdminPageHeader title="Legacy Vehicle Records" description="Read-only historical records. Create and manage current vehicles in Vehicle Listings; older reservations retain their history." action={<Link className="luxury-button luxury-button-secondary text-xs" href="/admin/cars">Current Vehicle Listings</Link>} />
    {loading ? <p>Loading history…</p> : error ? <p role="alert" className="text-red-300">{error}</p> : <DataTable rows={data ?? []} rowKey={row => row.id} emptyMessage="No legacy vehicle records." columns={[
      { key: "vehicle", header: "Vehicle", render: row => <div className="flex items-center gap-3"><ProductThumbnail src={row.images[0]?.image_url} name={`${row.make} ${row.model}`} /><span>{row.year} {row.make} {row.model}</span></div> },
      { key: "price", header: "Historical price", render: row => formatNaira(row.price) },
      { key: "deposit", header: "Historical deposit", render: row => formatNaira(row.deposit_amount) },
      { key: "status", header: "Status", render: row => <StatusPill status={row.status} /> },
    ]} />}
  </div>;
}
