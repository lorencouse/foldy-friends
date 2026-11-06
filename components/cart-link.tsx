"use client";

import Link from "next/link";
import { useCartCount } from "@/lib/cart";

export function CartLink({ className }: { className?: string }) {
  const count = useCartCount();
  return (
    <Link href="/cart" className={className} aria-label={`Cart, ${count} ${count === 1 ? "item" : "items"}`}>
      Cart{count > 0 ? ` (${count})` : ""}
    </Link>
  );
}
