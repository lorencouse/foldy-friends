import Image from "next/image";
import Link from "next/link";
import credits from "@/data/image-credits.json";

const menu = [
  { href: "/shop/paper", label: "Paper" },
  { href: "/shop/tools", label: "Tools" },
  { href: "/shop/kits", label: "Kits" },
  { href: "/account", label: "Your account" },
  { href: "/cart", label: "Cart" },
];

const prints = credits.filter((c) => c.media === "image");
const clip = credits.find((c) => c.media === "video");

export function SiteFooter() {
  return (
    <footer className="grid bg-night text-bone md:grid-cols-2">
      <div className="relative min-h-[50svh] overflow-hidden md:min-h-[88svh]">
        <Image
          src="/images/senbazuru-spread.jpg"
          alt="Two pages of a 1797 book on folding paper cranes"
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover object-[70%_50%]"
        />
      </div>
      <div className="flex flex-col px-4 pt-16 pb-8 sm:px-8 md:px-[8%] md:pt-20">
        <p className="text-lead font-medium tracking-[-0.03em]">foldy friends</p>
        <nav aria-label="Footer" className="group mt-10">
          <ul className="space-y-4 md:space-y-6">
            {menu.map((m) => (
              <li key={m.href}>
                <Link
                  href={m.href}
                  className="inline-block text-[clamp(2rem,4vw,3.5rem)] leading-none font-medium tracking-[-0.03em] transition-[translate,color] duration-200 group-hover:text-bone-muted hover:!text-bone hover:translate-x-3"
                >
                  {m.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-16 grid gap-8 text-small sm:grid-cols-2">
          <div>
            <p className="font-medium">Write to us</p>
            <a className="link" href="mailto:hello@foldyfriends.com">
              hello@foldyfriends.com
            </a>
          </div>
          <div>
            <p className="font-medium">Shipping</p>
            <p className="text-bone-muted">Free over $35. Otherwise $4.95, in the US.</p>
          </div>
        </div>
        <div className="mt-auto pt-16 text-small text-bone-muted">
          <p>
            Folding diagrams from{" "}
            {prints.map((c, i) => (
              <span key={c.ref}>
                {i > 0 && " and "}
                <a className="link" href={c.page}>
                  {c.title.split(" (")[0]}
                </a>
              </span>
            ))}{" "}
            by Shimokōbe Shūsui, 1797, public domain.
            {clip && (
              <>
                {" "}
                <a className="link" href={clip.page}>
                  Rotating origami icosahedron
                </a>{" "}
                by Dolev, {clip.license}, via Wikimedia Commons.
              </>
            )}
          </p>
          <p className="mt-2">© Foldy Friends. A portfolio shop: no real orders are taken.</p>
        </div>
      </div>
    </footer>
  );
}
