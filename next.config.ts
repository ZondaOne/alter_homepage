import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Webpack configuration for SVG support
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },

  // Configuration for external images
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**', // allows any path within this domain
      },
      // You can add more domains here if needed
      // { protocol: 'https', hostname: 'another-domain.com', pathname: '/**' }
    ],
  },
};

export default nextConfig;
