"use client";

import { useAuth } from "@/lib/auth-context";

type AdminTopbarProps = {
  onToggleSidebar: () => void;
};

export function AdminTopbar({ onToggleSidebar }: AdminTopbarProps) {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between gap-4 border-b border-white/8 bg-[rgba(8,6,7,0.86)] px-4 py-4 backdrop-blur-xl sm:px-6 lg:px-8">
      <button
        type="button"
        aria-label="Toggle navigation"
        className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-[var(--text)] transition hover:border-[rgba(213,170,77,0.34)] hover:bg-white/5 md:hidden"
        onClick={onToggleSidebar}
      >
        <span className="relative block h-4 w-5">
          <span className="absolute left-0 top-0 h-[1.5px] w-5 rounded-full bg-current" />
          <span className="absolute left-0 top-[7px] h-[1.5px] w-5 rounded-full bg-current" />
          <span className="absolute left-0 top-[14px] h-[1.5px] w-5 rounded-full bg-current" />
        </span>
      </button>

      <div className="hidden md:block" />

      <div className="flex items-center gap-3">
        <div className="hidden text-right sm:block">
          <p className="text-sm text-white">{user?.name}</p>
          <p className="text-xs text-[var(--muted)]">{user?.email}</p>
        </div>
        <button
          type="button"
          className="rounded-lg border border-white/10 bg-white/[0.03] px-4 py-2 text-xs text-[var(--muted)] transition hover:border-[rgba(213,170,77,0.34)] hover:text-white"
          onClick={() => logout()}
        >
          Logout
        </button>
      </div>
    </header>
  );
}
