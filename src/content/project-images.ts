import type { StaticImageData } from "next/image";
import type { ProjectId } from "./company";
import solarBessControl from "../../public/image/project1.jpeg";
import evCharging from "../../public/image/project2.jpeg";
import gridTestRig from "../../public/image/project3.jpeg";
import wwtScada from "../../public/image/project4.jpeg";
// Versi project5.jpeg tanpa jendela browser dan dengan IP internal diburamkan.
import iknSolarScada from "../../public/image/project5-hmi.jpeg";

// Diimpor statis supaya next/image tahu ukuran asli dan bisa membuat placeholder blur.
export const projectImages: Record<ProjectId, StaticImageData> = {
  "solar-bess-control": solarBessControl,
  "ev-charging": evCharging,
  "grid-test-rig": gridTestRig,
  "wwt-scada": wwtScada,
  "ikn-solar-scada": iknSolarScada,
};
