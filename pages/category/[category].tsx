import React from "react";
import Category from "../../src/pages/Category";
import { ProductInfo } from "../../src/types";
import { query, collection, getDocs, where } from "firebase/firestore";
import { db } from "../../src/lib/firebaseConfig";
import { convertTimestamps } from "../../src/tools/functions";

export async function getServerSideProps(context: any) {
  const { category } = context.params;

  const productsQuery = query(
    collection(db, "products"),
    where("category", "==", category),
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
      category: category as string,
      products: relatedProductList as ProductInfo[],
    },
  };
}

const CategoryPage = ({
  products,
  category,
}: {
  products: ProductInfo[];
  category: string;
}) => {
  return <Category products={products} category={category} isCategory={true} />;
};

export default CategoryPage;
