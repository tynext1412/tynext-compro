// Fakta yang sama di semua bahasa. Teks yang diterjemahkan ada di src/content/dictionaries/.

export const company = {
  name: "TYNEXT",
  legalName: "TYNEXT Energy and Control",
  tagline: "Partnering for Tomorrow's Energy",
  website: "tynext.co.id",
  websiteUrl: "https://tynext.co.id",
  email: "sales@tynext.co.id",
  // API pengirim email formulir Kontak (POST /api/contact). Bisa diganti saat build, mis. untuk uji lokal:
  // NEXT_PUBLIC_CONTACT_API_URL=http://localhost:8080 npm run build
  contactApiUrl: process.env.NEXT_PUBLIC_CONTACT_API_URL ?? "https://utilities.tynext.co.id",
  whatsapp: "+62 857-1371-3288",
  whatsappUrl: "https://wa.me/6285713713288",
  city: "Jakarta, Indonesia",
  office: "Jakarta Selatan, Indonesia",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Jakarta+Selatan",
  // Alamat TYNEXT Solar. Dipakai tombol "Buka TYNEXT Solar" dan tangkapan layar dashboard di halaman Cloud Platform;
  // bila dikosongkan, keduanya tidak menjadi tautan.
  platformUrl: "https://ems.tynext.co.id",
};

// Urutan navigasi situs. Path sama untuk setiap bahasa, diawali /id atau /en.
export const routes = [
  { key: "home", href: "/" },
  { key: "about", href: "/tentang" },
  { key: "services", href: "/layanan" },
  { key: "ipc", href: "/ipc" },
  { key: "projects", href: "/proyek" },
  { key: "platform", href: "/platform" },
  { key: "contact", href: "/kontak" },
] as const;

export type RouteKey = (typeof routes)[number]["key"];
export type RoutePath = (typeof routes)[number]["href"];

export const serviceSlugs = ["engineering", "integration", "renewable", "maintenance"] as const;
export type ServiceSlug = (typeof serviceSlugs)[number];

// Referensi proyek dan lini layanan terkaitnya (yang pertama menentukan warna); judul, deskripsi, dan teks alt foto
// ada di kamus, foto di public/image (dipetakan di src/content/project-images.ts). Beranda menampilkan tiga yang pertama.
export const projectFacts = [
  { id: "solar-bess-control", services: ["integration"] },
  { id: "ev-charging", services: ["renewable"] },
  { id: "grid-test-rig", services: ["engineering"] },
  { id: "wwt-scada", services: ["integration"] },
  { id: "ikn-solar-scada", services: ["renewable", "integration"] },
] as const satisfies readonly { id: string; services: readonly [ServiceSlug, ...ServiceSlug[]] }[];

export type ProjectId = (typeof projectFacts)[number]["id"];

export const stats = ["12+", "150+", "99%"] as const;
// File Excel sumber katalog Solusi IPC; diubah ke src/content/ipc-products.json oleh `npm run ipc:import`.
export const ipcCatalogFile = "/docs/beckhoff-productfinder.xlsx";

export const certificationCodes = ["ISO 9001:2015", "ISO 45001:2018", "BUJK"] as const;
