/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["images.microcms-assets.io", "gouramiengineering.microcms.io"],
  },
};

module.exports = nextConfig;
