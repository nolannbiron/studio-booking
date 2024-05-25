// import { COOKIE_DOMAIN } from '@repo/i18n/next/client'
// import { LANGUAGE_COOKIE } from '@repo/i18n/settings'

// export function setDesktopLocaleCookie(value: string) {
// 	electron.session.defaultSession.cookies
// 		.set({
// 			url: 'https://repo.fr',
// 			value,
// 			name: LANGUAGE_COOKIE,
// 			path: '/'
// 		})
// 		.then(() => {
// 			console.log('Cookie set')
// 		})
// }

// export async function getDesktopLocaleCookie() {
// 	console.log(electron)
// 	const cookies = electron.session.defaultSession.cookies
// 	return cookies.get({ url: 'https://repo.fr', name: LANGUAGE_COOKIE }).then((cookies) => {
// 		if (cookies.length) {
// 			return cookies[0].value
// 		}
// 		return undefined
// 	})
// }
