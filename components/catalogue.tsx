import Link from "next/link";
import { connection } from "next/server";
import { ProductTile } from "@/components/product-tile";
import { CATEGORY_INFO, getProducts } from "@/lib/catalog";
import type { Category } from "@/lib/db/schema";

export function CategoryTabs({ active }: { active?: Category }) {
  const tabs: { href: string; label: string; key?: Category }[] = [
    { href: "/shop", label: "All" },
    ...(Object.keys(CATEGORY_INFO) as Category[]).map((c) => ({
      href: `/shop/${c}`,
      label: CATEGORY_INFO[c].title,
      key: c,
    })),
  ];
  return (
    <nav aria-label="Categories" className="flex flex-wrap gap-2">
      {tabs.map((t) => {
        const current = t.key === active;
        return (
          <Link
            key={t.href}
            href={t.href}
            aria-current={current ? "page" : undefined}
            className={`inline-flex min-h-11 items-center px-4 transition-colors ${
              current ? "bg-ink text-paper" : "bg-paper-2 hover:bg-[#dcdcd7]"
            }`}
          >
            {t.label}
          </Link>
        );
      })}
    </nav>
  );
}

export async function ProductGrid({ category }: { category?: Category }) {
  await connection();
  const products = await getProducts(category);
  if (products.length === 0) {
    return <p className="py-24 text-lead">Nothing here yet. New stock is on its way.</p>;
  }
  return (
    <ul className="grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((p, i) => (
        <li key={p.id}>
          <ProductTile product={p} priority={i < 3} />
        </li>
      ))}
    </ul>
  );
}

export function GridSkeleton() {
  return (
    <ul
      className="grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3"
      aria-busy="true"
      aria-label="Loading products"
    >
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <li key={i}>
          <div className="aspect-square animate-pulse bg-paper-2" />
          <div className="mt-4 h-5 w-2/3 bg-paper-2" />
        </li>
      ))}
    </ul>
  );
}
