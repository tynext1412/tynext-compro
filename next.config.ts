import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Server Node minimal di .next/standalone, dipakai oleh Dockerfile untuk deploy.
  output: "standalone",
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
