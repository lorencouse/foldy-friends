/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals = [...config.externals, "ws", "edge-runtime"];
    }
    return config;
  },
  experimental: {
    optimizePackageImports: ["@cloudflare/next-on-pages"],
  },
};

module.exports = nextConfig;
