"use client";

import { useState } from "react";
import { useOption } from "@/components/product-option";
import { moonFill } from "@/components/product-picture";
import { cart } from "@/lib/cart";
import { formatPrice } from "@/lib/money";

type Props = {
  product: {
    id: string;
    slug: string;
    name: string;
    art: string;
    category: string;
    options: string[];
    stock: number;
    priceCents: number;
  };
  unitPriceCents: number;
  /**
   * "card": one button that adds the first option.
   * "full": option swatches, a quantity stepper and the button with a total.
   */
  variant?: "card" | "full";
};

const MAX_QTY = 20;

export function AddToCart({ product, unitPriceCents, variant = "card" }: Props) {
  const [localOption, setLocalOption] = useState<string | null>(product.options[0] ?? null);
  const shared = useOption();
  const option = shared?.option ?? localOption;
  const setOption = shared?.setOption ?? setLocalOption;
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const soldOut = product.stock <= 0;
  const isMoon = product.category === "kits";

  function add() {
    cart.add(
      {
        productId: product.id,
        slug: product.slug,
        name: product.name,
        art: product.art,
        option,
        unitPriceCents,
        listPriceCents: product.priceCents > unitPriceCents ? product.priceCents : undefined,
      },
      variant === "full" ? quantity : 1,
    );
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1800);
  }

  const status = (
    <span className="sr-only" aria-live="polite">
      {added ? `${product.name} added to your cart` : ""}
    </span>
  );

  if (variant === "card") {
    return (
      <>
        <button type="button" className="btn btn-sm w-full" onClick={add} disabled={soldOut}>
          {soldOut ? "Sold out" : added ? "Added to your cart" : "Add to cart"}
        </button>
        {status}
      </>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      {product.options.length > 0 && (
        <fieldset>
          <legend className="mb-2.5 text-base font-extrabold">
            {isMoon ? "Moon colour" : "Pack size"}
            {option && <span className="font-bold text-ink-soft">: {option}</span>}
          </legend>
          <div className="flex flex-wrap gap-2.5">
            {product.options.map((o) => (
              <label key={o} className="relative">
                <input
                  type="radio"
                  name={`option-${product.id}`}
                  className="peer absolute size-px opacity-0"
                  checked={option === o}
                  onChange={() => setOption(o)}
                />
                <span className={`swatch ${isMoon ? "" : "pl-[18px]"}`}>
                  {isMoon && (
                    <span
                      aria-hidden="true"
                      className="block size-7 rounded-full border-[1.5px] border-ink/25"
                      style={{ background: moonFill(o) }}
                    />
                  )}
                  {o}
                </span>
              </label>
            ))}
          </div>
        </fieldset>
      )}
      <div className="flex flex-wrap items-stretch gap-3.5">
        <fieldset className="stepper">
          <legend className="sr-only">Quantity</legend>
          <button
            type="button"
            className="step"
            aria-label="One fewer"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            disabled={quantity <= 1}
          >
            −
          </button>
          <output aria-live="polite" className="min-w-9 text-center font-display text-xl font-extrabold">
            {quantity}
          </output>
          <button
            type="button"
            className="step"
            aria-label="One more"
            onClick={() => setQuantity((q) => Math.min(MAX_QTY, q + 1))}
            disabled={quantity >= MAX_QTY}
          >
            +
          </button>
        </fieldset>
        <button
          type="button"
          className="btn btn-primary min-h-14 flex-[1_1_220px] text-[1.1875rem]"
          onClick={add}
          disabled={soldOut}
        >
          {soldOut
            ? "Sold out"
            : added
              ? "Added to your cart"
              : `Add to cart · ${formatPrice(unitPriceCents * quantity)}`}
        </button>
      </div>
      {status}
    </div>
  );
}
