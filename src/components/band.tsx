import type { ComponentProps, CSSProperties } from "react";

export type Tone = "paper" | "paper-2" | "deep" | "night" | "sun" | "arc";

const text: Record<Tone, string> = {
  paper: "text-ink",
  "paper-2": "text-ink",
  deep: "text-paper",
  night: "text-paper",
  sun: "text-ink",
  arc: "text-ink",
};

/**
 * Section dengan warna latar. `data-tone` dibaca EnergyField untuk menyesuaikan warna arus,
 * `lines={false}` mematikan arus di section yang sudah punya adegan 3D sendiri.
 */
export function Band({
  tone,
  lines = true,
  className = "",
  ...props
}: { tone: Tone; lines?: boolean } & ComponentProps<"section">) {
  return (
    <section
      data-tone={tone}
      data-lines={lines ? undefined : "off"}
      className={`${text[tone]} ${className}`}
      {...props}
    />
  );
}

// Jeda animasi reveal untuk elemen berurutan.
export const revealDelay = (ms: number) => ({ "--reveal-delay": `${ms}ms` }) as CSSProperties;
