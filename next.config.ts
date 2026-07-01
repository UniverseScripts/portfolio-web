import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // Exclude native binaries from build trace collection.
  // Prevents "Collecting build traces" crash on Linux build environments (Vercel)
  // where sharp/swc binaries differ from the local Windows build.
  outputFileTracingExcludes: {
    "*": [
      "node_modules/sharp/**",
      "node_modules/@swc/**",
      "node_modules/next/dist/compiled/**",
    ],
  },
};

export default nextConfig;
