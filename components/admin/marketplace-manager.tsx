"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { AdminPageHeader } from "@/components/admin/page-header";
import { DataTable, type DataTableColumn } from "@/components/admin/data-table";
import { Modal } from "@/components/admin/modal";
import { StatusPill } from "@/components/admin/status-pill";
import { ProductThumbnail } from "@/components/admin/product-thumbnail";
import { SelectField, TextAreaField, TextField } from "@/components/forms/fields";
import { ImageField } from "@/components/forms/image-field";
import { useApiResource } from "@/hooks/use-api-resource";
import { api, ApiError } from "@/lib/api-client";
import { mediaUrl } from "@/lib/media";
import { formatNaira, type MarketplaceCategory, type MarketplaceListing, type ResourcePaginated } from "@/lib/admin-types";

const options = (values: string[]) => values.map(value => ({ label: value.replaceAll("_", " "), value }));
const csv = (value: FormDataEntryValue | null) => String(value ?? "").split(",").map(item => item.trim()).filter(Boolean);
const message = (error: unknown) => error instanceof ApiError ? error.message : "The action failed. Please try again.";

export function CategoryFields({ slug, item }: { slug: string; item: MarketplaceListing | null }) {
  const vehicle = item?.details;
  const fashion = item?.fashion_details;
  const gadget = item?.gadget_details;
  return <fieldset className="rounded-md border border-white/10 p-3"><legend className="px-1 text-xs font-semibold text-white">Category specifications</legend><div className="grid gap-3 sm:grid-cols-2">
    {slug === "autos" ? <><TextField label="Make" name="make" defaultValue={vehicle?.make} required /><TextField label="Model" name="model" defaultValue={vehicle?.model} required /><TextField label="Year" name="year" type="number" min={1900} max={new Date().getFullYear() + 1} defaultValue={vehicle?.year} required /><TextField label="Mileage (km)" name="mileage" type="number" min={0} defaultValue={vehicle?.mileage ?? ""} /><SelectField label="Transmission" name="transmission" defaultValue={vehicle?.transmission ?? "automatic"} options={options(["automatic", "manual"])} /><SelectField label="Fuel type" name="fuel_type" defaultValue={vehicle?.fuel_type ?? "petrol"} options={options(["petrol", "diesel", "hybrid", "electric"])} /><TextField label="Colour" name="color" defaultValue={vehicle?.color ?? ""} /><TextField label="VIN" name="vin" defaultValue={vehicle?.vin ?? ""} /><div className="sm:col-span-2"><TextField label="Features (comma separated)" name="features" defaultValue={vehicle?.features.join(", ")} placeholder="Reverse camera, leather seats, sunroof" /></div></> : null}
    {slug === "fashion" ? <><TextField label="Brand" name="brand" defaultValue={fashion?.brand ?? ""} /><TextField label="Material" name="material" defaultValue={fashion?.material ?? ""} /><TextField label="Sizes (comma separated)" name="sizes" defaultValue={fashion?.sizes.join(", ")} placeholder="S, M, L, XL" /><TextField label="Colours (comma separated)" name="colors" defaultValue={fashion?.colors.join(", ")} placeholder="Black, Blue" /><fieldset className="sm:col-span-2"><legend className="form-label mb-2">Audience</legend><div className="flex flex-wrap gap-4">{["men", "women", "unisex", "kids"].map(value => <label key={value} className="flex gap-2 text-xs capitalize text-white"><input type="checkbox" name="genders" value={value} defaultChecked={fashion?.genders.includes(value) ?? value === "unisex"} />{value}</label>)}</div></fieldset></> : null}
    {slug === "gadgets" ? <><TextField label="Brand" name="brand" defaultValue={gadget?.brand ?? ""} /><TextField label="Device model" name="gadget_model" defaultValue={gadget?.model ?? ""} /><TextField label="Storage" name="storage" defaultValue={gadget?.storage ?? ""} placeholder="256 GB" /><TextField label="Memory / RAM" name="memory" defaultValue={gadget?.memory ?? ""} placeholder="8 GB" /><TextField label="Warranty" name="warranty" defaultValue={gadget?.warranty ?? ""} /></> : null}
    {!["autos", "fashion", "gadgets"].includes(slug) ? <p className="sm:col-span-2 text-xs text-[var(--muted)]">Describe this category’s specifications in the description. Vehicle fields are never shown here.</p> : null}
  </div></fieldset>;
}

export function MarketplaceManager({ vehicles = false }: { vehicles?: boolean }) {
  const [filter, setFilter] = useState(""); const [page, setPage] = useState(1);
  const query = new URLSearchParams({ page: String(page), ...(vehicles ? { category: "autos" } : { exclude_category: "autos" }), ...(filter ? { category: filter } : {}) });
  const { data: response, loading, error, refetch } = useApiResource<ResourcePaginated<MarketplaceListing>>(`/admin/marketplace/listings?${query}`);
  const { data: categoryTree } = useApiResource<MarketplaceCategory[]>("/admin/marketplace/categories");
  const categories = Array.from(new Map((categoryTree ?? []).flatMap(category => [category, ...category.children]).map(category => [category.id, category])).values()).filter(category => vehicles ? category.slug === "autos" : category.slug !== "autos");
  const [editing, setEditing] = useState<MarketplaceListing | null>(null); const [categorySlug, setCategorySlug] = useState("");
  const [orderMode, setOrderMode] = useState("pre_order"); const [open, setOpen] = useState(false); const [busy, setBusy] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null); const [photos, setPhotos] = useState<MarketplaceListing | null>(null); const [variants, setVariants] = useState<MarketplaceListing | null>(null);
  function begin(item: MarketplaceListing | null) {
    setEditing(item); setCategorySlug(item?.category.slug ?? categories[0]?.slug ?? "");
    setOrderMode(String(item?.attributes.order_mode ?? (item || vehicles ? "in_stock" : "pre_order"))); setActionError(null); setOpen(true);
  }
  async function save(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); setActionError(null); const data = new FormData(event.currentTarget);
    const category = categories.find(item => item.slug === categorySlug);
    if (!category) { setActionError("Choose a valid category before saving."); return; }
    const uploads = data.getAll("photos").filter((file): file is File => file instanceof File && file.size > 0);
    if (uploads.some(file => file.size > 5 * 1024 * 1024)) { setActionError("Each photo must be 5 MB or smaller."); return; }
    setBusy(true); const text = (key: string) => String(data.get(key) ?? "").trim(); const number = (key: string) => text(key) ? Number(text(key)) : null;
    const payload: Record<string, unknown> = {
      category_id: category.id, name: text("name"), slug: text("slug"), sku: text("sku") || null, short_description: text("short_description") || null, description: text("description") || null,
      price: number("price"), compare_at_price: number("compare_at_price"), deposit_amount: number("deposit_amount"), condition: text("condition"), status: text("status"),
      stock_quantity: orderMode === "pre_order" ? null : number("stock_quantity"), is_featured: data.get("is_featured") === "on",
      attributes: { ...editing?.attributes, order_mode: vehicles ? "in_stock" : orderMode, lead_time: text("lead_time") || null },
    };
    if (!editing) payload.published_at = new Date().toISOString();
    if (vehicles) payload.vehicle = { make: text("make"), model: text("model"), year: number("year"), mileage: number("mileage"), transmission: text("transmission") || null, fuel_type: text("fuel_type") || null, color: text("color") || null, vin: text("vin") || null, features: csv(data.get("features")) };
    if (categorySlug === "fashion") payload.fashion = { brand: text("brand") || null, genders: data.getAll("genders").map(String), material: text("material") || null, sizes: csv(data.get("sizes")), colors: csv(data.get("colors")) };
    if (categorySlug === "gadgets") payload.gadget = { brand: text("brand") || null, model: text("gadget_model") || null, storage: text("storage") || null, memory: text("memory") || null, warranty: text("warranty") || null, specifications: editing?.gadget_details?.specifications ?? {} };
    try {
      let saved = editing ? await api.patch<MarketplaceListing>(`/admin/marketplace/listings/${editing.id}`, payload) : await api.post<MarketplaceListing>("/admin/marketplace/listings", payload); setEditing(saved);
      for (const file of uploads) { const upload = new FormData(); upload.set("image", file); upload.set("alt_text", saved.name); saved = await api.post<MarketplaceListing>(`/admin/marketplace/listings/${saved.id}/image`, upload); setEditing(saved); }
      setOpen(false);
    } catch (error) { setActionError(message(error)); } finally { setBusy(false); refetch(); }
  }
  async function remove(item: MarketplaceListing) {
    if (!window.confirm(`Delete "${item.name}"? This cannot be undone.`)) return; setActionError(null);
    try { await api.del(`/admin/marketplace/listings/${item.id}`); refetch(); } catch (error) { setActionError(message(error)); }
  }
  async function uploadPhotos(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); if (!photos) return; const form = event.currentTarget;
    const files = new FormData(form).getAll("photos").filter((file): file is File => file instanceof File && file.size > 0);
    if (!files.length || files.some(file => file.size > 5 * 1024 * 1024)) { setActionError("Choose photos no larger than 5 MB each."); return; }
    setBusy(true); setActionError(null);
    try { for (const file of files) { const data = new FormData(); data.set("image", file); data.set("alt_text", photos.name); setPhotos(await api.post<MarketplaceListing>(`/admin/marketplace/listings/${photos.id}/image`, data)); } form.reset(); refetch(); }
    catch (error) { setActionError(message(error)); } finally { setBusy(false); }
  }
  async function removePhoto(id: number) {
    if (!photos || !window.confirm("Remove this photo?")) return; setActionError(null); setBusy(true);
    try { setPhotos(await api.del<MarketplaceListing>(`/admin/marketplace/listings/${photos.id}/images/${id}`)); refetch(); } catch (error) { setActionError(message(error)); } finally { setBusy(false); }
  }
  async function variantAction(path: string, payload: object, patch = false) {
    setBusy(true); setActionError(null);
    try { setVariants(patch ? await api.patch<MarketplaceListing>(path, payload) : await api.post<MarketplaceListing>(path, payload)); refetch(); } catch (error) { setActionError(message(error)); } finally { setBusy(false); }
  }
  const columns: DataTableColumn<MarketplaceListing>[] = [
    { key: "name", header: vehicles ? "Vehicle" : "Product", render: row => <div className="flex items-center gap-3"><ProductThumbnail src={row.images[0]?.image_url} name={row.name} /><div><p className="text-white">{row.name}</p><p className="text-xs text-[var(--muted)]">{row.sku ?? row.slug}</p></div></div> },
    { key: "category", header: vehicles ? "Make / Model" : "Category", render: row => vehicles ? `${row.details?.make ?? ""} ${row.details?.model ?? ""}` : row.category.name },
    { key: "price", header: "Price", render: row => formatNaira(row.price) },
    { key: "availability", header: "Availability", render: row => row.attributes.order_mode === "pre_order" ? "Pre-order" : row.stock_quantity === null ? "On request" : `${row.stock_quantity} in stock` },
    { key: "status", header: "Status", render: row => <StatusPill status={row.status} /> },
  ];
  const formTitle = vehicles ? "Vehicle" : categories.find(item => item.slug === categorySlug)?.name ?? "Product";
  return <div className="space-y-4">
    <AdminPageHeader title={vehicles ? "Vehicles" : "Marketplace Products"} description={vehicles ? "Dedicated vehicle listings and reservations, separate from merchandise and POS stock." : "Category-specific online products. New listings default to pre-order and never enter lounge POS."} action={<button className="luxury-button luxury-button-primary px-4 py-2 text-xs" disabled={!categories.length} onClick={() => begin(null)}>{vehicles ? "Add Vehicle" : "Add Product"}</button>} />
    <div className="flex flex-wrap gap-2">{!vehicles ? <><button className="luxury-button luxury-button-secondary px-3 py-2 text-xs" onClick={() => { setFilter(""); setPage(1); }}>All merchandise</button>{categories.map(category => <button key={category.id} aria-pressed={filter === category.slug} className={`luxury-button px-3 py-2 text-xs ${filter === category.slug ? "luxury-button-primary" : "luxury-button-secondary"}`} onClick={() => { setFilter(category.slug); setPage(1); }}>{category.name}</button>)}<Link href="/admin/cars" className="luxury-button luxury-button-secondary px-3 py-2 text-xs">Manage vehicles separately →</Link></> : <Link href="/admin/legacy-cars" className="text-xs text-[var(--muted)] underline">Older car records / legacy reservations</Link>}</div>
    {actionError && !open && !photos && !variants ? <p role="alert" className="text-sm text-red-300">{actionError}</p> : null}
    {loading ? <p className="p-6 text-sm text-[var(--muted)]">Loading listings…</p> : error ? <p role="alert" className="text-red-300">{error}</p> : <DataTable columns={columns} rows={response?.data ?? []} rowKey={row => row.id} emptyMessage={vehicles ? "No vehicle listings yet." : "No marketplace products in this category."} actions={row => <div className="flex flex-wrap justify-end gap-3"><button className="text-xs text-[var(--gold-soft)]" onClick={() => begin(row)}>Edit</button><button className="text-xs text-[var(--gold-soft)]" onClick={() => { setActionError(null); setPhotos(row); }}>Photos ({row.images.length})</button>{row.category.slug === "fashion" ? <button className="text-xs text-[var(--gold-soft)]" onClick={() => { setActionError(null); setVariants(row); }}>Variants</button> : null}<button className="text-xs text-red-300" onClick={() => remove(row)}>Delete</button></div>} />}
    {response && response.meta.last_page > 1 ? <div className="flex items-center justify-center gap-4 text-sm"><button disabled={page <= 1} onClick={() => setPage(page - 1)}>Previous</button><span>Page {page} of {response.meta.last_page}</span><button disabled={page >= response.meta.last_page} onClick={() => setPage(page + 1)}>Next</button></div> : null}
    <Modal open={open} onClose={() => { if (!busy) setOpen(false); }} title={`${editing ? "Edit" : "Add"} ${formTitle}`}>
      {!vehicles ? <div className="mb-4"><SelectField label="Product category" name="form_category" value={categorySlug} disabled={!!editing || busy} onChange={event => setCategorySlug(event.target.value)} options={categories.map(category => ({ label: category.name, value: category.slug }))} /></div> : null}
      <form key={`${editing?.id ?? "new"}-${categorySlug}`} className="space-y-3" onSubmit={save}><fieldset disabled={busy} className="space-y-3">
        <div className="grid gap-3 sm:grid-cols-2"><TextField label={vehicles ? "Listing title" : "Product name"} name="name" defaultValue={editing?.name} required /><TextField label="URL slug" name="slug" defaultValue={editing?.slug} placeholder={vehicles ? "2024-toyota-camry" : "product-name"} pattern="[A-Za-z0-9_-]+" required /><TextField label="SKU (optional)" name="sku" defaultValue={editing?.sku ?? ""} /><SelectField label="Status" name="status" defaultValue={editing?.status ?? "draft"} options={options(["draft", "active", "reserved", "sold", "out_of_stock", "archived"])} /><TextField label="Price (NGN)" name="price" type="number" min={0} step="0.01" defaultValue={editing?.price} required /><TextField label="Compare-at price (optional)" name="compare_at_price" type="number" min={0} step="0.01" defaultValue={editing?.compare_at_price ?? ""} /><TextField label={vehicles ? "Reservation deposit (NGN)" : "Pre-order deposit (optional)"} name="deposit_amount" type="number" min={0} step="0.01" defaultValue={editing?.deposit_amount ?? ""} /><SelectField label="Condition" name="condition" defaultValue={editing?.condition ?? (vehicles ? "used" : "new")} options={options(vehicles ? ["new", "used", "certified_pre_owned"] : ["new", "used", "refurbished"])} /></div>
        {!vehicles ? <div className="grid gap-3 sm:grid-cols-2"><SelectField label="Order mode" name="order_mode" value={orderMode} onChange={event => setOrderMode(event.target.value)} options={[{ label: "Pre-order (sourced after order)", value: "pre_order" }, { label: "Ready stock", value: "in_stock" }]} /><TextField label="Estimated fulfilment / lead time" name="lead_time" defaultValue={String(editing?.attributes.lead_time ?? "")} placeholder="e.g. 10–14 business days" required={orderMode === "pre_order"} />{orderMode === "in_stock" ? <TextField label="Available stock" name="stock_quantity" type="number" min={0} defaultValue={editing?.stock_quantity ?? ""} /> : <p className="sm:col-span-2 text-xs text-[var(--muted)]">Pre-orders are sourced after purchase and do not consume on-hand stock.</p>}</div> : <input type="hidden" name="stock_quantity" value={editing?.stock_quantity ?? 1} />}
        <CategoryFields slug={categorySlug} item={editing} /><TextField label="Short summary" name="short_description" defaultValue={editing?.short_description ?? ""} maxLength={500} /><TextAreaField label="Description" name="description" rows={3} defaultValue={editing?.description ?? ""} /><ImageField multiple existing={editing?.images[0]?.image_url} /><label className="flex gap-2 text-xs text-white"><input type="checkbox" name="is_featured" defaultChecked={editing?.is_featured} />Feature in the store</label>
      </fieldset>{actionError ? <p role="alert" className="text-sm text-red-300">{actionError}</p> : null}<button disabled={busy} className="luxury-button luxury-button-primary w-full py-2.5">{busy ? "Saving…" : `Save ${vehicles ? "vehicle" : "product"}`}</button></form>
    </Modal>
    <Modal open={!!photos} onClose={() => { if (!busy) setPhotos(null); }} title={`Photos — ${photos?.name ?? ""}`}><div className="grid grid-cols-3 gap-3">{photos?.images.map(image => <div key={image.id} className="space-y-1"><Image unoptimized width={160} height={96} src={mediaUrl(image.image_url)!} alt={image.alt_text ?? photos.name} className="h-24 w-full rounded object-cover" /><button disabled={busy} className="text-xs text-red-300" onClick={() => removePhoto(image.id)}>Remove photo</button></div>)}</div><form className="mt-3 space-y-3" onSubmit={uploadPhotos}><ImageField key={photos?.images.length} multiple />{actionError ? <p role="alert" className="text-sm text-red-300">{actionError}</p> : null}<button disabled={busy} className="luxury-button luxury-button-primary w-full">{busy ? "Uploading…" : "Upload photos"}</button></form></Modal>
    <Modal open={!!variants} onClose={() => { if (!busy) setVariants(null); }} title={`Fashion variants — ${variants?.name ?? ""}`}><button disabled={busy} className="luxury-button luxury-button-secondary mb-3 w-full" onClick={() => variants && variantAction(`/admin/marketplace/listings/${variants.id}/variants/generate`, { default_stock: 0 })}>Generate size / colour combinations</button>{actionError ? <p role="alert" className="mb-3 text-sm text-red-300">{actionError}</p> : null}<div className="space-y-3">{variants?.variants.map(variant => <form key={variant.id} className="space-y-2 rounded-md border border-white/10 p-3" onSubmit={event => { event.preventDefault(); const data = new FormData(event.currentTarget); void variantAction(`/admin/marketplace/listings/${variants.id}/variants/${variant.id}`, { sku: String(data.get("sku") ?? "") || null, price: data.get("price") ? Number(data.get("price")) : null, stock_quantity: Number(data.get("stock_quantity")), is_active: data.get("is_active") === "on" }, true); }}><p className="text-xs capitalize text-white">{Object.entries(variant.options).map(([key, value]) => `${key}: ${value}`).join(" · ")}</p><div className="grid gap-2 sm:grid-cols-3"><TextField label="SKU" name="sku" defaultValue={variant.sku ?? ""} /><TextField label="Price override" name="price" type="number" min={0} defaultValue={variant.price ?? ""} /><TextField label="Ready stock" name="stock_quantity" type="number" min={0} defaultValue={variant.stock_quantity} required /></div><label className="flex gap-2 text-xs"><input type="checkbox" name="is_active" defaultChecked={variant.is_active} />Available option (pre-orders do not require stock)</label><button disabled={busy} className="text-xs text-[var(--gold-soft)]">Save variant</button></form>)}</div></Modal>
  </div>;
}
