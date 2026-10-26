import type { Metadata } from "next";
import { Band, revealDelay } from "@/components/band";
import { Icon } from "@/components/icon";
import { PageHeader } from "@/components/page-header";
import { CtaBand } from "@/components/ui";
import { certifications, safety } from "@/content/company";

export const metadata: Metadata = {
  title: "K3 & Mutu",
  description: "Sertifikasi ISO 9001:2015, ISO 45001:2018, BUJK, dan kebijakan Zero Harm TYNEXT.",
};

export default function CertificationsPage() {
  return (
    <>
      <PageHeader
        tone="deep"
        title="Sertifikasi & Standar Keselamatan"
        intro="Sistem manajemen mutu, keselamatan kerja, dan perizinan yang menjadi dasar setiap pekerjaan lapangan kami."
      />

      <Band tone="paper">
        <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:px-8">
          <h2 data-reveal className="font-mono text-xs font-medium text-arc-ink">
            Kepatuhan & Mutu
          </h2>
          <dl className="mt-6 border-t-2 border-ink">
            {certifications.map((cert, i) => (
              <div
                key={cert.code}
                data-reveal
                style={revealDelay(i * 120)}
                className="grid gap-2 border-b border-rule py-9 md:grid-cols-[1fr_1.4fr] md:gap-10"
              >
                <dt className="display text-3xl sm:text-4xl">{cert.code}</dt>
                <dd className="text-lg leading-relaxed text-ink-2 md:pt-2">{cert.body}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Band>

      <Band tone="arc">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-24 sm:px-6 md:grid-cols-[auto_1fr] md:gap-14 lg:px-8">
          <div data-reveal="scale">
            <Icon name="shield-check" className="size-20" />
          </div>
          <div data-reveal style={revealDelay(120)}>
            <h2 className="display text-4xl sm:text-6xl">{safety.title}</h2>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed">{safety.body}</p>
          </div>
        </div>
      </Band>

      <CtaBand />
    </>
  );
}
