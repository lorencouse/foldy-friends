/**
 * Fold level: how hard a product is to make. The catalogue states it in a
 * product's description ("Difficulty 3 of 6."); products without it have none.
 */
export type FoldLevel = { level: number; of: number; name: string };

const PATTERN = /Difficulty (\d+) of (\d+)\.?/i;

export function foldLevel(description: string): FoldLevel | null {
  const m = PATTERN.exec(description);
  if (!m) return null;
  const level = Number(m[1]);
  const of = Number(m[2]);
  if (!(level >= 1 && of >= level)) return null;
  return { level, of, name: levelName(level / of) };
}

/** The three named levels, by how far up the scale a product sits. */
export function levelName(share: number) {
  if (share <= 1 / 3) return "Little folder";
  if (share <= 2 / 3) return "Growing folder";
  return "Fold master";
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
