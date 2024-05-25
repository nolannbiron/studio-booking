'use client'

import type { Locale } from '@repo/prisma/enums'
import type { TPublicUser } from '@repo/schemas/user'
import { createContext, useContext } from 'react'

import { FALLBACK_LOCALE } from '../settings'

const Context = createContext<Locale>(FALLBACK_LOCALE)

export function LocaleProvider({
	children,
	value
}: {
	children: React.ReactNode
	value?: TPublicUser['locale']
}) {
	return <Context.Provider value={value || FALLBACK_LOCALE}>{children}</Context.Provider>
}

export function useLocale() {
	return useContext(Context)
}
