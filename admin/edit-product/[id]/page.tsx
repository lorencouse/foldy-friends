import React from "react";
import CreateProduct from "../../create-product/CreateProduct";
import { LoadingScreen } from "@/components/Product/LoadingScreen";
import { getProductById } from "@/lib/actions";
import { Product } from "@/types";

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
  const product: Product | null = await getProductById(id);

  return <CreateProduct product={product} />;
};

export default EditProductPage;
