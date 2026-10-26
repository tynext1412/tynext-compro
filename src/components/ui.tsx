import Link from "next/link";
import type { ServiceSlug } from "@/content/company";
import { localePath, type Dictionary, type Locale } from "@/i18n";
import { Band, revealDelay } from "./band";

export const buttonSun =
  "inline-flex min-h-12 items-center justify-center rounded-xs bg-lime px-gr-lg font-semibold text-ink transition-colors hover:bg-paper";
export const buttonDeep =
  "inline-flex min-h-12 items-center justify-center rounded-xs bg-navy px-gr-lg font-semibold text-paper transition-colors hover:bg-ink";
export const textLink =
  "font-semibold text-ink underline decoration-teal decoration-2 underline-offset-[6px] transition-colors hover:text-blue";
export const textLinkLight =
  "font-semibold text-paper underline decoration-lime decoration-2 underline-offset-[6px] transition-colors hover:text-lime";

// Setiap lini layanan punya warna tetap, dipakai ulang di beranda, layanan, dan proyek.
export const serviceTone: Record<ServiceSlug, { tile: string; muted: string; chip: string }> = {
  engineering: { tile: "bg-paper-2 text-ink", muted: "text-ink-2", chip: "bg-paper-2 text-ink" },
  integration: { tile: "bg-navy text-paper", muted: "text-mist", chip: "bg-aqua text-ink" },
  renewable: { tile: "bg-lime text-ink", muted: "text-ink", chip: "bg-lime text-ink" },
  maintenance: { tile: "bg-teal text-ink", muted: "text-ink", chip: "bg-teal text-ink" },
};

export function SectionTitle({ eyebrow, title, light = false }: { eyebrow: string; title: string; light?: boolean }) {
  return (
    <div>
      <p className={`font-mono text-gr-xs font-medium ${light ? "text-lime" : "text-blue"}`}>{eyebrow}</p>
      <h2
        className={`display mt-gr-sm text-gr-2xl leading-gr-snug sm:text-gr-4xl ${light ? "text-paper" : "text-ink"}`}
      >
        {title}
      </h2>
    </div>
  );
}

// Penutup halaman berwarna matahari, supaya ajakan kontak jadi titik fokus terakhir.
export function CtaBand({ lang, cta }: { lang: Locale; cta: Dictionary["cta"] }) {
  return (
    <Band tone="lime">
      <div className="mx-auto flex max-w-6xl flex-col gap-gr-lg px-gr-md py-gr-3xl sm:px-gr-lg md:flex-row md:items-end md:justify-between lg:px-gr-xl">
        <div data-reveal className="max-w-2xl">
          <h2 className="display text-gr-2xl leading-gr-snug sm:text-gr-4xl">{cta.title}</h2>
          <p className="mt-gr-md text-gr-lg leading-golden">{cta.body}</p>
        </div>
        <Link
          data-reveal
          style={revealDelay(150)}
          href={localePath(lang, "/kontak")}
          className={`${buttonDeep} shrink-0`}
        >
          {cta.button}
        </Link>
      </div>
    </Band>
  );
}
