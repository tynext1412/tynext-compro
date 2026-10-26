import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Band, revealDelay } from "@/components/band";
import { PageHeader } from "@/components/page-header";
import { CtaBand, serviceTone } from "@/components/ui";
import { projectFacts } from "@/content/company";
import { alternatesFor, getDictionary, hasLocale, localePath } from "@/i18n";

export async function generateMetadata({ params }: PageProps<"/[lang]/proyek">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const { projectsPage } = getDictionary(lang);
  return {
    title: projectsPage.metaTitle,
    description: projectsPage.metaDescription,
    alternates: alternatesFor(lang, "/proyek"),
  };
}

export default async function ProjectsPage({ params }: PageProps<"/[lang]/proyek">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);
  const { projectsPage } = dict;

  return (
    <>
      <PageHeader tone="teal" title={projectsPage.title} intro={projectsPage.intro} />

      <Band tone="paper">
        <ol className="mx-auto max-w-6xl px-gr-md py-gr-xl sm:px-gr-lg lg:px-gr-xl">
          {projectFacts.map((fact, i) => {
            const project = dict.projects[fact.id];
            const service = dict.services[fact.service];
            const tone = serviceTone[fact.service];
            return (
              <li
                key={fact.id}
                className="grid gap-gr-lg border-b border-rule py-gr-2xl md:grid-cols-[1fr_2.618fr_1.618fr] md:gap-gr-xl"
              >
                <span
                  data-reveal="scale"
                  aria-hidden="true"
                  className={`display grid size-28 place-items-center rounded-xs text-gr-4xl md:size-36 md:text-gr-4xl ${tone.tile}`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <article data-reveal style={revealDelay(100)}>
                  <p className="font-mono text-gr-xs text-blue">{project.category}</p>
                  <h2 className="display mt-gr-sm text-gr-2xl leading-gr-snug sm:text-gr-2xl">{project.title}</h2>
                  <p className="mt-gr-md max-w-xl text-gr-lg leading-golden text-ink-2">{project.body}</p>
                </article>
                <dl
                  data-reveal
                  style={revealDelay(200)}
                  className="space-y-gr-md self-start border-t-2 border-ink pt-gr-md text-gr-base"
                >
                  <div>
                    <dt className="font-mono text-gr-xs text-ink-2">{projectsPage.status}</dt>
                    <dd className="mt-gr-xs flex items-center gap-gr-sm font-semibold">
                      {/* Penanda status: kotak terisi untuk kontrak yang masih berjalan, kotak garis untuk yang selesai. */}
                      <span
                        aria-hidden="true"
                        className={`size-2.5 ${fact.ongoing ? "bg-teal" : "border-2 border-ink"}`}
                      />
                      {project.status}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-mono text-gr-xs text-ink-2">{projectsPage.serviceLine}</dt>
                    <dd className="mt-gr-xs">
                      <Link
                        href={localePath(lang, `/layanan#${fact.service}`)}
                        className="font-semibold underline underline-offset-4 hover:text-blue"
                      >
                        {service.title}
                      </Link>
                    </dd>
                  </div>
                </dl>
              </li>
            );
          })}
        </ol>
      </Band>

      <CtaBand lang={lang} cta={dict.cta} />
    </>
  );
}
