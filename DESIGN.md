# Arah Desain TYNEXT

Dial: ENERGY 3 / RHYTHM 3 / MOTION 3

## Identitas
Perusahaan rekayasa kelistrikan, otomasi, dan energi terbarukan. Bahasa visualnya diambil dari dunia listrik itu sendiri: patina tembaga, matahari, busur listrik, dan kertas gambar teknik. Sengaja berbeda dari palet navy/cyan/hijau neon di deck lama.

## Palet
Bidang warna besar dipakai per section, bukan sekadar aksen.

| Token | Hex | Peran |
| --- | --- | --- |
| deep | `#0d3a33` | Hijau patina tembaga. Header, hero, section gelap |
| deep-2 | `#0a2e28` | Footer |
| sun | `#f5c037` | Kuning matahari. CTA, header Layanan, lini Renewable |
| arc | `#f26a2e` | Oranye busur listrik. Statistik, header Proyek & Kontak, lini O&M |
| arc-ink | `#a63f14` | Teks oranye di latar terang |
| mint | `#8fd4bd` | Aksen teks di latar deep, lini Integration |
| mist | `#a6b8b2` | Teks sekunder di latar deep |
| paper / paper-2 | `#f2efe8` / `#e7e2d6` | Latar terang, kertas gambar teknik |
| ink / ink-2 | `#17181a` / `#55534d` | Teks |

Teks oranye/kuning tidak pernah diletakkan sebagai teks kecil di atas kertas; di bidang sun dan arc teksnya ink.

### Warna per lini layanan
Dipakai konsisten di beranda, halaman Layanan, dan Proyek.

| Lini | Warna |
| --- | --- |
| Engineering & Design | paper-2 |
| System Integration | deep (chip mint) |
| Renewable Energy EPC | sun |
| Operation & Maintenance | arc |

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
