// src/pages/product/[id].tsx
import React from "react";
import { useRouter } from "next/router";
import Product from "../../src/pages/Product";
import { LoadingScreen } from "../../src/components/Product/LoadingScreen";

const ProductPage = () => {
  const router = useRouter();
  const { id } = router.query;

  if (!id) {
    return <LoadingScreen />;
  }

  return <Product id={id as string} />;
};

export default ProductPage;
