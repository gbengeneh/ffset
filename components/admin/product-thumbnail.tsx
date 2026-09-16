"use client";

import { useState } from "react";
import { mediaUrl } from "@/lib/media";

export function ProductThumbnail({ src, name }: { src?: string | null; name: string }) {
  const [failedSrc, setFailedSrc] = useState<string | undefined>();
  const resolved = mediaUrl(src);
  return <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded border border-white/10 bg-white/5">
    {resolved && resolved !== failedSrc ? (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={resolved} alt={name} className="h-full w-full object-cover" onError={() => setFailedSrc(resolved)} />
    ) : <span className="text-[9px] text-[var(--muted)]">No photo</span>}
  </div>;
}
