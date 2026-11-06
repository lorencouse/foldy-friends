"use client";

import Link from "next/link";
import { ProductArt } from "@/components/product-art";
import { cart, useCart } from "@/lib/cart";
import { FREE_SHIPPING_FROM_CENTS, formatPrice, shippingFor } from "@/lib/money";

export function CartView() {
  const lines = useCart();
  const subtotal = lines.reduce((s, l) => s + l.unitPriceCents * l.quantity, 0);
  const shipping = shippingFor(subtotal);

  if (lines.length === 0) {
    return (
      <div className="mt-10 grid items-center gap-10 bg-paper-2 p-8 md:grid-cols-2 md:p-12">
        <div>
          <p className="text-lead">Nothing folded in here yet.</p>
          <p className="mt-2 text-muted">A pack of double-sided paper is a good first sheet.</p>
          <Link href="/shop" className="btn mt-8">
            Go to the shop
          </Link>
        </div>
        <ProductArt art="paper-double" className="mx-auto w-full max-w-xs" />
      </div>
    );
  }

  return (
    <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_24rem]">
      <ul className="space-y-6">
        {lines.map((l) => (
          <li
            key={`${l.productId}-${l.option}`}
            className="grid grid-cols-[6rem_1fr] gap-5 sm:grid-cols-[8rem_1fr_auto]"
          >
            <Link href={`/products/${l.slug}`} className="block aspect-square bg-paper-2">
              <ProductArt art={l.art} option={l.option ?? undefined} className="size-full" />
            </Link>
            <div>
              <Link href={`/products/${l.slug}`} className="font-medium hover:underline">
                {l.name}
              </Link>
              {l.option && <p className="text-small text-muted">{l.option}</p>}
              <p className="mt-1 tabular-nums">{formatPrice(l.unitPriceCents)}</p>
              <div className="mt-3 flex items-center gap-1">
                <button
                  type="button"
                  className="btn btn-quiet min-h-10 w-10 px-0"
                  aria-label={`One fewer ${l.name}`}
                  onClick={() => cart.setQuantity(l.productId, l.option, l.quantity - 1)}
                >
                  −
                </button>
                <span className="w-10 text-center tabular-nums" aria-live="polite">
                  {l.quantity}
                </span>
                <button
                  type="button"
                  className="btn btn-quiet min-h-10 w-10 px-0"
                  aria-label={`One more ${l.name}`}
                  onClick={() => cart.setQuantity(l.productId, l.option, l.quantity + 1)}
                >
                  +
                </button>
                <button
                  type="button"
                  className="ml-4 text-small underline underline-offset-4 hover:no-underline"
                  onClick={() => cart.setQuantity(l.productId, l.option, 0)}
                >
                  Remove
                </button>
              </div>
            </div>
            <p className="col-start-2 font-medium tabular-nums sm:col-start-3 sm:text-right">
              {formatPrice(l.unitPriceCents * l.quantity)}
            </p>
          </li>
        ))}
      </ul>
      <aside className="h-fit bg-paper-2 p-6 sm:p-8" aria-label="Order summary">
        <h2 className="text-lead">Summary</h2>
        <dl className="mt-6 space-y-3 tabular-nums">
          <div className="flex justify-between">
            <dt>Subtotal</dt>
            <dd>{formatPrice(subtotal)}</dd>
          </div>
          <div className="flex justify-between">
            <dt>Shipping</dt>
            <dd>{shipping === 0 ? "Free" : formatPrice(shipping)}</dd>
          </div>
          <div className="flex justify-between pt-3 text-lead font-medium">
            <dt>Total</dt>
            <dd>{formatPrice(subtotal + shipping)}</dd>
          </div>
        </dl>
        {shipping > 0 && (
          <p className="mt-4 text-small text-muted">
            Add {formatPrice(FREE_SHIPPING_FROM_CENTS - subtotal)} more for free shipping.
          </p>
        )}
        <Link href="/checkout" className="btn btn-accent mt-8 w-full">
          Check out
        </Link>
      </aside>
    </div>
  );
}
