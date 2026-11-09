"use server";

import { eq } from "drizzle-orm";
import { updateTag } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { PRODUCTS_TAG } from "@/lib/catalog";
import { CATEGORIES } from "@/lib/categories";
import { db } from "@/lib/db";
import { products } from "@/lib/db/schema";
import { requireAdmin } from "@/lib/session";
import { deleteUpload, saveUpload } from "@/lib/uploads";

const dollars = z
  .string()
  .trim()
  .regex(/^\d+(\.\d{1,2})?$/, "Prices look like 12.99.")
  .transform((v) => Math.round(Number(v) * 100));

const list = z
  .string()
  .default("")
  .transform((v) =>
    v
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean),
  );

const ProductInput = z.object({
  name: z.string().trim().min(2, "Give the product a name.").max(120),
  slug: z
    .string()
    .trim()
    .toLowerCase()
    .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, "The web address may only use lowercase letters, numbers and dashes."),
  category: z.enum(CATEGORIES),
  summary: z.string().trim().max(200).default(""),
  description: z.string().trim().max(5000).default(""),
  price: dollars,
  salePrice: z
    .preprocess((v) => (v == null || v === "" ? undefined : v), dollars.optional())
    .transform((v) => v ?? null),
  stock: z.coerce.number().int().min(0).max(100000),
  sku: z.string().trim().max(60).default(""),
  art: z.string().trim().min(1).max(40),
  options: list,
  tags: list,
});

export type ProductFormState = { error?: string; saved?: boolean };

export async function saveProduct(_prev: ProductFormState, formData: FormData): Promise<ProductFormState> {
  await requireAdmin();
  const id = formData.get("id") ? String(formData.get("id")) : null;
  const parsed = ProductInput.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? "Check the form." };
  const { price, salePrice, sku, ...rest } = parsed.data;
  if (salePrice != null && salePrice >= price)
    return { error: "The sale price must be lower than the price." };

  const values = {
    ...rest,
    priceCents: price,
    salePriceCents: salePrice,
    sku: sku || null,
  };

  // New photos are appended to the product's existing ones.
  const files = formData.getAll("photos").filter((f): f is File => f instanceof File && f.size > 0);
  let uploaded: string[] = [];
  try {
    uploaded = await Promise.all(files.map(saveUpload));
  } catch (e) {
    return {
      error: e instanceof Error ? e.message : "The photo could not be saved.",
    };
  }

  try {
    if (id) {
      const current = await db.query.products.findFirst({
        where: eq(products.id, id),
        columns: { images: true },
      });
      if (!current) return { error: "That product no longer exists." };
      await db
        .update(products)
        .set({ ...values, images: [...current.images, ...uploaded] })
        .where(eq(products.id, id));
    } else {
      await db.insert(products).values({ ...values, images: uploaded });
    }
  } catch (e) {
    await Promise.all(uploaded.map(deleteUpload));
    const message =
      e instanceof Error && /unique/i.test(e.message)
        ? "Another product already uses that web address."
        : "The product could not be saved.";
    return { error: message };
  }
  updateTag(PRODUCTS_TAG);
  if (!id) redirect("/admin");
  return { saved: true };
}

export async function removePhoto(productId: string, name: string) {
  await requireAdmin();
  const current = await db.query.products.findFirst({
    where: eq(products.id, productId),
    columns: { images: true },
  });
  if (!current) return;
  await db
    .update(products)
    .set({ images: current.images.filter((i) => i !== name) })
    .where(eq(products.id, productId));
  await deleteUpload(name);
  updateTag(PRODUCTS_TAG);
}

export async function deleteProduct(productId: string) {
  await requireAdmin();
  const [gone] = await db
    .delete(products)
    .where(eq(products.id, productId))
    .returning({ images: products.images });
  if (gone) await Promise.all(gone.images.map(deleteUpload));
  updateTag(PRODUCTS_TAG);
  redirect("/admin");
}
