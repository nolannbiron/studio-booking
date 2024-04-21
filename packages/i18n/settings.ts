import type { Locale } from '@repo/prisma/enums'
import type { InitOptions } from 'i18next'

export const FALLBACK_LOCALE: Locale = 'en'
export const supportedLocales: Locale[] = ['en', 'fr']

// You can name the cookie to whatever you want
export const LANGUAGE_COOKIE = '_next-locale'

export function getOptions(lang = FALLBACK_LOCALE): InitOptions {
	return {
		// debug: true, // Set to true to see console logs,
		supportedLngs: supportedLocales,
		fallbackLng: FALLBACK_LOCALE,
		lng: lang
	}
}
