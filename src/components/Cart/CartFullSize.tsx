// src/Components/.tsx
import React from "react";
import { CartItem, ProductData } from "../../types";
import { useShopContext } from "../../context/ShopContext";
import Link from "next/link";
import { ButtonInput, ButtonSquareRed } from "../BannerButton";
import { CartQuantityButtons } from "../Cart/CartQuantityButtons";
import { EmptyCart } from "./EmptyCart";
import { CheckSvg } from "../svgPaths";

export const CartFullSize = () => {
  const { allProducts, cartItems } = useShopContext();

  const productMap = allProducts.reduce(
    (map, product) => {
      map[product.id] = product;
      return map;
    },
    {} as { [id: number]: ProductData },
  );

  console.log("Cart Items:", cartItems); // Log cart items
  console.log("Product Map:", productMap); // Log product map

  if (cartItems.length === 0) {
    return <EmptyCart />;
  }

  function CartTotal() {
    let total = 0;

    cartItems.forEach((cartItem) => {
      const product = productMap[cartItem.id];
      if (product) {
        const price = product.sale_price ?? product.sale_price ?? 0;
        total += price * cartItem.quantity;
      }
    });

    return (
      <div className="cart-total mt-4">
        <p>
          <span className="font-semibold">Total: </span>
          {`$${total}`}
        </p>
      </div>
    );
  }

  return (
    <div className="cart-container flex flex-col lg:m-auto sm:mx-3 xs: mx-3 max-w-4xl text-left">
      <h1>Cart</h1>
      <div className="grid grid-cols-[auto_auto_2fr_auto] lg:gap-12 gap-5 w-full text-center"></div>
      {cartItems.map((cartItem) => {
        const product = productMap[cartItem.id];
        return product ? (
          <CartLineItem
            key={cartItem.id}
            product={product}
            cartItem={cartItem}
          />
        ) : null;
      })}
      <div className="flex justify-end">
        <CartTotal />
      </div>
    </div>
  );
};

const CartLineItem = ({
  product,
  cartItem,
}: {
  product: ProductData;
  cartItem: CartItem;
}) => {
  const price = product.sale_price ?? product.full_price ?? 1000;

  console.log("Cart Item:", cartItem); // Log cart item
  console.log("Product:", product); // Log product

  return (
    <div className="grid grid-cols-[auto_auto_2fr_auto] lg:gap-12 gap-0 m-auto py-8 w-full border border-y-1 border-x-0 border-gray-200">
      <div className="cart-item flex items-center justify-center">
        <RemoveItemButton cartItem={cartItem} />
      </div>
      <div className="flex cart-item justify-center items-center">
        <Link href={`/product/${product.id}`}>
          <img
            src={product.images[0]}
            alt={product.name}
            className="max-h-24"
          />
        </Link>
      </div>
      <div className="cart-item flex items-start justify-center">
        <Link href={`/product/${product.id}`}>
          <p className="pb-2 text-base-content">
            {product.name}
            {cartItem.variation ? (
              <span className="font-semibold uppercase">{` - ${cartItem.variation}`}</span>
            ) : (
              ""
            )}
          </p>
        </Link>
      </div>

      <div className="cart-item flex flex-col items-center">
        <p>{`$${price}`}</p>
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
