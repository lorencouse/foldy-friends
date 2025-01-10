import React from "react";
import Category from "./Category";
import { Product } from "@/types";
import { getProductsFromCategory } from "@/lib/actions";

const CategoryPage = async ({
  params,
}: {
  params: Promise<{ category: string }>;
}) => {
  const category = (await params).category;
  const products: Product[] = await getProductsFromCategory(category);

  return <Category products={products} category={category} isCategory={true} />;
};

export default CategoryPage;
