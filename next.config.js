require('dotenv').config();
const webpack = require("webpack");
const withBundleAnalyzer = require("@zeit/next-bundle-analyzer");
const withSass = require("@zeit/next-sass");
const withCSS = require('@zeit/next-css');
const withFonts = require('next-fonts');
const path = require("path");

const nextConfig = {
  analyzeServer: ["server", "both"].includes(process.env.BUNDLE_ANALYZE),
  analyzeBrowser: ["browser", "both"].includes(process.env.BUNDLE_ANALYZE),
  bundleAnalyzerConfig: {
    server: {
      analyzerMode: "static",
      reportFilename: "../bundles/server.html"
    },
    browser: {
      analyzerMode: "static",
      reportFilename: "bundles/client.html"
    }
  },
  exportPathMap: function() {
    return {
      "/": { page: "/" }
    };
  },
  webpack: config => {
    config.resolve.modules = [
      path.resolve("./node_modules"),
      path.resolve(".")
    ];
    config.plugins.push(new webpack.IgnorePlugin(/\/__tests__\//));
    // Fixes npm packages that depend on `fs` module
    config.node = {
      fs: "empty"
    };
    config.plugins.push(
      new webpack.EnvironmentPlugin(process.env)
    );

    return config;
  }
};

module.exports = withSass(withCSS(withFonts(withBundleAnalyzer(nextConfig))));
