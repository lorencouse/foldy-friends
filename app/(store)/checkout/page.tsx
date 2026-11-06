import type { Metadata } from "next";
import { Suspense } from "react";
import { getUser } from "@/lib/session";
import { CheckoutForm } from "./checkout-form";

export const metadata: Metadata = {
  title: "Checkout",
  robots: { index: false },
};

export default function CheckoutPage() {
  return (
    <section className="pt-10 md:pt-16">
      <h1 className="text-head">Checkout</h1>
      <p className="mt-4 max-w-[52ch] text-lead text-muted">
        This is a portfolio shop. Placing an order records it, but nothing is charged or shipped.
      </p>
      <Suspense fallback={<div className="mt-10 min-h-[60svh]" />}>
        <CheckoutWithUser />
      </Suspense>
    </section>
  );
}

async function CheckoutWithUser() {
  const user = await getUser();
  return <CheckoutForm defaultEmail={user?.email ?? ""} defaultName={user?.name ?? ""} />;
}
