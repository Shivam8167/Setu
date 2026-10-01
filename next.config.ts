import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/founder/:path*",
        destination: "/:path*",
        permanent: false,
      },
      {
        source: "/engineering-lead/:path*",
        destination: "/:path*",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
