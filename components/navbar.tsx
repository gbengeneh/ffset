"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { navigation } from "@/lib/site-data";
import { ActionLink } from "@/components/ui";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/6 bg-black/45 backdrop-blur-xl">
      <div className="container-shell flex items-center justify-between gap-4 py-4">
        <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <div className="gold-ring rounded-2xl border border-[var(--border)] bg-black/60 p-2">
            <Image
              src="/logo-crop.jpeg"
              alt="FFSET Lounge logo"
              width={54}
              height={54}
              loading="lazy"
              className="h-12 w-12 rounded-xl object-cover"
            />
          </div>
          <div>
            <p className="display-font text-lg font-semibold tracking-[0.18em] text-[var(--gold-soft)]">
              FFSET
            </p>
            <p className="text-xs uppercase tracking-[0.24em] text-[var(--muted)]">
              Unwind • Play • Drink
            </p>
          </div>
        </Link>

        <button
          type="button"
          className="rounded-full border border-[var(--border)] px-4 py-2 text-sm text-[var(--text)] md:hidden"
          onClick={() => setOpen((current) => !current)}
        >
          Menu
        </button>

        <nav
          className={`${open ? "flex" : "hidden"} glass-panel absolute top-[4.7rem] left-4 right-4 rounded-3xl p-5 md:static md:flex md:bg-transparent md:p-0 md:shadow-none md:backdrop-blur-none`}
        >
          <ul className="flex w-full flex-col gap-2 md:flex-row md:flex-wrap md:items-center md:justify-end md:gap-1">
            {navigation.map((item) => {
              const active = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`block rounded-full px-4 py-2 text-sm transition ${
                      active
                        ? "bg-[rgba(213,170,77,0.16)] text-[var(--gold-soft)]"
                        : "text-[var(--muted)] hover:bg-white/5 hover:text-white"
                    }`}
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
            <li className="pt-2 md:pt-0 md:pl-3">
              <ActionLink
                href="/competitions/register"
                variant="primary"
                className="w-full md:w-auto"
                onClick={() => setOpen(false)}
              >
                Join Competition
              </ActionLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
