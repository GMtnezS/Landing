import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  env: {
    // Automatically set the correct base URL for Vercel preview deployments.
    // For production and local dev, APP_BASE_URL is set in .env.local.
    APP_BASE_URL:
      process.env.VERCEL_ENV === 'preview'
        ? `https://${process.env.VERCEL_BRANCH_URL}`
        : process.env.APP_BASE_URL,
  },
}

export default nextConfig
