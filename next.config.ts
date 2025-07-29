import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
    // Optional: Uncomment if using a custom Cloudinary loader
    // loader: 'cloudinary',
    // path: 'https://res.cloudinary.com/your-account',
  },

  env: {
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
  },

  serverRuntimeConfig: {
    geminiApiKey: process.env.GEMINI_API_KEY,
  },

  publicRuntimeConfig: {
    geminiEnabled: process.env.NEXT_PUBLIC_GEMINI_ENABLED === 'true',
  },

  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
      allowedOrigins: ['https://your-app.onrender.com'], // Add Render URL
    },
    serverComponentsExternalPackages: ['@google/generative-ai'],
  },

  webpack: (config) => {
    config.resolve.alias['@'] = path.join(__dirname, 'src');
    return config;
  },
};

export default nextConfig;