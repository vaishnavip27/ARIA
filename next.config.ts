const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true, // Disable image optimization for static export
  },
  trailingSlash: true, // Ensure all paths have a trailing slash
};

export default nextConfig;
