import type { CSSProperties } from "react";

/**
 * The folded-paper menagerie: each animal is a few large triangles, coloured
 * side out, with the white back of the sheet showing where a corner folds over
 * and one centre crease. All are decorative and drawn on a 100 x 100 grid.
 */

type Props = { className?: string; style?: CSSProperties; sleepy?: boolean };

const CREASE = "rgba(31,42,68,.16)";
const INK = "#1F2A44";

function Svg({
  className,
  style,
  viewBox = "0 0 100 100",
  children,
}: {
  className?: string;
  style?: CSSProperties;
  viewBox?: string;
  children: React.ReactNode;
}) {
  return (
    <svg viewBox={viewBox} className={className} style={style} aria-hidden="true" focusable="false">
      {children}
    </svg>
  );
}

function ClosedEyes({ y, left, right, color }: { y: number; left: number; right: number; color: string }) {
  return (
    <>
      <path
        d={`M${left - 5} ${y} Q${left} ${y + 4} ${left + 5} ${y}`}
        stroke={color}
        strokeWidth="2.4"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d={`M${right - 5} ${y} Q${right} ${y + 4} ${right + 5} ${y}`}
        stroke={color}
        strokeWidth="2.4"
        fill="none"
        strokeLinecap="round"
      />
    </>
  );
}

export function Fox({ sleepy = false, ...p }: Props) {
  return (
    <Svg {...p}>
      <polygon points="12,34 24,8 40,30" fill="#E06A2C" />
      <polygon points="60,30 76,8 88,34" fill="#C95520" />
      <polygon points="18,30 25,15 33,29" fill="#FFF8EE" />
      <polygon points="67,29 75,15 82,30" fill="#F3E6D3" />
      <polygon points="12,34 50,28 50,90" fill="#F07A3A" />
      <polygon points="50,28 88,34 50,90" fill="#DB6328" />
      <polygon points="12,34 32,38 26,56" fill="#FFF8EE" />
      <polygon points="88,34 68,38 74,56" fill="#F3E6D3" />
      <line x1="50" y1="28" x2="50" y2="82" stroke={CREASE} strokeWidth=".8" />
      {sleepy ? (
        <ClosedEyes y={50} left={36} right={64} color={INK} />
      ) : (
        <>
          <circle cx="36" cy="50" r="3" fill={INK} />
          <circle cx="64" cy="50" r="3" fill={INK} />
        </>
      )}
      <polygon points="45,82 55,82 50,90" fill={INK} />
    </Svg>
  );
}

export function Panda({ sleepy = false, ...p }: Props) {
  return (
    <Svg {...p}>
      <polygon points="14,26 22,10 36,20" fill={INK} />
      <polygon points="64,20 78,10 86,26" fill={INK} />
      <polygon points="16,24 50,18 50,86 14,60" fill="#FFFFFF" />
      <polygon points="50,18 84,24 86,60 50,86" fill="#EEE6D8" />
      <line x1="50" y1="18" x2="50" y2="64" stroke={CREASE} strokeWidth=".8" />
      <polygon points="26,50 36,40 44,52 34,60" fill={INK} />
      <polygon points="74,50 64,40 56,52 66,60" fill={INK} />
      {sleepy ? (
        <ClosedEyes y={50} left={36} right={64} color="#FFFFFF" />
      ) : (
        <>
          <circle cx="36" cy="49" r="2.2" fill="#FFFFFF" />
          <circle cx="64" cy="49" r="2.2" fill="#FFFFFF" />
        </>
      )}
      <polygon points="45,66 55,66 50,72" fill={INK} />
    </Svg>
  );
}

export function Raccoon({ sleepy = false, ...p }: Props) {
  return (
    <Svg {...p}>
      <polygon points="12,30 20,8 36,22" fill="#6E778C" />
      <polygon points="64,22 80,8 88,30" fill="#5A6378" />
      <polygon points="18,26 21,14 30,22" fill="#F3EFE8" />
      <polygon points="70,22 79,14 82,26" fill="#E6DED0" />
      <polygon points="12,30 50,22 50,90" fill="#A5ACBC" />
      <polygon points="50,22 88,30 50,90" fill="#8E96A8" />
      <polygon points="14,40 50,46 50,58 20,54" fill={INK} />
      <polygon points="86,40 50,46 50,58 80,54" fill="#2A3552" />
      <polygon points="38,60 50,62 50,90" fill="#F7F2EA" />
      <polygon points="50,62 62,60 50,90" fill="#E6DED0" />
      <line x1="50" y1="22" x2="50" y2="46" stroke={CREASE} strokeWidth=".8" />
      {sleepy ? (
        <ClosedEyes y={51} left={34} right={66} color="#FFFFFF" />
      ) : (
        <>
          <circle cx="34" cy="50" r="2.4" fill="#FFFFFF" />
          <circle cx="66" cy="50" r="2.4" fill="#FFFFFF" />
        </>
      )}
      <polygon points="46,82 54,82 50,88" fill={INK} />
    </Svg>
  );
}

export function Elephant({ sleepy = false, ...p }: Props) {
  return (
    <Svg {...p}>
      <polygon points="4,26 32,24 30,66 8,58" fill="#9AA3B6" />
      <polygon points="96,26 68,24 70,66 92,58" fill="#8790A5" />
      <polygon points="8,30 20,28 12,52" fill="#F3EFE8" />
      <polygon points="92,30 80,28 88,52" fill="#E6DED0" />
      <polygon points="30,20 50,18 50,60 32,48" fill="#B8C0D0" />
      <polygon points="50,18 70,20 68,48 50,60" fill="#A6AFC2" />
      <polygon points="44,56 50,58 50,86 46,80" fill="#B8C0D0" />
      <polygon points="50,58 56,56 54,80 60,88 50,86" fill="#A6AFC2" />
      <polygon points="40,52 44,56 38,60" fill="#FFFDF8" />
      <polygon points="60,52 56,56 62,60" fill="#FFFDF8" />
      <line x1="50" y1="18" x2="50" y2="58" stroke={CREASE} strokeWidth=".8" />
      {sleepy ? (
        <ClosedEyes y={38} left={42} right={58} color={INK} />
      ) : (
        <>
          <circle cx="42" cy="38" r="2.4" fill={INK} />
          <circle cx="58" cy="38" r="2.4" fill={INK} />
        </>
      )}
    </Svg>
  );
}

export function Crane(p: Omit<Props, "sleepy">) {
  return (
    <Svg {...p}>
      <polygon points="46,52 22,8 58,46" fill="#B8321F" />
      <polygon points="24,60 50,48 76,60" fill="#D23F2C" />
      <polygon points="24,60 76,60 50,68" fill="#A92F1E" />
      <polygon points="50,48 82,6 62,54" fill="#E8604C" />
      <polygon points="66,30 82,6 70,34" fill="#FFF1EC" />
      <polygon points="24,60 12,24 30,58" fill="#D23F2C" />
      <polygon points="12,24 4,32 14,28" fill="#8E2618" />
      <polygon points="76,60 96,30 80,62" fill="#E8604C" />
      <line x1="24" y1="60" x2="76" y2="60" stroke={CREASE} strokeWidth=".8" />
    </Svg>
  );
}

export function Frog(p: Omit<Props, "sleepy">) {
  return (
    <Svg {...p}>
      <polygon points="14,46 22,22 40,36" fill="#3FB58E" />
      <polygon points="60,36 78,22 86,46" fill="#2F9A76" />
      <polygon points="10,48 50,34 50,80 14,68" fill="#57C9A1" />
      <polygon points="50,34 90,48 86,68 50,80" fill="#3FB58E" />
      <circle cx="26" cy="35" r="6" fill="#FFFDF8" />
      <circle cx="74" cy="35" r="6" fill="#FFFDF8" />
      <circle cx="27" cy="36" r="3" fill={INK} />
      <circle cx="73" cy="36" r="3" fill={INK} />
      <line x1="50" y1="34" x2="50" y2="62" stroke={CREASE} strokeWidth=".8" />
      <polyline
        points="36,62 50,68 64,62"
        fill="none"
        stroke={INK}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="24" cy="60" r="4" fill="#F2A0B5" />
      <circle cx="76" cy="60" r="4" fill="#F2A0B5" />
    </Svg>
  );
}

export const MOON_FILLS: Record<string, string> = {
  Yellow: "#F6B93B",
  Blue: "#8DB8EC",
  White: "#F4EFE4",
};

export function Moon({
  fill = MOON_FILLS.Yellow,
  sheen = false,
  ...p
}: Omit<Props, "sleepy"> & { fill?: string; sheen?: boolean }) {
  return (
    <Svg {...p}>
      <path d="M62 8 A42 42 0 1 0 92 72 A34 34 0 1 1 62 8 Z" fill={fill} />
      {sheen && <path d="M62 8 A42 42 0 0 0 30 60 L62 8 Z" fill="#FFFFFF" opacity=".18" />}
    </Svg>
  );
}

/** A small stack of origami squares, top sheet with a corner folded down. */
export function PaperStack({
  colors,
  ...p
}: Omit<Props, "sleepy"> & { colors: [string, string, string, string] }) {
  const [a, b, c, d] = colors;
  return (
    <Svg viewBox="0 0 120 100" {...p}>
      <rect x="22" y="22" width="60" height="60" rx="3" fill={a} transform="rotate(-14 52 52)" />
      <rect x="32" y="18" width="60" height="60" rx="3" fill={b} transform="rotate(6 62 48)" />
      <rect x="40" y="26" width="60" height="60" rx="3" fill={c} transform="rotate(-3 70 56)" />
      <polygon points="40,26 100,26 70,56" fill={d} transform="rotate(-3 70 56)" />
    </Svg>
  );
}

/** A glue pen crossed with a glue stick. */
export function GluePen({ colors, ...p }: Omit<Props, "sleepy"> & { colors: [string, string, string] }) {
  const [a, b, c] = colors;
  return (
    <Svg viewBox="0 0 120 100" {...p}>
      <g transform="rotate(-35 60 50)">
        <rect x="20" y="40" width="64" height="20" rx="4" fill={INK} />
        <rect x="84" y="42" width="14" height="16" rx="2" fill={a} />
        <polygon points="98,44 110,50 98,56" fill="#FFFDF8" />
        <rect x="28" y="40" width="8" height="20" fill={b} />
      </g>
      <g transform="rotate(20 60 60)">
        <rect x="36" y="56" width="50" height="18" rx="9" fill={c} />
        <rect x="76" y="56" width="16" height="18" rx="4" fill="#FFFDF8" />
      </g>
    </Svg>
  );
}

/** The printed card pieces of a moon kit, with dashed fold lines. */
export function KitPieces({ moon = MOON_FILLS.Yellow, ...p }: Omit<Props, "sleepy"> & { moon?: string }) {
  return (
    <Svg {...p}>
      <rect x="8" y="12" width="52" height="70" rx="2" fill="#FFFDF8" transform="rotate(-6 34 47)" />
      <rect x="40" y="18" width="52" height="70" rx="2" fill="#FFFDF8" transform="rotate(5 66 53)" />
      <polygon points="18,26 40,20 46,44 24,52" fill="#E8743B" transform="rotate(-6 34 47)" />
      <polygon points="24,52 46,44 38,70" fill="#F2905A" transform="rotate(-6 34 47)" />
      <path
        d="M18 26 L46 44 M40 20 L24 52"
        stroke={INK}
        strokeWidth=".8"
        strokeDasharray="2 2"
        transform="rotate(-6 34 47)"
      />
      <path d="M54 30 A16 16 0 1 0 80 62 A12 12 0 1 1 54 30Z" fill={moon} transform="rotate(5 66 53)" />
      <path
        d="M50 74 L84 76"
        stroke={INK}
        strokeWidth=".8"
        strokeDasharray="2 2"
        transform="rotate(5 66 53)"
      />
    </Svg>
  );
}

export const ANIMALS = { fox: Fox, panda: Panda, raccoon: Raccoon, elephant: Elephant } as const;
export type MoonAnimal = keyof typeof ANIMALS;
