/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['prod-img.thesouledstore.com', 
      'tss-static-images.gumlet.io'],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/categories?category=mens',
        permanent: false, 
      },
    ];
  },
};

export default nextConfig;
