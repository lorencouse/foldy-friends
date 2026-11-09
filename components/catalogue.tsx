import Link from "next/link";
import { connection } from "next/server";
import { ProductCard } from "@/components/product-tile";
import { SortSelect } from "@/components/sort-select";
import { getProducts, type Product } from "@/lib/catalog";
import { CATEGORY_LINKS, type Category } from "@/lib/categories";
import { effectivePrice } from "@/lib/money";
import { parseSort, type Sort } from "@/lib/sort";

function sortProducts(list: Product[], sort: Sort) {
  const copy = [...list];
  if (sort === "price-asc") copy.sort((a, b) => effectivePrice(a) - effectivePrice(b));
  else if (sort === "price-desc") copy.sort((a, b) => effectivePrice(b) - effectivePrice(a));
  else if (sort === "newest") copy.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  return copy;
}

/** Category chips with counts, the sort control and the product grid. */
export async function Listing({
  category,
  searchParams,
}: {
  category?: Category;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  await connection();
  const [{ sort: rawSort }, all] = await Promise.all([searchParams, getProducts()]);
  const sort = parseSort(rawSort);
  const products = sortProducts(category ? all.filter((p) => p.category === category) : all, sort);
  const chips: { href: string; label: string; count: number; category?: Category }[] = [
    { href: "/shop", label: "All", count: all.length },
    ...CATEGORY_LINKS.map((link) => ({
      ...link,
      count: all.filter((p) => p.category === link.category).length,
    })),
  ];
  const query = sort === "featured" ? "" : `?sort=${sort}`;
  return (
    <div className="flex flex-col gap-7">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <nav aria-label="Categories" className="flex flex-wrap gap-2.5">
          {chips.map((c) => (
            <Link
              key={c.href}
              href={`${c.href}${query}`}
              className="chip"
              aria-current={c.category === category ? "page" : undefined}
            >
              {c.label} <span className="font-bold opacity-75">{c.count}</span>
            </Link>
          ))}
        </nav>
        <SortSelect action={category ? `/shop/${category}` : "/shop"} value={sort} />
      </div>
      <p className="text-base font-bold text-ink-soft">
        Showing {products.length} of {all.length} {all.length === 1 ? "item" : "items"}
      </p>
      {products.length === 0 ? (
        <p className="py-16 text-lead">Nothing here yet. New stock is on its way.</p>
      ) : (
        <ul className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,260px),1fr))] gap-6">
          {products.map((p, i) => (
            <li key={p.id}>
              <ProductCard product={p} priority={i < 3} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function ListingSkeleton() {
  return (
    <div className="flex flex-col gap-7" role="status" aria-busy="true" aria-label="Loading products">
      <div className="h-11 w-72 max-w-full animate-pulse rounded-full bg-kraft" />
      <ul className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,260px),1fr))] gap-6">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <li key={i} className="sheet h-[520px] animate-pulse" />
        ))}
      </ul>
    </div>
  );
}
