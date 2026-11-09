"use client";

import { useState } from "react";
import { useOption } from "@/components/product-option";
import { isDarkTile, PictureTile, ProductDrawing, tileFor } from "@/components/product-picture";

type View = { key: string; label: string; kind: "finished" | "pieces" | "photo"; photo?: string };

/**
 * The product's pictures: a large dog-eared sheet and thumbnails to switch it.
 * Uploaded photos come first; without them, the drawn views stand in.
 */
export function ProductGallery({
  product,
}: {
  product: { name: string; art: string; category: string; images: string[] };
}) {
  const option = useOption()?.option ?? null;
  const views: View[] =
    product.images.length > 0
      ? product.images.map((img, i) => ({ key: img, label: `Photo ${i + 1}`, kind: "photo", photo: img }))
      : [
          { key: "finished", label: "The finished friend", kind: "finished" },
          ...(product.category === "kits"
            ? [{ key: "pieces", label: "The printed pieces", kind: "pieces" } as View]
            : []),
        ];
  const [current, setCurrent] = useState(views[0].key);
  const view = views.find((v) => v.key === current) ?? views[0];
  const dark = isDarkTile(product.art, product.category);

  return (
    <div className="flex flex-col gap-4">
      <Main view={view} product={product} option={option} />
      {views.length > 1 && (
        <ul className="grid grid-cols-4 gap-3">
          {views.map((v) => {
            const on = v.key === view.key;
            return (
              <li key={v.key}>
                <button
                  type="button"
                  aria-label={v.label}
                  aria-pressed={on}
                  onClick={() => setCurrent(v.key)}
                  className={`block w-full overflow-hidden rounded-[14px] border-[3px] p-0 ${on ? "border-ink" : "border-transparent hover:border-crease-dark"}`}
                >
                  <Thumb view={v} product={product} option={option} dark={dark} />
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

function Main({
  view,
  product,
  option,
}: {
  view: View;
  product: { name: string; art: string; category: string };
  option: string | null;
}) {
  const alt = view.kind === "photo" ? product.name : "";
  return (
    <PictureTile
      art={product.art}
      category={product.category}
      option={option}
      photo={view.photo}
      alt={alt}
      view={view.kind === "pieces" ? "pieces" : "finished"}
      className="relative rounded-[28px_0_28px_28px]"
    >
      {view.kind !== "photo" && (
        <span className="sr-only">
          {view.kind === "pieces" ? `The printed pieces of ${product.name}` : `Drawing of ${product.name}`}
        </span>
      )}
    </PictureTile>
  );
}

function Thumb({
  view,
  product,
  option,
  dark,
}: {
  view: View;
  product: { art: string; category: string };
  option: string | null;
  dark: boolean;
}) {
  if (view.kind === "photo") {
    // biome-ignore lint/performance/noImgElement: uploaded files are served by /media
    return <img src={`/media/${view.photo}`} alt="" className="aspect-square w-full object-cover" />;
  }
  return (
    <div
      className={`relative flex aspect-square items-center justify-center ${view.kind === "pieces" ? "bg-kraft" : dark ? "creases-dark" : "creases"}`}
      style={view.kind === "pieces" ? undefined : { backgroundColor: tileFor(product.art, product.category) }}
    >
      <ProductDrawing
        art={product.art}
        category={product.category}
        option={option}
        view={view.kind === "pieces" ? "pieces" : "finished"}
      />
    </div>
  );
}
