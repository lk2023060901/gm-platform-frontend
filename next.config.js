/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['antd', '@ant-design/icons'],
  eslint: {
    ignoreDuringBuilds: false,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
}

module.exports = nextConfig