'use client'

import { Toaster } from '@repo/ui/sonner'
import { ThemeProvider } from '@repo/ui/theme'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SessionProvider } from 'next-auth/react'
import { useState } from 'react'

export function Providers({ children }: { children: React.ReactNode }) {
	const [queryClient] = useState(() => new QueryClient())

	return (
		<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
			<QueryClientProvider client={queryClient}>
				<SessionProvider>
					<Toaster position="top-right" />
					{children}
				</SessionProvider>
			</QueryClientProvider>
		</ThemeProvider>
	)
}
