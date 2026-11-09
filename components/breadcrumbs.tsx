import Link from "next/link";
import { Fragment } from "react";

/** A trail of links; the crumb without an `href` is the current page. */
export function Breadcrumbs({ items }: { items: { href?: string; label: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-[0.9375rem] font-bold text-ink-soft">
      <ol className="flex flex-wrap gap-x-2">
        {items.map(({ href, label }, i) => (
          <Fragment key={href ?? "current"}>
            {i > 0 && (
              <li aria-hidden="true" className="flex items-center">
                /
              </li>
            )}
            {href ? (
              <li>
                <Link href={href} className="inline-flex min-h-11 items-center hover:text-tomato">
                  {label}
                </Link>
              </li>
            ) : (
              <li className="flex min-w-0 items-center text-ink">
                <span aria-current="page" className="truncate">
                  {label}
                </span>
              </li>
            )}
          </Fragment>
        ))}
      </ol>
    </nav>
  );
}
