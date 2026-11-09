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
