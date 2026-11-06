import type { Metadata } from "next";
import { Suspense } from "react";
import { requireAdmin } from "@/lib/session";
import { ProductForm } from "../../product-form";

export const metadata: Metadata = {
  title: "Add a product",
  robots: { index: false },
};

export default function NewProductPage() {
  return (
    <Suspense fallback={<div className="min-h-[60svh]" aria-busy="true" />}>
      <NewProduct />
    </Suspense>
  );
}

async function NewProduct() {
  await requireAdmin();
  return (
    <section className="pt-10 md:pt-16">
      <h1 className="text-head">Add a product</h1>
      <ProductForm
        initial={{
          name: "",
          slug: "",
          category: "paper",
          summary: "",
          description: "",
          priceCents: 0,
          salePriceCents: null,
          stock: 0,
          sku: null,
          art: "paper-double",
          options: [],
          tags: [],
          images: [],
        }}
      />
    </section>
  );
}
