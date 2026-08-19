import type { NextConfig } from "next";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const apiImagePattern = apiUrl ? (() => {
  const url = new URL(apiUrl);
  return {
    protocol: url.protocol.slice(0, -1) as "http" | "https",
    hostname: url.hostname,
    port: url.port,
    pathname: "/storage/**",
  };
})() : null;

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
      ...(apiImagePattern ? [apiImagePattern] : []),
    ],
  },
};

export default nextConfig;
