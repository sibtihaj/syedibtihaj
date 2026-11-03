import nextMDX from "@next/mdx";
import remarkGfm from "remark-gfm";
import path from "node:path";
import { fileURLToPath } from "node:url";

// A stray package-lock.json in the home directory makes Next.js guess the wrong
// workspace root; pin tracing to this project.
const projectRoot = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: projectRoot,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
    ],
  },
};

const withMDX = nextMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkGfm],
    // Avoid @mapbox/rehype-prism here: it can break MDX <code> trees and surface as React internal errors in dev.
  },
});

export default withMDX(nextConfig);
