"use client";

import { useState, type FormEvent } from "react";
import { buttonDeep } from "@/components/ui";
import { company } from "@/content/company";
import type { Dictionary } from "@/i18n";

type Field = "name" | "email" | "message";
type Errors = Partial<Record<Field, string>>;

const inputClass =
  "mt-gr-sm block w-full rounded-xs border border-rule bg-white px-gr-sm py-gr-sm text-ink placeholder:text-ink-2 focus-visible:border-teal aria-[invalid=true]:border-blue";

function validate(data: FormData, text: Dictionary["form"]["errors"]): Errors {
  const errors: Errors = {};
  if (!String(data.get("name")).trim()) errors.name = text.nameRequired;
  const email = String(data.get("email")).trim();
  if (!email) errors.email = text.emailRequired;
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = text.emailInvalid;
  if (String(data.get("message")).trim().length < 10) errors.message = text.messageShort;
  return errors;
}

// Belum ada backend: formulir menyusun email lalu membuka aplikasi email pengunjung.
export function ContactForm({ labels, serviceTitles }: { labels: Dictionary["form"]; serviceTitles: string[] }) {
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const found = validate(data, labels.errors);
    setErrors(found);
    setSent(false);
    const first = Object.keys(found)[0];
    if (first) {
      e.currentTarget.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    const company_ = String(data.get("company")).trim();
    const service = String(data.get("service"));
    const subject = `${labels.mail.subject}: ${service}${company_ ? ` (${company_})` : ""}`;
    const body = [
      String(data.get("message")).trim(),
      "",
      `${labels.mail.name}: ${String(data.get("name")).trim()}`,
      company_ && `${labels.mail.company}: ${company_}`,
      `${labels.mail.email}: ${String(data.get("email")).trim()}`,
    ]
      .filter((line) => line !== "")
      .join("\n");

    window.location.href = `mailto:${company.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  const describe = (field: Field) => (errors[field] ? `${field}-error` : undefined);

  return (
    <form noValidate onSubmit={onSubmit} className="grid gap-gr-lg sm:grid-cols-2">
      <label className="block text-gr-base font-semibold text-ink">
        {labels.name}
        <input
          name="name"
          autoComplete="name"
          className={inputClass}
          aria-invalid={!!errors.name}
          aria-describedby={describe("name")}
        />
        {errors.name && (
          <span id="name-error" className="mt-gr-xs block font-normal text-blue">
            {errors.name}
          </span>
        )}
      </label>

      <label className="block text-gr-base font-semibold text-ink">
        {labels.company} <span className="font-normal text-ink-2">{labels.optional}</span>
        <input name="company" autoComplete="organization" className={inputClass} />
      </label>

      <label className="block text-gr-base font-semibold text-ink">
        {labels.email}
        <input
          name="email"
          type="email"
          autoComplete="email"
          placeholder={labels.emailPlaceholder}
          className={inputClass}
          aria-invalid={!!errors.email}
          aria-describedby={describe("email")}
        />
        {errors.email && (
          <span id="email-error" className="mt-gr-xs block font-normal text-blue">
            {errors.email}
          </span>
        )}
      </label>

      <label className="block text-gr-base font-semibold text-ink">
        {labels.service}
        <select name="service" className={inputClass} defaultValue={serviceTitles[0]}>
          {serviceTitles.map((title) => (
            <option key={title}>{title}</option>
          ))}
          <option>{labels.otherService}</option>
        </select>
      </label>

      <label className="block text-gr-base font-semibold text-ink sm:col-span-2">
        {labels.message}
        <textarea
          name="message"
          rows={5}
          placeholder={labels.messagePlaceholder}
          className={inputClass}
          aria-invalid={!!errors.message}
          aria-describedby={describe("message")}
        />
        {errors.message && (
          <span id="message-error" className="mt-gr-xs block font-normal text-blue">
            {errors.message}
          </span>
        )}
      </label>

      <div className="sm:col-span-2">
        <button type="submit" className={buttonDeep}>
          {labels.submit}
        </button>
        <p className="mt-gr-sm text-gr-base text-ink-2">{labels.submitHint}</p>
        <p role="status" className="mt-gr-md text-gr-base text-ink">
          {sent && (
            <>
              {labels.sent}{" "}
              <a href={`mailto:${company.email}`} className="font-semibold underline underline-offset-4">
                {company.email}
              </a>
              .
            </>
          )}
        </p>
      </div>
    </form>
  );
}
