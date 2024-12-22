import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "pbs.twimg.com",
      "res.cloudinary.com",
    ], // Add required domains here
  },
};

export default nextConfig;
