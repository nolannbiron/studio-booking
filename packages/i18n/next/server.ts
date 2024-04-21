import type { Locale } from '@repo/prisma/enums'
import { createInstance } from 'i18next'
import resourcesToBackend from 'i18next-resources-to-backend'
import { cookies } from 'next/headers'
import { initReactI18next } from 'react-i18next/initReactI18next'

import { LANGUAGE_COOKIE, getOptions } from '../settings'

async function initI18next(lang: Locale) {
	const i18nInstance = createInstance()
	await i18nInstance
		.use(initReactI18next)
		.use(
			resourcesToBackend(
				// Get the JSON file that matches the locale and namespace
				(lang: string) => import(`../messages/${lang}.json`)
			)
		)
		// Initialize i18next with the options we created earlier
		.init(getOptions(lang))

	return i18nInstance
}

// This function will be used in our server components for the translation
export async function createTranslation() {
	const locale = getLocale()
	const i18nextInstance = await initI18next(locale)

	return {
		t: i18nextInstance.getFixedT(locale)
	}
}

// Utility function to get the locale from server components
export function getLocale(): Locale {
	return cookies().get(LANGUAGE_COOKIE)?.value as Locale
}
