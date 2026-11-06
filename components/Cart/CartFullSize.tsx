"use client";
// src/Components/.tsx
import React from "react";
import { CartItem } from "../../types";
import { useShopContext } from "../../context/ShopContext";
import { ButtonInput } from "../BannerButton";
import { CartQuantityButtons } from "../Cart/CartQuantityButtons";
import { EmptyCart } from "./EmptyCart";
import { redirect } from "next/navigation";

export const CartFullSize = () => {
  const { cartItems } = useShopContext();

  if (cartItems.length === 0) {
    return <EmptyCart />;
  }

  function CartTotal() {
    let total = 0;
    cartItems.forEach((cartItem) => {
      if (cartItem) {
        // const price = product.sale_price ?? product.sale_price ?? 0;
        total += cartItem.price * cartItem.quantity;
      }
    });

    return (
      <div className="cart-total mt-4">
        <p>
          <span className="font-semibold">Total: </span>
          {`$${total.toFixed(2)}`}
        </p>
      </div>
    );
  }

  return (
    <div className="cart-container flex flex-col lg:m-auto sm:mx-3 xs: mx-3 max-w-4xl text-left">
      <h1>Cart</h1>
      <div className="grid grid-cols-[auto_auto_2fr_auto] lg:gap-12 gap-5 w-full text-center"></div>
      {[...cartItems].reverse().map((cartItem) => {
        return cartItem ? (
          <CartLineItem cartItem={cartItem} key={cartItem.id} />
        ) : null;
      })}
      <div className="flex justify-end">
        <CartTotal />
      </div>
    </div>
  );
};

const CartLineItem = ({ cartItem }: { cartItem: CartItem }) => {
  const { setActiveCategory, setShowMiniCart } = useShopContext();

  const handleMobileMenuClick = () => {
    redirect(`/shop/product/${cartItem.id}`);
    setActiveCategory(cartItem.category);
    setTimeout(() => setShowMiniCart(false), 400);
  };

  return (
    <div
      className="grid grid-cols-[auto_auto_2fr_auto] lg:gap-12 gap-0 m-auto py-8 w-full border border-y-1 border-x-0 border-base-200"
      key={cartItem.key}
    >
      <div className="cart-item flex items-center justify-center">
        <RemoveItemButton cartItem={cartItem} />
      </div>
      <div
        className="flex cart-item justify-center items-center product-image m-3"
        onClick={() => handleMobileMenuClick()}
      >
        <img
          src={cartItem.image}
          alt={cartItem.name}
          className=" max-h-24 gallery-image rounded-lg cursor-pointer "
        />
      </div>
      <div
        className="cart-item flex items-center justify-left"
        onClick={() => handleMobileMenuClick()}
      >
        <p className="p-2 text-base-content cursor-pointer">
          {cartItem.name}
          {cartItem.variation ? (
            <span className="font-semibold uppercase">{` - ${cartItem.variation}`}</span>
          ) : (
            ""
          )}
        </p>
      </div>

      <div className="cart-item flex flex-col items-center">
        <p>{`$${cartItem.price}`}</p>
        <CartQuantityButtons cartItem={cartItem} />
      </div>
    </div>
  );
};

const RemoveItemButton = ({ cartItem }: { cartItem: CartItem }) => {
  const { setCartItems, setCartCount } = useShopContext();

  function removeCartItem() {
    setCartCount((oldCount) => oldCount - cartItem.quantity);
    setCartItems((oldCartItems) =>
      oldCartItems.filter((item) => item !== cartItem),
    );
  }

  return <ButtonInput onClick={removeCartItem} label="X" />;
};
