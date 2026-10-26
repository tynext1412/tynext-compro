"use client";

import { useState, type FormEvent } from "react";
import { company, services } from "@/content/company";
import { buttonDeep } from "@/components/ui";

type Field = "name" | "email" | "message";
type Errors = Partial<Record<Field, string>>;

const inputClass =
  "mt-2 block w-full rounded-xs border border-rule bg-white px-3 py-3 text-ink placeholder:text-ink-2 focus-visible:border-arc aria-[invalid=true]:border-arc-ink";

function validate(data: FormData): Errors {
  const errors: Errors = {};
  if (!String(data.get("name")).trim()) errors.name = "Nama wajib diisi.";
  const email = String(data.get("email")).trim();
  if (!email) errors.email = "Email wajib diisi.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "Format email belum benar.";
  if (String(data.get("message")).trim().length < 10) errors.message = "Ceritakan kebutuhan Anda minimal 10 karakter.";
  return errors;
}

// Belum ada backend: formulir menyusun email lalu membuka aplikasi email pengunjung.
export function ContactForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const found = validate(data);
    setErrors(found);
    setSent(false);
    const first = Object.keys(found)[0];
    if (first) {
      e.currentTarget.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    const company_ = String(data.get("company")).trim();
    const service = String(data.get("service"));
    const subject = `Diskusi proyek: ${service}${company_ ? ` (${company_})` : ""}`;
    const body = [
      String(data.get("message")).trim(),
      "",
      `Nama: ${String(data.get("name")).trim()}`,
      company_ && `Perusahaan: ${company_}`,
      `Email: ${String(data.get("email")).trim()}`,
    ]
      .filter((line) => line !== "")
      .join("\n");

    window.location.href = `mailto:${company.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  const describe = (field: Field) => (errors[field] ? `${field}-error` : undefined);

  return (
    <form noValidate onSubmit={onSubmit} className="grid gap-6 sm:grid-cols-2">
      <label className="block text-sm font-semibold text-ink">
        Nama
        <input name="name" autoComplete="name" className={inputClass} aria-invalid={!!errors.name} aria-describedby={describe("name")} />
        {errors.name && <span id="name-error" className="mt-1.5 block font-normal text-arc-ink">{errors.name}</span>}
      </label>

      <label className="block text-sm font-semibold text-ink">
        Perusahaan <span className="font-normal text-ink-2">(opsional)</span>
        <input name="company" autoComplete="organization" className={inputClass} />
      </label>

      <label className="block text-sm font-semibold text-ink">
        Email
        <input
          name="email"
          type="email"
          autoComplete="email"
          placeholder="nama@perusahaan.co.id"
          className={inputClass}
          aria-invalid={!!errors.email}
          aria-describedby={describe("email")}
        />
        {errors.email && <span id="email-error" className="mt-1.5 block font-normal text-arc-ink">{errors.email}</span>}
      </label>

      <label className="block text-sm font-semibold text-ink">
        Kebutuhan layanan
        <select name="service" className={inputClass} defaultValue={services[0].title}>
          {services.map((s) => (
            <option key={s.slug}>{s.title}</option>
          ))}
          <option>Lainnya</option>
        </select>
      </label>

      <label className="block text-sm font-semibold text-ink sm:col-span-2">
        Pesan
        <textarea
          name="message"
          rows={5}
          placeholder="Ceritakan lokasi, kapasitas, atau sistem yang ingin dikerjakan."
          className={inputClass}
          aria-invalid={!!errors.message}
          aria-describedby={describe("message")}
        />
        {errors.message && <span id="message-error" className="mt-1.5 block font-normal text-arc-ink">{errors.message}</span>}
      </label>

      <div className="sm:col-span-2">
        <button type="submit" className={buttonDeep}>
          Susun Email ke Tim Kami
        </button>
        <p className="mt-3 text-sm text-ink-2">Tombol ini membuka aplikasi email Anda dengan pesan yang sudah terisi.</p>
        <p role="status" className="mt-4 text-sm text-ink">
          {sent && (
            <>
              Aplikasi email Anda seharusnya sudah terbuka. Jika tidak, kirim pesan langsung ke{" "}
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
