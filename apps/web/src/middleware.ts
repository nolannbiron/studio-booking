import logger from '@repo/lib/logger'
import { safeStringify } from '@repo/lib/safeStringify'
import { getToken } from 'next-auth/jwt'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export const config = {
	matcher: [
		/*
		 * Match all paths except for:
		 * 1. /api routes
		 * 2. /_next (Next.js internals)
		 * 3. /_static (inside /public)
		 * 4. all root files inside /public (e.g. /favicon.ico)
		 */
		'/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)'
	]
}

export default async function middleware(req: NextRequest) {
	const url = req.nextUrl

	// Get hostname of request (e.g. demo.vercel.pub, demo.localhost:3000)
	const hostname = req.headers.get('host')!
	// .replace('.localhost:3000', `.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`)

	const searchParams = req.nextUrl.searchParams.toString()
	// Get the pathname of the request (e.g. /, /about, /blog/first-post)
	const path = `${url.pathname}${searchParams.length > 0 ? `?${searchParams}` : ''}`

	const session = await getToken({ req, secret: process.env.JWT_SECRET })

	logger.info('middleware', safeStringify({ hostname, path, session }))

	// rewrites for app pages
	if (hostname == `app.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`) {
		if (
			!session &&
			path !== '/login' &&
			path !== '/register' &&
			path !== '/forgot-password' &&
			!path.startsWith('/reset-password')
		) {
			return NextResponse.redirect(new URL('/login', req.url))
		} else if (
			session &&
			(path === '/login' ||
				path === '/register' ||
				path === '/forgot-password' ||
				path.startsWith('/reset-password'))
		) {
			return NextResponse.redirect(new URL('/', req.url))
		}

		return NextResponse.rewrite(new URL(`/app${path === '/' ? '' : path}`, req.url))
	}

	if (hostname === `auth.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`) {
		if (
			!path.startsWith('/login') &&
			!path.startsWith('/teams') &&
			!path.startsWith('/logout') &&
			!path.startsWith('/register') &&
			!path.startsWith('/forgot-password') &&
			path !== '/'
		) {
			return NextResponse.error()
		}

		if (!session && path !== '/login' && path !== '/register' && path !== '/forgot-password') {
			return NextResponse.redirect(new URL('/login', req.url))
		} else if (session && (path == '/login' || path == '/register' || path == '/forgot-password')) {
			return NextResponse.redirect(new URL('/teams', req.url))
		}

		return NextResponse.rewrite(new URL(`/app${path === '/' ? '' : path}`, req.url))
	}

	// rewrite root application to `/home` folder
	if (hostname === process.env.NEXT_PUBLIC_ROOT_DOMAIN) {
		return NextResponse.rewrite(new URL(`/marketing${path === '/' ? '' : path}`, req.url))
	}

	// if (path.startsWith('/dashboard') || path.startsWith('/settings')) {
	// 	if (!session) {
	// 		return NextResponse.redirect('https://app.cal.localhost/login')
	// 	}
	// }

	// rewrite everything else to `/client/[domain]/[slug] dynamic route
	return NextResponse.rewrite(
		new URL(
			`/team/${hostname.replace(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`, '')}${path === '/' ? '' : path}`,
			req.url
		)
	)
}
