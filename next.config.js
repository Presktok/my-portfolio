/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  reactStrictMode: true,
  swcMinify: true,
  assetPrefix: process.env.NODE_ENV === 'production' ? '/my-portfolio' : '',
  basePath: process.env.NODE_ENV === 'production' ? '/my-portfolio' : '',
}

module.exports = nextConfig