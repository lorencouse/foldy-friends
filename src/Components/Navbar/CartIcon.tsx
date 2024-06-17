import React from 'react'
import Link from 'next/link';
import { useShopContext } from '../../context/ShopContext';
import { CartSvg } from '../svgPaths';


export function NavBarCartIcon() {
  const { cartCount, setActiveCategory, activeCategory } = useShopContext();

  return (
    <div className="nav-cart-icon h-full min-w-6 flex flex-col items-center" onClick={() => setActiveCategory('cart')}>
      <Link href="/cart" legacyBehavior>
        
      {CartSvg}

      </Link>
      <div className="cart-count absolute -top-1 -right-2 rounded-full flex justify-center items-center bg-red-600 text-white h-4 w-4 text-xs ml-3 -mt-1">
        {cartCount}
      </div>
      {activeCategory === "cart" && <hr className="mt-1" />}
    </div>
  );
}