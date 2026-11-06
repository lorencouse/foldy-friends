"use client";

import { useState } from "react";
import { useOption } from "@/components/product-option";
import { cart } from "@/lib/cart";

type Props = {
  product: {
    id: string;
    slug: string;
    name: string;
    art: string;
    category: string;
    options: string[];
    stock: number;
  };
  unitPriceCents: number;
  className?: string;
  /** Show the option picker (product page); otherwise the first option is used. */
  withOptions?: boolean;
};

export function AddToCart({ product, unitPriceCents, className = "btn", withOptions = false }: Props) {
  const [localOption, setLocalOption] = useState<string | null>(product.options[0] ?? null);
  const shared = useOption();
  const option = shared?.option ?? localOption;
  const setOption = shared?.setOption ?? setLocalOption;
  const [added, setAdded] = useState(false);
  const soldOut = product.stock <= 0;

  function add() {
    cart.add({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      art: product.art,
      option,
      unitPriceCents,
    });
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1800);
  }

  return (
    <div className="space-y-5">
      {withOptions && product.options.length > 0 && (
        <fieldset>
          <legend className="field-label">{product.category === "kits" ? "Moon colour" : "Pack size"}</legend>
          <div className="flex flex-wrap gap-2">
            {product.options.map((o) => (
              <label key={o} className="cursor-pointer">
                <input
                  type="radio"
                  name={`option-${product.id}`}
                  className="peer sr-only"
                  checked={option === o}
                  onChange={() => setOption(o)}
                />
                <span className="inline-flex min-h-11 items-center bg-paper-2 px-4 transition-colors hover:bg-[#dcdcd7] peer-checked:bg-ink peer-checked:text-paper peer-focus-visible:outline-3 peer-focus-visible:outline-kami-blue">
                  {o}
                </span>
              </label>
            ))}
          </div>
        </fieldset>
      )}
      <button type="button" className={className} onClick={add} disabled={soldOut}>
        {soldOut ? "Sold out" : added ? "Added to your cart" : "Add to cart"}
      </button>
      <span className="sr-only" aria-live="polite">
        {added ? `${product.name} added to your cart` : ""}
      </span>
    </div>
  );
}
