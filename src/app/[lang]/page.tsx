import Image from "next/image";
import Link from "next/link";
import { Band, revealDelay } from "@/components/band";
import { CountUp } from "@/components/motion";
import { SystemMapCanvas, SystemMapLegend, SystemMapProvider } from "@/components/three/system-map";
import { CtaBand, SectionTitle, buttonSun, serviceTone, textLink, textLinkLight } from "@/components/ui";
import { certificationCodes, projectFacts, serviceSlugs, stats } from "@/content/company";
import { getDictionary, hasLocale, localePath } from "@/i18n";
import { notFound } from "next/navigation";
// Foto sementara, di-crop dari slide deck (resolusi rendah). Ganti dengan foto asli resolusi tinggi.
import facilityPhoto from "@/assets/bess-facility.jpg";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);
  const { hero, about, home } = dict;
  const projects = projectFacts.map((fact) => ({ ...fact, ...dict.projects[fact.id] }));
  const [featured, ...others] = projects;
  const href = (path: string) => localePath(lang, path);

  return (
    <>
      {/* Hero memenuhi satu layar: judul di kiri, peta sistem interaktif di kanan, daftar layanan mendatar di bawah. */}
      <Band tone="navy" lines={false} className="overflow-hidden">
        <SystemMapProvider lang={lang} services={dict.services} labels={dict.map}>
          <div className="mx-auto flex max-w-6xl flex-col px-gr-md pt-[calc(var(--header-h)+var(--spacing-gr-lg))] pb-gr-lg sm:px-gr-lg lg:min-h-svh lg:px-gr-xl lg:pt-[calc(var(--header-h)+var(--spacing-gr-lg))] short:pt-[calc(var(--header-h)+var(--spacing-gr-sm))] short:pb-gr-md">
            <div className="grid flex-1 items-center gap-x-gr-xl gap-y-gr-lg lg:grid-cols-[1fr_1.618fr] lg:grid-rows-[auto_auto]">
              <div className="lg:self-end">
                <p data-reveal className="font-mono text-gr-xs font-medium text-lime">
                  {hero.eyebrow}
                </p>
                <h1
                  data-reveal
                  style={revealDelay(100)}
                  className="display mt-gr-md text-gr-3xl leading-gr-tight sm:text-gr-4xl lg:text-gr-4xl xl:text-gr-5xl short:mt-gr-sm short:text-gr-3xl"
                >
                  {hero.title}
                </h1>
              </div>

              <div
                data-reveal="scale"
                style={revealDelay(200)}
                className="-mx-gr-md sm:mx-0 lg:col-start-2 lg:row-span-2 lg:row-start-1"
              >
                <SystemMapCanvas className="aspect-[1.618] w-full lg:max-h-[calc(100svh-15rem)]" />
              </div>

              <div className="lg:self-start">
                <p
                  data-reveal
                  style={revealDelay(250)}
                  className="max-w-xl text-gr-lg leading-golden text-mist short:text-gr-base"
                >
                  {hero.description}
                </p>
                <div
                  data-reveal
                  style={revealDelay(320)}
                  className="mt-gr-lg flex flex-wrap items-center gap-x-gr-lg gap-y-gr-md whitespace-nowrap min-[380px]:flex-nowrap short:mt-gr-md"
                >
                  <Link href={href("/kontak")} className={`${buttonSun} px-gr-md`}>
                    {hero.primaryCta}
                  </Link>
                  <Link href={href("/layanan")} className={textLinkLight}>
                    {hero.secondaryCta}
                  </Link>
                </div>
              </div>
            </div>

            <div data-reveal style={revealDelay(400)} className="mt-gr-lg short:mt-gr-md">
              <SystemMapLegend />
            </div>
          </div>
        </SystemMapProvider>
      </Band>

      <Band tone="paper">
        <div className="mx-auto grid max-w-6xl gap-gr-xl px-gr-md py-gr-3xl sm:px-gr-lg lg:grid-cols-[1fr_1.618fr] lg:items-center lg:px-gr-xl">
          <div data-reveal="left">
            <Image
              src={facilityPhoto}
              alt={about.photoAlt}
              sizes="(min-width: 1024px) 540px, 100vw"
              placeholder="blur"
              className="aspect-[1.618] w-full rounded-xs object-cover"
            />
          </div>
          <div>
            <p data-reveal className="font-mono text-gr-xs font-medium text-blue">
              {home.aboutEyebrow}
            </p>
            <p
              data-reveal
              style={revealDelay(100)}
              className="display mt-gr-md text-gr-xl leading-gr-snug sm:text-gr-2xl"
            >
              {about.lead}
            </p>
            <Link
              data-reveal
              style={revealDelay(200)}
              href={href("/tentang")}
              className={`${textLink} mt-gr-lg inline-block`}
            >
              {home.aboutLink}
            </Link>
          </div>
        </div>
      </Band>

      <Band tone="teal">
        <dl className="mx-auto grid max-w-6xl grid-cols-3 px-gr-md py-gr-2xl sm:px-gr-lg lg:px-gr-xl">
          {stats.map((value, i) => (
            <div
              key={value}
              data-reveal
              style={revealDelay(i * 120)}
              className={`flex flex-col-reverse justify-end ${i ? "border-l-2 border-ink pl-gr-sm sm:pl-gr-lg" : "pr-gr-sm"}`}
            >
              <dt className="mt-gr-sm text-gr-base font-semibold sm:text-gr-base">{about.stats[i]}</dt>
              <dd className="display text-gr-xl sm:text-gr-5xl">
                <CountUp value={value} />
              </dd>
            </div>
          ))}
        </dl>
      </Band>

      <Band tone="paper">
        <div className="mx-auto max-w-6xl px-gr-md py-gr-3xl sm:px-gr-lg lg:px-gr-xl">
          <div data-reveal>
            <SectionTitle eyebrow={home.servicesEyebrow} title={home.servicesTitle} />
          </div>
          <ul className="mt-gr-xl grid gap-gr-md sm:grid-cols-2 lg:grid-cols-4">
            {serviceSlugs.map((slug, i) => {
              const service = dict.services[slug];
              const tone = serviceTone[slug];
              return (
                <li key={slug} data-reveal style={revealDelay(i * 110)}>
                  <Link
                    href={href(`/layanan#${slug}`)}
                    className={`group flex h-full flex-col sm:aspect-[1/1.618] rounded-xs p-gr-lg transition-transform duration-300 hover:-translate-y-1.5 ${tone.tile}`}
                  >
                    <span className="display text-gr-4xl opacity-90">{String(i + 1).padStart(2, "0")}</span>
                    <span className="display mt-auto pt-gr-xl text-gr-lg leading-gr-snug">{service.title}</span>
                    <span className={`mt-gr-sm text-gr-base leading-golden ${tone.muted}`}>{service.body}</span>
                    <span className="mt-gr-md font-mono text-gr-xs underline underline-offset-4 group-hover:no-underline">
                      {home.serviceDetail}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </Band>

      <Band tone="navy">
        <div className="mx-auto max-w-6xl px-gr-md py-gr-3xl sm:px-gr-lg lg:px-gr-xl">
          <div data-reveal className="flex flex-wrap items-end justify-between gap-gr-lg">
            <SectionTitle light eyebrow={home.projectsEyebrow} title={home.projectsTitle} />
            <Link href={href("/proyek")} className={textLinkLight}>
              {home.allProjects}
            </Link>
          </div>

          <div className="mt-gr-2xl grid gap-gr-xl lg:grid-cols-[1.618fr_1fr] lg:gap-gr-2xl">
            <article data-reveal="left">
              <p
                className={`inline-block rounded-xs px-gr-sm py-gr-xs font-mono text-gr-xs ${serviceTone[featured.service].chip}`}
              >
                {featured.category}
              </p>
              <h3 className="display mt-gr-md text-gr-2xl leading-gr-snug sm:text-gr-4xl">{featured.title}</h3>
              <p className="mt-gr-md max-w-lg text-gr-lg leading-golden text-mist">{featured.body}</p>
              <p className="mt-gr-lg font-mono text-gr-xs text-aqua">
                {home.status}: {featured.status}
              </p>
            </article>
            <div className="divide-y divide-white/15 border-y border-white/15">
              {others.map((project, i) => (
                <article key={project.id} data-reveal style={revealDelay(150 + i * 120)} className="py-gr-lg">
                  <p
                    className={`inline-block rounded-xs px-gr-sm py-gr-xs font-mono text-gr-xs ${serviceTone[project.service].chip}`}
                  >
                    {project.category}
                  </p>
                  <h3 className="mt-gr-md text-gr-lg font-semibold">{project.title}</h3>
                  <p className="mt-gr-sm leading-golden text-mist">{project.body}</p>
                  <p className="mt-gr-md font-mono text-gr-xs text-aqua">
                    {home.status}: {project.status} · {dict.services[project.service].title}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </Band>

      <Band tone="paper">
        <div className="mx-auto grid max-w-6xl gap-gr-xl px-gr-md py-gr-3xl sm:px-gr-lg lg:grid-cols-[1fr_1.618fr] lg:px-gr-xl">
          <div data-reveal>
            <SectionTitle eyebrow={home.complianceEyebrow} title={home.complianceTitle} />
            <p className="mt-gr-lg leading-golden text-ink-2">
              <strong className="font-semibold text-ink">{dict.safety.title}.</strong> {dict.safety.body}
            </p>
            <Link href={href("/sertifikasi")} className={`${textLink} mt-gr-lg inline-block`}>
              {home.complianceLink}
            </Link>
          </div>
          <dl className="border-t-2 border-ink">
            {certificationCodes.map((code, i) => (
              <div
                key={code}
                data-reveal
                style={revealDelay(i * 120)}
                className="grid gap-gr-xs border-b border-rule py-gr-lg sm:grid-cols-[1fr_1.618fr] sm:gap-gr-lg"
              >
                <dt className="display text-gr-lg">{code}</dt>
                <dd className="text-ink-2">{dict.certifications[i]}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Band>

      <CtaBand lang={lang} cta={dict.cta} />
    </>
  );
}
