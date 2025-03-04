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
    <div className="flex flex-col items-center text-bold text-lg drop-shadow-lg">
      <p
        className="active:bg-transparent text-white capitalize transition hover:translate-y-[-2px] duration-100 "
        onClick={() => setActiveCategory(label)}
      >
        <Link href={url}>{label}</Link>
      </p>
      {activeCategory === label && (
        <hr className="bg-base-content w-4/5 h-1 rounded-lg border-none drop-shadow-xs" />
      )}
    </div>
  );
}
