"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import type { CurvePath, Group, MeshStandardMaterial, Vector3 } from "three";
import { serviceSlugs, type ServiceSlug } from "@/content/company";
import { localePath, type Dictionary, type Locale } from "@/i18n";
import { useThreeScene, type SceneSetup } from "./use-three-scene";

/*
 * Peta sistem energi di hero beranda: PLTS & BESS -> gardu & SCADA -> jaringan 20 kV -> fasilitas klien.
 * Setiap layanan menunjukkan perannya di sistem ini, dan objeknya bisa diklik untuk membuka detail layanan.
 * Jembatan (bridge) di bawah menghubungkan state React dengan adegan Three.js tanpa render ulang tiap frame.
 */

type Bridge = {
  active: ServiceSlug | null;
  label: HTMLDivElement | null;
  hover: (slug: ServiceSlug | null) => void;
  select: (slug: ServiceSlug) => void;
  invalidate: () => void;
};

const bridge: Bridge = {
  active: null,
  label: null,
  hover: () => {},
  select: () => {},
  invalidate: () => {},
};

const COLORS = {
  paper: 0xf2efe8,
  paper2: 0xe7e2d6,
  steel: 0xc9c3b6,
  mist: 0xa6b8b2,
  slate: 0x55534d,
  pv: 0x3d5a73,
  lime: 0x8cc63f,
  teal: 0x3eba95,
  aqua: 0x7fd8bd,
  cable: 0x2f5f8c,
};

// Rentang putaran kamera (radian) saat mengikuti kursor.
const TILT_THETA = 0.14;
const TILT_PHI = 0.06;
const FLOOR_OPACITY = 0.16;
// Piringan lantai (x, z) dan jari-jarinya, mencakup seluruh diorama.
const FLOOR_CENTER = [0.4, 0.4] as const;
const FLOOR_RADIUS = 13;

// Titik di atas tiap layanan tempat label HTML ditempelkan.
const LABEL_ANCHOR: Record<ServiceSlug, [number, number, number]> = {
  engineering: [0.5, 4.2, 0],
  integration: [-1.4, 3.4, 1],
  renewable: [-8, 2.2, 0.4],
  maintenance: [10, 3.2, 0],
};

type Asset = {
  slug: ServiceSlug;
  group: Group;
  materials: MeshStandardMaterial[];
  beacon: Vector3;
};

const setup: SceneSetup = ({ THREE, renderer, width, height }) => {
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowMap;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 100);
  const target = new THREE.Vector3(0.6, 0.8, 0.3);
  const orbit = new THREE.Spherical().setFromVector3(new THREE.Vector3(16, 13, 11).sub(target));
  const baseOrbit = orbit.clone();
  camera.position.setFromSpherical(orbit).add(target);
  camera.lookAt(target);

  const disposables: { dispose(): void }[] = [];
  const keep = <T extends { dispose(): void }>(d: T) => (disposables.push(d), d);

  scene.add(new THREE.HemisphereLight(0xf4f8ff, 0x0e2846, 1.6));
  const light = new THREE.DirectionalLight(0xfff2e0, 2.2);
  light.position.set(6, 12, 8);
  light.castShadow = true;
  light.shadow.mapSize.set(1024, 1024);
  Object.assign(light.shadow.camera, { left: -14, right: 14, top: 10, bottom: -10, near: 1, far: 40 });
  scene.add(light);

  const shadowMaterial = keep(new THREE.ShadowMaterial({ color: 0x000000, opacity: 0.3 }));
  const ground = new THREE.Mesh(keep(new THREE.PlaneGeometry(60, 60)), shadowMaterial);
  ground.rotation.x = -Math.PI / 2;
  ground.receiveShadow = true;
  scene.add(ground);

  // Lantai grid berbentuk piringan bundar di bawah diorama, seperti alas maket: selalu tampil samar, lebih tegas
  // di mode Engineering. Garis memudar melingkar ke arah tepi piringan, jadi tidak ada batas kotak yang terlihat.
  const floorMaterial = keep(
    new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      uniforms: {
        uOpacity: { value: FLOOR_OPACITY },
        uColor: { value: new THREE.Color(COLORS.aqua) },
      },
      vertexShader: /* glsl */ `
        varying vec2 vPos;
        void main() {
          vec4 world = modelMatrix * vec4(position, 1.0);
          vPos = world.xz;
          gl_Position = projectionMatrix * viewMatrix * world;
        }
      `,
      fragmentShader: /* glsl */ `
        uniform float uOpacity;
        uniform vec3 uColor;
        varying vec2 vPos;
        void main() {
          vec2 cell = abs(fract(vPos - 0.5) - 0.5) / fwidth(vPos);
          float line = 1.0 - min(min(cell.x, cell.y), 1.0);
          float r = length(vPos - vec2(${FLOOR_CENTER[0].toFixed(2)}, ${FLOOR_CENTER[1].toFixed(2)})) / ${FLOOR_RADIUS.toFixed(2)};
          float fade = 1.0 - smoothstep(0.45, 1.0, r);
          gl_FragColor = vec4(uColor, line * fade * uOpacity);
          #include <colorspace_fragment>
        }
      `,
    }),
  );
  const floor = new THREE.Mesh(keep(new THREE.CircleGeometry(FLOOR_RADIUS, 96)), floorMaterial);
  floor.rotation.x = -Math.PI / 2;
  floor.position.set(FLOOR_CENTER[0], 0.01, FLOOR_CENTER[1]);
  scene.add(floor);

  const edgesMaterial = keep(new THREE.LineBasicMaterial({ color: COLORS.aqua, transparent: true, opacity: 0 }));
  const assets: Asset[] = [];

  const makeAsset = (slug: ServiceSlug, beacon: [number, number, number]) => {
    const asset: Asset = { slug, group: new THREE.Group(), materials: [], beacon: new THREE.Vector3(...beacon) };
    scene.add(asset.group);
    assets.push(asset);
    return asset;
  };

  const addMesh = (
    asset: Asset,
    geometry: import("three").BufferGeometry,
    color: number,
    pos: [number, number, number],
    rot?: [number, number, number],
  ) => {
    keep(geometry);
    const material = keep(new THREE.MeshStandardMaterial({ color, roughness: 0.75, transparent: true }));
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(...pos);
    if (rot) mesh.rotation.set(...rot);
    mesh.castShadow = mesh.receiveShadow = true;
    mesh.userData.slug = asset.slug;
    mesh.add(new THREE.LineSegments(keep(new THREE.EdgesGeometry(geometry)), edgesMaterial));
    asset.group.add(mesh);
    asset.materials.push(material);
    return mesh;
  };
  const box = (
    a: Asset,
    s: [number, number, number],
    p: [number, number, number],
    c: number,
    r?: [number, number, number],
  ) => addMesh(a, new THREE.BoxGeometry(...s), c, p, r);
  const cyl = (a: Asset, rt: number, rb: number, h: number, p: [number, number, number], c: number) =>
    addMesh(a, new THREE.CylinderGeometry(rt, rb, h, 10), c, p);

  // PLTS
  const solar = makeAsset("renewable", [-8.4, 1.5, -1.4]);
  for (let r = 0; r < 2; r++) {
    for (let c = 0; c < 4; c++) {
      const x = -10 + c * 1.2;
      const z = -2.2 + r * 1.25;
      box(solar, [1.1, 0.06, 0.8], [x, 0.6, z], COLORS.pv, [-0.45, 0, 0]);
      box(solar, [0.06, 0.55, 0.06], [x, 0.28, z], COLORS.steel);
    }
  }

  // BESS
  const bess = makeAsset("renewable", [-8, 1.4, 2.4]);
  for (let i = 0; i < 3; i++) {
    const z = 1.4 + i * 0.95;
    box(bess, [1.9, 0.85, 0.8], [-8.4, 0.43, z], COLORS.paper);
    box(bess, [0.04, 0.55, 0.5], [-7.44, 0.4, z], COLORS.teal);
  }

  // Gardu: trafo dan rangka busbar
  const substation = makeAsset("integration", [-2.2, 2.4, -1.1]);
  box(substation, [1.2, 1.0, 0.9], [-3, 0.5, -1.1], COLORS.mist);
  for (let k = 0; k < 3; k++) cyl(substation, 0.05, 0.07, 0.45, [-3.35 + k * 0.35, 1.22, -1.1], COLORS.paper);
  for (const [x, z] of [
    [-1.7, -1.8],
    [-1.7, -0.4],
    [-0.5, -1.8],
    [-0.5, -0.4],
  ]) {
    box(substation, [0.08, 1.8, 0.08], [x, 0.9, z], COLORS.steel);
  }
  box(substation, [1.28, 0.08, 0.08], [-1.1, 1.8, -1.8], COLORS.steel);
  box(substation, [1.28, 0.08, 0.08], [-1.1, 1.8, -0.4], COLORS.steel);
  box(substation, [0.08, 0.08, 1.48], [-1.7, 1.8, -1.1], COLORS.steel);
  box(substation, [0.08, 0.08, 1.48], [-0.5, 1.8, -1.1], COLORS.steel);

  // Ruang kontrol SCADA dengan antena telemetri
  const control = makeAsset("integration", [-1.6, 2.9, 2.2]);
  box(control, [1.8, 1.0, 1.3], [-1.6, 0.5, 2.2], COLORS.paper);
  box(control, [2.0, 0.12, 1.5], [-1.6, 1.06, 2.2], COLORS.slate);
  cyl(control, 0.03, 0.04, 1.3, [-1.0, 1.75, 2.5], COLORS.steel);
  box(control, [0.16, 0.16, 0.16], [-1.0, 2.45, 2.5], COLORS.lime);
  const antenna = new THREE.Vector3(-1.0, 2.45, 2.5);

  // Jaringan distribusi 20 kV
  const network = makeAsset("integration", [4.2, 3.4, 0]);
  const poles = [1.5, 4.2, 6.9];
  const phases = [-0.55, 0, 0.55];
  for (const x of poles) {
    cyl(network, 0.07, 0.09, 2.8, [x, 1.4, 0], COLORS.steel);
    box(network, [0.08, 0.08, 1.4], [x, 2.6, 0], COLORS.steel);
    for (const z of phases) cyl(network, 0.04, 0.05, 0.18, [x, 2.73, z], COLORS.paper);
  }
  const wireMaterial = keep(new THREE.LineBasicMaterial({ color: COLORS.mist, transparent: true }));
  const wire = (a: Vector3, b: Vector3, sag: number) => {
    const mid = a.clone().lerp(b, 0.5);
    mid.y -= sag;
    const curve = new THREE.QuadraticBezierCurve3(a, mid, b);
    const line = new THREE.Line(keep(new THREE.BufferGeometry().setFromPoints(curve.getPoints(24))), wireMaterial);
    network.group.add(line);
  };
  for (let i = 0; i < poles.length - 1; i++) {
    for (const z of phases) wire(new THREE.Vector3(poles[i], 2.82, z), new THREE.Vector3(poles[i + 1], 2.82, z), 0.35);
  }
  wire(new THREE.Vector3(-0.5, 1.84, -1.1), new THREE.Vector3(1.5, 2.82, 0), 0.2);
  wire(new THREE.Vector3(6.9, 2.82, 0), new THREE.Vector3(8.7, 1.3, 0), 0.15);

  // Fasilitas klien
  const facility = makeAsset("maintenance", [10, 2.6, 0]);
  box(facility, [2.6, 1.4, 2.4], [10, 0.7, 0], COLORS.paper2);
  for (let k = 0; k < 3; k++) box(facility, [0.86, 0.1, 2.4], [9.13 + k * 0.87, 1.6, 0], COLORS.slate, [0, 0, 0.45]);
  cyl(facility, 0.15, 0.18, 1.6, [10.9, 1.6, -0.8], COLORS.mist);
  const windows = box(facility, [0.04, 0.25, 1.8], [8.68, 0.85, 0], COLORS.lime);
  (windows.material as MeshStandardMaterial).emissive.setHex(COLORS.lime);

  // Jalur arus: PLTS & BESS -> trafo -> busbar -> tiang 20 kV -> fasilitas klien
  const poly = (points: [number, number, number][]) => {
    const path = new THREE.CurvePath<Vector3>();
    for (let i = 0; i < points.length - 1; i++) {
      path.add(new THREE.LineCurve3(new THREE.Vector3(...points[i]), new THREE.Vector3(...points[i + 1])));
    }
    return path;
  };
  const cableY = 0.05;
  const routes: { path: CurvePath<Vector3>; count: number; ground: boolean }[] = [
    {
      path: poly([
        [-9.6, cableY, -0.4],
        [-4.2, cableY, -0.4],
        [-3.6, cableY, -0.6],
      ]),
      count: 10,
      ground: true,
    },
    {
      path: poly([
        [-7.4, cableY, 1.4],
        [-4.2, cableY, 1.4],
        [-4.2, cableY, -0.4],
      ]),
      count: 8,
      ground: true,
    },
    {
      path: poly([
        [-2.4, 1.0, -1.1],
        [-1.1, 1.8, -1.1],
        [-0.5, 1.84, -1.1],
        [1.5, 2.82, 0],
        [4.2, 2.82, 0],
        [6.9, 2.82, 0],
        [8.7, 1.3, 0],
      ]),
      count: 24,
      ground: false,
    },
  ];
  const cableMaterial = keep(new THREE.LineBasicMaterial({ color: COLORS.cable }));
  for (const route of routes) {
    if (!route.ground) continue;
    scene.add(new THREE.Line(keep(new THREE.BufferGeometry().setFromPoints(route.path.getPoints(8))), cableMaterial));
  }
  const particleCount = routes.reduce((n, r) => n + r.count, 0);
  const particlePositions = new Float32Array(particleCount * 3);
  const particleGeometry = keep(new THREE.BufferGeometry());
  particleGeometry.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
  const particleMaterial = keep(
    new THREE.PointsMaterial({
      color: COLORS.lime,
      size: 6,
      sizeAttenuation: false,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    }),
  );
  const particles = new THREE.Points(particleGeometry, particleMaterial);
  particles.frustumCulled = false;
  scene.add(particles);

  // Integration: paket data telemetri dari tiap aset ke ruang kontrol.
  const links = assets.filter((a) => a !== control).map((a) => a.beacon.clone());
  const linkMaterial = keep(
    new THREE.LineDashedMaterial({ color: COLORS.aqua, dashSize: 0.18, gapSize: 0.14, transparent: true, opacity: 0 }),
  );
  for (const from of links) {
    const line = new THREE.Line(keep(new THREE.BufferGeometry().setFromPoints([from, antenna])), linkMaterial);
    line.computeLineDistances();
    scene.add(line);
  }
  const packetsPerLink = 3;
  const packetPositions = new Float32Array(links.length * packetsPerLink * 3);
  const packetGeometry = keep(new THREE.BufferGeometry());
  packetGeometry.setAttribute("position", new THREE.BufferAttribute(packetPositions, 3));
  const packetMaterial = keep(
    new THREE.PointsMaterial({
      color: COLORS.aqua,
      size: 7,
      sizeAttenuation: false,
      transparent: true,
      opacity: 0,
      depthWrite: false,
    }),
  );
  const packets = new THREE.Points(packetGeometry, packetMaterial);
  packets.frustumCulled = false;
  scene.add(packets);

  // Maintenance: sapuan inspeksi dan indikator status di atas tiap aset.
  const beaconGeometry = keep(new THREE.OctahedronGeometry(0.22));
  const beacons = assets.map((a) => {
    const material = keep(new THREE.MeshBasicMaterial({ color: COLORS.teal, transparent: true, opacity: 0 }));
    const mesh = new THREE.Mesh(beaconGeometry, material);
    mesh.position.copy(a.beacon);
    scene.add(mesh);
    return { mesh, material, base: a.beacon.y };
  });
  const sweepMaterial = keep(
    new THREE.MeshBasicMaterial({
      color: COLORS.teal,
      transparent: true,
      opacity: 0,
      depthWrite: false,
      side: THREE.DoubleSide,
    }),
  );
  const sweep = new THREE.Mesh(keep(new THREE.PlaneGeometry(6, 3.2)), sweepMaterial);
  sweep.rotation.y = Math.PI / 2;
  sweep.position.y = 1.6;
  scene.add(sweep);

  // Interaksi pointer: arahkan untuk melihat peran, klik untuk membuka layanan.
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  const meshes = assets.flatMap((a) => a.group.children.filter((c) => (c as import("three").Mesh).isMesh));
  let hovered: ServiceSlug | null = null;
  let pointerType = "mouse";

  const pick = (e: PointerEvent): ServiceSlug | null => {
    const rect = renderer.domElement.getBoundingClientRect();
    pointer.set(((e.clientX - rect.left) / rect.width) * 2 - 1, -((e.clientY - rect.top) / rect.height) * 2 + 1);
    raycaster.setFromCamera(pointer, camera);
    const hit = raycaster.intersectObjects(meshes, false)[0];
    return (hit?.object.userData.slug as ServiceSlug | undefined) ?? null;
  };
  const onMove = (e: PointerEvent) => {
    pointerType = e.pointerType;
    if (e.pointerType !== "mouse") return;
    const slug = pick(e);
    renderer.domElement.style.cursor = slug ? "pointer" : "default";
    if (slug !== hovered) {
      hovered = slug;
      bridge.hover(slug);
    }
  };
  const onLeave = () => {
    if (hovered) bridge.hover(null);
    hovered = null;
  };
  const onClick = (e: MouseEvent) => {
    const slug = pick(e as PointerEvent);
    if (!slug) return;
    // Di layar sentuh, ketukan pertama menampilkan peran, ketukan kedua membuka layanan.
    if (pointerType !== "mouse" && bridge.active !== slug) bridge.hover(slug);
    else bridge.select(slug);
  };
  // Sudut pandang berputar halus mengikuti posisi kursor di atas peta.
  const tilt = { x: 0, y: 0 };
  const onWindowPointer = (e: PointerEvent) => {
    if (e.pointerType !== "mouse" || reduceMotion) return;
    const rect = renderer.domElement.getBoundingClientRect();
    tilt.x = THREE.MathUtils.clamp(((e.clientX - rect.left) / rect.width) * 2 - 1, -1, 1);
    tilt.y = THREE.MathUtils.clamp(((e.clientY - rect.top) / rect.height) * 2 - 1, -1, 1);
  };
  window.addEventListener("pointermove", onWindowPointer, { passive: true });

  const canvas = renderer.domElement;
  canvas.addEventListener("pointermove", onMove);
  canvas.addEventListener("pointerleave", onLeave);
  canvas.addEventListener("click", onClick);

  // Bingkai kamera dihitung dari batas tiap objek diorama yang diproyeksikan, supaya peta selalu mengisi
  // kanvas berapa pun rasio lebar-tingginya. Ruang ekstra di atas untuk label layanan.
  const corners: Vector3[] = [];
  for (let i = 0; i < 48; i++) {
    const a = (i / 48) * Math.PI * 2;
    corners.push(
      new THREE.Vector3(
        FLOOR_CENTER[0] + Math.cos(a) * FLOOR_RADIUS * 0.9,
        0,
        FLOOR_CENTER[1] + Math.sin(a) * FLOOR_RADIUS * 0.9,
      ),
    );
  }
  const meshBox = new THREE.Box3();
  for (const asset of assets) {
    for (const child of asset.group.children) {
      meshBox.setFromObject(child);
      for (let i = 0; i < 8; i++) {
        corners.push(
          new THREE.Vector3(
            i & 1 ? meshBox.max.x : meshBox.min.x,
            (i & 2 ? meshBox.max.y : meshBox.min.y) + (i & 2 ? 0.5 : 0),
            i & 4 ? meshBox.max.z : meshBox.min.z,
          ),
        );
      }
    }
  }
  // Batas diukur di semua sudut ekstrem gerakan kamera (parallax kursor), supaya diorama tidak
  // pernah keluar dari kanvas ke mana pun kursor bergerak.
  const fit = (w: number, h: number) => {
    const aspect = w / h;
    const view = new THREE.Box2();
    const probe = new THREE.Spherical();
    for (const dTheta of [-TILT_THETA, 0, TILT_THETA]) {
      for (const dPhi of [-TILT_PHI, 0, TILT_PHI]) {
        probe.set(baseOrbit.radius, baseOrbit.phi + dPhi, baseOrbit.theta + dTheta);
        camera.position.setFromSpherical(probe).add(target);
        camera.lookAt(target);
        camera.updateMatrixWorld();
        for (const corner of corners) {
          const v = corner.clone().applyMatrix4(camera.matrixWorldInverse);
          view.expandByPoint(new THREE.Vector2(v.x, v.y));
        }
      }
    }
    camera.position.setFromSpherical(orbit).add(target);
    camera.lookAt(target);
    camera.updateMatrixWorld();
    const size = view.getSize(new THREE.Vector2()).multiplyScalar(1.06);
    const center = view.getCenter(new THREE.Vector2());
    const viewHeight = Math.max(size.y, size.x / aspect);
    const viewWidth = viewHeight * aspect;
    Object.assign(camera, {
      left: center.x - viewWidth / 2,
      right: center.x + viewWidth / 2,
      top: center.y + viewHeight / 2,
      bottom: center.y - viewHeight / 2,
    });
    camera.updateProjectionMatrix();
  };
  fit(width, height);

  const highlight = new THREE.Color(COLORS.lime);
  const projected = new THREE.Vector3();
  let lastTime = 0;
  let previous = -1;

  const render = (time: number) => {
    const dt = previous < 0 ? 0 : Math.max(0, time - previous);
    previous = time;
    lastTime = time;
    const k = reduceMotion ? 1 : 1 - Math.exp(-dt * 6);
    const active = bridge.active;
    const ease = (current: number, target: number) => current + (target - current) * k;

    orbit.theta += (baseOrbit.theta + tilt.x * TILT_THETA - orbit.theta) * (reduceMotion ? 1 : 1 - Math.exp(-dt * 4));
    orbit.phi += (baseOrbit.phi + tilt.y * TILT_PHI - orbit.phi) * (reduceMotion ? 1 : 1 - Math.exp(-dt * 4));
    camera.position.setFromSpherical(orbit).add(target);
    camera.lookAt(target);

    const blueprint = active === "engineering";
    for (const asset of assets) {
      const focused = !active || active === "maintenance" || blueprint || active === asset.slug;
      for (const m of asset.materials) {
        m.opacity = ease(m.opacity, blueprint ? 0.08 : focused ? 1 : 0.22);
        m.emissiveIntensity = ease(m.emissiveIntensity, active === asset.slug && !blueprint ? 0.22 : 0);
        if (m !== windows.material) m.emissive.copy(highlight);
      }
    }
    (windows.material as MeshStandardMaterial).emissiveIntensity = blueprint ? 0 : 0.6;
    edgesMaterial.opacity = ease(edgesMaterial.opacity, blueprint ? 0.95 : 0);
    floorMaterial.uniforms.uOpacity.value = ease(
      floorMaterial.uniforms.uOpacity.value,
      blueprint ? 0.5 : FLOOR_OPACITY,
    );
    shadowMaterial.opacity = ease(shadowMaterial.opacity, blueprint ? 0 : 0.3);
    wireMaterial.opacity = ease(
      wireMaterial.opacity,
      blueprint || (active && active !== "integration" && active !== "maintenance") ? 0.3 : 1,
    );

    // Arus listrik: lebih deras saat mode Renewable.
    const speed = active === "renewable" ? 2.4 : 1;
    let i = 0;
    for (const route of routes) {
      for (let p = 0; p < route.count; p++) {
        const t = (p / route.count + (time * 0.06 * speed * 12) / route.path.getLength()) % 1;
        // CurvePath bisa mengembalikan null tepat di ujung jalur karena pembulatan; jepit sedikit di bawah 1.
        const point = route.path.getPointAt(Math.min(t, 0.9999), projected);
        if (point) particlePositions.set([point.x, point.y + 0.04, point.z], i * 3);
        i++;
      }
    }
    particleGeometry.attributes.position.needsUpdate = true;
    particleMaterial.opacity = ease(particleMaterial.opacity, blueprint ? 0.25 : 1);

    // Paket data.
    const dataOn = active === "integration" ? 1 : 0;
    linkMaterial.opacity = ease(linkMaterial.opacity, dataOn * 0.7);
    packetMaterial.opacity = ease(packetMaterial.opacity, dataOn);
    links.forEach((from, l) => {
      for (let p = 0; p < packetsPerLink; p++) {
        const t = (time * 0.35 + p / packetsPerLink + l * 0.17) % 1;
        projected.copy(from).lerp(antenna, t);
        packetPositions.set([projected.x, projected.y, projected.z], (l * packetsPerLink + p) * 3);
      }
    });
    packetGeometry.attributes.position.needsUpdate = true;

    // Inspeksi O&M.
    const inspecting = active === "maintenance" ? 1 : 0;
    const sweepX = -11.5 + ((time * 6) % 24);
    sweep.position.x = sweepX;
    sweepMaterial.opacity = ease(sweepMaterial.opacity, inspecting * 0.12);
    for (const b of beacons) {
      const near = Math.abs(b.mesh.position.x - sweepX) < 0.8;
      b.material.opacity = ease(b.material.opacity, inspecting);
      b.material.color.setHex(near ? COLORS.lime : COLORS.teal);
      b.mesh.position.y = b.base + Math.sin(time * 2 + b.mesh.position.x) * 0.08;
      b.mesh.rotation.y = time;
      b.mesh.scale.setScalar(near ? 1.5 : 1);
    }

    // Label HTML mengikuti titik layanan aktif.
    const label = bridge.label;
    if (label) {
      if (active) {
        projected.set(...LABEL_ANCHOR[active]).project(camera);
        const rect = canvas.getBoundingClientRect();
        const half = label.offsetWidth / 2;
        const x = THREE.MathUtils.clamp(((projected.x + 1) / 2) * rect.width, half + 8, rect.width - half - 8);
        const y = Math.max(((1 - projected.y) / 2) * rect.height, label.offsetHeight + 8);
        label.style.transform = `translate(${Math.round(x)}px, ${Math.round(y)}px) translate(-50%, -100%)`;
        label.style.opacity = "1";
      } else {
        label.style.opacity = "0";
      }
    }

    renderer.render(scene, camera);
  };

  bridge.invalidate = () => render(lastTime);

  return {
    render,
    resize: fit,
    dispose() {
      bridge.invalidate = () => {};
      window.removeEventListener("pointermove", onWindowPointer);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
      canvas.removeEventListener("click", onClick);
      disposables.forEach((d) => d.dispose());
    },
  };
};

const ORDER: (ServiceSlug | null)[] = [null, ...serviceSlugs];
const TOUR_MS = 4200;

type MapState = {
  lang: Locale;
  services: Dictionary["services"];
  labels: Dictionary["map"];
  active: ServiceSlug | null;
  focus: (slug: ServiceSlug) => void;
  release: () => void;
};

const MapContext = createContext<MapState | null>(null);

function useMapState() {
  const state = useContext(MapContext);
  if (!state) throw new Error("SystemMapCanvas/SystemMapLegend harus berada di dalam SystemMapProvider");
  return state;
}

// Menyimpan layanan yang sedang disorot, dibagi antara kanvas 3D dan daftar layanan di hero.
export function SystemMapProvider({
  lang,
  services,
  labels,
  children,
}: {
  lang: Locale;
  services: Dictionary["services"];
  labels: Dictionary["map"];
  children: ReactNode;
}) {
  const router = useRouter();
  const [active, setActive] = useState<ServiceSlug | null>(null);
  const [paused, setPaused] = useState(false);

  // Tur otomatis hanya untuk layar sentuh (tanpa hover); dengan mouse, pengunjung sendiri yang menjelajah.
  useEffect(() => {
    const touchOnly = window.matchMedia("(hover: none)").matches;
    if (paused || !touchOnly || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      setActive((current) => ORDER[(ORDER.indexOf(current) + 1) % ORDER.length]);
    }, TOUR_MS);
    return () => window.clearInterval(id);
  }, [paused]);

  useEffect(() => {
    bridge.active = active;
    bridge.invalidate();
  }, [active]);

  useEffect(() => {
    bridge.hover = (slug) => {
      if (slug) {
        setPaused(true);
        setActive(slug);
      } else {
        setPaused(false);
        setActive(null);
      }
    };
    bridge.select = (slug) => router.push(localePath(lang, `/layanan#${slug}`));
  }, [router, lang]);

  const value: MapState = {
    lang,
    services,
    labels,
    active,
    focus: (slug) => {
      setPaused(true);
      setActive(slug);
    },
    // Kembali ke tampilan umum sistem setelah kursor atau fokus meninggalkan layanan.
    release: () => {
      setPaused(false);
      setActive(null);
    },
  };

  return <MapContext value={value}>{children}</MapContext>;
}

export function SystemMapCanvas({ className = "" }: { className?: string }) {
  const container = useRef<HTMLDivElement>(null);
  const status = useThreeScene(container, setup, 2);
  const { active, services, labels } = useMapState();
  const activeService = active ? services[active] : undefined;

  return (
    <div className={`relative ${className}`}>
      <div ref={container} className="absolute inset-0" />
      <div
        ref={(el) => {
          bridge.label = el;
        }}
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-0 max-w-60 rounded-xs bg-paper px-gr-sm py-gr-sm text-ink opacity-0 shadow-lg transition-opacity duration-300"
      >
        {activeService && (
          <>
            <span className="block font-mono text-gr-xs text-blue">{activeService.code}</span>
            <span className="block text-gr-base font-semibold">{activeService.title}</span>
          </>
        )}
      </div>
      {status === "loading" && (
        <p className="absolute inset-0 grid place-items-center font-mono text-gr-xs text-mist">{labels.loading}</p>
      )}
      {status === "failed" && (
        <p className="absolute inset-0 grid place-items-center px-gr-lg text-center text-gr-base text-mist">
          {labels.failed}
        </p>
      )}
    </div>
  );
}

// Daftar layanan berjajar mendatar di bawah hero; menyorot layanan di peta saat diarahkan atau difokus.
export function SystemMapLegend() {
  const { lang, services, labels, active, focus, release } = useMapState();

  return (
    <nav aria-labelledby="peta-layanan">
      <h2 id="peta-layanan" className="font-mono text-gr-xs font-medium text-lime">
        {labels.heading}
      </h2>
      <ol className="mt-gr-sm grid grid-cols-2 border-t border-white/15 lg:grid-cols-4">
        {serviceSlugs.map((slug, i) => {
          const service = services[slug];
          const isActive = active === slug;
          return (
            <li key={slug} className="border-b border-white/15 lg:border-b-0 lg:border-r lg:last:border-r-0">
              <Link
                href={localePath(lang, `/layanan#${slug}`)}
                onMouseEnter={() => focus(slug)}
                onFocus={() => focus(slug)}
                onMouseLeave={release}
                onBlur={release}
                className={`flex h-full gap-gr-sm px-gr-sm py-gr-sm transition-colors ${isActive ? "bg-white/10" : "hover:bg-white/5"}`}
              >
                <span className={`display text-gr-base ${isActive ? "text-lime" : "text-mist"}`}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>
                  <span className="block text-gr-base font-semibold">{service.title}</span>
                  <span
                    className={`mt-gr-xs hidden text-gr-xs leading-gr-snug sm:block short:hidden ${isActive ? "text-paper" : "text-mist"}`}
                  >
                    {service.role}
                  </span>
                </span>
              </Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
