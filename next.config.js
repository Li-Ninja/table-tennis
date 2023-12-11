/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    isProduction: process.env.NODE_ENV === 'production' ? 'true' : 'false',
  },
};

module.exports = nextConfig;
