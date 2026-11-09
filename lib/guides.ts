import type { MDXContent } from "mdx/types";
import { z } from "zod";
import { DIAGRAMS } from "@/components/guides/diagrams";
import * as boat from "@/content/guides/boat.mdx";
import * as crane from "@/content/guides/crane.mdx";
import * as elephant from "@/content/guides/elephant.mdx";
import * as fox from "@/content/guides/fox.mdx";
import * as frog from "@/content/guides/frog.mdx";
import * as heart from "@/content/guides/heart.mdx";
import * as start from "@/content/guides/how-to-start-origami.mdx";
import * as panda from "@/content/guides/panda.mdx";
import { type FoldLevel, levelName } from "@/lib/fold-level";

/**
 * Origami how-to guides. Each guide is an MDX file in content/guides: YAML
 * frontmatter for the page's metadata, steps and linked products, and a body
 * of prose with a {props.steps} marker where the step-by-step diagrams go. The
 * diagrams are drawn in components/guides/diagrams, one per step, keyed by the
 * guide's slug. Guides live in the repo and need no database.
 *
 * To add a guide: write content/guides/<slug>.mdx, draw its diagrams, and add
 * both to the lists below.
 */

const Step = z.object({
  title: z.string().min(1),
  text: z.string().min(1),
  alt: z.string().min(1),
});

const Frontmatter = z.object({
  /** The page heading, e.g. "How to fold a paper crane". */
  title: z.string().min(1),
  /** The <title> tag; the layout appends " · Foldy Friends". */
  seoTitle: z.string().min(1).max(50),
  /** Meta and Open Graph description. */
  description: z.string().min(50).max(160),
  /** One or two sentences for the guides index. */
  summary: z.string().min(1),
  /** The model's short name, e.g. "Crane". */
  name: z.string().min(1),
  /** 1 to 3, in the shop's fold-level diamonds. */
  level: z.number().int().min(1).max(3),
  minutes: z.number().int().positive(),
  /** What to fold it from. */
  paper: z.string().min(1),
  /** Catalogue slugs of the products this guide recommends, best first. */
  products: z.array(z.string().min(1)).min(1),
  /** Date the guide was last changed, YYYY-MM-DD. */
  updated: z.iso.date(),
  steps: z.array(Step).min(1),
});

export type GuideMeta = z.infer<typeof Frontmatter> & { slug: string };
export type Guide = GuideMeta & { Content: MDXContent };

const FILES: Record<string, { guide: unknown; default: MDXContent }> = {
  "how-to-start-origami": start,
  crane,
  frog,
  fox,
  boat,
  heart,
  elephant,
  panda,
};

/** Every guide, in index order: the beginner guide first. */
export const GUIDES: readonly Guide[] = Object.entries(FILES).map(([slug, file]) => {
  const parsed = Frontmatter.safeParse(file.guide);
  if (!parsed.success) {
    throw new Error(`content/guides/${slug}.mdx: bad frontmatter\n${z.prettifyError(parsed.error)}`);
  }
  const diagrams = DIAGRAMS[slug];
  if (!diagrams) throw new Error(`content/guides/${slug}.mdx: no diagrams drawn for "${slug}"`);
  if (diagrams.steps.length !== parsed.data.steps.length) {
    throw new Error(
      `content/guides/${slug}.mdx: ${parsed.data.steps.length} steps but ${diagrams.steps.length} diagrams`,
    );
  }
  return { ...parsed.data, slug, Content: file.default };
});

export function getGuide(slug: string) {
  return GUIDES.find((g) => g.slug === slug) ?? null;
}

/** Guides that recommend a product, for "fold it" links on product pages. */
export function guidesForProduct(productSlug: string) {
  return GUIDES.filter((g) => g.products.includes(productSlug));
}

export function guideLevel(guide: Pick<GuideMeta, "level">): FoldLevel {
  return { level: guide.level, of: 3, name: levelName(guide.level / 3) };
}

/** ISO 8601 duration, e.g. PT15M, for structured data. */
export const isoMinutes = (minutes: number) => `PT${minutes}M`;
