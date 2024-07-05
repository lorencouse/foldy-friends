// next.config.js
module.exports = {
  exportPathMap: async function (
    defaultPathMap,
    { dev, dir, outDir, distDir, buildId },
  ) {
    return {
      "/": { page: "/" },
      // Add other pages if needed
    };
  },
  trailingSlash: true,
};
