"use client";

import { useEffect, useState, type RefObject } from "react";
import type { WebGLRenderer } from "three";

export type SceneHandle = {
  render(time: number): void;
  resize(width: number, height: number): void;
  dispose(): void;
};

export type SceneSetup = (ctx: {
  THREE: typeof import("three");
  renderer: WebGLRenderer;
  width: number;
  height: number;
}) => SceneHandle;

export type SceneStatus = "loading" | "ready" | "failed";

/**
 * Memasang adegan Three.js ke dalam container. Animasi berhenti saat container di luar layar,
 * dan dengan prefers-reduced-motion adegan dirender sekali sebagai gambar diam pada `stillTime`.
 */
export function useThreeScene(
  container: RefObject<HTMLDivElement | null>,
  setup: SceneSetup,
  stillTime: number,
): SceneStatus {
  const [status, setStatus] = useState<SceneStatus>("loading");

  useEffect(() => {
    let cancelled = false;
    let teardown = () => {};

    (async () => {
      const THREE = await import("three");
      const el = container.current;
      if (cancelled || !el) return;

      let renderer: WebGLRenderer;
      try {
        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "low-power" });
      } catch {
        setStatus("failed");
        return;
      }

      const { width, height } = el.getBoundingClientRect();
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(width, height, false);
      renderer.setClearColor(0x000000, 0);
      Object.assign(renderer.domElement.style, { width: "100%", height: "100%", display: "block" });
      renderer.domElement.setAttribute("aria-hidden", "true");
      el.appendChild(renderer.domElement);

      const scene = setup({ THREE, renderer, width, height });
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

      let visible = true;
      let raf = 0;
      let elapsed = 0;
      let last = 0;

      const frame = (now: number) => {
        elapsed += Math.min((now - last) / 1000, 0.1);
        last = now;
        scene.render(elapsed);
        raf = requestAnimationFrame(frame);
      };

      const play = () => {
        cancelAnimationFrame(raf);
        if (reduceMotion.matches) {
          scene.render(stillTime);
          return;
        }
        if (!visible) return;
        last = performance.now();
        raf = requestAnimationFrame(frame);
      };

      const resizeObserver = new ResizeObserver(([entry]) => {
        const { width: w, height: h } = entry.contentRect;
        if (w === 0 || h === 0) return;
        renderer.setSize(w, h, false);
        scene.resize(w, h);
        if (reduceMotion.matches) scene.render(stillTime);
      });
      resizeObserver.observe(el);

      const intersectionObserver = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
        play();
      });
      intersectionObserver.observe(el);

      reduceMotion.addEventListener("change", play);
      scene.render(reduceMotion.matches ? stillTime : 0);
      setStatus("ready");

      teardown = () => {
        cancelAnimationFrame(raf);
        resizeObserver.disconnect();
        intersectionObserver.disconnect();
        reduceMotion.removeEventListener("change", play);
        scene.dispose();
        renderer.dispose();
        renderer.domElement.remove();
      };
    })();

    return () => {
      cancelled = true;
      teardown();
    };
  }, [container, setup, stillTime]);

  return status;
}
