'use server'

import { cookies } from 'next/headers'

import { LANGUAGE_COOKIE } from '../settings'

export async function setLocaleCookie(value: string) {
	cookies().set(LANGUAGE_COOKIE, value, {
		domain: process.env.NEXT_PUBLIC_COOKIE_DOMAIN,
		secure: process.env.NODE_ENV === 'production'
	})

	// It does not matter what we return here
	return {
		status: 'success'
	}
}
