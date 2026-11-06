"use client";

import { useEffect } from "react";

/**
 * Reveals [data-rise] elements once as they enter the viewport, including
 * ones that stream in later or arrive with a client navigation.
 */
export function Rise() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    const scan = () => {
      for (const el of document.querySelectorAll<HTMLElement>("[data-rise]:not([data-rise-seen])")) {
        el.dataset.riseSeen = "";
        io.observe(el);
      }
    };
    scan();
    const mo = new MutationObserver(scan);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => {
      mo.disconnect();
      io.disconnect();
    };
  }, []);
  return null;
}
