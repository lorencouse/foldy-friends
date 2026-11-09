import { arrow, crease, type DiagramSet, face, turnOver, valley } from "@/lib/guides/diagram";
import type { P } from "@/lib/guides/geom";

/*
 * The traditional paper boat, by way of the paper hat: fold in half, corners
 * to the centre, brims up, open to a diamond, fold up, open again, pull apart.
 * Checked against Hans Bodlaender's hat and boat (Utrecht), origami.guide's
 * traditional boat and origami.me's paper boat.
 *
 * A sheet of printer paper (1 : 1.414, upright), 100 wide. Printer paper is
 * the same on both sides, so every face is drawn in one colour.
 */

const h = 70.71; // half the sheet's height
const rect: P[] = [
  [0, 0],
  [100, 0],
  [100, 2 * h],
  [0, 2 * h],
];
const half: P[] = [
  [0, 0],
  [100, 0],
  [100, h],
  [0, h],
];
const top: P = [50, 0];
const body: P[] = [top, [100, 50], [100, h], [0, h], [0, 50]];
const cornerL: P[] = [top, [0, 50], [50, 50]];
const cornerR: P[] = [top, [100, 50], [50, 50]];
const brimY = 50 - (h - 50); // 29.29: a strip h − 50 tall, folded up
const brim: P[] = [
  [0, brimY],
  [100, brimY],
  [100, 50],
  [0, 50],
];
const hat: P[] = [top, [100, 50], [0, 50]];

// The hat opened and flattened into a diamond: sides 50, diagonals 70.71.
const s = 35.355;
const D = { T: [0, 0] as P, L: [-s, s] as P, B: [0, 2 * s] as P, R: [s, s] as P };
const bandIn = 50 - brimY; // the brim strip's width, 20.71
// Each brim lies along a lower edge; its end passes the centre line and
// overlaps the other brim (tuck one end under the other).
const bandL: P[] = [
  D.B,
  D.L,
  [-s + bandIn * Math.SQRT1_2, s - bandIn * Math.SQRT1_2],
  [bandIn * Math.SQRT1_2, 2 * s - bandIn * Math.SQRT1_2],
];
const bandR: P[] = bandL.map(([x, y]): P => [-x, y]);

// Opened a second time: a smaller diamond, sides 35.36, diagonals 50.
const t = 25;
const small = { T: [0, 0] as P, L: [-t, t] as P, B: [0, 2 * t] as P, R: [t, t] as P };

const openArrows = (l: P, r: P, bottom: number) => [
  arrow("pull", l, [(l[0] + r[0]) / 2 - 3, bottom], 0.35),
  arrow("pull", r, [(l[0] + r[0]) / 2 + 3, bottom], -0.35),
];

const boat = [
  face([
    [0, -24],
    [-13, 0],
    [13, 0],
  ]),
  face([
    [-36, 0],
    [36, 0],
    [20, 22],
    [-20, 22],
  ]),
];

export const boatSet: DiagramSet = {
  color: "#F6B93B",
  tile: "#FDF0D2",
  steps: [
    // 1. Fold in half, top edge down to the bottom edge.
    [face(rect), valley([0, h], [100, h]), arrow("valley", [72, 2], [72, 2 * h - 2], -0.35)],
    // 2. Fold in half side to side and unfold, to mark the middle.
    [face(half), valley([50, 0], [50, h]), arrow("unfold", [2, 40], [98, 40], -0.35)],
    // 3. Fold the two top corners down to the centre line.
    [
      face(half),
      crease([50, 0], [50, h]),
      valley(top, [0, 50]),
      valley(top, [100, 50]),
      arrow("valley", [0, 0], [47, 47], 0.4),
      arrow("valley", [100, 0], [53, 47], -0.4),
    ],
    // 4. Fold the front layer of the bottom strip up. Turn over.
    [
      face(body),
      face(cornerL),
      face(cornerR),
      valley([0, 50], [100, 50]),
      arrow("valley", [70, h - 1], [70, brimY + 2], -0.6),
      turnOver,
    ],
    // 5. Fold this strip up too: a paper hat.
    [face(brim), face(body), valley([0, 50], [100, 50]), arrow("valley", [70, h - 1], [70, brimY + 2], -0.6)],
    // 6. Open the hat from the bottom and bring the two corners together.
    [face(hat), face(cornerL), face(cornerR), face(brim), ...openArrows([0, 50], [100, 50], 82)],
    // 7. Fold the bottom point of the front layer up to the top. Turn over and repeat.
    [
      face([D.T, D.R, D.B, D.L]),
      face(bandL),
      face(bandR),
      valley(D.L, D.R),
      arrow("valley", [0, 2 * s - 2], [0, 3], 0.7),
      turnOver,
    ],
    // 8. Open it again from the bottom, bringing the corners together.
    [face([D.L, D.R, D.T]), crease([0, 0], [0, s]), ...openArrows(D.L, D.R, s + 26)],
    // 9. Pull the two top points apart, slowly.
    [
      face([small.T, small.R, small.B, small.L]),
      crease(small.L, small.R),
      arrow("pull", [-3, 3], [-34, -6], 0.3),
      arrow("pull", [3, 3], [34, -6], -0.3),
    ],
    // 10. Shape the boat and open out the hull underneath so it floats.
    boat,
  ],
  finished: boat,
};
