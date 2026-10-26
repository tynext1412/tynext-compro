import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Band, revealDelay } from "@/components/band";
import { Icon, type IconName } from "@/components/icon";
import { PageHeader } from "@/components/page-header";
import { company, serviceSlugs } from "@/content/company";
import { alternatesFor, getDictionary, hasLocale } from "@/i18n";
import { ContactForm } from "./contact-form";

export async function generateMetadata({ params }: PageProps<"/[lang]/kontak">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = getDictionary(lang);
  return {
    title: dict.contactPage.metaTitle,
    description: dict.cta.body,
    alternates: alternatesFor(lang, "/kontak"),
  };
}

export default async function ContactPage({ params }: PageProps<"/[lang]/kontak">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);
  const { contactPage } = dict;

  const channels: { icon: IconName; label: string; value: string; href: string; external?: boolean }[] = [
    { icon: "map-pin", label: contactPage.office, value: company.office, href: company.mapsUrl, external: true },
    { icon: "mail", label: contactPage.email, value: company.email, href: `mailto:${company.email}` },
    { icon: "phone", label: contactPage.phone, value: company.phone, href: company.phoneHref },
  ];

  return (
    <>
      <PageHeader tone="teal" title={dict.cta.title} intro={dict.cta.body} />

      <Band tone="paper">
        <div className="mx-auto grid max-w-6xl gap-gr-2xl px-gr-md py-gr-2xl sm:px-gr-lg lg:grid-cols-[1fr_1.618fr] lg:px-gr-xl">
          <div data-reveal>
            <h2 className="font-mono text-gr-xs font-medium text-blue">{company.tagline}</h2>
            <ul className="mt-gr-lg border-t border-ink">
              {channels.map((channel) => (
                <li key={channel.label} className="border-b border-rule">
                  <a
                    href={channel.href}
                    {...(channel.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="group flex items-start gap-gr-md py-gr-md"
                  >
                    <Icon name={channel.icon} className="mt-gr-xs size-5 shrink-0 text-blue" />
                    <span>
                      <span className="block font-mono text-gr-xs text-ink-2">{channel.label}</span>
                      <span className="mt-gr-xs block text-gr-lg font-semibold text-ink group-hover:text-blue">
                        {channel.value}
                      </span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div data-reveal style={revealDelay(150)}>
            <h2 className="display text-gr-xl text-ink">{contactPage.formTitle}</h2>
            <div className="mt-gr-lg">
              <ContactForm labels={dict.form} serviceTitles={serviceSlugs.map((slug) => dict.services[slug].title)} />
            </div>
          </div>
        </div>
      </Band>
    </>
  );
}
