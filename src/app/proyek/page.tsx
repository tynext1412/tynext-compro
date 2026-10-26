import type { Metadata } from "next";
import Link from "next/link";
import { Band, revealDelay } from "@/components/band";
import { PageHeader } from "@/components/page-header";
import { CtaBand, serviceTone } from "@/components/ui";
import { projects, serviceBySlug } from "@/content/company";

export const metadata: Metadata = {
  title: "Proyek",
  description: "Portofolio proyek TYNEXT: microgrid hybrid surya-baterai, upgrade SCADA & RTU 20 kV, serta O&M PLTS.",
};

export default function ProjectsPage() {
  return (
    <>
      <PageHeader
        tone="arc"
        title="Pengalaman Proyek Unggulan"
        intro="Proyek microgrid, SCADA, dan pemeliharaan PLTS yang sudah beroperasi atau sedang kami tangani."
      />

      <Band tone="paper">
        <ol className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          {projects.map((project, i) => {
            const service = serviceBySlug(project.service);
            const tone = serviceTone[project.service];
            return (
              <li
                key={project.title}
                className="grid gap-6 border-b border-rule py-14 md:grid-cols-[10rem_1fr_16rem] md:gap-10"
              >
                <span
                  data-reveal="scale"
                  aria-hidden="true"
                  className={`display grid size-28 place-items-center rounded-xs text-5xl md:size-36 md:text-6xl ${tone.tile}`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <article data-reveal style={revealDelay(100)}>
                  <p className="font-mono text-xs text-arc-ink">{project.category}</p>
                  <h2 className="display mt-3 text-3xl leading-tight sm:text-4xl">{project.title}</h2>
                  <p className="mt-4 max-w-xl text-lg leading-relaxed text-ink-2">{project.body}</p>
                </article>
                <dl
                  data-reveal
                  style={revealDelay(200)}
                  className="space-y-5 self-start border-t-2 border-ink pt-4 text-sm"
                >
                  <div>
                    <dt className="font-mono text-xs text-ink-2">Status</dt>
                    <dd className="mt-1 flex items-center gap-2 font-semibold">
                      {/* Penanda status: kotak terisi untuk kontrak yang masih berjalan, kotak garis untuk yang selesai. */}
                      <span
                        aria-hidden="true"
                        className={`size-2.5 ${project.ongoing ? "bg-arc" : "border-2 border-ink"}`}
                      />
                      {project.status}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-mono text-xs text-ink-2">Lini layanan</dt>
                    <dd className="mt-1">
                      <Link
                        href={`/layanan#${service.slug}`}
                        className="font-semibold underline underline-offset-4 hover:text-arc-ink"
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

      <CtaBand />
    </>
  );
}
