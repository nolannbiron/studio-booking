import type { TRoute } from '@/components/navigation/team/routes/type'
import { useTranslation } from '@repo/i18n/next/client'
import { usePathname } from 'next/navigation'
import { BsChat } from 'react-icons/bs'
import { FiFile } from 'react-icons/fi'

// export type SettingsRoutesGroup = 'account' | 'team'

// type SettingsRoutes = Record<string, TRoute[]>

export function useDashboardRoutes(): TRoute[] {
	const { t } = useTranslation()

	return [
		{
			name: t('navbar.dashboard.feedback'),
			path: `/feedback`,
			icon: <BsChat />
		},
		{
			name: t('navbar.dashboard.release-notes'),
			path: `/release-notes`,
			icon: <FiFile />
		}
	]
}

export const useGetDashboardRoute = (): TRoute | undefined => {
	const pathname = usePathname()
	const routes = useDashboardRoutes()
	const page = pathname.split('/').pop() as string

	return routes.find((route) => route.path.includes(page))
}
