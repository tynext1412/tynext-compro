"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { routes, type RouteKey } from "@/content/company";
import { LOCALE_COOKIE, localePath, locales, switchLocalePath, type Dictionary, type Locale } from "@/i18n";
import { Icon } from "./icon";
import { Wordmark } from "./wordmark";

// Warna section pertama tiap halaman, supaya header transparan langsung memakai warna teks yang benar saat render.
const firstBandTone: Record<RouteKey, "dark" | "light"> = {
  home: "dark",
  about: "dark",
  services: "light",
  projects: "light",
  certifications: "dark",
  contact: "light",
};

const navRoutes = routes.filter((r) => r.key !== "home" && r.key !== "contact");

export function SiteHeader({ lang, nav }: { lang: Locale; nav: Dictionary["nav"] }) {
  const pathname = usePathname();
  const [openOn, setOpenOn] = useState<string | null>(null);
  // Menu otomatis tertutup saat pindah halaman karena state terikat ke pathname.
  const open = openOn === pathname;
  const [scrolled, setScrolled] = useState(false);
  const routeKey = routes.find((r) => localePath(lang, r.href) === pathname)?.key;
  // Di luar daftar route hanya ada halaman 404, yang berlatar limau (terang).
  const tone = routeKey ? firstBandTone[routeKey] : "light";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);


  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenOn(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Di paling atas header transparan; setelah scroll (atau saat menu terbuka) menjadi navy tembus pandang dengan blur.
  const solid = scrolled || open;
  const light = !solid && tone === "light";
  const isActive = (href: string) => pathname === localePath(lang, href);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,color] duration-300 ${
        solid
          ? "bg-navy/90 text-paper backdrop-blur-md"
          : light
            ? "bg-transparent text-ink"
            : "bg-transparent text-paper"
      }`}
    >
      <div className="flex h-24 w-full items-center justify-between gap-gr-md px-gr-md sm:px-gr-lg lg:px-gr-2xl xl:px-gr-3xl">
        <Link href={localePath(lang, "/")} className="shrink-0 rounded-xs" aria-label={nav.homeLink}>
          <Wordmark variant={light ? "navy" : "white"} className="h-10 sm:h-12" />
        </Link>

        <nav aria-label={nav.mainNav} className="hidden md:block">
          <ul className="flex items-center gap-gr-sm">
            {navRoutes.map((route) => (
              <li key={route.key}>
                <Link
                  href={localePath(lang, route.href)}
                  aria-current={isActive(route.href) ? "page" : undefined}
                  // Garis bawah tumbuh dari kiri saat hover/fokus; tetap penuh di halaman yang sedang dibuka.
                  className={`relative px-gr-sm py-gr-sm text-gr-base font-medium transition-colors after:absolute after:inset-x-gr-sm after:bottom-gr-xs after:h-0.5 after:origin-left after:scale-x-0 after:transition-transform after:duration-300 after:ease-out hover:after:scale-x-100 focus-visible:after:scale-x-100 motion-reduce:after:transition-none aria-[current=page]:after:scale-x-100 ${
                    light
                      ? "text-ink after:bg-navy"
                      : "text-mist after:bg-lime hover:text-paper aria-[current=page]:text-paper"
                  }`}
                >
                  {nav.labels[route.key]}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-gr-sm">
          <LanguageSwitch lang={lang} pathname={pathname} label={nav.language} light={light} />
          <Link
            href={localePath(lang, "/kontak")}
            aria-current={isActive("/kontak") ? "page" : undefined}
            className={`hidden min-h-11 items-center rounded-md px-gr-md text-gr-base font-semibold transition-colors md:inline-flex ${
              light ? "bg-navy text-paper hover:bg-ink" : "bg-lime text-ink hover:bg-paper"
            }`}
          >
            {nav.cta}
          </Link>
          <button
            type="button"
            className="-mr-gr-sm grid size-11 place-items-center rounded-xs md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? nav.closeMenu : nav.openMenu}
            onClick={() => setOpenOn(open ? null : pathname)}
          >
            <Icon name={open ? "close" : "menu"} className="size-6" />
          </button>
        </div>
      </div>

      <nav id="mobile-nav" aria-label={nav.mainNav} hidden={!open} className="border-t border-white/10 md:hidden">
        <ul className="px-gr-md py-gr-sm sm:px-gr-lg">
          {routes.map((route) => (
            <li key={route.key}>
              <Link
                href={localePath(lang, route.href)}
                aria-current={isActive(route.href) ? "page" : undefined}
                onClick={() => setOpenOn(null)}
                className="flex min-h-11 items-center justify-between rounded-xs px-gr-sm text-gr-base font-medium text-paper aria-[current=page]:text-lime"
              >
                {nav.labels[route.key]}
                {isActive(route.href) && <span className="font-mono text-gr-xs">{nav.currentPage}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      {/* Gradasi ikon T di logo, mengalir terus dari kiri ke kanan; satu-satunya pemakaian gradasi di situs. */}
      <div aria-hidden="true" className="brand-rule h-0.5" />
    </header>
  );
}

const localeNames: Record<Locale, string> = { id: "Bahasa Indonesia", en: "English" };

// Tombol bahasa bersegmen (ID | EN). Pilihan disimpan di cookie supaya kunjungan berikutnya ke "/" memakai bahasa yang sama.
function LanguageSwitch({
  lang,
  pathname,
  label,
  light,
}: {
  lang: Locale;
  pathname: string;
  label: string;
  light: boolean;
}) {
  return (
    <div
      role="group"
      aria-label={label}
      className={`inline-flex h-11 items-stretch rounded-md border p-1 ${
        light ? "border-ink/15 bg-white/60" : "border-white/25 bg-white/5"
      }`}
    >
      {locales.map((locale) => {
        const active = locale === lang;
        return (
          <Link
            key={locale}
            href={switchLocalePath(pathname, locale)}
            hrefLang={locale}
            lang={locale}
            aria-label={localeNames[locale]}
            aria-current={active ? "true" : undefined}
            onClick={() => {
              document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=31536000; samesite=lax`;
            }}
            className={`grid min-w-10 place-items-center rounded px-gr-sm text-gr-xs font-semibold transition-colors ${
              active
                ? "bg-paper text-ink shadow-sm"
                : light
                  ? "text-ink hover:text-navy"
                  : "text-mist hover:text-paper"
            }`}
          >
            {locale.toUpperCase()}
          </Link>
        );
      })}
    </div>
  );
}
