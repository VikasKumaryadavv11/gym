/** @type {import('next').NextConfig} */
const nextConfig = {
  // OneDrive applies cloud reparse points to generated cache folders. Keeping
  // Next's transient output outside the synced project prevents EINVAL readlink errors.
  distDir: '../../../../AppData/Local/Temp/ironpeak-next',
  images: {
    // Editorial imagery is remote; bypass Next's server-side optimizer to avoid
    // development-time fetch timeouts when the upstream image CDN is slow.
    unoptimized: true,
    remotePatterns: [{ protocol: 'https', hostname: 'images.unsplash.com' }],
  },
};
module.exports = nextConfig;
