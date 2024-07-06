// src/Context/ShopContext.tsx
import React, {
  createContext,
  ReactNode,
  useState,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
} from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
// import allProducts from "../data/allProducts";
import { CartItem, ProductInfo } from "../types";

interface ShopContextType {
  allProducts: ProductInfo[];
  cartItems: CartItem[];
  setCartItems: Dispatch<SetStateAction<CartItem[]>>;
  cartCount: number;
  setCartCount: Dispatch<SetStateAction<number>>;
  showMiniCart: boolean;
  setShowMiniCart: Dispatch<SetStateAction<boolean>>;
  activeCategory: string;
  setActiveCategory: Dispatch<SetStateAction<string>>;
}

interface ShopContextProviderProps {
  children: ReactNode;
}

const ShopContext = createContext<ShopContextType | null>(null);

export const ShopContextProvider: React.FC<ShopContextProviderProps> = ({
  children,
}) => {
  const [allProducts, setAllProducts] = useState<ProductInfo[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartCount, setCartCount] = useState(0);
  const [activeCategory, setActiveCategory] = useState("Shop");
  const [showMiniCart, setShowMiniCart] = useState<boolean>(false);
  

  useEffect(() => {
    const fetchProducts = async () => {
      const db = getFirestore();
      const productsCollection = collection(db, "products");
      const productSnapshot = await getDocs(productsCollection);
      const productList = productSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as ProductInfo[];
      setAllProducts(productList);
      console.log("Fetched products: ", productList); // Log fetched products
    };

    fetchProducts();
  }, []);

  const contextVal: ShopContextType = {
    allProducts,
    cartItems,
    setCartItems,
    cartCount,
    setCartCount,
    showMiniCart,
    setShowMiniCart,

    activeCategory,
    setActiveCategory,
  };

  return (
    <ShopContext.Provider value={contextVal}>{children}</ShopContext.Provider>
  );
};

export const useShopContext = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error("useShopContext must be used within a ShopContextProvider");
  }
  return context;
};
