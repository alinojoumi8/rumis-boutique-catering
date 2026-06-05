import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  outputFileTracingRoot: process.cwd(),
  output: isGitHubPages ? "export" : undefined,
  basePath: isGitHubPages ? "/rumis-boutique-catering" : undefined,
  assetPrefix: isGitHubPages ? "/rumis-boutique-catering/" : undefined,
  images: {
    formats: ["image/avif", "image/webp"],
    unoptimized: isGitHubPages
  }
};

export default nextConfig;
