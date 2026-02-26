import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  env: {
    NHOST_SUBDOMAIN: process.env['NHOST_SUBDOMAIN'],
    NHOST_REGION: process.env['NHOST_REGION'],
  },
}

export default nextConfig
