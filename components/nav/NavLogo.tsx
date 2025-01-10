import React from "react";
import Link from "next/link";
import { useShopContext } from "../../context/ShopContext";
import Image from "next/image";

export function NavLogo() {
  const { setActiveCategory } = useShopContext();

  return (
    <Link href="/" legacyBehavior>
      <div
        className="nav-logo flex flex-row items-center drop-shadow-md cursor-pointer"
        onClick={() => setActiveCategory("home")}
      >
        <Image
          src="/assets/origami-cat-inverted.png"
          alt="Foldy Friends Logo"
          className="md:h-16 md:w-16 h-14 w-14"
          width={64}
          height={64}
        />

        <p className="md:text-3xl text-md items-center px-4 select-none text-white ">
          Foldy Friends
        </p>
      </div>
    </Link>
  );
}
