/** @type {import('next').NextConfig} */
const nextConfig = {
    allowedDevOrigins: ['http://localhost:3000']
};

export default {
  images: {
    domains: ['cdn.jackpot.bet'],
  },
};
