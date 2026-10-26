import type { Metadata } from "next";
import { Icon, type IconName } from "@/components/icon";
import { Band, revealDelay } from "@/components/band";
import { PageHeader } from "@/components/page-header";
import { company, contact } from "@/content/company";
import { ContactForm } from "./contact-form";

export const metadata: Metadata = {
  title: "Kontak",
  description: contact.body,
};

const channels: { icon: IconName; label: string; value: string; href: string; external?: boolean }[] = [
  { icon: "map-pin", label: "Kantor Pusat", value: company.office, href: company.mapsUrl, external: true },
  { icon: "mail", label: "Email Inquiry", value: company.email, href: `mailto:${company.email}` },
  { icon: "phone", label: "Telepon", value: company.phone, href: company.phoneHref },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader tone="arc" title={contact.title} intro={contact.body} />

      <Band tone="paper">
        <div className="mx-auto grid max-w-6xl gap-14 px-4 py-20 sm:px-6 lg:grid-cols-[1fr_1.6fr] lg:px-8">
          <div data-reveal>
            <h2 className="font-mono text-xs font-medium text-arc-ink">{company.tagline}</h2>
            <ul className="mt-6 border-t border-ink">
              {channels.map((channel) => (
                <li key={channel.label} className="border-b border-rule">
                  <a
                    href={channel.href}
                    {...(channel.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="group flex items-start gap-4 py-5"
                  >
                    <Icon name={channel.icon} className="mt-0.5 size-5 shrink-0 text-arc-ink" />
                    <span>
                      <span className="block font-mono text-xs text-ink-2">{channel.label}</span>
                      <span className="mt-1 block text-lg font-semibold text-ink group-hover:text-arc-ink">
                        {channel.value}
                      </span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div data-reveal style={revealDelay(150)}>
            <h2 className="display text-2xl text-ink">Ceritakan kebutuhan proyek Anda</h2>
            <div className="mt-8">
              <ContactForm />
            </div>
          </div>
        </div>
      </Band>
    </>
  );
}
