const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: process.env.NEXT_BUILD_DIR || '.next',
};

module.exports = withNextIntl(nextConfig);
