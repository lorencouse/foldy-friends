"use client";

import Image from "next/image";
import Link from "next/link";
import { PictureTile } from "@/components/product-picture";
import { cart, useCart } from "@/lib/cart";
import { FREE_SHIPPING_FROM_CENTS, formatPrice, shippingFor } from "@/lib/money";

export function CartView() {
  const lines = useCart();
  const subtotal = lines.reduce((s, l) => s + l.unitPriceCents * l.quantity, 0);
  const savings = lines.reduce(
    (s, l) =>
      s +
      (l.listPriceCents && l.listPriceCents > l.unitPriceCents ? l.listPriceCents - l.unitPriceCents : 0) *
        l.quantity,
    0,
  );
  const shipping = shippingFor(subtotal);
  const toFree = Math.max(0, FREE_SHIPPING_FROM_CENTS - subtotal);
  const progress = Math.min(100, Math.round((subtotal / FREE_SHIPPING_FROM_CENTS) * 100));

  if (lines.length === 0) {
    return (
      <div className="creases flex flex-col items-center gap-4 rounded-[28px] bg-sun-pale px-6 py-14 text-center">
        <div className="flex items-end justify-center">
          <figure className="relative m-0 w-[min(56vw,240px)] -rotate-3 rounded-[10px] bg-card p-2 shadow-[0_18px_30px_-20px_rgba(31,42,68,.55)] sm:p-2.5">
            <div className="relative aspect-[4/3] overflow-hidden rounded-md">
              <Image
                src="/images/child-hands-folding-origami.webp"
                alt="A child's small hands creasing a sheet of mint green paper beside a folded red fox"
                fill
                sizes="240px"
                className="object-cover"
              />
            </div>
            <span
              className="tape tape-strip -top-3 left-[30%] h-5 w-20 rotate-2"
              style={{ backgroundColor: "var(--color-mint)" }}
            />
          </figure>
          <Image
            src="/assets/dog-mascot.png"
            alt=""
            width={388}
            height={378}
            className="-ml-1 w-28 rotate-4 mix-blend-multiply sm:w-36"
          />
        </div>
        <h2 className="text-[2rem] leading-[1.1]">Nothing folded in here yet</h2>
        <p className="max-w-[420px] text-ink-soft">
          Find a friend to fold, or start with a pack of double-sided paper.
        </p>
        <Link href="/shop" className="btn btn-primary mt-1">
          Find a friend
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-start gap-8">
      <ul className="flex min-w-0 flex-[999_1_560px] flex-col gap-4">
        {lines.map((l) => (
          <li
            key={`${l.productId}-${l.option}`}
            className="sheet grid grid-cols-[88px_minmax(0,1fr)] items-center gap-x-4 gap-y-3 p-3.5 sm:flex sm:gap-5 sm:p-4"
          >
            <Link
              href={`/products/${l.slug}`}
              tabIndex={-1}
              aria-hidden="true"
              className="block w-[88px] flex-none sm:w-[120px]"
            >
              <PictureTile art={l.art} option={l.option} small className="rounded-[14px_0_14px_14px]" />
            </Link>
            <div className="flex min-w-0 flex-1 flex-col">
              <Link
                href={`/products/${l.slug}`}
                className="font-display text-[1.3125rem] leading-[1.2] font-bold hover:text-tomato"
              >
                {l.name}
              </Link>
              <p className="text-[0.9375rem] text-ink-soft">
                {l.option && (
                  <>
                    <span>{l.option}</span> ·{" "}
                  </>
                )}
                {formatPrice(l.unitPriceCents)} each
              </p>
              <button
                type="button"
                className="link-btn self-start"
                onClick={() => cart.setQuantity(l.productId, l.option, 0)}
              >
                Remove<span className="sr-only"> {l.name}</span>
              </button>
            </div>
            <div className="col-span-2 flex items-center justify-between gap-4 sm:contents">
              <fieldset className="stepper">
                <legend className="sr-only">Quantity of {l.name}</legend>
                <button
                  type="button"
                  className="step"
                  aria-label={`One fewer ${l.name}`}
                  onClick={() => cart.setQuantity(l.productId, l.option, l.quantity - 1)}
                >
                  −
                </button>
                <output
                  aria-live="polite"
                  className="min-w-8 text-center font-display text-lg font-extrabold"
                >
                  {l.quantity}
                </output>
                <button
                  type="button"
                  className="step"
                  aria-label={`One more ${l.name}`}
                  onClick={() => cart.setQuantity(l.productId, l.option, l.quantity + 1)}
                  disabled={l.quantity >= 20}
                >
                  +
                </button>
              </fieldset>
              <strong className="min-w-[84px] text-right font-display text-[1.375rem] leading-none font-extrabold">
                {formatPrice(l.unitPriceCents * l.quantity)}
              </strong>
            </div>
          </li>
        ))}
      </ul>

      <aside
        aria-label="Order summary"
        className="sheet sheet-raised flex min-w-0 flex-[1_1_340px] flex-col gap-4.5 rounded-3xl p-6"
      >
        <h2 className="text-[1.75rem] leading-[1.1]">Order summary</h2>
        <div className="flex flex-col gap-2 rounded-[14px] bg-mint-pale px-4 py-3.5">
          <span className="text-[0.9375rem] font-extrabold">
            {toFree > 0 ? `${formatPrice(toFree)} away from free shipping` : "You have free shipping!"}
          </span>
          <div
            className="h-3 overflow-hidden rounded-md bg-card"
            role="progressbar"
            aria-label="Progress to free shipping"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={progress}
          >
            <div
              className="h-full rounded-md bg-mint bg-[repeating-linear-gradient(90deg,#57C9A1_0,#2F9A76_12px,#57C9A1_12px,#2F9A76_24px)]"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        <dl className="grid grid-cols-[1fr_auto] gap-x-4 gap-y-2.5 text-[1.0625rem]">
          <dt className="text-ink-soft">Subtotal</dt>
          <dd className="font-extrabold">{formatPrice(subtotal)}</dd>
          {savings > 0 && (
            <>
              <dt className="text-ink-soft">You save</dt>
              <dd className="font-extrabold text-mint-ink">{formatPrice(savings)}</dd>
            </>
          )}
          <dt className="text-ink-soft">Shipping</dt>
          <dd className="font-extrabold">{shipping === 0 ? "Free" : formatPrice(shipping)}</dd>
        </dl>
        <div className="dashed-rule" aria-hidden="true" />
        <div className="flex items-baseline justify-between">
          <span className="font-display text-[1.375rem] leading-none font-extrabold">Total</span>
          <strong className="font-display text-[2rem] leading-none font-extrabold">
            {formatPrice(subtotal + shipping)}
          </strong>
        </div>
        <Link href="/checkout" className="btn btn-primary">
          Check out
        </Link>
        <span className="text-center text-[0.875rem] text-ink-soft">Prices are confirmed at checkout.</span>
      </aside>
    </div>
  );
}
