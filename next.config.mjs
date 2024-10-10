/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['prod-img.thesouledstore.com', 
      'tss-static-images.gumlet.io'],
  },
};

export default nextConfig;
