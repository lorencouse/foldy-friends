import Image from "next/image";
import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="wrap grid min-h-[60svh] items-center gap-12 py-16 md:grid-cols-2 md:py-24">
        <div>
          <span className="tape -rotate-2" style={{ backgroundColor: "var(--color-blush)" }}>
            Page not found
          </span>
          <h1 className="mt-4 text-[clamp(2.25rem,4.4vw,3.5rem)] leading-none">This page came unfolded</h1>
          <p className="mt-5 max-w-[40ch] text-lead text-ink-soft">
            We could not find what you were looking for. It may have sold out or moved.
          </p>
          <Link href="/shop" className="btn btn-primary mt-8">
            Go to the shop
          </Link>
        </div>
        <div
          className="dogear creases mx-auto flex aspect-square w-full max-w-sm items-center justify-center rounded-[28px_0_28px_28px] bg-sun-pale"
          aria-hidden="true"
        >
          <span className="flap" />
          <Image
            src="/assets/origami-cat-inverted.png"
            alt=""
            width={192}
            height={192}
            className="w-[60%] -rotate-6 mix-blend-multiply"
          />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
