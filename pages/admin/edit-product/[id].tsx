import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import CreateProduct from "../../../src/components/backend/product/createProduct/CreateProduct";

const EditProductPage = () => {
  const [existingProduct, setExistingProduct] = useState(null);
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
            setExistingProduct({
              id: productSnapshot.id,
              ...productSnapshot.data(),
            });
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
    return <div>Loading...</div>;
  }

  return <CreateProduct existingProduct={existingProduct} />;
};

export default EditProductPage;
