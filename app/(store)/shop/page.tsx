import type { Metadata } from "next";
import Image from "next/image";
import { Suspense } from "react";
import { CategoryTabs, GridSkeleton, ProductGrid } from "@/components/catalogue";

export const metadata: Metadata = {
  title: "Shop",
  description: "Origami paper, glue pens and sticks, and 3D papercraft animal kits.",
};

export default function ShopPage() {
  return (
    <>
      <section className="grid items-end gap-8 pt-10 pb-16 md:grid-cols-[5fr_6fr] md:pt-16">
        <div>
          <h1 className="text-[clamp(3rem,6.5vw,6.5rem)] leading-[0.95]">Everything for folding</h1>
          <p className="mt-6 max-w-[36ch] text-lead">
            Paper that holds a crease, glue that stays put, and moon kits for the shelf.
          </p>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src="/images/kids-folding-origami-kitchen-table.webp"
            alt="A brother and sister folding paper cranes at the kitchen table while their dad watches"
            fill
            priority
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      </section>
      <CategoryTabs />
      <div className="mt-12">
        <Suspense fallback={<GridSkeleton />}>
          <ProductGrid />
        </Suspense>
      </div>
    </>
  );
}
