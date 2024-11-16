import React from "react";
import Category from "../../src/pages/Category";
import { ProductInfo } from "../../src/types";
import { query, collection, getDocs, where } from "firebase/firestore";
import { db } from "../../src/lib/firebaseConfig";
import { convertTimestamps } from "../../src/tools/functions";

export const runtime = "experimental-edge";

export async function getServerSideProps(context: any) {
  const { tag } = context.params;

  const productsQuery = query(
    collection(db, "products"),
    where("tags", "array-contains", tag),
  );
  const productsSnapshot = await getDocs(productsQuery);

  const relatedProductList = productsSnapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      ...convertTimestamps(data),
    };
  }) as ProductInfo[];

  return {
    props: {
      tag: tag as string,
      products: relatedProductList as ProductInfo[],
    },
  };
}

const TagPage = ({
  products,
  tag,
}: {
  products: ProductInfo[];
  tag: string;
}) => {
  return <Category products={products} category={tag} isCategory={false} />;
};

export default TagPage;
