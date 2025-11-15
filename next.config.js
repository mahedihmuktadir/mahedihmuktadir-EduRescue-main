/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.cache = { type: "memory" };
    return config;
  },
};
module.exports = nextConfig;
