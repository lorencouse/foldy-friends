import React from "react";
import Category from "../../category/[category]/Category";
import { Product } from "@/types";
import { getProductsFromTag } from "@/lib/api";

const TagPage = async ({ params }: { params: Promise<{ tag: string }> }) => {
  const tag = (await params).tag;
  const products: Product[] = await getProductsFromTag(tag);
  return <Category products={products} category={tag} isCategory={false} />;
};

export default TagPage;
