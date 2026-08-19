"use client";

import { useEffect, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { CashierTopbar } from "@/components/cashier/cashier-topbar";
import { AuthProvider, useAuth } from "@/lib/auth-context";

function CashierGuard({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const isLoginRoute = pathname === "/cashier/login";

  useEffect(() => {
    if (loading) return;

    if ((!user || user.role !== "cashier") && !isLoginRoute) {
      router.replace("/cashier/login");
      return;
    }

    if (user && user.role === "cashier" && isLoginRoute) {
      router.replace("/cashier");
    }
  }, [user, loading, isLoginRoute, router]);

  if (isLoginRoute) {
    return <>{children}</>;
  }

  if (loading || !user || user.role !== "cashier") {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <p className="text-sm text-[var(--muted)]">Loading…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <CashierTopbar />
      <main className="space-y-6 px-4 py-6 pb-16 sm:px-6 lg:px-8">{children}</main>
    </div>
  );
}

export default function CashierLayout({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <CashierGuard>{children}</CashierGuard>
    </AuthProvider>
  );
}
