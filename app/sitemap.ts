import type { MetadataRoute } from "next";
import { connection } from "next/server";
import { getProducts } from "@/lib/catalog";
import { CATEGORIES } from "@/lib/db/schema";
import { GUIDES } from "@/lib/guides";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  await connection();
  const site = process.env.SITE_URL ?? "https://www.foldyfriends.com";
  const products = await getProducts();
  return [
    { url: site, changeFrequency: "weekly", priority: 1 },
    { url: `${site}/shop`, changeFrequency: "weekly" },
    ...CATEGORIES.map((c) => ({
      url: `${site}/shop/${c}`,
      changeFrequency: "weekly" as const,
    })),
    { url: `${site}/guides`, changeFrequency: "monthly" },
    ...GUIDES.map((g) => ({
      url: `${site}/guides/${g.slug}`,
      lastModified: g.updated,
      changeFrequency: "monthly" as const,
    })),
    ...products.map((p) => ({
      url: `${site}/products/${p.slug}`,
      lastModified: p.updatedAt,
    })),
  ];
}
