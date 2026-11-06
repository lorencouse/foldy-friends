import { arrow, crease, type DiagramSet, dot, face, turnOver, valley } from "@/lib/guides/diagram";
import type { P } from "@/lib/guides/geom";

/*
 * The easy fox face, from a square turned as a diamond, white side up.
 * Checked against make-origami.com's fox head, DLTK's simple fox and
 * origami-instructions.com's fox face. The ears fold along lines about 30°
 * above the bottom edge (set by eye in every source; this matches
 * make-origami's photos). After the first fold the sheet is two layers with
 * the coloured side out, so every visible face is coloured.
 */

const T: P = [50, 0];
const R: P = [100, 50];
const B: P = [50, 100];
const L: P = [0, 50];
const C: P = [50, 50];
const diamond = [T, R, B, L];

const triangle: P[] = [L, R, T];
const trapezoid: P[] = [L, R, [75, 25], [25, 25]];
const topFlap: P[] = [[25, 25], [75, 25], C];
const earR: P[] = [C, [75, 6.7], [81.7, 31.7]];
const earL: P[] = [C, [25, 6.7], [18.3, 31.7]];
const head: P[] = [C, [81.7, 31.7], [75, 25], [25, 25], [18.3, 31.7]];

const finished = [
  face(earR),
  face(earL),
  face(head),
  dot([40, 33], 3.5),
  dot([60, 33], 3.5),
  dot([50, 46], 4),
];

export const fox: DiagramSet = {
  color: "#F07A3A",
  tile: "#FDE7D6",
  steps: [
    // 1. White side up: fold and unfold side to side.
    [face(diamond, "back"), valley(T, B), arrow("unfold", L, R, 0.4)],
    // 2. Fold the bottom corner up to the top corner.
    [face(diamond, "back"), crease(T, B), valley(L, R), arrow("valley", B, [50, 3], 0.55)],
    // 3. Fold the top point down to the middle of the bottom edge.
    [face(triangle), crease(C, T), valley([25, 25], [75, 25]), arrow("valley", T, [50, 47], 0.55)],
    // 4. Fold the side corners up to make the ears.
    [
      face(trapezoid),
      face(topFlap),
      valley(C, [81.7, 31.7]),
      valley(C, [18.3, 31.7]),
      arrow("valley", R, [76, 9], 0.5),
      arrow("valley", L, [24, 9], -0.5),
    ],
    // 5. Turn over.
    [face(head), face(topFlap), face(earR), face(earL), turnOver],
    // 6. Draw the eyes and nose.
    finished,
  ],
  finished,
};
