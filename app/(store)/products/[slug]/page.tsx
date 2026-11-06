import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { AddToCart } from "@/components/add-to-cart";
import { OptionArt, OptionProvider } from "@/components/product-option";
import { ProductTile } from "@/components/product-tile";
import { CATEGORY_INFO, getProduct, getRelated, getReviews, type Product } from "@/lib/catalog";
import { effectivePrice, formatPrice } from "@/lib/money";
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

async function ProductView({ params }: { params: PageProps<"/products/[slug]">["params"] }) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();
  const price = effectivePrice(product);
  const category = CATEGORY_INFO[product.category];

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
      <nav aria-label="Breadcrumb" className="pt-6 text-small text-muted">
        <Link href="/shop" className="hover:underline">
          Shop
        </Link>
        {" / "}
        <Link href={`/shop/${product.category}`} className="hover:underline">
          {category.title}
        </Link>
      </nav>
      <OptionProvider initial={product.options[0] ?? null}>
        <article className="mt-6 grid gap-10 md:grid-cols-2 md:gap-16">
          <div className="md:sticky md:top-6 md:self-start">
            {product.images.length > 0 ? (
              <div className="grid gap-2">
                {product.images.map((img, i) => (
                  // biome-ignore lint/performance/noImgElement: uploaded files are served by /media
                  <img
                    key={img}
                    src={`/media/${img}`}
                    alt={i === 0 ? product.name : ""}
                    className="aspect-square w-full object-cover"
                  />
                ))}
              </div>
            ) : (
              <OptionArt
                art={product.art}
                title={`Drawing of ${product.name}`}
                className="aspect-square w-full"
              />
            )}
          </div>
          <div className="md:pt-6">
            <h1 className="text-[clamp(2rem,1.5rem+2vw,3.25rem)]">{product.name}</h1>
            <p className="mt-4 text-lead">
              {formatPrice(price)}
              {price < product.priceCents && (
                <span className="ml-3 text-body text-muted line-through">
                  <span className="sr-only">was </span>
                  {formatPrice(product.priceCents)}
                </span>
              )}
            </p>
            <Suspense fallback={<p className="mt-2 h-6" />}>
              <RatingSummary productId={product.id} />
            </Suspense>
            <p className="mt-6 max-w-[48ch] text-lead">{product.summary}</p>
            <div className="mt-8">
              <AddToCart
                product={product}
                unitPriceCents={price}
                withOptions
                className="btn btn-accent w-full sm:w-auto"
              />
            </div>
            <p className="mt-4 text-small text-muted">
              {product.stock > 0 ? `${product.stock} in stock.` : "Out of stock."} Free shipping over $35.
            </p>
            <div className="mt-12 max-w-[60ch] space-y-4 leading-[1.6]">
              <h2 className="text-lead">About it</h2>
              {product.description.split(/\n{2,}/).map((para) => (
                <p key={para.slice(0, 32)}>{para}</p>
              ))}
            </div>
          </div>
        </article>
      </OptionProvider>

      <section className="mt-32" aria-labelledby="reviews-heading">
        <h2 id="reviews-heading" className="text-head">
          Reviews
        </h2>
        <div className="mt-10 grid gap-12 md:grid-cols-2">
          <Suspense fallback={<p>Loading reviews…</p>}>
            <ReviewList productId={product.id} />
          </Suspense>
          <Suspense fallback={null}>
            <ReviewSlot productId={product.id} slug={product.slug} />
          </Suspense>
        </div>
      </section>

      <Suspense fallback={null}>
        <Related product={product} />
      </Suspense>
    </>
  );
}

async function RatingSummary({ productId }: { productId: string }) {
  const { count, average } = await getReviews(productId);
  if (!count || average == null) return <p className="mt-2 text-small text-muted">No reviews yet.</p>;
  return (
    <p className="mt-2 flex items-center gap-2 text-small">
      <span className="flex" aria-hidden>
        {[1, 2, 3, 4, 5].map((n) => (
          <Star key={n} filled={n <= Math.round(average)} size={18} />
        ))}
      </span>
      {average.toFixed(1)} out of 5, from {count} {count === 1 ? "review" : "reviews"}
    </p>
  );
}

async function ReviewList({ productId }: { productId: string }) {
  const { list } = await getReviews(productId);
  if (list.length === 0) {
    return (
      <p className="text-lead text-muted">Nobody has reviewed this yet. Folded one? Tell us how it went.</p>
    );
  }
  return (
    <ul className="space-y-10">
      {list.map((r) => (
        <li key={r.id}>
          <p className="flex" role="img" aria-label={`${r.rating} out of 5`}>
            {[1, 2, 3, 4, 5].map((n) => (
              <Star key={n} filled={n <= r.rating} size={18} />
            ))}
          </p>
          <h3 className="mt-2 text-body font-medium">{r.title}</h3>
          <p className="mt-1">{r.body}</p>
          <p className="mt-2 text-small text-muted">
            {r.author}, {new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(r.createdAt)}
          </p>
        </li>
      ))}
    </ul>
  );
}

async function ReviewSlot({ productId, slug }: { productId: string; slug: string }) {
  const user = await getUser();
  if (!user) {
    return (
      <div className="bg-paper-2 p-6 sm:p-8">
        <p className="text-lead">Folded one of these?</p>
        <Link href={`/sign-in?next=/products/${slug}`} className="btn mt-5">
          Sign in to write a review
        </Link>
      </div>
    );
  }
  return <ReviewForm productId={productId} />;
}

async function Related({ product }: { product: Product }) {
  const related = await getRelated(product);
  if (related.length === 0) return null;
  return (
    <section className="mt-32" aria-labelledby="related-heading">
      <h2 id="related-heading" className="text-head">
        More {CATEGORY_INFO[product.category].title.toLowerCase()}
      </h2>
      <ul className="mt-10 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
        {related.map((p) => (
          <li key={p.id}>
            <ProductTile product={p} />
          </li>
        ))}
      </ul>
    </section>
  );
}
