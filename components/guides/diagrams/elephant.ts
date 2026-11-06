import { arrow, crease, type DiagramSet, dot, edge, face, mountain, valley } from "@/lib/guides/diagram";
import type { P } from "@/lib/guides/geom";

/*
 * The easy elephant face, with big ears and a pleated trunk, from a square
 * turned as a diamond, white side up. Checked against origamiway's easy
 * elephant and World Vision NZ's elephant, which match fold for fold. The ear
 * tips and the trunk pleats are set by eye in both; these positions match
 * their photos. After the first fold the sheet is two layers with the coloured
 * side out, so every visible face is coloured.
 */

const T: P = [50, 0];
const R: P = [100, 50];
const B: P = [50, 100];
const L: P = [0, 50];
const diamond = [T, R, B, L];
// The edge-to-centre folds run from B to the top edge at x = 50 − 50·tan 22.5°;
// the folded corners land on the centre line at the same height, y = 29.29.
const k = 50 - 50 * Math.tan(Math.PI / 8);
const a: P = [k, 50];
const b: P = [100 - k, 50];
const triangle: P[] = [L, R, B];
const middle: P[] = [a, b, B];
const flapL: P[] = [[50, k], a, B];
const flapR: P[] = flapL.map(([x, y]): P => [100 - x, y]);

// Ears: each flap's tip folds out along a–(50, 70.71).
const e = 100 - k; // 70.71: the ears' lower edges
const earL: P[] = [a, [2 * k - 50, e], [50, e]];
const earR: P[] = earL.map(([x, y]): P => [100 - x, y]);
const lowerL: P[] = [a, [50, e], B];
const lowerR: P[] = lowerL.map(([x, y]): P => [100 - x, y]);
const forehead: P[] = [a, b, [50, e]];
// Ear tips fold in along x = 18.93.
const f = (2 * k - 50 + k) / 2; // 18.93: halfway from the ear tip to a
const earLFolded: P[] = [a, [f, (50 + e) / 2], [f, e], [50, e]];
const tipL: P[] = [
  [f, (50 + e) / 2],
  [k, e],
  [f, e],
];
const mirror = (pts: P[]) => pts.map(([x, y]): P => [100 - x, y]);

// Accordion pleats across the trunk, from the tip up to the ears.
const trunkHalfWidth = (y: number) => (12.13 * (100 - y)) / (100 - e);
const pleatYs = [96, 92, 88, 84, 80, 76];
const pleats = pleatYs.map((y, i) => {
  const w = trunkHalfWidth(y);
  return (i % 2 === 0 ? valley : mountain)([50 - w, y], [50 + w, y]);
});
const ridges = pleatYs.map((y) => {
  const w = trunkHalfWidth(y);
  return edge([50 - w, y], [50 + w, y]);
});

const faceParts = [
  face(lowerL),
  face(lowerR),
  face(forehead),
  face(earLFolded),
  face(tipL),
  face(mirror(earLFolded)),
  face(mirror(tipL)),
];

const finished = [...faceParts, ...ridges, dot([42, 57], 3.5), dot([58, 57], 3.5)];

export const elephant: DiagramSet = {
  color: "#8DB8EC",
  tile: "#E1EEFB",
  steps: [
    // 1. White side up: fold the top corner down to the bottom corner.
    [face(diamond, "back"), valley(L, R), arrow("valley", T, [50, 97], 0.5)],
    // 2. Fold and unfold side to side.
    [face(triangle), valley([50, 50], B), arrow("unfold", [2, 52], [98, 52], -0.4)],
    // 3. Fold both slanted edges in to the centre crease.
    [
      face(triangle),
      crease([50, 50], B),
      valley(B, a),
      valley(B, b),
      arrow("valley", L, [47, 33], 0.4),
      arrow("valley", R, [53, 33], -0.4),
    ],
    // 4. Fold the two top points out sideways to make the ears.
    [
      face(middle),
      face(flapL),
      face(flapR),
      valley(a, [50, e]),
      valley(b, [50, e]),
      arrow("valley", [48, 32], [11, 68], -0.45),
      arrow("valley", [52, 32], [89, 68], 0.45),
    ],
    // 5. Fold the tip of each ear in.
    [
      face(lowerL),
      face(lowerR),
      face(forehead),
      face(earL),
      face(earR),
      valley([f, (50 + e) / 2], [f, e]),
      valley([100 - f, (50 + e) / 2], [100 - f, e]),
      arrow("valley", [9.5, e - 1], [28, e - 3], -0.9),
      arrow("valley", [90.5, e - 1], [72, e - 3], 0.9),
    ],
    // 6. Pleat the trunk: fold it up and down like a fan, from the tip to the ears.
    [...faceParts, ...pleats, arrow("valley", [50, 99], [50, 90], -0.8)],
    // 7. Open the pleats a little and draw the eyes.
    finished,
  ],
  finished,
};
