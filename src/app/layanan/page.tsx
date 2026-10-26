import type { Metadata } from "next";
import Link from "next/link";
import { Band, revealDelay } from "@/components/band";
import { PageHeader } from "@/components/page-header";
import { SolarTracker } from "@/components/three/solar-tracker";
import { CtaBand, SectionTitle, serviceTone } from "@/components/ui";
import { pillars, projects, services } from "@/content/company";

export const metadata: Metadata = {
  title: "Layanan",
  description:
    "Engineering & design, system integration, renewable energy EPC, serta operation & maintenance untuk sistem kelistrikan dan otomasi.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        tone="sun"
        title="Layanan & Spesialisasi Teknik"
        intro="Dari studi kelayakan hingga pemeliharaan aset, satu tim menangani rekayasa kelistrikan, sistem kontrol, dan energi terbarukan."
        aside={<SolarTracker className="h-72 w-full sm:h-96" />}
      />

      <Band tone="paper">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          {services.map((service, i) => {
            const related = projects.filter((p) => p.service === service.slug);
            const tone = serviceTone[service.slug];
            return (
              <section
                key={service.slug}
                id={service.slug}
                aria-labelledby={`${service.slug}-title`}
                className="grid gap-8 py-8 lg:grid-cols-[1fr_1.3fr] lg:gap-14"
              >
                <div data-reveal="left" className={`flex min-h-64 flex-col rounded-xs p-7 sm:p-9 ${tone.tile}`}>
                  <span className="display text-7xl" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className={`mt-auto pt-8 font-mono text-xs ${tone.muted}`}>{service.code}</p>
                  <h2 id={`${service.slug}-title`} className="display mt-2 text-3xl leading-tight">
                    {service.title}
                  </h2>
                </div>
                <div data-reveal style={revealDelay(150)} className="self-center">
                  <p className="text-lg leading-relaxed text-ink-2">{service.body}</p>
                  <ul className="mt-8 grid gap-x-8 sm:grid-cols-2">
                    {service.scope.map((item) => (
                      <li key={item} className="flex gap-3 border-t border-rule py-3">
                        <span aria-hidden="true" className="mt-2 size-2 shrink-0 bg-arc" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  {related.map((project) => (
                    <p key={project.title} className="mt-6 text-sm text-ink-2">
                      Proyek terkait:{" "}
                      <Link
                        href="/proyek"
                        className="font-semibold text-ink underline underline-offset-4 hover:text-arc-ink"
                      >
                        {project.title}
                      </Link>
                    </p>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </Band>

      <Band tone="deep">
        <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:px-8">
          <div data-reveal>
            <SectionTitle light eyebrow="Ekosistem Solusi" title="Dua Pilar Utama Solusi TYNEXT" />
          </div>
          <div className="mt-12 grid gap-12 md:grid-cols-2">
            {pillars.map((pillar, i) => (
              <article key={pillar.title} data-reveal style={revealDelay(i * 150)}>
                <p
                  className={`inline-block rounded-xs px-2.5 py-1 font-mono text-xs text-ink ${i ? "bg-mint" : "bg-sun"}`}
                >
                  {pillar.code}
                </p>
                <h3 className="display mt-4 text-3xl">{pillar.title}</h3>
                <p className="mt-3 leading-relaxed text-mist">{pillar.body}</p>
                <ul className="mt-8 border-t border-white/20">
                  {pillar.items.map((item) => (
                    <li key={item} className="border-b border-white/20 py-3.5">
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </Band>

      <CtaBand />
    </>
  );
}
