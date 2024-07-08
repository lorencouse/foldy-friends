// src/lib/productServices.tsx
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";
import { ProductInfo } from "../types";

export const fetchProductById = async (
  id: string,
): Promise<ProductInfo | null> => {
  try {
    const productRef = doc(db, "products", id);
    const productSnap = await getDoc(productRef);

    if (!productSnap.exists()) {
      console.error("No such document!");
      return null;
    }

    const data = productSnap.data() as ProductInfo;
    return data;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
};
