import Link from "next/link";
import { AddToCart } from "@/components/add-to-cart";
import { FoldDiamonds } from "@/components/fold-level";
import { PictureTile } from "@/components/product-picture";
import type { Product } from "@/lib/catalog";
import { foldLevel } from "@/lib/fold-level";
import { effectivePrice, formatPrice } from "@/lib/money";

export const EYEBROW: Record<string, string> = {
  kits: "3D papercraft kit",
  paper: "Origami paper",
  tools: "Glue and tools",
};

/** One washi-tape badge for a product: Beginner for first folds, otherwise Sale. */
export function badgeFor(product: Pick<Product, "tags" | "priceCents" | "salePriceCents">) {
  if (product.tags.includes("beginner")) return { label: "Beginner", color: "var(--color-mint)" };
  if (effectivePrice(product) < product.priceCents) return { label: "Sale", color: "var(--color-blush)" };
  return null;
}

export function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  const price = effectivePrice(product);
  const level = foldLevel(product.description);
  const badge = badgeFor(product);
  return (
    <article className="sheet sheet-raised lift flex h-full flex-col overflow-hidden" data-rise>
      <Link
        href={`/products/${product.slug}`}
        prefetch={priority || undefined}
        tabIndex={-1}
        aria-hidden="true"
        className="block px-2.5 pt-2.5"
      >
        <PictureTile
          art={product.art}
          category={product.category}
          option={product.options[0]}
          photo={product.images[0]}
          className="rounded-[16px_0_16px_16px]"
        >
          {badge && (
            <span
              className="tape absolute top-4 left-3.5 z-[3] -rotate-4"
              style={{ backgroundColor: badge.color }}
            >
              {badge.label}
            </span>
          )}
        </PictureTile>
      </Link>
      <div className="flex flex-1 flex-col gap-2 px-5 pt-4 pb-5">
        <span className="eyebrow">{EYEBROW[product.category]}</span>
        <h3 className="text-[1.375rem] leading-[1.15] font-bold">
          <Link
            href={`/products/${product.slug}`}
            prefetch={priority || undefined}
            className="hover:text-tomato"
          >
            {product.name}
          </Link>
        </h3>
        <p className="line-clamp-2 text-[0.9375rem] leading-normal text-ink-soft">{product.summary}</p>
        <div className="mt-auto flex items-center justify-between gap-2 pt-1">
          <p className="flex items-baseline gap-2">
            <strong className="font-display text-[1.375rem] leading-none font-extrabold">
              {formatPrice(price)}
            </strong>
            {price < product.priceCents && (
              <s className="text-[0.9375rem] text-ink-soft">
                <span className="sr-only">was </span>
                {formatPrice(product.priceCents)}
              </s>
            )}
          </p>
          {level && <FoldDiamonds level={level} size="sm" />}
        </div>
        <div className="mt-1.5">
          <AddToCart product={product} unitPriceCents={price} />
        </div>
      </div>
    </article>
  );
}
