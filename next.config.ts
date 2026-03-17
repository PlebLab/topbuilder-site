import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "framerusercontent.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/topbuilder-exact",
        destination: "/",
        permanent: true,
      },
      {
        source: "/topbuilder-exact/index.html",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
