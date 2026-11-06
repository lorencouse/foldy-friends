"use client";

import Link from "next/link";
import { useActionState } from "react";
import { useCart } from "@/lib/cart";
import { formatPrice, shippingFor } from "@/lib/money";
import { type CheckoutState, placeOrder } from "./actions";

export function CheckoutForm({ defaultEmail, defaultName }: { defaultEmail: string; defaultName: string }) {
  const lines = useCart();
  const [state, action, pending] = useActionState<CheckoutState, FormData>(placeOrder, {});
  const subtotal = lines.reduce((s, l) => s + l.unitPriceCents * l.quantity, 0);
  const shipping = shippingFor(subtotal);

  if (lines.length === 0) {
    return (
      <p className="mt-10 text-lead">
        Your cart is empty.{" "}
        <Link href="/shop" className="link">
          Go to the shop
        </Link>
        .
      </p>
    );
  }

  return (
    <form action={action} className="mt-10 grid gap-12 lg:grid-cols-[1fr_24rem]">
      <input
        type="hidden"
        name="lines"
        value={JSON.stringify(
          lines.map((l) => ({
            productId: l.productId,
            option: l.option,
            quantity: l.quantity,
          })),
        )}
      />
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          name="email"
          label="Email"
          type="email"
          autoComplete="email"
          defaultValue={defaultEmail}
          wide
        />
        <Field name="name" label="Full name" autoComplete="name" defaultValue={defaultName} wide />
        <Field name="line1" label="Street address" autoComplete="address-line1" wide />
        <Field
          name="line2"
          label="Apartment, suite (optional)"
          autoComplete="address-line2"
          required={false}
          wide
        />
        <Field name="city" label="Town or city" autoComplete="address-level2" />
        <Field name="region" label="State" autoComplete="address-level1" />
        <Field name="postalCode" label="ZIP code" autoComplete="postal-code" inputMode="numeric" />
      </div>
      <aside className="h-fit bg-paper-2 p-6 sm:p-8" aria-label="Order summary">
        <h2 className="text-lead">Your order</h2>
        <ul className="mt-6 space-y-3">
          {lines.map((l) => (
            <li key={`${l.productId}-${l.option}`} className="flex justify-between gap-4">
              <span>
                {l.quantity} × {l.name}
                {l.option ? ` (${l.option})` : ""}
              </span>
              <span className="tabular-nums">{formatPrice(l.unitPriceCents * l.quantity)}</span>
            </li>
          ))}
        </ul>
        <dl className="mt-6 space-y-2 tabular-nums">
          <div className="flex justify-between">
            <dt>Shipping</dt>
            <dd>{shipping === 0 ? "Free" : formatPrice(shipping)}</dd>
          </div>
          <div className="flex justify-between text-lead font-medium">
            <dt>Total</dt>
            <dd>{formatPrice(subtotal + shipping)}</dd>
          </div>
        </dl>
        {state.error && (
          <p role="alert" className="mt-6 text-danger">
            {state.error}
          </p>
        )}
        <button type="submit" className="btn btn-accent mt-8 w-full" disabled={pending}>
          {pending ? "Placing your order…" : "Place demo order"}
        </button>
      </aside>
    </form>
  );
}

function Field({
  name,
  label,
  wide = false,
  required = true,
  ...rest
}: {
  name: string;
  label: string;
  wide?: boolean;
  required?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className={wide ? "sm:col-span-2" : undefined}>
      <label htmlFor={`co-${name}`} className="field-label">
        {label}
      </label>
      <input id={`co-${name}`} name={name} required={required} className="field" {...rest} />
    </div>
  );
}
