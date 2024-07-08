import { ProductInfo } from "../types";
import { db } from "../config/firebase-admin";
import { Timestamp, FieldPath } from "firebase-admin/firestore";

function convertTimestamps(data: any): any {
  const converted = { ...data };
  for (const [key, value] of Object.entries(converted)) {
    if (value instanceof Timestamp) {
      converted[key] = value.toDate().toISOString();
    } else if (typeof value === "object" && value !== null) {
      converted[key] = convertTimestamps(value);
    }
  }
  return converted;
}

export async function getProductById(id: string): Promise<ProductInfo | null> {
  const doc = await db.collection("products").doc(id).get();
  if (!doc.exists) {
    return null;
  }
  const data = convertTimestamps(doc.data());
  return { id: doc.id, ...data } as ProductInfo;
}

export async function getRelatedProducts(
  category: string,
  excludeId: string,
): Promise<ProductInfo[]> {
  const snapshot = await db
    .collection("products")
    .where("category", "==", category)
    .where(FieldPath.documentId(), "!=", excludeId)
    .limit(4)
    .get();

  return snapshot.docs.map((doc) => {
    const data = convertTimestamps(doc.data());
    return { id: doc.id, ...data } as ProductInfo;
  });
}
