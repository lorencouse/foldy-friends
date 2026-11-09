import "server-only";
import { and, avg, count, desc, eq, inArray, ne } from "drizzle-orm";
import { cacheLife, cacheTag } from "next/cache";
import { db } from "@/lib/db";
import { type Category, products, reviews, user } from "@/lib/db/schema";

export type Product = typeof products.$inferSelect;

export const CATEGORY_INFO: Record<Category, { title: string; blurb: string }> = {
  paper: {
    title: "Paper",
    blurb: "Square sheets that hold a crease: plain, double-sided, patterned and glittering.",
  },
  tools: {
    title: "Tools",
    blurb: "Glue pens and sticks for tabs, flaps and models that get played with.",
  },
  kits: {
    title: "Kits",
    blurb: "3D papercraft animals asleep on the moon. Score, fold, glue, display.",
  },
};

export const PRODUCTS_TAG = "products";

export async function getProducts() {
  "use cache";
  cacheTag(PRODUCTS_TAG);
  cacheLife("hours");
  return db.query.products.findMany({
    orderBy: [products.category, products.name],
  });
}

export async function getProduct(slug: string) {
  "use cache";
  cacheTag(PRODUCTS_TAG);
  cacheLife("hours");
  return (await db.query.products.findFirst({ where: eq(products.slug, slug) })) ?? null;
}

/** Products by slug, in the order asked for; unknown slugs are left out. */
export async function getProductsBySlugs(slugs: readonly string[]) {
  "use cache";
  cacheTag(PRODUCTS_TAG);
  cacheLife("hours");
  const found = await db.query.products.findMany({ where: inArray(products.slug, [...slugs]) });
  return slugs.flatMap((s) => found.find((p) => p.slug === s) ?? []);
}

export async function getRelated(product: Product, limit = 3) {
  "use cache";
  cacheTag(PRODUCTS_TAG);
  cacheLife("hours");
  return db.query.products.findMany({
    where: and(eq(products.category, product.category), ne(products.id, product.id)),
    limit,
  });
}

export async function getReviews(productId: string) {
  "use cache";
  cacheTag(`reviews:${productId}`);
  cacheLife("hours");
  const [list, [stats]] = await Promise.all([
    db
      .select({
        id: reviews.id,
        rating: reviews.rating,
        title: reviews.title,
        body: reviews.body,
        createdAt: reviews.createdAt,
        author: user.name,
      })
      .from(reviews)
      .innerJoin(user, eq(user.id, reviews.userId))
      .where(eq(reviews.productId, productId))
      .orderBy(desc(reviews.createdAt)),
    db
      .select({ count: count(), average: avg(reviews.rating) })
      .from(reviews)
      .where(eq(reviews.productId, productId)),
  ]);
  return {
    list,
    count: stats.count,
    average: stats.average ? Number(stats.average) : null,
  };
}
