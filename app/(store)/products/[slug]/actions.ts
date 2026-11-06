"use server";

import { eq } from "drizzle-orm";
import { updateTag } from "next/cache";
import { z } from "zod";
import { db } from "@/lib/db";
import { products, reviews } from "@/lib/db/schema";
import { getUser } from "@/lib/session";

const ReviewInput = z.object({
  productId: z.uuid(),
  rating: z.coerce.number().int().min(1).max(5),
  title: z.string().trim().min(2, "Give your review a short title.").max(80),
  body: z.string().trim().min(10, "Tell other folders a little more (10 characters or more).").max(2000),
});

export type ReviewState = { ok?: boolean; error?: string };

export async function submitReview(_prev: ReviewState, formData: FormData): Promise<ReviewState> {
  const user = await getUser();
  if (!user) return { error: "Sign in to leave a review." };

  const parsed = ReviewInput.safeParse(Object.fromEntries(formData));
  if (!parsed.success)
    return {
      error: parsed.error.issues[0]?.message ?? "Check the form and try again.",
    };

  const product = await db.query.products.findFirst({
    where: eq(products.id, parsed.data.productId),
    columns: { id: true },
  });
  if (!product) return { error: "That product no longer exists." };

  await db
    .insert(reviews)
    .values({ ...parsed.data, userId: user.id })
    .onConflictDoUpdate({
      target: [reviews.productId, reviews.userId],
      set: {
        rating: parsed.data.rating,
        title: parsed.data.title,
        body: parsed.data.body,
        createdAt: new Date(),
      },
    });
  updateTag(`reviews:${product.id}`);
  return { ok: true };
}
