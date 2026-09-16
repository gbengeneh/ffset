"use client";

import { useEffect, useRef, useState } from "react";
import { mediaUrl } from "@/lib/media";
import { TextField } from "@/components/forms/fields";

export function ImageField({ existing, multiple = false, allowUrl = false }: { existing?: string | null; multiple?: boolean; allowUrl?: boolean }) {
  const [previews, setPreviews] = useState<string[]>([]);
  const urls = useRef<string[]>([]);
  useEffect(() => () => urls.current.forEach(url => URL.revokeObjectURL(url)), []);
  const images = previews.length ? previews : existing ? [mediaUrl(existing)!] : [];
  return <fieldset className="space-y-2 rounded-md border border-white/10 p-3">
    <legend className="px-1 text-xs font-medium text-white">Product photos</legend>
    {images.length ? <div className="flex flex-wrap gap-2">{images.map(src => (
      // eslint-disable-next-line @next/next/no-img-element
      <img key={src} src={src} alt="Image preview" className="h-16 w-16 rounded object-cover" />
    ))}</div> : null}
    <TextField label={multiple ? "Upload photos from your device" : "Upload image from your device"} type="file" name={multiple ? "photos" : "image"} multiple={multiple} accept="image/jpeg,image/png,image/webp" onChange={event => { urls.current.forEach(url => URL.revokeObjectURL(url)); urls.current = Array.from(event.target.files ?? []).map(file => URL.createObjectURL(file)); setPreviews(urls.current); }} hint="JPG, PNG or WebP, up to 5 MB each. Uploaded files take priority over a link." />
    {allowUrl ? <TextField label="Or use an image link (optional)" name="image_url" defaultValue={existing ?? ""} /> : null}
  </fieldset>;
}
