import { NextResponse } from "next/server";

const DEFAULT_TELEGRAM_CHAT_ID = "1110104785";

type SubmissionPayload = {
  formType?: string;
  fields?: Array<{ label: string; value: string }>;
};

function escapeTelegramMarkdown(value: string) {
  return value.replace(/([_*\[\]()~`>#+\-=|{}.!\\])/g, "\\$1");
}

function buildTelegramMessage(payload: SubmissionPayload) {
  const title = payload.formType ? `FFSET ${payload.formType}` : "FFSET Form Submission";
  const lines = [`*${escapeTelegramMarkdown(title)}*`, ""];

  for (const field of payload.fields ?? []) {
    lines.push(
      `*${escapeTelegramMarkdown(field.label)}:* ${escapeTelegramMarkdown(field.value || "-")}`
    );
  }

  return lines.join("\n");
}

export async function POST(request: Request) {
  const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN;
  const telegramChatId = process.env.TELEGRAM_CHAT_ID ?? DEFAULT_TELEGRAM_CHAT_ID;

  if (!telegramBotToken) {
    return NextResponse.json(
      { error: "Telegram bot token is not configured yet." },
      { status: 500 }
    );
  }

  let payload: SubmissionPayload;

  try {
    payload = (await request.json()) as SubmissionPayload;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!payload.formType || !payload.fields?.length) {
    return NextResponse.json({ error: "Missing submission details." }, { status: 400 });
  }

  const telegramResponse = await fetch(
    `https://api.telegram.org/bot${telegramBotToken}/sendMessage`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: telegramChatId,
        text: buildTelegramMessage(payload),
        parse_mode: "MarkdownV2",
      }),
      cache: "no-store",
    }
  );

  if (!telegramResponse.ok) {
    const telegramError = await telegramResponse.text();
    return NextResponse.json(
      { error: "Telegram delivery failed.", details: telegramError },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
