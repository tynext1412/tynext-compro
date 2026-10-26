import Link from "next/link";
import { company, pages } from "@/content/company";
import { Wordmark } from "./wordmark";

export function SiteFooter() {
  return (
    <footer data-tone="night" className="text-paper">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr] lg:px-8">
        <div>
          <Wordmark />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-mist">{company.tagline}.</p>
        </div>

        <nav aria-label="Halaman">
          <ul className="grid grid-cols-2 gap-x-6 gap-y-1 text-sm">
            {pages.map((page) => (
              <li key={page.href}>
                <Link href={page.href} className="inline-flex min-h-9 items-center text-mist hover:text-sun">
                  {page.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <address className="space-y-2 text-sm not-italic">
          <p className="text-mist">{company.office}</p>
          <p>
            <a href={`mailto:${company.email}`} className="hover:text-sun">
              {company.email}
            </a>
          </p>
          <p>
            <a href={company.phoneHref} className="hover:text-sun">
              {company.phone}
            </a>
          </p>
        </address>
      </div>

      <div className="border-t border-white/10">
        <p className="mx-auto max-w-6xl px-4 py-5 font-mono text-xs text-mist sm:px-6 lg:px-8">
          © 2026 {company.legalName} · {company.website}
        </p>
      </div>
    </footer>
  );
}
