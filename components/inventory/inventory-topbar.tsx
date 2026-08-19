"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ProductsIcon, PurchasesIcon, SuppliersIcon } from "@/components/admin/icons";
import { useAuth } from "@/lib/auth-context";

const links = [
  { href: "/inventory", label: "Products", icon: ProductsIcon },
  { href: "/inventory/purchases", label: "Purchases", icon: PurchasesIcon },
  { href: "/inventory/suppliers", label: "Suppliers", icon: SuppliersIcon },
];

export function InventoryTopbar() {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await logout();
    router.replace("/inventory/login");
  }

  return (
    <header className="sticky top-0 z-30 grid items-center gap-4 border-b border-white/8 bg-[rgba(8,6,7,0.86)] px-4 py-3 backdrop-blur-xl sm:px-6 lg:grid-cols-[1fr_auto_1fr] lg:px-8">
      <div className="flex flex-wrap items-center gap-6">
        <div>
          <p className="text-[0.68rem] uppercase tracking-[0.28em] text-[var(--muted)]">FFSET Lounge</p>
          <p className="display-font text-lg text-white">Inventory Console</p>
        </div>
        <nav className="flex items-center gap-1">
          {links.map((link) => {
            const active = link.href === "/inventory" ? pathname === "/inventory" : pathname?.startsWith(link.href);
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

      <div className="absolute right-4 top-3 flex items-center gap-3 sm:right-6 lg:static lg:justify-self-end">
        <div className="hidden text-right sm:block">
          <p className="text-sm text-white">{user?.name}</p>
          <p className="text-xs text-[var(--muted)]">{user?.email}</p>
        </div>
        <button
          type="button"
          className="rounded-lg border border-white/10 bg-white/[0.03] px-4 py-2 text-xs text-[var(--muted)] transition hover:border-[rgba(213,170,77,0.34)] hover:text-white"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </header>
  );
}
