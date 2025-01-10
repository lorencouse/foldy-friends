import React from "react";
import ProductLayout from "./ProductLayout";
import { Product } from "@/types";
import { getProductsFromCategory, getProductById } from "@/lib/api";
import { shuffleProducts } from "@/tools/ProductFilterFunctions";

const ProductPage = async ({
  params,
}: {
  params: Promise<{ product: string }>;
}) => {
  const productId = (await params).product;

  if (!productId) {
    return;
  }

  const product: Product = await getProductById(productId);
  const relatedProductsList: Product[] = await getProductsFromCategory(
    product.category,
  );
  const relatedProducts: Product[] = shuffleProducts(
    relatedProductsList.filter((p) => p.id !== productId),
    4,
  );

  return (
    <ProductLayout
      product={product}
      relatedProducts={relatedProducts}
      productId={productId}
    />
  );
};

export default ProductPage;
