import React from 'react'

const EditProduct = ({ productId }: { productId: string }) => {
  return (<div>
    <h1>Edit Product</h1>
    <p>{productId}</p>
  </div>);
};

export default EditProduct;
