import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { AddToCart } from "@/components/add-to-cart";
import { FoldDiamonds } from "@/components/fold-level";
import { ProductGallery } from "@/components/product-gallery";
import { OptionProvider } from "@/components/product-option";
import { ProductDrawing, tileFor } from "@/components/product-picture";
import { getProduct, getRelated, getReviews, type Product } from "@/lib/catalog";
import { CATEGORY_INFO } from "@/lib/categories";
import { descriptionParagraphs, foldLevel, needs } from "@/lib/fold-level";
import { guidesForProduct } from "@/lib/guides";
import {
  effectivePrice,
  FREE_SHIPPING_FROM_CENTS,
  formatPrice,
  formatPriceShort,
  SHIPPING_CENTS,
} from "@/lib/money";
import { getUser } from "@/lib/session";
import { ReviewForm, Star } from "./review-form";

export async function generateMetadata({ params }: PageProps<"/products/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.summary,
    openGraph: { title: product.name, description: product.summary },
  };
}

export default function ProductPage({ params }: PageProps<"/products/[slug]">) {
  return (
    <Suspense fallback={<div className="min-h-[80svh]" aria-busy="true" />}>
      <ProductView params={params} />
    </Suspense>
  );
}

const LEVEL_NOTES: Record<string, string> = {
  "Little folder": "A few simple steps, good for first folds.",
  "Growing folder": "More steps and some gluing; a grown-up helps.",
  "Fold master": "A long build, best done together.",
};

async function ProductView({ params }: { params: PageProps<"/products/[slug]">["params"] }) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();
  const price = effectivePrice(product);
  const onSale = price < product.priceCents;
  const category = CATEGORY_INFO[product.category];
  const level = foldLevel(product.description);
  const need = needs(product.description);
  const about = descriptionParagraphs(product.description);
  const eyebrow =
    product.category === "kits" ? `Moon Dreamers · ${category.productEyebrow}` : category.productEyebrow;
  const guides = guidesForProduct(product.slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.summary,
    sku: product.sku ?? product.slug,
    offers: {
      "@type": "Offer",
      price: (price / 100).toFixed(2),
      priceCurrency: "USD",
      availability: product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD from our own data
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <div className="wrap pt-5">
        <nav aria-label="Breadcrumb" className="text-[0.9375rem] font-bold text-ink-soft">
          <ol className="flex flex-wrap gap-x-2">
            <li>
              <Link href="/" className="inline-flex min-h-11 items-center hover:text-tomato">
                Home
              </Link>
            </li>
            <li aria-hidden="true" className="flex items-center">
              /
            </li>
            <li>
              <Link
                href={`/shop/${product.category}`}
                className="inline-flex min-h-11 items-center hover:text-tomato"
              >
                {category.title}
              </Link>
            </li>
            <li aria-hidden="true" className="flex items-center">
              /
            </li>
            <li className="flex min-w-0 items-center text-ink">
              <span aria-current="page" className="truncate">
                {product.name}
              </span>
            </li>
          </ol>
        </nav>
      </div>
      <OptionProvider initial={product.options[0] ?? null}>
        <article className="wrap grid grid-cols-[repeat(auto-fit,minmax(min(100%,460px),1fr))] items-start gap-[clamp(28px,5vw,72px)] pt-4 pb-[72px]">
          <div className="md:sticky md:top-6">
            <ProductGallery product={product} />
          </div>
          <div className="flex min-w-0 flex-col gap-5.5">
            <div className="flex flex-col gap-2.5">
              <p className="eyebrow">{eyebrow}</p>
              <h1 className="text-[clamp(2.5rem,4.6vw,3.75rem)] leading-none tracking-[-0.02em]">
                {product.name}
              </h1>
            </div>
            <div className="flex flex-wrap items-baseline gap-3">
              <strong className="font-display text-[2.375rem] leading-none font-extrabold">
                {formatPrice(price)}
              </strong>
              {onSale && (
                <>
                  <s className="text-xl text-ink-soft">
                    <span className="sr-only">was </span>
                    {formatPrice(product.priceCents)}
                  </s>
                  <span className="tape -rotate-2" style={{ backgroundColor: "var(--color-blush)" }}>
                    {Math.round((1 - price / product.priceCents) * 100)}% off
                  </span>
                </>
              )}
            </div>
            <Suspense fallback={<p className="h-6" />}>
              <RatingSummary productId={product.id} />
            </Suspense>
            <p className="max-w-[560px] text-ink-soft">{product.summary}</p>

            {level && (
              <div className="flex flex-wrap items-center gap-4 rounded-2xl border-[1.5px] border-[#F2D58E] bg-sun-pale px-4.5 py-4">
                <FoldDiamonds level={level} />
                <div className="flex flex-col leading-[1.35]">
                  <strong className="text-base">
                    Fold level {level.level} of {level.of} · {level.name}
                  </strong>
                  <span className="text-[0.9375rem] text-ink-soft">{LEVEL_NOTES[level.name]}</span>
                </div>
              </div>
            )}

            <AddToCart product={product} unitPriceCents={price} variant="full" />
            <p
              className={`flex items-center gap-2 text-[0.9375rem] font-bold ${product.stock > 0 ? "text-mint-ink" : "text-ink-soft"}`}
            >
              <span
                className="dia"
                style={{ background: product.stock > 0 ? "var(--color-mint)" : "var(--color-tomato)" }}
              />
              {product.stock > 0
                ? `${product.stock} in stock. Packed and posted the next working day.`
                : "Out of stock for now."}
            </p>

            <div className="border-t-[1.5px] border-crease">
              {need && (
                <Details title="What you'll need" open>
                  <p>You will need {need}.</p>
                  {product.category === "kits" && (
                    <p>
                      Our{" "}
                      <Link href="/products/pinpoint-glue-roller-pen" className="link">
                        Pinpoint glue roller pen
                      </Link>{" "}
                      lays a thin, even line along a tab.
                    </p>
                  )}
                </Details>
              )}
              <Details title="What's in the box" open={!need}>
                {about.map((para) => (
                  <p key={para.slice(0, 32)}>{para}</p>
                ))}
              </Details>
              {guides.length > 0 && (
                <Details title="Fold it: free guides" open>
                  <ul className="flex flex-col gap-2">
                    {guides.map((g) => (
                      <li key={g.slug}>
                        <Link href={`/guides/${g.slug}`} className="link">
                          {g.title}
                        </Link>
                        <span className="text-[0.9375rem]">
                          {" "}
                          · {g.steps.length} steps, about {g.minutes} minutes
                        </span>
                      </li>
                    ))}
                  </ul>
                </Details>
              )}
              <Details title="Shipping">
                <p>
                  Free shipping on orders over {formatPriceShort(FREE_SHIPPING_FROM_CENTS)}; otherwise{" "}
                  {formatPrice(SHIPPING_CENTS)}, in the US. Packed and posted the next working day.
                </p>
              </Details>
            </div>
          </div>
        </article>
      </OptionProvider>

      <section aria-labelledby="reviews-heading" className="bg-kraft py-[72px]">
        <div className="wrap grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] items-start gap-12">
          <Suspense fallback={<p>Loading reviews…</p>}>
            <Reviews product={product} />
          </Suspense>
          <div
            className="dogear creases flex aspect-square w-[min(100%,320px)] items-center justify-center justify-self-center rounded-[24px_0_24px_24px] bg-sun-pale"
            aria-hidden="true"
          >
            <span className="flap" />
            <Image
              src="/assets/origami-cat-inverted.png"
              alt=""
              width={192}
              height={192}
              className="w-[62%] mix-blend-multiply"
            />
          </div>
        </div>
      </section>

      <Suspense fallback={null}>
        <Related product={product} />
      </Suspense>
    </>
  );
}

function Details({
  title,
  open = false,
  children,
}: {
  title: string;
  open?: boolean;
  children: React.ReactNode;
}) {
  return (
    <details className="details border-b-[1.5px] border-crease py-1" open={open}>
      <summary>
        {title}
        <svg
          className="chev"
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </summary>
      <div className="mb-4 flex flex-col gap-3 text-[1.0625rem] text-ink-soft">{children}</div>
    </details>
  );
}

async function RatingSummary({ productId }: { productId: string }) {
  const { count, average } = await getReviews(productId);
  if (!count || average == null) return null;
  return (
    <p className="flex items-center gap-2 text-[0.9375rem] font-bold">
      <span className="flex" aria-hidden>
        {[1, 2, 3, 4, 5].map((n) => (
          <Star key={n} filled={n <= Math.round(average)} size={18} />
        ))}
      </span>
      {average.toFixed(1)} out of 5, from {count} {count === 1 ? "review" : "reviews"}
    </p>
  );
}

async function Reviews({ product }: { product: Product }) {
  const { list } = await getReviews(product.id);
  const date = new Intl.DateTimeFormat("en-US", { dateStyle: "medium" });
  return (
    <div className="flex flex-col items-start gap-4">
      <p className="eyebrow">Reviews</p>
      <h2 id="reviews-heading" className="text-[clamp(1.875rem,3.6vw,2.625rem)]">
        {list.length === 0 ? "No reviews yet" : "What families say"}
      </h2>
      {list.length === 0 ? (
        <p className="max-w-[460px] text-ink-soft">Folded one of these? Tell other families how it went.</p>
      ) : (
        <ul className="flex w-full flex-col gap-4">
          {list.map((r) => (
            <li key={r.id} className="sheet rounded-2xl p-5">
              <p className="flex" role="img" aria-label={`${r.rating} out of 5`}>
                {[1, 2, 3, 4, 5].map((n) => (
                  <Star key={n} filled={n <= r.rating} size={18} />
                ))}
              </p>
              <h3 className="mt-2 text-xl font-bold">{r.title}</h3>
              <p className="mt-1">{r.body}</p>
              <p className="mt-2 text-[0.9375rem] text-ink-soft">
                {r.author}, {date.format(r.createdAt)}
              </p>
            </li>
          ))}
        </ul>
      )}
      <Suspense fallback={null}>
        <ReviewSlot productId={product.id} slug={product.slug} />
      </Suspense>
    </div>
  );
}

async function ReviewSlot({ productId, slug }: { productId: string; slug: string }) {
  const user = await getUser();
  if (!user) {
    return (
      <Link href={`/sign-in?next=/products/${slug}`} className="btn mt-2">
        Sign in to write a review
      </Link>
    );
  }
  return (
    <div className="mt-2 w-full">
      <ReviewForm productId={productId} />
    </div>
  );
}

async function Related({ product }: { product: Product }) {
  const related = await getRelated(product);
  if (related.length === 0) return null;
  const title =
    product.category === "kits"
      ? "More Moon Dreamers"
      : `More ${CATEGORY_INFO[product.category].title.toLowerCase()}`;
  return (
    <section aria-labelledby="related-heading" className="py-[72px]">
      <div className="wrap flex flex-col gap-7">
        <h2 id="related-heading" className="text-[clamp(1.875rem,3.6vw,2.625rem)]">
          {title}
        </h2>
        <ul className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,260px),1fr))] gap-6">
          {related.map((p) => (
            <li key={p.id}>
              <Link
                href={`/products/${p.slug}`}
                className="sheet lift flex items-center gap-4 rounded-[20px] p-3 hover:border-ink"
              >
                <div
                  className="relative flex aspect-square w-24 flex-none items-center justify-center overflow-hidden rounded-[14px]"
                  style={{ backgroundColor: tileFor(p.art, p.category) }}
                >
                  {p.images[0] ? (
                    // biome-ignore lint/performance/noImgElement: uploaded files are served by /media
                    <img
                      src={`/media/${p.images[0]}`}
                      alt=""
                      className="absolute inset-0 size-full object-cover"
                    />
                  ) : (
                    <ProductDrawing art={p.art} category={p.category} option={p.options[0]} />
                  )}
                </div>
                <div className="min-w-0">
                  <strong className="block font-display text-[1.1875rem] leading-[1.15] font-bold">
                    {p.name}
                  </strong>
                  <span className="font-extrabold">{formatPrice(effectivePrice(p))}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
