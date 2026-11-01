import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Band, revealDelay } from "@/components/band";
import { Icon, type IconName } from "@/components/icon";
import { PageHeader } from "@/components/page-header";
import { CtaBand, buttonDeep } from "@/components/ui";
import { company } from "@/content/company";
import { alternatesFor, getDictionary, hasLocale } from "@/i18n";
// Sementara di-crop dari slide deck (resolusi rendah). Ganti dengan tangkapan layar asli resolusi tinggi.
import dashboardShot from "@/assets/platform-dashboard.png";

export async function generateMetadata({ params }: PageProps<"/[lang]/platform">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const { platformPage } = getDictionary(lang);
  return {
    title: platformPage.metaTitle,
    description: platformPage.metaDescription,
    alternates: alternatesFor(lang, "/platform"),
  };
}

// Urutan mengikuti platformPage.features di kamus.
const featureIcon: IconName[] = ["sites", "gauge", "report"];

export default async function PlatformPage({ params }: PageProps<"/[lang]/platform">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);
  const { platformPage } = dict;

  const screenshot = (
    <Image
      src={dashboardShot}
      alt={platformPage.screenshotAlt}
      sizes="(min-width: 1024px) 680px, 100vw"
      placeholder="blur"
      className="w-full rounded-xs border border-rule shadow-[0_1.618rem_4.236rem_-1.618rem_rgb(14_40_70/0.35)] transition-transform duration-300 group-hover:-translate-y-1 motion-reduce:transition-none"
    />
  );

  return (
    <>
      <PageHeader tone="navy" title={platformPage.title} intro={platformPage.intro} />

      <Band tone="paper">
        <div className="mx-auto grid max-w-6xl gap-gr-xl px-gr-md py-gr-3xl sm:px-gr-lg lg:grid-cols-[1fr_1.618fr] lg:items-center lg:px-gr-xl">
          <div>
            <h2 data-reveal className="font-mono text-gr-xs font-medium text-blue">
              {platformPage.featuresLabel}
            </h2>
            <ul className="mt-gr-lg border-t-2 border-ink">
              {platformPage.features.map((feature, i) => (
                <li
                  key={feature.title}
                  data-reveal
                  style={revealDelay(i * 120)}
                  className="grid grid-cols-[auto_1fr] gap-gr-md border-b border-rule py-gr-lg"
                >
                  <span className="flex size-12 items-center justify-center rounded-xs bg-navy text-lime">
                    <Icon name={featureIcon[i]} className="size-6" />
                  </span>
                  <div>
                    <h3 className="display text-gr-lg">{feature.title}</h3>
                    <p className="mt-gr-xs leading-golden text-ink-2">{feature.body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <figure data-reveal="scale" style={revealDelay(200)} className="min-w-0">
            {company.platformUrl ? (
              <a
                href={company.platformUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={platformPage.open}
                className="group block rounded-xs"
              >
                {screenshot}
              </a>
            ) : (
              screenshot
            )}
            {company.platformUrl && (
              <figcaption className="mt-gr-lg flex flex-wrap items-center gap-x-gr-md gap-y-gr-sm">
                <a
                  href={company.platformUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${buttonDeep} gap-gr-sm`}
                >
                  {platformPage.open}
                  <Icon name="external" className="size-4" />
                </a>
                <span className="font-mono text-gr-xs text-ink-2">{new URL(company.platformUrl).host}</span>
              </figcaption>
            )}
          </figure>
        </div>
      </Band>

      <CtaBand lang={lang} cta={dict.cta} />
    </>
  );
}
