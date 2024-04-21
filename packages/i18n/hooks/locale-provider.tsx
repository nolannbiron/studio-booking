'use client'

import type { Locale } from '@repo/prisma/enums'
import { createContext, useContext, useEffect } from 'react'

import { FALLBACK_LOCALE } from '../settings'
import { setLocaleCookie } from './action'

const Context = createContext<Locale>(FALLBACK_LOCALE)

export function LocaleProvider({
	children,
	value,
	isCookieDefined
}: {
	children: React.ReactNode
	value: Locale
	isCookieDefined: boolean
}) {
	useEffect(() => {
		if (!isCookieDefined && value) {
			setLocaleCookie(value)
		}
	}, [isCookieDefined, value])

	return <Context.Provider value={value}>{children}</Context.Provider>
}

export function useLocale() {
	return useContext(Context)
}
