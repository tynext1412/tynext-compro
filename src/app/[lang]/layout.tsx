import type { Metadata } from "next";
import { Archivo, IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import { notFound } from "next/navigation";
import { RevealObserver, ScrollToTopOnNavigate } from "@/components/motion";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { EnergyField } from "@/components/three/energy-field";
import { alternatesFor, getDictionary, hasLocale, locales } from "@/i18n";
import "../globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  axes: ["wdth"],
});

const plex = IBM_Plex_Sans({
  variable: "--font-plex",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

// Hanya /id dan /en yang dibangun; bahasa lain ditolak hasLocale() di bawah dan menjadi 404.
export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = getDictionary(lang);
  return {
    metadataBase: new URL("https://www.tynext.com"),
    title: {
      template: "%s | TYNEXT Energy and Control",
      default: dict.meta.defaultTitle,
    },
    description: dict.meta.description,
    openGraph: {
      siteName: "TYNEXT Energy and Control",
      locale: dict.meta.ogLocale,
      type: "website",
    },
    alternates: alternatesFor(lang, "/"),
  };
}

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);

  return (
    <html
      lang={lang}
      // Next 16: matikan smooth scroll sementara saat pindah halaman, supaya lompatan ke atas instan.
      data-scroll-behavior="smooth"
      className={`${archivo.variable} ${plex.variable} ${plexMono.variable} antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* Menandai bahwa JavaScript aktif, supaya animasi reveal tidak menyembunyikan konten tanpa JS. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body className="flex min-h-svh flex-col font-sans">
        <a
          href="#konten"
          className="sr-only z-60 bg-lime px-gr-md py-gr-sm font-semibold text-ink focus:not-sr-only focus:fixed focus:top-2 focus:left-2"
        >
          {dict.nav.skipToContent}
        </a>
        <EnergyField />
        <SiteHeader lang={lang} nav={dict.nav} />
        <main id="konten" className="flex-1">
          {children}
        </main>
        <SiteFooter lang={lang} nav={dict.nav} />
        <RevealObserver />
        <ScrollToTopOnNavigate />
      </body>
    </html>
  );
}
