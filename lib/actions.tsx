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
import { Product, UserData } from "@/types";
import { convertTimestamps } from "@/tools/functions";
import { getAuth } from "firebase/auth";

export const getProductById = async (id: string): Promise<Product | null> => {
  const productDocRef = doc(db, "products", id);
  const productDoc = await getDoc(productDocRef);
  if (!productDoc.exists()) {
    return null;
  }
  const productData = productDoc.data();
  return {
    id: productDoc.id,
    ...convertTimestamps(productData),
  } as Product;
};

export const getProductsFromCategory = async (
  category: string,
  limitCount: number = 10,
): Promise<Product[]> => {
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
  }) as Product[];
};

export const getProductsFromTag = async (
  tag: string,
  limitCount: number = 10,
): Promise<Product[]> => {
  const productsQuery = query(
    collection(db, "products"),
    where("tags", "array-contains", tag),
    limit(limitCount),
  );
  const productsSnapshot = await getDocs(productsQuery);
  return productsSnapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      ...convertTimestamps(data),
    };
  }) as Product[];
};

export const getAllProducts = async (): Promise<Product[]> => {
  const productsQuery = collection(db, "products");
  const productsSnapshot = await getDocs(productsQuery);
  return productsSnapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      ...convertTimestamps(data),
    };
  }) as Product[];
};

export const getUserProfile = async (): Promise<UserData | null> => {
  const auth = await getAuth();
  const user = auth.currentUser;
  if (!user) {
    return null;
  }
  const id = user.uid;
  const userDocRef = doc(db, "users", id);
  const userDoc = await getDoc(userDocRef);
  if (!userDoc.exists()) {
    return null;
  }
  return userDoc.data() as UserData;
};
