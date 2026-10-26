import type { ReactNode } from "react";
import { Band, revealDelay, type Tone } from "./band";

const introTone: Partial<Record<Tone, string>> = { navy: "text-mist", "paper-2": "text-ink-2" };

export function PageHeader({
  title,
  intro,
  tone,
  aside,
}: {
  title: string;
  intro: string;
  tone: Tone;
  aside?: ReactNode;
}) {
  return (
    <Band tone={tone} lines={!aside}>
      <div
        className={`mx-auto grid max-w-6xl gap-gr-xl px-gr-md pt-[calc(var(--header-h)+var(--spacing-gr-xl))] pb-gr-2xl sm:px-gr-lg sm:pt-[calc(var(--header-h)+var(--spacing-gr-2xl))] lg:px-gr-xl ${aside ? "lg:grid-cols-[1.618fr_1fr] lg:items-end" : ""}`}
      >
        <div>
          <h1 data-reveal className="display max-w-4xl text-gr-3xl leading-gr-tight sm:text-gr-4xl lg:text-gr-5xl">
            {title}
          </h1>
          <p
            data-reveal
            style={revealDelay(120)}
            className={`mt-gr-lg max-w-xl text-gr-lg leading-golden ${introTone[tone] ?? ""}`}
          >
            {intro}
          </p>
        </div>
        {aside && (
          <div data-reveal="scale" style={revealDelay(220)} className="flex w-full lg:justify-end">
            {aside}
          </div>
        )}
      </div>
    </Band>
  );
}
