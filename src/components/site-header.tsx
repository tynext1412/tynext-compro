"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { pages } from "@/content/company";
import { Icon } from "./icon";
import { Wordmark } from "./wordmark";

const navPages = pages.filter((p) => p.href !== "/" && p.href !== "/kontak");

export function SiteHeader() {
  const pathname = usePathname();
  const [openOn, setOpenOn] = useState<string | null>(null);
  // Menu otomatis tertutup saat pindah halaman karena state terikat ke pathname.
  const open = openOn === pathname;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenOn(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) => pathname === href;

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-deep text-paper">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="rounded-xs" aria-label="TYNEXT, ke beranda">
          <Wordmark />
        </Link>

        <nav aria-label="Navigasi utama" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {navPages.map((page) => (
              <li key={page.href}>
                <Link
                  href={page.href}
                  aria-current={isActive(page.href) ? "page" : undefined}
                  className="relative px-3 py-2 text-sm font-medium text-mist transition-colors hover:text-paper aria-[current=page]:text-paper aria-[current=page]:after:absolute aria-[current=page]:after:inset-x-3 aria-[current=page]:after:-bottom-4.25 aria-[current=page]:after:h-0.5 aria-[current=page]:after:bg-sun"
                >
                  {page.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <Link
          href="/kontak"
          aria-current={isActive("/kontak") ? "page" : undefined}
          className="hidden rounded-xs bg-sun px-4 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-paper md:inline-block"
        >
          Hubungi Kami
        </Link>

        <button
          type="button"
          className="-mr-2 grid size-11 place-items-center rounded-xs text-paper md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Tutup menu" : "Buka menu"}
          onClick={() => setOpenOn(open ? null : pathname)}
        >
          <Icon name={open ? "close" : "menu"} className="size-6" />
        </button>
      </div>

      <nav id="mobile-nav" aria-label="Navigasi utama" hidden={!open} className="border-t border-white/10 md:hidden">
        <ul className="mx-auto max-w-6xl px-4 py-3">
          {pages.map((page) => (
            <li key={page.href}>
              <Link
                href={page.href}
                aria-current={isActive(page.href) ? "page" : undefined}
                onClick={() => setOpenOn(null)}
                className="flex min-h-11 items-center justify-between rounded-xs px-2 text-base font-medium text-paper aria-[current=page]:text-sun"
              >
                {page.label}
                {isActive(page.href) && <span className="font-mono text-xs">halaman ini</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
