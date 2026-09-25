import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Project images are resized and served as WebP automatically (much smaller than the originals)
    formats: ["image/webp"],
    qualities: [75],
  },
};

export default nextConfig;