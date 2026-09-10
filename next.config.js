/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Editorial imagery is remote; bypass Next's server-side optimizer to avoid
    // development-time fetch timeouts when the upstream image CDN is slow.
    unoptimized: true,
    remotePatterns: [{ protocol: 'https', hostname: 'images.unsplash.com' }],
  },
};
module.exports = nextConfig;
