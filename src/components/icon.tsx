import type { ReactNode } from "react";

// Ikon digambar sendiri dengan ujung garis persegi, mengikuti gaya gambar teknik.
const paths = {
  "shield-check": <path d="M12 2.5l8 3v6.3c0 4.6-3.4 8.5-8 9.7-4.6-1.2-8-5.1-8-9.7V5.5zM8.5 12l2.5 2.5 4.5-5" />,
  sites: <path d="M3 6l6-2.5 6 2.5 6-2.5v14.5l-6 2.5-6-2.5-6 2.5zM9 3.5V18M15 6v14.5" />,
  gauge: (
    <>
      <path d="M3.5 17.5a8.5 8.5 0 1 1 17 0M12 17.5l4.5-5.5M5.5 11.5l1.4.8M12 5.5V7M18.5 11.5l-1.4.8" />
      <circle cx="12" cy="17.5" r="1.2" />
    </>
  ),
  report: <path d="M5.5 2.5h9L19 7v14.5H5.5zM14 2.5V7.5h5M9 12h6.5M9 15.5h6.5M9 19h4" />,
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
  search: (
    <>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="M15.5 15.5l5 5" />
    </>
  ),
  columns: <path d="M4 7h9M17 7h3M4 17h3M11 17h9M15 4.5v5M9 14.5v5" />,
  download: <path d="M12 3.5v12M7 11l5 5 5-5M4 20.5h16" />,
  external: <path d="M13.5 4h6.5v6.5M20 4l-9 9M17 13.5V20H4V7h6.5" />,
  "sort-none": <path d="M8 9.5l4-4 4 4M8 14.5l4 4 4-4" />,
  "sort-asc": <path d="M12 19V5.5M7 10l5-5 5 5" />,
  "sort-desc": <path d="M12 5v13.5M7 14l5 5 5-5" />,
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
