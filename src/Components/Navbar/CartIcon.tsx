import React from 'react'
import Link from 'next/link';
import { useShopContext } from '../../context/ShopContext';
import { cartSvg } from '../svgPaths';


export function NavBarCartIcon() {
  const { cartCount, setActiveCategory, activeCategory } = useShopContext();

  return (
    <div className="nav-cart-icon h-full min-w-6 flex flex-col items-center">
      <Link href="/cart" legacyBehavior>
        
          {/* <img 
            src='/Assets/cart_icon.png'
            alt="Cart" 
            onClick={() => setActiveCategory('cart')} 
            className="h-5" 
          /> */}
    <svg viewBox="0 0 24 24" onClick={() => setActiveCategory('cart')}  fill="none" xmlns="http://www.w3.org/2000/svg" className="text-base-content">
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
      <g id="SVGRepo_iconCarrier">
        <path d={cartSvg} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
      </g>
    </svg>
      </Link>
      <div className="cart-count absolute -top-1 -right-2 rounded-full flex justify-center items-center bg-red-600 text-white h-4 w-4 text-xs ml-3 -mt-1">
        {cartCount}
      </div>
      {activeCategory === "cart" && <hr className="mt-1" />}
    </div>
  );
}