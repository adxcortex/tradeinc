import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      // Avatar uploads go through a Server Action as a data URL; default 1mb
      // is too tight for a small profile picture plus multipart overhead.
      bodySizeLimit: "4mb",
    },
  },
};

export default nextConfig;
