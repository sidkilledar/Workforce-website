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
        destination: "/#product",
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
        destination: "/#industries",
        permanent: true,
      },
      // Legacy industry slugs (see PRODUCT.md and .impeccable/critique) mapped
      // explicitly so they never shadow the new /industries/[industry] pages.
      {
        source: "/industries/campuses",
        destination: "/industries/campus",
        permanent: true,
      },
      {
        source: "/industries/chains",
        destination: "/industries/restaurants",
        permanent: true,
      },
      {
        source: "/industries/other",
        destination: "/#industries",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
