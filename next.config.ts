import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Le immagini sono servite da R2 tramite la route /api/media.
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
