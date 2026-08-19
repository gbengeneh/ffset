import { PublicApiError } from "@/lib/public-form";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api";

export type PaymentSale = {
  id: number;
  status: "pending" | "completed" | "refunded";
  total: string;
  items: Array<{
    quantity: number;
    line_total: string;
    product?: { name: string };
  }>;
};

export async function initializePayment(
  saleId: number,
  email: string
): Promise<{ authorization_url: string; access_code: string; reference: string }> {
  const response = await fetch(`${API_URL}/payments/sales/${saleId}/initialize`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ email }),
  });

  const payload = await response.json().catch(() => null);

  if (!response.ok) {
    throw new PublicApiError(payload?.message ?? "Could not start payment.", payload?.errors);
  }

  return payload;
}

export async function verifyPayment(reference: string): Promise<PaymentSale> {
  const response = await fetch(`${API_URL}/payments/verify/${reference}`, {
    headers: { Accept: "application/json" },
  });

  const payload = await response.json().catch(() => null);

  if (!response.ok) {
    throw new PublicApiError(payload?.message ?? "Could not verify payment.");
  }

  return payload;
}
