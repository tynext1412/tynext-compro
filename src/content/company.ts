// Fakta yang sama di semua bahasa. Teks yang diterjemahkan ada di src/content/dictionaries/.

export const company = {
  name: "TYNEXT",
  legalName: "TYNEXT Energy and Control",
  tagline: "Partnering for Tomorrow's Energy",
  website: "tynext.co.id",
  websiteUrl: "https://tynext.co.id",
  email: "sales@tynext.co.id",
  whatsapp: "+62 857-1371-3288",
  whatsappUrl: "https://wa.me/6285713713288",
  city: "Jakarta, Indonesia",
  office: "Jakarta Selatan, Indonesia",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Jakarta+Selatan",
  // Alamat login TYNEXT Solar. Selama kosong, tombol "Buka TYNEXT Solar" di halaman Cloud Platform tidak ditampilkan.
  platformUrl: "",
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

// Proyek: lini layanan dan status berjalan/selesai; judul dan deskripsi ada di kamus.
export const projectFacts = [
  { id: "microgrid", service: "renewable", ongoing: false },
  { id: "scada", service: "integration", ongoing: false },
  { id: "pv-om", service: "maintenance", ongoing: true },
] as const satisfies readonly { id: string; service: ServiceSlug; ongoing: boolean }[];

export type ProjectId = (typeof projectFacts)[number]["id"];

export const stats = ["12+", "150+", "99%"] as const;
// File Excel sumber katalog Solusi IPC; diubah ke src/content/ipc-products.json oleh `npm run ipc:import`.
export const ipcCatalogFile = "/docs/beckhoff-productfinder.xlsx";

export const certificationCodes = ["ISO 9001:2015", "ISO 45001:2018", "BUJK"] as const;
