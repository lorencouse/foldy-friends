/**
 * Fold level: how hard a product is to make. The catalogue states it in a
 * product's description ("Difficulty 3 of 6."); products without it have none.
 */
export type FoldLevel = { level: number; of: number; name: string; note: string };

/** The three named levels, easiest first. */
export const FOLD_LEVELS = [
  {
    name: "Little folder",
    homeNote: "First folds, a few steps.",
    productNote: "A few simple steps, good for first folds.",
    color: "var(--color-mint)",
  },
  {
    name: "Growing folder",
    homeNote: "More steps, a little gluing.",
    productNote: "More steps and some gluing; a grown-up helps.",
    color: "var(--color-sun)",
  },
  {
    name: "Fold master",
    homeNote: "3D builds to do together.",
    productNote: "A long build, best done together.",
    color: "var(--color-tomato)",
  },
];

const PATTERN = /Difficulty (\d+) of (\d+)\.?/i;

export function foldLevel(description: string): FoldLevel | null {
  const m = PATTERN.exec(description);
  if (!m) return null;
  const level = Number(m[1]);
  const of = Number(m[2]);
  if (!(level >= 1 && of >= level)) return null;
  return namedLevel(level, of);
}

/** A level with the name and note for how far up its scale it sits. */
export function namedLevel(level: number, of: number): FoldLevel {
  const share = level / of;
  const { name, productNote } = FOLD_LEVELS[share <= 1 / 3 ? 0 : share <= 2 / 3 ? 1 : 2];
  return { level, of, name, note: productNote };
}

/** What a kit says you will need ("You will need a craft knife, a ruler and glue."). */
export function needs(description: string) {
  const m = /You will need ([^.]+)\./i.exec(description);
  return m ? m[1] : null;
}

/** The description without the difficulty and "you will need" sentences, as paragraphs. */
export function descriptionParagraphs(description: string) {
  return description
    .split(/\n{2,}/)
    .map((p) =>
      p
        .replace(PATTERN, "")
        .replace(/You will need [^.]+\./i, "")
        .replace(/\s{2,}/g, " ")
        .trim(),
    )
    .filter(Boolean);
}
