/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["picsum.photos"], // ✅ allow external images
  },
};


export default nextConfig;
