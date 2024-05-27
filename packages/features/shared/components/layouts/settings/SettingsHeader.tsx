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

export default function SettingsHeader(): JSX.Element {
	const { t, i18n } = useTranslation()
	const page = useActivePath(pathnames)

	const title = page ? (isTeamPage(page) ? t('navbar.settings.team') : t('navbar.settings.account')) : ''

	const description = i18n.exists(`navbar.settings.descriptions.${page}`)
		? t(`navbar.settings.descriptions.${page}` as any)
		: ''

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
				{description && <p className="text-pretty text-gray-500">{description}</p>}
			</div>

			<Separator />
		</div>
	)
}
