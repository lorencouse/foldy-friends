import { ButtonInput } from "../BannerButton";
import { useShopContext } from "../../context/ShopContext";
import { CartItem } from "../../types";

export const CartQuantityButtons = ({ cartItem }: { cartItem: CartItem }) => {
  const { setCartItems, setCartCount } = useShopContext();

  function removeCartItem() {
    if (cartItem.quantity > 1) {
      setCartCount((oldCount) => oldCount - cartItem.quantity);
    }
    setCartItems((oldCartItems) =>
      oldCartItems.filter((item) => item !== cartItem),
    );
  }

  function incrementQuantity() {
    setCartItems((oldCartItems) =>
      oldCartItems.map((item) =>
        item.id === cartItem.id && item.variation === cartItem.variation
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      ),
    );

    setCartCount((oldCount) => oldCount + 1);
  }

  function decrementQuantity() {
    if (cartItem.quantity > 1) {
      setCartItems((oldCartItems) =>
        oldCartItems.map((item) =>
          item.id === cartItem.id && item.variation === cartItem.variation
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        ),
      );
    } else {
      removeCartItem();
    }
    setCartCount((oldCount) => oldCount - 1);
  }

  return (
    <div className="cart-item flex flex-row items-center ">
      <ButtonInput onClick={decrementQuantity} label="-" />

      <p className="w-6 h-6 text-center text-base-content m-3 outline outline-1 rounded-lg font-semibold ">
        {cartItem.quantity}
      </p>

      <ButtonInput onClick={incrementQuantity} label="+" />
    </div>
  );
};
