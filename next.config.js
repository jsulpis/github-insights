require("dotenv").config();
const webpack = require("webpack");
const path = require("path");
const withFonts = require("next-fonts");
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
    config.plugins.push(new webpack.EnvironmentPlugin(process.env));
    return config;
  }
};

module.exports = withFonts(withBundleAnalyzer(nextConfig));
