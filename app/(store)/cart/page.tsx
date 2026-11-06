import type { Metadata } from "next";
import { CartView } from "./cart-view";

export const metadata: Metadata = {
  title: "Your cart",
  robots: { index: false },
};

export default function CartPage() {
  return (
    <section className="wrap flex flex-col gap-7 pt-10 pb-20">
      <h1 className="text-[clamp(2.375rem,4.4vw,3.5rem)] leading-none tracking-[-0.02em]">Your cart</h1>
      <CartView />
    </section>
  );
}
