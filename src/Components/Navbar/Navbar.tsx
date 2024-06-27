// src/Components/Navbar/Navbar.tsx
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useShopContext } from "../../context/ShopContext";
import { NavBarCartIcon } from "./CartIcon";
import { NavLink } from "./NavLink";
import { NavLogo } from "./NavLogo";
import { MiniCartButtons } from "./MiniCartButtons";
import ThemeSwitcher from "../ThemeSwitcher";
import useAuth from "../../hooks/useAuth";
import { ProfileIcon } from "./ProfileIcon";
import { CartFullSize } from "../Cart/CartFullSize";
import { SignInButton } from "./SignInButton";
import { HamburderLine } from "./HamburderLine";

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
    { title: "home", url: "/" },
    { title: "shop", url: "/shop" },
    { title: "paper", url: "/category/paper" },
    { title: "tools", url: "/category/tools" },
    { title: "kits", url: "/category/kits" },
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
    <div className="flex flex-col lg:flex-row justify-between p-4 shadow-lg bg-primary text-base-100 z-50 ">
      <div className="flex justify-between items-center w-full lg:w-auto">
        <NavLogo />

        <div className="flex items-center gap-5 lg:hidden">
          {cartCount > 0 && (
            <div className="cart-icon relative">
              <NavBarCartIcon />
            </div>
          )}

          <div
            className="hamburger h-8 w-8 outline outline-2 outline-white rounded-md flex flex-col justify-around items-center p-2  hover:bg-base-200 "
            onClick={toggleMenu}
          >
            <HamburderLine />
            <HamburderLine />
            <HamburderLine />

         
          </div>
        </div>
      </div>

      {showMenu && (
        <div
          onClick={handleMobileMenuClick}
          className="menu flex flex-col lg:flex-row lg:grow items-center justify-between mt-4 lg:mt-0 w-full lg:w-auto "
        >
          <ul className="nav-menu flex flex-col lg:flex-row items-center ml-10 gap-4 xl:gap-16">
            {links.map((link, key) => (
              <NavLink key={key} url={link.url} label={link.title} />
            ))}
          </ul>

          <div className="flex lg:flex-row justify-between lg:justify-normal gap-4 mx-3 flex-row-reverse max-w-52">
            {!user ? <SignInButton /> : <ProfileIcon />}

            <ThemeSwitcher />
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
              className="absolute my-0 right-0 top-24 px-4 bg-base-100/30 backdrop-blur-2xl shadow-lg max-w-xl rounded-b-2xl "
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <div className="w-full overflow-y-auto max-h-96 no-scrollbar">
                <CartFullSize />
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
