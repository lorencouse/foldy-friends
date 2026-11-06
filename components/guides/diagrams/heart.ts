import { arrow, crease, type DiagramSet, face, turnOver, valley } from "@/lib/guides/diagram";
import type { P } from "@/lib/guides/geom";

/*
 * The traditional easy heart, from a square turned as a diamond, white side
 * up. Checked against origami-instructions.com's easy heart, origami-shop.com
 * and World Vision NZ's heart. The last two folds (top points and side points)
 * are placed by eye in every source; these are clean positions that match.
 *
 * Diamond corners: T (50,0), R (100,50), B (50,100), L (0,50).
 */

const T: P = [50, 0];
const R: P = [100, 50];
const B: P = [50, 100];
const L: P = [0, 50];
const C: P = [50, 50];
const diamond = [T, R, B, L];

const topFlap: P[] = [[25, 25], [75, 25], C];
const pentagon: P[] = [[25, 25], [75, 25], R, B, L];
const hexagon: P[] = [[25, 25], [75, 25], R, [87.5, 62.5], [12.5, 62.5], L];
const bottomFlap: P[] = [
  [12.5, 62.5],
  [87.5, 62.5],
  [50, 25],
];

// After the bottom edges fold up to the centre line: a V with two lobes.
const v: P[] = [
  [50, 62.5],
  [81.25, 31.25],
  [62.5, 12.5],
  [50, 25],
  [37.5, 12.5],
  [18.75, 31.25],
];
const lobeR: P[] = [
  [50, 25],
  [75, 25],
  [81.25, 31.25],
  [62.5, 12.5],
];
const lobeL: P[] = lobeR.map(([x, y]): P => [100 - x, y]);
// Top points folded down along y = 20.
const vTips: P[] = [
  [50, 62.5],
  [81.25, 31.25],
  [70, 20],
  [55, 20],
  [50, 25],
  [45, 20],
  [30, 20],
  [18.75, 31.25],
];
const lobeRTip: P[] = [
  [50, 25],
  [75, 25],
  [81.25, 31.25],
  [70, 20],
  [55, 20],
];
const tipR: P[] = [
  [55, 20],
  [70, 20],
  [62.5, 27.5],
];
const mirror = (pts: P[]) => pts.map(([x, y]): P => [100 - x, y]);

const heartShape: P[] = [
  [50, 62.5],
  [75, 37.5],
  [75, 25],
  [70, 20],
  [55, 20],
  [50, 25],
  [45, 20],
  [30, 20],
  [25, 25],
  [25, 37.5],
];

export const heart: DiagramSet = {
  color: "#D23F2C",
  tile: "#FCE6EC",
  steps: [
    // 1. White side up: fold and unfold both diagonals.
    [
      face(diamond, "back"),
      valley(L, R),
      valley(T, B),
      arrow("unfold", T, B, -0.4),
      arrow("unfold", L, R, 0.4),
    ],
    // 2. Fold the top corner down to the centre.
    [
      face(diamond, "back"),
      crease(L, R),
      crease(T, B),
      valley([25, 25], [75, 25]),
      arrow("valley", T, [50, 47], 0.5),
    ],
    // 3. Fold the bottom corner up to the middle of the top edge.
    [
      face(pentagon, "back"),
      crease(L, R),
      crease([50, 50], B),
      face(topFlap),
      valley([12.5, 62.5], [87.5, 62.5]),
      arrow("valley", B, [50, 28], 0.55),
    ],
    // 4. Fold each half of the bottom edge up to the centre line. Turn over.
    [
      face(hexagon, "back"),
      face(topFlap),
      face(bottomFlap),
      crease([50, 25], [50, 62.5]),
      valley([50, 62.5], [81.25, 31.25]),
      valley([50, 62.5], [18.75, 31.25]),
      arrow("valley", R, [64, 15], -0.45),
      arrow("valley", L, [36, 15], 0.45),
      turnOver,
    ],
    // 5. Fold the two top points down.
    [
      face(v),
      face(lobeR, "back"),
      face(lobeL, "back"),
      valley([55, 20], [70, 20]),
      valley([30, 20], [45, 20]),
      arrow("valley", [62.5, 12.5], [62.5, 26], -0.9),
      arrow("valley", [37.5, 12.5], [37.5, 26], 0.9),
    ],
    // 6. Fold the two side points in. Turn over.
    [
      face(vTips),
      face(lobeRTip, "back"),
      face(mirror(lobeRTip), "back"),
      face(tipR),
      face(mirror(tipR)),
      valley([75, 25], [75, 37.5]),
      valley([25, 25], [25, 37.5]),
      arrow("valley", [81.25, 31.25], [70, 31.25], -0.9),
      arrow("valley", [18.75, 31.25], [30, 31.25], 0.9),
      turnOver,
    ],
    // 7. The finished heart.
    [face(heartShape), crease([50, 25], [50, 62.5])],
  ],
  finished: [face(heartShape), crease([50, 25], [50, 62.5])],
};
