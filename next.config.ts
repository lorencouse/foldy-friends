import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "DENY" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
];

const nextConfig: NextConfig = {
  output: "standalone",
  poweredByHeader: false,
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

// Origami guides are MDX files in content/guides with YAML frontmatter, which
// is exported from each file as `guide`. Plugins are named by string so the
// Turbopack build can load them.
const withMDX = createMDX({
  options: {
    remarkPlugins: ["remark-frontmatter", ["remark-mdx-frontmatter", { name: "guide" }]],
  },
});

export default withMDX(nextConfig);
