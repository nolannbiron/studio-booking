import { COOKIE_DOMAIN } from '@repo/i18n/next/client'
import { LANGUAGE_COOKIE } from '@repo/i18n/settings'
import Cookies from 'universal-cookie'

export function setLocaleCookie(value: string) {
	const cookies = new Cookies()
	cookies.set(LANGUAGE_COOKIE, value, { domain: COOKIE_DOMAIN, path: '/' })
}

export function getLocaleCookie() {
	const cookies = new Cookies()
	return cookies.get(LANGUAGE_COOKIE)
}
