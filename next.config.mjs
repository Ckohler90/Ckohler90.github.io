/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // Handle GitHub Pages subdomain routing if your repo isn't your-username.github.io
  basePath: process.env.NODE_ENV === 'production' ? '/Ckohler90.github.io' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/Ckohler90.github.io' : '',
};

export default nextConfig;
