"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

// Menandai elemen [data-reveal] saat masuk layar. Dipindai ulang setiap pindah halaman.
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute("data-in", "");
          io.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );
    document.querySelectorAll("[data-reveal]:not([data-in])").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  return null;
}

// Angka yang menghitung naik saat terlihat, mis. "150+". Pembaca layar langsung mendapat nilai akhirnya.
export function CountUp({ value }: { value: string }) {
  const match = value.match(/^(\d+)(.*)$/);
  const target = match ? Number(match[1]) : null;
  const suffix = match ? match[2] : "";
  const ref = useRef<HTMLSpanElement>(null);
  const [current, setCurrent] = useState<number | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (target === null || !el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const step = (now: number) => {
        const t = Math.min((now - start) / 1400, 1);
        setCurrent(Math.round(target * (1 - Math.pow(1 - t, 3))));
        if (t < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    });
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [target]);

  return (
    <span ref={ref}>
      <span className="sr-only">{value}</span>
      <span aria-hidden="true">{current === null ? value : `${current}${suffix}`}</span>
    </span>
  );
}
