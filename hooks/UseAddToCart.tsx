import { useShopContext } from "../context/ShopContext";
import { CartItem } from "../types";
import { Product } from "../types";

export const useAddToCart = () => {
  const { cartItems, setCartItems, setCartCount } = useShopContext();

  const handleAddToCart = (
    product: Product,
    variation?: string,
    currentVariation?: string,
  ) => {
    const itemKey = `${product.id}-${variation}`;

    const cartItem: CartItem = {
      key: itemKey,
      id: product.id,
      name: product.name,
      category: product.category,
      price: product.sale_price ?? product.full_price ?? 100,
      image: product.images?.[0] ?? "",
      quantity: 1,
      variation: variation ?? "",
    };

    if (!cartItems.some((item) => item.key === itemKey)) {
      setCartItems((oldCartItems: CartItem[]) => [...oldCartItems, cartItem]);
    } else {
      setCartItems((oldCartItems: CartItem[]) =>
        oldCartItems.map((item: CartItem) =>
          item.key === itemKey
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      );
    }

    setCartCount((oldCount: number) => oldCount + 1);
  };

  return handleAddToCart;
};
