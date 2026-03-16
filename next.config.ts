import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  compiler: {
    // Remove console.log in production builds
    removeConsole: process.env.NODE_ENV === "production" ? { exclude: ["error", "warn"] } : false,
  },
  experimental: {
    // Enable optimized package imports for lucide-react (tree-shake unused icons)
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
};

export default nextConfig;
