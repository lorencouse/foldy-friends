import React, { useState } from "react";
import { ButtonSquareRed } from "../BannerButton";
import { useAddToCart } from "../../hooks/UseAddToCart";
import { AddToCartSvg, CheckSvg } from "../svgPaths";
import { useShopContext } from "../../context/ShopContext";
import Link from "next/link";
import { Product } from "../../types";

export const AddToCartButton = ({
  product,
  variation,
}: {
  product: Product;
  variation: string;
}) => {
  const handleAddToCart = useAddToCart();
  const { setShowMiniCart } = useShopContext();
  const [buttonText, setButtonText] = useState<string>("Add to Cart");
  const [svg, setSvg] = useState<React.ReactNode>(AddToCartSvg);
  const [showCartLink, setShowCartLink] = useState(false);

  const handleClick = () => {
    handleAddToCart(product, variation);

    setButtonText("Added");
    setShowCartLink(true);
    setSvg(CheckSvg);
    const isMobile = window.innerWidth >= 768;
    console.log(`Is Mobile: ${isMobile}, Width: ${window.innerWidth}`);
    setTimeout(() => {
      setShowMiniCart(true);
    }, 200);
    setTimeout(() => {
      setButtonText("Add to Cart");
      setSvg(AddToCartSvg);
    }, 1000);
    if (isMobile) {
      window.scrollTo(0, 0);
    }
  };

  return (
    <div className="flex flex-row flex-wrap  justify-between items-center max-w-96 ">
      <ButtonSquareRed label={buttonText} icon={svg} onClick={handleClick} />
      {showCartLink && (
        <Link href="/cart">
          <p className="text-secondary text-xl m-4 hover:scale-105 duration-200 ">
            See in Cart
          </p>
        </Link>
      )}
    </div>
  );
};
