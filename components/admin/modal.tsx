"use client";

import { useEffect, type ReactNode } from "react";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
};

export function Modal({ open, onClose, title, children }: ModalProps) {
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="glass-panel relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl p-6">
        <div className="mb-5 flex items-center justify-between gap-4">
          <h2 className="display-font text-xl text-white">{title}</h2>
          <button
            type="button"
            aria-label="Close"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border)] text-lg text-[var(--muted)] transition hover:border-[rgba(213,170,77,0.34)] hover:text-white"
            onClick={onClose}
          >
            ×
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
