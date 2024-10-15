/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "res.cloudinary.com",
      "lh3.googleusercontent.com",
      "avatars.githubusercontent.com",
      "github.com",
    ],
  },
  serverRuntimeConfig: {
    secure: false,
  },
};

export default nextConfig;
