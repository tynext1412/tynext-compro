import type { Metadata } from "next";
import Image from "next/image";
import { Band, revealDelay } from "@/components/band";
import { CountUp } from "@/components/motion";
import { PageHeader } from "@/components/page-header";
import { CtaBand, SectionTitle } from "@/components/ui";
import { about, advantages, missions, values, vision } from "@/content/company";
// Foto sementara, di-crop dari slide deck (resolusi rendah). Ganti dengan foto asli resolusi tinggi.
import facilityPhoto from "@/assets/bess-facility.jpg";

export const metadata: Metadata = {
  title: "Tentang Kami",
  description: about.lead,
};

// Tiga warna palet bergantian untuk menandai tiap keunggulan.
const advantageTone = ["bg-arc text-ink", "bg-sun text-ink", "bg-deep text-paper"];

export default function AboutPage() {
  return (
    <>
      <PageHeader tone="deep" title="Profil Perusahaan & Kapabilitas" intro={about.lead} />

      <Band tone="paper">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 py-24 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
          <figure data-reveal="left">
            <Image
              src={facilityPhoto}
              alt="Fasilitas Battery Energy Storage System berupa deretan kontainer baterai di samping gardu dan ladang panel surya"
              sizes="(min-width: 1024px) 560px, 100vw"
              placeholder="blur"
              className="aspect-3/2 w-full rounded-xs object-cover"
            />
            <figcaption className="mt-3 font-mono text-xs text-ink-2">Battery Energy Storage System (BESS)</figcaption>
          </figure>
          <div>
            <p data-reveal className="text-lg leading-relaxed text-ink-2">
              {about.body}
            </p>
            <dl className="mt-10 grid grid-cols-3 gap-3">
              {about.stats.map((stat, i) => (
                <div
                  key={stat.label}
                  data-reveal
                  style={revealDelay(i * 120)}
                  className="flex flex-col-reverse justify-end rounded-xs bg-arc p-4 sm:p-5"
                >
                  <dt className="mt-1 text-sm font-semibold">{stat.label}</dt>
                  <dd className="display text-3xl sm:text-5xl">
                    <CountUp value={stat.value} />
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Band>

      <Band tone="sun">
        <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:px-8">
          <p data-reveal className="font-mono text-xs font-medium">
            Visi Utama
          </p>
          <p data-reveal style={revealDelay(100)} className="display mt-5 max-w-4xl text-3xl leading-tight sm:text-5xl">
            {vision.title}
          </p>
          <p data-reveal style={revealDelay(200)} className="mt-8 max-w-2xl text-lg leading-relaxed">
            {vision.body}
          </p>
        </div>
      </Band>

      <Band tone="deep">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 py-24 sm:px-6 lg:grid-cols-[1fr_1.4fr] lg:px-8">
          <div data-reveal>
            <SectionTitle light eyebrow="Visi & Misi" title="Misi Perusahaan" />
            <p className="mt-6 font-mono text-xs text-mint">Driven by Engineering Excellence</p>
          </div>
          <ol className="border-t border-white/20">
            {missions.map((mission, i) => (
              <li
                key={mission.title}
                data-reveal
                style={revealDelay(i * 120)}
                className="grid grid-cols-[3.5rem_1fr] border-b border-white/20 py-7"
              >
                <span className="display text-3xl text-sun">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="text-xl font-semibold">{mission.title}</h3>
                  <p className="mt-2 leading-relaxed text-mist">{mission.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Band>

      <Band tone="paper">
        <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:px-8">
          <div data-reveal>
            <SectionTitle eyebrow="Keunggulan Kami" title="Mengapa Memilih TYNEXT?" />
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {advantages.map((item, i) => (
              <div
                key={item.title}
                data-reveal
                style={revealDelay(i * 120)}
                className={`flex min-h-72 flex-col rounded-xs p-7 ${advantageTone[i]}`}
              >
                <span className="display text-6xl" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="display mt-auto pt-8 text-xl">{item.title}</h3>
                <p className="mt-3 leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </Band>

      <Band tone="paper-2">
        <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:px-8">
          <div data-reveal>
            <SectionTitle eyebrow="Budaya Perusahaan" title="Nilai-Nilai Utama TYNEXT" />
          </div>
          <dl className="mt-12 grid border-t-2 border-ink sm:grid-cols-2 lg:grid-cols-5">
            {values.map((value, i) => (
              <div
                key={value.title}
                data-reveal
                style={revealDelay(i * 90)}
                className="border-b border-rule py-6 sm:pr-6 lg:border-b-0"
              >
                <dt className="display text-xl">{value.title}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-ink-2">{value.body}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Band>

      <CtaBand />
    </>
  );
}
