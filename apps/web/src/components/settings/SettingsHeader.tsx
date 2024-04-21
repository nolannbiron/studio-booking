'use client'

import { useGetSettingsRoute } from '@/components/navigation/team/routes/settings-routes'
import { useTranslation } from '@repo/i18n/next/client'
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator
} from '@repo/ui/breadcrumb'
import { Separator } from '@repo/ui/separator'

const isTeamPage = (pathname?: string) => pathname?.includes('/team/')

export default function SettingsHeader({ children }: { children?: React.ReactNode }): JSX.Element {
	const { t } = useTranslation()
	const page = useGetSettingsRoute()

	const title = page
		? isTeamPage(page.path)
			? t('navbar.settings.team')
			: t('navbar.settings.account')
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
					<BreadcrumbPage>{page?.name}</BreadcrumbPage>
				</BreadcrumbList>
			</Breadcrumb>

			<div className="space-y-3">
				<h1 className="text-2xl font-semibold">{page?.name}</h1>

				{/* <Alert>
						<AlertDescription>
							Your profile information is used to identify you and personalize your experience.
						</AlertDescription>
					</Alert> */}

				{children}
			</div>

			<Separator />
		</div>
	)
}
