'use client'

import type { Locale } from '@repo/prisma/enums'
import { createContext, useContext, useEffect } from 'react'

import { FALLBACK_LOCALE } from '../settings'

const Context = createContext<Locale>(FALLBACK_LOCALE)

export function LocaleProvider({
	children,
	value,
	isCookieDefined,
	action
}: {
	children: React.ReactNode
	value: Locale
	isCookieDefined: boolean
	action: (locale: Locale) => void
}) {
	useEffect(() => {
		if (!isCookieDefined && value) {
			action(value)
		}
	}, [isCookieDefined, value, action])

	return <Context.Provider value={value}>{children}</Context.Provider>
}

export function useLocale() {
	return useContext(Context)
}
