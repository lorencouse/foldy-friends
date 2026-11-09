import Link from "next/link";
import { CATEGORY_LINKS } from "@/lib/categories";
import { FREE_SHIPPING_FROM_CENTS, formatPrice, formatPriceShort, SHIPPING_CENTS } from "@/lib/money";

const menu = [
  { href: "/shop", label: "Shop all" },
  ...CATEGORY_LINKS,
  { href: "/guides", label: "Origami guides" },
  { href: "/account", label: "Your account" },
  { href: "/cart", label: "Cart" },
];

export function SiteFooter() {
  return (
    <>
      <div className="pleats-ink" aria-hidden="true" />
      <footer className="bg-ink text-paper">
        <div className="wrap flex flex-wrap justify-between gap-x-12 gap-y-10 pt-14 pb-10">
          <div className="flex max-w-[340px] flex-col gap-3.5">
            <div className="flex items-center gap-2.5">
              <div className="ink-cat size-12 bg-paper" aria-hidden="true" />
              <p className="font-display text-[1.75rem] leading-none font-extrabold">foldy friends</p>
            </div>
            <p className="text-base text-ink-mist">
              Paper, tools and kits for families who like to make things together.
            </p>
          </div>
          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-12 gap-y-1 text-base font-bold">
            {menu.map((m) => (
              <Link key={m.href} href={m.href} className="flex min-h-11 items-center hover:text-sun">
                {m.label}
              </Link>
            ))}
          </nav>
          <div className="flex flex-col gap-5 text-base">
            <div>
              <p className="font-extrabold">Write to us</p>
              <a
                className="text-ink-mist underline underline-offset-4 hover:text-sun"
                href="mailto:hello@foldyfriends.com"
              >
                hello@foldyfriends.com
              </a>
            </div>
            <div>
              <p className="font-extrabold">Shipping</p>
              <p className="text-ink-mist">
                Free over {formatPriceShort(FREE_SHIPPING_FROM_CENTS)}. Otherwise{" "}
                {formatPrice(SHIPPING_CENTS)}, in the US.
              </p>
            </div>
          </div>
        </div>
        <div className="wrap border-t border-ink-line pt-4.5 pb-6 text-[0.875rem] text-ink-mist">
          © Foldy Friends. A portfolio shop: no real orders are taken.
        </div>
      </footer>
    </>
  );
}
