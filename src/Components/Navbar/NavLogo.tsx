import React from "react";
import Link from "next/link";
import { useShopContext } from "../../context/ShopContext";

export function NavLogo() {
  const { setActiveCategory } = useShopContext();

  return (
    <Link href="/" legacyBehavior>
      <div
        className="nav-logo flex flex-row items-center drop-shadow-md "
        onClick={() => setActiveCategory("home")}
      >
        <img
          src="/assets/origami-cat-inverted.png"
          alt="Foldy Friends Logo"
          className="h-20 w-20"
        />

        <p className="text-3xl items-center px-4 select-none text-white ">
          Foldy Friends
        </p>
      </div>
    </Link>
  );
}
