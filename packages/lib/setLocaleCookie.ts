// import { COOKIE_DOMAIN } from '@repo/i18n/next/client'
// import { LANGUAGE_COOKIE } from '@repo/i18n/settings'
// import Cookies from 'universal-cookie'

// import { isDesktop } from './env'
// import { getDesktopLocaleCookie, setDesktopLocaleCookie } from './setDesktopLocaleCookie'

// export function setLocaleCookie(value: string) {
// 	if (isDesktop) {
// 		return setDesktopLocaleCookie(value)
// 	}

// 	const cookies = new Cookies()
// 	cookies.set(LANGUAGE_COOKIE, value, { domain: COOKIE_DOMAIN, path: '/' })
// }

// export function getLocaleCookie() {
// 	if (isDesktop) {
// 		return Promise.resolve(getDesktopLocaleCookie())
// 	}

// 	const cookies = new Cookies()
// 	return cookies.get(LANGUAGE_COOKIE)
// }
