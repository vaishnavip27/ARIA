import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  distDir: 'out', // Specify the output directory
  images: {
    unoptimized: true, // Disable image optimization for static export
  },
  trailingSlash: true, // Ensure all paths have a trailing slash
}

export default nextConfig

