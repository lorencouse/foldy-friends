import React, { createContext, ReactNode, useState, Dispatch, SetStateAction, useContext } from 'react';
import allProducts from '../Assets/all_product';
import { CartItem, ProductData } from '../types';

// Define the context type
interface ShopContextType {
  allProducts: ProductData[];
  cartItems: CartItem[];
  setCartItems: Dispatch<SetStateAction<CartItem[]>>;
}

interface ShopContextProviderProps {
  children: ReactNode;
}

export const ShopContext = createContext<ShopContextType | null>(null); 

export const ShopContextProvider: React.FC<ShopContextProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const contextVal: ShopContextType = { allProducts, cartItems, setCartItems };

  return (
    <ShopContext.Provider value={contextVal}>
      {children}
    </ShopContext.Provider>
  );
};

// Custom hook for typed context access
export const useShopContext = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShopContext must be used within a ShopContextProvider');
  }
  return context; // Return the full context
};
