'use client'

import { setLocaleCookie } from '@repo/i18n/hooks/action'
import { LocaleProvider } from '@repo/i18n/hooks/locale-provider'
import type { Locale } from '@repo/prisma/enums'
import { Toaster } from '@repo/ui/sonner'
import { NextThemeProvider } from '@repo/ui/theme'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SessionProvider, useSession } from 'next-auth/react'
import type { PropsWithChildren } from 'react'
import { useState } from 'react'

export function Providers({ children, locale }: PropsWithChildren<{ locale: Locale }>) {
	const { data } = useSession()
	const [queryClient] = useState(() => new QueryClient())

	const shouldUpdateLocale = data?.user?.locale && data?.user?.locale !== locale

	return (
		<LocaleProvider
			action={setLocaleCookie}
			isCookieDefined={!shouldUpdateLocale}
			value={data?.user?.locale ?? locale}
		>
			<NextThemeProvider attribute="class" defaultTheme="system" enableSystem>
				<QueryClientProvider client={queryClient}>
					<SessionProvider>
						<Toaster position="top-right" />
						{children}
					</SessionProvider>
				</QueryClientProvider>
			</NextThemeProvider>
		</LocaleProvider>
	)
}
