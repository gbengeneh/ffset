"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CompetitionRegisterForm } from "@/components/forms/competition-register-form";
import { formatNaira, type Competition } from "@/lib/admin-types";
import { bankTransferDetails } from "@/lib/site-data";

type RegisterModalContextValue = {
  open: () => void;
  close: () => void;
  competition: Competition | null;
};

const RegisterModalContext = createContext<RegisterModalContextValue | null>(null);

export function useRegisterModal() {
  const context = useContext(RegisterModalContext);

  if (!context) {
    throw new Error("useRegisterModal must be used within RegisterModalProvider");
  }

  return context;
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

export function RegisterModalProvider({
  children,
  competition = null,
}: {
  children: ReactNode;
  competition?: Competition | null;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const value = useMemo(() => ({ open, close, competition }), [open, close, competition]);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };

    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, close]);

  return (
    <RegisterModalContext.Provider value={value}>
      {children}
      <AnimatePresence>
        {isOpen ? (
          <motion.div
            className="fixed inset-0 z-100 flex items-start justify-center overflow-y-auto px-4 py-6 sm:items-center sm:py-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
          >
            <motion.div
              className="fixed inset-0 bg-black/78 backdrop-blur-sm"
              onClick={close}
              aria-hidden="true"
            />

            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Competition registration"
              className="glass-panel relative w-full max-w-lg rounded-[1.6rem] p-5 sm:p-6"
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.98 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            >
              <button
                type="button"
                onClick={close}
                aria-label="Close registration form"
                className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[var(--muted)] transition hover:border-white/20 hover:text-white"
              >
                <CloseIcon />
              </button>

              <p className="eyebrow text-[0.6rem]">Compete at FFSET</p>
              <h2 className="display-font mt-2 pr-8 text-[1.3rem] leading-[1.12] text-white sm:text-[1.5rem]">
                {competition ? `Register for the ${competition.title}` : "Registration"}
              </h2>

              {competition ? (
                <>
                  <p className="mt-2 text-[0.78rem] leading-5 text-[var(--muted)]">
                    Entry is {formatNaira(competition.entry_fee)}, paid to{" "}
                    <span className="text-white">{bankTransferDetails.bankName}</span>,{" "}
                    <span className="text-white">{bankTransferDetails.accountNumber}</span> (
                    {bankTransferDetails.accountName}). Submit your details below once you&apos;ve
                    paid.
                  </p>

                  <div className="mt-4 max-h-[65vh] overflow-y-auto pr-1">
                    <CompetitionRegisterForm competitionId={competition.id} />
                  </div>
                </>
              ) : (
                <p className="mt-2 text-[0.78rem] leading-5 text-[var(--muted)]">
                  No competitions are open for registration right now — check back soon.
                </p>
              )}
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </RegisterModalContext.Provider>
  );
}
