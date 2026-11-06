import { eq } from "drizzle-orm";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { db } from "@/lib/db";
import { orders } from "@/lib/db/schema";
import { formatPrice } from "@/lib/money";
import { getUser } from "@/lib/session";
import { ClearCartOnMount } from "./clear-cart";

export const metadata: Metadata = {
  title: "Order placed",
  robots: { index: false },
};

export default function OrderPlacedPage({ params }: PageProps<"/checkout/[reference]">) {
  return (
    <Suspense fallback={<div className="min-h-[60svh]" />}>
      <OrderPlaced params={params} />
    </Suspense>
  );
}

async function OrderPlaced({ params }: { params: PageProps<"/checkout/[reference]">["params"] }) {
  const { reference } = await params;
  const order = await db.query.orders.findFirst({
    where: eq(orders.reference, reference),
    with: { items: true },
  });
  if (!order) notFound();
  // Only the browser that placed the order, or its signed-in owner, may see it.
  const placedHere = (await cookies()).get("ff_order")?.value === order.reference;
  if (!placedHere) {
    const user = await getUser();
    if (!user || user.id !== order.userId) notFound();
  }
  return (
    <section className="wrap grid items-start gap-12 pt-10 pb-20 md:grid-cols-2 md:pt-16">
      <ClearCartOnMount />
      <div>
        <span className="tape -rotate-2" style={{ backgroundColor: "var(--color-mint)" }}>
          Demo order
        </span>
        <h1 className="mt-4 text-[clamp(2.25rem,4.4vw,3.5rem)] leading-none">
          Order {order.reference} placed
        </h1>
        <p className="mt-5 max-w-[44ch] text-lead text-ink-soft">
          Thank you, {order.shipping.name.split(" ")[0]}. In a real shop a confirmation would now be on its
          way to {order.email}. This one is a demo, so nothing was charged.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/shop" className="btn btn-primary">
            Keep shopping
          </Link>
          <Link href="/account" className="btn">
            Your orders
          </Link>
        </div>
      </div>
      <div className="sheet sheet-raised h-fit overflow-hidden p-6 sm:p-8">
        <h2 className="text-[1.75rem]">Receipt</h2>
        <ul className="mt-6 space-y-3 tabular-nums">
          {order.items.map((i) => (
            <li key={i.id} className="flex justify-between gap-4">
              <span>
                {i.quantity} × {i.name}
                {i.option ? ` (${i.option})` : ""}
              </span>
              <span>{formatPrice(i.unitPriceCents * i.quantity)}</span>
            </li>
          ))}
          <li className="flex justify-between">
            <span>Shipping</span>
            <span>{order.shippingCents === 0 ? "Free" : formatPrice(order.shippingCents)}</span>
          </li>
        </ul>
        <div className="dashed-rule mt-6" aria-hidden="true" />
        <p className="mt-4 flex items-baseline justify-between font-display text-2xl font-extrabold">
          <span>Total</span>
          <span className="tabular-nums">{formatPrice(order.totalCents)}</span>
        </p>
      </div>
    </section>
  );
}
