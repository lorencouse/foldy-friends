import React from "react";
import Category from "./Category";
import { Product } from "@/types";
import { getProductsFromCategory } from "@/lib/actions";
import { productCategories } from "@/data/constants";

export async function generateStaticParams() {
  return productCategories.map((category) => ({
    category,
  }));
}

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
