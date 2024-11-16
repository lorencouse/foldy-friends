import React from "react";
import { useRouter } from "next/router";
import Product from "../../src/pages/Product";
import { ProductInfo } from "../../src/types";
import {
  getProductById,
  getProductsFromCategory,
  getAllProducts,
} from "../../src/lib/api";
import { shuffleProducts } from "../../src/tools/ProductFilterFunctions";
import { LoadingScreen } from "../../src/components/Product/LoadingScreen";

export const runtime = "experimental-edge";


export async function getStaticPaths() {
  const products = await getAllProducts();
  const paths = products.map((product) => ({
    params: { id: product.id },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context: any) {
  const { id } = context.params;

  const product = await getProductById(id);
  if (!product) {
    return {
      notFound: true,
    };
  }

  const relatedProductsList = await getProductsFromCategory(product.category);
  const relatedProducts = shuffleProducts(
    relatedProductsList.filter((p) => p.id !== product.id),
    4,
  );

  return {
    props: {
      product,
      relatedProducts,
    },
  };
}

const ProductPage = ({
  product,
  relatedProducts,
}: {
  product: ProductInfo;
  relatedProducts: ProductInfo[];
}) => {
  const router = useRouter();

  if (router.isFallback) {
    return <LoadingScreen />;
  }

  return <Product product={product} relatedProducts={relatedProducts} />;
};

export default ProductPage;
