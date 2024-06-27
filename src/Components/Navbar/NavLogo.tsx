import React from "react";
import Link from "next/link";
import { useShopContext } from "../../context/ShopContext";

export function NavLogo() {
  const { setActiveCategory } = useShopContext();

  return (
    <div
      className="nav-logo flex flex-row items-center drop-shadow-md"
      onClick={() => setActiveCategory("home")}
    >
      <Link href="/" legacyBehavior>
        <img
          src="/Assets/foldy-friends-logo-192x192.png"
          alt="Foldy Friends Logo"
          className="h-20 w-20"
        />
      </Link>
      <p className="text-3xl items-center px-4 select-none text-white ">Foldy Friends</p>
    </div>
  );
}
