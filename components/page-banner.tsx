import type { ReactNode } from "react";

/** The creased colour band at the top of a listing page. Its art or photo goes in `children`. */
export function PageBanner({
  tone,
  ink,
  dark = false,
  eyebrow,
  title,
  blurb,
  textClassName = "max-w-[560px]",
  children,
}: {
  tone: string;
  /** Eyebrow colour; on a dark band, the blurb's too. */
  ink: string;
  dark?: boolean;
  eyebrow: string;
  title: string;
  blurb: string;
  textClassName?: string;
  children: ReactNode;
}) {
  return (
    <section className="pt-8 pb-6 sm:pt-10">
      <div className="wrap">
        <div
          className={`${dark ? "creases-dark text-paper" : "creases"} relative flex flex-wrap items-center justify-between gap-6 overflow-hidden rounded-[28px] p-[clamp(24px,4vw,48px)]`}
          style={{ backgroundColor: tone }}
        >
          <div className={`flex flex-[1_1_320px] flex-col gap-2.5 ${textClassName}`}>
            <p className="eyebrow" style={{ color: ink }}>
              {eyebrow}
            </p>
            <h1 className="text-[clamp(2.5rem,5vw,4rem)] leading-none tracking-[-0.02em]">{title}</h1>
            <p style={{ color: dark ? ink : undefined }}>{blurb}</p>
          </div>
          {children}
        </div>
      </div>
    </section>
  );
}
