/** @type {import('next').NextConfig} */
const nextConfig = {
  serverRuntimeConfig: {
    secure: false, // Make sure HTTPS is not being forced
  },
};

export default nextConfig;
