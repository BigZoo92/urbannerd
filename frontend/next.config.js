/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
    trailingSlash: true,
    output: 'export',
	images: {
		unoptimized: true
	},
	env: {
		NEXT_PUBLIC_STRIPE_PUBLIC_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY,
		SERVER_URL: process.env.SERVER_URL,
	  }
};

module.exports = nextConfig;
