import type { ReactNode } from "react";
import { Band, revealDelay, type Tone } from "./band";

const introTone: Partial<Record<Tone, string>> = { deep: "text-mist", "paper-2": "text-ink-2" };

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
        className={`mx-auto grid max-w-6xl gap-10 px-4 pt-16 pb-14 sm:px-6 sm:pt-24 lg:px-8 ${aside ? "lg:grid-cols-[1.15fr_1fr] lg:items-end" : ""}`}
      >
        <div>
          <h1 data-reveal className="display max-w-4xl text-[2.6rem] leading-[1.02] sm:text-6xl lg:text-7xl">
            {title}
          </h1>
          <p
            data-reveal
            style={revealDelay(120)}
            className={`mt-6 max-w-xl text-lg leading-relaxed ${introTone[tone] ?? ""}`}
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
