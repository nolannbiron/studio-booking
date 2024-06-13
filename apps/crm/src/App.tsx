import '@repo/feature-shared/index.scss'
import Routing from '@repo/feature-shared/navigation/Routing'
import { useUserStore } from '@repo/feature-shared/state/user.state'
import { LocaleProvider } from '@repo/i18n/hooks/locale-provider'
import { ThemeProvider } from '@repo/ui/theme'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Suspense, lazy } from 'react'
import { BrowserRouter } from 'react-router-dom'

// import { getLocaleCookie, setLocaleCookie } from '@repo/lib/setLocaleCookie'
const Toaster = lazy(() => import('@repo/ui/sonner').then((module) => ({ default: module.Toaster })))

const queryClient = new QueryClient()

function App() {
	const { currentUser } = useUserStore()

	return (
		<LocaleProvider
			value={currentUser?.locale}
			// isCookieDefined={!shouldUpdateLocale}
			// action={setLocaleCookie}
		>
			<ThemeProvider>
				<BrowserRouter>
					<QueryClientProvider client={queryClient}>
						<Routing />
						<Suspense>
							<Toaster />
						</Suspense>
					</QueryClientProvider>
				</BrowserRouter>
			</ThemeProvider>
		</LocaleProvider>
	)
}

export default App
