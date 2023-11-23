/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental:{
    outputStandalone: true
  },

  headers: {
    'Access-Control-Allow-Origin': '*',
  }
}

module.exports = nextConfig
