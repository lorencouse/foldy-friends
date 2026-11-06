import type { FoldLevel } from "@/lib/fold-level";

/** Fold level in diamonds: filled up to the level, outlined after it. */
export function FoldDiamonds({
  level,
  size = "md",
  color,
}: {
  level: FoldLevel;
  size?: "sm" | "md";
  color?: string;
}) {
  const s = size === "sm" ? { on: 9, off: 7 } : { on: 10, off: 8 };
  return (
    <span
      className="inline-flex shrink-0 items-center gap-[5px]"
      role="img"
      aria-label={`Fold level ${level.level} of ${level.of}`}
    >
      {Array.from({ length: level.of }, (_, i) =>
        i < level.level ? (
          // biome-ignore lint/suspicious/noArrayIndexKey: fixed-length decoration
          <span key={i} className="dia" style={{ width: s.on, height: s.on, background: color }} />
        ) : (
          // biome-ignore lint/suspicious/noArrayIndexKey: fixed-length decoration
          <span key={i} className="dia-off" style={{ width: s.off, height: s.off }} />
        ),
      )}
    </span>
  );
}
