import Link from "next/link";
import { connection } from "next/server";
import { ProductCard } from "@/components/product-tile";
import { getProductsBySlugs, type Product } from "@/lib/catalog";

/**
 * The products a guide recommends, read from the catalogue at request time.
 * Render inside <Suspense>: the guide itself is static and builds without a
 * database, and if the database cannot be reached the guide still links to
 * the shop.
 */
export async function GuideProducts({ slugs }: { slugs: readonly string[] }) {
  await connection();
  let products: Product[] | null;
  try {
    products = await getProductsBySlugs(slugs);
  } catch {
    products = null;
  }
  if (!products || products.length === 0) {
    return (
      <p className="sheet rounded-2xl p-5 text-ink-soft">
        Find origami paper and kits for this model in{" "}
        <Link href="/shop" className="link">
          the shop
        </Link>
        .
      </p>
    );
  }
  return (
    <ul className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,250px),1fr))] gap-6">
      {products.map((p) => (
        <li key={p.id}>
          <ProductCard product={p} />
        </li>
      ))}
    </ul>
  );
}

export function GuideProductsSkeleton({ count }: { count: number }) {
  return (
    <ul className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,250px),1fr))] gap-6" aria-busy="true">
      {Array.from({ length: count }, (_, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: placeholders
        <li key={i} className="sheet aspect-[3/4] animate-pulse bg-kraft" />
      ))}
    </ul>
  );
}
