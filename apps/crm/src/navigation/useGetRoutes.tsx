import { useTranslation } from '@repo/i18n/next/client'
import { Loading } from '@repo/ui/loading'
import { Suspense, lazy } from 'react'
import {
	FiBell,
	FiDollarSign,
	FiFile,
	FiHome,
	FiSettings,
	FiShare,
	FiUser,
	FiUsers,
	FiZap
} from 'react-icons/fi'

import type { TRoutesConfig } from './types'

const RequireAnonymous = lazy(() => import('@/navigation/RequireAnonymous'))
const RequireAuth = lazy(() => import('@/navigation/RequireAuth'))
const LoginPage = lazy(() => import('@/pages/auth/login/LoginPage'))
const AccountSettingsPage = lazy(() => import('@/pages/settings/account/AccountSettingsPage'))

export const useGetRoutes = (): TRoutesConfig => {
	const { t } = useTranslation()

	const baseRoutes: TRoutesConfig = {
		navbar: {
			main: {
				enabled: true,
				routes: [[]]
			}
		},
		general: [],
		auth: [
			{
				path: '/login',
				element: (
					<Suspense fallback={<Loading withText fullScreen />}>
						<RequireAnonymous>
							<LoginPage />
						</RequireAnonymous>
					</Suspense>
				)
			},
			{
				path: '/register',
				element: (
					<Suspense fallback={<Loading withText fullScreen />}>
						<RequireAnonymous>
							<></>
						</RequireAnonymous>
					</Suspense>
				)
			}
		],
		settings: {}
	}

	return {
		navbar: {
			main: {
				enabled: true,
				routes: [
					[
						{
							path: '/tasks',
							name: t('navbar.dashboard.tasks'),
							icon: <FiZap />,
							element: (
								<Suspense fallback={<Loading withText fullScreen />}>
									<RequireAuth>
										<></>
									</RequireAuth>
								</Suspense>
							)
						},
						{
							path: '/notes',
							name: t('navbar.dashboard.notes'),
							icon: <FiFile />,
							element: (
								<Suspense fallback={<Loading withText fullScreen />}>
									<RequireAuth>
										<></>
									</RequireAuth>
								</Suspense>
							)
						},
						...baseRoutes.navbar.main.routes[0]
					],
					[
						{
							path: '/dashboard',
							name: t('navbar.dashboard.home'),
							icon: <FiHome />,
							element: (
								<Suspense fallback={<Loading withText fullScreen />}>
									<RequireAuth>
										<></>
									</RequireAuth>
								</Suspense>
							)
						},
						{
							path: '/contacts',
							name: t('navbar.dashboard.contacts'),
							icon: <FiUsers />,
							element: (
								<Suspense fallback={<Loading withText fullScreen />}>
									<RequireAuth>
										<></>
									</RequireAuth>
								</Suspense>
							)
						}
					]
				]
			}
		},
		auth: baseRoutes.auth,
		settings: {
			[`${t('navbar.settings.account')}`]: [
				{
					path: '/settings/account',
					name: t('navbar.settings.profile'),
					icon: <FiUser />,
					element: (
						<Suspense fallback={<Loading withText fullScreen />}>
							<RequireAuth>
								<AccountSettingsPage />
							</RequireAuth>
						</Suspense>
					)
				},
				{
					name: t('navbar.settings.notifications'),
					path: `/settings/notifications`,
					icon: <FiBell />,
					element: (
						<Suspense fallback={<Loading withText fullScreen />}>
							<RequireAuth>{/* <NotificationsSettingsPage /> */}</RequireAuth>
						</Suspense>
					)
				},
				{
					name: t('navbar.settings.referral'),
					path: `/settings/referral`,
					icon: <FiShare />,
					element: (
						<Suspense fallback={<Loading withText fullScreen />}>
							<RequireAuth>{/* <ReferralSettingsPage /> */}</RequireAuth>
						</Suspense>
					)
				}
			],
			[`${t('navbar.settings.team')}`]: [
				{
					name: t('navbar.settings.team_general'),
					path: `/settings/team/general`,
					icon: <FiSettings />,
					element: (
						<Suspense fallback={<Loading withText fullScreen />}>
							<RequireAuth>{/* <TeamGeneralSettingsPage /> */}</RequireAuth>
						</Suspense>
					)
				},
				{
					name: t('navbar.settings.team_members'),
					path: `/settings/team/members`,
					icon: <FiUsers />,
					element: (
						<Suspense fallback={<Loading withText fullScreen />}>
							<RequireAuth>{/* <TeamMembersSettingsPage /> */}</RequireAuth>
						</Suspense>
					)
				},
				{
					name: t('navbar.settings.team_billing'),
					path: `/settings/team/billing`,
					icon: <FiDollarSign />,
					element: (
						<Suspense fallback={<Loading withText fullScreen />}>
							<RequireAuth>{/* <TeamBillingSettingsPage /> */}</RequireAuth>
						</Suspense>
					)
				}
			]
		},
		general: [...baseRoutes.general]
	}
}
