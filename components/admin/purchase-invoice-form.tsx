"use client";

import { useState } from "react";
import { SelectField, TextAreaField, TextField } from "@/components/forms/fields";
import { formatNaira, type Product, type PurchaseInvoice } from "@/lib/admin-types";
import { api, ApiError } from "@/lib/api-client";

type ItemRow = { product_id: string; quantity: string; unit_cost: string; new_price: string };
type SelectOption = { label: string; value: string };

const emptyRow = (): ItemRow => ({ product_id: "", quantity: "1", unit_cost: "", new_price: "" });

const compactInput =
  "w-full rounded-lg border border-[rgba(213,170,77,0.15)] bg-white/[0.03] px-2.5 py-2 text-sm text-[var(--text)] outline-none transition focus:border-[rgba(213,170,77,0.55)] focus:shadow-[0_0_0_3px_rgba(213,170,77,0.08)]";

function priceDelta(currentPrice: number, newPrice: number): { label: string; className: string } {
  if (!newPrice || newPrice === currentPrice) {
    return { label: "No change", className: "text-[var(--muted)]" };
  }

  const diff = newPrice - currentPrice;

  return diff > 0
    ? { label: `+${formatNaira(diff)}`, className: "text-[rgb(150,215,175)]" }
    : { label: `−${formatNaira(Math.abs(diff))}`, className: "text-[rgb(230,150,150)]" };
}

export function PurchaseInvoiceForm({
  editing,
  supplierOptions,
  productOptions,
  products,
  onSaved,
}: {
  editing: PurchaseInvoice | null;
  supplierOptions: SelectOption[];
  productOptions: SelectOption[];
  products: Product[];
  onSaved: () => void;
}) {
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [items, setItems] = useState<ItemRow[]>(() =>
    editing && editing.items.length
      ? editing.items.map((item) => ({
          product_id: String(item.product_id),
          quantity: String(item.quantity),
          unit_cost: String(item.unit_cost),
          new_price: item.new_price ?? item.product?.price ?? "",
        }))
      : [emptyRow()]
  );

  const itemsTotal = items.reduce(
    (sum, row) => sum + (Number(row.quantity) || 0) * (Number(row.unit_cost) || 0),
    0
  );

  function productById(id: string): Product | undefined {
    return products.find((product) => String(product.id) === id);
  }

  function updateRow(index: number, field: keyof ItemRow, value: string) {
    setItems((current) =>
      current.map((row, i) => {
        if (i !== index) return row;
        if (field === "product_id") {
          const product = productById(value);
          return { ...row, product_id: value, new_price: product?.price ?? "" };
        }
        return { ...row, [field]: value };
      })
    );
  }

  function addRow() {
    setItems((current) => [...current, emptyRow()]);
  }

  function removeRow(index: number) {
    setItems((current) => (current.length > 1 ? current.filter((_, i) => i !== index) : current));
  }

  async function handleSubmit(formEvent: React.FormEvent<HTMLFormElement>) {
    formEvent.preventDefault();
    setFormError(null);

    const validItems = items
      .filter((row) => row.product_id)
      .map((row) => ({
        product_id: Number(row.product_id),
        quantity: Number(row.quantity) || 0,
        unit_cost: Number(row.unit_cost) || 0,
        new_price: row.new_price ? Number(row.new_price) : null,
      }));

    if (validItems.length === 0) {
      setFormError("Add at least one product line.");
      return;
    }

    setSubmitting(true);
    const formData = new FormData(formEvent.currentTarget);
    const payload = {
      supplier_id: Number(formData.get("supplier_id")),
      invoice_number: String(formData.get("invoice_number") ?? ""),
      invoice_date: String(formData.get("invoice_date") ?? ""),
      due_date: String(formData.get("due_date") ?? "") || null,
      notes: String(formData.get("notes") ?? "") || null,
      receive_immediately: formData.get("receive_immediately") === "on",
      items: validItems,
    };

    try {
      if (editing) {
        await api.patch(`/admin/purchase-invoices/${editing.id}`, payload);
      } else {
        await api.post("/admin/purchase-invoices", payload);
      }
      onSaved();
    } catch (submissionError) {
      setFormError(submissionError instanceof ApiError ? submissionError.message : "Could not save purchase invoice.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <SelectField
          label="Supplier"
          name="supplier_id"
          defaultValue={editing ? String(editing.supplier_id) : ""}
          options={[{ label: "Select a supplier", value: "" }, ...supplierOptions]}
          required
        />
        <TextField label="Invoice Number" name="invoice_number" defaultValue={editing?.invoice_number} required />
        <TextField
          label="Invoice Date"
          name="invoice_date"
          type="date"
          defaultValue={editing?.invoice_date?.slice(0, 10)}
          required
        />
        <TextField label="Due Date" name="due_date" type="date" defaultValue={editing?.due_date?.slice(0, 10) ?? ""} />
      </div>
      <TextAreaField label="Notes" name="notes" rows={2} defaultValue={editing?.notes ?? ""} />

      <div className="space-y-2.5 rounded-xl border border-white/8 p-3.5">
        <div className="flex items-center justify-between">
          <p className="eyebrow text-[0.65rem]">Line Items</p>
          <button type="button" className="text-xs text-[var(--gold-soft)] hover:underline" onClick={addRow}>
            + Add Line
          </button>
        </div>

        <div className="hidden gap-2.5 px-0.5 text-[0.64rem] uppercase tracking-[0.12em] text-[var(--muted)] sm:grid sm:grid-cols-[minmax(0,1fr)_64px_96px_96px_1.75rem]">
          <span>Product</span>
          <span>Qty</span>
          <span>Unit Cost</span>
          <span>New Price</span>
          <span />
        </div>

        <div className="space-y-2">
          {items.map((row, index) => {
            const product = productById(row.product_id);
            const currentPrice = product ? Number(product.price) : 0;
            const delta = product ? priceDelta(currentPrice, Number(row.new_price) || 0) : null;

            return (
              <div
                key={index}
                className="grid grid-cols-[minmax(0,1fr)_1.75rem] items-center gap-2 rounded-lg bg-white/[0.02] p-2 sm:grid-cols-[minmax(0,1fr)_64px_96px_96px_1.75rem] sm:bg-transparent sm:p-0"
              >
                <select
                  aria-label="Product"
                  className={`${compactInput} col-span-2 sm:col-span-1`}
                  value={row.product_id}
                  onChange={(event) => updateRow(index, "product_id", event.target.value)}
                >
                  <option value="">Select…</option>
                  {productOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <input
                  aria-label="Quantity"
                  className={compactInput}
                  type="number"
                  min={1}
                  value={row.quantity}
                  onChange={(event) => updateRow(index, "quantity", event.target.value)}
                />
                <input
                  aria-label="Unit cost"
                  className={compactInput}
                  type="number"
                  min={0}
                  step="0.01"
                  value={row.unit_cost}
                  onChange={(event) => updateRow(index, "unit_cost", event.target.value)}
                />
                <input
                  aria-label="New selling price"
                  className={compactInput}
                  type="number"
                  min={0}
                  step="0.01"
                  value={row.new_price}
                  onChange={(event) => updateRow(index, "new_price", event.target.value)}
                />
                <button
                  type="button"
                  aria-label="Remove line"
                  title="Remove line"
                  className="flex h-8 w-7 items-center justify-center rounded-lg text-[var(--muted)] transition hover:bg-[rgba(190,72,92,0.12)] hover:text-[rgb(220,145,145)]"
                  onClick={() => removeRow(index)}
                >
                  ×
                </button>

                {product ? (
                  <p className="col-span-2 text-[0.68rem] text-[var(--muted)] sm:col-span-5">
                    Current price: {formatNaira(currentPrice)}
                    {" · "}
                    <span className={delta?.className}>{delta?.label}</span>
                  </p>
                ) : null}
              </div>
            );
          })}
        </div>

        <p className="text-right text-sm text-white">Total: {formatNaira(itemsTotal)}</p>
      </div>

      <label className="flex items-center gap-2.5 text-sm text-[var(--text)]">
        <input
          type="checkbox"
          name="receive_immediately"
          defaultChecked
          className="h-4 w-4 rounded border-[rgba(213,170,77,0.3)] bg-white/[0.03] accent-[var(--gold)]"
        />
        Goods have arrived — receive immediately (updates stock and prices right away)
      </label>

      {formError ? <p className="text-[0.83rem] text-[rgb(220,145,145)]">{formError}</p> : null}

      <button
        type="submit"
        className="luxury-button luxury-button-primary w-full justify-center px-4 py-3 text-sm sm:w-auto"
        disabled={submitting}
      >
        {submitting ? "Saving…" : "Save Purchase Invoice"}
      </button>
    </form>
  );
}
