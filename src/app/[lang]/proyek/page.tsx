import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Band, revealDelay } from "@/components/band";
import { PageHeader } from "@/components/page-header";
import { CtaBand, serviceTone } from "@/components/ui";
import { projectFacts } from "@/content/company";
import { projectImages } from "@/content/project-images";
import type { ProjectText } from "@/content/dictionaries/id";
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
            const project: ProjectText = dict.projects[fact.id];
            const tone = serviceTone[fact.services[0]];
            return (
              <li
                key={fact.id}
                className="grid gap-gr-lg border-b border-rule py-gr-2xl lg:grid-cols-[1fr_1.618fr] lg:gap-gr-xl"
              >
                <figure data-reveal="scale" className="relative min-w-0 self-start">
                  <Image
                    src={projectImages[fact.id]}
                    alt={project.imageAlt}
                    sizes="(min-width: 1024px) 400px, 100vw"
                    placeholder="blur"
                    className="aspect-[1.618] w-full rounded-xs object-cover"
                  />
                  <span
                    aria-hidden="true"
                    className={`display absolute top-0 left-0 grid size-16 place-items-center rounded-tl-xs rounded-br-xs text-gr-2xl ${tone.tile}`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </figure>
                <article data-reveal style={revealDelay(100)}>
                  <p className="font-mono text-gr-xs text-blue">{project.category}</p>
                  <h2 className="display mt-gr-sm text-gr-2xl leading-gr-snug">{project.title}</h2>
                  <p className="mt-gr-md text-gr-lg leading-golden text-ink-2">{project.body}</p>
                  <dl className="mt-gr-lg grid gap-gr-md border-t-2 border-ink pt-gr-md text-gr-base sm:grid-cols-3">
                    <div>
                      <dt className="font-mono text-gr-xs text-ink-2">
                        {project.company ? projectsPage.company : projectsPage.location}
                      </dt>
                      <dd className="mt-gr-xs font-semibold">{project.company ?? project.location}</dd>
                    </div>
                    <div>
                      <dt className="font-mono text-gr-xs text-ink-2">{projectsPage.technology}</dt>
                      <dd className="mt-gr-xs">{project.technology}</dd>
                    </div>
                    <div>
                      <dt className="font-mono text-gr-xs text-ink-2">{projectsPage.serviceLine}</dt>
                      {fact.services.map((slug) => (
                        <dd key={slug} className="mt-gr-xs">
                          <Link
                            href={localePath(lang, `/layanan#${slug}`)}
                            className="font-semibold underline underline-offset-4 hover:text-blue"
                          >
                            {dict.services[slug].title}
                          </Link>
                        </dd>
                      ))}
                    </div>
                  </dl>
                </article>
              </li>
            );
          })}
        </ol>
      </Band>

      <CtaBand lang={lang} cta={dict.cta} />
    </>
  );
}
