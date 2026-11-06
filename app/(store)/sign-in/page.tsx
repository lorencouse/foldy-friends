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
    <section className="grid gap-12 pt-10 md:grid-cols-2 md:pt-16">
      <div className="max-w-md">
        <h1 className="text-head">Sign in</h1>
        <p className="mt-4 text-lead text-muted">To write reviews and see your orders.</p>
        <Suspense fallback={<div className="mt-10 min-h-80" />}>
          <SignInForm />
        </Suspense>
      </div>
      <div className="relative hidden aspect-[4/5] overflow-hidden md:block">
        <Image
          src="/images/senbazuru-spread.jpg"
          alt="Two pages of a 1797 book on folding paper cranes"
          fill
          sizes="50vw"
          className="object-cover"
        />
      </div>
    </section>
  );
}
