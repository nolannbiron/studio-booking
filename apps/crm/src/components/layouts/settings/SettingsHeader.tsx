'use client'

import { useActivePath } from '@repo/hooks'
import { useTranslation } from '@repo/i18n/next/client'
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator
} from '@repo/ui/breadcrumb'
import { Separator } from '@repo/ui/separator'

const isTeamPage = (pathname?: string) => pathname?.includes('team')

const pathnames = {
	account: 'profile',
	notifications: 'notifications',
	referral: 'referral',
	general: 'team_general',
	members: 'team_members',
	billing: 'team_billing'
} as const

export default function SettingsHeader({ children }: { children?: React.ReactNode }): JSX.Element {
	const { t } = useTranslation()
	const page = useActivePath(pathnames)

	const title = page ? (isTeamPage(page) ? t('navbar.settings.team') : t('navbar.settings.account')) : ''

	return (
		<div className="space-y-6">
			<Breadcrumb>
				<BreadcrumbList>
					{title && (
						<>
							<BreadcrumbItem>{title}</BreadcrumbItem>
							<BreadcrumbSeparator />
						</>
					)}
					{page && <BreadcrumbPage>{t(`navbar.settings.${page}`)}</BreadcrumbPage>}
				</BreadcrumbList>
			</Breadcrumb>

			<div className="space-y-3">
				{page && <h1 className="text-2xl font-semibold">{t(`navbar.settings.${page}`)}</h1>}

				{children}
			</div>

			<Separator />
		</div>
	)
}
