import { arrow, crease, type DiagramSet, dot, face, mountain, turnOver, valley } from "@/lib/guides/diagram";
import type { P } from "@/lib/guides/geom";

/*
 * An easy panda face, from a square that is dark on one side and white on the
 * other, turned as a diamond with the white side up. There is no single
 * traditional panda face; this is the simplest common one (origami-
 * instructions.com's panda), checked against its step photos. The dark side
 * makes the ears; the eyes are drawn. The top fold and chin fold are set by
 * eye in the source; these positions match its photos.
 */

const T: P = [50, 0];
const R: P = [100, 50];
const B: P = [50, 100];
const L: P = [0, 50];
const C: P = [50, 50];
const diamond = [T, R, B, L];

const hexagon: P[] = [[25, 75], B, [75, 75], [75, 25], T, [25, 25]];
const sideL: P[] = [C, [25, 25], [25, 75]];
const sideR: P[] = [C, [75, 25], [75, 75]];

// The top point folds down along y = 40.6 (about 2 cm above the middle on a 15 cm square).
const fy = 40.6;
const tipY = 2 * fy; // 81.2
const lower: P[] = [[25, fy], [75, fy], [75, 75], B, [25, 75]];
const faceFlap: P[] = [
  [fy, fy],
  [100 - fy, fy],
  [75, 2 * fy - 25],
  [50, tipY],
  [25, 2 * fy - 25],
];
const earL: P[] = [
  [25, fy],
  [fy, fy],
  [25, 2 * fy - 25],
];
const earR: P[] = earL.map(([x, y]): P => [100 - x, y]);
// The chin: the white point folds behind along y = 67.
const chin = 67;
const chinHalf = tipY - chin; // half-width of the face at the chin line
const faceChin: P[] = [
  [fy, fy],
  [100 - fy, fy],
  [75, 2 * fy - 25],
  [50 + chinHalf, chin],
  [50 - chinHalf, chin],
  [25, 2 * fy - 25],
];
// The bottom point folds up to the crease at y = 75.
const lowerFolded: P[] = [
  [25, fy],
  [75, fy],
  [75, 75],
  [62.5, 87.5],
  [37.5, 87.5],
  [25, 75],
];
const bib: P[] = [
  [37.5, 87.5],
  [62.5, 87.5],
  [50, 75],
];

const finished = [
  face(lowerFolded),
  face(bib, "back"),
  face(faceChin, "back"),
  face(earL),
  face(earR),
  dot([40, 53], 14),
  dot([60, 53], 14),
  dot([41, 52], 4, "#FFFDF8"),
  dot([59, 52], 4, "#FFFDF8"),
  dot([50, 62], 5),
];

export const panda: DiagramSet = {
  color: "#4A5470",
  tile: "#DDF3EA",
  steps: [
    // 1. White side up: fold and unfold both diagonals.
    [
      face(diamond, "back"),
      valley(L, R),
      valley(T, B),
      arrow("unfold", T, B, -0.4),
      arrow("unfold", L, R, 0.4),
    ],
    // 2. Fold the top and bottom corners to the centre, and unfold.
    [
      face(diamond, "back"),
      crease(L, R),
      crease(T, B),
      valley([25, 25], [75, 25]),
      valley([25, 75], [75, 75]),
      arrow("unfold", T, [50, 46], 0.7),
      arrow("unfold", B, [50, 54], -0.7),
    ],
    // 3. Fold the left and right corners to the centre.
    [
      face(diamond, "back"),
      crease(L, R),
      crease(T, B),
      crease([25, 25], [75, 25]),
      crease([25, 75], [75, 75]),
      valley([25, 25], [25, 75]),
      valley([75, 25], [75, 75]),
      arrow("valley", L, [46, 50], -0.5),
      arrow("valley", R, [54, 50], 0.5),
    ],
    // 4. Turn over.
    [
      face(hexagon, "back"),
      crease([25, 25], [75, 25]),
      crease([25, 75], [75, 75]),
      face(sideL),
      face(sideR),
      turnOver,
    ],
    // 5. Fold the top point down, a little above the middle.
    [
      face(hexagon),
      crease([25, 25], [75, 25]),
      crease([25, 75], [75, 75]),
      valley([25, fy], [75, fy]),
      arrow("valley", T, [50, tipY - 3], 0.55),
    ],
    // 6. Fold the white point behind to make the chin.
    [
      face(lower),
      crease([25, 75], [75, 75]),
      face(faceFlap, "back"),
      face(earL),
      face(earR),
      mountain([50 - chinHalf, chin], [50 + chinHalf, chin]),
      arrow("mountain", [50, tipY - 2], [50, chin - 9], -0.9),
    ],
    // 7. Fold the bottom point up to the crease.
    [
      face(lower),
      crease([25, 75], [75, 75]),
      face(faceChin, "back"),
      face(earL),
      face(earR),
      valley([37.5, 87.5], [62.5, 87.5]),
      arrow("valley", B, [50, 77], 0.8),
    ],
    // 8. Draw the eye patches, eyes and nose.
    finished,
  ],
  finished,
};
