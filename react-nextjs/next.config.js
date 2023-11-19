/** @type {import('next').NextConfig} */
const i18n = {
  locales: ['en-US', 'ja-JP'],
  defaultLocale: 'en-US',
};

const nextConfig = {
  swcMinify: false,
  i18n,
}

module.exports = nextConfig;
