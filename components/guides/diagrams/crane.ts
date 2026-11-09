import { arrow, crease, type DiagramSet, face, mountain, turnOver, valley } from "@/lib/guides/diagram";
import { dist, lerp, meet, mid, type P, reflect, reflectAll } from "@/lib/guides/geom";

/*
 * The traditional crane (orizuru): square base, petal folds to the bird base,
 * narrowing folds, inside reverse folds for the neck, tail and head, then the
 * wings fold down. Checked against origami.me's crane (web steps and PDF) and
 * origamiway's crane.
 *
 * The sheet is a diamond with its centre at (0,0) and corners 70.71 away
 * (a 100 x 100 square). Coloured side up to start; the square base has the
 * coloured side outside.
 */

const d = 70.71;
const T: P = [0, -d];
const R: P = [d, 0];
const B: P = [0, d];
const L: P = [-d, 0];
const O: P = [0, 0];
const diamond = [T, R, B, L];
const mTL: P = [-d / 2, -d / 2];
const mTR: P = [d / 2, -d / 2];
const mBR: P = [d / 2, d / 2];
const mBL: P = [-d / 2, d / 2];

// Square base: the closed point (the paper's centre) at the top, all four
// corners at the bottom. It sits where the bottom quarter of the sheet was.
const Lb = mBL;
const Rb = mBR;
const Bb = B;
const base = [O, Rb, Bb, Lb];

// Kite folds: the lower edges of the top layer fold to the centre line. The
// fold line meets the upper edge at K1; the edge corner lands at F.
const F: P = [0, Bb[1] - 50];
const K1 = meet(Bb, mid(Lb, F), O, Lb);
const K2: P = [-K1[0], K1[1]];
// Petal fold: the bottom point of the top layer lifts up, hinged on K1–K2.
const Ptop = reflect(Bb, K1, K2);

// Narrowing folds: the lower edges of the bird base fold to the centre line.
// The fold line runs from the bottom point to W1 on the waist (K1–K2).
const C: P = [0, K1[1]];
const K1lands: P = [0, Bb[1] - dist(Bb, K1)];
const W1 = meet(Bb, mid(K1, K1lands), K1, K2);
const W2: P = [-W1[0], W1[1]];

// Inside reverse folds: each thin lower point swings up between the wings,
// along a line from the outer edge just below the waist to the centre.
const A1 = meet(C, [-30, C[1] + 0.315 * 30], W1, Bb);
const A2: P = [-A1[0], A1[1]];
const neck = reflectAll([A1, Bb, C], A1, C);
const tail = reflectAll([A2, Bb, C], A2, C);
const tipN = neck[1];
// Head: an inside reverse fold near the tip of the neck.
const h1 = lerp(neck[0], tipN, 0.74);
const h2 = lerp(C, tipN, 0.7);
const head = reflectAll([h1, tipN, h2], h1, h2);
const neckWithHead = [face([neck[0], h1, h2, C]), face(head)];

const birdFront = face([K1, Ptop, K2], "back");
const birdLower = [face([K1, C, Bb]), face([K2, C, Bb])];
const narrowedLower = [face([W1, Bb, C]), face([W2, Bb, C])];
const wingCrease = crease(C, [0, Ptop[1] + 6]);

const finished = [...neckWithHead, face(tail), face([K1, O, K2]), face([K1, Bb, K2]), crease(O, C)];

export const crane: DiagramSet = {
  color: "#D23F2C",
  tile: "#FBE3DC",
  steps: [
    // 1. Coloured side up: fold and unfold both diagonals.
    [face(diamond), valley(L, R), valley(T, B), arrow("unfold", B, T, 0.4), arrow("unfold", L, R, -0.4)],
    // 2. Turn over.
    [face(diamond), crease(L, R), crease(T, B), turnOver],
    // 3. White side up: fold and unfold edge to edge, both ways.
    [
      face(diamond, "back"),
      crease(L, R),
      crease(T, B),
      valley(mTL, mBR),
      valley(mTR, mBL),
      arrow("unfold", R, B, 0.35),
      arrow("unfold", L, B, -0.35),
    ],
    // 4. Collapse: the left, right and top corners come down to the bottom corner.
    [
      face(diamond, "back"),
      crease(T, O),
      valley(mTL, mBR),
      valley(mTR, mBL),
      mountain(L, R),
      arrow("valley", L, [-8, d - 6], 0.3),
      arrow("valley", R, [8, d - 6], -0.3),
      arrow("valley", T, [0, d - 14], 0.45),
    ],
    // 5. Square base: fold the lower edges of the top layer to the centre line.
    [
      face(base),
      crease(O, Bb),
      valley(Bb, K1),
      valley(Bb, K2),
      arrow("valley", Lb, [-4, F[1] + 14], 0.3),
      arrow("valley", Rb, [4, F[1] + 14], -0.3),
    ],
    // 6. Fold the top down over the flaps, crease, then unfold all three.
    [
      face(base),
      face([O, K1, Bb, K2]),
      face([K1, Bb, F]),
      face([K2, Bb, F]),
      valley(K1, K2),
      arrow("unfold", [0, 3], [0, K1[1] * 2 - 2], -0.9),
    ],
    // 7. Petal fold: lift the bottom point of the top layer up; the sides fold in.
    [
      face(base),
      crease(O, Bb),
      valley(K1, K2),
      mountain(Bb, K1),
      mountain(Bb, K2),
      arrow("valley", [0, Bb[1] - 2], [0, Ptop[1] + 4], -0.55),
      arrow("valley", Lb, [-5, (K1[1] + Bb[1]) / 2], 0.3),
      arrow("valley", Rb, [5, (K1[1] + Bb[1]) / 2], -0.3),
    ],
    // 8. Turn over and repeat steps 5 to 7.
    [face(base), ...birdLower, birdFront, crease(C, [0, Ptop[1] + 6]), turnOver],
    // 9. Bird base: fold the lower edges of the front layer to the centre line.
    [
      ...birdLower,
      birdFront,
      wingCrease,
      valley(Bb, W1),
      valley(Bb, W2),
      arrow("valley", [K1[0] + 4, (K1[1] + Bb[1]) / 2 - 6], [-3, (K1[1] + Bb[1]) / 2 + 4], 0.35),
      arrow("valley", [K2[0] - 4, (K2[1] + Bb[1]) / 2 - 6], [3, (K2[1] + Bb[1]) / 2 + 4], -0.35),
    ],
    // 10. Turn over and repeat.
    [...narrowedLower, birdFront, wingCrease, turnOver],
    // 11. Inside reverse fold both thin points up between the wings.
    [
      ...narrowedLower,
      birdFront,
      wingCrease,
      mountain(A1, C),
      mountain(A2, C),
      arrow("valley", [-2, Bb[1] - 4], tipN, -0.45),
      arrow("valley", [2, Bb[1] - 4], tail[1], 0.45),
    ],
    // 12. Inside reverse fold the head.
    [
      face(neck),
      face(tail),
      face([W1, A1, C]),
      face([W2, A2, C]),
      birdFront,
      wingCrease,
      mountain(h1, h2),
      arrow("valley", tipN, head[1], 0.5),
    ],
    // 13. Fold the wings down, front and back.
    [
      ...neckWithHead,
      face(tail),
      face([W1, A1, C]),
      face([W2, A2, C]),
      birdFront,
      wingCrease,
      valley(K1, K2),
      arrow("valley", [0, Ptop[1] + 3], [0, Bb[1] - 6], 0.8),
    ],
    // 14. Shape: pull the wings gently apart so the body puffs up.
    [
      ...finished,
      arrow("pull", [K1[0] + 8, Bb[1] - 18], [K1[0] - 10, Bb[1] + 2], 0.2),
      arrow("pull", [K2[0] - 8, Bb[1] - 18], [K2[0] + 10, Bb[1] + 2], -0.2),
    ],
  ],
  finished,
};
