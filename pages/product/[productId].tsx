import React from 'react';
import { useRouter } from 'next/router';
import Product from '../../src/Product';

const ProductPage = () => {
  const router = useRouter();
  const { productId } = router.query;

  return <Product productId={productId as string} />;
};

export default ProductPage;
