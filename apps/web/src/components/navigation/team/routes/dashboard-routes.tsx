'use client'

import type { TRoute } from '@/components/navigation/team/routes/type'
import { useTranslation } from '@repo/i18n/next/client'
import { usePathname } from 'next/navigation'
import { FiCalendar, FiUsers } from 'react-icons/fi'

export function useDashboardRoutes(): TRoute[] {
	const { t } = useTranslation()

	return [
		{
			name: t('navbar.dashboard.contacts'),
			path: `/contacts`,
			icon: <FiUsers />
		},
		{
			name: t('navbar.dashboard.appointments'),
			path: `/appointments`,
			icon: <FiCalendar />
		}
	]
}

export const useGetDashboardRoute = (): TRoute | undefined => {
	const pathname = usePathname()
	const routes = useDashboardRoutes()
	const page = pathname.split('/').pop() as string

	return routes.find((route) => route.path.includes(page))
}
