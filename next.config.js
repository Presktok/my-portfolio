/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  reactStrictMode: true,
  swcMinify: true,
  // Remove basePath and assetPrefix for Netlify deployment
  // These settings are causing issues with the Netlify deployment
}

module.exports = nextConfig