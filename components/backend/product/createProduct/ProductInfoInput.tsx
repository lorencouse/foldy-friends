"use Client";

import React from "react";
import { InputBox } from "../../../Input/InputBox";
import { Product } from "../../../../types";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export const ProductInfoInput = ({
  productInfo,
  setProductInfo,
}: {
  productInfo: Product;
  setProductInfo: React.Dispatch<React.SetStateAction<Product>>;
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProductInfo((prevInfo: Product) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleDescriptionChange = (value: string) => {
    setProductInfo((prevInfo) => ({
      ...prevInfo,
      description: value,
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

      <div className="flex flex-col ">
        <label className="ml-2 mt-4 font-semibold">Description: </label>
        <ReactQuill
          value={productInfo.description}
          onChange={handleDescriptionChange}
          className="mb-4"
        />
      </div>

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
          value={productInfo.sale_price ?? 0}
          onChange={handleInputChange}
          name="sale_price"
        />
      </div>
    </div>
  );
};
