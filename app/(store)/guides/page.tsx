import type { Metadata } from "next";
import Link from "next/link";
import { GuideCard } from "@/components/guides/guide-card";
import { Crane, Frog } from "@/components/menagerie";
import { GUIDES } from "@/lib/guides";

export const metadata: Metadata = {
  title: "Origami guides: easy step-by-step folds",
  description:
    "Free step-by-step origami guides for kids and families: a crane, a jumping frog, a fox, a boat, a heart and more, with a clear diagram for every fold.",
  alternates: { canonical: "/guides" },
  openGraph: {
    siteName: "Foldy Friends",
    url: "/guides",
    title: "Origami guides: easy step-by-step folds",
    description:
      "Free step-by-step origami guides for kids and families, with a clear diagram for every fold.",
  },
};

export default function GuidesPage() {
  const [first, ...rest] = GUIDES;
  return (
    <>
      <section className="pt-8 pb-6 sm:pt-10">
        <div className="wrap">
          <div
            className="creases relative flex flex-wrap items-center justify-between gap-6 overflow-hidden rounded-[28px] p-[clamp(24px,4vw,48px)]"
            style={{ backgroundColor: "var(--color-mint-pale)" }}
          >
            <div className="flex max-w-[600px] flex-[1_1_320px] flex-col gap-2.5">
              <p className="eyebrow" style={{ color: "var(--color-mint-ink)" }}>
                Origami guides
              </p>
              <h1 className="text-[clamp(2.5rem,5vw,4rem)] leading-none tracking-[-0.02em]">
                Fold it step by step
              </h1>
              <p>
                Free guides to the classic models, with a drawing for every fold. Start with a square of
                paper, and a grown-up nearby for the tricky bits.
              </p>
            </div>
            <div className="flex items-end gap-2" aria-hidden="true">
              <Crane className="w-28 sm:w-36" />
              <Frog className="w-20 sm:w-24" />
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="first-heading" className="wrap pt-6 pb-4">
        <Link
          href={`/guides/${first.slug}`}
          className="sheet lift flex flex-wrap items-center justify-between gap-4 rounded-[22px] border-ink bg-sun-pale p-5 sm:p-6"
        >
          <div className="flex max-w-[640px] flex-col gap-1.5">
            <p className="eyebrow">New to origami? Start here</p>
            <h2 id="first-heading" className="text-[clamp(1.5rem,2.6vw,2rem)]">
              {first.title}
            </h2>
            <p className="text-ink-soft">{first.summary}</p>
          </div>
          <span className="btn btn-sun">Read the beginner guide</span>
        </Link>
      </section>

      <section aria-labelledby="all-heading" className="wrap pt-8 pb-20">
        <h2 id="all-heading" className="mb-7 text-[clamp(1.875rem,3.6vw,2.625rem)]">
          Models to fold
        </h2>
        <ul className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,280px),1fr))] gap-6">
          {rest.map((g) => (
            <li key={g.slug}>
              <GuideCard guide={g} />
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
