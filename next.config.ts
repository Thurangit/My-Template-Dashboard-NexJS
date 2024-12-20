import type { NextConfig } from "next";
const { i18n } = require('./next-i18next.config');

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['teamsite.msc.com', 'th.bing.com'],
  },
};

export default nextConfig;

module.exports = {
  i18n,
  reactStrictMode: true,
  images: {
    domains: ['teamsite.msc.com', 'th.bing.com'],
  },
};