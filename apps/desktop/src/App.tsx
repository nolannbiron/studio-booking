import '@repo/feature-shared/index.scss'
import { useUserStore } from '@repo/feature-shared/state/user.state'
import { LocaleProvider } from '@repo/i18n/hooks/locale-provider'
import { Loading } from '@repo/ui/loading'
import { ThemeProvider } from '@repo/ui/theme'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Suspense, lazy } from 'react'
import { BrowserRouter } from 'react-router-dom'

const Routing = lazy(() => import('@repo/feature-shared/navigation/Routing'))
const Toaster = lazy(() => import('@repo/ui/sonner').then((module) => ({ default: module.Toaster })))

const queryClient = new QueryClient()

function App() {
	const { currentUser } = useUserStore()

	return (
		<LocaleProvider value={currentUser?.locale}>
			<ThemeProvider>
				<BrowserRouter>
					<QueryClientProvider client={queryClient}>
						<Suspense fallback={<Loading />}>
							<Routing />
							<Toaster />
						</Suspense>
					</QueryClientProvider>
				</BrowserRouter>
			</ThemeProvider>
		</LocaleProvider>
	)
}

export default App
