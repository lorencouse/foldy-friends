// next.config.js
module.exports = {
  // Target must be 'server' for SSR
  target: "server",

  // Custom webpack configuration
  webpack: (config, { isServer }) => {
    // Perform customizations to webpack config
    // Important: return the modified config
    return config;
  },

  // Environment variables
  env: {
    // Define any environment variables you need
    API_URL: process.env.API_URL,
  },

  // Internationalized Routing
  i18n: {
    locales: ["en", "fr", "de"],
    defaultLocale: "en",
  },

  // Redirects
  async redirects() {
    return [
      {
        source: "/old-route",
        destination: "/new-route",
        permanent: true,
      },
    ];
  },

  // Rewrites
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://external-api.example.com/:path*",
      },
    ];
  },

  // Headers
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
        ],
      },
    ];
  },

  // Image Optimization
  images: {
    domains: ["example.com", "another-example.com"],
  },
};
