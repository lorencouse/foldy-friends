import React, { createContext, ReactNode } from 'react'
import allProducts from '../Assets/all_product'

interface ShopContextType {
  allProducts: typeof allProducts;
}

interface ShopContextProviderProps {
  children: ReactNode;
}

export const ShopContext = createContext<ShopContextType | null>(null);

const ShopContextProvider: React.FC<ShopContextProviderProps> = (props) => {
  const contextVal: ShopContextType = { allProducts };

  return (
    <ShopContext.Provider value={contextVal}>
      {props.children}
    </ShopContext.Provider>
  );
}

export default ShopContextProvider;