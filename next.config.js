/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        domains:["m.media-amazon.com", "lh3.googleusercontent.com","cloud.appwrite.io"]
    },
    eslint: {
        ignoreDuringBuilds: true,
      },

}

module.exports = nextConfig
