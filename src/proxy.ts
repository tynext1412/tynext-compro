import { NextResponse, type NextRequest } from "next/server";
import { LOCALE_COOKIE, defaultLocale, hasLocale, locales, type Locale } from "./i18n";

// Pilihan terakhir pengunjung (cookie dari tombol ID/EN), lalu bahasa browser, lalu bahasa bawaan.
function preferredLocale(request: NextRequest): Locale {
  const saved = request.cookies.get(LOCALE_COOKIE)?.value;
  if (saved && hasLocale(saved)) return saved;
  const accepted = (request.headers.get("accept-language") ?? "")
    .split(",")
    .map((part) => part.split(";")[0].trim().toLowerCase().split("-")[0]);
  return accepted.find(hasLocale) ?? defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasPrefix = locales.some((locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`));
  if (hasPrefix) return;

  // URL tanpa awalan bahasa (mis. /tentang) diarahkan ke /id/tentang atau /en/tentang.
  request.nextUrl.pathname = `/${preferredLocale(request)}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  // Lewati aset internal Next.js dan file statis (icon.png, gambar, dll.).
  matcher: ["/((?!_next|.*\\..*).*)"],
};
