import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/Login/", // Replace with your desired path
        permanent: false, // Set to true for 308 redirects (SEO-friendly)
      },
    ];
  },
};

export default nextConfig;
