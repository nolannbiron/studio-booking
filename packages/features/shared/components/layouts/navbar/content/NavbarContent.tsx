import { useUserStore } from '@/state/user.state'
import { useActivePath } from '@repo/hooks'
import { Breadcrumb, BreadcrumbList, BreadcrumbPage } from '@repo/ui/breadcrumb'
import { TooltipProvider } from '@repo/ui/tooltip'
import { UserAvatar } from '@repo/ui/user/UserAvatar'
import { useTranslation } from 'react-i18next'

const pathnames = {
	dashboard: 'home',
	tasks: 'tasks',
	notes: 'notes',
	contacts: 'contacts',
	sessions: 'sessions'
} as const

export default function Navbar(): JSX.Element {
	const { t } = useTranslation()
	const { currentUser } = useUserStore()

	const activePath = useActivePath(pathnames)

	return (
		<TooltipProvider disableHoverableContent delayDuration={100}>
			<div className="flex w-full items-center justify-between gap-5">
				<div className="hidden items-center gap-2 md:flex">
					{activePath && (
						<Breadcrumb>
							<BreadcrumbList>
								<BreadcrumbPage className="text-sm">
									{t(`navbar.dashboard.${activePath}`)}
								</BreadcrumbPage>
							</BreadcrumbList>
						</Breadcrumb>
					)}
				</div>
				<div className="flex items-center justify-end gap-3">
					<UserAvatar className="rounded-full" size="xs" user={currentUser} />
				</div>
			</div>
		</TooltipProvider>
	)
}
