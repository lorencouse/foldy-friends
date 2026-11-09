import { arrow, crease, type DiagramSet, dot, face, mountain, turnOver, valley } from "@/lib/guides/diagram";
import type { P } from "@/lib/guides/geom";

/*
 * The traditional jumping frog, from a 1 : 2 rectangle (half a square, or an
 * index card): a waterbomb-style triangle at the top for the front legs, sides
 * folded to the centre, then a Z-pleat underneath for the spring. Checked
 * against Rachel Katz's jumping frog (Oriland) and the Camp GPB frog sheet.
 *
 * The sheet is 100 wide and 200 tall, white side up to start, so the coloured
 * side becomes the frog's back.
 */

const H = 200;
const sheet: P[] = [
  [0, 0],
  [100, 0],
  [100, H],
  [0, H],
];
const x1 = valley([0, 0], [100, 100]);
const x2 = valley([100, 0], [0, 100]);
const apex: P = [50, 50];

// After the collapse: a triangle ("house" roof) on the rest of the sheet.
const lower: P[] = [
  [0, 100],
  [100, 100],
  [100, H],
  [0, H],
];
const roof: P[] = [apex, [100, 100], [0, 100]];
// Front legs: the roof's corners fold up to its point.
const legL: P[] = [apex, [25, 75], [50, 100]];
const legR: P[] = [apex, [75, 75], [50, 100]];
const cornerL: P[] = [
  [0, 100],
  [25, 75],
  [50, 100],
];
const cornerR: P[] = [
  [100, 100],
  [75, 75],
  [50, 100],
];
// Sides folded to the centre along x = 25 and x = 75.
const side = (bottom: number) => [
  face([
    [25, 75],
    [50, 100],
    [50, bottom],
    [25, bottom],
  ]),
  face([
    [75, 75],
    [50, 100],
    [50, bottom],
    [75, bottom],
  ]),
];
// The spring: the bottom folds up to the point (crease at 125), then back down (crease at 87.5).
const c1 = (H + 50) / 2;
const c2 = (50 + c1) / 2;

const frogBack: P[] = [apex, [75, 75], [75, c1], [25, c1], [25, 75]];

export const frog: DiagramSet = {
  color: "#3FB58E",
  tile: "#DDF3EA",
  steps: [
    // 1. White side up: crease both diagonals of the top square, then turn over.
    [
      face(sheet, "back"),
      x1,
      x2,
      arrow("unfold", [100, 0], [0, 100], -0.3),
      arrow("unfold", [0, 0], [100, 100], 0.3),
      turnOver,
    ],
    // 2. Fold the top edge down to the bottom of the X and unfold; crease the
    //    long centre line; turn over.
    [
      face(sheet),
      crease([0, 0], [100, 100]),
      crease([100, 0], [0, 100]),
      valley([0, 50], [100, 50]),
      valley([50, 0], [50, H]),
      arrow("unfold", [78, 1], [78, 99], -0.35),
      arrow("unfold", [0, 150], [100, 150], -0.3),
      turnOver,
    ],
    // 3. Collapse: push the sides in along the creases and bring the top edge down.
    [
      face(sheet, "back"),
      x1,
      x2,
      mountain([0, 50], [100, 50]),
      crease([50, 100], [50, H]),
      arrow("push", [-30, 50], [-2, 50]),
      arrow("push", [130, 50], [102, 50]),
      arrow("valley", [50, 2], [50, 97], 0.5),
    ],
    // 4. Fold the roof's two bottom corners up to its point: the front legs.
    [
      face(lower, "back"),
      crease([50, 100], [50, H]),
      face(roof),
      valley([25, 75], [50, 100]),
      valley([75, 75], [50, 100]),
      arrow("valley", [0, 100], [47, 54], -0.4),
      arrow("valley", [100, 100], [53, 54], 0.4),
    ],
    // 5. Fold the sides in to the centre line.
    [
      face(lower, "back"),
      crease([50, 100], [50, H]),
      face(cornerL),
      face(cornerR),
      face(legL),
      face(legR),
      valley([25, 75], [25, H]),
      valley([75, 75], [75, H]),
      arrow("valley", [2, 150], [47, 150], -0.35),
      arrow("valley", [98, 150], [53, 150], 0.35),
    ],
    // 6. Fold the bottom edge up to the frog's point.
    [
      ...side(H),
      face(legL),
      face(legR),
      valley([25, c1], [75, c1]),
      arrow("valley", [50, H - 2], [50, 53], 0.55),
    ],
    // 7. Fold the same layer back down so its edge meets the fold below: the spring.
    [
      ...side(c1),
      face(legL),
      face(legR),
      face([
        [25, 50],
        [75, 50],
        [75, c1],
        [25, c1],
      ]),
      valley([25, c2], [75, c2]),
      arrow("valley", [50, 52], [50, c1 - 2], 0.55),
    ],
    // 8. Turn over. Press on its back end and let your finger slide off.
    [
      ...side(c1),
      face(legL),
      face(legR),
      face([
        [25, c2],
        [75, c2],
        [75, c1],
        [25, c1],
      ]),
      turnOver,
    ],
  ],
  finished: [face(frogBack), crease([50, 100], [50, c1]), dot([41, 84], 3.5), dot([59, 84], 3.5)],
};
