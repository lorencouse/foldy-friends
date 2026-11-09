import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { ProductDrawing, tileFor } from "@/components/product-picture";
import { getAllProductsFresh } from "@/lib/catalog";
import { CATEGORY_INFO } from "@/lib/categories";
import { effectivePrice, formatPrice } from "@/lib/money";
import { requireAdmin } from "@/lib/session";

export const metadata: Metadata = {
  title: "Products",
  robots: { index: false },
};

export default function AdminPage() {
  return (
    <Suspense fallback={<div className="min-h-[60svh]" aria-busy="true" />}>
      <ProductTable />
    </Suspense>
  );
}

async function ProductTable() {
  await requireAdmin();
  const rows = await getAllProductsFresh();
  return (
    <section className="wrap pt-10 pb-20 md:pt-16">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <h1 className="text-[clamp(2.25rem,4.4vw,3.5rem)] leading-none">Products</h1>
          <p className="mt-3 text-ink-soft">
            {rows.length} products, {rows.filter((r) => r.stock === 0).length} sold out.
          </p>
        </div>
        <Link href="/admin/products/new" className="btn btn-primary">
          Add a product
        </Link>
      </div>
      <div className="mt-10 overflow-x-auto">
        <table className="w-full min-w-[40rem] text-left">
          <thead className="text-small text-ink-soft">
            <tr className="border-b border-[#d6d0c4]">
              <th className="py-3 pr-4 font-medium">Product</th>
              <th className="py-3 pr-4 font-medium">Category</th>
              <th className="py-3 pr-4 text-right font-medium">Price</th>
              <th className="py-3 text-right font-medium">Stock</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((p) => (
              <tr key={p.id} className="border-b border-[#e3ded4]">
                <td className="py-3 pr-4">
                  <Link href={`/admin/products/${p.id}`} className="flex items-center gap-4 hover:underline">
                    <span
                      className="relative flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-lg"
                      style={{ backgroundColor: tileFor(p.art, p.category) }}
                    >
                      {p.images[0] ? (
                        // biome-ignore lint/performance/noImgElement: uploaded files are served by /media
                        <img src={`/media/${p.images[0]}`} alt="" className="size-full object-cover" />
                      ) : (
                        <ProductDrawing art={p.art} category={p.category} option={p.options[0]} />
                      )}
                    </span>
                    {p.name}
                  </Link>
                </td>
                <td className="py-3 pr-4">{CATEGORY_INFO[p.category].title}</td>
                <td className="py-3 pr-4 text-right tabular-nums">{formatPrice(effectivePrice(p))}</td>
                <td className={`py-3 text-right tabular-nums ${p.stock === 0 ? "text-danger" : ""}`}>
                  {p.stock}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
