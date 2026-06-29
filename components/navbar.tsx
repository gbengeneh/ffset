"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useEffectEvent, useState } from "react";
import {
  experienceNavigation,
  mobilePrimaryNavigation,
  navigation,
} from "@/lib/site-data";
import { ActionLink } from "@/components/ui";

function ArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4.5 10h10" />
      <path d="m10.5 5 5 5-5 5" />
    </svg>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className={`h-4 w-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m5 7.5 5 5 5-5" />
    </svg>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [experienceOpen, setExperienceOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const experienceActive = experienceNavigation.some((item) => pathname === item.href);

  const syncScrollState = useEffectEvent(() => {
    setScrolled(window.scrollY > 18);
  });

  useEffect(() => {
    const onScroll = () => {
      syncScrollState();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-all duration-300 ${
        scrolled
          ? "border-white/10 bg-[rgba(7,5,6,0.86)] shadow-[0_18px_40px_rgba(0,0,0,0.28)] backdrop-blur-2xl"
          : "border-white/6 bg-[rgba(7,5,6,0.58)] backdrop-blur-xl"
      }`}
    >
      <div
        className={`relative mx-auto flex w-full max-w-[1320px] items-center justify-between gap-5 px-5 transition-all duration-300 sm:px-6 lg:px-8 xl:px-10 ${
          scrolled ? "py-3" : "py-4 md:py-[1.125rem]"
        }`}
      >
        <Link href="/" className="flex items-center gap-4 pr-4" onClick={() => setOpen(false)}>
          <div className="gold-ring rounded-[1.45rem] border border-[var(--border)] bg-black/60 p-2.5">
            <Image
              src="/logo-crop.jpeg"
              alt="FFSET Lounge logo"
              width={64}
              height={64}
              loading="lazy"
              className="h-[3.25rem] w-[3.25rem] rounded-[1rem] object-cover md:h-14 md:w-14"
            />
          </div>
          <div className="space-y-1">
            <p className="display-font text-xl font-semibold tracking-[0.2em] text-[var(--gold-soft)] md:text-[1.35rem]">
              FFSET
            </p>
            <p className="text-[0.67rem] uppercase tracking-[0.3em] text-[var(--muted)] md:text-[0.7rem]">
              Unwind • Play • Drink
            </p>
          </div>
        </Link>

        <button
          type="button"
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border)] bg-black/25 text-[var(--text)] backdrop-blur-sm transition hover:border-[rgba(213,170,77,0.34)] hover:bg-white/5 md:hidden"
          onClick={() => setOpen((current) => !current)}
        >
          <span className="relative block h-4 w-5">
            <span
              className={`absolute left-0 h-[1.5px] w-5 rounded-full bg-current transition-all duration-200 ${
                open ? "top-[7px] rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute top-[7px] left-0 h-[1.5px] w-5 rounded-full bg-current transition-all duration-200 ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 h-[1.5px] w-5 rounded-full bg-current transition-all duration-200 ${
                open ? "top-[7px] -rotate-45" : "top-[14px]"
              }`}
            />
          </span>
        </button>

        <nav
          className={`${
            open ? "flex" : "hidden"
          } glass-panel absolute top-full left-0 right-0 mt-3 rounded-[1.8rem] p-5 md:static md:flex md:w-auto md:flex-1 md:justify-end md:overflow-visible md:bg-transparent md:p-0 md:shadow-none md:backdrop-blur-none`}
        >
          <ul className="flex w-full flex-col gap-2 md:w-auto md:flex-row md:flex-nowrap md:items-center md:justify-end md:gap-1">
            {navigation.map((item) => {
              const active = pathname === item.href;
              return (
                <li key={item.href} className="hidden md:block">
                  <Link
                    href={item.href}
                    className={`block rounded-full px-4 py-2.5 text-sm tracking-[0.03em] transition ${
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

            <li className="hidden md:block">
              <div className="group relative">
                <button
                  type="button"
                  className={`flex items-center gap-2 rounded-full px-4 py-2.5 text-sm tracking-[0.03em] transition ${
                    experienceActive
                      ? "bg-[rgba(213,170,77,0.16)] text-[var(--gold-soft)]"
                      : "text-[var(--muted)] hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <span>Experience</span>
                  <ChevronIcon open={false} />
                </button>

                <div className="pointer-events-none absolute inset-x-0 top-full h-4 group-hover:pointer-events-auto" />

                <div className="pointer-events-none absolute left-1/2 top-full z-20 w-56 -translate-x-1/2 pt-3 opacity-0 transition duration-200 group-hover:pointer-events-auto group-hover:opacity-100">
                  <div className="glass-panel rounded-[1.5rem] p-3 shadow-[0_24px_65px_rgba(0,0,0,0.32)]">
                    {experienceNavigation.map((item) => {
                      const active = pathname === item.href;
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          className={`block rounded-[1rem] px-4 py-3 text-sm transition ${
                            active
                              ? "bg-[rgba(213,170,77,0.14)] text-[var(--gold-soft)]"
                              : "text-[var(--muted)] hover:bg-white/5 hover:text-white"
                          }`}
                        >
                          {item.label}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            </li>

            <li className="md:hidden">
              <button
                type="button"
                className={`flex w-full items-center justify-between rounded-[1rem] px-4 py-3 text-sm tracking-[0.03em] transition ${
                  experienceActive || experienceOpen
                    ? "bg-[rgba(213,170,77,0.14)] text-[var(--gold-soft)]"
                    : "text-[var(--muted)] hover:bg-white/5 hover:text-white"
                }`}
                onClick={() => setExperienceOpen((current) => !current)}
              >
                <span>Experience</span>
                <ChevronIcon open={experienceOpen} />
              </button>

              {experienceOpen ? (
                <div className="mt-2 space-y-1 rounded-[1.2rem] border border-white/8 bg-black/15 p-2">
                  {experienceNavigation.map((item) => {
                    const active = pathname === item.href;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`block rounded-[0.95rem] px-4 py-3 text-sm transition ${
                          active
                            ? "bg-[rgba(213,170,77,0.14)] text-[var(--gold-soft)]"
                            : "text-[var(--muted)] hover:bg-white/5 hover:text-white"
                        }`}
                        onClick={() => setOpen(false)}
                      >
                        {item.label}
                      </Link>
                    );
                  })}
                </div>
              ) : null}
            </li>

            {mobilePrimaryNavigation.map((item) => {
              const active = pathname === item.href;
              return (
                <li key={`mobile-${item.href}`} className="md:hidden">
                  <Link
                    href={item.href}
                    className={`block rounded-full px-4 py-2.5 text-sm tracking-[0.03em] transition ${
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
                className="group w-full px-5 py-3 text-sm md:w-auto"
                onClick={() => setOpen(false)}
              >
                <span>Join Competition</span>
                <ArrowIcon />
              </ActionLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
