const TONES: Record<string, string> = {
  positive: "border-[rgba(120,200,150,0.3)] bg-[rgba(120,200,150,0.1)] text-[rgb(150,215,175)]",
  warning: "border-[rgba(213,170,77,0.3)] bg-[rgba(213,170,77,0.1)] text-[var(--gold-soft)]",
  negative: "border-[rgba(220,120,120,0.3)] bg-[rgba(220,120,120,0.1)] text-[rgb(230,150,150)]",
  neutral: "border-white/12 bg-white/5 text-[var(--muted)]",
};

const STATUS_TONE: Record<string, keyof typeof TONES> = {
  active: "positive",
  open: "positive",
  confirmed: "positive",
  paid: "positive",
  completed: "positive",
  read: "neutral",
  pending: "warning",
  upcoming: "warning",
  new: "warning",
  reserve_only: "warning",
  closed: "neutral",
  inactive: "negative",
  cancelled: "negative",
};

export function StatusPill({ status }: { status: string }) {
  const tone = TONES[STATUS_TONE[status] ?? "neutral"];
  const label = status.replace(/_/g, " ");

  return (
    <span
      className={`inline-block rounded-full border px-2.5 py-1 text-[0.68rem] uppercase tracking-[0.08em] whitespace-nowrap ${tone}`}
    >
      {label}
    </span>
  );
}
