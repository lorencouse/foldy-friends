import React from "react";
import { useRouter } from "next/router";
import Product from "../../src/pages/Product";

const ProductPage = () => {
  const router = useRouter();
  const { id } = router.query;

  return <Product id={id as string} />;
};

export default ProductPage;
