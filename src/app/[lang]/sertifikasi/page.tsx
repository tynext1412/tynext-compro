import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Band, revealDelay } from "@/components/band";
import { Icon } from "@/components/icon";
import { PageHeader } from "@/components/page-header";
import { CtaBand } from "@/components/ui";
import { certificationCodes } from "@/content/company";
import { alternatesFor, getDictionary, hasLocale } from "@/i18n";

export async function generateMetadata({ params }: PageProps<"/[lang]/sertifikasi">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const { certificationsPage } = getDictionary(lang);
  return {
    title: certificationsPage.metaTitle,
    description: certificationsPage.metaDescription,
    alternates: alternatesFor(lang, "/sertifikasi"),
  };
}

export default async function CertificationsPage({ params }: PageProps<"/[lang]/sertifikasi">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);
  const { certificationsPage, safety } = dict;

  return (
    <>
      <PageHeader tone="navy" title={certificationsPage.title} intro={certificationsPage.intro} />

      <Band tone="paper">
        <div className="mx-auto max-w-6xl px-gr-md py-gr-3xl sm:px-gr-lg lg:px-gr-xl">
          <h2 data-reveal className="font-mono text-gr-xs font-medium text-blue">
            {certificationsPage.sectionLabel}
          </h2>
          <dl className="mt-gr-lg border-t-2 border-ink">
            {certificationCodes.map((code, i) => (
              <div
                key={code}
                data-reveal
                style={revealDelay(i * 120)}
                className="grid gap-gr-sm border-b border-rule py-gr-xl md:grid-cols-[1fr_1.618fr] md:gap-gr-xl"
              >
                <dt className="display text-gr-2xl sm:text-gr-2xl">{code}</dt>
                <dd className="text-gr-lg leading-golden text-ink-2 md:pt-gr-sm">{dict.certifications[i]}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Band>

      <Band tone="teal">
        <div className="mx-auto grid max-w-6xl gap-gr-lg px-gr-md py-gr-3xl sm:px-gr-lg md:grid-cols-[auto_1fr] md:gap-gr-2xl lg:px-gr-xl">
          <div data-reveal="scale">
            <Icon name="shield-check" className="size-20" />
          </div>
          <div data-reveal style={revealDelay(120)}>
            <h2 className="display text-gr-2xl sm:text-gr-4xl">{safety.title}</h2>
            <p className="mt-gr-md max-w-2xl text-gr-lg leading-golden">{safety.body}</p>
          </div>
        </div>
      </Band>

      <CtaBand lang={lang} cta={dict.cta} />
    </>
  );
}
