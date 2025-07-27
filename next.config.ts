import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com'
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com'
      }
    ]
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
    // Correct serverActions configuration
    serverActions: {
      bodySizeLimit: '2mb', // or whatever size limit you need
      allowedOrigins: [], // add domains if needed for CORS
    },
    
    // Other experimental features
    serverComponentsExternalPackages: ['@google/generative-ai'],
  },

  webpack: (config) => {
    return config;
  }
};

export default nextConfig;
