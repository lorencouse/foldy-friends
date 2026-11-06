"use client";

import React from "react";
import { CartFullSize } from "@/components/Cart/CartFullSize";
import { useShopContext } from "@/context/ShopContext";
import { EmptyCart } from "@/components/Cart/EmptyCart";
import Link from "next/link";
import { ButtonSquareRed } from "@/components/BannerButton";
import { CheckSvg } from "@/components/svgPaths";

const Cart = () => {
  const { cartCount } = useShopContext();

  return (
    <div className="cart-page-container max-w-7xl m-auto">
      {cartCount > 0 ? (
        <>
          <CartFullSize />
          <div className="flex justify-end ">
            <Link href="/checkout">
              <ButtonSquareRed
                label="Checkout"
                icon={CheckSvg}
                onClick={() => window.scrollTo(0, 0)}
              />
            </Link>
          </div>
        </>
      ) : (
        <EmptyCart />
      )}
    </div>
  );
};

export default Cart;
