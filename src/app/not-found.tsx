import Link from "next/link";
import { Band } from "@/components/band";
import { buttonDeep, textLink } from "@/components/ui";

export default function NotFound() {
  return (
    <Band tone="sun">
      <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:px-8">
        <p className="font-mono text-xs">Error 404</p>
        <h1 className="display mt-4 text-4xl text-ink sm:text-5xl">Lembar ini tidak ditemukan</h1>
        <p className="mt-5 max-w-lg text-lg leading-relaxed">
          Alamat yang Anda buka tidak ada atau sudah dipindahkan. Kembali ke beranda atau lihat daftar layanan kami.
        </p>
        <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-5">
          <Link href="/" className={buttonDeep}>
            Kembali ke Beranda
          </Link>
          <Link href="/layanan" className={textLink}>
            Lihat layanan
          </Link>
        </div>
      </div>
    </Band>
  );
}
