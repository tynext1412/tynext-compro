import Image from "next/image";
import Link from "next/link";
import { Band, revealDelay } from "@/components/band";
import { CountUp } from "@/components/motion";
import { SystemMapCanvas, SystemMapLegend, SystemMapProvider } from "@/components/three/system-map";
import { CtaBand, SectionTitle, buttonSun, serviceTone, textLink, textLinkLight } from "@/components/ui";
import { about, certifications, hero, projects, safety, serviceBySlug, services } from "@/content/company";
// Foto sementara, di-crop dari slide deck (resolusi rendah). Ganti dengan foto asli resolusi tinggi.
import facilityPhoto from "@/assets/bess-facility.jpg";

export default function Home() {
  const [featured, ...others] = projects;

  return (
    <>
      {/* Hero memenuhi satu layar: judul di kiri, peta sistem interaktif di kanan, daftar layanan mendatar di bawah. */}
      <Band tone="deep" lines={false} className="overflow-hidden">
        <SystemMapProvider>
          <div className="mx-auto flex max-w-6xl flex-col px-4 pt-10 pb-8 sm:px-6 lg:min-h-[calc(100svh-4rem)] lg:px-8 lg:pt-12">
            <div className="grid flex-1 items-center gap-x-10 gap-y-6 lg:grid-cols-[1fr_1.15fr] lg:grid-rows-[auto_auto]">
              <div className="lg:self-end">
                <p data-reveal className="font-mono text-xs font-medium text-sun">
                  {hero.eyebrow}
                </p>
                <h1
                  data-reveal
                  style={revealDelay(100)}
                  className="display mt-4 text-[2.4rem] leading-[0.98] sm:text-6xl lg:text-[3.6rem] xl:text-[4rem]"
                >
                  {hero.title}
                </h1>
              </div>

              <div
                data-reveal="scale"
                style={revealDelay(200)}
                className="-mx-4 sm:mx-0 lg:col-start-2 lg:row-span-2 lg:row-start-1"
              >
                <SystemMapCanvas className="h-64 sm:h-96 lg:h-[min(32rem,calc(100svh-17rem))]" />
              </div>

              <div className="lg:self-start">
                <p data-reveal style={revealDelay(250)} className="max-w-xl text-lg leading-relaxed text-mist">
                  {hero.description}
                </p>
                <div data-reveal style={revealDelay(320)} className="mt-7 flex flex-wrap items-center gap-x-8 gap-y-5">
                  <Link href="/kontak" className={buttonSun}>
                    Diskusikan Proyek Anda
                  </Link>
                  <Link href="/layanan" className={textLinkLight}>
                    Lihat layanan kami
                  </Link>
                </div>
              </div>
            </div>

            <div data-reveal style={revealDelay(400)} className="mt-8 lg:mt-6">
              <SystemMapLegend />
            </div>
          </div>
        </SystemMapProvider>
      </Band>

      <Band tone="paper">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 py-24 sm:px-6 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:px-8">
          <div data-reveal="left">
            <Image
              src={facilityPhoto}
              alt="Fasilitas Battery Energy Storage System berupa deretan kontainer baterai di samping gardu dan ladang panel surya"
              sizes="(min-width: 1024px) 540px, 100vw"
              placeholder="blur"
              className="aspect-4/3 w-full rounded-xs object-cover"
            />
          </div>
          <div>
            <p data-reveal className="font-mono text-xs font-medium text-arc-ink">
              Tentang Kami
            </p>
            <p data-reveal style={revealDelay(100)} className="display mt-4 text-2xl leading-snug sm:text-[2rem]">
              {about.lead}
            </p>
            <Link data-reveal style={revealDelay(200)} href="/tentang" className={`${textLink} mt-8 inline-block`}>
              Profil lengkap perusahaan
            </Link>
          </div>
        </div>
      </Band>

      <Band tone="arc">
        <dl className="mx-auto grid max-w-6xl grid-cols-3 px-4 py-14 sm:px-6 lg:px-8">
          {about.stats.map((stat, i) => (
            <div
              key={stat.label}
              data-reveal
              style={revealDelay(i * 120)}
              className={`flex flex-col-reverse justify-end ${i ? "border-l-2 border-ink pl-3 sm:pl-8" : "pr-3"}`}
            >
              <dt className="mt-2 text-sm font-semibold sm:text-base">{stat.label}</dt>
              <dd className="display text-[1.75rem] sm:text-7xl">
                <CountUp value={stat.value} />
              </dd>
            </div>
          ))}
        </dl>
      </Band>

      <Band tone="paper">
        <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:px-8">
          <div data-reveal>
            <SectionTitle eyebrow="Layanan Utama" title="Layanan & Spesialisasi Teknik" />
          </div>
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service, i) => {
              const tone = serviceTone[service.slug];
              return (
                <li key={service.slug} data-reveal style={revealDelay(i * 110)}>
                  <Link
                    href={`/layanan#${service.slug}`}
                    className={`group flex h-full min-h-80 flex-col rounded-xs p-6 transition-transform duration-300 hover:-translate-y-1.5 ${tone.tile}`}
                  >
                    <span className="display text-6xl opacity-90">{String(i + 1).padStart(2, "0")}</span>
                    <span className="display mt-auto pt-10 text-xl leading-tight">{service.title}</span>
                    <span className={`mt-3 text-sm leading-relaxed ${tone.muted}`}>{service.body}</span>
                    <span className="mt-5 font-mono text-xs underline underline-offset-4 group-hover:no-underline">
                      Detail layanan
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </Band>

      <Band tone="deep">
        <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:px-8">
          <div data-reveal className="flex flex-wrap items-end justify-between gap-6">
            <SectionTitle light eyebrow="Portofolio Proyek" title="Pengalaman Proyek Unggulan" />
            <Link href="/proyek" className={textLinkLight}>
              Semua proyek
            </Link>
          </div>

          <div className="mt-14 grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
            <article data-reveal="left">
              <p
                className={`inline-block rounded-xs px-2.5 py-1 font-mono text-xs ${serviceTone[featured.service].chip}`}
              >
                {featured.category}
              </p>
              <h3 className="display mt-5 text-4xl leading-tight sm:text-5xl">{featured.title}</h3>
              <p className="mt-5 max-w-lg text-lg leading-relaxed text-mist">{featured.body}</p>
              <p className="mt-8 font-mono text-xs text-mint">Status: {featured.status}</p>
            </article>
            <div className="divide-y divide-white/15 border-y border-white/15">
              {others.map((project, i) => (
                <article key={project.title} data-reveal style={revealDelay(150 + i * 120)} className="py-7">
                  <p
                    className={`inline-block rounded-xs px-2.5 py-1 font-mono text-xs ${serviceTone[project.service].chip}`}
                  >
                    {project.category}
                  </p>
                  <h3 className="mt-4 text-xl font-semibold">{project.title}</h3>
                  <p className="mt-2 leading-relaxed text-mist">{project.body}</p>
                  <p className="mt-4 font-mono text-xs text-mint">
                    Status: {project.status} · {serviceBySlug(project.service).title}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </Band>

      <Band tone="paper">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 py-24 sm:px-6 lg:grid-cols-[1fr_1.4fr] lg:px-8">
          <div data-reveal>
            <SectionTitle eyebrow="Kepatuhan & Mutu" title="Sertifikasi & Standar Keselamatan" />
            <p className="mt-6 leading-relaxed text-ink-2">
              <strong className="font-semibold text-ink">{safety.title}.</strong> {safety.body}
            </p>
            <Link href="/sertifikasi" className={`${textLink} mt-8 inline-block`}>
              Detail sertifikasi & K3
            </Link>
          </div>
          <dl className="border-t-2 border-ink">
            {certifications.map((cert, i) => (
              <div
                key={cert.code}
                data-reveal
                style={revealDelay(i * 120)}
                className="grid gap-1 border-b border-rule py-6 sm:grid-cols-[12rem_1fr] sm:gap-6"
              >
                <dt className="display text-xl">{cert.code}</dt>
                <dd className="text-ink-2">{cert.body}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Band>

      <CtaBand />
    </>
  );
}
