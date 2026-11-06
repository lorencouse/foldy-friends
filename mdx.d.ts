// Each guide in content/guides exports its YAML frontmatter as `guide`
// (remark-mdx-frontmatter); lib/guides.ts checks its shape.
declare module "*.mdx" {
  import type { MDXContent } from "mdx/types";

  export const guide: unknown;
  const Content: MDXContent;
  export default Content;
}
