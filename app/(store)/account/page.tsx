import { desc, eq } from "drizzle-orm";
import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { db } from "@/lib/db";
import { orders } from "@/lib/db/schema";
import { formatPrice } from "@/lib/money";
import { requireUser } from "@/lib/session";
import { SignOutButton } from "./sign-out-button";

export const metadata: Metadata = {
  title: "Your account",
  robots: { index: false },
};

export default function AccountPage() {
  return (
    <Suspense fallback={<div className="min-h-[60svh]" aria-busy="true" />}>
      <Account />
    </Suspense>
  );
}

async function Account() {
  const user = await requireUser("/account");
  const history = await db.query.orders.findMany({
    where: eq(orders.userId, user.id),
    orderBy: desc(orders.createdAt),
    with: { items: true },
  });
  const date = new Intl.DateTimeFormat("en-US", { dateStyle: "medium" });

  return (
    <section className="wrap grid gap-12 pt-10 pb-20 md:grid-cols-[1fr_2fr] md:pt-16">
      <div>
        <h1 className="text-[clamp(2.25rem,4.4vw,3.5rem)] leading-none">Hello, {user.name.split(" ")[0]}</h1>
        <p className="mt-4 text-ink-soft">{user.email}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          {user.role === "admin" && (
            <Link href="/admin" className="btn">
              Manage products
            </Link>
          )}
          <SignOutButton />
        </div>
      </div>
      <div>
        <h2 className="text-[2rem]">Your orders</h2>
        {history.length === 0 ? (
          <p className="sheet mt-6 p-6">
            No orders yet.{" "}
            <Link href="/shop" className="link">
              Find some paper
            </Link>
            .
          </p>
        ) : (
          <ul className="mt-6 space-y-4">
            {history.map((o) => (
              <li key={o.id} className="sheet p-6">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <p className="font-display text-xl font-bold">{o.reference}</p>
                  <p className="text-small text-ink-soft">{date.format(o.createdAt)}</p>
                </div>
                <p className="mt-2">{o.items.map((i) => `${i.quantity} × ${i.name}`).join(", ")}</p>
                <p className="mt-2 font-extrabold tabular-nums">{formatPrice(o.totalCents)}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
