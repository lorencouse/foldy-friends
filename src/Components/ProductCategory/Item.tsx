import React, { useState } from "react";
import { ProductInfo } from "../../types";
import Link from "next/link";
import { Prices } from "../Product/Prices";
import { useShopContext } from "../../context/ShopContext";
import { StarRatingAverage } from "../Product/Reviews/StarRating";
import { useAddToCart } from "../../hooks/UseAddToCart";

export const Item = ({
  productData,
  itemIndex,
}: {
  productData: ProductInfo;
  itemIndex: number;
}) => {
  const { setActiveCategory } = useShopContext();
  const handleAddToCart = useAddToCart();
  const [buttonText, setButtonText] = useState<string>("+ Add to Cart");
  const variant =
    productData.variations && productData.variations.length > 0
      ? productData.variations[0]
      : undefined;
  return (
    <div className="transition duration-200 ease-in-out hover:scale-105 shadow-lg my-3 md:mx-1 mx-0 w-auto text-left rounded-2xl">
      <div
        onClick={() => {
          setActiveCategory(productData.category);
          window.scrollTo(0, 0);
        }}
        
      >
        <Link href={`/product/${productData.id}`}>
          <div className="relative w-full" style={{ aspectRatio: "1" }}>
            <img
              src={productData.images[0]}
              alt={productData.name}
              className="absolute inset-0 w-full h-full object-cover rounded-t-2xl"
            />
          </div>
          <p className="capitalize mx-4 text-lg font-semibold truncate">
            {productData.name}
          </p>
        </Link>
      </div>
      <div className="flex flex-col mx-4">
        <div className="flex flex-row flex-wrap md:justify-between justify-center">
          <Prices
            oldPrice={productData.full_price}
            newPrice={productData.sale_price}
          />
          <StarRatingAverage id={productData.id} />
        </div>

        <button
          className="min-w-12 mb-6 mt-2 h-12 text-center p-3 bg-secondary shadow-md cursor-pointer hover:-translate-y-1 duration-200 text-white rounded-2xl"
          onClick={() => {
            handleAddToCart(productData.id, variant);
            setButtonText("✓ Added");
            setTimeout(() => setButtonText("+ Add to Cart"), 1000);
          }}
        >
          <span>{buttonText}</span>
        </button>
      </div>
    </div>
  );
};
