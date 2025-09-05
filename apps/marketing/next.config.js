/** @type {import('next').NextConfig} */
const nextConfig = {
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
