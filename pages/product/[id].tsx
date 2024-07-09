import React from "react";
import { useRouter } from "next/router";
import Product from "../../src/pages/Product";
import { LoadingScreen } from "../../src/components/Product/LoadingScreen";
import { db } from "../../src/lib/firebaseConfig";
import {
  doc,
  getDoc,
  collection,
  getDocs,
  query,
  where,
  limit,
} from "firebase/firestore";
import { ProductInfo } from "../../src/types";
import { shuffleProducts } from "../../src/tools/ProductFilterFunctions";

const convertTimestamps = (data: any) => {
  for (const key in data) {
    if (data[key] instanceof Object && data[key].toDate) {
      data[key] = data[key].toDate().toISOString();
    } else if (typeof data[key] === "object") {
      convertTimestamps(data[key]);
    }
  }
  return data;
};

export async function getServerSideProps(context: any) {
  const { id } = context.params;

  const productPromise = getDoc(doc(db, "products", id));
  const relatedProductsPromise = getDocs(
    query(
      collection(db, "products"),
      where("category", "==", (await productPromise).data()?.category),
      limit(10),
    ),
  );

  const [productDoc, relatedProductsSnapshot] = await Promise.all([
    productPromise,
    relatedProductsPromise,
  ]);

  if (!productDoc.exists()) {
    return {
      notFound: true,
    };
  }

  const productData = productDoc.data();
  const serializedProduct = convertTimestamps(productData);

  const productList = relatedProductsSnapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      ...convertTimestamps(data),
    };
  }) as ProductInfo[];

  const relatedProducts = shuffleProducts(
    productList.filter((p) => p.id !== serializedProduct?.id),
    4,
  );

  return {
    props: {
      product: serializedProduct as ProductInfo,
      relatedProducts: relatedProducts as ProductInfo[],
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
