import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { FoldDiamonds } from "@/components/fold-level";
import { GuideCard } from "@/components/guides/guide-card";
import { GuideProducts, GuideProductsSkeleton } from "@/components/guides/guide-products";
import { FinishedModel, GuideSteps, NotationKey } from "@/components/guides/guide-steps";
import { GUIDES, type Guide, getGuide, guideLevel, isoMinutes } from "@/lib/guides";

// Every guide is prerendered; any other slug is a 404.
export function generateStaticParams() {
  return GUIDES.map((g) => ({ slug: g.slug }));
}

const siteUrl = process.env.SITE_URL ?? "https://www.foldyfriends.com";

export async function generateMetadata({ params }: PageProps<"/guides/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return {};
  const url = `/guides/${guide.slug}`;
  return {
    title: guide.seoTitle,
    description: guide.description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      siteName: "Foldy Friends",
      url,
      title: guide.seoTitle,
      description: guide.description,
      modifiedTime: guide.updated,
    },
  };
}

export default async function GuidePage({ params }: PageProps<"/guides/[slug]">) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();
  const { Content } = guide;
  const level = guideLevel(guide);
  const beginner = guide.slug === "how-to-start-origami";
  const more = GUIDES.filter((g) => g.slug !== guide.slug).slice(0, 3);

  return (
    <>
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD from our own content
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData(guide)).replace(/</g, "\\u003c") }}
      />
      <div className="wrap pt-5">
        <nav aria-label="Breadcrumb" className="text-[0.9375rem] font-bold text-ink-soft">
          <ol className="flex flex-wrap gap-x-2">
            <li>
              <Link href="/" className="inline-flex min-h-11 items-center hover:text-tomato">
                Home
              </Link>
            </li>
            <li aria-hidden="true" className="flex items-center">
              /
            </li>
            <li>
              <Link href="/guides" className="inline-flex min-h-11 items-center hover:text-tomato">
                Guides
              </Link>
            </li>
            <li aria-hidden="true" className="flex items-center">
              /
            </li>
            <li className="flex min-w-0 items-center text-ink">
              <span aria-current="page" className="truncate">
                {guide.name}
              </span>
            </li>
          </ol>
        </nav>
      </div>

      <article>
        <header className="wrap grid grid-cols-[repeat(auto-fit,minmax(min(100%,440px),1fr))] items-center gap-[clamp(28px,5vw,64px)] pt-4 pb-12">
          <div className="flex min-w-0 flex-col gap-5">
            <p className="eyebrow">Origami guide</p>
            <h1 className="text-[clamp(2.5rem,5vw,4rem)] leading-none tracking-[-0.02em]">{guide.title}</h1>
            <p className="max-w-[560px] text-lead text-ink-soft">{guide.summary}</p>
            <ul className="flex flex-wrap gap-2.5 text-[0.9375rem] font-bold">
              <li className="flex min-h-11 items-center gap-2.5 rounded-full border-2 border-crease bg-card px-4">
                <FoldDiamonds level={level} size="sm" />
                {level.name}
              </li>
              <li className="flex min-h-11 items-center rounded-full border-2 border-crease bg-card px-4">
                About {guide.minutes} minutes
              </li>
              <li className="flex min-h-11 items-center rounded-full border-2 border-crease bg-card px-4">
                {guide.steps.length} steps
              </li>
            </ul>
            <div className="max-w-[560px] rounded-2xl border-[1.5px] border-[#F2D58E] bg-sun-pale px-5 py-4">
              <p className="font-extrabold">You will need</p>
              <p className="text-ink-soft">{guide.paper}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a href="#steps" className="btn btn-primary">
                Start folding
              </a>
              <a href="#fold-it-with" className="btn">
                Paper for this model
              </a>
            </div>
          </div>
          <FinishedModel guide={guide} className="w-full max-w-[560px] justify-self-center" />
        </header>

        <div className="bg-kraft py-[clamp(48px,6vw,80px)]">
          <div className="wrap flex flex-col gap-4">
            <Content steps={<StepByStep guide={guide} beginner={beginner} />} />
          </div>
        </div>
      </article>

      <section
        id="fold-it-with"
        aria-labelledby="products-heading"
        className="scroll-mt-6 py-[clamp(48px,6vw,80px)]"
      >
        <div className="wrap flex flex-col gap-7">
          <div className="flex flex-col gap-2">
            <p className="eyebrow">From the shop</p>
            <h2 id="products-heading" className="text-[clamp(1.875rem,3.6vw,2.625rem)]">
              Fold it with
            </h2>
          </div>
          <Suspense fallback={<GuideProductsSkeleton count={guide.products.length} />}>
            <GuideProducts slugs={guide.products} />
          </Suspense>
        </div>
      </section>

      <section
        aria-labelledby="more-heading"
        className="border-t-[1.5px] border-crease py-[clamp(48px,6vw,80px)]"
      >
        <div className="wrap flex flex-col gap-7">
          <h2 id="more-heading" className="text-[clamp(1.875rem,3.6vw,2.625rem)]">
            More guides
          </h2>
          <ul className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,280px),1fr))] gap-6">
            {more.map((g) => (
              <li key={g.slug}>
                <GuideCard guide={g} />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

/** The notation key and the numbered steps; placed where the guide's MDX says {props.steps}. */
function StepByStep({ guide, beginner }: { guide: Guide; beginner: boolean }) {
  return (
    <section
      id="steps"
      aria-labelledby="steps-heading"
      className="my-6 flex scroll-mt-6 flex-col gap-6 first:mt-0 last:mb-0"
    >
      <h2 id="steps-heading" className="text-[clamp(1.875rem,3.6vw,2.625rem)]">
        Step by step
      </h2>
      {!beginner && (
        <div className="sheet flex flex-col gap-3 p-5 sm:p-6">
          <h3 className="text-[1.25rem] font-bold">How to read the diagrams</h3>
          <NotationKey />
          <p className="text-[0.9375rem] text-ink-soft">
            New to folding? Start with{" "}
            <Link href="/guides/how-to-start-origami" className="link">
              how to start origami
            </Link>
            , which shows each fold.
          </p>
        </div>
      )}
      <GuideSteps guide={guide} />
    </section>
  );
}

function structuredData(guide: Guide) {
  const url = `${siteUrl}/guides/${guide.slug}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "HowTo",
        "@id": `${url}#howto`,
        name: guide.title,
        description: guide.description,
        url,
        totalTime: isoMinutes(guide.minutes),
        dateModified: guide.updated,
        supply: [{ "@type": "HowToSupply", name: guide.paper }],
        step: guide.steps.map((s, i) => ({
          "@type": "HowToStep",
          position: i + 1,
          name: s.title,
          text: s.text,
          url: `${url}#step-${i + 1}`,
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
          { "@type": "ListItem", position: 2, name: "Guides", item: `${siteUrl}/guides` },
          { "@type": "ListItem", position: 3, name: guide.name, item: url },
        ],
      },
    ],
  };
}
