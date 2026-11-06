import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { CategoryTabs, GridSkeleton, ProductGrid } from "@/components/catalogue";
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

export default async function CategoryPage({ params }: PageProps<"/shop/[category]">) {
  const { category } = await params;
  if (!isCategory(category)) notFound();
  const info = CATEGORY_INFO[category];
  return (
    <>
      <section className="pt-10 pb-12 md:pt-16">
        <h1 className="text-head">{info.title}</h1>
        <p className="mt-5 max-w-[46ch] text-lead text-muted">{info.blurb}</p>
      </section>
      <CategoryTabs active={category} />
      <div className="mt-12">
        <Suspense fallback={<GridSkeleton />}>
          <ProductGrid category={category} />
        </Suspense>
      </div>
    </>
  );
}
