import Routing from '@/navigation/Routing'
import { getLocaleCookie, setLocaleCookie } from '@/setLocaleCookie'
import { useUserStore } from '@/state/user.state'
import { LocaleProvider } from '@repo/i18n/hooks/locale-provider'
import { ThemeProvider } from '@repo/ui/theme'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter } from 'react-router-dom'

import './index.scss'

const queryClient = new QueryClient()

function App() {
	const locale = getLocaleCookie()
	const { currentUser } = useUserStore()
	const shouldUpdateLocale = currentUser?.locale && currentUser?.locale !== locale

	return (
		<LocaleProvider
			value={currentUser?.locale ?? locale}
			isCookieDefined={!shouldUpdateLocale}
			action={setLocaleCookie}
		>
			<ThemeProvider>
				<BrowserRouter>
					<QueryClientProvider client={queryClient}>
						<Routing />
					</QueryClientProvider>
				</BrowserRouter>
			</ThemeProvider>
		</LocaleProvider>
	)
}

export default App
