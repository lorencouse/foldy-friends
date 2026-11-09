import {
  arrow,
  crease,
  cut,
  type DiagramSet,
  face,
  hidden,
  mountain,
  turnOver,
  valley,
} from "@/lib/guides/diagram";
import { type P, reflect } from "@/lib/guides/geom";

// How to start origami: the basic folds, each shown on a 100 x 100 square.

const sq: P[] = [
  [0, 0],
  [100, 0],
  [100, 100],
  [0, 100],
];

// A corner turned over to show the white side: the corner (100,100) folds along x + y = 170.
const corner = reflect([100, 100], [100, 70], [70, 100]);
const curled = [
  face([
    [0, 0],
    [100, 0],
    [100, 70],
    [70, 100],
    [0, 100],
  ]),
  face([[100, 70], corner, [70, 100]], "back"),
];

// A 1 : 1.414 sheet (A4 or US letter is close): fold the top edge onto the left edge.
const rect: P[] = [
  [0, 0],
  [100, 0],
  [100, 141],
  [0, 141],
];

// Triangle from folding the square on its diagonal; the fold is the long edge (0,0)–(100,100).
const tri: P[] = [
  [0, 0],
  [100, 100],
  [0, 100],
];
const tipLine: [P, P] = [
  [0, 40],
  [40, 40],
];
const tipInside = reflect([0, 0], ...tipLine);

export const start: DiagramSet = {
  color: "#5B9BE0",
  tile: "#E1EEFB",
  steps: [
    // 1. Coloured side and white side.
    curled,
    // 2. Make a square from a rectangle.
    [
      face(rect),
      valley([0, 0], [100, 100]),
      cut([0, 100], [100, 100]),
      arrow("valley", [100, 0], [0, 100], -0.3),
    ],
    // 3. Valley fold: fold the bottom edge up to the top edge, towards you.
    [face(sq), valley([0, 50], [100, 50]), arrow("valley", [70, 100], [70, 0], 0.45)],
    // 4. Mountain fold: fold the bottom edge behind to the top edge.
    [face(sq), mountain([0, 50], [100, 50]), arrow("mountain", [70, 100], [70, 0], 0.45)],
    // 5. Fold and unfold: crease the diagonal, then open it again.
    [face(sq), valley([0, 0], [100, 100]), arrow("unfold", [0, 100], [100, 0], 0.35)],
    // 6. Turn over, left to right: the white side comes up and the crease is mirrored.
    [
      face(sq),
      crease([0, 0], [100, 100]),
      face(
        sq.map(([x, y]): P => [x + 130, y]),
        "back",
      ),
      crease([230, 0], [130, 100]),
      turnOver,
    ],
    // 7. Inside reverse fold the top point of a triangle.
    [
      face(tri),
      mountain(...tipLine),
      hidden(tipLine[1], tipInside),
      hidden(tipLine[0], tipInside),
      arrow("push", [52, 4], [24, 20]),
    ],
  ],
  finished: curled,
};
