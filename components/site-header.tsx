import Link from "next/link";
import { CartLink } from "@/components/cart-link";

const links = [
  { href: "/shop/paper", label: "Paper" },
  { href: "/shop/tools", label: "Tools" },
  { href: "/shop/kits", label: "Kits" },
];

export function SiteHeader() {
  return (
    <header className="bg-paper">
      <div className="mx-auto flex max-w-[1440px] flex-wrap items-center gap-x-8 gap-y-2 px-4 py-5 sm:px-8">
        <Link href="/" className="text-lead font-medium tracking-[-0.03em]">
          foldy friends
        </Link>
        <nav aria-label="Shop" className="order-3 flex w-full gap-6 sm:order-none sm:w-auto">
          <Link href="/shop" className="hover:underline">
            Shop all
          </Link>
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="hover:underline">
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-6">
          <Link href="/account" className="hover:underline">
            Account
          </Link>
          <CartLink className="btn btn-accent min-h-11 px-4" />
        </div>
      </div>
    </header>
  );
}
