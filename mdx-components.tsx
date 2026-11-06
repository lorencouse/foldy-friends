import type { MDXComponents } from "mdx/types";
import Link from "next/link";

// Markdown in the origami guides, in the shop's type and colours. Guide pages
// add their own components (the step-by-step diagrams) on top of these.
const components: MDXComponents = {
  h2: (props) => <h2 className="mt-6 max-w-[760px] text-[clamp(1.625rem,3vw,2.125rem)]" {...props} />,
  h3: (props) => <h3 className="mt-3 max-w-[760px] text-[1.375rem] font-bold" {...props} />,
  p: (props) => <p className="max-w-[760px] text-ink-soft" {...props} />,
  ul: (props) => (
    <ul
      className="flex max-w-[760px] list-disc flex-col gap-2 pl-6 text-ink-soft marker:text-tomato"
      {...props}
    />
  ),
  ol: (props) => (
    <ol
      className="flex max-w-[760px] list-decimal flex-col gap-2 pl-6 text-ink-soft marker:font-bold"
      {...props}
    />
  ),
  strong: (props) => <strong className="font-extrabold text-ink" {...props} />,
  a: ({ href = "", ...props }) =>
    href.startsWith("/") ? (
      <Link href={href} className="link" {...props} />
    ) : (
      <a href={href} className="link" {...props} />
    ),
};

export function useMDXComponents(): MDXComponents {
  return components;
}
