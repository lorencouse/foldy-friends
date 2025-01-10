import React from "react";
import ProductLayout from "./ProductLayout";
import { Product } from "@/types";
import {
  getProductsFromCategory,
  getProductById,
  getAllProducts,
} from "@/lib/actions";
import { shuffleProducts } from "@/tools/ProductFilterFunctions";

export async function generateStaticParams() {
  const products = await getAllProducts();

  return products.map((product) => ({
    product: product.id,
  }));
}

const ProductPage = async ({
  params,
}: {
  params: Promise<{ product: string }>;
}) => {
  const productId = (await params).product;

  if (!productId) {
    return;
  }

  const product: Product | null = await getProductById(productId);

  if (!product) {
    return;
  }

  const relatedProductsList: Product[] = await getProductsFromCategory(
    product.category,
  );
  const relatedProducts: Product[] = shuffleProducts(
    relatedProductsList.filter((p) => p.id !== productId),
    4,
  );

  return <ProductLayout product={product} relatedProducts={relatedProducts} />;
};

export default ProductPage;
