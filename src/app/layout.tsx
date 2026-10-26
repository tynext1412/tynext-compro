import type { Metadata } from "next";
import { Archivo, IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import { RevealObserver } from "@/components/motion";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { EnergyField } from "@/components/three/energy-field";
import "./globals.css";

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

export const metadata: Metadata = {
  metadataBase: new URL("https://www.tynext.com"),
  title: {
    template: "%s | TYNEXT Energy and Control",
    default: "TYNEXT Energy and Control | Integrated Power & Control Systems",
  },
  description:
    "Solusi otomatisasi industri, sistem kontrol daya terintegrasi, SCADA, PLTS, dan BESS untuk sektor industri dan infrastruktur di Indonesia.",
  openGraph: {
    siteName: "TYNEXT Energy and Control",
    locale: "id_ID",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="id"
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
          className="sr-only z-60 bg-sun px-4 py-2 font-semibold text-ink focus:not-sr-only focus:fixed focus:top-2 focus:left-2"
        >
          Lewati ke konten
        </a>
        <EnergyField />
        <SiteHeader />
        <main id="konten" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <RevealObserver />
      </body>
    </html>
  );
}
