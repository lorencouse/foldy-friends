import React from "react";
import { CartFullSize } from "../components/Cart/CartFullSize";
import { useShopContext } from "../context/ShopContext";
import { Collections } from "../components/ProductCategory/Collections";
import { EmptyCart } from "../components/Cart/EmptyCart";

const Cart = () => {
  const { cartCount, allProducts } = useShopContext();

  return (
    <div className="cart-page-container max-w-7xl m-auto">
      {cartCount > 0 ? (
        <>
          <CartFullSize />
        </>
      ) : (
        <EmptyCart />
      )}
      <Collections
        productData={allProducts}
        header="You Might Be Interested In..."
      />
    </div>
  );
};

export default Cart;
