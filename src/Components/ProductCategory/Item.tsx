import React, { useState } from "react";
import { ProductData } from "../../types";
import Link from "next/link";
import { Prices } from "../Product/Prices";
import { useShopContext } from "../../context/ShopContext";
import { StarRatingAverage } from "../Product/Reviews/StarRating";
import { useAddToCart } from "../../hooks/UseAddToCart";
import MiniAddToCartButton from "./miniAddToCartButton";

export const Item = ({ productData, key }: { productData: ProductData, key: number; }) => {
  const { setActiveCategory } = useShopContext();
  const handleAddToCart = useAddToCart();
  const [buttonText, setButtonText] = useState<string>("+");
  const variant =
    productData.variations && productData.variations.length > 0
      ? productData.variations[0]
      : undefined;
  return (
    <div
      className="transition ease-in-out hover:scale-105 hover:shadow-lg pl-2 my-3 w-72 text-left m-auto"
      onClick={() => setActiveCategory(productData.category)} key={key}
    >
      <Link href={`/product/${productData.id}`}>
        <img src={productData.images[0]} alt={productData.name} />
        <p className="capitalize">{productData.name}</p>
      </Link>
      <div className="flex flex-row justify-between items-center ">
        <div className="flex flex-col">
          <StarRatingAverage id={productData.id} />
          <Prices
            oldPrice={productData.full_price}
            newPrice={productData.sale_price}
          />
        </div>
        <button
          className="btn min-w-12 mr-4 bg-red-600 hover:bg-red-400 text-white"
          onClick={() => {
            handleAddToCart(productData.id, variant);
            setButtonText("✓ Added");
            setTimeout(() => setButtonText("+"), 1000);
          }}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};
