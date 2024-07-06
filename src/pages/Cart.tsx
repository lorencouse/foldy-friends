import React from "react";
import { CartFullSize } from "../components/Cart/CartFullSize";
import { useShopContext } from "../context/ShopContext";
import { Collections } from "../components/ProductCategory/Collections";
import { EmptyCart } from "../components/Cart/EmptyCart";
import Link from "next/link";
import { ButtonSquareRed } from "../components/BannerButton";
import { CheckSvg } from "../../src/components/svgPaths";

const Cart = () => {
  const { cartCount, allProducts, cartItems } = useShopContext();

  const cartItemIds = cartItems.map((item) => item.id);

  const filteredProducts = allProducts.filter(
    (product) => !cartItemIds.includes(product.id),
  );

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
      <Collections
        productData={filteredProducts.slice(0, 8)}
        header="You Might Be Interested In..."
      />
    </div>
  );
};

export default Cart;
