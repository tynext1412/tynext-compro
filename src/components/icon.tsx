import type { ReactNode } from "react";

// Ikon digambar sendiri dengan ujung garis persegi, mengikuti gaya gambar teknik.
const paths = {
  "shield-check": <path d="M12 2.5l8 3v6.3c0 4.6-3.4 8.5-8 9.7-4.6-1.2-8-5.1-8-9.7V5.5zM8.5 12l2.5 2.5 4.5-5" />,
  "map-pin": (
    <>
      <path d="M12 21.5s-7-6.2-7-11.7a7 7 0 0 1 14 0c0 5.5-7 11.7-7 11.7z" />
      <circle cx="12" cy="9.8" r="2.5" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="1.5" />
      <path d="M3.5 6l8.5 7 8.5-7" />
    </>
  ),
  phone: (
    <path d="M5 3.5h3.5L10 8l-2.2 1.4a11 11 0 0 0 6.8 6.8L16 14l4.5 1.5V19a1.5 1.5 0 0 1-1.6 1.5C10.3 20 4 13.7 3.5 5.1A1.5 1.5 0 0 1 5 3.5z" />
  ),
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="M6 6l12 12M18 6L6 18" />,
} satisfies Record<string, ReactNode>;

export type IconName = keyof typeof paths;

export function Icon({ name, className }: { name: IconName; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="square"
      strokeLinejoin="miter"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      {paths[name]}
    </svg>
  );
}
