"use client";

import { useState } from "react";
import { AdminPageHeader } from "@/components/admin/page-header";
import { DataTable, type DataTableColumn } from "@/components/admin/data-table";
import { Modal } from "@/components/admin/modal";
import { StatusPill } from "@/components/admin/status-pill";
import { TextAreaField, TextField } from "@/components/forms/fields";
import { useApiResource } from "@/hooks/use-api-resource";
import { api, ApiError } from "@/lib/api-client";
import { formatNaira, type MarketplaceOrder, type ResourcePaginated } from "@/lib/admin-types";

export default function MarketplaceOrdersManager({ vehicles = false }: { vehicles?: boolean }) {
  const [page, setPage] = useState(1);
  const { data, loading, error, refetch } = useApiResource<ResourcePaginated<MarketplaceOrder>>(`/admin/marketplace/orders?page=${page}&${vehicles ? "category=autos" : "exclude_category=autos"}`);
  const [selected, setSelected] = useState<MarketplaceOrder | null>(null);
  const [notes, setNotes] = useState(""); const [tracking, setTracking] = useState("");
  const [actionError, setActionError] = useState<string | null>(null); const [busy, setBusy] = useState(false);
  function view(order: MarketplaceOrder) { setSelected(order); setNotes(order.internal_notes ?? ""); setTracking(order.tracking_reference ?? ""); setActionError(null); }
  async function update(body: object) {
    if (!selected || busy) return; setBusy(true); setActionError(null);
    try { setSelected(await api.patch<MarketplaceOrder>(`/admin/marketplace/orders/${selected.id}`, { internal_notes: notes, tracking_reference: tracking || null, ...body })); refetch(); }
    catch (error) { setActionError(error instanceof ApiError ? error.message : "Could not update order."); }
    finally { setBusy(false); }
  }
  async function refund() {
    if (!selected || busy) return; const reason = window.prompt("Refund reason"); if (!reason) return;
    setBusy(true); setActionError(null);
    try { setSelected(await api.post<MarketplaceOrder>(`/admin/marketplace/orders/${selected.id}/refund`, { reason })); refetch(); }
    catch (error) { setActionError(error instanceof ApiError ? error.message : "Refund failed."); }
    finally { setBusy(false); }
  }
  const columns: DataTableColumn<MarketplaceOrder>[] = [
    { key: "reference", header: "Reference", render: order => <button className="text-[var(--gold-soft)] hover:underline" onClick={() => view(order)}>{order.reference_code}</button> },
    { key: "customer", header: "Customer", render: order => <div>{order.name}<p className="text-xs text-[var(--muted)]">{order.phone}</p></div> },
    { key: "items", header: "Items", render: order => <div>{order.items.map(item => `${item.listing_name} ×${item.quantity}`).join(", ")}{order.items.some(item => item.is_preorder) ? <p className="mt-1 text-xs text-[var(--gold-soft)]">Contains pre-order items</p> : null}</div> },
    { key: "total", header: "Total", render: order => formatNaira(order.total) },
    { key: "payment", header: "Payment", render: order => <StatusPill status={order.payment_status} /> },
    { key: "status", header: "Fulfilment", render: order => <StatusPill status={order.status} /> },
  ];
  return <div className="space-y-4">
    <AdminPageHeader title={vehicles ? "Vehicle Orders" : "Marketplace Orders"} description={vehicles ? "Vehicle reservations and purchases. Mixed orders containing a vehicle appear here." : "Merchandise pre-orders, payments, delivery, fulfilment, and refunds."} />
    {loading ? <p>Loading orders…</p> : error ? <p role="alert" className="text-red-300">{error}</p> : <DataTable columns={columns} rows={data?.data ?? []} rowKey={order => order.id} emptyMessage="No orders yet." actions={order => <button className="text-xs text-[var(--gold-soft)]" onClick={() => view(order)}>View order</button>} />}
    {data && data.meta.last_page > 1 ? <div className="flex items-center justify-center gap-4 text-sm"><button disabled={page === 1} onClick={() => setPage(page - 1)}>Previous</button><span>Page {page} of {data.meta.last_page}</span><button disabled={page >= data.meta.last_page} onClick={() => setPage(page + 1)}>Next</button></div> : null}
    <Modal open={!!selected} onClose={() => { if (!busy) setSelected(null); }} title={`Order ${selected?.reference_code ?? ""}`}>
      {selected ? <div className="space-y-3">
        <div className="grid gap-3 sm:grid-cols-2"><div><p className="form-label">Customer</p><p className="mt-1 text-white">{selected.name}</p><p className="text-sm text-[var(--muted)]">{selected.phone}<br />{selected.email}</p></div><div><p className="form-label">Fulfilment</p><p className="mt-1 capitalize text-white">{selected.fulfillment_type} · {selected.status.replaceAll("_", " ")}</p><p className="text-sm text-[var(--muted)]">{selected.delivery_zone?.name}{selected.delivery_address ? <><br />{selected.delivery_address}</> : null}</p></div></div>
        <div><p className="form-label">Packing list</p><div className="mt-2 divide-y divide-white/10 rounded-md border border-white/10">{selected.items.map(item => <div key={item.id} className="flex justify-between gap-3 p-3"><div><p className="text-sm text-white">{item.listing_name} × {item.quantity}</p><p className="text-xs text-[var(--muted)]">{item.listing_sku ?? "No SKU"} · {item.purchase_type === "deposit" ? "Deposit" : "Full payment"}{item.is_preorder ? " · Pre-order" : ""}</p>{Object.keys(item.selected_options).length ? <p className="mt-1 text-xs capitalize text-[var(--gold-soft)]">{Object.entries(item.selected_options).map(([key, value]) => `${key}: ${value}`).join(" · ")}</p> : null}</div><p className="text-sm">{formatNaira(item.line_total)}</p></div>)}</div></div>
        <div className="space-y-1 text-sm"><div className="flex justify-between"><span>Subtotal</span><span>{formatNaira(selected.subtotal)}</span></div><div className="flex justify-between"><span>Delivery</span><span>{formatNaira(selected.delivery_fee)}</span></div><div className="flex justify-between border-t border-white/10 pt-2 font-semibold text-white"><span>Total</span><span>{formatNaira(selected.total)}</span></div></div>
        {selected.payment_attempts?.length ? <div><p className="form-label">Payment audit</p>{selected.payment_attempts.map(attempt => <p key={attempt.id} className="mt-1 text-xs text-[var(--muted)]">{attempt.reference} · {attempt.status} · {formatNaira(attempt.amount)}</p>)}</div> : null}
        <div className="grid gap-3 sm:grid-cols-2"><TextAreaField label="Internal notes" name="order_notes" rows={2} value={notes} onChange={event => setNotes(event.target.value)} /><TextField label="Tracking reference" name="order_tracking" value={tracking} onChange={event => setTracking(event.target.value)} /></div>
        {actionError ? <p role="alert" className="text-sm text-red-300">{actionError}</p> : null}
        <div className="flex flex-wrap gap-2 [&>button]:px-3 [&>button]:py-2 [&>button]:text-xs">
          <button disabled={busy} className="luxury-button luxury-button-secondary" onClick={() => update({})}>Save notes</button>
          <button className="luxury-button luxury-button-secondary" onClick={() => window.print()}>Print packing slip</button>
          {selected.payment_status === "unpaid" ? <button disabled={busy} className="luxury-button luxury-button-primary" onClick={() => { if (window.confirm("Confirm this payment has been received in the bank account?")) void update({ payment_status: "paid", status: "confirmed" }); }}>Confirm bank payment</button> : null}
          {selected.status === "confirmed" ? <button disabled={busy} className="luxury-button luxury-button-primary" onClick={() => update({ status: "processing" })}>Start processing</button> : null}
          {selected.status === "processing" ? <button disabled={busy} className="luxury-button luxury-button-primary" onClick={() => update({ status: selected.fulfillment_type === "pickup" ? "ready_for_pickup" : "dispatched" })}>{selected.fulfillment_type === "pickup" ? "Ready for pickup" : "Dispatch"}</button> : null}
          {["ready_for_pickup", "dispatched"].includes(selected.status) ? <button disabled={busy} className="luxury-button luxury-button-primary" onClick={() => update({ status: "delivered" })}>Mark delivered</button> : null}
          {selected.status === "pending" ? <button disabled={busy} className="luxury-button luxury-button-secondary" onClick={() => update({ status: "cancelled", cancellation_reason: "Cancelled by admin" })}>Cancel</button> : null}
          {selected.payment_status === "paid" ? <button disabled={busy} className="luxury-button luxury-button-secondary text-red-300" onClick={refund}>Refund</button> : null}
        </div>
      </div> : null}
    </Modal>
  </div>;
}
