// src/Components/Navbar/Navbar.tsx
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useShopContext } from "../../context/ShopContext";
import { NavBarCartIcon } from "./CartIcon";
import { NavLink } from "./NavLink";
import { NavLogo } from "./NavLogo";
import MiniCart from "./MiniCart";
import { MiniCartButtons } from "./MiniCartButtons";
import ThemeSwitcher from "../ThemeSwitcher";
import useAuth from "../../hooks/useAuth";
import { ProfileIcon } from "./ProfileIcon";

const Navbar = () => {
  const { setActiveCategory, activeCategory, cartCount } = useShopContext();
  const [showMenu, setShowMenu] = useState<boolean>(true);
  const [showMiniCart, setShowMiniCart] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const { user } = useAuth();

  const handleMouseEnter = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setShowMiniCart(true);
  };

  const handleMouseLeave = () => {
    timerRef.current = setTimeout(() => {
      setShowMiniCart(false);
    }, 1000);
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

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

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleMobileMenuClick = () => {
    if (window.matchMedia("(max-width: 1024px)").matches) {
      setShowMenu(false);
    }
  };

  return (
    <div className="navbar flex flex-col lg:flex-row justify-between p-4 shadow-md sticky top-0 left-0 bg-base-100 text-primary-content z-50">
      <div className="flex justify-between items-center w-full lg:w-auto">
        <NavLogo />

        <div className="flex items-center gap-5 lg:hidden">
          {cartCount > 0 && (
            <div className="cart-icon relative">
              <NavBarCartIcon />
            </div>
          )}

          <div
            className="hamburger h-8 w-8 outline outline-2 rounded-md flex flex-col justify-around items-center p-2 bg-base-100 hover:bg-base-200 outline-base-200 text-base-300"
            onClick={toggleMenu}
          >
            <hr />
            <hr />
            <hr />
          </div>
        </div>
      </div>

      {showMenu && (
        <div
          onClick={handleMobileMenuClick}
          className="menu flex flex-col lg:flex-row lg:grow items-center justify-between mt-4 lg:mt-0 w-full lg:w-auto "
        >
          <ul className="nav-menu flex flex-col lg:flex-row items-center mx-12 gap-4 xl:gap-16">
            {links.map((link) => (
              <NavLink
                key={link.title}
                url={link.url}
                label={link.title}
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
              />
            ))}
          </ul>

          <div className="flex lg:flex-row justify-between lg:justify-normal gap-4 mx-3 flex-row-reverse w-full lg:w-28">
            {!user ? (
              <Link href="/sign-in">
                <button
                  onClick={() => setActiveCategory("login")}
                  className={`border-2 w-28 lg:my-0 my-8 mx-8 h-10 rounded-md cursor-pointer bg-base-100 hover:border-base-content hover:text-base-content ${activeCategory === "login" ? "border-error text-error " : "border-base-200 text-base-300"}`}
                >
                  Sign In
                </button>
              </Link>
            ) : (
              <ProfileIcon />
            )}

            {showMenu && <ThemeSwitcher />}
          </div>
        </div>
      )}

      {cartCount > 0 && (
        <div
          className="nav-cart hidden lg:flex items-center gap-5 ml-auto"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="cart-icon relative mr-6">
            <NavBarCartIcon />
          </div>
          {showMiniCart && (
            <div
              className="absolute my-0 right-0 top-24 px-4 bg-base-100 border border-base-200 shadow-lg max-w-md "
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <div className="w-full overflow-y-auto max-h-96 no-scrollbar">
                <MiniCart
                  showMiniCart={showMiniCart}
                  setShowMiniCart={setShowMiniCart}
                />
              </div>
              <MiniCartButtons setShowMiniCart={setShowMiniCart} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
