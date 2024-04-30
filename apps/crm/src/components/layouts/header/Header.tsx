import { CommandMenu } from '@/components/layouts/sidebar/search/CommandMenu'
import { NavbarSize, useNavbarStore } from '@/state/navbar.state'
import { useUserStore } from '@/state/user.state'
import { useActivePath } from '@repo/hooks'
import { Button } from '@repo/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@repo/ui/tooltip'
import { UserAvatar } from '@repo/ui/user/UserAvatar'
import { Suspense, lazy } from 'react'
import { useTranslation } from 'react-i18next'
import { FiMenu } from 'react-icons/fi'
import { TbLayoutSidebarRightCollapse } from 'react-icons/tb'

const MobileSidebarSheet = lazy(() => import('../sidebar/MobileSidebarSheet'))

const pathnames = {
	dashboard: 'home',
	tasks: 'tasks',
	notes: 'notes',
	contacts: 'contacts'
} as const

export default function Header(): JSX.Element {
	const { t } = useTranslation()
	const { setWidth, width } = useNavbarStore()
	const { currentUser } = useUserStore()

	const activePath = useActivePath(pathnames)

	return (
		<header className="sticky top-0 z-[1] flex h-16 w-full flex-shrink-0 items-center justify-between gap-5 border-b px-4 backdrop-blur">
			<TooltipProvider disableHoverableContent delayDuration={100}>
				<div className="flex w-full items-center justify-between gap-5">
					<Suspense fallback={<></>}>
						<div className="flex md:hidden">
							<MobileSidebarSheet>
								<Button size="icon" variant="outline">
									<FiMenu />
								</Button>
							</MobileSidebarSheet>
						</div>
					</Suspense>
					<div className="flex flex-1 justify-center sm:hidden">
						{/* <Logo className="h-12" /> */}
					</div>
					<div className="hidden items-center gap-2 md:flex">
						{width === NavbarSize.SM && (
							<Tooltip>
								<TooltipTrigger asChild>
									<Button
										tabIndex={-1}
										onClick={() => setWidth(NavbarSize.MD)}
										size="icon-xs"
										variant="ghost"
										className="rounded-full"
									>
										<Suspense>
											<TbLayoutSidebarRightCollapse />
										</Suspense>
									</Button>
								</TooltipTrigger>
								<TooltipContent>
									<span>{t(`general.open_sidebar`)}</span>
								</TooltipContent>
							</Tooltip>
						)}

						<div className="text-base font-medium">
							{activePath ? t(`navbar.dashboard.${activePath}`) : ''}
						</div>
					</div>
					<div className="flex items-center justify-end gap-3">
						<div className="hidden !min-w-[240px] sm:flex">
							<CommandMenu />
						</div>

						<UserAvatar className="rounded-full" size="xs" user={currentUser} />
					</div>
				</div>
			</TooltipProvider>
		</header>
	)
}
