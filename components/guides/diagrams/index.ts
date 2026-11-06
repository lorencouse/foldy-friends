import type { DiagramSet } from "@/lib/guides/diagram";
import { boatSet } from "./boat";
import { crane } from "./crane";
import { elephant } from "./elephant";
import { fox } from "./fox";
import { frog } from "./frog";
import { heart } from "./heart";
import { panda } from "./panda";
import { start } from "./start";

/** Each guide's diagrams, keyed by the guide's slug. */
export const DIAGRAMS: Record<string, DiagramSet> = {
  "how-to-start-origami": start,
  crane,
  frog,
  fox,
  boat: boatSet,
  heart,
  elephant,
  panda,
};
