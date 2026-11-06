import Image from "next/image";
import Link from "next/link";
import { connection } from "next/server";
import { Suspense } from "react";
import { AddToCart } from "@/components/add-to-cart";
import { CartLink } from "@/components/cart-link";
import { FoldingDog } from "@/components/folding-dog";
import { ProductArt } from "@/components/product-art";
import { SiteFooter } from "@/components/site-footer";
import { Stage } from "@/components/stage";
import { CATEGORY_INFO, getProducts } from "@/lib/catalog";
import type { Category } from "@/lib/db/schema";
import { effectivePrice, formatPrice } from "@/lib/money";

const nav = [
  { href: "/shop/paper", label: "Paper" },
  { href: "/shop/tools", label: "Tools" },
  { href: "/shop/kits", label: "Kits" },
  { href: "/account", label: "Account" },
];

export default function Home() {
  return (
    <>
      <div className="lg:grid lg:grid-cols-[47fr_53fr]">
        {/* The fixed half */}
        <div className="hidden lg:sticky lg:top-0 lg:block lg:h-svh lg:p-8 lg:pr-0">
          <div className="h-full">
            <Stage
              initial="dog"
              layers={{
                dog: <FoldingDog />,
                kit: (
                  <div className="flex h-full items-center justify-center bg-night p-10">
                    <ProductArt
                      art="kit-fox"
                      title="Drawing of the sleeping fox papercraft kit"
                      className="w-full max-w-[560px]"
                    />
                  </div>
                ),
                list: (
                  <div className="flex h-full items-center justify-center bg-night">
                    <video
                      className="w-full max-w-[640px]"
                      src="/images/origami-icosahedron.webm"
                      poster="/images/origami-icosahedron.jpg"
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="none"
                      aria-label="A folded paper icosahedron turning slowly"
                    />
                  </div>
                ),
                making: (
                  <Image
                    src="/images/kids-crafting-origami.webp"
                    alt="Two children making paper crafts at a table"
                    fill
                    sizes="47vw"
                    className="object-cover"
                  />
                ),
                letter: (
                  <Image
                    src="/images/senbazuru-plate.jpg"
                    alt="A 1797 woodblock print of a folded crane"
                    fill
                    sizes="47vw"
                    className="object-cover object-top"
                  />
                ),
              }}
            />
          </div>
        </div>

        {/* The reading column */}
        <main className="bg-night text-bone">
          <section
            data-stage="dog"
            className="flex min-h-svh flex-col px-4 pt-6 pb-12 sm:px-8 lg:pl-[8%] lg:pr-8"
          >
            <nav aria-label="Main" className="flex flex-wrap items-center justify-end gap-x-6 gap-y-2">
              {nav.map((n) => (
                <Link key={n.href} href={n.href} className="hover:underline">
                  {n.label}
                </Link>
              ))}
              <CartLink className="btn btn-accent min-h-11 px-4" />
            </nav>
            <div className="my-auto max-w-[26ch] pt-16">
              <p className="text-lead" data-rise>
                Origami paper, glue and 3D paper animal kits, for families who fold together.
              </p>
              <Link
                href="/shop"
                className="btn btn-accent mt-8"
                data-rise
                style={{ "--i": 1 } as React.CSSProperties}
              >
                Shop the paper and kits
              </Link>
            </div>
            <h1 className="wordmark-scroll mt-16 text-giant leading-[0.85] font-normal tracking-[-0.05em]">
              foldy friends
            </h1>
          </section>
          <div className="h-[80svh] lg:hidden">
            <FoldingDog compact />
          </div>

          <Suspense fallback={<div className="min-h-[88svh]" />}>
            <MoonKits />
          </Suspense>

          <section data-stage="list" className="bg-kami-blue px-4 py-24 sm:px-8 lg:pl-[8%] lg:pr-8 lg:py-32">
            <Suspense fallback={<div className="min-h-[60svh]" />}>
              <PriceList />
            </Suspense>
          </section>

          <section data-stage="making" className="px-4 py-24 sm:px-8 lg:pl-[8%] lg:pr-8 lg:py-40">
            <div className="max-w-[30ch]" data-rise>
              <h2 className="text-head">From pack to friend</h2>
              <p className="mt-6">
                Every order is packed by hand and goes out the next working day. Most families are folding by
                the weekend.
              </p>
            </div>
            <div className="edge-zigzag mt-12 max-w-[30rem] bg-paper p-6 text-ink sm:p-8" data-rise>
              <Itinerary />
            </div>
          </section>

          <section
            data-stage="letter"
            className="bg-kami-yellow px-4 py-24 text-ink sm:px-8 lg:pl-[8%] lg:pr-8 lg:py-40"
          >
            <div className="max-w-[34rem]" data-rise>
              <svg
                viewBox="0 0 400 400"
                className="size-11 bg-night"
                role="img"
                aria-label="Foldy, a paper dog"
              >
                <polygon points="110,140 290,140 240,250 160,250" fill="#f2c12e" />
                <polygon points="110,140 62,262 140,205" fill="#d9a514" />
                <polygon points="290,140 338,262 260,205" fill="#d9a514" />
                <polygon points="186,222 214,222 200,240" fill="#1d1c1a" />
                <circle cx="165" cy="186" r="9" fill="#1d1c1a" />
                <circle cx="235" cy="186" r="9" fill="#1d1c1a" />
              </svg>
              <h2 className="sr-only">A letter from Foldy</h2>
              <div className="mt-7 space-y-5 leading-[1.55]">
                <p>Hello, I’m Foldy. I started life as a square of yellow paper on a kitchen table.</p>
                <p>
                  Six folds later I had ears, a nose and a name. That is the whole trick of origami: a flat
                  sheet, a few careful creases, and suddenly there is somebody there.
                </p>
                <p>
                  This shop stocks the things that made me: paper that holds a crease, glue that stays where
                  you put it, and kits for when you want a bigger friend for the shelf.
                </p>
                <p>
                  Pick a colour, sit down with someone you like, and fold. If it comes out wonky,{" "}
                  <span className="bg-paper px-1">wonky is a breed too</span>.
                </p>
              </div>
              <p className="mt-8 text-lead italic">Foldy</p>
              <p className="text-small text-ink/75">Shop dog, folded in yellow</p>
            </div>
          </section>
        </main>
      </div>

      {/* Breaks the split: the last picture, full width */}
      <section className="relative bg-night text-bone">
        <div className="relative h-[70svh] lg:h-[90svh]">
          <Image
            src="/images/boy-giving-mom-origami-dog.webp"
            alt="A boy giving his mother a folded paper dog"
            fill
            sizes="100vw"
            className="object-cover object-[30%_40%] lg:brightness-[0.6]"
          />
        </div>
        <div className="px-4 py-12 sm:px-8 lg:absolute lg:inset-y-0 lg:right-0 lg:flex lg:w-[42%] lg:flex-col lg:justify-end lg:px-0 lg:pr-[6%] lg:pb-[8svh]">
          <h2 className="text-head" data-rise>
            Fold one for someone
          </h2>
          <p className="mt-4 max-w-[34ch]" data-rise style={{ "--i": 1 } as React.CSSProperties}>
            A paper dog takes six folds and about two minutes. It tends to be kept for years.
          </p>
          <Link
            href="/shop/paper"
            className="btn btn-accent mt-8 self-start"
            data-rise
            style={{ "--i": 2 } as React.CSSProperties}
          >
            Choose some paper
          </Link>
        </div>
      </section>
      <SiteFooter />
    </>
  );
}

async function MoonKits() {
  await connection();
  const kits = await getProducts("kits");
  const fox = kits.find((k) => k.art === "kit-fox") ?? kits[0];
  if (!fox) return null;
  const price = effectivePrice(fox);
  return (
    <section
      data-stage="kit"
      className="flex min-h-[88svh] flex-col justify-between gap-12 bg-night-2 px-4 py-24 sm:px-8 lg:pl-[8%] lg:pr-8"
    >
      <nav aria-label="Moon kits" className="flex flex-wrap gap-x-6 gap-y-2 text-lead">
        {kits.map((k) => (
          <Link
            key={k.id}
            href={`/products/${k.slug}`}
            className={k.id === fox.id ? "text-bone" : "text-bone-muted hover:text-bone"}
          >
            {k.name.split(" ")[0]}
          </Link>
        ))}
      </nav>
      <ProductArt
        art={fox.art}
        className="w-full lg:hidden"
        title="Drawing of the sleeping fox papercraft kit"
      />
      <div data-rise>
        <h2 className="text-head">{fox.name}</h2>
        <p className="mt-6 max-w-[34ch]">{fox.summary}</p>
        <p className="mt-6 text-lead">
          {formatPrice(price)}
          {price < fox.priceCents && (
            <span className="ml-3 text-body text-bone-muted line-through">{formatPrice(fox.priceCents)}</span>
          )}
        </p>
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        <AddToCart product={fox} unitPriceCents={price} className="btn btn-accent h-[72px] w-full" />
        <Link href={`/products/${fox.slug}`} className="btn btn-quiet h-[72px] w-full">
          See the kit
        </Link>
      </div>
    </section>
  );
}

async function PriceList() {
  await connection();
  const all = await getProducts();
  const groups = (Object.keys(CATEGORY_INFO) as Category[]).map((c) => ({
    category: c,
    items: all.filter((p) => p.category === c),
  }));
  return (
    <div className="edge-scallop mx-auto max-w-[40rem] bg-paper px-6 text-ink sm:px-14" data-rise>
      <h2 className="text-center text-[clamp(2rem,3vw,3rem)]">The price list</h2>
      <p className="mt-2 text-center text-small text-muted">Every sheet, pen and kit in the shop today.</p>
      {groups.map((g) => (
        <div key={g.category} className="mt-14">
          <h3 className="text-center text-[1.375rem]">
            <Link href={`/shop/${g.category}`} className="hover:underline">
              {CATEGORY_INFO[g.category].title}
            </Link>
          </h3>
          <ul className="mx-auto mt-6 max-w-[26rem] space-y-4">
            {g.items.map((p) => (
              <li key={p.id}>
                <Link href={`/products/${p.slug}`} className="group flex justify-between gap-6">
                  <span className="group-hover:underline">{p.name}</span>
                  <span className="tabular-nums">{formatPrice(effectivePrice(p))}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <p className="mt-14 text-center text-small text-muted">
        Free shipping over $35.
        <br />
        Packed and posted the next working day.
      </p>
    </div>
  );
}

function Itinerary() {
  const groups = [
    {
      when: "Today",
      rows: [
        ["You choose paper, glue or a kit", "2 min"],
        ["We confirm by email", "at once"],
      ],
    },
    {
      when: "Tomorrow",
      rows: [
        ["Packed flat, by hand", "1 day"],
        ["Posted, tracked", "same day"],
      ],
    },
    {
      when: "By the weekend",
      rows: [
        ["It arrives", "2–4 days"],
        ["You fold a dog together", "2 min"],
      ],
    },
  ];
  return (
    <div className="tabular-nums">
      <h3 className="sr-only">How an order goes</h3>
      {groups.map((g) => (
        <div key={g.when} className="mt-7 first:mt-0">
          <p className="font-semibold">{g.when}</p>
          <ul className="mt-2 space-y-2">
            {g.rows.map(([what, time]) => (
              <li key={what} className="flex items-baseline gap-2">
                <span>{what}</span>
                <span aria-hidden className="leader mb-1 min-w-4 flex-1 self-end" />
                <span className="whitespace-nowrap">{time}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <p className="-mx-6 mt-8 flex h-11 items-center justify-between bg-ink px-6 text-paper sm:-mx-8 sm:px-8">
        <span>A new friend on the table</span>
        <span>about 3 days</span>
      </p>
    </div>
  );
}
