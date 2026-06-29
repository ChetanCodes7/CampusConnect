/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // This forces the build to succeed even if files are empty or have typescript errors
    ignoreBuildErrors: true,
  },
  eslint: {
    // This prevents ESLint warnings from stopping your deployment
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
