/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: ['books.google.com'],
	},
	reactStrictMode: true,
	env: {
		host: '0.0.0.0', 
		port: '80', 
	},
	eslint: {
		ignoreDuringBuilds: true,
	},
}

module.exports = nextConfig
