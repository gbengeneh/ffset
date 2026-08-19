"use client";

import { useEffect, useState, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { AdminTopbar } from "@/components/admin/admin-topbar";
import { AuthProvider, useAuth } from "@/lib/auth-context";

function AdminGuard({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isLoginRoute = pathname === "/admin/login";

  useEffect(() => {
    if (loading) return;

    if ((!user || user.role !== "admin") && !isLoginRoute) {
      router.replace("/admin/login");
      return;
    }

    if (user && user.role === "admin" && isLoginRoute) {
      router.replace("/admin");
    }
  }, [user, loading, isLoginRoute, router]);

  if (isLoginRoute) {
    return <>{children}</>;
  }

  if (loading || !user || user.role !== "admin") {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <p className="text-sm text-[var(--muted)]">Loading…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <AdminSidebar open={sidebarOpen} onNavigate={() => setSidebarOpen(false)} />
      <div className="md:pl-64">
        <AdminTopbar onToggleSidebar={() => setSidebarOpen((current) => !current)} />
        <main className="min-w-0 space-y-6 px-4 py-6 pb-16 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <AdminGuard>{children}</AdminGuard>
    </AuthProvider>
  );
}
