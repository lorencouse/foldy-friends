/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    runtime: "edge",
  },
  // This is no longer needed for Workers
  // output: 'export',
};

module.exports = nextConfig;
