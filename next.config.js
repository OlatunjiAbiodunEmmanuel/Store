/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        domains:["m.media-amazon.com", "lh3.googleusercontent.com"]
    },
    eslint: {
        ignoreDuringBuilds: true,
      },
    //   api: {
    //     bodyParser: false, 
    //   },
}

module.exports = nextConfig
