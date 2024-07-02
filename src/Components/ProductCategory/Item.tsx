import React, { useState } from "react";
import { ProductData } from "../../types";
import Link from "next/link";
import { Prices } from "../Product/Prices";
import { useShopContext } from "../../context/ShopContext";
import { StarRatingAverage } from "../Product/Reviews/StarRating";
import { useAddToCart } from "../../hooks/UseAddToCart";
import MiniAddToCartButton from "./miniAddToCartButton";
import { CartSvg } from "../svgPaths";

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
      className="transition duration-200 ease-in-out hover:scale-105 shadow-lg my-3 w-72 text-left m-auto rounded-2xl bg-global-noise bg-repeat"
      onClick={() => setActiveCategory(productData.category)}
      key={key}
    >
      <Link href={`/product/${productData.id}`}>
        <img src={productData.images[0]} alt={productData.name} />
        <p className="capitalize m-4 text-lg font-semibold ">
          {productData.name}
        </p>
      </Link>
      <div className="flex flex-row justify-between items-center pl-6 my-2">
        <div className="flex flex-col">
          <StarRatingAverage id={productData.id} />
          <Prices
            oldPrice={productData.full_price}
            newPrice={productData.sale_price}
          />
        </div>
        <button
          className="min-w-12 mr-4 h-12 text-center p-3 bg-secondary shadow-md cursor-pointer  hover:-translate-y-1 duration-200 text-white rounded-2xl"
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
