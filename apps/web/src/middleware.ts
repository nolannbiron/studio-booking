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

	if (hostname === `auth.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`) {
		if (
			!session &&
			!path.startsWith('/login') &&
			!path.startsWith('/register') &&
			!path.startsWith('/forgot-password') &&
			!path.startsWith('/reset-password')
		) {
			return NextResponse.redirect(new URL('/login', req.url))
		} else if (session && path !== '/logout') {
			return NextResponse.redirect(`${process.env.NEXT_PUBLIC_WEBAPP_URL}`)
		}

		return NextResponse.rewrite(new URL(`/auth${path === '/' ? '' : path}`, req.url))
	}

	// rewrite root application to `/home` folder
	if (hostname === process.env.NEXT_PUBLIC_ROOT_DOMAIN) {
		return NextResponse.rewrite(new URL(`/marketing${path === '/' ? '' : path}`, req.url))
	}

	// rewrite everything else to `/client/[domain]/[slug] dynamic route
	return NextResponse.rewrite(
		new URL(
			`/team/${hostname.replace(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`, '')}${path === '/' ? '' : path}`,
			req.url
		)
	)
}
