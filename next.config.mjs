/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["res.cloudinary.com", "lh3.googleusercontent.com"],
  },
  serverRuntimeConfig: {
    secure: false, // Make sure HTTPS is not being forced
  },
};

export default nextConfig;
