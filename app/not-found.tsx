import Link from "next/link";
import { SiteHeader } from "@/components/site-header";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto grid min-h-[70svh] max-w-[1440px] items-center gap-12 px-4 py-24 sm:px-8 md:grid-cols-2">
        <div>
          <h1 className="text-head">This page came unfolded</h1>
          <p className="mt-5 max-w-[40ch] text-lead text-muted">
            We could not find what you were looking for. It may have sold out or moved.
          </p>
          <Link href="/shop" className="btn btn-accent mt-8">
            Go to the shop
          </Link>
        </div>
        <svg viewBox="0 0 400 400" className="mx-auto w-full max-w-sm" aria-hidden>
          <polygon points="200,40 360,200 200,360 40,200" fill="#f2c12e" />
          <polygon points="40,200 200,200 200,360" fill="#d9a514" />
        </svg>
      </main>
    </>
  );
}
