import React from "react";
import { useRouter } from "next/router";
import { ButtonSquareRed } from "../BannerButton";
import { CartSvg, CheckSvg } from "../svgPaths";
import { useShopContext } from "../../context/ShopContext";

export const MiniCartButtons = ({
  setShowMiniCart,
}: {
  setShowMiniCart: (showMiniCart: boolean) => void;
}) => {
  const router = useRouter();

  const handleNavigation = (url: string) => {
    router.push(url);
    setShowMiniCart(false);
    window.scrollTo(0, 0);
  };

  const { activeCategory, setActiveCategory } = useShopContext();

  return (
    <div className="min-cart-buttons flex flex-row gap-x-4 justify-center items-center ">
      {" "}
      {/* Ensure buttons have margin-top */}
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
