# TYNEXT Company Profile

Website company profile TYNEXT Energy and Control. Next.js 16 (App Router), Tailwind CSS 4, TypeScript, dan Three.js untuk animasi: peta sistem energi interaktif di hero, arus tiga fase di latar yang mengalir saat di-scroll, dan simulasi PLTS di halaman Layanan.

## Menjalankan

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build produksi, semua halaman di-prerender statis
npm run start
```

## Deploy manual ke server

Image Docker dibangun di komputer lokal, dikirim lewat SSH, lalu dijalankan di server pada `127.0.0.1:PORT` di belakang Nginx.

1. Salin `deploy.env.example` menjadi `deploy.prod.env` (atau `deploy.dev.env`) dan isi `SERVER_USER`, `SERVER_HOST`, serta `SERVER_PASSWORD` bila tidak memakai SSH key. File `deploy.*.env` diabaikan git.
2. Jalankan:

   ```bash
   ./deploy-compro-manual.sh prod   # atau: ./deploy-compro-manual.sh dev
   ```

   Script membangun image, mengirimnya, mengganti container lama, dan mengecek `http://127.0.0.1:PORT/`. Bila health check gagal, versi sebelumnya otomatis dijalankan kembali.
3. Sekali saja di server, arahkan domain ke container lewat Nginx (sesuaikan domain dan `PORT`, bawaan 3010), lalu pasang HTTPS (mis. `certbot --nginx`):

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

Server membutuhkan Docker dan `curl`; Node.js tidak perlu dipasang di server.

## Halaman

| Route | Isi |
| --- | --- |
| `/` | Beranda: hero dengan peta sistem energi interaktif (Three.js), ringkasan profil, layanan, proyek, sertifikasi |
| `/tentang` | Profil, visi & misi, keunggulan, nilai perusahaan |
| `/layanan` | Empat lini layanan (anchor `#engineering`, `#integration`, `#renewable`, `#maintenance`) dan dua pilar solusi. Header berisi simulasi PLTS single-axis tracker (Three.js) |
| `/proyek` | Portofolio proyek dan status |
| `/sertifikasi` | ISO 9001, ISO 45001, BUJK, Zero Harm Policy |
| `/kontak` | Kontak dan formulir yang menyusun email (membuka aplikasi email pengunjung, belum ada backend) |

## Struktur

| Lokasi | Isi |
| --- | --- |
| `src/content/company.ts` | Semua teks dan data. Ubah konten di sini. |
| `src/components/three/` | `system-map.tsx` (peta sistem interaktif di hero), `energy-field.tsx` (latar arus seluruh situs, digerakkan scroll), `use-three-scene.ts` (siklus hidup renderer, jeda saat di luar layar, reduced motion), `solar-tracker.tsx` |
| `src/components/band.tsx` | Section berwarna (`data-tone`) yang dibaca lapisan arus |
| `src/components/motion.tsx` | Animasi reveal saat scroll dan angka hitung naik |
| `src/components/page-header.tsx` | Header berwarna untuk halaman selain beranda |
| `src/app/globals.css` | Token warna dan font |
| `DESIGN.md` | Arah desain: palet, tipografi, motif, aturan gerak |

## Yang masih perlu diganti

- **Logo**: `src/components/wordmark.tsx` masih berupa teks "TYNEXT". Taruh logo resmi di `public/` lalu ganti komponennya.
- **Foto fasilitas** (`src/assets/bess-facility.jpg`): hasil crop dari screenshot slide, resolusi rendah (413×277). Ganti dengan foto asli.
- **Formulir kontak**: saat ini membuka `mailto:`. Jika ingin pesan masuk langsung ke server, tambahkan Server Action atau layanan email.
