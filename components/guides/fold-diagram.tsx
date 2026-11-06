import type { ArrowType, Diagram, Item, LineStyle } from "@/lib/guides/diagram";
import { add, type P, scale, sub } from "@/lib/guides/geom";

/**
 * Draws one fold diagram as inline SVG in the Paper Menagerie style: cream and
 * coloured paper, navy ink lines, Yoshizawa–Randlett fold lines and arrows.
 * The drawing is scaled to fit the panel; arrow heads and line weights stay the
 * same size on screen whatever the scale.
 */

export const INK = "#1F2A44";
export const WHITE_SIDE = "#FFFDF8";

const W = 240;
const H = 200;
const PAD = 18;

const LINE: Record<LineStyle, { width: number; dash?: string; opacity?: number; color?: string }> = {
  edge: { width: 2 },
  cut: { width: 2, dash: "3 4", color: "#D23F2C" },
  valley: { width: 2, dash: "7 5" },
  mountain: { width: 2, dash: "9 4 2 4 2 4" },
  crease: { width: 1.1, opacity: 0.45 },
  hidden: { width: 1.5, dash: "1.5 4", opacity: 0.7 },
};

function bounds(items: Diagram) {
  const pts: P[] = [];
  for (const it of items) {
    if (it.k === "face") pts.push(...it.pts);
    else if (it.k === "line") pts.push(it.a, it.b);
    else if (it.k === "arrow") pts.push(it.from, it.to, control(it.from, it.to, it.bend));
    else if (it.k === "dot" || it.k === "eye") pts.push(it.at);
  }
  let x0 = Infinity;
  let y0 = Infinity;
  let x1 = -Infinity;
  let y1 = -Infinity;
  for (const [x, y] of pts) {
    x0 = Math.min(x0, x);
    y0 = Math.min(y0, y);
    x1 = Math.max(x1, x);
    y1 = Math.max(y1, y);
  }
  return { x0, y0, x1, y1 };
}

function control(from: P, to: P, bend: number): P {
  const d = sub(to, from);
  return add(scale(add(from, to), 0.5), scale([d[1], -d[0]], bend));
}

const f = (n: number) => Number(n.toFixed(2));
const pt = (p: P) => `${f(p[0])},${f(p[1])}`;

function unit(v: P): P {
  const l = Math.hypot(v[0], v[1]) || 1;
  return [v[0] / l, v[1] / l];
}

/** A solid triangular head at `tip`, pointing along `dir`. */
function solidHead(tip: P, dir: P, key: string) {
  const u = unit(dir);
  const n: P = [-u[1], u[0]];
  const base = sub(tip, scale(u, 11));
  return (
    <polygon
      key={key}
      points={[tip, add(base, scale(n, 5.5)), sub(base, scale(n, 5.5))].map(pt).join(" ")}
      fill={INK}
    />
  );
}

/** An open, one-sided head (mountain folds and unfolding). */
function openHead(tip: P, dir: P, key: string) {
  const u = unit(dir);
  const n: P = [-u[1], u[0]];
  const base = sub(tip, scale(u, 12));
  return (
    <polygon
      key={key}
      points={[tip, add(base, scale(n, 6.5)), base].map(pt).join(" ")}
      fill={WHITE_SIDE}
      stroke={INK}
      strokeWidth={1.6}
      strokeLinejoin="round"
    />
  );
}

function drawArrow(type: ArrowType, from: P, to: P, c: P, key: string) {
  if (type === "push") {
    // A hollow arrow with a notched tail, pointing at `to`.
    const u = unit(sub(to, from));
    const n: P = [-u[1], u[0]];
    const tip = to;
    const neck = sub(tip, scale(u, 12));
    const tail = sub(tip, scale(u, 34));
    const shape = [
      tip,
      add(neck, scale(n, 10)),
      add(neck, scale(n, 4.5)),
      add(tail, scale(n, 4.5)),
      sub(tail, scale(u, -5)),
      sub(tail, scale(n, 4.5)),
      sub(neck, scale(n, 4.5)),
      sub(neck, scale(n, 10)),
    ];
    return (
      <polygon
        key={key}
        points={shape.map(pt).join(" ")}
        fill={WHITE_SIDE}
        stroke={INK}
        strokeWidth={1.8}
        strokeLinejoin="round"
      />
    );
  }
  return (
    <g key={key}>
      <path
        d={`M${pt(from)} Q${pt(c)} ${pt(to)}`}
        fill="none"
        stroke={INK}
        strokeWidth={1.8}
        strokeLinecap="round"
      />
      {type === "mountain" || type === "pull"
        ? openHead(to, sub(to, c), "h")
        : solidHead(to, sub(to, c), "h")}
      {type === "unfold" && openHead(from, sub(from, c), "t")}
    </g>
  );
}

/** Turn over: an arrow with a loop in its stem. */
export function TurnOverMark({ x = W - 40, y = 26 }: { x?: number; y?: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path
        d="M-4 8 C 6 8, 14 4, 16 -4 C 18 -12, 8 -14, 6 -6 C 4 2, 14 8, 30 8"
        fill="none"
        stroke={INK}
        strokeWidth={1.8}
        strokeLinecap="round"
      />
      {solidHead([34, 8], [1, 0], "h")}
    </g>
  );
}

function RotateSymbol() {
  const cx = W - 26;
  const cy = 24;
  const r = 12;
  const start: P = [cx, cy - r];
  const end: P = [cx - r, cy];
  return (
    <g>
      <circle cx={cx} cy={cy} r={r + 5} fill="none" stroke={INK} strokeWidth={1.4} opacity={0.35} />
      <path d={`M${pt(start)} A${r} ${r} 0 1 1 ${pt(end)}`} fill="none" stroke={INK} strokeWidth={1.8} />
      {solidHead(end, [0, -1], "r")}
    </g>
  );
}

export function FoldDiagram({
  diagram,
  color,
  label,
  className,
}: {
  diagram: Diagram;
  color: string;
  /** Alt text: what the diagram shows. */
  label: string;
  className?: string;
}) {
  const b = bounds(diagram);
  // Leave the top-right corner clear for a turn-over or rotate symbol.
  const room = diagram.some((it) => it.k === "symbol") ? 44 : 0;
  const s = Math.min((W - 2 * PAD - room) / (b.x1 - b.x0 || 1), (H - 2 * PAD) / (b.y1 - b.y0 || 1));
  const ox = (W - room - (b.x1 - b.x0) * s) / 2 - b.x0 * s;
  const oy = (H - (b.y1 - b.y0) * s) / 2 - b.y0 * s;
  const map = (p: P): P => [p[0] * s + ox, p[1] * s + oy];

  const paper: React.ReactNode[] = [];
  const overlay: React.ReactNode[] = [];
  diagram.forEach((it: Item, i) => {
    const key = `${it.k}-${i}`;
    if (it.k === "face") {
      paper.push(
        <polygon
          key={key}
          points={it.pts.map(map).map(pt).join(" ")}
          fill={it.side === "front" ? color : WHITE_SIDE}
          stroke={INK}
          strokeWidth={2}
          strokeLinejoin="round"
        />,
      );
    } else if (it.k === "line") {
      const st = LINE[it.style];
      paper.push(
        <line
          key={key}
          x1={f(map(it.a)[0])}
          y1={f(map(it.a)[1])}
          x2={f(map(it.b)[0])}
          y2={f(map(it.b)[1])}
          stroke={st.color ?? INK}
          strokeWidth={st.width}
          strokeDasharray={st.dash}
          strokeOpacity={st.opacity}
          strokeLinecap={st.dash ? "butt" : "round"}
        />,
      );
    } else if (it.k === "dot") {
      paper.push(
        <circle key={key} cx={f(map(it.at)[0])} cy={f(map(it.at)[1])} r={it.r} fill={it.fill ?? INK} />,
      );
    } else if (it.k === "eye") {
      const [x, y] = map(it.at);
      const w = it.w / 2;
      paper.push(
        <path
          key={key}
          d={`M${f(x - w)} ${f(y)} Q${f(x)} ${f(y + w * 0.9)} ${f(x + w)} ${f(y)}`}
          fill="none"
          stroke={INK}
          strokeWidth={2.4}
          strokeLinecap="round"
        />,
      );
    } else if (it.k === "arrow") {
      const from = map(it.from);
      const to = map(it.to);
      overlay.push(drawArrow(it.type, from, to, control(from, to, it.bend), key));
    } else if (it.type === "turn") {
      overlay.push(<TurnOverMark key={key} />);
    } else {
      overlay.push(<RotateSymbol key={key} />);
    }
  });

  return (
    <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={label} className={className}>
      {paper}
      {overlay}
    </svg>
  );
}
