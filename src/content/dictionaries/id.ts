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
      ipc: "Solusi IPC",
      projects: "Proyek",
      platform: "Cloud Platform",
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
      title: "Energy Solutions & Infrastructure",
      body: "Pengembangan dan penyediaan sistem energi terbarukan, BESS, hybrid microgrid, infrastruktur pengisian kendaraan listrik (EV charging), serta solusi infrastruktur energi.",
      scope: ["EV Charging", "Hybrid & BESS"],
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
      title: "Tim Ahli",
      body: "Tim insinyur berpengalaman dengan kualifikasi teknis tingkat tinggi di bidang kelistrikan dan otomasi.",
    },
    {
      title: "End-to-End Solution",
      body: "Menangani seluruh siklus proyek mulai dari konsultasi awal, desain rekayasa, pengadaan, integrasi hingga pemeliharaan.",
    },
    {
      title: "Solusi Berbasis IPC",
      body: "Sistem kontrol dan monitoring berbasis Industrial PC (IPC) yang menjalankan SCADA, HMI, dan akuisisi data secara andal di lingkungan industri.",
    },
  ],

  projects: {
    "solar-bess-control": {
      category: "Solar & BESS · Power Plant Control",
      title: "Solar & BESS Control System",
      body: "Beckhoff menyediakan platform kontrol terdesentralisasi berbasis PC (CX series + TwinCAT) untuk BCI dan PPC pada sistem pembangkit surya & baterai milik Power Electronics (120 GW kapasitas global). Dengan komunikasi Modbus TCP dan ADS, sistem ini mampu mengoordinasikan 160 blok daya sekaligus dan mencapai respons dinamis 330 MW hanya dalam 110 ms, memenuhi syarat ketat layanan ancillary grid.",
      company: "Power Electronics",
      technology: "Beckhoff CX series, TwinCAT, Modbus TCP, ADS",
      imageAlt: "Embedded PC Beckhoff CX2033 dan CX2100 terpasang di panel kontrol sistem surya & baterai",
    },
    "ev-charging": {
      category: "EV Charging · Energy Management",
      title: "Smart EV Charging & Energy Integration",
      body: "Integrasi software manajemen energi reev oleh kontraktor listrik Jerman, Elektro Beckhoff, yang berhasil menyatukan sistem PV, penyimpanan baterai, dan EV charger dalam satu platform cerdas. Solusi hardware-independent ini memungkinkan pengelolaan daya yang skalabel (hingga stasiun DC 600 kW) dan mendukung tarif listrik dinamis untuk pengisian daya yang lebih efisien.",
      company: "Elektro Beckhoff",
      technology: "reev energy management, PV, BESS, DC charger hingga 600 kW",
      imageAlt: "Stasiun pengisian kendaraan listrik beratap panel surya dengan mobil van Elektro Beckhoff sedang mengisi daya",
    },
    "grid-test-rig": {
      category: "Simulasi skenario grid & kondisi gangguan",
      title: "Grid Converter Test Rig",
      body: "Beckhoff menyediakan platform kontrol dan simulasi real-time berbasis PC (C6030 & CX2043) dengan EtherCAT untuk alat uji konverter turbin angin milik Siemens Gamesa. Sistem ini memungkinkan simulasi grid berkecepatan mikrodetik dan pengujian otomatis, memastikan validasi performa turbin angin yang akurat sebelum sertifikasi.",
      company: "Siemens Gamesa",
      technology: "Beckhoff C6030, CX2043, EtherCAT",
      imageAlt: "Panel alat uji dengan dua Embedded PC Beckhoff CX2043 berlabel GEN dan GRID",
    },
    "wwt-scada": {
      category: "Industrial Automation · Control System · SCADA",
      title: "Industrial Control & SCADA System Integration",
      body: "Fharco Renergy Solutions mengerjakan otomasi berbasis PLC dan integrasi SCADA untuk instalasi pengolahan air limbah (WWT) industri. Pekerjaan meliputi pemrograman PLC, pengembangan sistem kontrol, dan integrasi SCADA untuk pemantauan peralatan secara terpusat, visualisasi proses, dan kendali operasional. Solusi ini menjaga operasi pabrik tetap andal melalui otomasi terintegrasi dan pemantauan proses secara real-time.",
      company: "UJT",
      technology: "PLC Programming, Industrial Control System, SCADA Integration",
      imageAlt: "Layar HMI WWT Control System PT Daewoong Indonesia dengan status pompa, agitator, sensor, dan level switch",
    },
    "ikn-solar-scada": {
      category: "Renewable Energy · Solar PV · SCADA",
      title: "10 MWp Solar PV Plant SCADA Monitoring & Control System",
      body: "Terlibat dalam pengembangan dan implementasi sistem SCADA untuk pemantauan dan kendali PLTS 10 MWp di Ibu Kota Nusantara (IKN). Sistem ini memungkinkan pemantauan operasi PLTS secara terpusat, akuisisi data real-time, pemantauan status peralatan, dan visualisasi performa operasional. Integrasinya mendukung pengawasan pembangkit yang efisien, keandalan sistem, dan visibilitas operasional yang lebih baik.",
      location: "IKN – Nusantara, Indonesia",
      technology: "SCADA System, PLC Integration, Solar PV Monitoring, Schneider Electric, Huawei",
      imageAlt: "Layar WebHMI SCADA PLTS IKN menampilkan single line diagram switchgear MV dan inverter PV",
    },
  } satisfies Record<ProjectId, ProjectText>,

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
    projectsEyebrow: "Referensi Proyek",
    projectsTitle: "Penerapan Teknologi di Proyek Energi & Industri",
    allProjects: "Semua proyek",
    complianceEyebrow: "Kepatuhan & Mutu",
    complianceTitle: "Sertifikasi & Standar Keselamatan",
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
      "Engineering & design, system integration, energy solutions & infrastructure, serta operation & maintenance untuk sistem kelistrikan dan otomasi.",
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
      "Referensi proyek: sistem kontrol surya & BESS, integrasi EV charging, alat uji konverter grid turbin angin, SCADA pengolahan limbah industri, dan SCADA PLTS 10 MWp di IKN.",
    title: "Referensi Proyek",
    intro:
      "Sistem kontrol, otomasi, dan SCADA yang bekerja di pembangkit surya & baterai, pengisian kendaraan listrik, pengujian turbin angin, pengolahan limbah industri, hingga PLTS 10 MWp di IKN.",
    company: "Perusahaan",
    location: "Lokasi proyek",
    technology: "Teknologi",
    serviceLine: "Lini layanan",
  },

  ipcPage: {
    metaTitle: "Solusi IPC",
    metaDescription:
      "Katalog Embedded PC (IPC) untuk sistem kontrol dan otomasi: cari, urutkan, dan bandingkan CPU, sistem operasi, level TwinCAT, dan protokol komunikasi.",
    title: "Solusi IPC",
    intro:
      "Pilihan Embedded PC untuk sistem kontrol, otomasi, dan monitoring. Cari, urutkan, dan bandingkan spesifikasinya, lalu diskusikan kebutuhan proyek Anda dengan tim kami.",
    finderTitle: "Product finder IPC",
    searchLabel: "Cari produk",
    searchPlaceholder: "Cari produk, CPU, protokol...",
    columnsButton: "Tampilkan/sembunyikan kolom",
    showAllColumns: "Tampilkan semua kolom",
    compare: "Bandingkan",
    clearSelection: "Hapus pilihan",
    compareColumn: "Bandingkan",
    selectRow: "Pilih untuk dibandingkan",
    download: "Unduh Excel",
    downloadPdf: "Unduh Katalog PDF",
    // {shown} dan {total} diganti angka.
    count: "{shown} dari {total} produk",
    empty: "Tidak ada produk yang cocok. Coba kata kunci lain atau tampilkan semua produk.",
    showAll: "Tampilkan semua produk",
    source: "Sumber data: katalog produk Beckhoff Automation.",
    columns: {
      product: "Produk",
      productCategory: "Kategori produk",
      numberOfCores: "Jumlah core",
      cpuType: "Tipe CPU",
      twincat3PlatformLevel: "Level platform TwinCAT 3",
      twincat2Support: "Dukungan TwinCAT 2",
      operatingSystem: "Sistem operasi",
      protectionRating: "Rating proteksi",
      fan: "Kipas",
      productStatus: "Status produk",
      useInHazardousAreas: "Untuk area berbahaya",
      interfaces: "Antarmuka",
      ups: "UPS",
      tpm: "TPM",
      moduleType: "Tipe modul",
      communication: "Komunikasi",
      masterSlaveFunctionality: "Fungsi master/slave",
      memoryMedium: "Media penyimpanan",
    },
    // Terjemahan nilai sel dari Excel (bahasa Inggris). Nilai yang tidak ada di sini tampil apa adanya.
    values: {
      yes: "ya",
      no: "tidak",
      "regular delivery": "tersedia",
      "regular delivery (not recommended for new projects)": "tersedia (tidak disarankan untuk proyek baru)",
      "product announcement": "segera hadir",
      "1-second UPS": "UPS 1 detik",
      "1-second UPS, integrated": "UPS 1 detik, terintegrasi",
      "Basic CPU module": "Modul CPU dasar",
    },
  },

  platformPage: {
    metaTitle: "Cloud Platform",
    metaDescription:
      "TYNEXT Solar: platform monitoring cloud untuk memantau dan mengelola banyak lokasi PLTS dan BESS dari satu dashboard.",
    title: "TYNEXT Solar",
    intro:
      "Platform monitoring cloud dari TYNEXT yang menyatukan seluruh aset energi Anda dalam satu dashboard yang jelas, cepat, dan mudah diakses.",
    featuresLabel: "Fitur Utama",
    features: [
      {
        title: "Kontrol Banyak Lokasi",
        body: "Pantau dan kelola banyak lokasi PLTS dan BESS dari satu dashboard terpusat.",
      },
      {
        title: "Peta Interaktif & Data Real-Time",
        body: "Peta interaktif dan data real-time untuk merespons kondisi aset dengan cepat.",
      },
      {
        title: "Laporan Mudah",
        body: "Laporan performa dan produksi energi yang siap dibagikan kepada pemangku kepentingan.",
      },
    ],
    screenshotAlt:
      "Dashboard TYNEXT Solar: peta lokasi PLTS dan BESS di Indonesia dengan ringkasan kapasitas terpasang, produksi energi, manfaat lingkungan, dan performa BESS.",
    open: "Buka TYNEXT Solar",
  },

  contactPage: {
    metaTitle: "Kontak",
    office: "Kantor Pusat",
    email: "Email Inquiry",
    whatsapp: "WhatsApp",
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
    submit: "Kirim Pesan",
    sending: "Mengirim...",
    submitHint: "Tim kami akan membalas ke alamat email yang Anda isi.",
    sent: "Terima kasih, pesan Anda sudah terkirim. Tim kami akan segera menghubungi Anda.",
    errors: {
      nameRequired: "Nama wajib diisi.",
      emailRequired: "Email wajib diisi.",
      emailInvalid: "Format email belum benar.",
      serviceRequired: "Pilih kebutuhan layanan.",
      messageShort: "Ceritakan kebutuhan Anda minimal 10 karakter.",
      // {seconds} diganti angka dari header Retry-After.
      rateLimited: "Terlalu banyak pesan dari jaringan Anda. Coba lagi dalam {seconds} detik, atau email langsung ke",
      failed: "Pesan belum terkirim. Coba lagi sebentar lagi, atau email langsung ke",
    },
  },

  notFound: {
    title: "Lembar ini tidak ditemukan",
    body: "Alamat yang Anda buka tidak ada atau sudah dipindahkan. Kembali ke beranda atau lihat daftar layanan kami.",
    home: "Kembali ke Beranda",
    services: "Lihat layanan",
  },
};

// Teks satu proyek; kartu menampilkan perusahaan atau lokasi, mana yang tersedia.
export type ProjectText = {
  category: string;
  title: string;
  body: string;
  company?: string;
  location?: string;
  technology: string;
  imageAlt: string;
};

// Bentuk kamus tanpa nilai literalnya, supaya bahasa lain wajib mengisi semua kunci yang sama.
type Widen<T> = T extends string
  ? string
  : T extends readonly (infer U)[]
    ? Widen<U>[]
    : { [K in keyof T]: Widen<T[K]> };

export type Dictionary = Widen<typeof id>;
