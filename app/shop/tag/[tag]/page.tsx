import React from "react";
import Category from "../../category/[category]/Category";
import { Product } from "@/types";
import { getProductsFromTag } from "@/lib/actions";
import { productTags } from "@/data/constants";

export async function generateStaticParams() {
  return productTags.map((tag) => ({
    tag,
  }));
}

const TagPage = async ({ params }: { params: Promise<{ tag: string }> }) => {
  const tag = (await params).tag;
  const products: Product[] = await getProductsFromTag(tag);
  return <Category products={products} category={tag} isCategory={false} />;
};

export default TagPage;
