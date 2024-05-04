/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        AUTH_SECRET: process.env.AUTH_SECRET,
        UPLOADTHING_SECRET: process.env.UPLOADTHING_SECRET
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**.googleusercontent.com',
            },
            {
                protocol: 'https',
                hostname: 'utfs.io',
            }
        ],
    }
};

export default nextConfig;
