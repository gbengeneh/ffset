"use client";

import { useEffect, useState } from "react";

function getCountdown(targetDate: string) {
  const distance = new Date(targetDate).getTime() - Date.now();
  const safeDistance = Math.max(distance, 0);

  return {
    days: Math.floor(safeDistance / (1000 * 60 * 60 * 24)),
    hours: Math.floor((safeDistance / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((safeDistance / (1000 * 60)) % 60),
    seconds: Math.floor((safeDistance / 1000) % 60),
  };
}

export function Countdown({ targetDate }: { targetDate: string }) {
  const [countdown, setCountdown] = useState(() => getCountdown(targetDate));

  useEffect(() => {
    const interval = window.setInterval(() => {
      setCountdown(getCountdown(targetDate));
    }, 1000);

    return () => window.clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="grid gap-3 sm:grid-cols-4">
      {Object.entries(countdown).map(([label, value]) => (
        <div key={label} className="rounded-[1.6rem] border border-white/7 bg-white/4 p-4 text-center">
          <p className="display-font text-4xl text-white">{String(value).padStart(2, "0")}</p>
          <p className="mt-2 text-xs uppercase tracking-[0.24em] text-[var(--gold)]">{label}</p>
        </div>
      ))}
    </div>
  );
}
