"use client";

export type TelegramSubmissionField = {
  label: string;
  value: FormDataEntryValue | null;
};

export async function submitFormToTelegram({
  formType,
  fields,
}: {
  formType: string;
  fields: TelegramSubmissionField[];
}) {
  const response = await fetch("/api/telegram", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      formType,
      fields: fields.map((field) => ({
        label: field.label,
        value: String(field.value ?? "").trim(),
      })),
    }),
  });

  if (!response.ok) {
    const payload = (await response.json().catch(() => null)) as { error?: string } | null;
    throw new Error(payload?.error ?? "Telegram submission failed.");
  }
}
