import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    resolveAlias: {
      canvas: "./src/lib/empty-module.ts",
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.figma.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cozybakesinc.apianca.online",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
