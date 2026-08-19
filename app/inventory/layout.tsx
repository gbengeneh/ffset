"use client";

import { useEffect, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { InventoryTopbar } from "@/components/inventory/inventory-topbar";
import { AuthProvider, useAuth } from "@/lib/auth-context";

function InventoryGuard({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const isLoginRoute = pathname === "/inventory/login";

  useEffect(() => {
    if (loading) return;

    if ((!user || user.role !== "inventory") && !isLoginRoute) {
      router.replace("/inventory/login");
      return;
    }

    if (user && user.role === "inventory" && isLoginRoute) {
      router.replace("/inventory");
    }
  }, [user, loading, isLoginRoute, router]);

  if (isLoginRoute) {
    return <>{children}</>;
  }

  if (loading || !user || user.role !== "inventory") {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <p className="text-sm text-[var(--muted)]">Loading…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <InventoryTopbar />
      <main className="space-y-6 px-4 py-6 pb-16 sm:px-6 lg:px-8">{children}</main>
    </div>
  );
}

export default function InventoryLayout({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <InventoryGuard>{children}</InventoryGuard>
    </AuthProvider>
  );
}
