import type { Metadata } from "next";
import { Suspense } from "react";
import { Listing, ListingSkeleton } from "@/components/catalogue";
import { ShopBanner } from "@/components/shop-banner";

export const metadata: Metadata = {
  title: "Shop",
  description: "Origami paper, glue pens and sticks, and 3D papercraft animal kits.",
};

export default function ShopPage({ searchParams }: PageProps<"/shop">) {
  return (
    <>
      <ShopBanner
        eyebrow="The whole shop"
        title="Paper, tools and kits"
        blurb="Everything you need to fold a friend, from your first square to a sleeping fox on the moon."
      />
      <section className="wrap pt-2 pb-20">
        <Suspense fallback={<ListingSkeleton />}>
          <Listing searchParams={searchParams} />
        </Suspense>
      </section>
    </>
  );
}
