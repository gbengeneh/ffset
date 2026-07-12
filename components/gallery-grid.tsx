"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Reveal } from "@/components/reveal";
import { LazyVideo } from "@/components/lazy-video";
import type { GalleryItem } from "@/lib/site-data";

function ExpandIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7.5 3H3v4.5M12.5 3H17v4.5M7.5 17H3v-4.5M12.5 17H17v-4.5" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    >
      <path d="m5 5 10 10M15 5 5 15" />
    </svg>
  );
}

function ChevronIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={direction === "left" ? "m12 4-6 6 6 6" : "m8 4 6 6-6 6"} />
    </svg>
  );
}

export function GalleryGrid({ items }: { items: GalleryItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const close = useCallback(() => setOpenIndex(null), []);
  const showPrev = useCallback(
    () => setOpenIndex((current) => (current === null ? null : (current - 1 + items.length) % items.length)),
    [items.length]
  );
  const showNext = useCallback(
    () => setOpenIndex((current) => (current === null ? null : (current + 1) % items.length)),
    [items.length]
  );

  useEffect(() => {
    if (openIndex === null) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowLeft") showPrev();
      if (event.key === "ArrowRight") showNext();
    };

    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [openIndex, close, showPrev, showNext]);

  const activeItem = openIndex !== null ? items[openIndex] : null;

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {items.map((item, index) => (
          <Reveal key={item.title} delay={index * 0.06}>
            <button
              type="button"
              onClick={() => setOpenIndex(index)}
              className="group relative block w-full overflow-hidden rounded-[1.5rem] border border-[rgba(213,170,77,0.12)] bg-[rgba(12,9,10,0.92)] text-left shadow-[0_24px_60px_rgba(0,0,0,0.18)]"
            >
              <div className="relative aspect-[4/3]">
                {item.type === "video" ? (
                  <LazyVideo
                    className="h-full w-full object-cover"
                    src={item.src}
                    poster={item.poster}
                    autoPlay
                    muted
                    loop
                    playsInline
                  />
                ) : (
                  <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    className="object-cover transition duration-700 group-hover:scale-[1.05]"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                  <p className="text-[0.65rem] uppercase tracking-[0.2em] text-[var(--gold)]">{item.category}</p>
                  <p className="display-font mt-1.5 text-xl text-white sm:text-2xl">{item.title}</p>
                </div>
                <div className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-black/45 text-white opacity-0 backdrop-blur-md transition duration-300 group-hover:opacity-100">
                  <ExpandIcon />
                </div>
              </div>
            </button>
          </Reveal>
        ))}
      </div>

      <AnimatePresence>
        {activeItem ? (
          <motion.div
            className="fixed inset-0 z-100 flex items-center justify-center px-4 py-6 sm:py-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
          >
            <motion.div
              className="fixed inset-0 bg-black/88 backdrop-blur-sm"
              onClick={close}
              aria-hidden="true"
            />

            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={activeItem.title}
              className="relative z-10 w-full max-w-3xl"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="overflow-hidden rounded-[1.4rem] border border-white/10 bg-black">
                <div className="relative aspect-[4/3] sm:aspect-[16/10]">
                  {activeItem.type === "video" ? (
                    <video
                      key={activeItem.src}
                      className="h-full w-full object-contain"
                      src={activeItem.src}
                      poster={activeItem.poster}
                      controls
                      autoPlay
                      loop
                      playsInline
                    />
                  ) : (
                    <Image
                      src={activeItem.src}
                      alt={activeItem.title}
                      fill
                      sizes="100vw"
                      className="object-contain"
                    />
                  )}
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between gap-3">
                <div>
                  <p className="text-[0.62rem] uppercase tracking-[0.2em] text-[var(--gold)]">{activeItem.category}</p>
                  <p className="display-font text-base text-white sm:text-lg">{activeItem.title}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={showPrev}
                    aria-label="Previous item"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/12 bg-white/5 text-white transition hover:border-white/25 hover:bg-white/10"
                  >
                    <ChevronIcon direction="left" />
                  </button>
                  <button
                    type="button"
                    onClick={showNext}
                    aria-label="Next item"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/12 bg-white/5 text-white transition hover:border-white/25 hover:bg-white/10"
                  >
                    <ChevronIcon direction="right" />
                  </button>
                  <button
                    type="button"
                    onClick={close}
                    aria-label="Close"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/12 bg-white/5 text-white transition hover:border-white/25 hover:bg-white/10"
                  >
                    <CloseIcon />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
