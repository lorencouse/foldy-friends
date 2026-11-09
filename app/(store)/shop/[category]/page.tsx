import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Listing, ListingSkeleton } from "@/components/catalogue";
import { ShopBanner } from "@/components/shop-banner";
import { CATEGORIES, CATEGORY_INFO, type Category } from "@/lib/categories";

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

export default async function CategoryPage({ params, searchParams }: PageProps<"/shop/[category]">) {
  const { category } = await params;
  if (!isCategory(category)) notFound();
  const info = CATEGORY_INFO[category];
  return (
    <>
      <ShopBanner category={category} eyebrow={info.listingEyebrow} title={info.title} blurb={info.blurb} />
      <section className="wrap pt-2 pb-20">
        <Suspense fallback={<ListingSkeleton />}>
          <Listing category={category} searchParams={searchParams} />
        </Suspense>
      </section>
    </>
  );
}
