"use client";

import React from "react";
import { ButtonSquareRed } from "../BannerButton";
import { CartSvg, CheckSvg } from "../svgPaths";
import { useShopContext } from "../../context/ShopContext";
import { redirect } from "next/navigation";

export const MiniCartButtons = () => {
  const handleNavigation = (url: string) => {
    redirect(url);
    setShowMiniCart(false);
    window.scrollTo(0, 0);
  };

  const { setActiveCategory, setShowMiniCart } = useShopContext();

  return (
    <div className="min-cart-buttons flex flex-row gap-x-4 justify-center items-center ">
      <ButtonSquareRed
        label="Cart"
        icon={CartSvg}
        onClick={() => {
          handleNavigation("/cart");
          setActiveCategory("cart");
        }}
      />
      <ButtonSquareRed
        label="Checkout"
        icon={CheckSvg}
        onClick={() => {
          handleNavigation("/checkout");
          setActiveCategory("");
        }}
      />
    </div>
  );
};
