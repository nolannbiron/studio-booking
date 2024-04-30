import { Providers } from '@/app/providers'
import { getServerSession } from '@repo/feature-auth/lib/getServerSession'
import { getLocale } from '@repo/i18n/next/server'
import '@repo/ui/index.css'
import { Inter } from 'next/font/google'
import localFont from 'next/font/local'

import './globals.css'

const myFont = localFont({
	src: '../../public/fonts/CalSans-SemiBold.woff2',
	variable: '--font-cal',
	display: 'swap'
})

const inter = Inter({
	variable: '--font-inter',
	subsets: ['latin'],
	display: 'swap'
})

export default async function Layout({ children }: { children: React.ReactNode }) {
	const session = await getServerSession()
	const locale = getLocale()

	return (
		<html suppressHydrationWarning className={`${myFont.variable} ${inter.variable}`} lang={locale}>
			<body>
				<Providers session={session} locale={locale}>
					{children}
				</Providers>
			</body>
		</html>
	)
}
