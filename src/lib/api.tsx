// src/lib/api.js
import {
  doc,
  getDoc,
  collection,
  getDocs,
  query,
  where,
  limit,
} from "firebase/firestore";
import { db } from "./firebaseConfig";
import { ProductInfo } from "../types";
import { convertTimestamps } from "../tools/functions";


export const getProductById = async (
  id: string,
): Promise<ProductInfo | null> => {
  const productDocRef = doc(db, "products", id);
  const productDoc = await getDoc(productDocRef);
  if (!productDoc.exists()) {
    return null;
  }
  const productData = productDoc.data();
  return {
    id: productDoc.id,
    ...convertTimestamps(productData),
  } as ProductInfo;
};

export const getProductsFromCategory = async (
  category: string,
  limitCount: number = 10,
): Promise<ProductInfo[]> => {
  const productsQuery = query(
    collection(db, "products"),
    where("category", "==", category),
    limit(limitCount),
  );
  const productsSnapshot = await getDocs(productsQuery);
  return productsSnapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      ...convertTimestamps(data),
    };
  }) as ProductInfo[];
};

export const getAllProducts = async (): Promise<ProductInfo[]> => {
  const productsQuery = collection(db, "products");
  const productsSnapshot = await getDocs(productsQuery);
  return productsSnapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      ...convertTimestamps(data),
    };
  }) as ProductInfo[];
};
