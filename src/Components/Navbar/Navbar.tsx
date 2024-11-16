import React, { useState, useEffect, useRef } from "react";
import { useShopContext } from "../../context/ShopContext";
import { CartIconMobile, NavBarCartIcon } from "./CartIcon";
import { NavLink } from "./NavLink";
import { NavLogo } from "./NavLogo";
import { MiniCartButtons } from "./MiniCartButtons";
import ThemeSwitcher from "./ThemeSwitcher";
import useAuth from "../../hooks/useAuth";
import { ProfileIcon } from "./ProfileIcon";
import { CartFullSize } from "../Cart/CartFullSize";
import { SignInButton } from "./SignInButton";
import { HamburderLine } from "./HamburderLine";


const Navbar = () => {
  const { cartCount, setShowMiniCart, showMiniCart } = useShopContext();
  const [showMenu, setShowMenu] = useState<boolean>(true);
  const { user } = useAuth();
  const menuRef = useRef<HTMLDivElement>(null);
  const cartRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    showMenu ? setTimeout(() => setShowMenu(false), 1000) : setShowMenu(true);
    
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(event.target as Node) &&
      window.innerWidth < 1024
    ) {
      setShowMenu(false);
    }
    if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
      setShowMiniCart(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
    <div className="navbar flex flex-col lg:flex-row justify-between p-4 shadow-lg bg-primary text-base-100 z-50">
      <div className="flex justify-between items-center w-full lg:w-auto">
        <NavLogo />

        <div className="flex items-center gap-5 lg:hidden">
          {cartCount > 0 && <CartIconMobile />}

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
          ref={menuRef}
          className="menu flex flex-col lg:flex-row lg:grow items-center justify-between mt-4 lg:mt-0 w-full lg:w-auto "
        >
          <ul
            className="nav-menu flex flex-col lg:flex-row items-center lg:ml-10  xl:gap-16 lg:gap-10 gap-8 lg:w-auto w-full"
            onClick={handleMobileMenuClick}
          >
            {links.map((link, key) => (
              <NavLink key={key} url={link.url} label={link.title} />
            ))}
          </ul>

          <div className="flex items-center lg:flex-row lg:w-auto w-full justify-between lg:justify-normal gap-4 lg:mt-0 mt-6 flex-row-reverse">
            <div onClick={handleMobileMenuClick}>
              {!user ? <SignInButton /> : <ProfileIcon />}
            </div>

            <ThemeSwitcher />
          </div>
        </div>
      )}

      {cartCount > 0 && (
        <div
          ref={cartRef}
          className="nav-cart hidden lg:flex items-center gap-5 ml-auto z-20"
        >
          <div className="cart-icon relative mr-6">
            <NavBarCartIcon />
          </div>
          <div
            className={`absolute my-0 right-0 top-28 border-1 px-4 bg-base-100 shadow-lg max-w-xl rounded-b-2xl transition-all duration-500 ${showMiniCart ? "fade-in" : "fade-out"}`}
          >
            {showMiniCart && (
              <>
                <div className="w-full overflow-y-auto max-h-96 no-scrollbar">
                  <CartFullSize />
                </div>
                <MiniCartButtons />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
