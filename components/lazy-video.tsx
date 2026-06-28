"use client";

import { useEffect, useRef, useState } from "react";

type LazyVideoProps = {
  className?: string;
  src: string;
  poster?: string;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  playsInline?: boolean;
  controls?: boolean;
  loopEndTime?: number;
};

export function LazyVideo({
  className,
  src,
  poster,
  autoPlay = false,
  muted = false,
  loop = false,
  playsInline = false,
  controls = false,
  loopEndTime,
}: LazyVideoProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const node = videoRef.current;

    if (!node || shouldLoad) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px 0px" },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [shouldLoad]);

  useEffect(() => {
    const node = videoRef.current;

    if (!node || !loop || !loopEndTime) {
      return;
    }

    const handleTimeUpdate = () => {
      if (node.currentTime >= loopEndTime) {
        node.currentTime = 0;

        if (autoPlay) {
          void node.play().catch(() => {
            // Ignore autoplay replay interruptions from the browser.
          });
        }
      }
    };

    node.addEventListener("timeupdate", handleTimeUpdate);

    return () => node.removeEventListener("timeupdate", handleTimeUpdate);
  }, [autoPlay, loop, loopEndTime, shouldLoad]);

  return (
    <video
      ref={videoRef}
      className={className}
      poster={poster}
      preload={shouldLoad ? "metadata" : "none"}
      autoPlay={autoPlay}
      muted={muted}
      loop={loop}
      playsInline={playsInline}
      controls={controls}
      src={shouldLoad ? src : undefined}
    />
  );
}
