'use client'

import { setLocaleCookie } from '@repo/i18n/hooks/action'
import { LocaleProvider } from '@repo/i18n/hooks/locale-provider'
import type { Locale } from '@repo/prisma/enums'
import { Toaster } from '@repo/ui/sonner'
import { NextThemeProvider } from '@repo/ui/theme'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import type { PropsWithChildren } from 'react'
import { useState } from 'react'

export function Providers({
	children,
	session,
	locale
}: PropsWithChildren<{ locale: Locale; session: Session | null }>) {
	const [queryClient] = useState(() => new QueryClient())

	const shouldUpdateLocale = session?.user?.locale && session?.user?.locale !== locale

	return (
		<SessionProvider>
			<LocaleProvider
				action={setLocaleCookie}
				isCookieDefined={!shouldUpdateLocale}
				value={session?.user?.locale ?? locale}
			>
				<NextThemeProvider attribute="class" defaultTheme="system" enableSystem>
					<QueryClientProvider client={queryClient}>
						<Toaster position="top-right" />
						{children}
					</QueryClientProvider>
				</NextThemeProvider>
			</LocaleProvider>
		</SessionProvider>
	)
}
