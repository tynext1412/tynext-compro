import Link from "next/link";
import { lang as rootLang } from "next/root-params";
import { Band } from "@/components/band";
import { buttonDeep, textLink } from "@/components/ui";
import { defaultLocale, getDictionary, hasLocale, localePath } from "@/i18n";

// not-found tidak menerima params; bahasa dibaca lewat root param supaya teks langsung dirender di server.
export default async function NotFound() {
  const value = await rootLang();
  const lang = value && hasLocale(value) ? value : defaultLocale;
  const { notFound } = getDictionary(lang);

  return (
    <Band tone="lime">
      <div className="mx-auto max-w-6xl px-gr-md pt-[calc(var(--header-h)+var(--spacing-gr-2xl))] pb-gr-3xl sm:px-gr-lg lg:px-gr-xl">
        <p className="font-mono text-gr-xs">Error 404</p>
        <h1 className="display mt-gr-md text-gr-2xl text-ink sm:text-gr-4xl">{notFound.title}</h1>
        <p className="mt-gr-md max-w-lg text-gr-lg leading-golden">{notFound.body}</p>
        <div className="mt-gr-xl flex flex-wrap items-center gap-x-gr-lg gap-y-gr-md">
          <Link href={localePath(lang, "/")} className={buttonDeep}>
            {notFound.home}
          </Link>
          <Link href={localePath(lang, "/layanan")} className={textLink}>
            {notFound.services}
          </Link>
        </div>
      </div>
    </Band>
  );
}
