import React, { createContext, ReactNode, useState, Dispatch, SetStateAction } from 'react'
import allProducts from '../Assets/all_product'
import { ProductData } from '../types';

interface ShopContextType {
  allProducts: ProductData[];
  cartItems: number[];
  setCartItems: Dispatch<SetStateAction<number[]>>;
}

interface ShopContextProviderProps {
  children: ReactNode;
}

export const ShopContext = createContext<ShopContextType | null>(null);

const ShopContextProvider: React.FC<ShopContextProviderProps> = (props) => {
  const [cartItems, setCartItems] = useState<number[]>([]);

  const contextVal: ShopContextType = { allProducts, cartItems, setCartItems };

  return (
    <ShopContext.Provider value={contextVal}>
      {props.children}
    </ShopContext.Provider>
  );
}

export default ShopContextProvider;
