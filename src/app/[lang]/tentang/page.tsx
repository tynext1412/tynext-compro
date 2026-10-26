import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Band, revealDelay } from "@/components/band";
import { CountUp } from "@/components/motion";
import { PageHeader } from "@/components/page-header";
import { CtaBand, SectionTitle } from "@/components/ui";
import { stats } from "@/content/company";
import { alternatesFor, getDictionary, hasLocale } from "@/i18n";
// Foto sementara, di-crop dari slide deck (resolusi rendah). Ganti dengan foto asli resolusi tinggi.
import facilityPhoto from "@/assets/bess-facility.jpg";

export async function generateMetadata({ params }: PageProps<"/[lang]/tentang">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = getDictionary(lang);
  return {
    title: dict.aboutPage.metaTitle,
    description: dict.about.lead,
    alternates: alternatesFor(lang, "/tentang"),
  };
}

// Tiga warna palet bergantian untuk menandai tiap keunggulan.
const advantageTone = ["bg-teal text-ink", "bg-lime text-ink", "bg-navy text-paper"];

export default async function AboutPage({ params }: PageProps<"/[lang]/tentang">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);
  const { about, aboutPage, vision } = dict;

  return (
    <>
      <PageHeader tone="navy" title={aboutPage.title} intro={about.lead} />

      <Band tone="paper">
        <div className="mx-auto grid max-w-6xl gap-gr-xl px-gr-md py-gr-3xl sm:px-gr-lg lg:grid-cols-[1fr_1.618fr] lg:items-center lg:px-gr-xl">
          <figure data-reveal="left">
            <Image
              src={facilityPhoto}
              alt={about.photoAlt}
              sizes="(min-width: 1024px) 560px, 100vw"
              placeholder="blur"
              className="aspect-[1.618] w-full rounded-xs object-cover"
            />
            <figcaption className="mt-gr-sm font-mono text-gr-xs text-ink-2">{about.photoCaption}</figcaption>
          </figure>
          <div>
            <p data-reveal className="text-gr-lg leading-golden text-ink-2">
              {about.body}
            </p>
            <dl className="mt-gr-xl grid grid-cols-3 gap-gr-sm">
              {stats.map((value, i) => (
                <div
                  key={value}
                  data-reveal
                  style={revealDelay(i * 120)}
                  className="flex flex-col-reverse justify-end rounded-xs bg-teal p-gr-md sm:p-gr-md"
                >
                  <dt className="mt-gr-xs text-gr-base font-semibold">{about.stats[i]}</dt>
                  <dd className="display text-gr-2xl sm:text-gr-4xl">
                    <CountUp value={value} />
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Band>

      <Band tone="lime">
        <div className="mx-auto max-w-6xl px-gr-md py-gr-3xl sm:px-gr-lg lg:px-gr-xl">
          <p data-reveal className="font-mono text-gr-xs font-medium">
            {vision.label}
          </p>
          <p
            data-reveal
            style={revealDelay(100)}
            className="display mt-gr-md max-w-4xl text-gr-2xl leading-gr-snug sm:text-gr-4xl"
          >
            {vision.title}
          </p>
          <p data-reveal style={revealDelay(200)} className="mt-gr-lg max-w-2xl text-gr-lg leading-golden">
            {vision.body}
          </p>
        </div>
      </Band>

      <Band tone="navy">
        <div className="mx-auto grid max-w-6xl gap-gr-xl px-gr-md py-gr-3xl sm:px-gr-lg lg:grid-cols-[1fr_1.618fr] lg:px-gr-xl">
          <div data-reveal>
            <SectionTitle light eyebrow={aboutPage.missionEyebrow} title={aboutPage.missionTitle} />
            <p className="mt-gr-lg font-mono text-gr-xs text-aqua">{aboutPage.missionTagline}</p>
          </div>
          <ol className="border-t border-white/20">
            {dict.missions.map((mission, i) => (
              <li
                key={mission.title}
                data-reveal
                style={revealDelay(i * 120)}
                className="grid grid-cols-[3.5rem_1fr] border-b border-white/20 py-gr-lg"
              >
                <span className="display text-gr-2xl text-lime">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="text-gr-lg font-semibold">{mission.title}</h3>
                  <p className="mt-gr-sm leading-golden text-mist">{mission.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Band>

      <Band tone="paper">
        <div className="mx-auto max-w-6xl px-gr-md py-gr-3xl sm:px-gr-lg lg:px-gr-xl">
          <div data-reveal>
            <SectionTitle eyebrow={aboutPage.advantagesEyebrow} title={aboutPage.advantagesTitle} />
          </div>
          <div className="mt-gr-xl grid gap-gr-md md:grid-cols-3">
            {dict.advantages.map((item, i) => (
              <div
                key={item.title}
                data-reveal
                style={revealDelay(i * 120)}
                className={`flex min-h-72 flex-col rounded-xs p-gr-lg ${advantageTone[i]}`}
              >
                <span className="display text-gr-4xl" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="display mt-auto pt-gr-lg text-gr-lg">{item.title}</h3>
                <p className="mt-gr-sm leading-golden">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </Band>

      <Band tone="paper-2">
        <div className="mx-auto max-w-6xl px-gr-md py-gr-3xl sm:px-gr-lg lg:px-gr-xl">
          <div data-reveal>
            <SectionTitle eyebrow={aboutPage.valuesEyebrow} title={aboutPage.valuesTitle} />
          </div>
          <dl className="mt-gr-xl grid border-t-2 border-ink sm:grid-cols-2 lg:grid-cols-5">
            {dict.values.map((value, i) => (
              <div
                key={value.title}
                data-reveal
                style={revealDelay(i * 90)}
                className="border-b border-rule py-gr-lg sm:pr-gr-lg lg:border-b-0"
              >
                <dt className="display text-gr-lg">{value.title}</dt>
                <dd className="mt-gr-sm text-gr-base leading-golden text-ink-2">{value.body}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Band>

      <CtaBand lang={lang} cta={dict.cta} />
    </>
  );
}
