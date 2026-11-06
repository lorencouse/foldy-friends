import type { Metadata } from "next";
import Image from "next/image";
import { Suspense } from "react";
import { SignInForm } from "./sign-in-form";

export const metadata: Metadata = {
  title: "Sign in",
  robots: { index: false },
};

export default function SignInPage() {
  return (
    <section className="wrap grid items-center gap-12 pt-10 pb-20 md:grid-cols-2 md:pt-16">
      <div className="max-w-md">
        <h1 className="text-[clamp(2.25rem,4.4vw,3.5rem)] leading-none">Sign in</h1>
        <p className="mt-4 text-lead text-ink-soft">To write reviews and see your orders.</p>
        <Suspense fallback={<div className="mt-10 min-h-80" />}>
          <SignInForm />
        </Suspense>
      </div>
      <div
        className="dogear creases relative hidden aspect-square w-full max-w-[460px] items-center justify-center justify-self-center rounded-[28px_0_28px_28px] bg-sky-pale md:flex"
        aria-hidden="true"
      >
        <span className="flap" />
        <span className="absolute top-[14%] left-[10%] z-[2] -rotate-5 rounded-[16px_16px_16px_4px] border-2 border-ink bg-card px-4 py-2.5 font-display text-lg leading-none font-extrabold">
          Welcome back!
        </span>
        <Image
          src="/assets/dog-mascot.png"
          alt=""
          width={388}
          height={378}
          className="w-[62%] rotate-4 mix-blend-multiply"
        />
      </div>
    </section>
  );
}
