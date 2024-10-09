import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import CreateProduct from "../../../src/components/backend/product/createProduct/CreateProduct";
import { LoadingScreen } from "../../../src/components/Product/LoadingScreen";
import AdminRoute from "../../../src/components/AdminRoute";
import { ProductInfo } from "../../../src/types";
import { getProductById, getAllProducts } from "../../../src/lib/api";

const EditProductPage = ( { product }: { product: ProductInfo } ) => {


  if (!product) {
    return <LoadingScreen />;
  }

  return <CreateProduct product={product} />;
};

export default AdminRoute(EditProductPage);

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

  return {
    props: {
      product,
    },
  };
}


