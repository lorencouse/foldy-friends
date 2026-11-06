import type { P } from "./geom";

/**
 * A fold diagram is a list of items drawn in order: paper faces (later ones lie
 * on top), the lines on them, then arrows and symbols. Lines follow the
 * Yoshizawa–Randlett notation: a dashed line is a valley fold, a dash-dot-dot
 * line is a mountain fold, a thin solid line is an existing crease and a dotted
 * line is an edge hidden under other layers.
 */

/** Which side of the sheet a face shows: the coloured side or the white side. */
export type Side = "front" | "back";

export type Item =
  | { k: "face"; pts: readonly P[]; side: Side }
  | { k: "line"; a: P; b: P; style: LineStyle }
  | { k: "arrow"; type: ArrowType; from: P; to: P; bend: number }
  | { k: "dot"; at: P; r: number; fill?: string }
  | { k: "eye"; at: P; w: number }
  | { k: "symbol"; type: SymbolType };

export type LineStyle = "valley" | "mountain" | "crease" | "hidden" | "edge" | "cut";
/**
 * valley: fold towards you (solid head). mountain: fold behind (open half head).
 * unfold: fold, then unfold (solid head out, open head back). push: press or
 * sink here (hollow arrow, used for reverse and squash folds). pull: pull out
 * or open (open head).
 */
export type ArrowType = "valley" | "mountain" | "unfold" | "push" | "pull";
/** Symbols drawn in the corner of a panel. */
export type SymbolType = "turn" | "rotate";

export type Diagram = readonly Item[];

export type DiagramSet = {
  /** The colour of the sheet's coloured side. */
  color: string;
  /** The pale sheet the finished model sits on. */
  tile: string;
  /** One diagram per step, in order. */
  steps: readonly Diagram[];
  /** The finished model, for the guide's picture. */
  finished: Diagram;
};

export const face = (pts: readonly P[], side: Side = "front"): Item => ({ k: "face", pts, side });
export const valley = (a: P, b: P): Item => ({ k: "line", a, b, style: "valley" });
export const mountain = (a: P, b: P): Item => ({ k: "line", a, b, style: "mountain" });
export const crease = (a: P, b: P): Item => ({ k: "line", a, b, style: "crease" });
export const hidden = (a: P, b: P): Item => ({ k: "line", a, b, style: "hidden" });
export const edge = (a: P, b: P): Item => ({ k: "line", a, b, style: "edge" });
export const cut = (a: P, b: P): Item => ({ k: "line", a, b, style: "cut" });
/** A drawn mark (an eye, a nose), `r` in screen pixels. */
export const dot = (at: P, r = 3, fill?: string): Item => ({ k: "dot", at, r, fill });
export const eye = (at: P, w = 8): Item => ({ k: "eye", at, w });
export const turnOver: Item = { k: "symbol", type: "turn" };
export const rotateSymbol: Item = { k: "symbol", type: "rotate" };

/** An arrow from a point on the paper to where it lands. `bend` curves it (+ left, − right). */
export const arrow = (type: ArrowType, from: P, to: P, bend = 0.35): Item => ({
  k: "arrow",
  type,
  from,
  to,
  bend,
});
