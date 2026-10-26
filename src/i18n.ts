import { en } from "./content/dictionaries/en";
import { id, type Dictionary } from "./content/dictionaries/id";

export const locales = ["id", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "id";
// Cookie yang diisi tombol ID/EN; dibaca proxy saat pengunjung membuka URL tanpa awalan bahasa.
export const LOCALE_COOKIE = "NEXT_LOCALE";

const dictionaries: Record<Locale, Dictionary> = { id, en };

export const hasLocale = (value: string): value is Locale => (locales as readonly string[]).includes(value);

export const getDictionary = (locale: Locale): Dictionary => dictionaries[locale];

// "/layanan#renewable" -> "/en/layanan#renewable"; "/" -> "/en".
export function localePath(locale: Locale, path: string): string {
  return path === "/" ? `/${locale}` : `/${locale}${path}`;
}

// Path yang sama dalam bahasa lain: "/id/proyek" -> "/en/proyek".
export function switchLocalePath(pathname: string, target: Locale): string {
  const [, , ...rest] = pathname.split("/");
  return `/${target}${rest.length ? `/${rest.join("/")}` : ""}`;
}

// Tautan alternatif antarbahasa (hreflang) untuk metadata setiap halaman.
export function alternatesFor(locale: Locale, path: string) {
  return {
    canonical: localePath(locale, path),
    languages: {
      id: localePath("id", path),
      en: localePath("en", path),
      "x-default": localePath(defaultLocale, path),
    },
  };
}

export type { Dictionary };
