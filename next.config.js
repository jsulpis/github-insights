const webpack = require("webpack");
const path = require("path");
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true"
});

const nextConfig = {
  exportPathMap: function () {
    return {
      "/": { page: "/" }
    };
  },
  webpack: config => {
    config.resolve.modules = [path.resolve("./node_modules"), path.resolve("src")];
    config.plugins.push(new webpack.IgnorePlugin(/\/__tests__\//));
    return config;
  }
};

module.exports = withBundleAnalyzer(nextConfig);
