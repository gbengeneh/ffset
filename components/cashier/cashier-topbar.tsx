"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { HistoryIcon, PosIcon } from "@/components/admin/icons";
import type { CashShift } from "@/lib/admin-types";
import { api } from "@/lib/api-client";
import { useAuth } from "@/lib/auth-context";

const links = [
  { href: "/cashier", label: "POS", icon: PosIcon },
  { href: "/cashier/history", label: "History", icon: HistoryIcon },
];

export function CashierTopbar() {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [checkingLogout, setCheckingLogout] = useState(false);
  const [logoutBlocked, setLogoutBlocked] = useState(false);
  const [logoutError, setLogoutError] = useState<string | null>(null);

  async function handleLogout() {
    if (checkingLogout) return;
    setCheckingLogout(true);
    setLogoutError(null);

    try {
      const currentShift = await api.get<CashShift | null>("/admin/shifts/current");

      if (currentShift?.status === "open") {
        setLogoutBlocked(true);
        return;
      }

      await logout();
      router.replace("/cashier/login");
    } catch {
      setLogoutError("Shift status could not be verified. Please try again.");
      setLogoutBlocked(true);
    } finally {
      setCheckingLogout(false);
    }
  }

  return (
    <header className="sticky top-0 z-30 grid items-center gap-4 border-b border-white/8 bg-[rgba(8,6,7,0.86)] px-4 py-3 backdrop-blur-xl sm:px-6 lg:grid-cols-[1fr_auto_1fr] lg:px-8">
      <div className="flex flex-wrap items-center gap-6">
        <div>
          <p className="text-[0.68rem] uppercase tracking-[0.28em] text-[var(--muted)]">FFSET Lounge</p>
          <p className="display-font text-lg text-white">Cashier POS</p>
        </div>
        <nav className="flex items-center gap-1">
          {links.map((link) => {
            const active = link.href === "/cashier" ? pathname === "/cashier" : pathname?.startsWith(link.href);
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-2 rounded-lg px-3.5 py-2 text-sm transition ${
                  active
                    ? "bg-white/[0.06] text-[var(--gold-soft)]"
                    : "text-[var(--muted)] hover:bg-white/[0.04] hover:text-white"
                }`}
              >
                <Icon className="h-[1.05rem] w-[1.05rem]" />
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <div id="cashier-header-center" className="order-3 flex justify-center lg:order-none" />

      <div className="absolute right-4 top-3 flex items-center gap-3 sm:right-6 lg:static lg:justify-self-end">
        <div className="hidden text-right sm:block">
          <p className="text-sm text-white">{user?.name}</p>
          <p className="text-xs text-[var(--muted)]">{user?.email}</p>
        </div>
        <button
          type="button"
          className="rounded-lg border border-white/10 bg-white/[0.03] px-4 py-2 text-xs text-[var(--muted)] transition hover:border-[rgba(213,170,77,0.34)] hover:text-white"
          onClick={handleLogout}
          disabled={checkingLogout}
        >
          {checkingLogout ? "Checking…" : "Logout"}
        </button>
      </div>

      {logoutBlocked ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="active-shift-logout-title"
        >
          <section className="glass-panel w-full max-w-md rounded-2xl p-6 shadow-2xl sm:p-7">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[rgba(220,145,145,0.22)] bg-[rgba(190,72,92,0.1)] text-xl text-[rgb(220,145,145)]">
              !
            </div>
            <p className="eyebrow mt-5 text-[0.65rem]">Shift protection</p>
            <h2 id="active-shift-logout-title" className="display-font mt-2 text-2xl text-white">
              Close your shift before logging out
            </h2>
            <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
              Your till is still active. Count the cash drawer and complete shift reconciliation before ending your session.
            </p>

            {logoutError ? (
              <p className="mt-4 rounded-lg border border-[rgba(220,145,145,0.18)] bg-[rgba(190,72,92,0.08)] px-3 py-2 text-xs text-[rgb(220,145,145)]">
                {logoutError}
              </p>
            ) : null}

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                type="button"
                className="rounded-lg border border-white/10 px-4 py-3 text-sm font-semibold text-[var(--muted)] transition hover:bg-white/[0.04] hover:text-white"
                onClick={() => {
                  setLogoutBlocked(false);
                  setLogoutError(null);
                }}
              >
                Stay Signed In
              </button>
              <button
                type="button"
                className="rounded-lg bg-[linear-gradient(135deg,var(--gold-soft),var(--gold))] px-4 py-3 text-sm font-bold text-[#170f05]"
                onClick={() => {
                  setLogoutBlocked(false);
                  setLogoutError(null);
                  if (pathname === "/cashier") {
                    window.dispatchEvent(new Event("ffset:open-close-shift"));
                  } else {
                    window.sessionStorage.setItem("ffset_open_close_shift", "1");
                    router.push("/cashier");
                  }
                }}
              >
                Go to Close Shift
              </button>
            </div>
          </section>
        </div>
      ) : null}
    </header>
  );
}
