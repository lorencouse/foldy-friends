import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { z } from "zod";
import { getProductById } from "@/lib/catalog";
import { requireAdmin } from "@/lib/session";
import { ProductForm } from "../../product-form";

export const metadata: Metadata = {
  title: "Edit product",
  robots: { index: false },
};

export default function EditProductPage({ params }: PageProps<"/admin/products/[id]">) {
  return (
    <Suspense fallback={<div className="min-h-[60svh]" aria-busy="true" />}>
      <EditProduct params={params} />
    </Suspense>
  );
}

async function EditProduct({ params }: { params: PageProps<"/admin/products/[id]">["params"] }) {
  await requireAdmin();
  const { id } = await params;
  if (!z.uuid().safeParse(id).success) notFound();
  const product = await getProductById(id);
  if (!product) notFound();
  return (
    <section className="wrap pt-10 pb-20 md:pt-16">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <h1 className="text-[clamp(2.25rem,4.4vw,3.5rem)] leading-none">{product.name}</h1>
        <Link href={`/products/${product.slug}`} className="link">
          View in the shop
        </Link>
      </div>
      <ProductForm initial={product} />
    </section>
  );
}
