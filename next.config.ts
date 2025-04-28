import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
      { protocol: "https", hostname: "b9foza99qd.ufs.sh" },
      {
        protocol: "https",
        hostname: "utfs.io",
      },
    ],
  },
  /* config options here */
};

export default nextConfig;
