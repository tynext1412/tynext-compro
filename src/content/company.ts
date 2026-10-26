// Semua teks company profile ada di sini, supaya pembaruan konten tidak perlu menyentuh komponen.

export const company = {
  name: "TYNEXT",
  legalName: "TYNEXT Energy and Control",
  tagline: "Partnering for Tomorrow's Energy",
  website: "www.tynext.com",
  websiteUrl: "https://www.tynext.com",
  email: "info@tynext.com",
  phone: "+62 21-798-2316",
  phoneHref: "tel:+62217982316",
  city: "Jakarta, Indonesia",
  office: "Jakarta Selatan, Indonesia",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Jakarta+Selatan",
};

// Urutan navigasi situs.
export const pages = [
  { href: "/", label: "Beranda" },
  { href: "/tentang", label: "Tentang" },
  { href: "/layanan", label: "Layanan" },
  { href: "/proyek", label: "Proyek" },
  { href: "/sertifikasi", label: "K3 & Mutu" },
  { href: "/kontak", label: "Kontak" },
] as const;

export const hero = {
  eyebrow: "Pioneering Smart Energy & Automation",
  title: "Integrated Power & Control Systems",
  description:
    "Penyedia solusi terdepan untuk otomatisasi industri, sistem kontrol daya terintegrasi, dan teknologi energi terbarukan di Indonesia.",
};

export const about = {
  lead: "TYNEXT Energy and Control adalah tim profesional, insinyur, dan teknisi ahli yang berdedikasi menghadirkan sistem otomasi & energi modern.",
  body: "Kami mengintegrasikan teknologi SCADA, Industrial IoT, PLTS, serta manajemen daya pintar untuk membantu sektor industri dan infrastruktur mencapai efisiensi operasional tertinggi dan keberlanjutan energi.",
  stats: [
    { value: "12+", label: "Tahun Pengalaman" },
    { value: "150+", label: "Proyek Selesai" },
    { value: "99%", label: "Kepuasan Klien" },
  ],
};

export const vision = {
  title: "Menjadi Mitra Terdepan dalam Otomasi Industri & Solusi Energi Bersih",
  body: "Mensinergikan teknologi generasi terbaru ke dalam industri nasional untuk meningkatkan produktivitas dan keberlanjutan lingkungan.",
};

export const missions = [
  {
    title: "Inovasi Berkelanjutan",
    body: "Mengembangkan rekayasa teknik presisi tinggi di bidang listrik dan instrumen kontrol.",
  },
  {
    title: "Kualitas Standar Dunia",
    body: "Menyediakan layanan EPC (Engineering, Procurement, Construction) tanpa kompromi safety.",
  },
  {
    title: "Kemitraan Jangka Panjang",
    body: "Mengutamakan kepuasan pelanggan melalui layanan Operation & Maintenance yang andal.",
  },
];

export type ServiceSlug = "engineering" | "integration" | "renewable" | "maintenance";

export const services: {
  slug: ServiceSlug;
  code: string;
  title: string;
  body: string;
  scope: string[];
  // Peran layanan dalam peta sistem di beranda.
  role: string;
}[] = [
  {
    slug: "engineering",
    code: "01 / Engineering",
    title: "Engineering & Design",
    body: "Studi kelayakan kelistrikan, studi interkoneksi, DED, dan perancangan sistem kontrol sesuai standar SNI/IEC.",
    scope: [
      "Studi kelayakan kelistrikan",
      "Studi interkoneksi",
      "Detail Engineering Design (DED)",
      "Perancangan sistem kontrol sesuai SNI/IEC",
    ],
    role: "Studi dan desain mencakup seluruh sistem, dari pembangkit sampai beban.",
  },
  {
    slug: "integration",
    code: "02 / Integration",
    title: "System Integration",
    body: "Integrasi SCADA, migrasi PLC, instalasi RTU, telemetry, serta otomatisasi jaringan distribusi 20 kV.",
    scope: [
      "Integrasi SCADA",
      "Migrasi PLC",
      "Instalasi RTU & telemetry",
      "Otomatisasi jaringan distribusi 20 kV",
    ],
    role: "Gardu, SCADA, dan RTU mengendalikan jaringan distribusi 20 kV.",
  },
  {
    slug: "renewable",
    code: "03 / Renewables",
    title: "Renewable Energy EPC",
    body: "Konstruksi PLTS Atap (Rooftop PV), PLTS Terapung, Hybrid Microgrid, dan penyediaan BESS (Energy Storage).",
    scope: [
      "PLTS Atap (Rooftop PV)",
      "PLTS Terapung (Floating PV)",
      "Hybrid Microgrid",
      "Battery Energy Storage System (BESS)",
    ],
    role: "PLTS menghasilkan energi, BESS menyimpannya untuk dipakai kapan saja.",
  },
  {
    slug: "maintenance",
    code: "04 / Services",
    title: "Operation & Maintenance",
    body: "Pengujian & komisioning, audit energi, perawatan preventif, serta pemantauan kinerja aset secara jarak jauh.",
    scope: [
      "Pengujian & komisioning",
      "Audit energi",
      "Perawatan preventif",
      "Pemantauan kinerja aset jarak jauh",
    ],
    role: "Inspeksi, perawatan, dan pemantauan kinerja setiap aset di lapangan.",
  },
];

export const pillars = [
  {
    code: "Pillar 01",
    title: "Next-Gen Control Systems",
    body: "Fokus pada sistem kontrol modern dan pemantauan real-time untuk efisiensi fasilitas industri.",
    items: [
      "Industrial Internet of Things (IIoT)",
      "SCADA & Substation Automation",
      "Migrasi PLC & System Refurbishment",
      "Plant Asset Management & Telemetry",
    ],
  },
  {
    code: "Pillar 02",
    title: "New Energy Solutions",
    body: "Mendorong transisi energi bersih melalui infrastruktur tenaga surya dan sistem penyimpanan daya.",
    items: [
      "Solar PV & Smart Grid EPC",
      "Hybrid Microgrid (Solar-Diesel-Biogas)",
      "Battery Energy Storage Systems (BESS)",
      "EV Charging Infrastructure & Power Panel",
    ],
  },
];

export const advantages = [
  {
    title: "Tenaga Ahli Bersertifikat",
    body: "Tim insinyur berpengalaman internasional dengan kualifikasi teknis tingkat tinggi di bidang kelistrikan dan otomasi.",
  },
  {
    title: "End-to-End Solution",
    body: "Menangani seluruh siklus proyek mulai dari konsultasi awal, desain rekayasa, pengadaan, konstruksi hingga pemeliharaan.",
  },
  {
    title: "Rekam Jejak Teruji",
    body: "Terbukti sukses mengeksekusi proyek strategis bersama PLN, BUMN, dan grup industri manufaktur terkemuka.",
  },
];

export const projects: {
  category: string;
  service: ServiceSlug;
  title: string;
  body: string;
  status: string;
  ongoing: boolean;
}[] = [
  {
    category: "Hybrid Microgrid",
    service: "renewable",
    title: "PLTS Hybrid & Battery System",
    body: "Pengembangan sistem microgrid hybrid surya-baterai untuk pulau terpencil guna menjamin pasokan energi 24/7.",
    status: "Completed & Operational",
    ongoing: false,
  },
  {
    category: "Monitoring & Control",
    service: "integration",
    title: "SCADA Upgrade & RTU Integration",
    body: "Peningkatan sistem SCADA dan integrasi RTU jaringan distribusi 20 kV untuk keandalan jaringan listrik utama.",
    status: "Completed & Integrated",
    ongoing: false,
  },
  {
    category: "Operation & Maintenance",
    service: "maintenance",
    title: "Floating & Rooftop PV O&M",
    body: "Layanan perawatan berkala, troubleshooting, dan monitoring performa untuk PLTS Atap Industri dan Floating PV.",
    status: "Ongoing Service Contract",
    ongoing: true,
  },
];

export const values = [
  { title: "Excellence", body: "Standar eksekusi terbaik berbasis data dan analisis presisi." },
  { title: "Innovation", body: "Terus belajar dan menghadirkan teknologi mutakhir." },
  { title: "Integrity", body: "Komunikasi terbuka, jujur, dan bertanggung jawab." },
  { title: "Agility", body: "Cepat beradaptasi dalam tim untuk mencapai tujuan bersama." },
  { title: "Solution Oriented", body: "Proaktif memberikan solusi nyata bagi para pemangku kepentingan." },
];

export const certifications = [
  { code: "ISO 9001:2015", body: "Sistem Manajemen Mutu Terstandardisasi Internasional" },
  { code: "ISO 45001:2018", body: "Sistem Manajemen Keselamatan & Kesehatan Kerja (K3)" },
  { code: "BUJK", body: "Badan Usaha Jasa Konstruksi. Izin Resmi Ketenagalistrikan & Otomasi Industri" },
];

export const safety = {
  title: "Zero Harm Policy",
  body: "Komitmen penuh kami terhadap keselamatan kerja di setiap lokasi proyek. Keselamatan tenaga kerja dan perlindungan aset klien adalah prioritas utama TYNEXT.",
};

export const contact = {
  title: "Mari Berkolaborasi Bersama TYNEXT",
  body: "Hubungi tim ahli kami untuk mendiskusikan kebutuhan otomatisasi industri, sistem kontrol daya, dan proyek energi terbarukan Anda.",
};

export function serviceBySlug(slug: ServiceSlug) {
  return services.find((s) => s.slug === slug)!;
}
