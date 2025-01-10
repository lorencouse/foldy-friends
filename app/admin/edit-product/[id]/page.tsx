import React from "react";
import CreateProduct from "../../create-product/CreateProduct";
import { LoadingScreen } from "@/components/Product/LoadingScreen";
import { Product } from "@/types";
import { getProductById } from "@/lib/api";

// export const runtime = "experimental-edge";

const EditProductPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const id = (await params).id;
  if (!id) {
    return <LoadingScreen />;
  }
  const product: Product = await getProductById(id);

  return <CreateProduct product={product} />;
};

export default EditProductPage;
