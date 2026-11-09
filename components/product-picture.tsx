import {
  ANIMALS,
  GluePen,
  KitPieces,
  MOON_FILLS,
  Moon,
  type MoonAnimal,
  PaperStack,
} from "@/components/menagerie";

/**
 * The drawn picture for a product, on its coloured sheet: a sleeping animal on
 * its moon for kits, a stack of squares for paper, a glue pen for tools. Each
 * product's `art` key picks the sheet colour and the drawing's colours; an
 * unknown key falls back to its category's look.
 */

type Look =
  | { kind: "kit"; animal: MoonAnimal; tile: string; dark?: boolean }
  | { kind: "paper"; tile: string; colors: [string, string, string, string] }
  | { kind: "tool"; tile: string; colors: [string, string, string] };

const LOOKS: Record<string, Look> = {
  "kit-fox": { kind: "kit", animal: "fox", tile: "#2B3768", dark: true },
  "kit-panda": { kind: "kit", animal: "panda", tile: "#DDF3EA" },
  "kit-raccoon": { kind: "kit", animal: "raccoon", tile: "#E1EEFB" },
  "kit-elephant": { kind: "kit", animal: "elephant", tile: "#FCE6EC" },
  "paper-double": { kind: "paper", tile: "#FCE6EC", colors: ["#5B9BE0", "#F6B93B", "#D23F2C", "#F2A0B5"] },
  "paper-patterned": { kind: "paper", tile: "#FDF0D2", colors: ["#3FB58E", "#F2A0B5", "#5B9BE0", "#FFFDF8"] },
  "paper-iridescent": {
    kind: "paper",
    tile: "#E1EEFB",
    colors: ["#C9B6F2", "#9EDBE0", "#F2C6E0", "#FFFFFF"],
  },
  "pen-roller": { kind: "tool", tile: "#FDF0D2", colors: ["#F2A0B5", "#5B9BE0", "#3FB58E"] },
  "pen-stick": { kind: "tool", tile: "#DDF3EA", colors: ["#F6B93B", "#D23F2C", "#5B9BE0"] },
  "glitter-set": { kind: "tool", tile: "#FCE6EC", colors: ["#C9B6F2", "#F6B93B", "#F2A0B5"] },
  "glue-sticks": { kind: "tool", tile: "#E1EEFB", colors: ["#3FB58E", "#F2A0B5", "#F6B93B"] },
  "glue-sticks-plain": { kind: "tool", tile: "#F3EADB", colors: ["#5B9BE0", "#3FB58E", "#D23F2C"] },
};

function lookFor(art: string, category?: string): Look {
  const known = LOOKS[art];
  if (known) return known;
  if (art.startsWith("kit-") || category === "kits") return LOOKS["kit-fox"];
  if (art.startsWith("paper-") || category === "paper") return LOOKS["paper-double"];
  return LOOKS["pen-roller"];
}

/** The sheet colour behind a product's picture, for tiles that frame it. */
export function tileFor(art: string, category?: string) {
  return lookFor(art, category).tile;
}

/** True when the picture sits on a dark sheet (cream text and dark creases). */
export function isDarkTile(art: string, category?: string) {
  const look = lookFor(art, category);
  return look.kind === "kit" && look.dark === true;
}

export function moonFill(option: string | null | undefined) {
  return (option && MOON_FILLS[option]) || MOON_FILLS.Yellow;
}

/**
 * The drawing alone (no sheet), sized to fill a square, positioned parent.
 * `view` picks the finished friend or, for kits, the printed pieces.
 */
export function ProductDrawing({
  art,
  category,
  option,
  view = "finished",
}: {
  art: string;
  category?: string;
  option?: string | null;
  view?: "finished" | "pieces";
}) {
  const look = lookFor(art, category);
  if (look.kind === "kit") {
    if (view === "pieces") return <KitPieces moon={moonFill(option)} className="w-[72%]" />;
    const Animal = ANIMALS[look.animal];
    return (
      <>
        <Moon fill={moonFill(option)} sheen className="absolute w-[72%]" />
        <Animal
          sleepy
          className="relative mt-[17%] -ml-[19%] w-[44%]"
          style={{ filter: "drop-shadow(0 8px 8px rgba(0,0,0,.22))" }}
        />
      </>
    );
  }
  if (look.kind === "paper") return <PaperStack colors={look.colors} className="w-[66%]" />;
  return <GluePen colors={look.colors} className="w-[64%]" />;
}

/**
 * A product picture on its dog-eared, creased sheet. Uploaded photos replace
 * the drawing. Badges and other overlays go in `children`.
 */
export function PictureTile({
  art,
  category,
  option,
  photo,
  alt = "",
  view,
  small = false,
  className = "",
  children,
}: {
  art: string;
  category?: string;
  option?: string | null;
  /** Uploaded photo filename, served from /media. */
  photo?: string;
  alt?: string;
  view?: "finished" | "pieces";
  /** Smaller folded corner, for thumbnails. */
  small?: boolean;
  className?: string;
  children?: React.ReactNode;
}) {
  const dark = isDarkTile(art, category) && view !== "pieces";
  const tile = view === "pieces" ? "#F3EADB" : tileFor(art, category);
  return (
    <div
      className={`dogear ${small ? "dogear-sm" : ""} ${dark ? "creases-dark" : "creases"} flex aspect-square items-center justify-center overflow-hidden ${className}`}
      style={{ backgroundColor: tile }}
    >
      <span className="flap" />
      {children}
      {photo ? (
        // biome-ignore lint/performance/noImgElement: uploaded files are served by /media
        <img src={`/media/${photo}`} alt={alt} className="absolute inset-0 size-full object-cover" />
      ) : (
        <ProductDrawing art={art} category={category} option={option} view={view} />
      )}
    </div>
  );
}
