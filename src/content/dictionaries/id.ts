import type { ProjectId, RouteKey, ServiceSlug } from "../company";

// Kamus Bahasa Indonesia. Bentuknya menjadi acuan tipe untuk semua bahasa lain (lihat en.ts).
export const id = {
  meta: {
    defaultTitle: "TYNEXT Energy and Control | Integrated Power & Control Systems",
    description:
      "Solusi otomatisasi industri, sistem kontrol daya terintegrasi, SCADA, PLTS, dan BESS untuk sektor industri dan infrastruktur di Indonesia.",
    ogLocale: "id_ID",
  },

  nav: {
    labels: {
      home: "Beranda",
      about: "Tentang",
      services: "Layanan",
      projects: "Proyek",
      certifications: "K3 & Mutu",
      contact: "Kontak",
    } satisfies Record<RouteKey, string>,
    cta: "Hubungi Kami",
    openMenu: "Buka menu",
    closeMenu: "Tutup menu",
    currentPage: "halaman ini",
    mainNav: "Navigasi utama",
    footerNav: "Halaman",
    homeLink: "TYNEXT Energy and Control, ke beranda",
    skipToContent: "Lewati ke konten",
    language: "Pilih bahasa",
  },

  hero: {
    eyebrow: "Pioneering Smart Energy & Automation",
    title: "Integrated Power & Control Systems",
    description:
      "Penyedia solusi terdepan untuk otomatisasi industri, sistem kontrol daya terintegrasi, dan teknologi energi terbarukan di Indonesia.",
    primaryCta: "Diskusikan Proyek Anda",
    secondaryCta: "Lihat layanan",
  },

  map: {
    heading: "Peta layanan",
    loading: "Memuat peta sistem…",
    failed: "Peta 3D tidak dapat ditampilkan di perangkat ini. Gunakan daftar layanan untuk melihat detailnya.",
  },

  about: {
    lead: "TYNEXT Energy and Control adalah tim profesional, insinyur, dan teknisi ahli yang berdedikasi menghadirkan sistem otomasi & energi modern.",
    body: "Kami mengintegrasikan teknologi SCADA, Industrial IoT, PLTS, serta manajemen daya pintar untuk membantu sektor industri dan infrastruktur mencapai efisiensi operasional tertinggi dan keberlanjutan energi.",
    stats: ["Tahun Pengalaman", "Proyek Selesai", "Kepuasan Klien"],
    photoAlt:
      "Fasilitas Battery Energy Storage System berupa deretan kontainer baterai di samping gardu dan ladang panel surya",
    photoCaption: "Battery Energy Storage System (BESS)",
  },

  vision: {
    label: "Visi Utama",
    title: "Menjadi Mitra Terdepan dalam Otomasi Industri & Solusi Energi Bersih",
    body: "Mensinergikan teknologi generasi terbaru ke dalam industri nasional untuk meningkatkan produktivitas dan keberlanjutan lingkungan.",
  },

  missions: [
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
  ],

  services: {
    engineering: {
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
    integration: {
      code: "02 / Integration",
      title: "System Integration",
      body: "Integrasi SCADA, migrasi PLC, instalasi RTU, telemetry, serta otomatisasi jaringan distribusi 20 kV.",
      scope: ["Integrasi SCADA", "Migrasi PLC", "Instalasi RTU & telemetry", "Otomatisasi jaringan distribusi 20 kV"],
      role: "Gardu, SCADA, dan RTU mengendalikan jaringan distribusi 20 kV.",
    },
    renewable: {
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
    maintenance: {
      code: "04 / Services",
      title: "Operation & Maintenance",
      body: "Pengujian & komisioning, audit energi, perawatan preventif, serta pemantauan kinerja aset secara jarak jauh.",
      scope: ["Pengujian & komisioning", "Audit energi", "Perawatan preventif", "Pemantauan kinerja aset jarak jauh"],
      role: "Inspeksi, perawatan, dan pemantauan kinerja setiap aset di lapangan.",
    },
  } satisfies Record<ServiceSlug, { code: string; title: string; body: string; scope: string[]; role: string }>,

  pillars: [
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
  ],

  advantages: [
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
  ],

  projects: {
    microgrid: {
      category: "Hybrid Microgrid",
      title: "PLTS Hybrid & Battery System",
      body: "Pengembangan sistem microgrid hybrid surya-baterai untuk pulau terpencil guna menjamin pasokan energi 24/7.",
      status: "Completed & Operational",
    },
    scada: {
      category: "Monitoring & Control",
      title: "SCADA Upgrade & RTU Integration",
      body: "Peningkatan sistem SCADA dan integrasi RTU jaringan distribusi 20 kV untuk keandalan jaringan listrik utama.",
      status: "Completed & Integrated",
    },
    "pv-om": {
      category: "Operation & Maintenance",
      title: "Floating & Rooftop PV O&M",
      body: "Layanan perawatan berkala, troubleshooting, dan monitoring performa untuk PLTS Atap Industri dan Floating PV.",
      status: "Ongoing Service Contract",
    },
  } satisfies Record<ProjectId, { category: string; title: string; body: string; status: string }>,

  values: [
    { title: "Excellence", body: "Standar eksekusi terbaik berbasis data dan analisis presisi." },
    { title: "Innovation", body: "Terus belajar dan menghadirkan teknologi mutakhir." },
    { title: "Integrity", body: "Komunikasi terbuka, jujur, dan bertanggung jawab." },
    { title: "Agility", body: "Cepat beradaptasi dalam tim untuk mencapai tujuan bersama." },
    { title: "Solution Oriented", body: "Proaktif memberikan solusi nyata bagi para pemangku kepentingan." },
  ],

  certifications: [
    "Sistem Manajemen Mutu Terstandardisasi Internasional",
    "Sistem Manajemen Keselamatan & Kesehatan Kerja (K3)",
    "Badan Usaha Jasa Konstruksi. Izin Resmi Ketenagalistrikan & Otomasi Industri",
  ],

  safety: {
    title: "Zero Harm Policy",
    body: "Komitmen penuh kami terhadap keselamatan kerja di setiap lokasi proyek. Keselamatan tenaga kerja dan perlindungan aset klien adalah prioritas utama TYNEXT.",
  },

  cta: {
    title: "Mari Berkolaborasi Bersama TYNEXT",
    body: "Hubungi tim ahli kami untuk mendiskusikan kebutuhan otomatisasi industri, sistem kontrol daya, dan proyek energi terbarukan Anda.",
    button: "Hubungi Tim Kami",
  },

  home: {
    aboutEyebrow: "Tentang Kami",
    aboutLink: "Profil lengkap perusahaan",
    servicesEyebrow: "Layanan Utama",
    servicesTitle: "Layanan & Spesialisasi Teknik",
    serviceDetail: "Detail layanan",
    projectsEyebrow: "Portofolio Proyek",
    projectsTitle: "Pengalaman Proyek Unggulan",
    allProjects: "Semua proyek",
    complianceEyebrow: "Kepatuhan & Mutu",
    complianceTitle: "Sertifikasi & Standar Keselamatan",
    complianceLink: "Detail sertifikasi & K3",
    status: "Status",
  },

  aboutPage: {
    metaTitle: "Tentang Kami",
    title: "Profil Perusahaan & Kapabilitas",
    missionEyebrow: "Visi & Misi",
    missionTitle: "Misi Perusahaan",
    missionTagline: "Driven by Engineering Excellence",
    advantagesEyebrow: "Keunggulan Kami",
    advantagesTitle: "Mengapa Memilih TYNEXT?",
    valuesEyebrow: "Budaya Perusahaan",
    valuesTitle: "Nilai-Nilai Utama TYNEXT",
  },

  servicesPage: {
    metaTitle: "Layanan",
    metaDescription:
      "Engineering & design, system integration, renewable energy EPC, serta operation & maintenance untuk sistem kelistrikan dan otomasi.",
    title: "Layanan & Spesialisasi Teknik",
    intro:
      "Dari studi kelayakan hingga pemeliharaan aset, satu tim menangani rekayasa kelistrikan, sistem kontrol, dan energi terbarukan.",
    relatedProject: "Proyek terkait:",
    pillarsEyebrow: "Ekosistem Solusi",
    pillarsTitle: "Dua Pilar Utama Solusi TYNEXT",
    solarCaption: "Ilustrasi: PLTS dengan single-axis tracker mengikuti matahari",
  },

  projectsPage: {
    metaTitle: "Proyek",
    metaDescription:
      "Portofolio proyek TYNEXT: microgrid hybrid surya-baterai, upgrade SCADA & RTU 20 kV, serta O&M PLTS.",
    title: "Pengalaman Proyek Unggulan",
    intro: "Proyek microgrid, SCADA, dan pemeliharaan PLTS yang sudah beroperasi atau sedang kami tangani.",
    status: "Status",
    serviceLine: "Lini layanan",
  },

  certificationsPage: {
    metaTitle: "K3 & Mutu",
    metaDescription: "Sertifikasi ISO 9001:2015, ISO 45001:2018, BUJK, dan kebijakan Zero Harm TYNEXT.",
    title: "Sertifikasi & Standar Keselamatan",
    intro: "Sistem manajemen mutu, keselamatan kerja, dan perizinan yang menjadi dasar setiap pekerjaan lapangan kami.",
    sectionLabel: "Kepatuhan & Mutu",
  },

  contactPage: {
    metaTitle: "Kontak",
    office: "Kantor Pusat",
    email: "Email Inquiry",
    phone: "Telepon",
    formTitle: "Ceritakan kebutuhan proyek Anda",
  },

  form: {
    name: "Nama",
    company: "Perusahaan",
    optional: "(opsional)",
    email: "Email",
    emailPlaceholder: "nama@perusahaan.co.id",
    service: "Kebutuhan layanan",
    otherService: "Lainnya",
    message: "Pesan",
    messagePlaceholder: "Ceritakan lokasi, kapasitas, atau sistem yang ingin dikerjakan.",
    submit: "Susun Email ke Tim Kami",
    submitHint: "Tombol ini membuka aplikasi email Anda dengan pesan yang sudah terisi.",
    sent: "Aplikasi email Anda seharusnya sudah terbuka. Jika tidak, kirim pesan langsung ke",
    errors: {
      nameRequired: "Nama wajib diisi.",
      emailRequired: "Email wajib diisi.",
      emailInvalid: "Format email belum benar.",
      messageShort: "Ceritakan kebutuhan Anda minimal 10 karakter.",
    },
    mail: {
      subject: "Diskusi proyek",
      name: "Nama",
      company: "Perusahaan",
      email: "Email",
    },
  },

  notFound: {
    title: "Lembar ini tidak ditemukan",
    body: "Alamat yang Anda buka tidak ada atau sudah dipindahkan. Kembali ke beranda atau lihat daftar layanan kami.",
    home: "Kembali ke Beranda",
    services: "Lihat layanan",
  },
};

// Bentuk kamus tanpa nilai literalnya, supaya bahasa lain wajib mengisi semua kunci yang sama.
type Widen<T> = T extends string
  ? string
  : T extends readonly (infer U)[]
    ? Widen<U>[]
    : { [K in keyof T]: Widen<T[K]> };

export type Dictionary = Widen<typeof id>;
