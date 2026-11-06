import { useId } from "react";

/**
 * Drawn product illustrations, in one flat papercraft language: faceted shapes,
 * paper colours, no gradients. Each product stores an `art` key that picks one.
 * They stand in for product photography until real photos are uploaded.
 */

type Pt = [number, number];

export const PAPER = {
  red: "#d23f2c",
  blue: "#5b9be0",
  green: "#3fb58e",
  yellow: "#f6b93b",
  pink: "#f2a0b5",
  orange: "#ee7f2d",
  teal: "#2d9c9a",
  ink: "#1f2a44",
  paper: "#fbf6ec",
  night: "#2b3768",
} as const;

const MOON_SHADES: Record<string, string[]> = {
  Yellow: ["#f6b93b", "#e9a92a", "#f9cb66"],
  Blue: ["#7fb0e6", "#6a9ed8", "#9cc4ef"],
  White: ["#f1eee6", "#dedad0", "#fbfaf6"],
};

function ring(cx: number, cy: number, rx: number, ry: number, n: number, rot = 0): Pt[] {
  return Array.from({ length: n }, (_, i) => {
    const a = rot + (i / n) * Math.PI * 2;
    return [cx + Math.cos(a) * rx, cy + Math.sin(a) * ry];
  });
}

const pts = (p: Pt[]) => p.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" ");

/** A shape split into a fan of triangles, shaded in turn: the folded-card look. */
function Faceted({
  cx,
  cy,
  rx,
  ry,
  n = 10,
  rot = 0,
  shades,
}: {
  cx: number;
  cy: number;
  rx: number;
  ry: number;
  n?: number;
  rot?: number;
  shades: string[];
}) {
  const p = ring(cx, cy, rx, ry, n, rot);
  return (
    <g>
      {p.map((a, i) => {
        const b = p[(i + 1) % n];
        return (
          <polygon
            key={i}
            points={pts([[cx, cy], a, b])}
            fill={shades[i % shades.length]}
            stroke={shades[i % shades.length]}
            strokeWidth={0.6}
          />
        );
      })}
    </g>
  );
}

function SleepyEye({ x, y, flip = false }: { x: number; y: number; flip?: boolean }) {
  const d = flip ? 1 : -1;
  return (
    <path
      d={`M${x - 7} ${y} Q${x} ${y + 6 * -d} ${x + 7} ${y}`}
      fill="none"
      stroke={PAPER.ink}
      strokeWidth={3}
      strokeLinecap="round"
    />
  );
}

function Moon({ id, tone = "Yellow" }: { id: string; tone?: string }) {
  const shades = MOON_SHADES[tone] ?? MOON_SHADES.Yellow;
  return (
    <g>
      <defs>
        <mask id={`${id}-moon`}>
          <rect width="400" height="400" fill="#fff" />
          <polygon points={pts(ring(200, 150, 132, 118, 18, 0.1))} fill="#000" />
        </mask>
      </defs>
      <g mask={`url(#${id}-moon)`}>
        <Faceted cx={200} cy={205} rx={150} ry={140} n={18} rot={0.1} shades={shades} />
      </g>
    </g>
  );
}

function Stars() {
  const s: Pt[] = [
    [60, 70],
    [330, 60],
    [355, 140],
    [90, 150],
    [250, 40],
    [40, 300],
    [360, 320],
  ];
  return (
    <g fill="#f6e7b8">
      {s.map(([x, y]) => (
        <polygon
          key={`${x}-${y}`}
          points={pts([
            [x, y - 6],
            [x + 2, y],
            [x, y + 6],
            [x - 2, y],
          ])}
        />
      ))}
    </g>
  );
}

function Kit({
  id,
  tone,
  body,
  head,
  ears,
  extra,
}: {
  id: string;
  tone?: string;
  body: string[];
  head: string[];
  ears: React.ReactNode;
  extra?: React.ReactNode;
}) {
  return (
    <>
      <rect width="400" height="400" fill={PAPER.night} />
      <Stars />
      <Moon id={id} tone={tone} />
      {/* Body curled in the cradle of the moon */}
      <Faceted cx={215} cy={262} rx={92} ry={46} n={12} rot={0.2} shades={body} />
      {extra}
      {ears}
      <Faceted cx={128} cy={238} rx={46} ry={42} n={10} rot={0.3} shades={head} />
    </>
  );
}

function KitArt({ art, id, option }: { art: string; id: string; option?: string }) {
  switch (art) {
    case "kit-elephant":
      return (
        <Kit
          id={id}
          tone={option ?? "Blue"}
          body={["#9aa6b2", "#8794a1", "#aab5c0"]}
          head={["#9aa6b2", "#8794a1", "#b3bdc7"]}
          ears={<Faceted cx={160} cy={232} rx={30} ry={36} n={7} shades={["#7d8a97", "#8c98a4"]} />}
          extra={
            <>
              <polygon points="96,250 82,286 92,304 110,300 104,282 116,262" fill="#8794a1" />
              <SleepyEye x={118} y={232} />
            </>
          }
        />
      );
    case "kit-raccoon":
      return (
        <Kit
          id={id}
          tone={option ?? "Yellow"}
          body={["#8f8a84", "#7d7872", "#a29d96"]}
          head={["#a29d96", "#8f8a84", "#b5b0a9"]}
          ears={
            <>
              <polygon points="98,214 104,180 124,206" fill="#5a5651" />
              <polygon points="140,204 158,176 164,212" fill="#5a5651" />
            </>
          }
          extra={
            <>
              {/* Striped tail curling over the body */}
              {[0, 1, 2, 3, 4].map((i) => (
                <polygon
                  key={i}
                  points={pts([
                    [292 + i * 8, 250 - i * 14],
                    [312 + i * 8, 258 - i * 14],
                    [306 + i * 8, 238 - i * 14],
                    [288 + i * 8, 232 - i * 14],
                  ])}
                  fill={i % 2 ? "#3d3a36" : "#cfcac2"}
                />
              ))}
              <g transform="translate(0 0)">
                <polygon points="94,232 162,226 166,246 92,250" fill="#3d3a36" />
              </g>
            </>
          }
        />
      );
    case "kit-panda":
      return (
        <Kit
          id={id}
          tone={option ?? "Yellow"}
          body={["#f1eee6", "#dedad0", "#fbfaf6"]}
          head={["#fbfaf6", "#e8e4da", "#f1eee6"]}
          ears={
            <>
              <Faceted cx={98} cy={206} rx={16} ry={15} n={6} shades={["#24221f", "#33302c"]} />
              <Faceted cx={156} cy={204} rx={16} ry={15} n={6} shades={["#24221f", "#33302c"]} />
            </>
          }
          extra={
            <>
              <Faceted cx={190} cy={278} rx={34} ry={22} n={7} shades={["#24221f", "#33302c"]} />
              <Faceted cx={262} cy={250} rx={26} ry={20} n={6} shades={["#24221f", "#33302c"]} />
            </>
          }
        />
      );
    default:
      return (
        <Kit
          id={id}
          tone={option ?? "White"}
          body={["#ee7f2d", "#dc6e1f", "#f39448"]}
          head={["#f39448", "#ee7f2d", "#dc6e1f"]}
          ears={
            <>
              <polygon points="94,218 92,170 122,200" fill="#dc6e1f" />
              <polygon points="138,198 168,166 164,214" fill="#dc6e1f" />
            </>
          }
          extra={
            <>
              <polygon points="290,250 344,226 330,272 300,282" fill="#ee7f2d" />
              <polygon points="330,272 344,226 360,250" fill="#fbfaf6" />
              <polygon points="96,252 128,276 150,252" fill="#fbfaf6" />
            </>
          }
        />
      );
  }
}

function Sheet({
  x,
  y,
  size,
  rot,
  front,
  back,
}: {
  x: number;
  y: number;
  size: number;
  rot: number;
  front: string;
  back?: string;
}) {
  const f = size * 0.32;
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot})`}>
      <rect x={-size / 2} y={-size / 2} width={size} height={size} fill={front} />
      {back && (
        <polygon
          points={pts([
            [size / 2 - f, -size / 2],
            [size / 2, -size / 2 + f],
            [size / 2 - f, -size / 2 + f],
          ])}
          fill={back}
        />
      )}
    </g>
  );
}

function PaperArt({ art, id }: { art: string; id: string }) {
  if (art === "paper-iridescent") {
    const hues = ["#9fd8e8", "#c9b8f0", "#f6c4dc", "#bff0d2", "#f5e7a6", "#a9c8f5"];
    return (
      <>
        <rect width="400" height="400" fill={PAPER.ink} />
        {[-14, -4, 8].map((rot, k) => (
          <g key={rot} transform={`translate(200 ${210 - k * 8}) rotate(${rot})`}>
            {Array.from({ length: 4 }, (_, i) =>
              Array.from({ length: 4 }, (_, j) => (
                <polygon
                  key={`${i}-${j}`}
                  points={pts([
                    [-120 + i * 60, -120 + j * 60],
                    [-60 + i * 60, -120 + j * 60],
                    [-120 + i * 60, -60 + j * 60],
                  ])}
                  fill={hues[(i + j + k) % hues.length]}
                />
              )),
            )}
            {Array.from({ length: 4 }, (_, i) =>
              Array.from({ length: 4 }, (_, j) => (
                <polygon
                  key={`b${i}-${j}`}
                  points={pts([
                    [-60 + i * 60, -120 + j * 60],
                    [-60 + i * 60, -60 + j * 60],
                    [-120 + i * 60, -60 + j * 60],
                  ])}
                  fill={hues[(i + j + k + 2) % hues.length]}
                />
              )),
            )}
          </g>
        ))}
      </>
    );
  }
  if (art === "paper-patterned") {
    return (
      <>
        <defs>
          <pattern id={`${id}-dots`} width="22" height="22" patternUnits="userSpaceOnUse">
            <rect width="22" height="22" fill={PAPER.red} />
            <circle cx="11" cy="11" r="4" fill={PAPER.paper} />
          </pattern>
          <pattern id={`${id}-check`} width="30" height="30" patternUnits="userSpaceOnUse">
            <rect width="30" height="30" fill={PAPER.blue} />
            <rect width="15" height="15" fill="#4f86cc" />
            <rect x="15" y="15" width="15" height="15" fill="#4f86cc" />
          </pattern>
          <pattern id={`${id}-wave`} width="40" height="20" patternUnits="userSpaceOnUse">
            <rect width="40" height="20" fill={PAPER.green} />
            <path d="M0 14 Q10 4 20 14 T40 14 V20 H0Z" fill="#5fae80" />
          </pattern>
          <pattern id={`${id}-flower`} width="36" height="36" patternUnits="userSpaceOnUse">
            <rect width="36" height="36" fill={PAPER.pink} />
            <circle cx="18" cy="12" r="5" fill="#fbd3e0" />
            <circle cx="12" cy="20" r="5" fill="#fbd3e0" />
            <circle cx="24" cy="20" r="5" fill="#fbd3e0" />
            <circle cx="18" cy="18" r="3" fill={PAPER.yellow} />
          </pattern>
        </defs>
        <rect width="400" height="400" fill={PAPER.yellow} />
        <Sheet x={150} y={160} size={190} rot={-12} front={`url(#${id}-wave)`} />
        <Sheet x={250} y={150} size={170} rot={9} front={`url(#${id}-check)`} />
        <Sheet x={160} y={260} size={170} rot={6} front={`url(#${id}-flower)`} />
        <Sheet x={255} y={265} size={180} rot={-6} front={`url(#${id}-dots)`} back={PAPER.paper} />
      </>
    );
  }
  // Double-sided: a fan of sheets, each with a folded corner showing its other side.
  const pairs: [string, string][] = [
    [PAPER.red, PAPER.yellow],
    [PAPER.orange, PAPER.pink],
    [PAPER.yellow, PAPER.blue],
    [PAPER.green, PAPER.orange],
    [PAPER.blue, PAPER.red],
    [PAPER.pink, PAPER.green],
  ];
  return (
    <>
      <rect width="400" height="400" fill={PAPER.paper} />
      {pairs.map(([f, b], i) => (
        <Sheet key={f} x={200} y={215} size={210 - i * 18} rot={-30 + i * 12} front={f} back={b} />
      ))}
    </>
  );
}

function Pen({
  x,
  y,
  rot,
  body,
  cap,
  tip,
}: {
  x: number;
  y: number;
  rot: number;
  body: string;
  cap: string;
  tip: string;
}) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot})`}>
      <rect x={-22} y={-150} width={44} height={230} fill={body} />
      <rect x={-22} y={-150} width={22} height={230} fill="#000" opacity={0.08} />
      <rect x={-25} y={-190} width={50} height={70} fill={cap} />
      <rect x={-6} y={-210} width={12} height={22} fill={cap} />
      <polygon points="-22,80 22,80 12,120 -12,120" fill={tip} />
      <circle cx={0} cy={126} r={9} fill={PAPER.paper} />
    </g>
  );
}

function Stick({
  x,
  y,
  h,
  body,
  cap,
  face = false,
}: {
  x: number;
  y: number;
  h: number;
  body: string;
  cap: string;
  face?: boolean;
}) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x={-30} y={-h} width={60} height={h} fill={body} />
      <rect x={-30} y={-h - 46} width={60} height={50} fill={cap} />
      {face && (
        <g>
          <circle cx={-11} cy={-h / 2} r={4} fill={PAPER.ink} />
          <circle cx={11} cy={-h / 2} r={4} fill={PAPER.ink} />
          <path
            d={`M-8 ${-h / 2 + 12} Q0 ${-h / 2 + 20} 8 ${-h / 2 + 12}`}
            fill="none"
            stroke={PAPER.ink}
            strokeWidth={3}
            strokeLinecap="round"
          />
          <circle cx={-20} cy={-h / 2 + 10} r={5} fill={PAPER.pink} />
          <circle cx={20} cy={-h / 2 + 10} r={5} fill={PAPER.pink} />
        </g>
      )}
    </g>
  );
}

function ToolArt({ art }: { art: string }) {
  switch (art) {
    case "pen-roller":
      return (
        <>
          <rect width="400" height="400" fill={PAPER.blue} />
          <rect x={60} y={240} width={150} height={150} fill={PAPER.yellow} transform="rotate(-8 135 315)" />
          <Pen x={225} y={200} rot={28} body={PAPER.paper} cap={PAPER.ink} tip="#9fd0e8" />
        </>
      );
    case "pen-stick":
      return (
        <>
          <rect width="400" height="400" fill={PAPER.green} />
          <Pen x={160} y={210} rot={-18} body={PAPER.yellow} cap={PAPER.red} tip={PAPER.paper} />
          <Pen x={260} y={215} rot={12} body={PAPER.paper} cap={PAPER.blue} tip={PAPER.paper} />
        </>
      );
    case "glitter-set": {
      const c = [
        PAPER.red,
        PAPER.orange,
        PAPER.yellow,
        "#8bc34a",
        PAPER.green,
        PAPER.teal,
        PAPER.blue,
        "#e85d9b",
        "#c0c4c9",
        "#d8b04a",
      ];
      return (
        <>
          <rect width="400" height="400" fill={PAPER.ink} />
          {c.map((col, i) => (
            <g key={col} transform={`translate(${42 + i * 35} ${i % 2 ? 300 : 290})`}>
              <rect x={-13} y={-170} width={26} height={170} fill={col} />
              <polygon points="-13,-170 13,-170 3,-205 -3,-205" fill={PAPER.paper} />
              {[30, 70, 110].map((dy) => (
                <circle key={dy} cx={(dy % 3) - 4} cy={-dy} r={2.6} fill={PAPER.paper} />
              ))}
            </g>
          ))}
        </>
      );
    }
    case "glue-sticks":
      return (
        <>
          <rect width="400" height="400" fill={PAPER.yellow} />
          <Stick x={80} y={330} h={170} body={PAPER.pink} cap={PAPER.red} face />
          <Stick x={160} y={330} h={190} body={PAPER.paper} cap={PAPER.blue} face />
          <Stick x={240} y={330} h={160} body="#bfe3c9" cap={PAPER.green} face />
          <Stick x={320} y={330} h={180} body="#fbd38d" cap={PAPER.orange} face />
        </>
      );
    default:
      return (
        <>
          <rect width="400" height="400" fill={PAPER.red} />
          <Stick x={120} y={330} h={200} body={PAPER.paper} cap={PAPER.blue} />
          <Stick x={200} y={330} h={170} body={PAPER.paper} cap={PAPER.yellow} />
          <Stick x={280} y={330} h={200} body={PAPER.paper} cap={PAPER.green} />
        </>
      );
  }
}

export function ProductArt({
  art,
  option,
  title,
  className,
}: {
  art: string;
  option?: string;
  /** Accessible description; omit when the image is decorative. */
  title?: string;
  className?: string;
}) {
  const id = `art${useId().replace(/[^a-z0-9]/gi, "")}`;
  let body: React.ReactNode;
  if (art.startsWith("kit-")) body = <KitArt art={art} id={id} option={option} />;
  else if (art.startsWith("paper-")) body = <PaperArt art={art} id={id} />;
  else body = <ToolArt art={art} />;
  return (
    <svg
      viewBox="0 0 400 400"
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      {body}
    </svg>
  );
}
