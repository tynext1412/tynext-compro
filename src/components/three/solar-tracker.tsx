"use client";

import { useRef } from "react";
import type { Mesh, Group } from "three";
import { useThreeScene, type SceneSetup } from "./use-three-scene";

const ROWS = 4;
const MODULES = 6;
const ROW_GAP = 2.7;
const TUBE_HEIGHT = 1.1;
const MAX_TILT = 0.95; // batas mekanis tracker, sekitar 55 derajat
const DAY = 14; // detik untuk matahari bergerak dari timur ke barat
const NIGHT = 4; // detik panel kembali ke posisi timur (stow)
const SUN_RADIUS = 6.5;
const SUN_HEIGHT = 0.55; // busur dipipihkan supaya tetap di dalam bingkai

const setup: SceneSetup = ({ THREE, renderer, width, height }) => {
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowMap;

  const scene = new THREE.Scene();
  const frustum = 12;
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 100);
  camera.position.set(11, 9, 13);
  camera.lookAt(0, 1.2, 0);

  const disposables: { dispose(): void }[] = [];
  const track = <T extends { dispose(): void }>(d: T) => (disposables.push(d), d);

  scene.add(new THREE.HemisphereLight(0xfff6dc, 0xc9a43a, 1.6));
  const sun = new THREE.DirectionalLight(0xfff2e0, 2.4);
  sun.castShadow = true;
  sun.shadow.mapSize.set(1024, 1024);
  Object.assign(sun.shadow.camera, { left: -9, right: 9, top: 9, bottom: -9, near: 0.5, far: 30 });
  scene.add(sun, sun.target);

  // Tanah hanya menangkap bayangan, jadi adegan menyatu dengan warna kertas halaman.
  const ground = new THREE.Mesh(
    track(new THREE.PlaneGeometry(40, 40)),
    track(new THREE.ShadowMaterial({ color: 0x5a3d00, opacity: 0.3 })),
  );
  ground.rotation.x = -Math.PI / 2;
  ground.receiveShadow = true;
  scene.add(ground);

  const panelMaterial = track(new THREE.MeshStandardMaterial({ color: 0x23272c, roughness: 0.35, metalness: 0.25 }));
  const frameMaterial = track(new THREE.MeshStandardMaterial({ color: 0xc9c3b6, roughness: 0.6 }));
  const steelMaterial = track(new THREE.MeshStandardMaterial({ color: 0x8d8a82, roughness: 0.7 }));
  const moduleGeometry = track(new THREE.BoxGeometry(1.9, 0.05, 1.32));
  const frameGeometry = track(new THREE.BoxGeometry(1.96, 0.035, 1.38));
  const tubeGeometry = track(new THREE.CylinderGeometry(0.05, 0.05, MODULES * 1.4 + 0.4, 10));
  const postGeometry = track(new THREE.BoxGeometry(0.09, TUBE_HEIGHT, 0.09));

  const rows: Group[] = [];
  for (let r = 0; r < ROWS; r++) {
    const x = (r - (ROWS - 1) / 2) * ROW_GAP;

    const tube = new THREE.Mesh(tubeGeometry, steelMaterial);
    tube.rotation.x = Math.PI / 2;
    tube.position.set(x, TUBE_HEIGHT, 0);
    tube.castShadow = true;
    scene.add(tube);

    for (const z of [-3.6, 0, 3.6]) {
      const post = new THREE.Mesh(postGeometry, steelMaterial);
      post.position.set(x, TUBE_HEIGHT / 2, z);
      post.castShadow = true;
      scene.add(post);
    }

    const row = new THREE.Group();
    row.position.set(x, TUBE_HEIGHT + 0.08, 0);
    for (let m = 0; m < MODULES; m++) {
      const z = (m - (MODULES - 1) / 2) * 1.4;
      const frame: Mesh = new THREE.Mesh(frameGeometry, frameMaterial);
      frame.position.set(0, -0.02, z);
      const pvModule: Mesh = new THREE.Mesh(moduleGeometry, panelMaterial);
      pvModule.position.set(0, 0.01, z);
      frame.castShadow = pvModule.castShadow = true;
      row.add(frame, pvModule);
    }
    scene.add(row);
    rows.push(row);
  }

  // Lintasan matahari digambar sebagai busur putus-putus, seperti pada diagram sun-path.
  const arcPoints = Array.from({ length: 64 }, (_, i) => {
    const a = 0.2 + (i / 63) * (Math.PI - 0.4);
    return new THREE.Vector3(Math.cos(a) * SUN_RADIUS, Math.sin(a) * SUN_RADIUS * SUN_HEIGHT, -5);
  });
  const arc = new THREE.Line(
    track(new THREE.BufferGeometry().setFromPoints(arcPoints)),
    track(new THREE.LineDashedMaterial({ color: 0x17181a, dashSize: 0.25, gapSize: 0.22 })),
  );
  arc.computeLineDistances();
  scene.add(arc);

  const sunMaterial = track(new THREE.MeshBasicMaterial({ color: 0xf26a2e, transparent: true }));
  const sunMarker = new THREE.Mesh(track(new THREE.SphereGeometry(0.42, 24, 16)), sunMaterial);
  scene.add(sunMarker);

  const fit = (w: number, h: number) => {
    const aspect = w / h;
    const f = aspect < 1 ? frustum * 1.25 : frustum;
    Object.assign(camera, { left: (-f * aspect) / 2, right: (f * aspect) / 2, top: f / 2, bottom: -f / 2 });
    camera.updateProjectionMatrix();
  };
  fit(width, height);

  const ease = (t: number) => t * t * (3 - 2 * t);
  const tiltFor = (angle: number) => THREE.MathUtils.clamp(angle - Math.PI / 2, -MAX_TILT, MAX_TILT);
  const SUNRISE = 0.2;
  const SUNSET = Math.PI - 0.2;

  return {
    render(time) {
      const t = time % (DAY + NIGHT);
      let angle: number;
      let tilt: number;
      let daylight: number;

      if (t < DAY) {
        angle = SUNRISE + (t / DAY) * (SUNSET - SUNRISE);
        tilt = tiltFor(angle);
        daylight = Math.min(1, Math.sin(angle) * 2.2);
      } else {
        // Malam hari: matahari tenggelam dan tracker berputar balik ke timur untuk pagi berikutnya.
        const k = ease((t - DAY) / NIGHT);
        angle = SUNSET;
        tilt = THREE.MathUtils.lerp(tiltFor(SUNSET), tiltFor(SUNRISE), k);
        daylight = Math.max(0, 1 - k * 3) * 0.45;
      }

      const sx = Math.cos(angle) * SUN_RADIUS;
      const sy = Math.sin(angle) * SUN_RADIUS * SUN_HEIGHT;
      sun.position.set(sx, Math.max(sy, 0.5) + 3, 2);
      sun.intensity = 0.4 + daylight * 2.2;
      sunMarker.position.set(sx, sy, -5);
      sunMaterial.opacity = t < DAY ? 1 : daylight;

      // Normal panel (−sin θ, cos θ) diarahkan ke matahari (cos a, sin a), jadi θ = a − π/2.
      for (const row of rows) row.rotation.z = tilt;
      renderer.render(scene, camera);
    },
    resize: fit,
    dispose() {
      disposables.forEach((d) => d.dispose());
    },
  };
};

export function SolarTracker({ className = "" }: { className?: string }) {
  const container = useRef<HTMLDivElement>(null);
  const status = useThreeScene(container, setup, 5);

  return (
    <figure className={`relative ${className}`}>
      {status !== "ready" && <StaticArray />}
      <div ref={container} className="absolute inset-0" />
      <figcaption className="absolute right-0 bottom-0 font-mono text-[0.7rem] text-ink">
        Ilustrasi: PLTS dengan single-axis tracker mengikuti matahari
      </figcaption>
    </figure>
  );
}

function StaticArray() {
  return (
    <svg viewBox="0 0 400 260" aria-hidden="true" className="absolute inset-0 h-full w-full">
      <path d="M60 60 A160 140 0 0 1 340 60" fill="none" stroke="#17181a" strokeDasharray="6 6" />
      <circle cx="200" cy="22" r="10" fill="#f26a2e" />
      {[0, 1, 2, 3].map((i) => (
        <g key={i} transform={`translate(${70 + i * 75} ${120 + i * 22})`}>
          <path d="M0 40 L60 0 L95 18 L35 58 Z" fill="#23272c" />
          <line x1="47" y1="29" x2="47" y2="75" stroke="#8d8a82" strokeWidth="3" />
        </g>
      ))}
    </svg>
  );
}
