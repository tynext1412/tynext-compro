import Link from "next/link";
import type { ReactNode } from "react";
import { contact, type ServiceSlug } from "@/content/company";
import { Band, revealDelay } from "./band";

export const buttonSun =
  "inline-flex min-h-12 items-center justify-center rounded-xs bg-sun px-6 font-semibold text-ink transition-colors hover:bg-paper";
export const buttonDeep =
  "inline-flex min-h-12 items-center justify-center rounded-xs bg-deep px-6 font-semibold text-paper transition-colors hover:bg-ink";
export const textLink =
  "font-semibold text-ink underline decoration-arc decoration-2 underline-offset-[6px] transition-colors hover:text-arc-ink";
export const textLinkLight =
  "font-semibold text-paper underline decoration-sun decoration-2 underline-offset-[6px] transition-colors hover:text-sun";

// Setiap lini layanan punya warna tetap, dipakai ulang di beranda, layanan, dan proyek.
export const serviceTone: Record<ServiceSlug, { tile: string; muted: string; chip: string }> = {
  engineering: { tile: "bg-paper-2 text-ink", muted: "text-ink-2", chip: "bg-paper-2 text-ink" },
  integration: { tile: "bg-deep text-paper", muted: "text-mist", chip: "bg-mint text-ink" },
  renewable: { tile: "bg-sun text-ink", muted: "text-ink", chip: "bg-sun text-ink" },
  maintenance: { tile: "bg-arc text-ink", muted: "text-ink", chip: "bg-arc text-ink" },
};

export function SectionTitle({ eyebrow, title, light = false }: { eyebrow: string; title: string; light?: boolean }) {
  return (
    <div>
      <p className={`font-mono text-xs font-medium ${light ? "text-sun" : "text-arc-ink"}`}>{eyebrow}</p>
      <h2 className={`display mt-3 text-3xl leading-tight sm:text-5xl ${light ? "text-paper" : "text-ink"}`}>{title}</h2>
    </div>
  );
}

// Penutup halaman berwarna matahari, supaya ajakan kontak jadi titik fokus terakhir.
export function CtaBand({ children }: { children?: ReactNode }) {
  return (
    <Band tone="sun">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-24 sm:px-6 md:flex-row md:items-end md:justify-between lg:px-8">
        <div data-reveal className="max-w-2xl">
          <h2 className="display text-4xl leading-tight sm:text-5xl">{contact.title}</h2>
          <p className="mt-4 text-lg leading-relaxed">{children ?? contact.body}</p>
        </div>
        <Link data-reveal style={revealDelay(150)} href="/kontak" className={`${buttonDeep} shrink-0`}>
          Hubungi Tim Kami
        </Link>
      </div>
    </Band>
  );
}
