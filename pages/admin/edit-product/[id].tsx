import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import CreateProduct from "../../../src/components/backend/product/createProduct/CreateProduct";
import { LoadingScreen } from "../../../src/components/Product/LoadingScreen";
import AdminRoute from "../../../src/components/AdminRoute";
import { ProductData } from "../../../src/types";



const EditProductPage = () => {
  const [existingProduct, setExistingProduct] = useState<ProductData | null >(null);
  const router = useRouter();
  const { id } = router.query;
  const db = getFirestore();

useEffect(() => {
  const fetchProduct = async () => {
    if (id) {
      try {
        const productDoc = doc(db, "products", id as string);
        const productSnapshot = await getDoc(productDoc);
        if (productSnapshot.exists()) {
          const productData = productSnapshot.data();
          setExistingProduct({
            id: productSnapshot.id,
            ...productData,
          } as ProductData);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    }
  };

  fetchProduct();
}, [id, db]);

  if (!existingProduct) {
    return <LoadingScreen />;
  }

  return <CreateProduct existingProduct={existingProduct} />;
};

export default AdminRoute(EditProductPage);
