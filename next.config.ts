import type { NextConfig } from "next";
import { PrismaPlugin } from "@prisma/nextjs-monorepo-workaround-plugin";



const nextConfig: NextConfig = {
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.plugins = [...config.plugins, new PrismaPlugin()];
      config.externals = [...(config.externals || []), "@prisma/client"];
    }
    return config;
  },
  images: {
    remotePatterns: [
      {
        hostname: "u7ln15t0v7.ufs.sh",
        protocol: "https",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
