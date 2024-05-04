/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        AUTH_SECRET: process.env.AUTH_SECRET,
        UPLOADTHING_SECRET: process.env.UPLOADTHING_SECRET
    }
};

export default nextConfig;
