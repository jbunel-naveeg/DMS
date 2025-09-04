/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['images.unsplash.com'],
  },
  async redirects() {
    return [
      {
        source: '/app',
        destination: 'https://app.naveeg.com',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
