import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Band, revealDelay } from "@/components/band";
import { PageHeader } from "@/components/page-header";
import { SolarTracker } from "@/components/three/solar-tracker";
import { CtaBand, SectionTitle, serviceTone } from "@/components/ui";
import { projectFacts, serviceSlugs } from "@/content/company";
import { alternatesFor, getDictionary, hasLocale, localePath } from "@/i18n";

export async function generateMetadata({ params }: PageProps<"/[lang]/layanan">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const { servicesPage } = getDictionary(lang);
  return {
    title: servicesPage.metaTitle,
    description: servicesPage.metaDescription,
    alternates: alternatesFor(lang, "/layanan"),
  };
}

export default async function ServicesPage({ params }: PageProps<"/[lang]/layanan">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);
  const { servicesPage } = dict;

  return (
    <>
      <PageHeader
        tone="lime"
        title={servicesPage.title}
        intro={servicesPage.intro}
        aside={<SolarTracker caption={servicesPage.solarCaption} className="aspect-[1.618] w-full" />}
      />

      <Band tone="paper">
        <div className="mx-auto max-w-6xl px-gr-md py-gr-2xl sm:px-gr-lg lg:px-gr-xl">
          {serviceSlugs.map((slug, i) => {
            const service = dict.services[slug];
            const related = projectFacts.filter((p) => p.service === slug);
            const tone = serviceTone[slug];
            return (
              <section
                key={slug}
                id={slug}
                aria-labelledby={`${slug}-title`}
                className="grid gap-gr-lg py-gr-lg lg:grid-cols-[1fr_1.618fr] lg:gap-gr-2xl"
              >
                <div
                  data-reveal="left"
                  className={`flex aspect-[1.618] min-w-0 flex-col rounded-xs p-gr-lg sm:p-gr-xl ${tone.tile}`}
                >
                  <span className="display text-gr-5xl" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className={`mt-auto pt-gr-lg font-mono text-gr-xs ${tone.muted}`}>{service.code}</p>
                  <h2 id={`${slug}-title`} className="display mt-gr-sm text-gr-2xl leading-gr-snug">
                    {service.title}
                  </h2>
                </div>
                <div data-reveal style={revealDelay(150)} className="self-center">
                  <p className="text-gr-lg leading-golden text-ink-2">{service.body}</p>
                  <ul className="mt-gr-lg grid gap-x-gr-lg sm:grid-cols-2">
                    {service.scope.map((item) => (
                      <li key={item} className="flex gap-gr-sm border-t border-rule py-gr-sm">
                        <span aria-hidden="true" className="mt-gr-sm size-2 shrink-0 bg-teal" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  {related.map((project) => (
                    <p key={project.id} className="mt-gr-lg text-gr-base text-ink-2">
                      {servicesPage.relatedProject}{" "}
                      <Link
                        href={localePath(lang, "/proyek")}
                        className="font-semibold text-ink underline underline-offset-4 hover:text-blue"
                      >
                        {dict.projects[project.id].title}
                      </Link>
                    </p>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </Band>

      <Band tone="navy">
        <div className="mx-auto max-w-6xl px-gr-md py-gr-3xl sm:px-gr-lg lg:px-gr-xl">
          <div data-reveal>
            <SectionTitle light eyebrow={servicesPage.pillarsEyebrow} title={servicesPage.pillarsTitle} />
          </div>
          <div className="mt-gr-xl grid gap-gr-xl md:grid-cols-2">
            {dict.pillars.map((pillar, i) => (
              <article key={pillar.title} data-reveal style={revealDelay(i * 150)}>
                <p
                  className={`inline-block rounded-xs px-gr-sm py-gr-xs font-mono text-gr-xs text-ink ${i ? "bg-aqua" : "bg-lime"}`}
                >
                  {pillar.code}
                </p>
                <h3 className="display mt-gr-md text-gr-2xl">{pillar.title}</h3>
                <p className="mt-gr-sm leading-golden text-mist">{pillar.body}</p>
                <ul className="mt-gr-lg border-t border-white/20">
                  {pillar.items.map((item) => (
                    <li key={item} className="border-b border-white/20 py-gr-md">
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </Band>

      <CtaBand lang={lang} cta={dict.cta} />
    </>
  );
}
