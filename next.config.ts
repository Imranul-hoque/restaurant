import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "u7ln15t0v7.ufs.sh",
        protocol: "https",
        pathname : "/**"
      },
    ],
  },
};

export default nextConfig;
