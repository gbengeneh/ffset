export function BarList({
  items,
  valueFormatter,
}: {
  items: Array<{ label: string; value: number }>;
  valueFormatter?: (value: number) => string;
}) {
  if (items.length === 0) {
    return <p className="text-sm text-[var(--muted)]">No data in this range yet.</p>;
  }

  const max = Math.max(...items.map((item) => item.value), 1);

  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div key={item.label}>
          <div className="mb-1 flex items-center justify-between gap-3 text-xs">
            <span className="truncate text-[var(--muted)]">{item.label}</span>
            <span className="shrink-0 text-white">
              {valueFormatter ? valueFormatter(item.value) : item.value}
            </span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-white/5">
            <div
              className="h-full rounded-full bg-[linear-gradient(90deg,var(--wine),var(--gold))]"
              style={{ width: `${Math.max((item.value / max) * 100, 3)}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
