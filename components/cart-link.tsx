"use client";

import Link from "next/link";
import { useCartCount } from "@/lib/cart";

export function CartLink() {
  const count = useCartCount();
  return (
    <Link href="/cart" className="icon-btn" aria-label={`Cart, ${count} ${count === 1 ? "item" : "items"}`}>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M5 8h14l-1.2 12H6.2z" />
        <path d="M9 8V6a3 3 0 0 1 6 0v2" />
      </svg>
      {count > 0 && (
        <span className="absolute top-1 right-0.5 h-5 min-w-5 rounded-full bg-tomato px-1 text-center text-xs leading-5 font-extrabold text-white">
          {count > 99 ? "99+" : count}
        </span>
      )}
    </Link>
  );
}
