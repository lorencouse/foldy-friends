import Image from "next/image";
import Link from "next/link";
import { connection } from "next/server";
import { GluePen, Moon, Panda, PaperStack } from "@/components/menagerie";
import { ProductCard } from "@/components/product-tile";
import { SortSelect } from "@/components/sort-select";
import { getProducts, type Product } from "@/lib/catalog";
import { CATEGORY_LINKS, type Category } from "@/lib/categories";
import { effectivePrice } from "@/lib/money";
import { parseSort, type Sort } from "@/lib/sort";

/** A lifestyle photo taped into the banner, with the paper art as a sticker on its corner. */
type BannerPhoto = {
  src: string;
  alt: string;
  position: string;
  tape: string;
  sticker: React.ReactNode;
  /** A portrait original is shown square, and smaller, rather than cropped wide. */
  square?: boolean;
};

const BANNERS: Record<
  "all" | Category,
  { tone: string; ink: string; dark?: boolean } & ({ art: React.ReactNode } | { photo: BannerPhoto })
> = {
  all: {
    tone: "var(--color-mint-pale)",
    ink: "#2E5E4E",
    photo: {
      src: "/images/child-choosing-origami-paper.webp",
      alt: "A girl choosing a sheet of yellow origami paper from a fan of coloured squares on a wooden table",
      position: "80% 50%",
      tape: "var(--color-blush)",
      sticker: <Panda className="w-full" />,
    },
  },
  paper: {
    tone: "var(--color-sky-pale)",
    ink: "#2F4F75",
    photo: {
      src: "/images/kids-folding-origami-classroom.webp",
      alt: "Three children folding paper boats and cranes together at a classroom table",
      position: "50% 45%",
      tape: "var(--color-sun)",
      sticker: <PaperStack colors={["#F2A0B5", "#F6B93B", "#FFFDF8", "#3FB58E"]} className="w-full" />,
    },
  },
  tools: {
    tone: "var(--color-sun-pale)",
    ink: "#6B4E12",
    art: <GluePen colors={["#F2A0B5", "#5B9BE0", "#D23F2C"]} className="w-36 sm:w-44" />,
  },
  kits: {
    tone: "var(--color-midnight)",
    ink: "#D9DEEE",
    dark: true,
    photo: {
      src: "/images/grandmother-and-boy-folding-frogs.webp",
      alt: "A grandmother watching her grandson fold a blue paper frog on the living-room rug",
      position: "50% 60%",
      tape: "var(--color-sky)",
      sticker: <Moon fill="#F6B93B" sheen className="w-full" />,
      square: true,
    },
  },
};

export function ShopBanner({
  category,
  eyebrow,
  title,
  blurb,
}: {
  category?: Category;
  eyebrow: string;
  title: string;
  blurb: string;
}) {
  const b = BANNERS[category ?? "all"];
  return (
    <section className="pt-8 pb-6 sm:pt-10">
      <div className="wrap">
        <div
          className={`${b.dark ? "creases-dark text-paper" : "creases"} relative flex flex-wrap items-center justify-between gap-6 overflow-hidden rounded-[28px] p-[clamp(24px,4vw,48px)]`}
          style={{ backgroundColor: b.tone }}
        >
          <div className="flex max-w-[560px] flex-[1_1_320px] flex-col gap-2.5">
            <p className="eyebrow" style={{ color: b.ink }}>
              {eyebrow}
            </p>
            <h1 className="text-[clamp(2.5rem,5vw,4rem)] leading-none tracking-[-0.02em]">{title}</h1>
            <p style={{ color: b.dark ? b.ink : undefined }}>{blurb}</p>
          </div>
          {"photo" in b ? (
            <figure
              className={`${b.photo.square ? "max-w-[240px] flex-[1_1_220px] sm:max-w-[300px]" : "max-w-[460px] flex-[1_1_280px]"} relative m-0 rotate-[1.5deg] rounded-[10px] bg-card p-2.5 shadow-[0_20px_34px_-22px_rgba(31,42,68,.55)] sm:p-3`}
            >
              <div
                className={`${b.photo.square ? "aspect-square" : "aspect-[2/1] sm:aspect-[16/9]"} relative overflow-hidden rounded-md`}
              >
                <Image
                  src={b.photo.src}
                  alt={b.photo.alt}
                  fill
                  priority
                  sizes={b.photo.square ? "300px" : "(min-width: 768px) 460px, 90vw"}
                  className="object-cover"
                  style={{ objectPosition: b.photo.position }}
                />
              </div>
              <span
                className="tape tape-strip -top-3 left-[40%] -rotate-3"
                style={{ backgroundColor: b.photo.tape }}
              />
              <span
                aria-hidden="true"
                className="absolute -bottom-5 -left-5 w-16 -rotate-6 sm:-bottom-6 sm:-left-7 sm:w-22"
                style={{ filter: "drop-shadow(0 6px 6px rgba(31,42,68,.22))" }}
              >
                {b.photo.sticker}
              </span>
            </figure>
          ) : (
            <div className="flex items-end gap-2.5" aria-hidden="true">
              {b.art}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function sortProducts(list: Product[], sort: Sort) {
  const copy = [...list];
  if (sort === "price-asc") copy.sort((a, b) => effectivePrice(a) - effectivePrice(b));
  else if (sort === "price-desc") copy.sort((a, b) => effectivePrice(b) - effectivePrice(a));
  else if (sort === "newest") copy.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  return copy;
}

/** Category chips with counts, the sort control and the product grid. */
export async function Listing({
  category,
  searchParams,
}: {
  category?: Category;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  await connection();
  const [{ sort: rawSort }, all] = await Promise.all([searchParams, getProducts()]);
  const sort = parseSort(rawSort);
  const products = sortProducts(category ? all.filter((p) => p.category === category) : all, sort);
  const chips: { href: string; label: string; count: number; category?: Category }[] = [
    { href: "/shop", label: "All", count: all.length },
    ...CATEGORY_LINKS.map((link) => ({
      ...link,
      count: all.filter((p) => p.category === link.category).length,
    })),
  ];
  const query = sort === "featured" ? "" : `?sort=${sort}`;
  return (
    <div className="flex flex-col gap-7">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <nav aria-label="Categories" className="flex flex-wrap gap-2.5">
          {chips.map((c) => (
            <Link
              key={c.href}
              href={`${c.href}${query}`}
              className="chip"
              aria-current={c.category === category ? "page" : undefined}
            >
              {c.label} <span className="font-bold opacity-75">{c.count}</span>
            </Link>
          ))}
        </nav>
        <SortSelect action={category ? `/shop/${category}` : "/shop"} value={sort} />
      </div>
      <p className="text-base font-bold text-ink-soft">
        Showing {products.length} of {all.length} {all.length === 1 ? "item" : "items"}
      </p>
      {products.length === 0 ? (
        <p className="py-16 text-lead">Nothing here yet. New stock is on its way.</p>
      ) : (
        <ul className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,260px),1fr))] gap-6">
          {products.map((p, i) => (
            <li key={p.id}>
              <ProductCard product={p} priority={i < 3} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function ListingSkeleton() {
  return (
    <div className="flex flex-col gap-7" role="status" aria-busy="true" aria-label="Loading products">
      <div className="h-11 w-72 max-w-full animate-pulse rounded-full bg-kraft" />
      <ul className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,260px),1fr))] gap-6">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <li key={i} className="sheet h-[520px] animate-pulse" />
        ))}
      </ul>
    </div>
  );
}
