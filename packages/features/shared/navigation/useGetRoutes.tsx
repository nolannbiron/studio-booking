import MainLayout from '@/components/layouts/MainLayout'
import { useTranslation } from '@repo/i18n/next/client'
import { Loading } from '@repo/ui/loading'
import { Suspense, lazy } from 'react'
import { FiBell, FiDollarSign, FiSettings, FiShare, FiUser, FiUsers } from 'react-icons/fi'
import { TbCalendarEvent, TbFile, TbSquareRoundedCheck, TbUsers } from 'react-icons/tb'

import type { TRoutesConfig } from './types'

const TasksPage = lazy(() => import('@/pages/tasks/TasksPage'))
const TeamSettingsMembersPage = lazy(() => import('@/pages/settings/team/members/TeamSettingsMembersPage'))
const ContactTasksPage = lazy(() => import('@/pages/contact/tasks/ContactTasksPage'))
const ContactNotesPage = lazy(() => import('@/pages/contact/notes/ContactNotesPage'))
const ContactActivityPage = lazy(() => import('@/pages/contact/activity/ContactActivityPage'))
const ContactFilesPage = lazy(() => import('@/pages/contact/library/ContactLibraryPage'))
const ContactSessionsPage = lazy(() => import('@/pages/contact/sessions/ContactSessionsPage'))
const ContactPage = lazy(() => import('@/pages/contact/ContactPage'))
const RequireAnonymous = lazy(() => import('@/navigation/RequireAnonymous'))
const RequireAuth = lazy(() => import('@/navigation/RequireAuth'))
const LoginPage = lazy(() => import('@/pages/auth/login/LoginPage'))
const RegisterPage = lazy(() => import('@/pages/auth/register/RegisterPage'))
const ForgotPasswordPage = lazy(() => import('@/pages/auth/forgot-password/ForgotPasswordPage'))
const ResetPasswordPage = lazy(() => import('@/pages/auth/reset-password/ResetPasswordPage'))
const AccountSettingsPage = lazy(() => import('@/pages/settings/account/AccountSettingsPage'))
const ContactsPage = lazy(() => import('@/pages/contacts/ContactsPage'))
const CreateTeamPage = lazy(() => import('@/pages/create-team/CreateTeamPage'))
const TeamSettingsPage = lazy(() => import('@/pages/settings/team/general/TeamSettingsPage'))
const NotesPage = lazy(() => import('@/pages/notes/NotesPage'))

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
							<RegisterPage />
						</RequireAnonymous>
					</Suspense>
				)
			},
			{
				path: '/forgot-password',
				element: (
					<Suspense fallback={<Loading withText fullScreen />}>
						<RequireAnonymous>
							<ForgotPasswordPage />
						</RequireAnonymous>
					</Suspense>
				)
			},
			{
				path: '/reset-password',
				element: (
					<Suspense fallback={<Loading withText fullScreen />}>
						<RequireAnonymous>
							<ResetPasswordPage />
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
							icon: <TbSquareRoundedCheck />,
							element: (
								<Suspense fallback={<Loading withText fullScreen />}>
									<RequireAuth>
										<TasksPage />
									</RequireAuth>
								</Suspense>
							)
						},
						{
							path: '/notes',
							name: t('navbar.dashboard.notes'),
							icon: <TbFile />,
							element: (
								<Suspense fallback={<Loading withText fullScreen />}>
									<RequireAuth>
										<NotesPage />
									</RequireAuth>
								</Suspense>
							)
						},
						...baseRoutes.navbar.main.routes[0]
					],
					[
						{
							path: '/contacts',
							name: t('navbar.dashboard.contacts'),
							icon: <TbUsers />,
							element: (
								<Suspense fallback={<Loading withText fullScreen />}>
									<RequireAuth>
										<ContactsPage />
									</RequireAuth>
								</Suspense>
							)
						},
						{
							path: '/sessions',
							name: t('navbar.dashboard.sessions'),
							icon: <TbCalendarEvent />,
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
							<RequireAuth>
								<TeamSettingsPage />
							</RequireAuth>
						</Suspense>
					)
				},
				{
					name: t('navbar.settings.team_members'),
					path: `/settings/team/members`,
					icon: <FiUsers />,
					element: (
						<Suspense fallback={<Loading withText fullScreen />}>
							<RequireAuth>
								<TeamSettingsMembersPage />
							</RequireAuth>
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
		general: [
			...baseRoutes.general,
			{
				path: '/contact/:id',
				layout: <MainLayout />,
				element: (
					<Suspense fallback={<Loading withText fullScreen />}>
						<RequireAuth>
							<ContactPage />
						</RequireAuth>
					</Suspense>
				),
				children: [
					{
						path: '/contact/:id/activity',
						element: (
							<Suspense fallback={<Loading withText fullScreen />}>
								<ContactActivityPage />
							</Suspense>
						)
					},
					{
						path: '/contact/:id/notes',
						element: (
							<Suspense fallback={<Loading withText fullScreen />}>
								<ContactNotesPage />
							</Suspense>
						)
					},
					{
						path: '/contact/:id/tasks',
						element: (
							<Suspense fallback={<Loading withText fullScreen />}>
								<ContactTasksPage />
							</Suspense>
						)
					},
					{
						path: '/contact/:id/library',
						element: (
							<Suspense fallback={<Loading withText fullScreen />}>
								<ContactFilesPage />
							</Suspense>
						)
					},
					{
						path: '/contact/:id/sessions',
						element: (
							<Suspense fallback={<Loading withText fullScreen />}>
								<ContactSessionsPage />
							</Suspense>
						)
					}
				]
			},
			{
				path: '/create-team',
				element: (
					<Suspense fallback={<Loading withText fullScreen />}>
						<RequireAuth>
							<CreateTeamPage />
						</RequireAuth>
					</Suspense>
				)
			}
		]
	}
}
