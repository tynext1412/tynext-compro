import type { StaticImageData } from "next/image";
import type { ProjectId } from "./company";
import solarBessControl from "../../public/image/project1.jpeg";
import evCharging from "../../public/image/project2.jpeg";
import gridTestRig from "../../public/image/project3.jpeg";

// Diimpor statis supaya next/image tahu ukuran asli dan bisa membuat placeholder blur.
export const projectImages: Record<ProjectId, StaticImageData> = {
  "solar-bess-control": solarBessControl,
  "ev-charging": evCharging,
  "grid-test-rig": gridTestRig,
};
