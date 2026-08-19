"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookingsIcon,
  CarOrdersIcon,
  CarsIcon,
  CompetitionsIcon,
  DashboardIcon,
  EventsIcon,
  GalleryIcon,
  MessagesIcon,
  OrdersIcon,
  ProductsIcon,
  PurchasesIcon,
  RegistrationsIcon,
  StaffIcon,
  SuppliersIcon,
} from "@/components/admin/icons";

const links = [
  { href: "/admin", label: "Dashboard", icon: DashboardIcon },
  { href: "/admin/products", label: "Products", icon: ProductsIcon },
  { href: "/admin/orders", label: "Orders", icon: OrdersIcon },
  { href: "/admin/purchases", label: "Purchases", icon: PurchasesIcon },
  { href: "/admin/suppliers", label: "Suppliers", icon: SuppliersIcon },
  { href: "/admin/cars", label: "Cars", icon: CarsIcon },
  { href: "/admin/marketplace", label: "Marketplace", icon: ProductsIcon },
  { href: "/admin/marketplace-orders", label: "Store Orders", icon: OrdersIcon },
  { href: "/admin/delivery-zones", label: "Delivery Zones", icon: OrdersIcon },
  { href: "/admin/car-orders", label: "Car Orders", icon: CarOrdersIcon },
  { href: "/admin/events", label: "Events", icon: EventsIcon },
  { href: "/admin/competitions", label: "Competitions", icon: CompetitionsIcon },
  { href: "/admin/competition-registrations", label: "Registrations", icon: RegistrationsIcon },
  { href: "/admin/bookings", label: "Bookings", icon: BookingsIcon },
  { href: "/admin/gallery", label: "Gallery", icon: GalleryIcon },
  { href: "/admin/messages", label: "Messages", icon: MessagesIcon },
  { href: "/admin/staff", label: "Staff", icon: StaffIcon },
];

export const ADMIN_SIDEBAR_WIDTH = "w-64";

type AdminSidebarProps = {
  open: boolean;
  onNavigate?: () => void;
};

function SidebarBrand() {
  return (
    <div className="px-2 pb-6 pt-1">
      <p className="text-[0.68rem] uppercase tracking-[0.3em] text-[var(--muted)]">FFSET Lounge</p>
      <p className="display-font mt-1 text-xl text-white">Admin Console</p>
    </div>
  );
}

function SidebarLinks({ pathname, onNavigate }: { pathname: string; onNavigate?: () => void }) {
  return (
    <nav className="flex flex-col gap-0.5">
      {links.map((link) => {
        const active = link.href === "/admin" ? pathname === "/admin" : pathname.startsWith(link.href);
        const Icon = link.icon;
        return (
          <Link
            key={link.href}
            href={link.href}
            onClick={onNavigate}
            className={`relative flex items-center gap-3 rounded-lg px-3.5 py-2.5 text-sm tracking-[0.01em] transition ${
              active
                ? "bg-white/[0.06] text-[var(--gold-soft)]"
                : "text-[var(--muted)] hover:bg-white/[0.04] hover:text-white"
            }`}
          >
            {active ? (
              <span className="absolute top-1/2 left-0 h-4 w-[3px] -translate-y-1/2 rounded-full bg-[var(--gold)]" />
            ) : null}
            <Icon className="h-[1.05rem] w-[1.05rem] shrink-0" />
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}

export function AdminSidebar({ open, onNavigate }: AdminSidebarProps) {
  const pathname = usePathname();

  return (
    <>
      <aside className="fixed inset-y-0 left-0 z-20 hidden w-64 flex-col border-r border-white/8 bg-[rgba(9,7,8,0.94)] px-4 py-6 backdrop-blur-xl md:flex">
        <SidebarBrand />
        <div className="flex-1 overflow-y-auto">
          <SidebarLinks pathname={pathname} onNavigate={onNavigate} />
        </div>
      </aside>

      <div className={`fixed inset-0 z-40 md:hidden ${open ? "" : "pointer-events-none"}`} aria-hidden={!open}>
        <div
          className={`absolute inset-0 bg-black/65 backdrop-blur-sm transition-opacity duration-200 ${
            open ? "opacity-100" : "opacity-0"
          }`}
          onClick={onNavigate}
        />
        <aside
          className={`absolute left-0 top-0 flex h-full w-72 max-w-[82%] flex-col border-r border-white/10 bg-[rgba(9,7,8,0.98)] px-4 py-6 backdrop-blur-xl transition-transform duration-300 ${
            open ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <SidebarBrand />
          <div className="flex-1 overflow-y-auto">
            <SidebarLinks pathname={pathname} onNavigate={onNavigate} />
          </div>
        </aside>
      </div>
    </>
  );
}
