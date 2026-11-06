import Link from "next/link";
import { ProductArt } from "@/components/product-art";
import type { Product } from "@/lib/catalog";
import { effectivePrice, formatPrice } from "@/lib/money";

export function ProductTile({ product, priority = false }: { product: Product; priority?: boolean }) {
  const price = effectivePrice(product);
  return (
    <Link
      href={`/products/${product.slug}`}
      prefetch={priority || undefined}
      className="group block"
      data-rise
    >
      <div className="aspect-square overflow-hidden bg-paper-2">
        {product.images[0] ? (
          // biome-ignore lint/performance/noImgElement: uploaded files are served by /media
          <img
            src={`/media/${product.images[0]}`}
            alt={product.name}
            className="size-full object-cover transition-[scale] duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <ProductArt
            art={product.art}
            option={product.options[0]}
            className="size-full transition-[scale] duration-500 ease-out group-hover:scale-[1.03]"
          />
        )}
      </div>
      <div className="mt-4 flex items-baseline justify-between gap-4">
        <h3 className="text-body font-medium tracking-[-0.01em] group-hover:underline">{product.name}</h3>
        <p className="shrink-0 tabular-nums">
          {formatPrice(price)}
          {price < product.priceCents && (
            <span className="sr-only">, was {formatPrice(product.priceCents)}</span>
          )}
        </p>
      </div>
      <p className="mt-1 text-[1rem] leading-snug">{product.summary}</p>
    </Link>
  );
}
