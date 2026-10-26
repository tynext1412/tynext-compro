# TYNEXT Company Profile

Website company profile TYNEXT Energy and Control. Next.js 16 (App Router), Tailwind CSS 4, TypeScript, dan Three.js untuk animasi: peta sistem energi interaktif di hero, arus tiga fase di latar yang mengalir saat di-scroll, dan simulasi PLTS di halaman Layanan.

## Menjalankan

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build produksi (server standalone di .next/standalone)
npm run start
```

## Deploy manual ke server

Situs berjalan sebagai server Next.js (`output: "standalone"`) di dalam Docker, sehingga nanti bisa memanggil backend (mis. untuk form kontak). Container hanya mendengarkan `127.0.0.1:PORT` di server; Nginx meneruskan domain ke sana.

Alur script, supaya kiriman tetap kecil:

1. Aplikasi dibangun di dalam Docker lokal (`node:22-alpine`, sama dengan server) dan diekspor sebagai folder siap jalan: `server.js`, aset, dan hanya dependensi yang dipakai (sekitar 44 MB).
2. Folder itu dikirim dengan `rsync`: deploy pertama sekitar 12 MB terkompresi, deploy berikutnya hanya file yang berubah (tanpa perubahan kode praktis 0 byte).
3. Di server, `Dockerfile.runtime` membungkus folder itu menjadi image di atas `node:22-alpine` (tanpa `npm install`, beberapa detik), lalu container lama diganti. Bila health check gagal, image sebelumnya otomatis dijalankan kembali.

Langkah:

1. Salin `deploy.env.example` menjadi `deploy.prod.env` (atau `deploy.dev.env`) dan isi `SERVER_USER`, `SERVER_HOST`, serta `SERVER_PASSWORD` bila tidak memakai SSH key. File `deploy.*.env` diabaikan git.
2. Jalankan:

   ```bash
   ./deploy-compro-manual.sh prod   # atau: ./deploy-compro-manual.sh dev
   ```

3. Sekali saja di server: pasang Docker, `rsync`, dan `curl`, lalu arahkan domain ke container lewat Nginx (sesuaikan domain dan `PORT`, bawaan 3010) dan pasang HTTPS (mis. `certbot --nginx`):

   ```nginx
   server {
       server_name www.tynext.com tynext.com;
       location / {
           proxy_pass http://127.0.0.1:3010;
           proxy_set_header Host $host;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
       }
   }
   ```

`docker build .` tetap menghasilkan image lengkap bila ingin membangun tanpa script.

## Bahasa (ID / EN)

Semua halaman tersedia di `/id/...` dan `/en/...` dengan path yang sama (mis. `/id/layanan` dan `/en/layanan`). `src/proxy.ts` mengarahkan URL tanpa awalan bahasa: pilihan terakhir dari tombol ID/EN (cookie `NEXT_LOCALE`), lalu bahasa browser, lalu Indonesia sebagai bawaan. Setiap halaman mencantumkan `hreflang` untuk kedua bahasa.

Teks ada di `src/content/dictionaries/id.ts` dan `en.ts`. Bentuk kamus Inggris diturunkan dari kamus Indonesia, jadi build gagal bila ada teks yang belum diterjemahkan. Fakta yang sama di semua bahasa (kontak, slug layanan, status proyek, angka) ada di `src/content/company.ts`.

## Halaman

| Route | Isi |
| --- | --- |
| `/id`, `/en` | Beranda: hero dengan peta sistem energi interaktif (Three.js), ringkasan profil, layanan, proyek, sertifikasi |
| `/{id,en}/tentang` | Profil, visi & misi, keunggulan, nilai perusahaan |
| `/{id,en}/layanan` | Empat lini layanan (anchor `#engineering`, `#integration`, `#renewable`, `#maintenance`) dan dua pilar solusi. Header berisi simulasi PLTS single-axis tracker (Three.js) |
| `/{id,en}/proyek` | Portofolio proyek dan status |
| `/{id,en}/sertifikasi` | ISO 9001, ISO 45001, BUJK, Zero Harm Policy |
| `/{id,en}/kontak` | Kontak dan formulir yang menyusun email (membuka aplikasi email pengunjung, belum ada backend) |

## Struktur

| Lokasi | Isi |
| --- | --- |
| `src/content/dictionaries/` | Teks Bahasa Indonesia (`id.ts`) dan Inggris (`en.ts`). Ubah konten di sini. |
| `src/content/company.ts` | Data yang sama di semua bahasa: kontak, route, slug layanan, status proyek |
| `src/i18n.ts`, `src/proxy.ts` | Daftar bahasa, kamus, helper path, dan pengalihan bahasa |
| `src/components/three/` | `system-map.tsx` (peta sistem interaktif di hero), `energy-field.tsx` (latar arus seluruh situs, digerakkan scroll), `use-three-scene.ts` (siklus hidup renderer, jeda saat di luar layar, reduced motion), `solar-tracker.tsx` |
| `src/components/band.tsx` | Section berwarna (`data-tone`) yang dibaca lapisan arus |
| `src/components/motion.tsx` | Animasi reveal saat scroll dan angka hitung naik |
| `src/components/page-header.tsx` | Header berwarna untuk halaman selain beranda |
| `src/app/globals.css` | Token warna dan font |
| `DESIGN.md` | Arah desain: palet, tipografi, motif, aturan gerak |

## Yang masih perlu diganti

- **Foto fasilitas** (`src/assets/bess-facility.jpg`): hasil crop dari screenshot slide, resolusi rendah (413×277). Ganti dengan foto asli.
- **Formulir kontak**: saat ini membuka `mailto:`. Jika ingin pesan masuk langsung ke server, tambahkan Server Action atau layanan email.
