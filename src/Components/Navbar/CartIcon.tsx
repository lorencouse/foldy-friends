import React from "react";
import { useShopContext } from "../../context/ShopContext";
import { CartSvg, CrossSvg } from "../svgPaths";

export function NavBarCartIcon({
  setShowMiniCart,
  showMiniCart,
}: {
  setShowMiniCart: (showMiniCart: boolean) => void;
  showMiniCart: boolean;
}) {
  const { cartCount, activeCategory } = useShopContext();

  return (
    <div className="nav-cart-icon h-full w-auto flex flex-col items-center drop-shadow-md ml-4">
      <label className="swap swap-rotate">
        <input
          type="checkbox"
          className="theme-controller"
          checked={showMiniCart}
          onChange={() => setShowMiniCart(!showMiniCart)}
        />
        <div className="swap-on flex justify-center items-center align-middle">
          {CrossSvg}
        </div>
        <div className="swap-off flex justify-center items-center align-middle">
          {CartSvg}
        </div>
      </label>
      <div className="cart-count absolute -top-0 -right-1 rounded-full flex justify-center items-center bg-red-600 text-white h-4 w-4 text-xs ml-3 -mt-1">
        {cartCount}
      </div>
      {activeCategory === "cart" && <hr className="mt-1" />}
    </div>
  );
}
