import Link from "next/link";
import { company, routes } from "@/content/company";
import { localePath, type Dictionary, type Locale } from "@/i18n";
import { Wordmark } from "./wordmark";

export function SiteFooter({ lang, nav }: { lang: Locale; nav: Dictionary["nav"] }) {
  return (
    <footer data-tone="night" className="text-paper">
      <div className="mx-auto grid max-w-6xl gap-gr-xl px-gr-md py-gr-2xl sm:px-gr-lg md:grid-cols-[1.618fr_1fr_1fr] lg:px-gr-xl">
        <div>
          <Wordmark className="h-gr-2xl" />
          <p className="mt-gr-md max-w-xs text-gr-base leading-golden text-mist">{company.tagline}.</p>
        </div>

        <nav aria-label={nav.footerNav}>
          <ul className="grid grid-cols-2 gap-x-gr-lg gap-y-gr-xs text-gr-base">
            {routes.map((route) => (
              <li key={route.key}>
                <Link
                  href={localePath(lang, route.href)}
                  className="inline-flex min-h-9 items-center text-mist hover:text-lime"
                >
                  {nav.labels[route.key]}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <address className="space-y-gr-sm text-gr-base not-italic">
          <p className="text-mist">{company.office}</p>
          <p>
            <a href={`mailto:${company.email}`} className="hover:text-lime">
              {company.email}
            </a>
          </p>
          <p>
            <a href={company.phoneHref} className="hover:text-lime">
              {company.phone}
            </a>
          </p>
        </address>
      </div>

      <div className="border-t border-white/10">
        <p className="mx-auto max-w-6xl px-gr-md py-gr-md font-mono text-gr-xs text-mist sm:px-gr-lg lg:px-gr-xl">
          © 2026 {company.legalName} · {company.website}
        </p>
      </div>
    </footer>
  );
}
