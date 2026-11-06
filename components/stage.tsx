"use client";

import { type ReactNode, useEffect, useState } from "react";

/**
 * The fixed half of the home page. Each section in the reading column names a
 * layer with data-stage; the layer for the section in view is shown.
 */
export function Stage({ layers, initial }: { layers: Record<string, ReactNode>; initial: string }) {
  const [active, setActive] = useState(initial);

  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>("[data-stage]");
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive((e.target as HTMLElement).dataset.stage ?? initial);
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    for (const s of sections) io.observe(s);
    return () => io.disconnect();
  }, [initial]);

  return (
    <div className="relative h-full w-full overflow-hidden bg-night">
      {Object.entries(layers).map(([key, node]) => (
        <div
          key={key}
          className="absolute inset-0 transition-opacity duration-700"
          style={{
            opacity: active === key ? 1 : 0,
            pointerEvents: active === key ? "auto" : "none",
          }}
          aria-hidden={active === key ? undefined : true}
          inert={active !== key}
        >
          {node}
        </div>
      ))}
    </div>
  );
}
