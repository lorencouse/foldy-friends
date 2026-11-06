import type { Metadata } from "next";
import { CartView } from "./cart-view";

export const metadata: Metadata = {
  title: "Your cart",
  robots: { index: false },
};

export default function CartPage() {
  return (
    <section className="pt-10 md:pt-16">
      <h1 className="text-head">Your cart</h1>
      <CartView />
    </section>
  );
}
