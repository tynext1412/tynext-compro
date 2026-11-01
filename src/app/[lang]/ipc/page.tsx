import { existsSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Band } from "@/components/band";
import { Icon } from "@/components/icon";
import { IpcFinder } from "@/components/ipc-finder";
import { PageHeader } from "@/components/page-header";
import { CtaBand, buttonDeep } from "@/components/ui";
import { ipcCatalogFile } from "@/content/company";
import { ipcCatalog } from "@/content/ipc-products";
import { alternatesFor, getDictionary, hasLocale, type Locale } from "@/i18n";

// Tombol "Unduh Katalog PDF" mengunduh PDF pertama di public/docs, jadi katalog cukup diganti dengan menaruh file baru
// di sana (lalu build ulang). Dibaca saat build; tanpa PDF, tombolnya tidak tampil.
function findCatalogPdf(lang: Locale) {
  const dir = join(process.cwd(), "public", "docs");
  const file = existsSync(dir) ? readdirSync(dir).find((name) => name.toLowerCase().endsWith(".pdf")) : undefined;
  if (!file) return null;
  const megabytes = statSync(join(dir, file)).size / 1024 / 1024;
  return {
    href: `/docs/${encodeURIComponent(file)}`,
    size: `${megabytes.toLocaleString(lang === "id" ? "id-ID" : "en-US", { maximumFractionDigits: 1 })} MB`,
  };
}

export async function generateMetadata({ params }: PageProps<"/[lang]/ipc">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const { ipcPage } = getDictionary(lang);
  return {
    title: ipcPage.metaTitle,
    description: ipcPage.metaDescription,
    alternates: alternatesFor(lang, "/ipc"),
  };
}

export default async function IpcPage({ params }: PageProps<"/[lang]/ipc">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);
  const { ipcPage } = dict;
  const catalogPdf = findCatalogPdf(lang);

  return (
    <>
      <PageHeader tone="navy" title={ipcPage.title} intro={ipcPage.intro} />

      <Band tone="paper">
        <div className="mx-auto max-w-7xl px-gr-md py-gr-2xl sm:px-gr-lg lg:px-gr-xl">
          <div className="flex flex-wrap items-end justify-between gap-gr-md">
            <h2 data-reveal className="display text-gr-2xl">
              {ipcPage.finderTitle}
            </h2>
            {catalogPdf && (
              <a
                data-reveal
                href={catalogPdf.href}
                download
                className={`${buttonDeep} w-full gap-gr-sm whitespace-nowrap sm:w-auto`}
              >
                <Icon name="download" className="size-5 shrink-0" />
                {ipcPage.downloadPdf}
                <span className="hidden font-mono text-gr-xs font-normal text-mist min-[400px]:inline">
                  PDF · {catalogPdf.size}
                </span>
              </a>
            )}
          </div>
          <div className="mt-gr-lg">
            <IpcFinder catalog={ipcCatalog} t={ipcPage} downloadHref={ipcCatalogFile} />
          </div>
          <p className="mt-gr-sm font-mono text-gr-xs text-ink-2">{ipcPage.source}</p>
        </div>
      </Band>

      <CtaBand lang={lang} cta={dict.cta} />
    </>
  );
}
