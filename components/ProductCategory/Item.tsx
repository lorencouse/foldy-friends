"use client";

import React, { useState } from "react";
import { Product } from "@/types";
import { redirect } from "next/navigation";

import Link from "next/link";
import { Prices } from "../Product/Prices";
import { useShopContext } from "@/context/ShopContext";
import { StarRatingAverage } from "../Product/Reviews/StarRating";
import { useAddToCart } from "@/hooks/UseAddToCart";
import Image from "next/image";

export const Item = ({
  productData,
  itemIndex,
}: {
  productData: Product;
  itemIndex: number;
}) => {
  const { setActiveCategory, setShowMiniCart } = useShopContext();
  const handleAddToCart = useAddToCart();
  const [buttonText, setButtonText] = useState<string>("+ Add to Cart");
  const variant =
    productData.variations && productData.variations.length > 0
      ? productData.variations[0]
      : undefined;
  const [loaded, setLoaded] = useState(false);
  const [showCartLink, setShowCartLink] = useState(false);

  const handleImageLoad = () => {
    setLoaded(true);
  };

  const handleProductClick = async () => {
    setActiveCategory(productData.category);
    redirect(`/shop/product/${productData.id}`);
  };

  const handleAddToCartClick = () => {
    handleAddToCart(productData, variant);
    setButtonText("✓ Added");
    setShowCartLink(true);
    setShowMiniCart(true);
    setTimeout(() => {
      setButtonText("+ Add to Cart");
      setShowCartLink(false);
    }, 2500);
  };

  return (
    <div className="transition duration-200 ease-in-out hover:scale-105 shadow-lg my-3 md:mx-1 mx-0 w-auto text-left rounded-2xl">
      <div onClick={handleProductClick} className="cursor-pointer">
        <div className="relative w-full" style={{ aspectRatio: "1" }}>
          <div className="image-container">
            <Image
              src={productData.images[0]}
              alt={productData.name}
              loading="lazy"
              className={`absolute inset-0 w-full h-full object-cover rounded-t-2xl ${loaded ? "loaded" : "loading"}`}
              onLoad={handleImageLoad}
              height={500}
              width={500}
            />
          </div>
        </div>
        <p className="capitalize mx-4 text-lg font-semibold truncate">
          {productData.name}
        </p>
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
          onClick={handleAddToCartClick}
        >
          <span>{buttonText}</span>
        </button>
        {showCartLink && (
          <Link href="/cart">
            <p className="text-secondary text-xl mx-4 mb-6 hover:scale-105 duration-200 text-center">
              See in Cart
            </p>
          </Link>
        )}
      </div>
    </div>
  );
};
