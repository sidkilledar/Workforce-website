import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
  async redirects() {
    return [
      {
        source: "/product",
        destination: "/#capabilities",
        permanent: true,
      },
      {
        source: "/pricing",
        destination: "/demo",
        permanent: true,
      },
      {
        source: "/about",
        destination: "/",
        permanent: true,
      },
      {
        source: "/industries",
        destination: "/#capabilities",
        permanent: true,
      },
      {
        source: "/industries/:path*",
        destination: "/#capabilities",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
