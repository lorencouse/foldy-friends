import React from "react";
import Link from "next/link";
import { useShopContext } from "../../context/ShopContext";

export function NavLink({
  url,
  label,
}: {
  url: string;
  label: string;

}) {

  const { setActiveCategory, activeCategory } = useShopContext();
  return (
    <div className="flex flex-col items-center text-base-content">
      <li
        className="active:bg-transparent capitalize"
        onClick={() => setActiveCategory(label)}
      >
        <Link href={url}>{label}</Link>
      </li>
      {activeCategory === label && <hr className="bg-primary w-4/5 h-1 rounded-lg " />}
    </div>
  );
}
