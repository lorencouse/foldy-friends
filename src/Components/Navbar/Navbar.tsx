// src/Components/Navbar/Navbar.tsx
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useShopContext } from '../../context/ShopContext';
import { NavBarCartIcon } from './CartIcon';
import { NavLink } from './NavLink';
import { NavLogo } from './NavLogo';
import MiniCart from './MiniCart';

const Navbar = () => {
  const { setActiveCategory, activeCategory, cartCount } = useShopContext();
  const [showMenu, setShowMenu] = useState<boolean>(true);
  const [showMiniCart, setShowMiniCart] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setShowMiniCart(true);
  };

  const handleMouseLeave = () => {
    timerRef.current = setTimeout(() => {
      setShowMiniCart(false);
    }, 500); 
  };

  const toggleMenu = () => { setShowMenu(!showMenu); }

  const links = [
    { title: "Home", url: "/" },
    { title: "Shop", url: "/shop" },
    { title: "Men", url: "/category/men" },
    { title: "Women", url: "/category/women" },
    { title: "Kids", url: "/category/kids" },
  ];

  useEffect(() => {
    const handleResize = () => {
      if (window.matchMedia("(min-width: 1024px)").matches) {
        setShowMenu(true);
      } else {
        setShowMenu(false);
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="navbar flex flex-col lg:flex-row justify-between p-4 shadow-md sticky top-0 left-0 bg-white z-50">
      <div className="flex justify-between items-center w-full lg:w-auto">
        <NavLogo />
        <div className="flex items-center gap-5 lg:hidden">
          <div className="cart-icon relative">
            <NavBarCartIcon />
          </div>
          <div className="hamburger h-8 w-8 outline outline-2 rounded-md flex flex-col justify-around items-center p-2 bg-white hover:bg-gray-100 outline-gray-300 text-gray-500" onClick={toggleMenu}>
            <hr />
            <hr />
            <hr />
          </div>
        </div>
      </div>

      {showMenu && (
        <div className="menu flex flex-col lg:flex-row lg:grow items-center justify-between mt-4 lg:mt-0">
          <ul className='nav-menu flex flex-col lg:flex-row items-center mx-12 gap-4 lg:gap-16'>
            {links.map(link => (
              <NavLink 
                key={link.title} 
                url={link.url} 
                label={link.title} 
                activeCategory={activeCategory} 
                setActiveCategory={setActiveCategory} 
              />
            ))}
          </ul>
          <Link href="/login" legacyBehavior>
            <button 
              onClick={() => setActiveCategory('login')} 
              className={`border-2 w-28 lg:my-0 my-8 mx-8 h-10 rounded-md cursor-pointer bg-white hover:bg-gray-100 ${activeCategory === "login" ? "border-red-500 text-red-500 " : "border-gray-300 text-gray-500"}`}>
              Login
            </button>
          </Link>
        </div>
      )}

      {cartCount > 0 && (
        <div className="nav-cart hidden lg:flex items-center gap-5 ml-auto" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <div className="cart-icon relative">
            <NavBarCartIcon />
          </div>
          {showMiniCart && (
            <div className="absolute my-0 right-0 top-24 px-4 bg-white border border-gray-200 shadow-lg" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
              <MiniCart showMiniCart={showMiniCart} setShowMiniCart={setShowMiniCart} handleMouseEnter={handleMouseEnter} handleMouseLeave={handleMouseLeave} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Navbar;