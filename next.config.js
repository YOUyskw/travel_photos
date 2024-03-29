/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "lh3.googleusercontent.com",
      },
      {
        hostname: "firebasestorage.googleapis.com",
      },
      {
        hostname: "images.*.ceo",
      },
    ],
    domains: ["firebasestorage.googleapis.com"],
  },
  experimental: {
    appDir: true,
  },
};

module.exports = nextConfig;
