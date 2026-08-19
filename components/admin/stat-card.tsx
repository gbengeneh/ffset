import type { ComponentType, SVGProps } from "react";

type StatCardProps = {
  label: string;
  value: string;
  hint?: string;
  icon?: ComponentType<SVGProps<SVGSVGElement>>;
};

export function StatCard({ label, value, hint, icon: Icon }: StatCardProps) {
  return (
    <div className="rounded-xl border border-white/8 bg-[rgba(20,14,15,0.55)] p-5 transition hover:border-white/14">
      <div className="flex items-center justify-between gap-3">
        <p className="text-[0.7rem] uppercase tracking-[0.16em] text-[var(--gold)]">{label}</p>
        {Icon ? (
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[rgba(213,170,77,0.1)] text-[var(--gold-soft)]">
            <Icon className="h-[1.05rem] w-[1.05rem]" />
          </span>
        ) : null}
      </div>
      <p className="display-font mt-2.5 text-[1.9rem] leading-none text-white">{value}</p>
      {hint ? <p className="mt-2 text-xs text-[var(--muted)]">{hint}</p> : null}
    </div>
  );
}
