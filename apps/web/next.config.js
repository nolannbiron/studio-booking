require('dotenv').config({ path: '../../.env' })
// if (!process.env.JWT_SECRET) throw new Error('Please set JWT_SECRET')

// if (!process.env.NEXTAUTH_URL && process.env.NEXT_PUBLIC_WEBAPP_URL) {
// 	process.env.NEXTAUTH_URL = `${process.env.NEXT_PUBLIC_AUTH_WEBAPP_URL}/api/auth`
// }
// if (!process.env.NEXT_PUBLIC_WEBSITE_URL) {
// 	process.env.NEXT_PUBLIC_WEBSITE_URL = process.env.NEXT_PUBLIC_WEBAPP_URL
// }

// if (!process.env.NEXTAUTH_URL) throw new Error('Please set NEXTAUTH_URL')

/** @type {import('next').NextConfig} */
const nextConfig = {
	transpilePackages: [
		'@repo/ui',
		'@repo/feature-auth',
		'@repo/schemas',
		'@repo/types',
		'@repo/lib',
		'@repo/i18n',
		'@repo/config'
	],
	async rewrites() {
		const beforeFiles = [
			{
				source: '/auth/signin',
				destination: '/api/auth/signin'
			},
			{
				source: '/auth/signout',
				destination: '/api/auth/signout'
			}
		]

		return {
			beforeFiles
		}
	},
	async headers() {
		return [
			{
				source: '/auth/:path*',
				headers: [
					{
						key: 'X-Frame-Options',
						value: 'DENY'
					}
				]
			},
			{
				source: '/signup',
				headers: [
					{
						key: 'X-Frame-Options',
						value: 'DENY'
					}
				]
			},
			{
				source: '/:path*',
				headers: [
					{
						key: 'X-Content-Type-Options',
						value: 'nosniff'
					},
					{
						key: 'Referrer-Policy',
						value: 'strict-origin-when-cross-origin'
					}
				]
			}
		]
	},
	async redirects() {
		const redirects = [
			{
				source: '/api/auth/signup',
				destination: '/signup',
				permanent: true
			},
			// {
			// 	source: '/',
			// 	has: [
			// 		{
			// 			type: 'host',
			// 			value: process.env.NEXT_PUBLIC_AUTH_WEBAPP_URL
			// 		}
			// 	],
			// 	destination: '/login',
			// 	permanent: false
			// },
			/* Attempt to mitigate DDoS attack */
			{
				source: '/api/auth/:path*',
				has: [
					{
						type: 'query',
						key: 'callbackUrl',
						// prettier-ignore
						value: "^(?!https?:\/\/).*$"
					}
				],
				destination: '/404',
				permanent: false
			}
		]

		return redirects
	}
}

module.exports = nextConfig
