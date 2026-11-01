"use client";

import { useState, type FormEvent } from "react";
import { buttonDeep } from "@/components/ui";
import { company } from "@/content/company";
import type { Dictionary } from "@/i18n";

type Field = "name" | "email" | "service" | "message";
type Errors = Partial<Record<Field, string>>;
type Status = { state: "idle" | "sending" | "sent" } | { state: "failed"; message: string };

const fields: Field[] = ["name", "email", "service", "message"];

const inputClass =
  "mt-gr-sm block w-full rounded-xs border border-rule bg-white px-gr-sm py-gr-sm text-ink placeholder:text-ink-2 focus-visible:border-teal aria-[invalid=true]:border-blue";

// Aturan yang sama dengan API (utilities.tynext.co.id), supaya kesalahan umum tertangkap sebelum dikirim.
function validate(data: Record<Field, string>, text: Dictionary["form"]["errors"]): Errors {
  const errors: Errors = {};
  if (!data.name) errors.name = text.nameRequired;
  if (!data.email) errors.email = text.emailRequired;
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = text.emailInvalid;
  if (!data.service) errors.service = text.serviceRequired;
  if (data.message.length < 10) errors.message = text.messageShort;
  return errors;
}

// Pesan 422 dari API berbahasa Inggris; yang ditampilkan versi kamus untuk field yang sama.
function fromApiErrors(apiErrors: unknown, data: Record<Field, string>, text: Dictionary["form"]["errors"]): Errors {
  if (!apiErrors || typeof apiErrors !== "object") return {};
  const local: Errors = {
    name: text.nameRequired,
    email: data.email ? text.emailInvalid : text.emailRequired,
    service: text.serviceRequired,
    message: text.messageShort,
  };
  return Object.fromEntries(fields.filter((f) => f in apiErrors).map((f) => [f, local[f]]));
}

export function ContactForm({ labels, serviceTitles }: { labels: Dictionary["form"]; serviceTitles: string[] }) {
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const sending = status.state === "sending";

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (sending) return;
    const form = e.currentTarget;
    const formData = new FormData(form);
    const value = (key: string) => String(formData.get(key) ?? "").trim();
    const data = { name: value("name"), email: value("email"), service: value("service"), message: value("message") };

    const focusFirst = (found: Errors) => {
      const first = fields.find((f) => found[f]);
      if (first) form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
    };

    const found = validate(data, labels.errors);
    setErrors(found);
    if (Object.keys(found).length) {
      setStatus({ state: "idle" });
      focusFirst(found);
      return;
    }

    setStatus({ state: "sending" });
    const failed = (message: string = labels.errors.failed) => setStatus({ state: "failed", message });
    try {
      const response = await fetch(`${company.contactApiUrl}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // `website` adalah honeypot: tersembunyi dari pengunjung, hanya diisi bot. API membuang kiriman yang mengisinya.
        body: JSON.stringify({ ...data, company: value("company"), website: value("website") }),
        signal: AbortSignal.timeout(20_000),
      });

      if (response.ok) {
        form.reset();
        setStatus({ state: "sent" });
        return;
      }
      if (response.status === 422) {
        const body = await response.json().catch(() => null);
        const fieldErrors = fromApiErrors(body?.error, data, labels.errors);
        if (Object.keys(fieldErrors).length) {
          setErrors(fieldErrors);
          setStatus({ state: "idle" });
          focusFirst(fieldErrors);
          return;
        }
      }
      if (response.status === 429) {
        const seconds = Number(response.headers.get("Retry-After")) || 60;
        failed(labels.errors.rateLimited.replace("{seconds}", String(seconds)));
        return;
      }
      failed();
    } catch {
      // Jaringan putus, timeout, atau diblokir CORS.
      failed();
    }
  };

  const describe = (field: Field) => (errors[field] ? `${field}-error` : undefined);
  const fieldError = (field: Field) =>
    errors[field] && (
      <span id={`${field}-error`} className="mt-gr-xs block font-normal text-blue">
        {errors[field]}
      </span>
    );

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
        {fieldError("name")}
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
        {fieldError("email")}
      </label>

      <label className="block text-gr-base font-semibold text-ink">
        {labels.service}
        <select
          name="service"
          className={inputClass}
          defaultValue={serviceTitles[0]}
          aria-invalid={!!errors.service}
          aria-describedby={describe("service")}
        >
          {serviceTitles.map((title) => (
            <option key={title}>{title}</option>
          ))}
          <option>{labels.otherService}</option>
        </select>
        {fieldError("service")}
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
        {fieldError("message")}
      </label>

      {/* Honeypot untuk bot; disembunyikan dari pengunjung dan pembaca layar. */}
      <div aria-hidden="true" className="absolute -left-[9999px] size-px overflow-hidden">
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="sm:col-span-2">
        <button type="submit" disabled={sending} className={`${buttonDeep} disabled:cursor-wait disabled:opacity-70`}>
          {sending ? labels.sending : labels.submit}
        </button>
        <p className="mt-gr-sm text-gr-base text-ink-2">{labels.submitHint}</p>
        <p role="status" className="mt-gr-md text-gr-base font-semibold text-ink empty:hidden">
          {status.state === "sent" && labels.sent}
        </p>
        <p role="alert" className="mt-gr-md text-gr-base text-blue empty:hidden">
          {status.state === "failed" && (
            <>
              {status.message}{" "}
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
