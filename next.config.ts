import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.vivino.com",
      },
      {
        protocol: "https",
        hostname: "zyn.ca",
      },
      {
        protocol: "https",
        hostname: "unwindbottleshop.com",
      },
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
      },
      {
        protocol: "https",
        hostname: "bevmo.com",
      },
      {
        protocol: "https",
        hostname: "static1.aporvino.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
