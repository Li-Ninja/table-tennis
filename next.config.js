const { version } = require('./package.json');

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    isProduction: process.env.NODE_ENV === 'production' ? 'true' : 'false',
    version,
  },
};

module.exports = nextConfig;
