import Link from "next/link";
import { FoldDiamonds } from "@/components/fold-level";
import { DIAGRAMS } from "@/components/guides/diagrams";
import { FoldDiagram } from "@/components/guides/fold-diagram";
import { type GuideMeta, guideLevel } from "@/lib/guides";

/** A guide on the index and in "more guides": the finished model, name and level. */
export function GuideCard({ guide, headingLevel = "h3" }: { guide: GuideMeta; headingLevel?: "h2" | "h3" }) {
  const set = DIAGRAMS[guide.slug];
  const level = guideLevel(guide);
  const Heading = headingLevel;
  return (
    <article className="sheet sheet-raised lift relative flex h-full flex-col overflow-hidden" data-rise>
      <div
        className="dogear creases m-2.5 mb-0 flex aspect-[6/5] items-center justify-center rounded-[16px_0_16px_16px]"
        style={{ backgroundColor: set.tile }}
      >
        <span className="flap" />
        <FoldDiagram diagram={set.finished} color={set.color} label="" className="w-[86%]" />
      </div>
      <div className="flex flex-1 flex-col gap-2 px-5 pt-4 pb-5">
        <span className="eyebrow">
          {guide.steps.length} steps · {guide.minutes} min
        </span>
        <Heading className="text-[1.375rem] leading-[1.15] font-bold">
          <Link href={`/guides/${guide.slug}`} className="after:absolute after:inset-0 hover:text-tomato">
            {guide.title}
          </Link>
        </Heading>
        <p className="line-clamp-3 text-[0.9375rem] leading-normal text-ink-soft">{guide.summary}</p>
        <p className="mt-auto flex items-center gap-2.5 pt-1 text-[0.9375rem] font-bold">
          <FoldDiamonds level={level} size="sm" />
          {level.name}
        </p>
      </div>
    </article>
  );
}
