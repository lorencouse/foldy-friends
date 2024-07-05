import { useShopContext } from '../context/ShopContext';
import { CartItem } from '../types';

export const useAddToCart = () => {
  const { cartItems, setCartItems, setCartCount } = useShopContext();

  const handleAddToCart = (productId: string, currentVariation?: string) => {
    const itemKey = `${productId}-${currentVariation}`;

    const cartItem: CartItem = {
      key: itemKey,
      id: productId,
      quantity: 1,
      variation: currentVariation ?? "",
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