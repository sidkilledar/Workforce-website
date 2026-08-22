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
        destination: "/#what-it-handles",
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
        destination: "/#who-its-for",
        permanent: true,
      },
      {
        source: "/industries/:path*",
        destination: "/#who-its-for",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
