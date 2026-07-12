"use client";

import { useEffect, useState } from "react";

function getCountdown(targetDate: string) {
  const distance = new Date(targetDate).getTime() - Date.now();
  const safeDistance = Math.max(distance, 0);

  return {
    d: Math.floor(safeDistance / (1000 * 60 * 60 * 24)),
    h: Math.floor((safeDistance / (1000 * 60 * 60)) % 24),
    m: Math.floor((safeDistance / (1000 * 60)) % 60),
    s: Math.floor((safeDistance / 1000) % 60),
  };
}

type CountdownProps = {
  targetDate: string;
  compact?: boolean;
};

const initialCountdown = { d: 0, h: 0, m: 0, s: 0 };

export function Countdown({ targetDate, compact = false }: CountdownProps) {
  const [countdown, setCountdown] = useState(initialCountdown);

  useEffect(() => {
    setCountdown(getCountdown(targetDate));

    const interval = window.setInterval(() => {
      setCountdown(getCountdown(targetDate));
    }, 1000);

    return () => window.clearInterval(interval);
  }, [targetDate]);

  if (compact) {
    const entries = Object.entries(countdown);

    return (
      <div className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5">
        {entries.map(([label, value], index) => (
          <div key={label} className="flex items-baseline gap-2.5">
            <span className="flex items-baseline gap-1">
              <span className="display-font text-sm text-white sm:text-base">
                {String(value).padStart(2, "0")}
              </span>
              <span className="text-[0.55rem] uppercase text-[var(--gold)]">{label}</span>
            </span>
            {index < entries.length - 1 ? <span className="text-white/15">:</span> : null}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-4 gap-2">
      {Object.entries(countdown).map(([label, value]) => (
        <div key={label} className="rounded-[1.2rem] border border-white/7 bg-white/4 p-2.5 text-center sm:p-3">
          <p className="display-font text-xl text-white sm:text-2xl">{String(value).padStart(2, "0")}</p>
          <p className="mt-1 text-[0.55rem] uppercase tracking-[0.16em] text-[var(--gold)] sm:text-[0.6rem]">
            {label}
          </p>
        </div>
      ))}
    </div>
  );
}
