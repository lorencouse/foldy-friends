import React from 'react'
import Link from 'next/link';
import { useShopContext } from '../../context/ShopContext';

export const SignInButton = () => {
    const { setActiveCategory, activeCategory } = useShopContext();
  return (
    <Link href="/sign-in">
      <button
        onClick={() => setActiveCategory("login")}
        className={`border-2 w-28 lg:my-0 my-8 mx-8 h-10 rounded-md shadow-md cursor-pointer font-medium hover:translate-y-[-2px] text-white duration-100 ${activeCategory === "login" ? "border-error " : "border-white "}`}
      >
        Sign In
      </button>
    </Link>
  );
}
