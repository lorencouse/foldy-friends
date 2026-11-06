import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Listing, ListingSkeleton, ShopBanner } from "@/components/catalogue";
import { CATEGORY_INFO } from "@/lib/catalog";
import { CATEGORIES, type Category } from "@/lib/db/schema";

const isCategory = (c: string): c is Category => (CATEGORIES as readonly string[]).includes(c);

export function generateStaticParams() {
  return CATEGORIES.map((category) => ({ category }));
}

export async function generateMetadata({ params }: PageProps<"/shop/[category]">): Promise<Metadata> {
  const { category } = await params;
  if (!isCategory(category)) return {};
  return {
    title: CATEGORY_INFO[category].title,
    description: CATEGORY_INFO[category].blurb,
  };
}

const EYEBROWS: Record<Category, string> = {
  paper: "Origami paper",
  tools: "Glue and tools",
  kits: "Moon Dreamers",
};

export default async function CategoryPage({ params, searchParams }: PageProps<"/shop/[category]">) {
  const { category } = await params;
  if (!isCategory(category)) notFound();
  const info = CATEGORY_INFO[category];
  return (
    <>
      <ShopBanner category={category} eyebrow={EYEBROWS[category]} title={info.title} blurb={info.blurb} />
      <section className="wrap pt-2 pb-20">
        <Suspense fallback={<ListingSkeleton />}>
          <Listing category={category} searchParams={searchParams} />
        </Suspense>
      </section>
    </>
  );
}
