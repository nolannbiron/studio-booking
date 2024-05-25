'use client'

import type { Locale } from '@repo/prisma/enums'
import type { i18n } from 'i18next'
import i18next from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import resourcesToBackend from 'i18next-resources-to-backend'
import { useEffect } from 'react'
import { initReactI18next, useTranslation as useTransAlias } from 'react-i18next'

import { useLocale } from '../hooks/locale-provider'
import { LANGUAGE_COOKIE, getOptions, supportedLocales } from '../settings'

const runsOnServerSide = typeof window === 'undefined'

export const COOKIE_DOMAIN = process.env.VITE_PUBLIC_COOKIE_DOMAIN

// Initialize i18next for the client side
i18next
	.use(initReactI18next)
	.use(LanguageDetector)
	.use(resourcesToBackend((lang: string) => import(`../messages/${lang}.json`)))
	.init({
		...getOptions(),
		lng: undefined, // detect the language on the client
		detection: {
			// We only care about the cookie
			order: ['cookie', 'navigator'],
			// If `lookupCookie` is not set, it will use `i18next` as the cookie name
			lookupCookie: LANGUAGE_COOKIE,
			cookieDomain: COOKIE_DOMAIN,

			cookieOptions: {
				domain: COOKIE_DOMAIN,
				secure: process.env.NODE_ENV === 'production'
			},
			// This will automatically update the cookie
			caches: ['cookie']
		},
		preload: runsOnServerSide ? supportedLocales : []
	})

export function useTranslation() {
	const lng = useLocale()

	const translator = useTransAlias()
	const { i18n } = translator

	// Run content is being rendered on server side
	if (runsOnServerSide && lng && i18n.resolvedLanguage !== lng) {
		i18n.changeLanguage(lng)
	} else {
		// Use our custom implementation when running on client side
		// eslint-disable-next-line react-hooks/rules-of-hooks
		useCustomTranslationImplem(i18n, lng)
	}
	return translator
}

function useCustomTranslationImplem(i18n: i18n, lng: Locale) {
	// This effect changes the language of the application when the lng prop changes.
	useEffect(() => {
		if (!lng || i18n.resolvedLanguage === lng) return
		i18n.changeLanguage(lng)
	}, [lng, i18n])
}

export default i18next
