import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV !== "production" || process.argv.includes("dev");
const isVercel = Boolean(process.env.VERCEL);
const isGithubActions = Boolean(process.env.GITHUB_ACTIONS);

// GitHub Pages deploys under a subpath (/rj-portfolio).
// Vercel and local dev serve at the root domain ("").
const basePath =
  process.env.NEXT_PUBLIC_BASE_PATH ??
  (isGithubActions && !isVercel ? "/rj-portfolio" : "");

const nextConfig: NextConfig = {
  output: "export",
  ...(basePath ? { basePath, assetPrefix: basePath } : {}),
  trailingSlash: true,
  allowedDevOrigins: ["192.168.1.2", "192.168.1.*", "localhost"],
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
