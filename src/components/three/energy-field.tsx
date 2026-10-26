"use client";

import { useEffect, useRef } from "react";

/*
 * Lapisan latar seluruh situs: tiga kabel fase yang mengalir dari atas ke bawah dokumen, hanya saat di-scroll.
 * Kanvas tetap (fixed) di belakang konten; shader membaca posisi setiap section [data-tone]
 * supaya warna arus selalu kontras dengan warna section yang sedang dilewati.
 */

const TONES = ["paper", "paper-2", "deep", "night", "sun", "arc"] as const;

// Tiga warna fase untuk setiap warna section, urutan mengikuti TONES.
const PALETTE: string[][] = [
  ["#a63f14", "#0d3a33", "#c4931a"],
  ["#a63f14", "#0d3a33", "#c4931a"],
  ["#f5c037", "#f26a2e", "#8fd4bd"],
  ["#f5c037", "#f26a2e", "#8fd4bd"],
  ["#17181a", "#a63f14", "#0d3a33"],
  ["#17181a", "#0d3a33", "#f2efe8"],
];

const MAX_BANDS = 8;

const vertexShader = /* glsl */ `
  void main() {
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  uniform float uTime;
  uniform float uScroll;
  uniform float uDpr;
  uniform vec2 uView;
  uniform vec4 uBands[${MAX_BANDS}];
  uniform int uBandCount;
  uniform vec3 uPal[${TONES.length * 3}];

  void main() {
    float y = uView.y - gl_FragCoord.y / uDpr;
    float x = gl_FragCoord.x / uDpr;

    int tone = -1;
    for (int i = 0; i < ${MAX_BANDS}; i++) {
      if (i >= uBandCount) break;
      vec4 b = uBands[i];
      if (y >= b.x && y < b.y && b.w > 0.5) tone = int(b.z);
    }
    if (tone < 0) discard;

    float docY = y + uScroll;
    float wide = step(768.0, uView.x);
    float amp = uView.x * mix(0.30, 0.36, wide);
    float k = 6.2831853 / mix(1300.0, 1700.0, wide);

    vec4 acc = vec4(0.0);
    for (int p = 0; p < 3; p++) {
      float a = k * docY - uTime * 0.55 + float(p) * 2.0943951;
      float xc = uView.x * 0.5 + amp * sin(a);
      float slope = amp * k * cos(a);
      float d = abs(x - xc) / sqrt(1.0 + slope * slope);

      // Denyut arus yang berjalan menyusuri kabel.
      float s = fract(docY / 1100.0 - uTime * 0.07 + float(p) / 3.0) - 0.5;
      float pulse = exp(-s * s * 200.0);

      float w = 0.95 + 2.0 * pulse;
      float line = 1.0 - smoothstep(w - 0.7, w + 0.7, d);
      float alpha = line * (0.3 + 0.3 * pulse);

      vec3 col = uPal[tone * 3 + p];
      acc.rgb = col * alpha + acc.rgb * (1.0 - alpha);
      acc.a = alpha + acc.a * (1.0 - alpha);
    }
    if (acc.a < 0.003) discard;
    gl_FragColor = vec4(acc.rgb / acc.a, acc.a);
    #include <colorspace_fragment>
  }
`;

export function EnergyField() {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    let teardown = () => {};

    (async () => {
      const THREE = await import("three");
      const el = container.current;
      if (cancelled || !el) return;

      let renderer: import("three").WebGLRenderer;
      try {
        renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false, powerPreference: "low-power" });
      } catch {
        return;
      }
      const dpr = Math.min(window.devicePixelRatio, 1.5);
      renderer.setPixelRatio(dpr);
      renderer.setClearColor(0x000000, 0);
      Object.assign(renderer.domElement.style, { width: "100%", height: "100%", display: "block" });
      el.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
      const geometry = new THREE.PlaneGeometry(2, 2);
      const material = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        transparent: true,
        depthTest: false,
        depthWrite: false,
        uniforms: {
          uTime: { value: 0 },
          uScroll: { value: 0 },
          uDpr: { value: dpr },
          uView: { value: new THREE.Vector2() },
          uBands: { value: Array.from({ length: MAX_BANDS }, () => new THREE.Vector4()) },
          uBandCount: { value: 0 },
          uPal: { value: PALETTE.flat().map((c) => new THREE.Color(c)) },
        },
      });
      const quad = new THREE.Mesh(geometry, material);
      quad.frustumCulled = false;
      scene.add(quad);

      const u = material.uniforms;
      const resize = () => {
        renderer.setSize(window.innerWidth, window.innerHeight, false);
        u.uView.value.set(window.innerWidth, window.innerHeight);
      };
      resize();

      const draw = () => {
        const vh = window.innerHeight;
        let n = 0;
        for (const section of document.querySelectorAll<HTMLElement>("[data-tone]")) {
          const r = section.getBoundingClientRect();
          if (r.bottom <= 0 || r.top >= vh) continue;
          if (n === MAX_BANDS) break;
          const tone = TONES.indexOf(section.dataset.tone as (typeof TONES)[number]);
          u.uBands.value[n].set(r.top, r.bottom, Math.max(tone, 0), section.dataset.lines === "off" ? 0 : 1);
          n++;
        }
        u.uBandCount.value = n;
        u.uScroll.value = window.scrollY;
        renderer.render(scene, camera);
      };

      // Arus hanya bergerak saat halaman di-scroll: fase dan denyut digeser oleh posisi scroll, bukan oleh waktu.
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
      let raf = 0;
      const schedule = () => {
        if (raf) return;
        raf = requestAnimationFrame(() => {
          raf = 0;
          u.uTime.value = reduceMotion.matches ? 0 : window.scrollY / 380;
          draw();
        });
      };
      const onResize = () => {
        resize();
        schedule();
      };
      // Tinggi dokumen berubah saat pindah halaman atau gambar dimuat; posisi section perlu dibaca ulang.
      const layoutObserver = new ResizeObserver(schedule);
      layoutObserver.observe(document.body);

      window.addEventListener("scroll", schedule, { passive: true });
      window.addEventListener("resize", onResize);
      reduceMotion.addEventListener("change", schedule);
      schedule();

      teardown = () => {
        cancelAnimationFrame(raf);
        layoutObserver.disconnect();
        window.removeEventListener("scroll", schedule);
        window.removeEventListener("resize", onResize);
        reduceMotion.removeEventListener("change", schedule);
        geometry.dispose();
        material.dispose();
        renderer.dispose();
        renderer.domElement.remove();
      };
    })();

    return () => {
      cancelled = true;
      teardown();
    };
  }, []);

  return <div ref={container} aria-hidden="true" className="pointer-events-none fixed inset-0" style={{ zIndex: -1 }} />;
}
