import Image from "next/image";
import Link from "next/link";
import { connection } from "next/server";
import { Suspense } from "react";
import { FoldDiamonds } from "@/components/fold-level";
import { Crane, Elephant, Fox, GluePen, Moon, Panda, PaperStack, Raccoon } from "@/components/menagerie";
import { ProductCard } from "@/components/product-tile";
import { TapedPhoto } from "@/components/taped-photo";
import { getProducts } from "@/lib/catalog";
import { CATEGORIES, CATEGORY_INFO, type Category } from "@/lib/categories";
import { FOLD_LEVELS } from "@/lib/fold-level";

/** The friends shown first, in order; any others fill the row if one is missing. */
const FAVOURITES = [
  "fox-asleep-on-the-moon",
  "panda-asleep-on-the-moon",
  "raccoon-in-the-moon",
  "double-sided-origami-paper",
];

export default function Home() {
  return (
    <>
      <Hero />
      <div className="pleats" aria-hidden="true" />
      <Categories />
      <MoonDreamers />
      <section aria-labelledby="favourites-heading" className="pb-[clamp(48px,6vw,96px)]">
        <div className="wrap flex flex-col gap-8">
          <SectionHead
            eyebrow="Family favourites"
            title="Top-selling friends"
            id="favourites-heading"
            link={{ href: "/shop", label: "Shop all" }}
          />
          <Suspense fallback={<CardsSkeleton />}>
            <Favourites />
          </Suspense>
        </div>
      </section>
      <ForParents />
      <FoldClub />
    </>
  );
}

function SectionHead({
  eyebrow,
  title,
  id,
  link,
}: {
  eyebrow: string;
  title: string;
  id: string;
  link?: { href: string; label: string };
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-3">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2 id={id} className="mt-2 text-[clamp(2rem,4vw,2.75rem)]">
          {title}
        </h2>
      </div>
      {link && (
        <Link href={link.href} className="link">
          {link.label}
        </Link>
      )}
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="wrap grid grid-cols-[repeat(auto-fit,minmax(min(100%,460px),1fr))] items-center gap-12 pt-[clamp(32px,6vw,88px)] pb-[clamp(48px,6vw,96px)]">
        <div className="flex flex-col items-start gap-6">
          <span className="tape -rotate-2">New: Moon Dreamers kits</span>
          <h1 className="text-[clamp(2.75rem,6.4vw,5.25rem)] leading-[0.98] tracking-[-0.025em]">
            Fold a new{" "}
            <span className="relative whitespace-nowrap">
              friend
              <svg
                viewBox="0 0 200 20"
                preserveAspectRatio="none"
                aria-hidden="true"
                className="absolute right-0 -bottom-1.5 left-0 h-4 w-full"
              >
                <polyline
                  points="2,12 25,4 48,14 71,4 94,14 117,4 140,14 163,4 186,14 198,8"
                  fill="none"
                  stroke="#D23F2C"
                  strokeWidth="5"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />
              </svg>
            </span>{" "}
            today.
          </h1>
          <p className="max-w-[520px] text-lead text-ink-soft">
            Origami paper, glue pens and papercraft animal kits for small hands and the grown-ups folding
            right beside them.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/shop/kits" className="btn btn-primary">
              Shop the kits
            </Link>
            <Link href="/shop/paper" className="btn">
              Browse paper
            </Link>
          </div>
          <ul className="mt-2 flex flex-wrap gap-x-5 gap-y-2.5 text-[0.9375rem] font-bold text-ink-soft">
            <li className="flex items-center gap-2">
              <span className="dia" style={{ background: "var(--color-mint)" }} />
              Paper that holds a crease
            </li>
            <li className="flex items-center gap-2">
              <span className="dia" style={{ background: "var(--color-sky)" }} />
              Glue that stays put
            </li>
            <li className="flex items-center gap-2">
              <span className="dia" style={{ background: "var(--color-blush)" }} />
              Fold level on every kit
            </li>
          </ul>
        </div>

        <div className="relative h-[clamp(340px,42vw,540px)]">
          <div className="creases absolute inset-[4%_2%_10%_14%] rotate-7 rounded-[22px] bg-sky" />
          <div className="creases absolute inset-[10%_12%_4%_2%] -rotate-5 rounded-[22px] bg-sun" />
          <TapedPhoto
            src="/images/kids-folding-origami-kitchen-table.webp"
            alt="A brother and sister folding paper cranes at the kitchen table while their dad watches"
            priority
            sizes="(min-width: 1024px) 40vw, 90vw"
            aspect="min-h-0 flex-1"
            caption="Folding together"
            tapes={[{ color: "var(--color-blush)", className: "-top-3 left-[38%] -rotate-4" }]}
            className="absolute inset-[9%_9%_12%_10%] flex -rotate-2 flex-col p-3.5 pb-12 shadow-[0_24px_40px_-24px_rgba(31,42,68,.55)]"
          />
          <Fox
            className="absolute -bottom-[4%] -left-[2%] w-[32%]"
            style={{ filter: "drop-shadow(0 10px 10px rgba(31,42,68,.25))" }}
          />
          <Crane
            className="absolute -top-[3%] -right-[1%] w-[24%] rotate-8"
            style={{ filter: "drop-shadow(0 8px 8px rgba(31,42,68,.2))" }}
          />
        </div>
      </div>
    </section>
  );
}

const CATEGORY_TILES: Record<Category, { note: string; color: string; art: React.ReactNode }> = {
  paper: {
    note: "Plain, patterned, glitter",
    color: "var(--color-sky)",
    art: <PaperStack colors={["#F2A0B5", "#F6B93B", "#FFFDF8", "#3FB58E"]} className="w-[62%]" />,
  },
  tools: {
    note: "Glue pens and sticks",
    color: "var(--color-sun)",
    art: <GluePen colors={["#F2A0B5", "#5B9BE0", "#D23F2C"]} className="w-[58%]" />,
  },
  kits: {
    note: "3D papercraft animals",
    color: "var(--color-mint)",
    art: <Panda className="w-[52%]" />,
  },
};

function Categories() {
  return (
    <section aria-labelledby="categories-heading" className="bg-kraft py-[clamp(48px,6vw,88px)]">
      <div className="wrap flex flex-col gap-8">
        <SectionHead
          eyebrow="Shop by sheet"
          title="Everything for the fold"
          id="categories-heading"
          link={{ href: "/shop", label: "See everything" }}
        />
        <ul className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,260px),1fr))] gap-6">
          {CATEGORIES.map((c) => (
            <li key={c}>
              <Link href={`/shop/${c}`} className="tile-link flex flex-col gap-3.5">
                <div
                  className="dogear creases flex aspect-[4/3] items-center justify-center rounded-[22px_0_22px_22px]"
                  style={{ backgroundColor: CATEGORY_TILES[c].color }}
                >
                  <span className="flap" />
                  {CATEGORY_TILES[c].art}
                </div>
                <div className="flex flex-wrap items-center justify-between gap-x-3">
                  <span className="font-display text-[1.625rem] leading-none font-extrabold">
                    {CATEGORY_INFO[c].title}
                  </span>
                  <span className="text-[0.9375rem] font-bold text-ink-soft">{CATEGORY_TILES[c].note}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

const DREAMERS = [
  { name: "Fox", Animal: Fox },
  { name: "Panda", Animal: Panda },
  { name: "Raccoon", Animal: Raccoon },
  { name: "Elephant", Animal: Elephant },
];

const STARS = [
  "top-[12%] left-[46%]",
  "top-[22%] left-[58%]",
  "top-[70%] left-[52%]",
  "top-[10%] right-[8%]",
  "right-[30%] bottom-[14%]",
  "top-[40%] left-[4%]",
];

function MoonDreamers() {
  return (
    <section
      id="moon-dreamers"
      aria-labelledby="dreamers-heading"
      className="scroll-mt-4 py-[clamp(48px,6vw,96px)]"
    >
      <div className="wrap">
        <div className="dogear creases-dark relative grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] items-center gap-8 overflow-hidden rounded-[32px_0_32px_32px] bg-midnight p-[clamp(24px,5vw,72px)] text-paper">
          <span className="flap" />
          {STARS.map((s) => (
            <span key={s} className={`stars ${s}`} aria-hidden="true" />
          ))}
          <div className="relative flex flex-col items-start gap-5">
            <span className="tape -rotate-2">The new collection</span>
            <h2 id="dreamers-heading" className="text-[clamp(2.25rem,4.6vw,3.625rem)] leading-none">
              Meet the Moon Dreamers
            </h2>
            <p className="max-w-[460px] text-[#D9DEEE]">
              Four sleepy friends to build, each curled up in its own paper crescent moon. A calm project to
              make together, then a friend for the shelf.
            </p>
            <Link href="/shop/kits" className="btn btn-sun">
              Meet the dreamers
            </Link>
          </div>
          <div className="relative flex flex-col gap-7 pt-4">
            <Moon fill="#F6B93B" sheen className="absolute -top-3 -right-3 w-[min(46%,220px)]" />
            <TapedPhoto
              src="/images/dad-and-daughter-folding-at-bedtime.webp"
              alt="A dad and his daughter in star pyjamas looking at the paper boat she folded, on the rug before bed"
              sizes="(min-width: 1024px) 480px, 85vw"
              aspect="aspect-[3/2]"
              caption="One more fold before bed"
              tapes={[{ color: "var(--color-sky)", className: "-top-3 left-[36%] rotate-3" }]}
              className="relative w-[84%] -rotate-2 p-2.5 pb-10 shadow-[0_24px_40px_-24px_rgba(0,0,0,.7)] sm:p-3 sm:pb-11"
            />
            <ul className="relative grid grid-cols-4 gap-2 sm:gap-3">
              {DREAMERS.map(({ name, Animal }) => (
                <li key={name} className="flex flex-col items-center gap-1.5">
                  <div className="flex aspect-square w-full items-center justify-center rounded-[18px] bg-midnight-2">
                    <Animal sleepy className="w-4/5" />
                  </div>
                  <span className="text-[0.9375rem] font-extrabold">{name}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

async function Favourites() {
  await connection();
  const all = await getProducts();
  const picked = FAVOURITES.map((slug) => all.find((p) => p.slug === slug)).filter((p) => p !== undefined);
  const rest = all.filter((p) => !picked.includes(p));
  const shown = [...picked, ...rest].slice(0, 4);
  if (shown.length === 0) return <p className="text-lead text-ink-soft">New friends are on their way.</p>;
  return (
    <ul className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,270px),1fr))] gap-6">
      {shown.map((p, i) => (
        <li key={p.id}>
          <ProductCard product={p} priority={i < 2} />
        </li>
      ))}
    </ul>
  );
}

function CardsSkeleton() {
  return (
    <ul
      className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,270px),1fr))] gap-6"
      aria-busy="true"
      aria-label="Loading products"
    >
      {[0, 1, 2, 3].map((i) => (
        <li key={i} className="sheet h-[520px] animate-pulse" />
      ))}
    </ul>
  );
}

function ForParents() {
  return (
    <section aria-labelledby="parents-heading" className="overflow-x-clip bg-kraft py-[clamp(48px,6vw,96px)]">
      <div className="wrap grid grid-cols-[repeat(auto-fit,minmax(min(100%,440px),1fr))] items-center gap-[clamp(32px,5vw,72px)]">
        <TapedPhoto
          src="/images/boy-handing-mom-origami-dog.webp"
          alt="A boy handing his mother a red paper dog he folded"
          sizes="(min-width: 1024px) 45vw, 90vw"
          aspect="aspect-[4/3]"
          imageClassName="object-[25%_40%] md:object-[50%_40%]"
          tapes={[
            { color: "var(--color-sky)", className: "-top-2.5 -left-3.5 -rotate-30" },
            { color: "var(--color-sun)", className: "-right-3.5 -bottom-2.5 -rotate-30" },
          ]}
          className="relative rotate-[1.5deg] p-3.5 shadow-[0_24px_40px_-26px_rgba(31,42,68,.55)]"
        />
        <div className="flex flex-col items-start gap-5">
          <p className="eyebrow">For parents</p>
          <h2 id="parents-heading" className="text-[clamp(2rem,4vw,3rem)]">
            Pick the right fold, every time
          </h2>
          <p className="max-w-[520px] text-ink-soft">
            Every kit shows a fold level, so you can match a project to your child's patience and hands before
            you buy.
          </p>
          <ul className="grid w-full grid-cols-[repeat(auto-fit,minmax(min(100%,150px),1fr))] gap-3.5">
            {FOLD_LEVELS.map((l, i) => (
              <li key={l.name} className="sheet flex flex-col gap-2 rounded-2xl p-4.5">
                <FoldDiamonds level={{ level: i + 1, of: FOLD_LEVELS.length }} color={l.color} />
                <strong className="font-display text-xl leading-[1.1] font-bold">{l.name}</strong>
                <span className="text-[0.9375rem] leading-normal text-ink-soft">{l.homeNote}</span>
              </li>
            ))}
          </ul>
          <Link href="/shop/kits" className="btn btn-primary">
            Compare the kits
          </Link>
        </div>
      </div>
    </section>
  );
}

function FoldClub() {
  return (
    <section aria-labelledby="club-heading" className="py-[clamp(48px,6vw,96px)]">
      <div className="wrap">
        <div className="creases relative grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] items-center gap-8 overflow-hidden rounded-[32px] bg-sun p-[clamp(28px,5vw,64px)]">
          <div className="flex flex-col items-start gap-3.5">
            <h2 id="club-heading" className="text-[clamp(2rem,4vw,3rem)]">
              Join the Fold Club
            </h2>
            <p className="max-w-[460px]">
              New friends, sales and folding ideas. Write to us and we will add you to the list; ask to leave
              any time.
            </p>
            <a
              className="btn btn-primary mt-2"
              href="mailto:hello@foldyfriends.com?subject=Join%20the%20Fold%20Club"
            >
              Email us to join
            </a>
          </div>
          <div className="relative w-[min(100%,400px)] justify-self-center pb-6">
            <TapedPhoto
              src="/images/girl-holding-up-paper-crane.webp"
              alt="A girl holding up a red paper crane she folded"
              sizes="(min-width: 768px) 280px, 65vw"
              aspect="aspect-square"
              tapes={[{ color: "var(--color-blush)", className: "-top-3 left-[34%] -rotate-4" }]}
              className="relative w-[70%] -rotate-2 p-2.5 shadow-[0_24px_40px_-24px_rgba(31,42,68,.55)] sm:p-3"
            />
            <div aria-hidden="true" className="absolute right-0 bottom-0 w-[34%]">
              <span className="absolute -top-9 -right-1 z-[2] -rotate-5 rounded-[16px_16px_4px_16px] border-2 border-ink bg-card px-3 py-2 font-display text-base leading-none font-extrabold whitespace-nowrap sm:text-lg">
                Let's fold!
              </span>
              <Image
                src="/assets/dog-mascot.png"
                alt=""
                width={388}
                height={378}
                className="block w-full rotate-4 mix-blend-multiply"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
