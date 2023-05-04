/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.fallback = { fs: false };
    return config;
  },
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
