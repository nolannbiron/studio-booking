import type { TRoute } from '@/components/navigation/team/routes/type'
import { useTranslation } from '@repo/i18n/next/client'
import { usePathname } from 'next/navigation'
import { FiBell, FiDollarSign, FiSettings, FiShare, FiUser, FiUsers } from 'react-icons/fi'

export type SettingsRoutesGroup = 'account' | 'team'
export type SettingsRoutesPage = 'account' | 'referral' | 'notifications' | 'general' | 'members' | 'billing'
type SettingsRoutes = Record<SettingsRoutesGroup, TRoute[]>

export function useSettingsRoutes(): SettingsRoutes {
	const { t } = useTranslation()

	return {
		account: [
			{
				name: t('navbar.settings.profile'),
				path: `/settings/account`,
				icon: <FiUser />
			},
			{
				name: t('navbar.settings.notifications'),
				path: `/settings/notifications`,
				icon: <FiBell />
			},
			{
				name: t('navbar.settings.referral'),
				path: `/settings/referral`,
				icon: <FiShare />
			}
		],
		team: [
			{
				name: t('navbar.settings.team_general'),
				path: `/settings/team/general`,
				icon: <FiSettings />
			},
			{
				name: t('navbar.settings.team_members'),
				path: `/settings/team/members`,
				icon: <FiUsers />
			},
			{
				name: t('navbar.settings.team_billing'),
				path: `/settings/team/billing`,
				icon: <FiDollarSign />
			}
		]
	}
}

export const useGetSettingsRoute = (): TRoute | undefined => {
	const pathname = usePathname()
	const settingsRoutes = useSettingsRoutes()
	const page = pathname.split('/').pop() as SettingsRoutesPage
	const group = pathname.includes('/team/') ? 'team' : 'account'

	return settingsRoutes[group].find((route) => route.path.includes(page))
}
