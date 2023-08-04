/** @type {import('next').NextConfig} */


const nextConfig = {
    env: {
      BASE_URL: process.env.TEST_DOMAIN,
      USERNAME: process.env.USER_NAME,
      PASSWORD: process.env.PASSWORD,
    }
}

module.exports = nextConfig
