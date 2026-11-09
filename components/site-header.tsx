import Image from "next/image";
import Link from "next/link";
import { CartLink } from "@/components/cart-link";
import { CATEGORY_LINKS } from "@/lib/categories";
import { FREE_SHIPPING_FROM_CENTS, formatPriceShort } from "@/lib/money";

const links = [{ href: "/shop", label: "Shop all" }, ...CATEGORY_LINKS, { href: "/guides", label: "Guides" }];

export function SiteHeader() {
  return (
    <>
      <div className="bg-ink text-[0.875rem] font-bold text-paper">
        <div className="wrap flex flex-wrap justify-center gap-x-6 gap-y-1 py-2.5 text-center">
          <span>Free shipping on orders over {formatPriceShort(FREE_SHIPPING_FROM_CENTS)}</span>
          <span aria-hidden="true" className="hidden text-sun sm:inline">
            ◆
          </span>
          <span>New: the Moon Dreamers papercraft kits</span>
        </div>
      </div>
      <header className="border-b-[1.5px] border-crease bg-paper">
        <div className="wrap flex flex-wrap items-center justify-between gap-x-6 gap-y-1 py-3">
          <Link href="/" className="flex min-h-11 items-center gap-2.5" aria-label="Foldy Friends home">
            <Image
              src="/assets/origami-cat-inverted.png"
              alt=""
              width={50}
              height={50}
              priority
              className="size-11 mix-blend-multiply sm:size-[50px]"
            />
            <span className="font-display text-[1.625rem] leading-none font-extrabold whitespace-nowrap sm:text-[1.875rem]">
              foldy friends
            </span>
          </Link>
          <nav
            aria-label="Shop"
            className="order-3 flex w-full flex-wrap gap-x-5 lg:order-none lg:w-auto lg:gap-x-7"
          >
            {links.map((l) => (
              <Link key={l.href} href={l.href} className="navlink">
                {l.label}
              </Link>
            ))}
            <Link href="/#moon-dreamers" className="navlink text-midnight">
              Moon Dreamers
            </Link>
          </nav>
          <div className="flex items-center gap-1">
            <Link href="/account" className="icon-btn" aria-label="Account">
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
                <circle cx="12" cy="8" r="4" />
                <path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6" />
              </svg>
            </Link>
            <CartLink />
          </div>
        </div>
      </header>
    </>
  );
}
