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
  // async headers() {
  //   return [
  //     {
  //       source: "/api/auth/:path*",
  //       headers: [
  //         { key: "Access-Control-Allow-Credentials", value: "true" },
  //         {
  //           key: "Access-Control-Allow-Origin",
  //           value: "https://hubstore.vercel.app",
  //         },
  //         { key: "Access-Control-Allow-Methods", value: "GET,POST" },
  //       ],
  //     },
  //   ];
  // },
  /* config options here */
};

export default nextConfig;
