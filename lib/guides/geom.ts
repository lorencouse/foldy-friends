/**
 * Small plane-geometry helpers for drawing fold diagrams. Diagram coordinates
 * use SVG orientation (y grows downwards). Fold results are computed from the
 * previous state with these helpers (reflecting a point across a fold line,
 * meeting two lines) rather than eyeballed, so each step follows from the last.
 */

export type P = readonly [number, number];

export const add = (a: P, b: P): P => [a[0] + b[0], a[1] + b[1]];
export const sub = (a: P, b: P): P => [a[0] - b[0], a[1] - b[1]];
export const scale = (a: P, k: number): P => [a[0] * k, a[1] * k];
export const dist = (a: P, b: P) => Math.hypot(a[0] - b[0], a[1] - b[1]);
export const lerp = (a: P, b: P, t: number): P => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
export const mid = (a: P, b: P): P => lerp(a, b, 0.5);

/** Reflect point p across the line through a and b: where p lands when you fold along a–b. */
export function reflect(p: P, a: P, b: P): P {
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  const t = ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / (dx * dx + dy * dy);
  const foot: P = [a[0] + t * dx, a[1] + t * dy];
  return [2 * foot[0] - p[0], 2 * foot[1] - p[1]];
}

/** Reflect every point of a polygon across a–b. */
export const reflectAll = (pts: readonly P[], a: P, b: P): P[] => pts.map((p) => reflect(p, a, b));

/** Where the line through a1–a2 meets the line through b1–b2. */
export function meet(a1: P, a2: P, b1: P, b2: P): P {
  const d = (a1[0] - a2[0]) * (b1[1] - b2[1]) - (a1[1] - a2[1]) * (b1[0] - b2[0]);
  if (Math.abs(d) < 1e-12) throw new Error("meet: lines are parallel");
  const s = a1[0] * a2[1] - a1[1] * a2[0];
  const t = b1[0] * b2[1] - b1[1] * b2[0];
  return [(s * (b1[0] - b2[0]) - (a1[0] - a2[0]) * t) / d, (s * (b1[1] - b2[1]) - (a1[1] - a2[1]) * t) / d];
}

/** The fold line that lays point p exactly onto point q: the perpendicular bisector of p–q. */
export function bisector(p: P, q: P): [P, P] {
  const m = mid(p, q);
  const d = sub(q, p);
  return [add(m, [-d[1], d[0]]), add(m, [d[1], -d[0]])];
}

/** Rotate p about centre c by an angle in degrees (clockwise on screen). */
export function rotate(p: P, c: P, deg: number): P {
  const r = (deg * Math.PI) / 180;
  const x = p[0] - c[0];
  const y = p[1] - c[1];
  return [c[0] + x * Math.cos(r) - y * Math.sin(r), c[1] + x * Math.sin(r) + y * Math.cos(r)];
}

/** Twice the signed area of a polygon; positive when the points run clockwise on screen. */
export function area2(pts: readonly P[]) {
  let s = 0;
  for (let i = 0; i < pts.length; i++) {
    const a = pts[i];
    const b = pts[(i + 1) % pts.length];
    s += a[0] * b[1] - b[0] * a[1];
  }
  return s;
}
