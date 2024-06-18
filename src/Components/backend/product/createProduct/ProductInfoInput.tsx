import React from "react";
import { InputBox } from "../../../Input/InputBox";
import { ProductInfo } from "../../../../types";

export const ProductInfoInput = ({
  productInfo,
  setProductInfo,
}: {
  productInfo: ProductInfo;
  setProductInfo: (ProductInfo) => void;
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProductInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };
  return (
    <div className="flex flex-col">
      <InputBox
        type="text"
        placeholder="Name"
        value={productInfo.name}
        onChange={handleInputChange}
        name="name"
      />

      <textarea
        type="text"
        placeholder="Description"
        value={productInfo.description}
        onChange={handleInputChange}
        name="description"
        className="max-w-96 h-96 border border-gray-300 rounded-md m-2"
      />
      <InputBox
        type="text"
        placeholder="SKU"
        value={productInfo.sku}
        onChange={handleInputChange}
        name="sku"
      />
      <div className="flex flex-col">
        <label className="ml-2 mt-4 font-semibold">Full Price: </label>
        <InputBox
          type="number"
          placeholder="Full Price"
          value={productInfo.full_price}
          onChange={handleInputChange}
          name="full_price"
        />
      </div>
      <div className="flex flex-col">
        <label className="ml-2 mt-4 font-semibold">Sale Price: </label>
        <InputBox
          type="number"
          placeholder="Sale Price"
          value={productInfo.sale_price}
          onChange={handleInputChange}
          name="sale_price"
        />
      </div>
    </div>
  );
};
