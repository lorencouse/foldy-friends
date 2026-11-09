/**
 * The shop's categories, in display order. This file has no server imports, so
 * client components can use it. Adding a category here makes TypeScript point
 * at the art and banners it still needs.
 */
export const CATEGORIES = ["paper", "tools", "kits"] as const;
export type Category = (typeof CATEGORIES)[number];

export const CATEGORY_INFO: Record<
  Category,
  { title: string; blurb: string; productEyebrow: string; listingEyebrow: string }
> = {
  paper: {
    title: "Paper",
    blurb: "Square sheets that hold a crease: plain, double-sided, patterned and glittering.",
    productEyebrow: "Origami paper",
    listingEyebrow: "Origami paper",
  },
  tools: {
    title: "Tools",
    blurb: "Glue pens and sticks for tabs, flaps and models that get played with.",
    productEyebrow: "Glue and tools",
    listingEyebrow: "Glue and tools",
  },
  kits: {
    title: "Kits",
    blurb: "3D papercraft animals asleep on the moon. Score, fold, glue, display.",
    productEyebrow: "3D papercraft kit",
    listingEyebrow: "Moon Dreamers",
  },
};

/** A navigation link to each category's page. */
export const CATEGORY_LINKS = CATEGORIES.map((category) => ({
  category,
  href: `/shop/${category}`,
  label: CATEGORY_INFO[category].title,
}));
