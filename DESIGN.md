# Arah Desain TYNEXT

Dial: ENERGY 3 / RHYTHM 3 / MOTION 3

## Identitas
Perusahaan rekayasa kelistrikan, otomasi, dan energi terbarukan. Warna diambil langsung dari logo TYNEXT: ikon "T" bergradasi biru ke tosca dengan aksen hijau limau, dan teks navy.

## Palet
Diambil dari piksel logo (`src/assets/brand/`). Bidang warna besar dipakai per section, bukan sekadar aksen.

| Peran | Token | Hex | Dipakai untuk |
| --- | --- | --- | --- |
| Primary | navy | `#0e2846` | Header, hero, section gelap (warna teks logo) |
| Primary | navy-2 | `#0a1f37` | Footer |
| Primary | blue | `#17457a` | Pangkal gradasi ikon; teks penekanan di latar terang |
| Secondary | teal | `#3eba95` | Ujung gradasi ikon; pita statistik, header Proyek & Kontak, lini O&M |
| Tertiary | lime | `#8cc63f` | Aksen ikon; tombol utama, ajakan kontak, header Layanan, lini Renewable, arus di peta |
| | aqua | `#7fd8bd` | Teks aksen di latar navy, chip lini Integration |
| | mist | `#a9bccb` | Teks sekunder di latar navy |
| | paper / paper-2 | `#f4f6f8` / `#e6ecf1` | Latar terang |
| | ink / ink-2 | `#0e1b2c` / `#4b5a6a` | Teks |

Lime, teal, dan aqua tidak pernah dipakai sebagai teks di latar terang (kontras kurang); di bidang lime dan teal teksnya ink. Gradasi logo (blue → teal → lime) hanya muncul sebagai garis 2px di bawah header.

### Warna per lini layanan
Dipakai konsisten di beranda, halaman Layanan, dan Proyek.

| Lini | Warna |
| --- | --- |
| Engineering & Design | paper-2 |
| System Integration | navy (chip aqua) |
| Renewable Energy EPC | lime |
| Operation & Maintenance | teal |

## Header
Tinggi 6rem (96px), tetap di atas (fixed), logo 48px. Di posisi paling atas latarnya transparan dan warna teks/logo mengikuti section pertama halaman (putih di navy, navy di limau/tosca); setelah di-scroll menjadi navy 90% dengan blur. Tombol bahasa bersegmen ID | EN di sebelah tombol Hubungi Kami. Menu: garis bawah tumbuh dari kiri saat hover. Di bawah header ada garis gradasi logo yang mengalir pelan dari kiri ke kanan.

## Logo
- `src/assets/brand/logo-white.png`: logo lengkap putih, di header (latar gelap) dan footer.
- `src/assets/brand/logo-navy.png`: versi navy dari logo yang sama, di header saat transparan di atas section terang.
- `src/assets/brand/logo-mark.png`: ikon T berwarna, sumber `src/app/icon.png` (favicon) dan `src/app/apple-icon.png`.

## Golden ratio (φ = 1,618)
Proporsi seluruh situs diturunkan dari φ. Token ada di `src/app/globals.css` dengan awalan `gr-`.

| Aspek | Aturan |
| --- | --- |
| Jarak (`p-`, `m-`, `gap-`) | `gr-xs` 0,382 · `gr-sm` 0,618 · `gr-md` 1 · `gr-lg` 1,618 · `gr-xl` 2,618 · `gr-2xl` 4,236 · `gr-3xl` 6,854 rem; tiap langkah ×φ |
| Ukuran huruf (`text-gr-*`) | 0,786 · 1 · 1,272 · 1,618 · 2,058 · 2,618 · 3,33 · 4,236 rem; langkah √φ, tiap dua langkah ×φ |
| Line-height | Teks 1,618; judul 1,0 sampai 1,272 |
| Kolom | Semua tata letak dua kolom 1 : 1,618 (38,2% / 61,8%); halaman Proyek 1 : φ² : φ |
| Bidang | Foto, kanvas peta, header Layanan, dan tile layanan memakai persegi panjang emas 1,618 : 1 (tile beranda 1 : 1,618 tegak) |
| Header | Tinggi 6rem (mengikuti referensi desain) |
| Container | Padding samping 1 → 1,618 → 2,618 rem mengikuti lebar layar |
| Arus latar | Amplitudo 0,382 × lebar layar, satu periode = φ × tinggi layar |

Layar laptop pendek (tinggi ≤ 820px) memakai varian `short:` yang turun satu langkah φ di hero agar tetap muat satu layar.

## Tipografi
- **Archivo** (lebar 112%, tebal) untuk judul: proporsi lebar seperti pelat nama peralatan listrik.
- **IBM Plex Sans** untuk teks: huruf yang dirancang untuk dokumentasi teknik.
- **IBM Plex Mono** kecil hanya untuk label spesifikasi.

## Motif
- Nomor besar (01, 02, ...) di tile berwarna.
- Garis arus tiga fase yang mengalir di seluruh halaman.

## Gerak
Setiap animasi harus menjelaskan sesuatu atau merespons pengunjung. Tidak ada yang bergerak sendiri terus-menerus di seluruh halaman.

- **Peta sistem di hero** (Three.js, interaktif, di kanan judul; hero muat dalam satu layar sehingga peta langsung terlihat tanpa scroll): diorama PLTS & BESS -> gardu & SCADA -> jaringan 20 kV -> fasilitas klien, dengan partikel arus di jalurnya. Arahkan kursor ke objek atau ke daftar layanan untuk melihat peran layanan itu: Engineering = mode blueprint (lantai grid denah lokasi menjadi lebih tegas), Integration = paket data telemetri ke ruang kontrol, Renewable = PLTS/BESS menyala dan arus lebih deras, O&M = sapuan inspeksi dan indikator status. Klik membuka detail layanan. Sudut pandang sedikit mengikuti kursor; framing kamera dihitung untuk seluruh rentang gerakan itu sehingga diorama tidak pernah terpotong tepi kanvas. Lantai grid selalu tampil samar dan memudar ke tepi. Tur otomatis hanya di layar sentuh.
- **EnergyField** (Three.js, seluruh situs): tiga kabel fase di latar, hanya mengalir saat halaman di-scroll dan diam saat scroll berhenti. Warna kabel menyesuaikan section yang dilewati.
- **Header Layanan**: PLTS dengan single-axis tracker mengikuti matahari.
- **Reveal**: konten muncul saat masuk layar, angka statistik menghitung naik sekali.
- **Aksesibilitas**: teks diberi halo warna latar sehingga garis arus meredup di sekitar huruf. Peta sistem punya daftar layanan yang bisa dipakai dengan keyboard. `prefers-reduced-motion` membekukan semua animasi.
