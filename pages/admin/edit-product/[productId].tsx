import React from 'react'
import EditProduct from "../../../src/components/backend/product/EditProduct";
import { useRouter } from 'next/router';


const EditProductPage = () => {
    const router = useRouter();
    const { productId } = router.query;
  return (
    <EditProduct productId={productId}/>
  )
}

export default EditProductPage;
