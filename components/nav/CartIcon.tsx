import React from "react";
import { useShopContext } from "../../context/ShopContext";
import { CartSvg, CrossSvg } from "../svgPaths";
import Link from "next/link";

export function NavBarCartIcon() {
  const { cartCount, activeCategory, showMiniCart, setShowMiniCart } =
    useShopContext();

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
      {activeCategory === "cart" && (
        <hr className="bg-base-content w-4/5 h-1 rounded-lg border-none drop-shadow-xs" />
      )}
    </div>
  );
}

export const CartIconMobile = () => {
  const { cartCount, activeCategory, setActiveCategory } = useShopContext();
  return (
    <Link href="/cart">
      <div
        className="nav-cart-icon h-full w-auto flex flex-col items-center drop-shadow-md ml-4 relative"
        onClick={() => setActiveCategory("cart")}
      >
        <div className="flex justify-center items-center align-middle relative">
          {CartSvg}
          {cartCount > 0 && (
            <div className="cart-count absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 rounded-full flex justify-center items-center bg-red-600 text-white h-4 w-4 text-xs">
              {cartCount}
            </div>
          )}
        </div>
        {activeCategory === "cart" && (
          <hr className="bg-base-content w-4/5 h-1 rounded-lg border-none drop-shadow-xs mt-1" />
        )}
      </div>
    </Link>
  );
};
